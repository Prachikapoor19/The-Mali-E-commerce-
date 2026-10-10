// PATCH /api/admin/messages/<id> { status: 'new' | 'read' } — mark read/unread
// DELETE /api/admin/messages/<id> — remove a message
import { isValidObjectId } from 'mongoose';
import { connectDB, isDbConfigured } from '@/lib/db';
import { isAdminRequest } from '@/lib/adminGuard';
import { MessageModel, MESSAGE_STATUSES } from '@/lib/messageModel';

type Ctx = { params: Promise<{ id: string }> };

async function guard(id: string) {
  if (!(await isAdminRequest())) return Response.json({ error: 'unauthorized' }, { status: 401 });
  if (!isDbConfigured()) return Response.json({ error: 'not_configured' }, { status: 503 });
  if (!isValidObjectId(id)) return Response.json({ error: 'not_found' }, { status: 404 });
  return null;
}

export async function PATCH(request: Request, { params }: Ctx) {
  const { id } = await params;
  const denied = await guard(id);
  if (denied) return denied;
  let status = '';
  try {
    status = String((await request.json()).status ?? '');
  } catch {
    // handled below
  }
  if (!(MESSAGE_STATUSES as readonly string[]).includes(status)) {
    return Response.json({ error: 'Invalid status' }, { status: 400 });
  }
  try {
    await connectDB();
    const doc = await MessageModel.findByIdAndUpdate(id, { status }, { new: true }).lean();
    if (!doc) return Response.json({ error: 'not_found' }, { status: 404 });
    return Response.json({ id, status: doc.status });
  } catch (err) {
    console.error('Message update failed', err);
    return Response.json({ error: 'server_error' }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: Ctx) {
  const { id } = await params;
  const denied = await guard(id);
  if (denied) return denied;
  try {
    await connectDB();
    const doc = await MessageModel.findByIdAndDelete(id).lean();
    if (!doc) return Response.json({ error: 'not_found' }, { status: 404 });
    return Response.json({ ok: true });
  } catch (err) {
    console.error('Message delete failed', err);
    return Response.json({ error: 'server_error' }, { status: 500 });
  }
}
