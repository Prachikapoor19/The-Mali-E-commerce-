import React from "react";

const flowerItems = [
  { name: "Orchids", image: "https://images.pexels.com/photos/1408221/pexels-photo-1408221.jpeg?auto=compress&cs=tinysrgb&w=400" },
  { name: "Crochet", image: "https://images.pexels.com/photos/1366630/pexels-photo-1366630.jpeg?auto=compress&cs=tinysrgb&w=400" },
  { name: "Centerpiece", image: "https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&cs=tinysrgb&w=400" },
  { name: "Sunny Blooms", image: "https://images.pexels.com/photos/1083822/pexels-photo-1083822.jpeg?auto=compress&cs=tinysrgb&w=400" },
  { name: "Dried Flowers", image: "https://images.pexels.com/photos/1158783/pexels-photo-1158783.jpeg?auto=compress&cs=tinysrgb&w=400" },
];

export default function FlowersCollection() {
  return (
    <section className="w-full py-8 px-4 sm:px-6 lg:px-10 xl:px-14 my-6">
      {/* Title */}
      <h2 className="font-display text-xl sm:text-2xl font-bold text-botanical mb-6">
        Flowers Collection
      </h2>

      {/* Premium Floral Blush Tint Banner */}
      <div className="w-full bg-[#FCEEEF] border border-[#FAD7DA] relative py-8 px-4 sm:px-8 rounded-3xl">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {flowerItems.map((item) => (
            <div key={item.name} className="flex flex-col items-center group">
              {/* Category Name Above Card */}
              <span className="font-semibold text-sm text-botanical mb-2.5">
                {item.name}
              </span>

              {/* White Square Rounded Card */}
              <div className="w-full aspect-square rounded-2xl overflow-hidden bg-white p-3 shadow-xs border border-white/80 mb-3 flex items-center justify-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Order Now Pill Button */}
              <button className="px-4 py-1.5 bg-white text-botanical text-xs font-semibold rounded-full shadow-2xs border border-rose-light/30 hover:bg-botanical hover:text-ivory transition-all flex items-center gap-1">
                Order Now <span className="text-[10px]">&gt;</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}