import React from "react";

// "Why The Mali" — only promises the site actually keeps
const points = [
  {
    title: "Fresh & Handpicked",
    text: "Flowers and cakes prepared on the day of delivery",
    icon: (
      <path d="M12 22c4-3 7-6.5 7-11a7 7 0 0 0-14 0c0 4.5 3 8 7 11Zm0-11V6m0 5 3-3m-3 3-3-3" />
    ),
  },
  {
    title: "Same-Day & Midnight",
    text: "Express, fixed-time and midnight slots at checkout",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
  },
  {
    title: "Free Message Card",
    text: "Your words, printed and tucked in with every gift",
    icon: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </>
    ),
  },
  {
    title: "Cash on Delivery",
    text: "Pay by cash or UPI when the gift arrives",
    icon: (
      <>
        <rect x="2" y="6" width="20" height="12" rx="2" />
        <circle cx="12" cy="12" r="2.5" />
        <path d="M6 12h.01M18 12h.01" />
      </>
    ),
  },
];

export default function TrustBanner() {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 py-10 sm:py-14">
      <div className="rounded-3xl bg-botanical text-ivory px-6 sm:px-10 py-10 sm:py-12 relative overflow-hidden">
        <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-botanical-light/30 blur-3xl pointer-events-none" />
        <div className="relative text-center mb-8 sm:mb-10">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold">Why The Mali</span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold mt-2">Gifting, done with care</h2>
        </div>
        <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {points.map((p) => (
            <div key={p.title} className="flex flex-col items-center text-center">
              <span className="w-14 h-14 rounded-full bg-ivory/10 border border-ivory/15 flex items-center justify-center mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.6}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-6 h-6 text-gold"
                  aria-hidden="true"
                >
                  {p.icon}
                </svg>
              </span>
              <h3 className="font-semibold text-sm sm:text-base">{p.title}</h3>
              <p className="text-xs text-ivory/70 mt-1 max-w-[16rem]">{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
