// POST /api/orders — place an order (saved in MongoDB)
import { connectDB, isDbConfigured } from '@/lib/db';
import { OrderModel } from '@/lib/orderModel';
import { listProducts } from '@/lib/products';
import { couponDiscount, deliveryCharge, DELIVERY_SLOTS } from '@/components/pricing';

type IncomingItem = { id?: unknown; quantity?: unknown; customText?: unknown };

const str = (v: unknown, max = 300) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
const PHONE = /^[6-9]\d{9}$/;

function makeOrderId() {
  return 'MALI' + Math.floor(100000 + Math.random() * 900000);
}

export async function POST(request: Request) {
  if (!isDbConfigured()) {
    return Response.json({ error: 'not_configured' }, { status: 503 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid request' }, { status: 400 });
  }

  // ---- Items: prices always come from our catalogue, never from the browser ----
  const rawItems = Array.isArray(body.items) ? (body.items as IncomingItem[]) : [];
  if (rawItems.length === 0 || rawItems.length > 50) {
    return Response.json({ error: 'Your cart is empty' }, { status: 400 });
  }
  const catalogue = await listProducts(); // live products from the database
  const items = [];
  for (const raw of rawItems) {
    const product = catalogue.find((p) => p.id === str(raw.id, 60));
    const quantity = Number(raw.quantity);
    if (!product || !Number.isInteger(quantity) || quantity < 1 || quantity > 20) {
      return Response.json({ error: 'Some items in your cart are no longer available' }, { status: 400 });
    }
    items.push({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image: product.image,
      customText: str(raw.customText, 120),
    });
  }

  // ---- Customer details ----
  const r = (body.recipient ?? {}) as Record<string, unknown>;
  const s = (body.sender ?? {}) as Record<string, unknown>;
  const recipient = {
    name: str(r.name, 80),
    phone: str(r.phone, 10),
    address: str(r.address, 300),
    city: str(r.city, 60),
    pincode: str(r.pincode, 6),
  };
  const sender = { name: str(s.name, 80), phone: str(s.phone, 10) };
  const deliveryDate = str(body.deliveryDate, 10);
  const slot = DELIVERY_SLOTS.find((x) => x.id === body.slotId);

  if (
    !recipient.name ||
    !PHONE.test(recipient.phone) ||
    recipient.address.length < 10 ||
    !recipient.city ||
    !/^\d{6}$/.test(recipient.pincode) ||
    !sender.name ||
    !PHONE.test(sender.phone) ||
    !/^\d{4}-\d{2}-\d{2}$/.test(deliveryDate) ||
    !slot
  ) {
    return Response.json({ error: 'Please check the delivery details' }, { status: 400 });
  }

  // ---- Totals (same rules as the checkout page) ----
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const coupon = str(body.coupon, 20).toUpperCase();
  const discount = couponDiscount(coupon, subtotal);
  const delivery = deliveryCharge(subtotal) + slot.fee;
  const total = Math.max(0, subtotal - discount + delivery);

  try {
    await connectDB();
    // Retry a couple of times in the rare case the random ID already exists
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const order = await OrderModel.create({
          orderId: makeOrderId(),
          items,
          recipient,
          sender,
          deliveryDate,
          slotId: slot.id,
          slotName: slot.name,
          giftMessage: str(body.giftMessage, 200),
          paymentMethod: 'Cash on Delivery',
          coupon: discount > 0 ? coupon : '',
          subtotal,
          discount,
          delivery,
          total,
        });
        return Response.json({ orderId: order.orderId, subtotal, discount, delivery, total }, { status: 201 });
      } catch (err) {
        if ((err as { code?: number }).code !== 11000 || attempt === 2) throw err;
      }
    }
  } catch (err) {
    console.error('Order save failed', err);
  }
  return Response.json({ error: 'Could not place the order. Please try again.' }, { status: 500 });
}
