// PATCH /api/admin/orders/MALI123456 { status } — update an order's status
import { cookies } from 'next/headers';
import { ADMIN_COOKIE, isValidSession } from '@/lib/adminAuth';
import { connectDB, isDbConfigured } from '@/lib/db';
import { OrderModel, ORDER_STATUSES } from '@/lib/orderModel';

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!isValidSession((await cookies()).get(ADMIN_COOKIE)?.value)) {
    return Response.json({ error: 'unauthorized' }, { status: 401 });
  }
  if (!isDbConfigured()) return Response.json({ error: 'not_configured' }, { status: 503 });

  const { id } = await params;
  let status = '';
  try {
    status = String((await request.json()).status ?? '');
  } catch {
    // handled below
  }
  if (!(ORDER_STATUSES as readonly string[]).includes(status)) {
    return Response.json({ error: 'Invalid status' }, { status: 400 });
  }
  try {
    await connectDB();
    const order = await OrderModel.findOneAndUpdate({ orderId: id.toUpperCase() }, { status }, { new: true }).lean();
    if (!order) return Response.json({ error: 'not_found' }, { status: 404 });
    return Response.json({ orderId: order.orderId, status: order.status });
  } catch (err) {
    console.error('Status update failed', err);
    return Response.json({ error: 'server_error' }, { status: 500 });
  }
}
