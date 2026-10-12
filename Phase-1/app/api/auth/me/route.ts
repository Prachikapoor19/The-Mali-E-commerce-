// GET /api/auth/me — who is logged in (or { user: null })
// PATCH /api/auth/me { name?, phone?, currentPassword?, newPassword? } — update profile / change password
import { UserModel } from '@/lib/userModel';
import { PHONE_RE, currentUser, hashPassword, passwordProblem, publicUser, verifyPassword } from '@/lib/userAuth';

export async function GET() {
  try {
    const user = await currentUser();
    return Response.json({ user: user ? publicUser(user) : null }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (err) {
    console.error('Who-am-I failed', err);
    return Response.json({ user: null });
  }
}

export async function PATCH(request: Request) {
  const user = await currentUser().catch(() => null);
  if (!user) return Response.json({ error: 'unauthorized' }, { status: 401 });
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid request' }, { status: 400 });
  }

  const update: Record<string, unknown> = {};
  const errors: Record<string, string> = {};
  if (typeof body.name === 'string') {
    const name = body.name.trim().slice(0, 80);
    if (!name) errors.name = 'Please enter your name';
    else update.name = name;
  }
  if (typeof body.phone === 'string') {
    const phone = body.phone.replace(/[\s-]/g, '').replace(/^(\+91|0)/, '').slice(0, 10);
    if (phone && !PHONE_RE.test(phone)) errors.phone = 'Please enter a 10-digit mobile number';
    else update.phone = phone;
  }
  if (typeof body.newPassword === 'string' && body.newPassword) {
    const current = typeof body.currentPassword === 'string' ? body.currentPassword : '';
    if (!(await verifyPassword(current, user.passwordHash))) errors.currentPassword = 'Current password is incorrect';
    const problem = passwordProblem(body.newPassword);
    if (problem) errors.newPassword = problem;
    if (!errors.currentPassword && !problem) update.passwordHash = await hashPassword(body.newPassword);
  }
  if (Object.keys(errors).length) return Response.json({ error: 'invalid', errors }, { status: 400 });

  try {
    const saved = await UserModel.findByIdAndUpdate(user._id, update, { new: true });
    return Response.json({ user: saved ? publicUser(saved) : null });
  } catch (err) {
    console.error('Profile update failed', err);
    return Response.json({ error: 'Could not save. Please try again.' }, { status: 500 });
  }
}
