import { shopHref } from './shopSearch';
import React from "react";

const cakeItems = [
  { name: "Chocolate", image: "https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=500" },
  { name: "Butterscotch", image: "https://images.pexels.com/photos/19252761/pexels-photo-19252761.jpeg?auto=compress&cs=tinysrgb&w=500" },
  { name: "Fresh Fruit", image: "https://images.pexels.com/photos/9553728/pexels-photo-9553728.jpeg?auto=compress&cs=tinysrgb&w=500" },
  { name: "Combos", image: "https://images.pexels.com/photos/34263114/pexels-photo-34263114.jpeg?auto=compress&cs=tinysrgb&w=500" },
  { name: "Pineapple", image: "https://images.pexels.com/photos/8820012/pexels-photo-8820012.jpeg?auto=compress&cs=tinysrgb&w=500" },
];

export default function FreshlyBakedCakes() {
  return (
    <section className="w-full band band-sand py-8 sm:py-10 px-4 sm:px-6 lg:px-10 xl:px-14">
      <div className="mb-8">
        <h2 className="section-title">Freshly Baked Cakes</h2>
        <p className="text-xs sm:text-sm text-charcoal/70 mt-3">Baked on the day of delivery, in the flavours they love.</p>
      </div>

      <div className="m-row grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 sm:gap-8">
        {cakeItems.map((item) => (
          <a key={item.name} href={item.name === "Combos" ? shopHref("Cakes") : shopHref("Cakes", item.name)} className="flex flex-col items-center group">
            {/* Round bakery-style frame */}
            <div className="relative w-full aspect-square rounded-full overflow-hidden bg-white ring-4 ring-white shadow-md group-hover:shadow-xl group-hover:-translate-y-1 transition-all duration-300 mb-4">
              <img loading="lazy" decoding="async"
                src={item.image}
                alt={item.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>

            {/* Simple Center-Aligned Category Name */}
            <span className="font-display font-semibold text-sm sm:text-base text-botanical text-center group-hover:text-rose transition-colors">
              {item.name}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}