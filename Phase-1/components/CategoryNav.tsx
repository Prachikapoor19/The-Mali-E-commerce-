"use client";

import React, { useEffect, useRef, useState } from "react";

type MenuItem = string | { name: string; isNew?: boolean };
type MegaMenu = Record<string, MenuItem[]>;

// Short, focused menus: 3 columns, max 6 items each
const BIRTHDAY_MENU: MegaMenu = {
  shopBy: ["Cakes", "Flowers", "Flowers n Cakes", "Personalised Gifts", "Plants", "Gift Hampers"],
  popular: ["Bestsellers", { name: "LUXE Birthday", isNew: true }, "Midnight Delivery", "Same Day Delivery"],
  giftsFor: ["Her", "Him", "Kids", "Mother", "Father", "Friends"],
};

const ANNIVERSARY_MENU: MegaMenu = {
  shopBy: ["Cakes", "Flowers", "Flowers n Cakes", "Personalised Gifts", "Chocolates", "Gift Hampers"],
  popular: ["Bestsellers", "LUXE Anniversary", "Photo Frames", "Midnight Delivery"],
  giftsFor: ["Wife", "Husband", "Couples", "Parents"],
};

const OCCASIONS_MENU: MegaMenu = {
  festivals: ["Navratri", "Karwa Chauth", "Diwali", "Bhai Dooj", "Christmas"],
  celebrations: ["Wedding", "Congratulations", "House Warming", "New Born Baby"],
  feelings: ["Love n Romance", "I Am Sorry", "Thank You", "Get Well Soon", "Sympathy"],
};

const FLOWERS_MENU: MegaMenu = {
  popular: ["All Flowers", "Bestsellers", "Same Day Delivery", { name: "LUXE Flowers", isNew: true }],
  byType: ["Roses", "Orchids", "Lilies", "Carnations", "Gerberas", "Sunflowers"],
  combos: ["Flowers n Cakes", "Flowers n Chocolates", "Flowers n Plants"],
};

const CAKES_MENU: MegaMenu = {
  popular: ["All Cakes", "Bestsellers", "Midnight Delivery", "Eggless Cakes", "Photo Cakes"],
  byFlavour: ["Chocolate", "Black Forest", "Red Velvet", "Butterscotch", "Pineapple", "Fresh Fruit"],
  byOccasion: ["Birthday Cakes", "Anniversary Cakes", "Kids Birthday Cakes", "Wedding Cakes"],
};

const PLANTS_MENU: MegaMenu = {
  popular: ["All Plants", "Bestsellers", "Indoor Plants", "Air Purifying Plants"],
  byType: ["Money Plants", "Snake Plants", "Lucky Bamboo", "Peace Lily", "Jade Plants", "Bonsai Plants"],
  combos: ["Plants n Cakes", "Plants n Flowers", "Ceramic Planters"],
};

const PERSONALISED_MENU: MegaMenu = {
  popular: ["All Personalised Gifts", "Bestsellers", "Same Day Delivery"],
  byType: ["Mugs", "Cushions", "Photo Frames", "Lamps", "Keychains", "Photo Cakes"],
  giftsFor: ["Her", "Him", "Couples", "Kids"],
};

const CHOCOLATES_MENU: MegaMenu = {
  popular: ["All Chocolates", "Bestsellers", "The Mali Signature", "Handmade Chocolates"],
  byType: ["Chocolate Bouquets", "Chocolate Hampers", "Dark Chocolates", "Sugar Free Chocolates"],
  combos: ["Flowers n Chocolates", "Cakes n Chocolates"],
};

const HAMPERS_MENU: MegaMenu = {
  popular: ["All Hampers", "Bestsellers", { name: "LUXE Hampers", isNew: true }],
  byType: ["Gourmet Hampers", "Dry Fruit Hampers", "Chocolate Hampers", "Spa n Self Care", "Tea n Coffee"],
  byOccasion: ["Birthday Hampers", "Anniversary Hampers", "Diwali Hampers", "Corporate Hampers"],
};

const LIFESTYLE_MENU: MegaMenu = {
  fashion: [{ name: "Dresses", isNew: true }, { name: "Purses", isNew: true }],
  jewellery: ["Earrings", "Bracelets"],
  moreGifts: ["Perfumes", "Soft Toys", "Decor"],
};

const NAV_ITEMS: { id: string; label: string; data: MegaMenu }[] = [
  { id: "birthday", label: "Birthday", data: BIRTHDAY_MENU },
  { id: "anniversary", label: "Anniversary", data: ANNIVERSARY_MENU },
  { id: "occasions", label: "Occasions", data: OCCASIONS_MENU },
  { id: "flowers", label: "Flowers", data: FLOWERS_MENU },
  { id: "cakes", label: "Cakes", data: CAKES_MENU },
  { id: "plants", label: "Plants", data: PLANTS_MENU },
  { id: "personalised", label: "Personalised", data: PERSONALISED_MENU },
  { id: "chocolates", label: "Chocolates", data: CHOCOLATES_MENU },
  { id: "hampers", label: "Hampers", data: HAMPERS_MENU },
  { id: "lifestyle", label: "Fashion & More", data: LIFESTYLE_MENU },
];

// "byFlavour" -> "By Flavour"
const toTitle = (key: string) => key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());

// Generic items ("Bestsellers", "All Cakes", "Her") search the category itself so results are never empty
const toHref = (category: string, item: string) => {
  const generic = /^(All|Best|Same|Midnight|LUXE|Her$|Him$|Kids$|Couples$|Parents$|Wife$|Husband$|Mother$|Father$|Friends$)/i.test(item);
  const q = generic ? category : item;
  return `/search?q=${encodeURIComponent(q)}`;
};

export default function CategoryNav() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  // Close when tapping outside or pressing Escape (needed on mobile, where there is no hover)
  useEffect(() => {
    if (!activeMenu) return;
    const onPointerDown = (e: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setActiveMenu(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveMenu(null);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [activeMenu]);

  return (
    <nav ref={navRef} className="w-full bg-white/80 backdrop-blur-sm border-y border-botanical/10 relative z-40">
      <div className="px-3 sm:px-6 lg:px-10 xl:px-14">
        <div className="flex items-center justify-start lg:justify-center gap-4 sm:gap-5 xl:gap-7 overflow-x-auto scrollbar-none text-[13px] font-semibold text-botanical">
          {NAV_ITEMS.map((item) => {
            const isOpen = activeMenu === item.id;
            return (
              <div
                key={item.id}
                className="shrink-0"
                onPointerEnter={(e) => { if (e.pointerType === "mouse") setActiveMenu(item.id); }}
                onPointerLeave={(e) => { if (e.pointerType === "mouse") setActiveMenu(null); }}
              >
                <button
                  onClick={() => setActiveMenu(isOpen ? null : item.id)}
                  aria-expanded={isOpen}
                  className={`relative flex items-center gap-1 py-3 px-0.5 transition-colors hover:text-rose after:absolute after:left-0 after:right-0 after:bottom-1.5 after:h-0.5 after:rounded-full after:bg-gold after:origin-center after:transition-transform after:duration-300 ${isOpen ? "text-rose after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100"}`}
                >
                  <span>{item.label}</span>
                  {item.id === "lifestyle" && (
                    <span className="text-[11px] leading-none bg-gold text-white font-bold px-1.5 py-0.5 rounded-full uppercase">New</span>
                  )}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={`w-3.5 h-3.5 opacity-50 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}><path d="m6 9 6 6 6-6" /></svg>
                </button>

                {isOpen && (
                  <div className="absolute left-0 right-0 top-full w-full bg-white shadow-xl border-b border-botanical/10 py-6 px-4 z-50">
                    <div className="max-w-3xl mx-auto grid grid-cols-2 sm:grid-cols-3 gap-8 text-[12px]">
                      {Object.entries(item.data).map(([key, list]) => (
                        <div key={key}>
                          <h4 className="font-bold text-botanical mb-3 text-[11px] uppercase tracking-wider border-b border-botanical/10 pb-1.5">
                            {toTitle(key)}
                          </h4>
                          <ul className="space-y-2">
                            {list.map((sub) => {
                              const name = typeof sub === "string" ? sub : sub.name;
                              const isNew = typeof sub === "object" && sub.isNew;
                              return (
                                <li key={name} className="flex items-center gap-1.5">
                                  <a href={toHref(item.label, name)} onClick={() => setActiveMenu(null)} className="text-charcoal/80 hover:text-rose transition-colors">{name}</a>
                                  {isNew && (
                                    <span className="text-[11px] bg-gold text-white font-bold px-1.5 py-px rounded-full uppercase">New</span>
                                  )}
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </nav>
  );
}