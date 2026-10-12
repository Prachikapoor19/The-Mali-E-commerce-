// POST /api/auth/register { name, email, password, phone? } — create a customer account and log in
import { connectDB, isDbConfigured } from '@/lib/db';
import { UserModel } from '@/lib/userModel';
import { EMAIL_RE, PHONE_RE, hashPassword, passwordProblem, publicUser, startSession } from '@/lib/userAuth';

const str = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

export async function POST(request: Request) {
  if (!isDbConfigured()) return Response.json({ error: 'Accounts are not available right now.' }, { status: 503 });
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid request' }, { status: 400 });
  }

  const name = str(body.name, 80);
  const email = str(body.email, 120).toLowerCase();
  const phone = str(body.phone, 15).replace(/[\s-]/g, '').replace(/^(\+91|0)/, '');
  const password = typeof body.password === 'string' ? body.password : '';

  const errors: Record<string, string> = {};
  if (!name) errors.name = 'Please enter your name';
  if (!EMAIL_RE.test(email)) errors.email = 'Please enter a valid email';
  if (phone && !PHONE_RE.test(phone)) errors.phone = 'Please enter a 10-digit mobile number';
  const pwProblem = passwordProblem(password);
  if (pwProblem) errors.password = pwProblem;
  if (Object.keys(errors).length) return Response.json({ error: 'invalid', errors }, { status: 400 });

  try {
    await connectDB();
    if (await UserModel.exists({ email })) {
      return Response.json(
        { error: 'invalid', errors: { email: 'An account with this email already exists. Please log in.' } },
        { status: 409 }
      );
    }
    const user = await UserModel.create({ name, email, phone, passwordHash: await hashPassword(password) });
    await startSession(user._id);
    return Response.json({ user: publicUser(user) }, { status: 201 });
  } catch (err) {
    if ((err as { code?: number }).code === 11000) {
      return Response.json({ error: 'invalid', errors: { email: 'An account with this email already exists. Please log in.' } }, { status: 409 });
    }
    console.error('Register failed', err);
    return Response.json({ error: 'Could not create your account. Please try again.' }, { status: 500 });
  }
}
