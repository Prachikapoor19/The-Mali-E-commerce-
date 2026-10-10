// GET /api/admin/messages — latest Contact Us messages for the admin page
import { connectDB, isDbConfigured } from '@/lib/db';
import { isAdminRequest } from '@/lib/adminGuard';
import { MessageModel } from '@/lib/messageModel';

export async function GET() {
  if (!(await isAdminRequest())) return Response.json({ error: 'unauthorized' }, { status: 401 });
  if (!isDbConfigured()) return Response.json({ error: 'not_configured' }, { status: 503 });
  try {
    await connectDB();
    const docs = await MessageModel.find({}, { ipHash: 0 }).sort({ createdAt: -1 }).limit(300).lean();
    const messages = docs.map((d) => ({
      id: String(d._id),
      name: d.name,
      email: d.email,
      phone: d.phone ?? '',
      message: d.message,
      status: d.status,
      createdAt: d.createdAt,
    }));
    return Response.json({ messages });
  } catch (err) {
    console.error('Admin message list failed', err);
    return Response.json({ error: 'server_error' }, { status: 500 });
  }
}
