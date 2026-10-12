// GET /api/account/orders — the logged-in customer's orders, newest first
import { OrderModel } from '@/lib/orderModel';
import { currentUser } from '@/lib/userAuth';

export async function GET() {
  const user = await currentUser().catch(() => null);
  if (!user) return Response.json({ error: 'unauthorized' }, { status: 401 });
  try {
    const docs = await OrderModel.find({ userId: user._id }).sort({ createdAt: -1 }).limit(100).lean();
    const orders = docs.map((o) => ({
      orderId: o.orderId,
      createdAt: (o as { createdAt?: Date }).createdAt,
      status: o.status,
      total: o.total,
      deliveryDate: o.deliveryDate,
      slotName: o.slotName,
      recipientName: o.recipient?.name ?? '',
      city: o.recipient?.city ?? '',
      items: o.items.map((i) => ({ name: i.name, quantity: i.quantity, image: i.image ?? '' })),
    }));
    return Response.json({ orders }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (err) {
    console.error('My orders failed', err);
    return Response.json({ error: 'server_error' }, { status: 500 });
  }
}
