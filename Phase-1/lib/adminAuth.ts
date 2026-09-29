// Very small admin login: one password (ADMIN_PASSWORD env var) → signed, httpOnly cookie.
import { createHmac, timingSafeEqual } from 'crypto';

export const ADMIN_COOKIE = 'mali_admin';
const MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days

function secret(): string {
  // Signing key: ADMIN_SECRET if set, else derived from the password
  return process.env.ADMIN_SECRET || `mali:${process.env.ADMIN_PASSWORD || ''}`;
}

function sign(value: string): string {
  return createHmac('sha256', secret()).update(value).digest('hex');
}

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  return ab.length === bb.length && timingSafeEqual(ab, bb);
}

export function isAdminConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD);
}

export function checkPassword(input: string): boolean {
  const expected = process.env.ADMIN_PASSWORD || '';
  return expected.length > 0 && safeEqual(input, expected);
}

export function makeSessionToken(): string {
  const expires = String(Math.floor(Date.now() / 1000) + MAX_AGE_SECONDS);
  return `${expires}.${sign(expires)}`;
}

export function isValidSession(token: string | undefined): boolean {
  if (!token || !isAdminConfigured()) return false;
  const [expires, sig] = token.split('.');
  if (!expires || !sig || !safeEqual(sig, sign(expires))) return false;
  return Number(expires) > Date.now() / 1000;
}

export const sessionCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
  maxAge: MAX_AGE_SECONDS,
};
