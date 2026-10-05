import { shopHref } from './shopSearch';
import React from "react";

const feelings = [
  {
    label: "Love & Romance",
    image: "https://images.pexels.com/photos/13831901/pexels-photo-13831901.jpeg?auto=compress&cs=tinysrgb&w=500",
    bg: "bg-petal", // Soft Pink
  },
  {
    label: "Thinking of You",
    image: "https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&cs=tinysrgb&w=500",
    bg: "bg-blush", // Lavender
  },
  {
    label: "Miss You",
    image: "https://images.pexels.com/photos/1083822/pexels-photo-1083822.jpeg?auto=compress&cs=tinysrgb&w=500",
    bg: "bg-petal", // Soft Peach
  },
  {
    label: "I am Sorry",
    image: "https://images.pexels.com/photos/1408221/pexels-photo-1408221.jpeg?auto=compress&cs=tinysrgb&w=500",
    bg: "bg-blush", // Sage Mint
  },
  {
    label: "Sympathy",
    image: "https://images.pexels.com/photos/1158783/pexels-photo-1158783.jpeg?auto=compress&cs=tinysrgb&w=500",
    bg: "bg-sand", // Warm Beige
  },
];

export default function GiftsForFeeling() {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 py-8 sm:py-10">
      {/* Title & Subtitle */}
      <div className="mb-6">
        <h2 className="section-title">
          Gifts for Every Feeling
        </h2>
        <p className="text-xs sm:text-sm text-charcoal/70 mt-3">
          When emotions matter most, send a gift that speaks from the heart.
        </p>
      </div>

      {/* 5-Column Full Pastel Portrait Cards Grid */}
      <div className="m-row grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6">
        {feelings.map((item) => (
          <a
            key={item.label}
            href={shopHref("Flowers", item.label)}
            className={`group rounded-3xl ${item.bg} p-4 sm:p-5 flex flex-col justify-between items-center h-80 sm:h-96 shadow-xs hover:shadow-md transition-all border border-black/5 overflow-hidden`}
          >
            {/* Image Container */}
            <div className="w-full h-60 sm:h-72 rounded-2xl overflow-hidden flex items-center justify-center">
              <img loading="lazy" decoding="async"
                src={item.image}
                alt={item.label}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Label */}
            <span className="font-display font-semibold text-sm sm:text-base text-botanical text-center mt-3 group-hover:text-rose transition-colors">
              {item.label}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}