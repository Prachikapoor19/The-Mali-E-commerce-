'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import CategoryNav from '@/components/CategoryNav';
import Footer from '@/components/Footer';
import { useAuth } from '@/components/AuthContext';
import { formatINR } from '@/components/pricing';
import { sized } from '@/components/imageUrl';

type Status = 'placed' | 'preparing' | 'out_for_delivery' | 'delivered' | 'cancelled';
interface MyOrder {
  orderId: string;
  createdAt: string;
  status: Status;
  total: number;
  deliveryDate: string;
  slotName: string;
  recipientName: string;
  city: string;
  items: { name: string; quantity: number; image: string }[];
}

const STATUS: Record<Status, { label: string; style: string }> = {
  placed: { label: 'Order placed', style: 'bg-gold/20 text-gold-dark' },
  preparing: { label: 'Preparing', style: 'bg-blush text-rose-dark' },
  out_for_delivery: { label: 'Out for delivery', style: 'bg-rose text-ivory' },
  delivered: { label: 'Delivered', style: 'bg-botanical text-ivory' },
  cancelled: { label: 'Cancelled', style: 'bg-charcoal/10 text-charcoal/60' },
};

const input =
  'w-full text-sm h-11 px-3.5 rounded-xl border border-botanical/20 bg-white outline-none focus:border-botanical/50 focus:ring-4 focus:ring-blush';

function prettyDate(ymd: string) {
  const [y, m, d] = ymd.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
}

export default function AccountPage() {
  const { user, ready, openAuth, logout, setUser } = useAuth();
  const [orders, setOrders] = useState<MyOrder[] | null>(null);
  const [ordersError, setOrdersError] = useState(false);

  // Profile form
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [profileMsg, setProfileMsg] = useState('');
  const [profileErrors, setProfileErrors] = useState<Record<string, string>>({});
  const [savingProfile, setSavingProfile] = useState(false);

  // Change password
  const [showPw, setShowPw] = useState(false);
  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [pwMsg, setPwMsg] = useState('');
  const [pwErrors, setPwErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!user) return;
    setName(user.name);
    setPhone(user.phone);
    fetch('/api/account/orders', { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => setOrders(d.orders))
      .catch(() => setOrdersError(true));
  }, [user?.email]); // eslint-disable-line react-hooks/exhaustive-deps

  const patch = async (body: Record<string, string>) => {
    const res = await fetch('/api/auth/me', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }).catch(() => null);
    const data = res ? await res.json().catch(() => ({})) : { error: 'Please check your internet connection.' };
    if (res?.ok && data.user) setUser(data.user);
    return { ok: Boolean(res?.ok), data };
  };

  const saveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileMsg('');
    setSavingProfile(true);
    const { ok, data } = await patch({ name, phone });
    setSavingProfile(false);
    setProfileErrors(ok ? {} : data.errors ?? {});
    setProfileMsg(ok ? 'Saved ✓' : data.errors ? '' : data.error ?? 'Could not save');
  };

  const changePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwMsg('');
    const { ok, data } = await patch({ currentPassword: currentPw, newPassword: newPw });
    setPwErrors(ok ? {} : data.errors ?? {});
    if (ok) {
      setCurrentPw('');
      setNewPw('');
      setPwMsg('Password changed ✓');
    } else if (!data.errors) setPwMsg(data.error ?? 'Could not change password');
  };

  return (
    <main>
      <Header />
      <CategoryNav />
      <section className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 py-8 sm:py-10 min-h-[60vh]">
        <div className="max-w-4xl mx-auto">
          {!ready ? (
            <p className="text-sm text-charcoal/50 py-10">Loading…</p>
          ) : !user ? (
            <div className="text-center py-16 max-w-md mx-auto">
              <h1 className="section-title section-title-center mb-3">My Account</h1>
              <p className="text-sm text-charcoal/70 mb-6">
                Log in to see your orders, saved delivery details and wishlist on any device.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <button onClick={() => openAuth('login')} className="min-h-11 px-6 rounded-full bg-botanical text-ivory text-sm font-bold hover:bg-botanical-light">
                  Log in
                </button>
                <button onClick={() => openAuth('register')} className="min-h-11 px-6 rounded-full border border-botanical/30 text-botanical text-sm font-bold hover:border-botanical">
                  Create account
                </button>
              </div>
              <p className="text-xs text-charcoal/50 mt-6">
                Ordered as a guest? <a href="/track-order" className="text-rose font-semibold hover:underline">Track it with your Order ID</a>.
              </p>
            </div>
          ) : (
            <>
              <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold-dark">My Account</span>
                  <h1 className="section-title mt-1">Hi, {user.name.split(' ')[0]} 🌿</h1>
                  <p className="text-sm text-charcoal/60 mt-1 break-all">{user.email}</p>
                </div>
                <button
                  onClick={async () => {
                    await logout();
                    window.location.href = '/';
                  }}
                  className="min-h-10 px-5 rounded-full border border-botanical/25 text-sm font-semibold text-botanical hover:border-botanical"
                >
                  Log out
                </button>
              </div>

              {/* My Orders */}
              <h2 className="font-display text-xl font-bold text-botanical mb-3">My Orders</h2>
              {ordersError ? (
                <p className="text-sm text-charcoal/60 bg-white rounded-2xl p-6 border border-rose-light/30">Could not load your orders. Please refresh the page.</p>
              ) : orders === null ? (
                <p className="text-sm text-charcoal/50 py-6">Loading your orders…</p>
              ) : orders.length === 0 ? (
                <div className="bg-white rounded-2xl p-8 border border-rose-light/30 text-center">
                  <p className="text-sm text-charcoal/70">No orders yet. Orders you place while logged in will appear here.</p>
                  <a href="/search?q=all" className="inline-flex items-center min-h-10 mt-4 px-5 rounded-full bg-rose text-ivory text-sm font-semibold hover:bg-rose-dark">
                    Start shopping
                  </a>
                </div>
              ) : (
                <ul className="space-y-3">
                  {orders.map((o) => (
                    <li key={o.orderId} className="bg-white rounded-2xl p-4 sm:p-5 border border-rose-light/30 shadow-xs">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div>
                          <p className="font-bold text-botanical">{o.orderId}</p>
                          <p className="text-xs text-charcoal/60 mt-0.5">
                            Delivery {prettyDate(o.deliveryDate)} · {o.slotName}
                          </p>
                        </div>
                        <span className={`text-[11px] font-bold rounded-full px-2.5 py-1 ${STATUS[o.status]?.style ?? ''}`}>
                          {STATUS[o.status]?.label ?? o.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-3 overflow-x-auto">
                        {o.items.slice(0, 4).map((it, i) => (
                          <img
                            key={i}
                            loading="lazy"
                            src={sized(it.image, 120)}
                            alt={it.name}
                            className="w-12 h-12 rounded-lg object-cover bg-sand shrink-0"
                          />
                        ))}
                        <p className="text-xs text-charcoal/70 ml-1 line-clamp-2">
                          {o.items.map((it) => `${it.name}${it.quantity > 1 ? ` × ${it.quantity}` : ''}`).join(', ')}
                        </p>
                      </div>
                      <div className="flex flex-wrap items-center justify-between gap-2 mt-3 pt-3 border-t border-rose-light/20">
                        <p className="text-xs text-charcoal/60">
                          For <b className="text-botanical">{o.recipientName}</b>, {o.city}
                        </p>
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-botanical">{formatINR(o.total)}</span>
                          <a
                            href={`/track-order?id=${encodeURIComponent(o.orderId)}`}
                            className="inline-flex items-center min-h-10 px-4 rounded-full bg-botanical text-ivory text-xs font-semibold hover:bg-botanical-light"
                          >
                            Track
                          </a>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              {/* Profile + password */}
              <div className="grid md:grid-cols-2 gap-4 mt-10">
                <form onSubmit={saveProfile} className="bg-white rounded-2xl p-5 border border-rose-light/30 space-y-3" noValidate>
                  <h2 className="font-display text-lg font-bold text-botanical">My details</h2>
                  <div>
                    <label htmlFor="p-name" className="text-xs font-semibold text-botanical block mb-1">Name</label>
                    <input id="p-name" className={input} value={name} onChange={(e) => setName(e.target.value)} />
                    {profileErrors.name && <p className="text-xs text-red-600 mt-1">{profileErrors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="p-phone" className="text-xs font-semibold text-botanical block mb-1">Mobile</label>
                    <input
                      id="p-phone"
                      className={input}
                      inputMode="numeric"
                      maxLength={10}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                      placeholder="Used to fill checkout for you"
                    />
                    {profileErrors.phone && <p className="text-xs text-red-600 mt-1">{profileErrors.phone}</p>}
                  </div>
                  {user.lastRecipient?.address && (
                    <p className="text-xs text-charcoal/60 bg-ivory rounded-xl p-3">
                      <b className="text-botanical">Saved delivery address:</b> {user.lastRecipient.name}, {user.lastRecipient.address},{' '}
                      {user.lastRecipient.city} – {user.lastRecipient.pincode}
                      <br />
                      You can use it with one tap at checkout.
                    </p>
                  )}
                  <div className="flex items-center gap-3">
                    <button disabled={savingProfile} className="min-h-10 px-5 rounded-full bg-botanical text-ivory text-sm font-semibold hover:bg-botanical-light disabled:opacity-60">
                      {savingProfile ? 'Saving…' : 'Save'}
                    </button>
                    {profileMsg && <span className="text-sm text-botanical">{profileMsg}</span>}
                  </div>
                </form>

                <div className="bg-white rounded-2xl p-5 border border-rose-light/30">
                  <h2 className="font-display text-lg font-bold text-botanical">Password</h2>
                  {!showPw ? (
                    <button onClick={() => setShowPw(true)} className="mt-3 min-h-10 px-5 rounded-full border border-botanical/25 text-sm font-semibold text-botanical hover:border-botanical">
                      Change password
                    </button>
                  ) : (
                    <form onSubmit={changePassword} className="space-y-3 mt-3" noValidate>
                      <div>
                        <label htmlFor="pw-cur" className="text-xs font-semibold text-botanical block mb-1">Current password</label>
                        <input id="pw-cur" type="password" autoComplete="current-password" className={input} value={currentPw} onChange={(e) => setCurrentPw(e.target.value)} />
                        {pwErrors.currentPassword && <p className="text-xs text-red-600 mt-1">{pwErrors.currentPassword}</p>}
                      </div>
                      <div>
                        <label htmlFor="pw-new" className="text-xs font-semibold text-botanical block mb-1">New password</label>
                        <input id="pw-new" type="password" autoComplete="new-password" className={input} value={newPw} onChange={(e) => setNewPw(e.target.value)} placeholder="At least 8 characters, a letter and a number" />
                        {pwErrors.newPassword && <p className="text-xs text-red-600 mt-1">{pwErrors.newPassword}</p>}
                      </div>
                      <div className="flex items-center gap-3">
                        <button className="min-h-10 px-5 rounded-full bg-botanical text-ivory text-sm font-semibold hover:bg-botanical-light">Update password</button>
                        {pwMsg && <span className="text-sm text-botanical">{pwMsg}</span>}
                      </div>
                    </form>
                  )}
                  {showPw === false && pwMsg && <p className="text-sm text-botanical mt-2">{pwMsg}</p>}
                </div>
              </div>
            </>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
}
