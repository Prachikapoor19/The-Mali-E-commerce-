import React from "react";

export default function TrustBanner() {
  return (
    <section className="w-full bg-white border-t border-b border-rose-light/20 py-8 my-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
        <div className="flex flex-col items-center">
          <span className="text-2xl mb-1">⭐</span>
          <h4 className="font-bold text-sm text-botanical">4.8★ Verified Customer Reviews</h4>
          <p className="text-xs text-charcoal/60 mt-0.5">500,000+ happy gifting celebrations</p>
        </div>

        <div className="flex flex-col items-center">
          <span className="text-2xl mb-1">📍</span>
          <h4 className="font-bold text-sm text-botanical">19,000+ PIN Codes Covered</h4>
          <p className="text-xs text-charcoal/60 mt-0.5">Express 60-Min & Midnight Delivery slots</p>
        </div>

        <div className="flex flex-col items-center">
          <span className="text-2xl mb-1">🔒</span>
          <h4 className="font-bold text-sm text-botanical">100% Safe Payments & Fresh Guarantee</h4>
          <p className="text-xs text-charcoal/60 mt-0.5">UPI, Cards, NetBanking, & Wallet Support</p>
        </div>
      </div>
    </section>
  );
}