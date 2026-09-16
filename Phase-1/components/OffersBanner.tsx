// components/OffersBanner.tsx
import React from "react";

export default function OffersBanner() {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 py-6">
      <div className="w-full bg-blush/70 border border-rose-light/40 rounded-xl p-4 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-rose uppercase tracking-wider">Save More With Offers</span>
          <h3 className="font-display text-lg sm:text-xl font-bold text-botanical mt-0.5">
            Get 15% OFF on your first Floral Order
          </h3>
          <p className="text-xs text-charcoal/70">Use coupon code <strong className="text-botanical">FIRSTMALI</strong> at checkout.</p>
        </div>
        <button className="px-5 py-2 bg-botanical text-ivory text-xs font-semibold rounded-lg hover:bg-botanical-light transition-colors whitespace-nowrap">
          Claim Offer
        </button>
      </div>
    </section>
  );
}