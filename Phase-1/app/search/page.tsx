'use client';

import { Suspense } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import Header from '@/components/Header';
import CategoryNav from '@/components/CategoryNav';
import Footer from '@/components/Footer';
import { applyFilters, CATEGORIES, PRICE_RANGES, searchCatalog, SORTS } from '@/components/shopSearch';

const chip = (active: boolean) =>
  `px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-colors whitespace-nowrap ${
    active ? 'bg-botanical text-ivory border-botanical' : 'bg-white text-botanical border-botanical/20 hover:border-botanical'
  }`;

function SearchResults() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const query = (params.get('q') || '').trim();
  const category = params.get('cat');
  const price = params.get('price');
  const sort = params.get('sort') || 'popular';

  // Change one filter in the URL, keep the rest (so the page can be shared/bookmarked)
  const setParam = (key: string, value: string | null) => {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    router.replace(`${pathname}?${next.toString()}`, { scroll: false });
  };

  const { results: matched, exact } = searchCatalog(query);
  const results = applyFilters(matched, { category, price, sort });
  const isAll = !query || query.toLowerCase() === 'all';
  const hasFilters = Boolean(category || price);

  const title = isAll ? (category ? category : 'All Products') : exact ? `Results for "${query}"` : 'Our most-loved gifts';

  return (
    <section className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 py-8">
      <h1 className="section-title mb-3">{title}</h1>
      {!exact && (
        <p className="text-sm text-charcoal/60 mb-2">
          We couldn&apos;t find an exact match for &quot;{query}&quot;, so here are our bestsellers.
        </p>
      )}

      {/* Filters */}
      <div className="mt-5 mb-6 space-y-3">
        <div className="flex gap-2 overflow-x-auto pb-1">
          <button className={chip(!category)} onClick={() => setParam('cat', null)}>All</button>
          {CATEGORIES.map((c) => (
            <button key={c} className={chip(category === c)} onClick={() => setParam('cat', category === c ? null : c)}>
              {c}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3 justify-between">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {PRICE_RANGES.map((r) => (
              <button key={r.id} className={chip(price === r.id)} onClick={() => setParam('price', price === r.id ? null : r.id)}>
                {r.label}
              </button>
            ))}
            {hasFilters && (
              <button
                onClick={() => {
                  const next = new URLSearchParams(params.toString());
                  next.delete('cat');
                  next.delete('price');
                  router.replace(`${pathname}?${next.toString()}`, { scroll: false });
                }}
                className="px-3 py-1.5 text-xs font-semibold text-rose hover:underline whitespace-nowrap"
              >
                Clear filters
              </button>
            )}
          </div>

          <label className="flex items-center gap-2 text-xs text-charcoal/70">
            Sort by
            <select
              value={sort}
              onChange={(e) => setParam('sort', e.target.value === 'popular' ? null : e.target.value)}
              className="text-xs font-semibold text-botanical bg-white border border-botanical/20 rounded-full px-3 py-1.5 focus:outline-none focus:border-botanical"
            >
              {SORTS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <p className="text-sm text-charcoal/60 mb-4">
        {results.length} product{results.length !== 1 ? 's' : ''}
      </p>

      {results.length === 0 ? (
        <div className="text-center py-16 bg-sand rounded-2xl">
          <p className="font-semibold text-botanical">No products match these filters.</p>
          <button
            onClick={() => {
              const next = new URLSearchParams(params.toString());
              next.delete('cat');
              next.delete('price');
              router.replace(`${pathname}?${next.toString()}`, { scroll: false });
            }}
            className="mt-4 px-5 py-2 rounded-full bg-botanical text-ivory text-sm font-semibold"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {results.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      )}
    </section>
  );
}

export default function SearchPage() {
  return (
    <main>
      <Header />
      <CategoryNav />
      <Suspense fallback={<div className="p-8 text-center text-sm text-charcoal/50">Loading...</div>}>
        <SearchResults />
      </Suspense>
      <Footer />
    </main>
  );
}
