"use client";

import React, { useState } from "react";
import { useCart } from "./CartContext";

// Only offers the checkout really supports (see pricing.ts)
const offers = [
  { provider: "Welcome Offer", title: "Flat 15% OFF", desc: "On your whole order | Code: MALI15", code: "MALI15", bg: "bg-sand", border: "border-gold/30" },
  { provider: "Special Offer", title: "₹200 OFF", desc: "Instant discount | Code: NEWAPP", code: "NEWAPP", bg: "bg-blush", border: "border-rose-light/60" },
  { provider: "Free Delivery", title: "₹0 Delivery", desc: "On all orders above ₹999", code: null, bg: "bg-petal", border: "border-petal-dark" },
];

export default function OffersBanner() {
  const { coupon, setCoupon } = useCart();
  const [justApplied, setJustApplied] = useState<string | null>(null);

  return (
    <section className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 py-8 sm:py-10">
      <h2 className="section-title mb-4">
        Save More with Offers
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {offers.map((offer) => {
          const applied = offer.code !== null && coupon === offer.code;
          return (
            <div key={offer.provider} className={`p-4 rounded-xl border ${offer.border} ${offer.bg} flex justify-between items-center shadow-2xs`}>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal/60">{offer.provider}</span>
                <h3 className="font-bold text-sm text-botanical mt-0.5">{offer.title}</h3>
                <p className="text-xs text-charcoal/70 mt-1">{offer.desc}</p>
                {justApplied === offer.code && (
                  <p className="text-[11px] font-semibold text-rose mt-1">Applied! You&apos;ll see it in your cart.</p>
                )}
              </div>
              {offer.code ? (
                <button
                  onClick={() => {
                    setCoupon(offer.code as string);
                    setJustApplied(offer.code);
                  }}
                  disabled={applied}
                  className="px-3 py-1.5 bg-botanical text-ivory text-xs font-semibold rounded-lg hover:bg-botanical-light transition-colors whitespace-nowrap disabled:bg-rose disabled:cursor-default"
                >
                  {applied ? "Applied ✓" : "Claim"}
                </button>
              ) : (
                <a href="/search?q=all" className="px-3 py-1.5 bg-botanical text-ivory text-xs font-semibold rounded-lg hover:bg-botanical-light transition-colors whitespace-nowrap">
                  Shop Now
                </a>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
