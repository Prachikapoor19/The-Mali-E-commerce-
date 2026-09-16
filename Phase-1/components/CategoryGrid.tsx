import React from "react";

const categories = [
  { title: "Fresh Flowers", subtitle: "Express delivery", image: "https://images.pexels.com/photos/56866/rose-rose-blooms-roses-pink-56866.jpeg?auto=compress&cs=tinysrgb&w=400", bg: "bg-[#FDF5F2]" },
  { title: "Yummy Cakes", subtitle: "Baked fresh daily", image: "https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=400", bg: "bg-[#FDF9F0]" },
  { title: "Custom Gifts", subtitle: "Personalised for you", image: "https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg?auto=compress&cs=tinysrgb&w=400", bg: "bg-[#F2F7FD]" },
  { title: "Combos", subtitle: "Multiply the joy", image: "https://images.pexels.com/photos/1407305/pexels-photo-1407305.jpeg?auto=compress&cs=tinysrgb&w=400", bg: "bg-[#FFF5F7]" },
];

export default function CategoryGrid() {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 py-8">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-display text-xl sm:text-2xl font-bold text-botanical">
          Shop by Category
        </h2>
        <a href="#" className="text-xs sm:text-sm font-semibold text-rose hover:text-rose-dark transition-colors">
          View All &rarr;
        </a>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <a key={cat.title} href="#" className={`group flex items-center justify-between p-4 rounded-xl border border-rose-light/20 ${cat.bg} hover:shadow-md transition-all`}>
            <div>
              <h3 className="font-semibold text-sm sm:text-base text-botanical group-hover:text-rose transition-colors">
                {cat.title}
              </h3>
              <p className="text-xs text-charcoal/60 mt-0.5">
                {cat.subtitle}
              </p>
            </div>
            <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0">
              <img src={cat.image} alt={cat.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}