import React from "react";

const brands = ["Cadbury", "Mothercare", "Carlton London", "Wild Stone"];

export default function BrandsSection() {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 py-10 sm:py-12 border-t border-rose-light/20">
      <p className="text-center text-[11px] font-bold uppercase tracking-[0.2em] text-charcoal/50 mb-6">
        Trusted premium brands
      </p>
      <div className="flex flex-wrap items-center justify-center gap-x-10 sm:gap-x-16 gap-y-4">
        {brands.map((brand) => (
          <span
            key={brand}
            className="font-display text-xl sm:text-2xl font-semibold text-botanical/40 hover:text-botanical transition-colors tracking-tight"
          >
            {brand}
          </span>
        ))}
      </div>
    </section>
  );
}
