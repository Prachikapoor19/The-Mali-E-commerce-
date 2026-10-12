// POST /api/auth/logout — log this browser out
import { endSession } from '@/lib/userAuth';

export async function POST() {
  try {
    await endSession();
  } catch (err) {
    console.error('Logout failed', err);
  }
  return Response.json({ ok: true });
}
