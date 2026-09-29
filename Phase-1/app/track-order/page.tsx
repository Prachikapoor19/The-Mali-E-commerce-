'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { findOrder, type Order } from '@/components/orders';

const STEPS = ['Order placed', 'Being prepared', 'Out for delivery', 'Delivered'];

function prettyDate(ymd: string) {
  const [y, m, d] = ymd.split('-').map(Number);
  if (!y || !m || !d) return ymd;
  return new Date(y, m - 1, d).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'long' });
}

function TrackOrder() {
  const params = useSearchParams();
  const [orderId, setOrderId] = useState('');
  const [order, setOrder] = useState<Order | null>(null);
  const [notFound, setNotFound] = useState(false);

  const track = (id: string) => {
    if (!id.trim()) return;
    const found = findOrder(id);
    setOrder(found ?? null);
    setNotFound(!found);
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
            Track
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
                <p className="font-semibold text-botanical">For {order.recipient.name}, {order.recipient.city}</p>
              </div>
              <p className="text-xs text-right text-charcoal/60">
                {prettyDate(order.deliveryDate)}
                <br />
                {order.slotName}
              </p>
            </div>
            <ol className="space-y-3">
              {STEPS.map((step, i) => {
                const done = i === 0; // only "Order placed" is known until a backend is connected
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
