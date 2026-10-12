// Customer login helpers: password hashing, session cookie, "who is logged in".
// Uses only Node's built-in crypto — no extra package.
import { createHash, randomBytes, scrypt as scryptCb, timingSafeEqual } from 'crypto';
import type { Types } from 'mongoose';
import { promisify } from 'util';
import { cookies } from 'next/headers';
import { connectDB, isDbConfigured } from './db';
import { SessionModel, UserModel, type UserDoc } from './userModel';

const scrypt = promisify(scryptCb) as (password: string, salt: string, keylen: number) => Promise<Buffer>;

export const USER_COOKIE = 'mali_session';
export const SESSION_DAYS = 30;
export const MAX_FAILED_LOGINS = 5;
export const LOCK_MINUTES = 15;

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const PHONE_RE = /^[6-9]\d{9}$/;

/** Password rule shown to customers: at least 8 characters with a letter and a number. */
export function passwordProblem(pw: string): string | null {
  if (pw.length < 8) return 'Password must be at least 8 characters';
  if (pw.length > 128) return 'Password is too long';
  if (!/[A-Za-z]/.test(pw) || !/\d/.test(pw)) return 'Use at least one letter and one number';
  return null;
}

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString('hex');
  const hash = await scrypt(password, salt, 64);
  return `${salt}:${hash.toString('hex')}`;
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [salt, hex] = stored.split(':');
  if (!salt || !hex) return false;
  const expected = Buffer.from(hex, 'hex');
  const actual = await scrypt(password, salt, expected.length);
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

const sha256 = (s: string) => createHash('sha256').update(s).digest('hex');

/** Creates a session in the database and sets the login cookie. */
export async function startSession(userId: Types.ObjectId) {
  const token = randomBytes(32).toString('base64url');
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000);
  await SessionModel.create({ tokenHash: sha256(token), userId, expiresAt });
  (await cookies()).set(USER_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    expires: expiresAt,
  });
}

/** Logs out this browser: removes its session and cookie. */
export async function endSession() {
  const jar = await cookies();
  const token = jar.get(USER_COOKIE)?.value;
  if (token && isDbConfigured()) {
    await connectDB();
    await SessionModel.deleteOne({ tokenHash: sha256(token) });
  }
  jar.delete(USER_COOKIE);
}

/** The logged-in customer for this request, or null. */
export async function currentUser(): Promise<UserDoc | null> {
  if (!isDbConfigured()) return null;
  const token = (await cookies()).get(USER_COOKIE)?.value;
  if (!token) return null;
  await connectDB();
  const session = await SessionModel.findOne({ tokenHash: sha256(token), expiresAt: { $gt: new Date() } }).lean();
  if (!session) return null;
  return UserModel.findById(session.userId);
}

/** What the browser is allowed to see about a customer (never the password hash). */
export function publicUser(u: UserDoc) {
  return {
    name: u.name,
    email: u.email,
    phone: u.phone || '',
    lastRecipient: u.lastRecipient
      ? {
          name: u.lastRecipient.name || '',
          phone: u.lastRecipient.phone || '',
          address: u.lastRecipient.address || '',
          city: u.lastRecipient.city || '',
          pincode: u.lastRecipient.pincode || '',
        }
      : null,
    wishlist: u.wishlist ?? [],
  };
}

export type PublicUser = ReturnType<typeof publicUser>;
