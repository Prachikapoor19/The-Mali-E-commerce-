// POST /api/messages — the Contact Us form. Saves the message in MongoDB
// (shown in /admin → Messages) and, if order emails are set up, emails the shop.
import { createHash } from 'crypto';
import { after } from 'next/server';
import { connectDB, isDbConfigured } from '@/lib/db';
import { MessageModel } from '@/lib/messageModel';
import { sendMessageAlert } from '@/lib/orderAlert';

const str = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE = /^[6-9]\d{9}$/;

// At most this many messages from one connection in the time window
const LIMIT = 3;
const WINDOW_MS = 10 * 60 * 1000;

function hashIp(request: Request) {
  const ip = (request.headers.get('x-forwarded-for') || '').split(',')[0].trim() || request.headers.get('x-real-ip') || 'unknown';
  return createHash('sha256').update(`mali-contact:${ip}`).digest('hex').slice(0, 32);
}

export async function POST(request: Request) {
  if (!isDbConfigured()) return Response.json({ error: 'not_configured' }, { status: 503 });

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid request' }, { status: 400 });
  }

  // Honeypot: a hidden field real visitors never see. Bots fill it → pretend it worked.
  if (str(body.website, 200)) return Response.json({ ok: true }, { status: 201 });

  const name = str(body.name, 80);
  const email = str(body.email, 120).toLowerCase();
  const phone = str(body.phone, 15).replace(/[\s-]/g, '').replace(/^(\+91|0)/, '');
  const message = str(body.message, 2000);

  const errors: Record<string, string> = {};
  if (!name) errors.name = 'Please enter your name';
  if (!EMAIL.test(email)) errors.email = 'Please enter a valid email';
  if (phone && !PHONE.test(phone)) errors.phone = 'Please enter a 10-digit mobile number';
  if (message.length < 10) errors.message = 'Please write a few more words';
  if (Object.keys(errors).length) return Response.json({ error: 'invalid', errors }, { status: 400 });

  try {
    await connectDB();
    const ipHash = hashIp(request);
    const recent = await MessageModel.countDocuments({ ipHash, createdAt: { $gte: new Date(Date.now() - WINDOW_MS) } });
    if (recent >= LIMIT) {
      return Response.json({ error: 'Too many messages. Please try again in a few minutes.' }, { status: 429 });
    }
    const saved = await MessageModel.create({ name, email, phone, message, ipHash });

    const siteUrl = new URL(request.url).origin;
    after(async () => {
      await sendMessageAlert({ name, email, phone, message, createdAt: saved.createdAt }, siteUrl);
    });
    return Response.json({ ok: true }, { status: 201 });
  } catch (err) {
    console.error('Saving contact message failed', err);
    return Response.json({ error: 'Could not send your message. Please try again.' }, { status: 500 });
  }
}
