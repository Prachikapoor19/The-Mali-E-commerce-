import React from "react";

const feelings = [
  { label: "Love & Romance", image: "https://images.pexels.com/photos/56866/rose-rose-blooms-roses-pink-56866.jpeg?auto=compress&cs=tinysrgb&w=300", count: "120+ Gifts" },
  { label: "Thinking of You", image: "https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&cs=tinysrgb&w=300", count: "85+ Gifts" },
  { label: "Miss You", image: "https://images.pexels.com/photos/1083822/pexels-photo-1083822.jpeg?auto=compress&cs=tinysrgb&w=300", count: "60+ Gifts" },
  { label: "I am Sorry", image: "https://images.pexels.com/photos/1408221/pexels-photo-1408221.jpeg?auto=compress&cs=tinysrgb&w=300", count: "45+ Gifts" },
  { label: "Sympathy", image: "https://images.pexels.com/photos/1158783/pexels-photo-1158783.jpeg?auto=compress&cs=tinysrgb&w=300", count: "30+ Gifts" },
];

export default function GiftsForFeeling() {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="font-display text-xl sm:text-2xl font-bold text-botanical">
            Gifts for Every Feeling
          </h2>
          <p className="text-xs sm:text-sm text-charcoal/70 mt-1">
            Express what words cannot say
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {feelings.map((item) => (
          <a key={item.label} href="#" className="group flex flex-col items-center justify-center p-4 rounded-xl bg-blush/60 hover:bg-blush transition-colors border border-rose-light/20 text-center">
            <div className="w-16 h-16 rounded-full overflow-hidden mb-3 shadow-xs">
              <img src={item.image} alt={item.label} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
            </div>
            <span className="font-medium text-sm text-botanical">
              {item.label}
            </span>
            <span className="text-xs text-charcoal/60 mt-1">
              {item.count}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}