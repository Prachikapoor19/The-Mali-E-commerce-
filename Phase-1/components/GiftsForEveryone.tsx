import React from "react";

const people = [
  { label: "Him", image: "https://images.pexels.com/photos/1194036/pexels-photo-1194036.jpeg?auto=compress&cs=tinysrgb&w=300" },
  { label: "Her", image: "https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg?auto=compress&cs=tinysrgb&w=300" },
  { label: "Kids", image: "https://images.pexels.com/photos/341970/pexels-photo-341970.jpeg?auto=compress&cs=tinysrgb&w=300" },
  { label: "Friend", image: "https://images.pexels.com/photos/1207918/pexels-photo-1207918.jpeg?auto=compress&cs=tinysrgb&w=300" },
  { label: "Wife", image: "https://images.pexels.com/photos/56866/rose-rose-blooms-roses-pink-56866.jpeg?auto=compress&cs=tinysrgb&w=300" },
  { label: "Husband", image: "https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&w=300" },
  { label: "Parents", image: "https://images.pexels.com/photos/264771/pexels-photo-264771.jpeg?auto=compress&cs=tinysrgb&w=300" },
];

export default function GiftsForEveryone() {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="font-display text-xl sm:text-2xl font-bold text-botanical">
            Gifts for Everyone
          </h2>
          <p className="text-xs sm:text-sm text-charcoal/70 mt-1">
            Find the perfect surprise tailored for your loved ones
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-none">
        {people.map((item) => (
          <a key={item.label} href="#" className="group flex flex-col items-center justify-center p-3 rounded-xl bg-blush/40 hover:bg-blush transition-colors border border-rose-light/20 text-center shrink-0 w-28">
            <div className="w-14 h-14 rounded-full overflow-hidden bg-white mb-2 shadow-xs">
              <img src={item.image} alt={item.label} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
            </div>
            <span className="font-medium text-xs text-botanical">
              {item.label}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}