'use client';

import Header from '@/components/Header';
import CategoryNav from '@/components/CategoryNav';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { useWishlist } from '@/components/WishlistContext';
import { getProduct, type CatalogItem } from '@/components/searchCatalog';

export default function WishlistPage() {
  const { ids, isReady } = useWishlist();
  const products = ids.map(getProduct).filter((p): p is CatalogItem => Boolean(p));

  return (
    <main>
      <Header />
      <CategoryNav />
      <section className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 py-8 sm:py-10 min-h-[50vh]">
        <h1 className="section-title mb-2">My Wishlist</h1>

        {!isReady ? (
          <p className="text-sm text-charcoal/50 py-10">Loading…</p>
        ) : products.length === 0 ? (
          <div className="text-center py-16 max-w-md mx-auto">
            <div className="w-16 h-16 mx-auto rounded-full bg-blush flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 text-rose" aria-hidden="true">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
            </div>
            <p className="font-display text-lg font-bold text-botanical">Your wishlist is empty</p>
            <p className="text-sm text-charcoal/60 mt-2 mb-6">Tap the heart on any product to save it here for later.</p>
            <a href="/search?q=all" className="inline-block px-6 py-3 rounded-full bg-botanical text-ivory text-sm font-semibold hover:bg-botanical-light transition-colors">
              Explore Gifts
            </a>
          </div>
        ) : (
          <>
            <p className="text-sm text-charcoal/60 mb-6">
              {products.length} saved item{products.length !== 1 ? 's' : ''}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </>
        )}
      </section>
      <Footer />
    </main>
  );
}
