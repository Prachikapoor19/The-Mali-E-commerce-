'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useCart } from '@/components/CartContext';
import Header from '@/components/Header';
import CategoryNav from '@/components/CategoryNav';
import Footer from '@/components/Footer';
import { SEARCH_CATALOG } from '@/components/searchCatalog';

function SearchResults() {
  const params = useSearchParams();
  const query = (params.get('q') || '').toLowerCase().trim();
  const { addToCart } = useCart();

  const results = query
    ? SEARCH_CATALOG.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query)
      )
    : [];

  return (
    <section className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 py-8">
      <h1 className="font-display text-2xl font-bold text-botanical mb-1">
        {query ? `Results for "${query}"` : 'Search'}
      </h1>
      <p className="text-sm text-charcoal/60 mb-6">
        {results.length} product{results.length !== 1 ? 's' : ''} found
      </p>

      {results.length === 0 && query && (
        <p className="text-charcoal/60 text-sm">
          No products matched. Try searching &quot;roses&quot;, &quot;cake&quot;, or &quot;hamper&quot;.
        </p>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {results.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl border border-rose-light/20 overflow-hidden shadow-xs">
            <div className="aspect-square bg-[#F8F8F8] p-2">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-xl" />
            </div>
            <div className="p-3">
              <h3 className="text-xs font-semibold text-botanical line-clamp-2">{item.name}</h3>
              <p className="text-sm font-bold text-botanical mt-1">₹{item.price}</p>
              <button
                onClick={() => addToCart({ id: item.id, name: item.name, price: item.price, image: item.image })}
                className="w-full mt-2 text-[11px] font-semibold py-1.5 rounded-lg bg-rose text-ivory hover:bg-rose-dark transition-colors"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
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