'use client';

import ProductCard from './ProductCard';
import { getProduct, type CatalogItem } from './searchCatalog';

// Newest additions to the catalogue (prices and photos come from searchCatalog.ts)
const NEW_IDS = ['pl2', 'pl3', 'h5', 'pl5', 'pl4'];

export default function NewlyLaunched() {
  const products = NEW_IDS.map(getProduct).filter((p): p is CatalogItem => Boolean(p));

  return (
    <section className="w-full bg-blush py-10 sm:py-14">
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold-dark">Just in</span>
            <h2 className="section-title mt-1">Newly Launched</h2>
          </div>
          <a href="/search?q=all" className="text-xs sm:text-sm font-semibold text-rose hover:text-rose-dark transition-colors whitespace-nowrap">
            View All &rarr;
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
