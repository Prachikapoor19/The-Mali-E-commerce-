'use client';

import { useState } from 'react';

const SUPPORT_EMAIL = 'support@themali.com';
const inputClass = 'w-full rounded-xl border border-charcoal/15 px-4 py-2.5 text-sm outline-none focus:border-rose bg-white';

// No backend yet: the form checks the details, then opens the visitor's email app
// with everything filled in, addressed to our support inbox.
export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (!name.trim()) next.name = 'Please enter your name';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = 'Please enter a valid email';
    if (message.trim().length < 10) next.message = 'Please write a few more words';
    setErrors(next);
    if (Object.keys(next).length) return;

    const subject = encodeURIComponent(`Message from ${name.trim()} via The Mali website`);
    const body = encodeURIComponent(`${message.trim()}\n\n— ${name.trim()} (${email.trim()})`);
    window.location.href = `mailto:${SUPPORT_EMAIL}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  if (sent) {
    return (
      <div className="bg-blush rounded-2xl p-6">
        <p className="font-semibold text-botanical">Your email app should now be open with your message ready.</p>
        <p className="text-sm text-charcoal/70 mt-1">
          Just press send. If nothing opened, write to us directly at{' '}
          <a href={`mailto:${SUPPORT_EMAIL}`} className="underline text-rose">{SUPPORT_EMAIL}</a>.
        </p>
        <button onClick={() => setSent(false)} className="mt-4 text-sm font-semibold text-rose hover:underline">
          Edit message
        </button>
      </div>
    );
  }

  return (
    <form className="space-y-4" onSubmit={submit} noValidate>
      <div>
        <label className="text-sm font-semibold text-botanical block mb-1" htmlFor="c-name">Name</label>
        <input id="c-name" type="text" value={name} onChange={(e) => setName(e.target.value)} className={inputClass} placeholder="Your name" />
        {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
      </div>
      <div>
        <label className="text-sm font-semibold text-botanical block mb-1" htmlFor="c-email">Email</label>
        <input id="c-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} placeholder="you@example.com" />
        {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
      </div>
      <div>
        <label className="text-sm font-semibold text-botanical block mb-1" htmlFor="c-msg">Message</label>
        <textarea id="c-msg" rows={4} value={message} onChange={(e) => setMessage(e.target.value)} className={inputClass} placeholder="How can we help?" />
        {errors.message && <p className="text-xs text-red-600 mt-1">{errors.message}</p>}
      </div>
      <button type="submit" className="bg-rose hover:bg-rose-dark text-ivory font-semibold px-6 py-2.5 rounded-full transition-colors">
        Send Message
      </button>
    </form>
  );
}
