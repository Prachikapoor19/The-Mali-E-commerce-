// GET /api/admin/orders?status=placed — latest orders for the admin page
import { cookies } from 'next/headers';
import type { NextRequest } from 'next/server';
import { ADMIN_COOKIE, isValidSession } from '@/lib/adminAuth';
import { connectDB, isDbConfigured } from '@/lib/db';
import { OrderModel, ORDER_STATUSES, type OrderStatus } from '@/lib/orderModel';

export async function GET(request: NextRequest) {
  if (!isValidSession((await cookies()).get(ADMIN_COOKIE)?.value)) {
    return Response.json({ error: 'unauthorized' }, { status: 401 });
  }
  if (!isDbConfigured()) return Response.json({ error: 'not_configured' }, { status: 503 });

  const status = request.nextUrl.searchParams.get('status');
  const filter =
    status && (ORDER_STATUSES as readonly string[]).includes(status) ? { status: status as OrderStatus } : {};
  try {
    await connectDB();
    const orders = await OrderModel.find(filter).sort({ createdAt: -1 }).limit(200).lean();
    return Response.json({ orders });
  } catch (err) {
    console.error('Admin order list failed', err);
    return Response.json({ error: 'server_error' }, { status: 500 });
  }
}
