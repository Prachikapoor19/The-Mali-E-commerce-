'use client';

import { useEffect, useRef, useState } from 'react';

const SUPPORT_EMAIL = 'support@themali.com';
const inputClass =
  'w-full rounded-xl border border-charcoal/15 px-4 py-2.5 text-sm outline-none focus:border-rose focus:ring-4 focus:ring-blush bg-white';

type Errors = { name?: string; email?: string; phone?: string; message?: string };

// Sends the message to /api/messages (saved in MongoDB, shown in /admin → Messages).
// If the database isn't set up yet (demo mode), it falls back to opening the visitor's email app.
export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [website, setWebsite] = useState(''); // honeypot — real visitors never see this field
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'mailto'>('idle');
  const [serverError, setServerError] = useState('');
  const doneRef = useRef<HTMLDivElement>(null);

  // On phones the form shrinks after sending, so bring the thank-you note into view
  useEffect(() => {
    if (status === 'sent' || status === 'mailto') doneRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [status]);

  const validate = (): Errors => {
    const next: Errors = {};
    if (!name.trim()) next.name = 'Please enter your name';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) next.email = 'Please enter a valid email';
    const digits = phone.replace(/[\s-]/g, '').replace(/^(\+91|0)/, '');
    if (phone.trim() && !/^[6-9]\d{9}$/.test(digits)) next.phone = 'Please enter a 10-digit mobile number';
    if (message.trim().length < 10) next.message = 'Please write a few more words';
    return next;
  };

  const openEmailApp = () => {
    const subject = encodeURIComponent(`Message from ${name.trim()} via The Mali website`);
    const body = encodeURIComponent(`${message.trim()}\n\n— ${name.trim()} (${email.trim()}${phone.trim() ? `, ${phone.trim()}` : ''})`);
    window.location.href = `mailto:${SUPPORT_EMAIL}?subject=${subject}&body=${body}`;
    setStatus('mailto');
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError('');
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus('sending');
    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, message, website }),
      });
      if (res.status === 503) return openEmailApp(); // demo mode: no database yet
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setStatus('sent');
        return;
      }
      if (data.errors) setErrors(data.errors);
      setServerError(typeof data.error === 'string' && data.error !== 'invalid' ? data.error : '');
      setStatus('idle');
    } catch {
      setServerError('Could not send your message. Please check your internet and try again.');
      setStatus('idle');
    }
  };

  if (status === 'sent') {
    return (
      <div ref={doneRef} className="bg-blush rounded-2xl p-6 scroll-mt-40" role="status">
        <p className="font-display text-xl font-bold text-botanical">Thank you, {name.trim().split(' ')[0]}! 🌿</p>
        <p className="text-sm text-charcoal/70 mt-1">
          We have received your message and will reply to <b>{email.trim()}</b> within 24 hours.
        </p>
        <button
          onClick={() => {
            setMessage('');
            setStatus('idle');
          }}
          className="mt-4 min-h-10 text-sm font-semibold text-rose hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  if (status === 'mailto') {
    return (
      <div ref={doneRef} className="bg-blush rounded-2xl p-6 scroll-mt-40" role="status">
        <p className="font-semibold text-botanical">Your email app should now be open with your message ready.</p>
        <p className="text-sm text-charcoal/70 mt-1">
          Just press send. If nothing opened, write to us directly at{' '}
          <a href={`mailto:${SUPPORT_EMAIL}`} className="underline text-rose">{SUPPORT_EMAIL}</a>.
        </p>
        <button onClick={() => setStatus('idle')} className="mt-4 min-h-10 text-sm font-semibold text-rose hover:underline">
          Edit message
        </button>
      </div>
    );
  }

  const sending = status === 'sending';
  return (
    <form className="space-y-4" onSubmit={submit} noValidate>
      <div>
        <label className="text-sm font-semibold text-botanical block mb-1" htmlFor="c-name">Name</label>
        <input id="c-name" type="text" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} className={inputClass} placeholder="Your name" />
        {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-semibold text-botanical block mb-1" htmlFor="c-email">Email</label>
          <input id="c-email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} placeholder="you@example.com" />
          {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
        </div>
        <div>
          <label className="text-sm font-semibold text-botanical block mb-1" htmlFor="c-phone">
            Phone <span className="font-normal text-charcoal/50">(optional)</span>
          </label>
          <input id="c-phone" type="tel" inputMode="numeric" autoComplete="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputClass} placeholder="10-digit mobile number" />
          {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone}</p>}
        </div>
      </div>
      <div>
        <label className="text-sm font-semibold text-botanical block mb-1" htmlFor="c-msg">Message</label>
        <textarea id="c-msg" rows={5} maxLength={2000} value={message} onChange={(e) => setMessage(e.target.value)} className={inputClass} placeholder="How can we help?" />
        {errors.message && <p className="text-xs text-red-600 mt-1">{errors.message}</p>}
      </div>

      {/* Honeypot: hidden from people, bots fill it in */}
      <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
        <label htmlFor="c-website">Website</label>
        <input id="c-website" type="text" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
      </div>

      {serverError && <p className="text-sm text-red-600" role="alert">{serverError}</p>}

      <button
        type="submit"
        disabled={sending}
        className="min-h-11 bg-rose hover:bg-rose-dark disabled:opacity-60 text-ivory font-semibold px-6 py-2.5 rounded-full transition-colors"
      >
        {sending ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  );
}
