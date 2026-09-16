import React from "react";

const categoryIcons = [
  { label: "Same Day", image: "https://images.pexels.com/photos/56866/rose-rose-blooms-roses-pink-56866.jpeg?auto=compress&cs=tinysrgb&w=150" },
  { label: "Flowers", image: "https://images.pexels.com/photos/1408221/pexels-photo-1408221.jpeg?auto=compress&cs=tinysrgb&w=150" },
  { label: "Cakes", image: "https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=150" },
  { label: "Personalised", image: "https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg?auto=compress&cs=tinysrgb&w=150" },
  { label: "Plants", image: "https://images.pexels.com/photos/305821/pexels-photo-305821.jpeg?auto=compress&cs=tinysrgb&w=150" },
  { label: "Chocolates", image: "https://images.pexels.com/photos/65882/chocolate-dark-coffee-confiserie-65882.jpeg?auto=compress&cs=tinysrgb&w=150" },
  { label: "Hampers", image: "https://images.pexels.com/photos/264771/pexels-photo-264771.jpeg?auto=compress&cs=tinysrgb&w=150" },
  { label: "Spiritual", image: "https://images.pexels.com/photos/1055272/pexels-photo-1055272.jpeg?auto=compress&cs=tinysrgb&w=150" },
  { label: "Balloon Decor", image: "https://images.pexels.com/photos/341970/pexels-photo-341970.jpeg?auto=compress&cs=tinysrgb&w=150" },
  { label: "Trendy Gifts", image: "https://images.pexels.com/photos/1207918/pexels-photo-1207918.jpeg?auto=compress&cs=tinysrgb&w=150" },
  { label: "Combos", image: "https://images.pexels.com/photos/1407305/pexels-photo-1407305.jpeg?auto=compress&cs=tinysrgb&w=150" },
];

export default function IconStrip() {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 py-4 border-b border-rose-light/20 bg-ivory">
      <div className="flex items-center justify-between gap-4 overflow-x-auto pb-2 scrollbar-none">
        {categoryIcons.map((item) => (
          <a key={item.label} href="#" className="flex flex-col items-center group shrink-0">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden bg-blush p-0.5 border border-rose-light/40 group-hover:border-rose transition-colors shadow-xs">
              <img src={item.image} alt={item.label} className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-300" />
            </div>
            <span className="text-[11px] font-medium text-botanical mt-1.5 text-center whitespace-nowrap group-hover:text-rose transition-colors">
              {item.label}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}