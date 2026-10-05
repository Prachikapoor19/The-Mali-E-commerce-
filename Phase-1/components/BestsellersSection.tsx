"use client";

import React, { useState } from "react";
import { useCart } from "./CartContext";
import WishlistButton from "./WishlistButton";
import { useProducts } from "./ProductsContext";
import { discountPercent, type CatalogItem } from "./searchCatalog";
import { formatINR } from "./pricing";
import { flyToCart } from "./flyToCart";

interface Product {
  id: string;
  name: string;
  price: string;
  originalPrice: string;
  discount: string;
  rating: string;
  image: string;
  badge?: string;
  tagColor?: string;
  isPersonalised?: boolean;
}

// Badge colours (any other badge text uses gold)
const BADGE_STYLE: Record<string, string> = {
  Bestseller: "bg-gold text-botanical",
  "Top Rated": "bg-rose",
  Trending: "bg-rose-dark",
  LUXE: "bg-botanical",
  "Personalise It": "bg-botanical",
  "Good Luck": "bg-rose",
};

const TAB_ORDER = ["Flowers", "Cakes", "Personalised", "Hampers", "Chocolates", "Plants", "Perfumes", "Dresses", "Purses", "Earrings", "Bracelets", "Soft Toys", "Decor"];

// Card data comes from the live product list (MongoDB), best-reviewed first
function toCard(p: CatalogItem): Product {
  const off = discountPercent(p);
  return {
    id: p.id,
    name: p.name,
    price: formatINR(p.price),
    originalPrice: off > 0 ? formatINR(p.originalPrice) : "",
    discount: off > 0 ? `${off}% OFF` : "",
    rating: `${p.rating} ★`,
    image: p.image,
    badge: p.badge,
    tagColor: p.badge ? BADGE_STYLE[p.badge] ?? "bg-gold text-botanical" : undefined,
    isPersonalised: p.isPersonalised,
  };
}

export default function BestsellersSection() {
  const { products } = useProducts();
  const categories = TAB_ORDER.filter((c) => products.some((p) => p.category === c));
  const [chosenTab, setActiveTab] = useState<string>("Flowers");
  const activeTab = categories.includes(chosenTab) ? chosenTab : categories[0] ?? "Flowers";
  const cards = products
    .filter((p) => p.category === activeTab)
    .sort((a, b) => b.reviews - a.reviews)
    .slice(0, 5)
    .map(toCard);
  const tabIcons: Record<string, string> = Object.fromEntries(
    categories.map((c) => [c, products.find((p) => p.category === c)?.image ?? ""])
  );
  const { addToCart, openPersonalize } = useCart();

  const handleAction = (item: Product, button?: Element) => {
    const product = {
      id: item.id,
      name: item.name,
      price: Number(item.price.replace(/[^0-9]/g, "")),
      image: item.image,
    };
    if (item.isPersonalised) {
      openPersonalize(product);
    } else {
      flyToCart(button, item.image).then(() => addToCart(product));
    }
  };

  return (
    <section className="w-full px-3 sm:px-6 lg:px-10 xl:px-14 py-8 sm:py-10">
      <div className="mb-4">
        <h2 className="section-title">
          Shop By Bestsellers
        </h2>
        <p className="text-xs sm:text-sm text-charcoal/70 mt-0.5">
          Discover India&apos;s favourite gifting options, curated bestsellers that make every celebration extra special
        </p>
      </div>

      <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto pb-2.5 mb-4 scrollbar-none border-b border-rose-light/20">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`flex items-center gap-1.5 pb-2 text-xs font-bold whitespace-nowrap border-b-2 transition-all ${
              activeTab === cat ? "border-rose text-rose" : "border-transparent text-charcoal/70 hover:text-botanical"
            }`}
          >
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full overflow-hidden border border-rose-light/40 shrink-0">
              <img src={tabIcons[cat]} alt={cat} className="w-full h-full object-cover" />
            </div>
            <span>{cat}</span>
          </button>
        ))}
      </div>

      <div className="flex md:grid md:grid-cols-5 gap-3 sm:gap-4 overflow-x-auto md:overflow-visible pb-3 md:pb-0 scrollbar-none snap-x snap-mandatory">
        {cards.map((item) => (
          <div
            key={item.id}
            data-product-card
            className="group bg-white rounded-2xl overflow-hidden border border-rose-light/20 shadow-xs lift-on-hover flex flex-col justify-between shrink-0 w-44 sm:w-52 md:w-auto snap-start"
          >
            <a href={`/product/${item.id}`} className="block">
              <div className="relative w-full h-52 sm:h-60 md:h-64 bg-sand overflow-hidden flex items-center justify-center p-2">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
                />
                <WishlistButton id={item.id} className="absolute top-3 right-3" />
              </div>

              <div className="p-2.5 sm:p-3">
                <h3 className="font-semibold text-xs sm:text-sm text-botanical line-clamp-1">
                  {item.name}
                </h3>

                {item.badge && (
                  <span className={`inline-block text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded text-white mt-1 ${item.tagColor || "bg-rose"}`}>
                    {item.badge}
                  </span>
                )}

                <div className="mt-1.5 flex items-center gap-1.5 flex-wrap">
                  <span className="font-bold text-xs sm:text-sm text-botanical">{item.price}</span>
                  <span className="text-[10px] sm:text-xs text-charcoal/40 line-through">{item.originalPrice}</span>
                  <span className="text-[9px] sm:text-[10px] font-bold text-rose">{item.discount}</span>
                </div>
              </div>
            </a>

            <div className="px-2.5 sm:px-3 pb-2.5 sm:pb-3">
              <button
                onClick={(e) => handleAction(item, e.currentTarget)}
                className={`w-full text-[10px] sm:text-xs font-semibold py-2 rounded-full transition-colors ${
                  item.isPersonalised
                    ? "bg-botanical text-ivory hover:bg-botanical-light"
                    : "bg-rose text-ivory hover:bg-rose-dark"
                }`}
              >
                {item.isPersonalised ? "Personalise Now" : "Add to Cart"}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 sm:mt-8 text-center">
        <a href={`/search?q=${encodeURIComponent(activeTab)}`} className="inline-block px-5 sm:px-6 py-2 border border-rose-light/60 text-botanical rounded-full text-xs font-semibold hover:bg-rose hover:text-ivory transition-colors">
          View All {activeTab} &gt;
        </a>
      </div>
    </section>
  );
}