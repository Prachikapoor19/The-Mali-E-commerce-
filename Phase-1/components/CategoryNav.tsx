import React from "react";

const navItems = [
  "Flowers", "Cakes", "Personalised Gifts", "Plants", "Chocolates", "Combos", "Occasions"
];

export default function CategoryNav() {
  return (
    <nav className="w-full bg-botanical text-ivory text-xs font-medium border-b border-botanical-light/30">
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 flex items-center gap-6 overflow-x-auto py-2.5 scrollbar-none">
        {navItems.map((item) => (
          <a key={item} href="#" className="hover:text-gold whitespace-nowrap transition-colors">
            {item}
          </a>
        ))}
      </div>
    </nav>
  );
}