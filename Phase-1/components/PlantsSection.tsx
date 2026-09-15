import React from "react";

const plants = [
  { title: "Indoor Plants", desc: "Purify your air", emoji: "🪴", price: "₹399" },
  { title: "Money Plants", desc: "Bring good fortune", emoji: "🌿", price: "₹299" },
  { title: "Lucky Bamboo", desc: "Positivity & harmony", emoji: "🎋", price: "₹499" },
  { title: "Peace Lily", desc: "Elegant & serene", emoji: "🌺", price: "₹599" },
  { title: "All Plants", desc: "Explore entire range", emoji: "🌱", price: "From ₹249" },
];

export default function PlantsSection() {
  return (
    <section className="w-full bg-[#EBF3ED] py-8 px-4 sm:px-6 lg:px-10 xl:px-14 my-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="font-display text-xl sm:text-2xl font-bold text-botanical">
            Plants for Every Vibe
          </h2>
          <p className="text-xs sm:text-sm text-charcoal/70 mt-1">
            Breathe green life into your personal spaces
          </p>
        </div>
        <a href="#" className="text-xs sm:text-sm font-semibold text-rose hover:text-rose-dark transition-colors">
          View All Plants &rarr;
        </a>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {plants.map((plant) => (
          <a key={plant.title} href="#" className="group bg-white rounded-xl p-4 border border-rose-light/30 shadow-xs hover:shadow-md transition-all flex flex-col items-center text-center">
            <div className="w-full h-28 rounded-lg bg-blush/50 flex items-center justify-center text-4xl mb-3 group-hover:scale-105 transition-transform">
              {plant.emoji}
            </div>
            <h3 className="font-semibold text-sm text-botanical">
              {plant.title}
            </h3>
            <p className="text-xs text-charcoal/60 mt-0.5">
              {plant.desc}
            </p>
            <span className="mt-2 text-xs font-bold text-rose">
              {plant.price}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}