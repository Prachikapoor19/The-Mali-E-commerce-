import React from "react";

const brands = ["Cadbury", "Mothercare", "Carlton London", "Wild Stone"];

export default function BrandsSection() {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 py-8 border-t border-rose-light/20 bg-white/50 my-6">
      <h2 className="font-display text-lg sm:text-xl font-bold text-botanical mb-6 text-center">
        Trusted Premium Brands
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {brands.map((brand) => (
          <div key={brand} className="h-16 rounded-xl border border-rose-light/30 bg-white flex items-center justify-center font-bold text-sm text-botanical/80 shadow-2xs hover:shadow-xs transition-shadow">
            {brand}
          </div>
        ))}
      </div>

      {/* Trust Counters */}
      <div className="mt-10 grid grid-cols-3 gap-4 text-center border-t border-rose-light/20 pt-8">
        <div>
          <span className="font-display text-xl sm:text-3xl font-bold text-botanical">30+</span>
          <p className="text-xs text-charcoal/60 mt-1">Years of Spreading Joy</p>
        </div>
        <div>
          <span className="font-display text-xl sm:text-3xl font-bold text-botanical">50M+</span>
          <p className="text-xs text-charcoal/60 mt-1">Happy Customers</p>
        </div>
        <div>
          <span className="font-display text-xl sm:text-3xl font-bold text-botanical">100+</span>
          <p className="text-xs text-charcoal/60 mt-1">Cities Covered</p>
        </div>
      </div>
    </section>
  );
}