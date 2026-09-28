import React from "react";

const brands = ["Cadbury", "Mothercare", "Carlton London", "Wild Stone"];

export default function BrandsSection() {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 py-8 sm:py-10 border-t border-rose-light/20 bg-white/50">
      <h2 className="section-title section-title-center mb-6">
        Trusted Premium Brands
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {brands.map((brand) => (
          <div key={brand} className="h-16 rounded-xl border border-rose-light/30 bg-white flex items-center justify-center font-bold text-sm text-botanical/80 shadow-2xs hover:shadow-xs transition-shadow">
            {brand}
          </div>
        ))}
      </div>
    </section>
  );
}