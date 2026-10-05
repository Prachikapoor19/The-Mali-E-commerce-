import { shopHref } from './shopSearch';
import React from "react";

const plants = [
  {
    title: "Indoor Plants",
    image: "https://images.pexels.com/photos/305821/pexels-photo-305821.jpeg?auto=compress&cs=tinysrgb&w=500",
  },
  {
    title: "Money Plants",
    image: "https://images.pexels.com/photos/1084199/pexels-photo-1084199.jpeg?auto=compress&cs=tinysrgb&w=500",
  },
  {
    title: "Lucky Bamboo",
    image: "https://images.pexels.com/photos/30384232/pexels-photo-30384232.jpeg?auto=compress&cs=tinysrgb&w=500",
  },
  {
    title: "Peace Lily",
    image: "https://images.pexels.com/photos/28182770/pexels-photo-28182770.jpeg?auto=compress&cs=tinysrgb&w=500",
  },
  {
    title: "All Plants",
    image: "https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg?auto=compress&cs=tinysrgb&w=500",
  },
];

export default function PlantsSection() {
  return (
    <section className="w-full py-8 sm:py-10 px-4 sm:px-6 lg:px-10 xl:px-14">
      {/* Title */}
      <h2 className="section-title mb-6">
        Plants for Every Vibe
      </h2>

      {/* 5-Column Vertical Studio Cards Grid */}
      <div className="m-row grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6">
        {plants.map((plant) => (
          <a key={plant.title} href={plant.title === "All Plants" ? shopHref("Plants") : shopHref("Plants", plant.title)} className="flex flex-col items-center group">
            {/* Tall Vertical Portrait Card Frame */}
            <div className="w-full aspect-[3/4] rounded-2xl overflow-hidden bg-white/40 shadow-xs border border-black/5 mb-3">
              <img
                src={plant.image}
                alt={plant.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Simple Center-Aligned Category Name */}
            <span className="font-semibold text-xs sm:text-sm text-botanical text-center group-hover:text-rose transition-colors">
              {plant.title}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}