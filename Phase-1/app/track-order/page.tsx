'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { findOrder } from '@/components/orders';

const STEPS = ['Order placed', 'Being prepared', 'Out for delivery', 'Delivered'];
const STATUS_STEP: Record<string, number> = { placed: 0, preparing: 1, out_for_delivery: 2, delivered: 3 };

// What the page shows, whether it came from the database or this device
type Tracked = {
  id: string;
  recipientName: string;
  city: string;
  deliveryDate: string;
  slotName: string;
  status: string; // placed | preparing | out_for_delivery | delivered | cancelled
};

function prettyDate(ymd: string) {
  const [y, m, d] = ymd.split('-').map(Number);
  if (!y || !m || !d) return ymd;
  return new Date(y, m - 1, d).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'long' });
}

function TrackOrder() {
  const params = useSearchParams();
  const [orderId, setOrderId] = useState('');
  const [order, setOrder] = useState<Tracked | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(false);

  const track = async (raw: string) => {
    const id = raw.trim().toUpperCase();
    if (!id) return;
    setLoading(true);
    setNotFound(false);
    let result: Tracked | null = null;
    try {
      // 1) Live status from the database
      const res = await fetch(`/api/orders/${encodeURIComponent(id)}`, { cache: 'no-store' });
      if (res.ok) {
        const d = await res.json();
        result = { id: d.orderId, recipientName: d.recipientFirstName, city: d.city, deliveryDate: d.deliveryDate, slotName: d.slotName, status: d.status };
      }
    } catch {
      // offline — fall back to this device below
    }
    if (!result) {
      // 2) Orders placed on this device (demo mode, before the database was connected)
      const local = findOrder(id);
      if (local) {
        result = { id: local.id, recipientName: local.recipient.name, city: local.recipient.city, deliveryDate: local.deliveryDate, slotName: local.slotName, status: 'placed' };
      }
    }
    setOrder(result);
    setNotFound(!result);
    setLoading(false);
  };

  // Opening /track-order?id=MALI123456 tracks that order straight away
  useEffect(() => {
    const id = params.get('id');
    if (id) {
      setOrderId(id);
      track(id);
    }
  }, [params]);

  return (
    <section className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 py-12">
      <div className="max-w-xl mx-auto text-center">
        <h1 className="section-title section-title-center mb-3">Track Your Order</h1>
        <p className="text-charcoal/70 mb-8">Enter your order ID to see the latest delivery status.</p>

        <div className="flex gap-2">
          <input
            type="text"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && track(orderId)}
            placeholder="e.g. MALI123456"
            className="flex-1 rounded-full border border-charcoal/15 px-5 py-3 text-sm outline-none focus:border-rose uppercase"
          />
          <button
            onClick={() => track(orderId)}
            className="bg-botanical hover:bg-botanical-light text-ivory font-semibold px-6 py-3 rounded-full transition-colors shrink-0"
          >
            {loading ? '…' : 'Track'}
          </button>
        </div>

        {notFound && (
          <div className="mt-6 bg-sand rounded-2xl p-5 text-left text-sm text-charcoal/80">
            We couldn&apos;t find that order ID. Please check it, or contact us at +91 1800-MALI-CARE.
          </div>
        )}

        {order && (
          <div className="mt-6 bg-white border border-rose-light/30 rounded-2xl p-5 sm:p-6 text-left">
            <div className="flex justify-between items-start gap-4 mb-5">
              <div>
                <p className="text-xs text-charcoal/50">Order {order.id}</p>
                <p className="font-semibold text-botanical">For {order.recipientName}, {order.city}</p>
              </div>
              <p className="text-xs text-right text-charcoal/60">
                {prettyDate(order.deliveryDate)}
                <br />
                {order.slotName}
              </p>
            </div>
            {order.status === 'cancelled' ? (
              <p className="text-sm font-semibold text-red-600">This order was cancelled. Please contact us if this is unexpected.</p>
            ) : (
            <ol className="space-y-3">
              {STEPS.map((step, i) => {
                const done = i <= (STATUS_STEP[order.status] ?? 0);
                return (
                  <li key={step} className="flex items-center gap-3 text-sm">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold ${done ? 'bg-rose text-ivory' : 'bg-blush text-charcoal/40'}`}>
                      {i + 1}
                    </span>
                    <span className={done ? 'font-semibold text-botanical' : 'text-charcoal/50'}>{step}</span>
                  </li>
                );
              })}
            </ol>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default function TrackOrderPage() {
  return (
    <main>
      <Header />
      <Suspense fallback={<div className="py-24 text-center text-sm text-charcoal/50">Loading…</div>}>
        <TrackOrder />
      </Suspense>
      <Footer />
    </main>
  );
}
