'use client';

import ProductCard from './ProductCard';
import { useProducts } from './ProductsContext';

export default function NewlyLaunched() {
  const { products } = useProducts();
  // Newest additions: products added in admin go to the end of the list, so show the last five
  const newest = products.slice(-5).reverse();
  if (newest.length === 0) return null;

  return (
    <section className="w-full band band-sage py-10 sm:py-14">
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
          {newest.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
