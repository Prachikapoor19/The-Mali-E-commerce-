import React from "react";

const feelings = [
  { label: "Love & Romance", emoji: "💖", count: "120+ Gifts" },
  { label: "Thinking of You", emoji: "💭", count: "85+ Gifts" },
  { label: "Miss You", emoji: "🥺", count: "60+ Gifts" },
  { label: "I am Sorry", emoji: "💐", count: "45+ Gifts" },
  { label: "Sympathy", emoji: "🕊️", count: "30+ Gifts" },
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
          <a key={item.label} href="#" className="group flex flex-col items-center justify-center p-5 rounded-xl bg-blush/60 hover:bg-blush transition-colors border border-rose-light/20 text-center">
            <span className="text-3xl mb-2 group-hover:scale-110 transition-transform">
              {item.emoji}
            </span>
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