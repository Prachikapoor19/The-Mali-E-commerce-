'use client';

import { useEffect, useRef, useState } from 'react';
import { useAuth } from './AuthContext';

const input =
  'w-full text-sm h-11 px-3.5 rounded-xl border border-botanical/20 bg-white outline-none focus:border-botanical/50 focus:ring-4 focus:ring-blush';

type Errors = Record<string, string | undefined>;

// Login / Register popup. Opened from anywhere with useAuth().openAuth().
export default function AuthModal({ initialTab, onClose }: { initialTab: 'login' | 'register'; onClose: () => void }) {
  const { login, register } = useAuth();
  const [tab, setTab] = useState(initialTab);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const first = useRef<HTMLInputElement>(null);

  useEffect(() => {
    first.current?.focus();
  }, [tab]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  const switchTab = (t: 'login' | 'register') => {
    setTab(t);
    setErrors({});
    setError('');
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const next: Errors = {};
    if (tab === 'register' && !name.trim()) next.name = 'Please enter your name';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) next.email = 'Please enter a valid email';
    if (tab === 'register') {
      if (phone && !/^[6-9]\d{9}$/.test(phone)) next.phone = 'Please enter a 10-digit mobile number';
      if (password.length < 8) next.password = 'Password must be at least 8 characters';
      else if (!/[A-Za-z]/.test(password) || !/\d/.test(password)) next.password = 'Use at least one letter and one number';
    } else if (!password) next.password = 'Please enter your password';
    setErrors(next);
    if (Object.keys(next).length) return;

    setBusy(true);
    const res =
      tab === 'login'
        ? await login(email.trim(), password)
        : await register({ name: name.trim(), email: email.trim(), phone, password });
    setBusy(false);
    if (res.ok) return onClose();
    setErrors(res.errors ?? {});
    setError(res.error ?? '');
  };

  const fieldError = (k: string) => (errors[k] ? <p className="text-xs text-red-600 mt-1">{errors[k]}</p> : null);

  return (
    <div
      className="fixed inset-0 z-[70] bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={tab === 'login' ? 'Log in' : 'Create account'}
        className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl relative border border-botanical/20 animate-pop-in max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-3 right-3 w-10 h-10 rounded-full text-charcoal hover:bg-blush" aria-label="Close">
          ✕
        </button>

        <p className="font-display text-2xl font-bold text-botanical pr-8">
          {tab === 'login' ? 'Welcome back' : 'Create your account'}
        </p>
        <p className="text-xs text-charcoal/60 mt-1 mb-4">
          {tab === 'login' ? 'Log in to see your orders and saved details.' : 'Track orders, save addresses and keep your wishlist on every device.'}
        </p>

        <div className="grid grid-cols-2 gap-1 bg-blush/60 rounded-full p-1 mb-5">
          {(['login', 'register'] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => switchTab(t)}
              className={`min-h-10 rounded-full text-sm font-bold transition-colors ${tab === t ? 'bg-botanical text-ivory' : 'text-botanical'}`}
            >
              {t === 'login' ? 'Log in' : 'Register'}
            </button>
          ))}
        </div>

        <form onSubmit={submit} noValidate className="space-y-3">
          {tab === 'register' && (
            <div>
              <label htmlFor="a-name" className="text-xs font-semibold text-botanical block mb-1">Full name</label>
              <input id="a-name" ref={first} className={input} autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
              {fieldError('name')}
            </div>
          )}
          <div>
            <label htmlFor="a-email" className="text-xs font-semibold text-botanical block mb-1">Email</label>
            <input
              id="a-email"
              ref={tab === 'login' ? first : undefined}
              type="email"
              autoComplete="email"
              className={input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
            {fieldError('email')}
          </div>
          {tab === 'register' && (
            <div>
              <label htmlFor="a-phone" className="text-xs font-semibold text-botanical block mb-1">
                Mobile <span className="font-normal text-charcoal/50">(optional)</span>
              </label>
              <input
                id="a-phone"
                type="tel"
                inputMode="numeric"
                maxLength={10}
                autoComplete="tel-national"
                className={input}
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                placeholder="10-digit number"
              />
              {fieldError('phone')}
            </div>
          )}
          <div>
            <label htmlFor="a-pass" className="text-xs font-semibold text-botanical block mb-1">Password</label>
            <div className="relative">
              <input
                id="a-pass"
                type={show ? 'text' : 'password'}
                autoComplete={tab === 'login' ? 'current-password' : 'new-password'}
                className={`${input} pr-16`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={tab === 'login' ? 'Your password' : 'At least 8 characters'}
              />
              <button
                type="button"
                onClick={() => setShow((s) => !s)}
                className="absolute right-1 top-1/2 -translate-y-1/2 h-9 px-3 rounded-lg text-xs font-semibold text-rose hover:bg-blush"
              >
                {show ? 'Hide' : 'Show'}
              </button>
            </div>
            {fieldError('password')}
            {tab === 'register' && !errors.password && (
              <p className="text-[11px] text-charcoal/50 mt-1">Use at least 8 characters with a letter and a number.</p>
            )}
          </div>

          {error && <p className="text-sm text-red-600" role="alert">{error}</p>}

          <button
            type="submit"
            disabled={busy}
            className="w-full min-h-11 bg-botanical text-ivory text-sm font-bold rounded-xl hover:bg-botanical-light disabled:opacity-60 transition-colors"
          >
            {busy ? 'Please wait…' : tab === 'login' ? 'Log in' : 'Create account'}
          </button>
        </form>

        {tab === 'login' ? (
          <p className="text-xs text-charcoal/60 text-center mt-4">
            Forgot your password?{' '}
            <a href="/contact-us" className="font-semibold text-rose hover:underline">Contact us</a> and we&apos;ll help you reset it.
          </p>
        ) : null}
        <p className="text-[11px] text-charcoal/50 text-center mt-3">
          No account needed to order — you can always check out as a guest. By continuing you agree to our{' '}
          <a href="/terms-and-conditions" className="underline">Terms</a> &amp; <a href="/privacy-policy" className="underline">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
}
