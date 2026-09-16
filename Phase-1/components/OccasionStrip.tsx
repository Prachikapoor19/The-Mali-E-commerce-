// components/OccasionStrip.tsx
import React from "react";

const occasions = [
  { label: "Birthday", image: "https://images.pexels.com/photos/1721932/pexels-photo-1721932.jpeg?auto=compress&cs=tinysrgb&w=300", bg: "bg-[#FFF8EE]" },
  { label: "Congratulations", image: "https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&cs=tinysrgb&w=300", bg: "bg-[#F0F6FF]" },
  { label: "Anniversary", image: "https://images.pexels.com/photos/56866/rose-rose-blooms-roses-pink-56866.jpeg?auto=compress&cs=tinysrgb&w=300", bg: "bg-[#FFF0F3]" },
  { label: "Festive Special", image: "https://images.pexels.com/photos/264771/pexels-photo-264771.jpeg?auto=compress&cs=tinysrgb&w=300", bg: "bg-[#F5FDF7]" },
  { label: "Wife Appreciation", image: "https://images.pexels.com/photos/1408221/pexels-photo-1408221.jpeg?auto=compress&cs=tinysrgb&w=300", bg: "bg-[#FFF0F5]" },
  { label: "Thank You", image: "https://images.pexels.com/photos/1083822/pexels-photo-1083822.jpeg?auto=compress&cs=tinysrgb&w=300", bg: "bg-[#FDF8EE]" },
];

export default function OccasionStrip() {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 py-4">
      <h2 className="font-display text-base sm:text-lg font-bold text-botanical mb-3">
        Gifts For Every Occasion
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        {occasions.map((item) => (
          <a key={item.label} href="#" className={`flex items-center justify-between p-2.5 rounded-xl border border-rose-light/20 ${item.bg} hover:shadow-xs transition-all group`}>
            <span className="font-medium text-xs text-botanical group-hover:text-rose transition-colors">
              {item.label}
            </span>
            <div className="w-9 h-9 rounded-lg overflow-hidden shrink-0">
              <img src={item.image} alt={item.label} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}