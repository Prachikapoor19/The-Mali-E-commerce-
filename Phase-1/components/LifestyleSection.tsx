'use client';

import { useProducts } from './ProductsContext';
import { LIFESTYLE_CATEGORIES } from './searchCatalog';

// Homepage tiles for the newer categories (perfumes, fashion, jewellery, soft toys, decor).
// Each tile shows the photo of a live product from that category, so changing
// products in admin changes these tiles too. Empty categories are skipped.
const TAGLINES: Record<string, string> = {
  Perfumes: 'Scents they’ll remember',
  Dresses: 'Pretty, comfy, gift-ready',
  Purses: 'Handbags & mini purses',
  Earrings: 'Studs, drops & statement',
  Bracelets: 'Charms, chains & stones',
  'Soft Toys': 'Teddies to hug',
  Decor: 'Candles, lights & vases',
};

export default function LifestyleSection() {
  const { products } = useProducts();
  const tiles = LIFESTYLE_CATEGORIES.map((category) => {
    const inCategory = products.filter((p) => p.category === category);
    const cover = [...inCategory].sort((a, b) => b.reviews - a.reviews)[0];
    return cover ? { category, image: cover.image, count: inCategory.length } : null;
  }).filter((t): t is { category: (typeof LIFESTYLE_CATEGORIES)[number]; image: string; count: number } => t !== null);

  if (tiles.length === 0) return null;

  return (
    <section className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 py-8 sm:py-10">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold-dark">New at The Mali</span>
          <h2 className="section-title mt-1">Fashion, Jewellery &amp; More</h2>
          <p className="text-xs sm:text-sm text-charcoal/70 mt-2">Gifts beyond flowers and cakes, picked for every kind of person.</p>
        </div>
      </div>

      <div className="flex md:grid md:grid-cols-7 gap-3 sm:gap-4 overflow-x-auto md:overflow-visible pb-3 md:pb-0 scrollbar-none snap-x snap-mandatory">
        {tiles.map((t) => (
          <a
            key={t.category}
            href={`/search?q=${encodeURIComponent(t.category)}`}
            className="group shrink-0 w-36 sm:w-44 md:w-auto snap-start flex flex-col"
          >
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-sand border border-white shadow-sm lift-on-hover">
              <img
                src={t.image}
                alt={t.category}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-botanical/70 via-botanical/10 to-transparent" />
              <span className="absolute top-2 left-2 rounded-full bg-gold text-botanical text-[10px] font-bold px-2 py-0.5 shadow-xs">
                NEW
              </span>
              <div className="absolute bottom-0 inset-x-0 p-3 text-ivory">
                <p className="font-display font-bold text-base leading-tight">{t.category}</p>
                <p className="text-[11px] opacity-90 mt-0.5 line-clamp-1">{TAGLINES[t.category]}</p>
              </div>
            </div>
            <span className="mt-2 text-[11px] font-semibold text-rose group-hover:text-rose-dark transition-colors text-center">
              Shop {t.count} gift{t.count === 1 ? '' : 's'} &rarr;
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
