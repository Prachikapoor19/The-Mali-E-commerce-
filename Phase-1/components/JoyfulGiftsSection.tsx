import React from "react";

const categoryItems = [
  {
    title: "Flowers",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&q=80",
    bg: "bg-[#FFF8E7]",
  },
  {
    title: "Cakes",
    image: "https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=500",
    bg: "bg-[#FDF0E3]",
  },
  {
    title: "Personalised",
    image: "https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg?auto=compress&cs=tinysrgb&w=500",
    bg: "bg-[#FFF0F3]",
  },
  {
    title: "Plants",
    image: "https://images.pexels.com/photos/305821/pexels-photo-305821.jpeg?auto=compress&cs=tinysrgb&w=500",
    bg: "bg-[#EAF0E4]",
  },
  {
    title: "Hampers",
    image: "https://images.pexels.com/photos/264771/pexels-photo-264771.jpeg?auto=compress&cs=tinysrgb&w=500",
    bg: "bg-[#E2E2F5]",
  },
];

export default function JoyfulGiftsSection() {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 py-6 my-4">
      {/* Top Gradient Promo Banner */}
      <div className="w-full rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#FF7B54] via-[#FFB26B] to-[#FF8E9E] p-6 sm:p-8 flex items-center justify-between shadow-xs overflow-hidden relative mb-6 text-white">
        <div className="z-10 max-w-md">
          <h2 className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight drop-shadow-xs">
            Joyful Gifts To <br />
            Make It Special
          </h2>
          <p className="text-xs sm:text-sm font-medium mt-2 text-white/90">
            Curated birthday & celebration surprises wrapped with love.
          </p>
        </div>

        {/* Decorative Floating Graphic */}
        <div className="hidden sm:flex items-center gap-3 shrink-0 z-10">
          <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-white/60 shadow-md transform rotate-3">
            <img
              src="https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=400"
              alt="Birthday Cake"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Background Subtle Glow */}
        <div className="absolute right-[-5%] top-[-20%] w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
      </div>

      {/* 5-Column Category Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6">
        {categoryItems.map((item) => (
          <a key={item.title} href="#" className="flex flex-col items-center group">
            {/* Square Studio Card */}
            <div
              className={`w-full aspect-square rounded-2xl ${item.bg} p-3 overflow-hidden shadow-2xs border border-black/5 flex items-center justify-center mb-2.5 transition-transform duration-300 group-hover:scale-105`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover rounded-xl"
              />
            </div>

            {/* Label Below Card */}
            <span className="font-semibold text-xs sm:text-sm text-botanical text-center group-hover:text-rose transition-colors">
              {item.title}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}