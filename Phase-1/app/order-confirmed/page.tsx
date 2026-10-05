'use client';

import { sized } from '../../components/imageUrl';
import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { findOrder, type Order } from '@/components/orders';
import { formatINR } from '@/components/pricing';

function prettyDate(ymd: string) {
  const [y, m, d] = ymd.split('-').map(Number);
  if (!y || !m || !d) return ymd;
  return new Date(y, m - 1, d).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' });
}

function OrderDetails() {
  const params = useSearchParams();
  const id = params.get('id') || '';
  const [order, setOrder] = useState<Order | null | undefined>(undefined);

  useEffect(() => {
    setOrder(findOrder(id) ?? null);
  }, [id]);

  if (order === undefined) {
    return <div className="py-24 text-center text-sm text-charcoal/50">Loading your order…</div>;
  }

  if (order === null) {
    return (
      <section className="px-4 py-20 text-center max-w-md mx-auto">
        <h1 className="section-title section-title-center mb-4">Order not found</h1>
        <p className="text-sm text-charcoal/60 mb-8">We couldn&apos;t find this order on this device.</p>
        <a href="/" className="inline-block px-6 py-3 rounded-full bg-botanical text-ivory text-sm font-semibold">
          Continue Shopping
        </a>
      </section>
    );
  }

  return (
    <section className="w-full px-4 sm:px-6 py-10 sm:py-14">
      <div className="max-w-2xl mx-auto">
        {/* Success banner */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 mx-auto rounded-full bg-blush flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-rose" aria-hidden="true">
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </div>
          <h1 className="section-title section-title-center mb-3">Thank you, {order.sender.name.split(' ')[0]}!</h1>
          <p className="text-sm text-charcoal/70">Your order has been placed. We&apos;ll send updates to {order.sender.phone}.</p>
          <p className="mt-4 inline-block px-4 py-2 rounded-full bg-sand text-sm">
            Order ID: <strong className="text-botanical tracking-wide">{order.id}</strong>
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-rose-light/30 divide-y divide-rose-light/20">
          {/* Delivery */}
          <div className="p-5 sm:p-6 grid sm:grid-cols-2 gap-5 text-sm">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-charcoal/50 mb-1">Delivering to</p>
              <p className="font-semibold text-botanical">{order.recipient.name}</p>
              <p className="text-charcoal/70">{order.recipient.address}</p>
              <p className="text-charcoal/70">
                {order.recipient.city} – {order.recipient.pincode}
              </p>
              <p className="text-charcoal/70">{order.recipient.phone}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-charcoal/50 mb-1">Delivery</p>
              <p className="font-semibold text-botanical">{prettyDate(order.deliveryDate)}</p>
              <p className="text-charcoal/70">{order.slotName}</p>
              <p className="text-xs font-semibold uppercase tracking-wider text-charcoal/50 mt-3 mb-1">Payment</p>
              <p className="text-charcoal/70">{order.paymentMethod}</p>
            </div>
          </div>

          {order.giftMessage && (
            <div className="p-5 sm:p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-charcoal/50 mb-2">Gift message</p>
              <p className="font-display italic text-botanical bg-sand rounded-xl p-4">&ldquo;{order.giftMessage}&rdquo;</p>
            </div>
          )}

          {/* Items */}
          <div className="p-5 sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-charcoal/50 mb-3">Items</p>
            <div className="space-y-3">
              {order.items.map((item) => (
                <div key={item.id + (item.customText || '')} className="flex items-center gap-3">
                  <img loading="lazy" decoding="async" src={sized(item.image, 160)} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-botanical line-clamp-1">{item.name}</p>
                    <p className="text-xs text-charcoal/60">Qty {item.quantity}</p>
                  </div>
                  <p className="text-sm font-semibold">{formatINR(item.price * item.quantity)}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 pt-4 border-t border-rose-light/20 space-y-1.5 text-sm">
              <div className="flex justify-between text-charcoal/70">
                <span>Subtotal</span>
                <span>{formatINR(order.subtotal)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-rose font-semibold">
                  <span>Coupon ({order.coupon})</span>
                  <span>-{formatINR(order.discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-charcoal/70">
                <span>Delivery</span>
                <span>{order.delivery === 0 ? 'FREE' : formatINR(order.delivery)}</span>
              </div>
              <div className="flex justify-between font-bold text-base text-botanical pt-2">
                <span>Total</span>
                <span>{formatINR(order.total)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
          <a href={`/track-order?id=${order.id}`} className="px-6 py-3 rounded-full border border-botanical text-botanical text-sm font-semibold text-center hover:bg-blush transition-colors">
            Track Order
          </a>
          <a href="/" className="px-6 py-3 rounded-full bg-botanical text-ivory text-sm font-semibold text-center hover:bg-botanical-light transition-colors">
            Continue Shopping
          </a>
        </div>
      </div>
    </section>
  );
}

export default function OrderConfirmedPage() {
  return (
    <main>
      <Header />
      <Suspense fallback={<div className="py-24 text-center text-sm text-charcoal/50">Loading…</div>}>
        <OrderDetails />
      </Suspense>
      <Footer />
    </main>
  );
}
