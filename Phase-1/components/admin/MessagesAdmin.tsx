'use client';

import { useCallback, useEffect, useState } from 'react';

export interface AdminMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: 'new' | 'read';
  createdAt: string;
}

function when(iso: string) {
  return new Date(iso).toLocaleString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit' });
}

// /admin → Messages: everything sent through the Contact Us form
export default function MessagesAdmin({
  onUnauthorized,
  onNewCount,
}: {
  onUnauthorized: () => void;
  onNewCount?: (n: number) => void;
}) {
  const [messages, setMessages] = useState<AdminMessage[]>([]);
  const [state, setState] = useState<'loading' | 'ready' | 'error'>('loading');
  const [filter, setFilter] = useState<'new' | 'all'>('all');
  const [busy, setBusy] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/messages', { cache: 'no-store' });
      if (res.status === 401) return onUnauthorized();
      if (!res.ok) return setState('error');
      setMessages((await res.json()).messages);
      setState('ready');
    } catch {
      setState('error');
    }
  }, [onUnauthorized]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    onNewCount?.(messages.filter((m) => m.status === 'new').length);
  }, [messages, onNewCount]);

  const setStatus = async (m: AdminMessage, status: 'new' | 'read') => {
    setBusy(m.id);
    const res = await fetch(`/api/admin/messages/${m.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    }).catch(() => null);
    setBusy(null);
    if (res?.status === 401) return onUnauthorized();
    if (res?.ok) setMessages((list) => list.map((x) => (x.id === m.id ? { ...x, status } : x)));
  };

  const remove = async (m: AdminMessage) => {
    if (!window.confirm(`Delete the message from ${m.name}? This cannot be undone.`)) return;
    setBusy(m.id);
    const res = await fetch(`/api/admin/messages/${m.id}`, { method: 'DELETE' }).catch(() => null);
    setBusy(null);
    if (res?.status === 401) return onUnauthorized();
    if (res?.ok) setMessages((list) => list.filter((x) => x.id !== m.id));
  };

  if (state === 'loading') return <p className="text-sm text-charcoal/60 p-6">Loading messages…</p>;
  if (state === 'error')
    return (
      <div className="p-10 text-center">
        <p className="text-sm text-charcoal/70">Could not load messages.</p>
        <button onClick={load} className="mt-4 px-5 py-2 rounded-full bg-botanical text-ivory text-sm">Try again</button>
      </div>
    );

  const newCount = messages.filter((m) => m.status === 'new').length;
  const shown = filter === 'new' ? messages.filter((m) => m.status === 'new') : messages;

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 mb-5">
        {(['all', 'new'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`min-h-10 px-4 rounded-full text-sm font-semibold border ${
              filter === f ? 'bg-botanical text-ivory border-botanical' : 'bg-white text-botanical border-botanical/20'
            }`}
          >
            {f === 'all' ? `All (${messages.length})` : `New (${newCount})`}
          </button>
        ))}
        <button onClick={load} className="min-h-10 px-4 rounded-full text-sm font-semibold text-rose hover:underline ml-auto">
          Refresh
        </button>
      </div>

      {shown.length === 0 ? (
        <div className="bg-white rounded-2xl border border-rose-light/30 p-10 text-center text-sm text-charcoal/60">
          {filter === 'new' ? 'No new messages. You are all caught up.' : 'No messages yet. They will appear here when someone uses the Contact Us form.'}
        </div>
      ) : (
        <ul className="space-y-3">
          {shown.map((m) => (
            <li
              key={m.id}
              className={`bg-white rounded-2xl border p-4 sm:p-5 ${m.status === 'new' ? 'border-gold shadow-sm' : 'border-rose-light/30'}`}
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="font-semibold text-botanical flex items-center gap-2">
                    {m.name}
                    {m.status === 'new' && <span className="text-[11px] font-bold bg-gold text-botanical rounded-full px-2 py-0.5">NEW</span>}
                  </p>
                  <p className="text-xs text-charcoal/60 mt-0.5">{when(m.createdAt)}</p>
                </div>
                <div className="flex flex-wrap gap-2 text-sm">
                  <a
                    href={`mailto:${m.email}?subject=${encodeURIComponent('Re: your message to The Mali')}`}
                    className="inline-flex items-center min-h-10 px-4 rounded-full bg-botanical text-ivory font-semibold hover:bg-botanical-light"
                  >
                    Reply by email
                  </a>
                  {m.phone && (
                    <a href={`tel:${m.phone}`} className="inline-flex items-center min-h-10 px-4 rounded-full border border-botanical/20 text-botanical font-semibold hover:border-botanical">
                      Call {m.phone}
                    </a>
                  )}
                </div>
              </div>

              <p className="mt-3 text-sm text-charcoal whitespace-pre-wrap break-words bg-ivory rounded-xl p-3">{m.message}</p>
              <p className="mt-2 text-xs text-charcoal/60 break-all">{m.email}</p>

              <div className="mt-3 flex gap-3 text-sm">
                <button
                  disabled={busy === m.id}
                  onClick={() => setStatus(m, m.status === 'new' ? 'read' : 'new')}
                  className="min-h-10 px-3 font-semibold text-rose hover:underline disabled:opacity-50"
                >
                  {m.status === 'new' ? 'Mark as read' : 'Mark as new'}
                </button>
                <button
                  disabled={busy === m.id}
                  onClick={() => remove(m)}
                  className="min-h-10 px-3 font-semibold text-charcoal/50 hover:text-red-600 disabled:opacity-50"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
