'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState('');
  const [result, setResult] = useState<string | null>(null);

  const handleTrack = () => {
    if (!orderId.trim()) return;
    setResult(`Order ${orderId} is on its way — expected delivery today by 8 PM.`);
  };

  return (
    <main>
      <Header />
      <section className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 py-12">
        <div className="max-w-xl mx-auto text-center">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-botanical mb-3">
            Track Your Order
          </h1>
          <p className="text-charcoal/70 mb-8">
            Enter your order ID to see the latest delivery status.
          </p>

          <div className="flex gap-2">
            <input
              type="text"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="e.g. MALI123456"
              className="flex-1 rounded-full border border-charcoal/15 px-5 py-3 text-sm outline-none focus:border-rose"
            />
            <button
              onClick={handleTrack}
              className="bg-botanical hover:bg-botanical-light text-ivory font-semibold px-6 py-3 rounded-full transition-colors shrink-0"
            >
              Track
            </button>
          </div>

          {result && (
            <div className="mt-6 bg-blush rounded-2xl p-5 text-left">
              <p className="text-sm font-semibold text-botanical">{result}</p>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
}