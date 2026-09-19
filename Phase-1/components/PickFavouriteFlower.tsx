import React from "react";

const flowerItems = [
  {
    name: "Roses",
    image: "https://images.pexels.com/photos/56866/rose-rose-blooms-roses-pink-56866.jpeg?auto=compress&cs=tinysrgb&w=500",
  },
  {
    name: "Orchids",
    image: "https://images.pexels.com/photos/1408221/pexels-photo-1408221.jpeg?auto=compress&cs=tinysrgb&w=500",
  },
  {
    name: "Carnations",
    image: "https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&cs=tinysrgb&w=500",
  },
  {
    name: "Gerberas",
    image: "https://images.pexels.com/photos/1083822/pexels-photo-1083822.jpeg?auto=compress&cs=tinysrgb&w=500",
  },
  {
    name: "Sunflowers",
    image: "https://images.pexels.com/photos/1366630/pexels-photo-1366630.jpeg?auto=compress&cs=tinysrgb&w=500",
  },
];

export default function PickFavouriteFlower() {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 py-8 my-4">
      {/* Title */}
      <h2 className="font-display text-xl sm:text-2xl font-bold text-botanical mb-6">
        Pick their favourite Flower
      </h2>

      {/* 5-Column Studio Portrait Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6">
        {flowerItems.map((item) => (
          <a key={item.name} href="#" className="flex flex-col items-center group">
            {/* Tall Vertical Portrait Studio Frame */}
            <div className="w-full aspect-[3/4] rounded-2xl overflow-hidden bg-[#F5EBE0]/60 p-2 border border-black/5 shadow-2xs group-hover:shadow-md transition-all">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Label Below Card */}
            <span className="font-semibold text-xs sm:text-sm text-botanical mt-3 text-center group-hover:text-rose transition-colors">
              {item.name}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}