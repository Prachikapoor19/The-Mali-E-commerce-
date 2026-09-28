import React from "react";

const offers = [
  { provider: "HDFC Bank", title: "Flat 10% OFF", desc: "On orders above ₹999 | Code: HDFC10", bg: "bg-sand", border: "border-gold/30" },
  { provider: "Mobikwik", title: "₹300 Cashback", desc: "Pay via Mobikwik wallet", bg: "bg-blush", border: "border-rose-light/60" },
  { provider: "Paytm", title: "₹100 Cashback", desc: "Assured cashback on UPI", bg: "bg-petal", border: "border-petal-dark" },
];

export default function OffersBanner() {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 py-8 sm:py-10">
      <h2 className="section-title mb-4">
        Save More with Offers
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {offers.map((offer) => (
          <div key={offer.provider} className={`p-4 rounded-xl border ${offer.border} ${offer.bg} flex justify-between items-center shadow-2xs`}>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal/60">{offer.provider}</span>
              <h3 className="font-bold text-sm text-botanical mt-0.5">{offer.title}</h3>
              <p className="text-xs text-charcoal/70 mt-1">{offer.desc}</p>
            </div>
            <button className="px-3 py-1.5 bg-botanical text-ivory text-xs font-semibold rounded-lg hover:bg-botanical-light transition-colors whitespace-nowrap">
              Claim
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}