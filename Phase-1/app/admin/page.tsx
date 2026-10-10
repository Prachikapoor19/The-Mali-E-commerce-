'use client';

import { useCallback, useEffect, useState } from 'react';
import { formatINR } from '@/components/pricing';
import ProductsAdmin from '@/components/admin/ProductsAdmin';
import MessagesAdmin from '@/components/admin/MessagesAdmin';

type Status = 'placed' | 'preparing' | 'out_for_delivery' | 'delivered' | 'cancelled';

interface AdminOrder {
  orderId: string;
  createdAt: string;
  status: Status;
  items: { productId: string; name: string; price: number; quantity: number; customText?: string }[];
  recipient: { name: string; phone: string; address: string; city: string; pincode: string };
  sender: { name: string; phone: string };
  deliveryDate: string;
  slotName: string;
  giftMessage: string;
  paymentMethod: string;
  coupon: string;
  subtotal: number;
  discount: number;
  delivery: number;
  total: number;
}

const STATUS_LABEL: Record<Status, string> = {
  placed: 'New',
  preparing: 'Preparing',
  out_for_delivery: 'Out for delivery',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
};
const STATUS_STYLE: Record<Status, string> = {
  placed: 'bg-gold text-botanical',
  preparing: 'bg-blush text-rose-dark',
  out_for_delivery: 'bg-rose text-ivory',
  delivered: 'bg-botanical text-ivory',
  cancelled: 'bg-charcoal/10 text-charcoal/60',
};
const FILTERS: ('all' | Status)[] = ['all', 'placed', 'preparing', 'out_for_delivery', 'delivered', 'cancelled'];

function when(iso: string) {
  return new Date(iso).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' });
}
function prettyDate(ymd: string) {
  const [y, m, d] = ymd.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });
}

export default function AdminPage() {
  const [state, setState] = useState<'loading' | 'login' | 'setup' | 'ready' | 'error'>('loading');
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [filter, setFilter] = useState<'all' | Status>('all');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [busyId, setBusyId] = useState<string | null>(null);
  const [tab, setTab] = useState<'orders' | 'products' | 'messages'>('orders');
  const [newMessages, setNewMessages] = useState(0);
  const toLogin = useCallback(() => setState('login'), []);

  const load = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/orders', { cache: 'no-store' });
      if (res.status === 401) return setState('login');
      if (res.status === 503) return setState('setup');
      if (!res.ok) return setState('error');
      const data = await res.json();
      setOrders(data.orders);
      setState('ready');
      // Count unread Contact Us messages for the tab label
      fetch('/api/admin/messages', { cache: 'no-store' })
        .then((r) => (r.ok ? r.json() : null))
        .then((d) => d && setNewMessages(d.messages.filter((m: { status: string }) => m.status === 'new').length))
        .catch(() => {});
    } catch {
      setState('error');
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    if (res.status === 503) return setState('setup');
    if (!res.ok) return setLoginError('Wrong password');
    setPassword('');
    setState('loading');
    load();
  };

  const logout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    setOrders([]);
    setState('login');
  };

  const changeStatus = async (orderId: string, status: Status) => {
    setBusyId(orderId);
    const res = await fetch(`/api/admin/orders/${orderId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    if (res.ok) setOrders((list) => list.map((o) => (o.orderId === orderId ? { ...o, status } : o)));
    else if (res.status === 401) setState('login');
    setBusyId(null);
  };

  const counts = FILTERS.reduce<Record<string, number>>((acc, f) => {
    acc[f] = f === 'all' ? orders.length : orders.filter((o) => o.status === f).length;
    return acc;
  }, {});
  const shown = filter === 'all' ? orders : orders.filter((o) => o.status === filter);

  // ---------- Screens ----------
  const shell = (content: React.ReactNode) => (
    <main className="min-h-screen bg-ivory">
      <header className="bg-botanical text-ivory px-4 sm:px-8 py-4 flex items-center justify-between">
        <a href="/" className="font-display text-xl font-bold">The Mali · Admin</a>
        {state === 'ready' && (
          <div className="flex items-center gap-3">
            <button onClick={load} className="text-xs font-semibold px-3 py-1.5 rounded-full border border-ivory/30 hover:bg-ivory/10">Refresh</button>
            <button onClick={logout} className="text-xs font-semibold px-3 py-1.5 rounded-full bg-ivory text-botanical">Log out</button>
          </div>
        )}
      </header>
      {content}
    </main>
  );

  if (state === 'loading') return shell(<p className="p-10 text-center text-sm text-charcoal/60">Loading…</p>);

  if (state === 'setup')
    return shell(
      <div className="max-w-lg mx-auto p-8 mt-10 bg-white rounded-2xl border border-rose-light/30">
        <h1 className="font-display text-xl font-bold text-botanical mb-2">Setup needed</h1>
        <p className="text-sm text-charcoal/70">
          Add <code className="bg-sand px-1 rounded">MONGODB_URI</code> and <code className="bg-sand px-1 rounded">ADMIN_PASSWORD</code> in
          Vercel → Settings → Environment Variables (and in <code className="bg-sand px-1 rounded">.env.local</code> on your computer), then redeploy.
        </p>
      </div>
    );

  if (state === 'login')
    return shell(
      <form onSubmit={login} className="max-w-sm mx-auto p-8 mt-16 bg-white rounded-2xl border border-rose-light/30 shadow-sm">
        <h1 className="font-display text-xl font-bold text-botanical mb-4">Admin login</h1>
        <input
          type="password"
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full text-sm px-4 py-3 rounded-xl border border-botanical/20 focus:outline-none focus:border-botanical"
        />
        {loginError && <p className="text-xs text-red-600 mt-2">{loginError}</p>}
        <button className="w-full mt-4 py-3 rounded-xl bg-botanical text-ivory text-sm font-bold hover:bg-botanical-light">Log in</button>
      </form>
    );

  if (state === 'error')
    return shell(
      <div className="p-10 text-center">
        <p className="text-sm text-charcoal/70">Could not load orders. Check the database connection.</p>
        <button onClick={load} className="mt-4 px-5 py-2 rounded-full bg-botanical text-ivory text-sm">Try again</button>
      </div>
    );

  const tabs = (
    <div className="flex gap-1 bg-white border border-rose-light/30 rounded-full p-1 w-fit max-w-full overflow-x-auto mb-6">
      {(['orders', 'products', 'messages'] as const).map((t) => (
        <button
          key={t}
          onClick={() => setTab(t)}
          className={`px-4 sm:px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap ${tab === t ? 'bg-botanical text-ivory' : 'text-botanical'}`}
        >
          {t === 'orders' ? `Orders (${orders.length})` : t === 'products' ? 'Products' : (
            <>
              Messages
              {newMessages > 0 && (
                <span className="ml-1.5 inline-flex items-center justify-center min-w-5 h-5 px-1 rounded-full bg-gold text-botanical text-[11px] font-bold">{newMessages}</span>
              )}
            </>
          )}
        </button>
      ))}
    </div>
  );

  if (tab === 'messages')
    return shell(
      <div className="px-4 sm:px-8 py-6 max-w-4xl mx-auto">
        {tabs}
        <MessagesAdmin onUnauthorized={toLogin} onNewCount={setNewMessages} />
      </div>
    );

  if (tab === 'products')
    return shell(
      <div className="px-4 sm:px-8 py-6 max-w-6xl mx-auto">
        {tabs}
        <ProductsAdmin onUnauthorized={toLogin} />
      </div>
    );

  return shell(
    <div className="px-4 sm:px-8 py-6 max-w-6xl mx-auto">
      {tabs}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full text-xs font-semibold border whitespace-nowrap ${
              filter === f ? 'bg-botanical text-ivory border-botanical' : 'bg-white text-botanical border-botanical/20'
            }`}
          >
            {f === 'all' ? 'All' : STATUS_LABEL[f]} ({counts[f]})
          </button>
        ))}
      </div>

      {shown.length === 0 ? (
        <p className="text-center text-sm text-charcoal/60 py-16 bg-white rounded-2xl">No orders here yet.</p>
      ) : (
        <div className="space-y-4">
          {shown.map((o) => (
            <article key={o.orderId} className="bg-white rounded-2xl border border-rose-light/30 p-5">
              <div className="flex flex-wrap items-start justify-between gap-3 border-b border-rose-light/20 pb-3 mb-3">
                <div>
                  <p className="font-bold text-botanical">{o.orderId}</p>
                  <p className="text-xs text-charcoal/50">Placed {when(o.createdAt)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${STATUS_STYLE[o.status]}`}>{STATUS_LABEL[o.status]}</span>
                  <select
                    value={o.status}
                    disabled={busyId === o.orderId}
                    onChange={(e) => changeStatus(o.orderId, e.target.value as Status)}
                    className="text-xs border border-botanical/20 rounded-lg px-2 py-1.5 bg-white"
                    aria-label="Change status"
                  >
                    {(Object.keys(STATUS_LABEL) as Status[]).map((s) => (
                      <option key={s} value={s}>{STATUS_LABEL[s]}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-charcoal/40 mb-1">Deliver to</p>
                  <p className="font-semibold text-botanical">{o.recipient.name}</p>
                  <p className="text-charcoal/70">{o.recipient.address}, {o.recipient.city} – {o.recipient.pincode}</p>
                  <a href={`tel:${o.recipient.phone}`} className="text-rose font-semibold">{o.recipient.phone}</a>
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-charcoal/40 mb-1">When</p>
                  <p className="font-semibold text-botanical">{prettyDate(o.deliveryDate)}</p>
                  <p className="text-charcoal/70">{o.slotName}</p>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-charcoal/40 mt-3 mb-1">From</p>
                  <p className="text-charcoal/80">{o.sender.name} · <a href={`tel:${o.sender.phone}`} className="text-rose">{o.sender.phone}</a></p>
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-charcoal/40 mb-1">Items</p>
                  <ul className="space-y-1">
                    {o.items.map((i, idx) => (
                      <li key={idx} className="text-charcoal/80">
                        {i.quantity} × {i.name}
                        {i.customText && <span className="block text-[11px] text-rose">Text: &quot;{i.customText}&quot;</span>}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-2 font-bold text-botanical">
                    {formatINR(o.total)} <span className="font-normal text-xs text-charcoal/50">· {o.paymentMethod}{o.coupon ? ` · ${o.coupon}` : ''}</span>
                  </p>
                </div>
              </div>

              {o.giftMessage && (
                <p className="mt-3 text-sm italic text-botanical bg-sand rounded-xl px-4 py-2">Card: &ldquo;{o.giftMessage}&rdquo;</p>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
