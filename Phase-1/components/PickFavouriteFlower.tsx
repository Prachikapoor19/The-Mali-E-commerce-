import React from "react";

const flowerItems = [
  {
    name: "Roses",
    image: "https://images.pexels.com/photos/56866/rose-rose-blooms-roses-pink-56866.jpeg?auto=compress&cs=tinysrgb&w=500",
  },
  {
    name: "Orchids",
    image: "https://images.pexels.com/photos/1076233/pexels-photo-1076233.jpeg?auto=compress&cs=tinysrgb&w=500",
  },
  {
    name: "Carnations",
    image: "https://images.pexels.com/photos/16244993/pexels-photo-16244993.jpeg?auto=compress&cs=tinysrgb&w=500",
  },
  {
    name: "Gerberas",
    image: "https://images.pexels.com/photos/11563147/pexels-photo-11563147.jpeg?auto=compress&cs=tinysrgb&w=500",
  },
  {
    name: "Sunflowers",
    image: "https://images.pexels.com/photos/1366630/pexels-photo-1366630.jpeg?auto=compress&cs=tinysrgb&w=500",
  },
];

export default function PickFavouriteFlower() {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 py-8 sm:py-10">
      {/* Title */}
      <h2 className="section-title mb-6">
        Pick their favourite Flower
      </h2>

      {/* 5-Column Studio Portrait Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6">
        {flowerItems.map((item) => (
          <a key={item.name} href={`/search?q=${encodeURIComponent(item.name)}`} className="group relative block aspect-[3/4] rounded-3xl overflow-hidden bg-sand shadow-xs hover:shadow-xl transition-shadow">
            <img
              src={item.image}
              alt={item.name}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            {/* Soft dark fade so the name is readable on any photo */}
            <div className="absolute inset-0 bg-gradient-to-t from-botanical/85 via-botanical/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
              <span className="block font-display text-lg sm:text-xl font-semibold text-ivory">{item.name}</span>
              <span className="mt-1 inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-gold opacity-80 group-hover:opacity-100 transition-opacity">
                Shop now <span aria-hidden="true">&rarr;</span>
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}