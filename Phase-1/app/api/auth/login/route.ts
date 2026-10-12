// POST /api/auth/login { email, password } — log a customer in
import { connectDB, isDbConfigured } from '@/lib/db';
import { UserModel } from '@/lib/userModel';
import { LOCK_MINUTES, MAX_FAILED_LOGINS, hashPassword, publicUser, startSession, verifyPassword } from '@/lib/userAuth';

const WRONG = 'Email or password is incorrect';
let dummyHash: Promise<string> | null = null;

export async function POST(request: Request) {
  if (!isDbConfigured()) return Response.json({ error: 'Accounts are not available right now.' }, { status: 503 });
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid request' }, { status: 400 });
  }
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase().slice(0, 120) : '';
  const password = typeof body.password === 'string' ? body.password.slice(0, 128) : '';
  if (!email || !password) return Response.json({ error: 'Please enter your email and password' }, { status: 400 });

  try {
    await connectDB();
    const user = await UserModel.findOne({ email });
    if (!user) {
      // Same amount of work as a real check, so response time doesn't reveal which emails exist
      await verifyPassword(password, await (dummyHash ??= hashPassword('not-a-real-password-1')));
      return Response.json({ error: WRONG }, { status: 401 });
    }
    if (user.lockedUntil && user.lockedUntil > new Date()) {
      const mins = Math.ceil((user.lockedUntil.getTime() - Date.now()) / 60000);
      return Response.json({ error: `Too many wrong tries. Please try again in ${mins} minute${mins === 1 ? '' : 's'}.` }, { status: 429 });
    }
    if (!(await verifyPassword(password, user.passwordHash))) {
      const fails = (user.failedLogins ?? 0) + 1;
      const lock = fails >= MAX_FAILED_LOGINS;
      await UserModel.updateOne(
        { _id: user._id },
        lock
          ? { failedLogins: 0, lockedUntil: new Date(Date.now() + LOCK_MINUTES * 60000) }
          : { failedLogins: fails }
      );
      return Response.json(
        { error: lock ? `Too many wrong tries. Please try again in ${LOCK_MINUTES} minutes.` : WRONG },
        { status: lock ? 429 : 401 }
      );
    }
    if (user.failedLogins || user.lockedUntil) {
      await UserModel.updateOne({ _id: user._id }, { failedLogins: 0, lockedUntil: null });
    }
    await startSession(user._id);
    return Response.json({ user: publicUser(user) });
  } catch (err) {
    console.error('Login failed', err);
    return Response.json({ error: 'Could not log you in. Please try again.' }, { status: 500 });
  }
}
