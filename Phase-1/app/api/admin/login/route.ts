// POST /api/admin/login { password } — sets the admin cookie
import { cookies } from 'next/headers';
import { ADMIN_COOKIE, checkPassword, isAdminConfigured, makeSessionToken, sessionCookieOptions } from '@/lib/adminAuth';

export async function POST(request: Request) {
  if (!isAdminConfigured()) return Response.json({ error: 'not_configured' }, { status: 503 });
  let password = '';
  try {
    password = String((await request.json()).password ?? '');
  } catch {
    // fall through with empty password
  }
  if (!checkPassword(password)) {
    await new Promise((r) => setTimeout(r, 600)); // slow down guessing
    return Response.json({ error: 'Wrong password' }, { status: 401 });
  }
  (await cookies()).set(ADMIN_COOKIE, makeSessionToken(), sessionCookieOptions);
  return Response.json({ ok: true });
}
