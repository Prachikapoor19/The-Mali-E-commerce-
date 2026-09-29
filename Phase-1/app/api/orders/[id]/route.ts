// GET /api/orders/MALI123456 — public order status for the Track Order page.
// Only non-private details are returned (no address or phone numbers).
import { connectDB, isDbConfigured } from '@/lib/db';
import { OrderModel } from '@/lib/orderModel';

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!isDbConfigured()) return Response.json({ error: 'not_configured' }, { status: 503 });

  const { id } = await params;
  const orderId = id.trim().toUpperCase();
  if (!/^MALI\d{6}$/.test(orderId)) return Response.json({ error: 'not_found' }, { status: 404 });

  try {
    await connectDB();
    const order = await OrderModel.findOne({ orderId }).lean();
    if (!order) return Response.json({ error: 'not_found' }, { status: 404 });
    return Response.json({
      orderId: order.orderId,
      status: order.status,
      deliveryDate: order.deliveryDate,
      slotName: order.slotName,
      recipientFirstName: order.recipient?.name?.split(' ')[0] ?? '',
      city: order.recipient?.city ?? '',
      itemCount: order.items.reduce((n, i) => n + i.quantity, 0),
      total: order.total,
    });
  } catch (err) {
    console.error('Order lookup failed', err);
    return Response.json({ error: 'server_error' }, { status: 500 });
  }
}
