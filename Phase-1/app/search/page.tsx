'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import Header from '@/components/Header';
import CategoryNav from '@/components/CategoryNav';
import Footer from '@/components/Footer';
import { SEARCH_CATALOG } from '@/components/searchCatalog';

// Words that don't help narrow down products
const STOP_WORDS = new Set(['n', 'and', 'for', 'the', 'of', 'a', 'in', 'with', 'to', 'my', 'your', 'gift', 'gifts', 'all', 'best', 'bestseller', 'bestsellers', 'same', 'day', 'delivery', 'midnight', 'new', 'premium', 'luxe', 'her', 'him', 'combo', 'combos']);

// A search word like "orchids" should still find items in the right category
const CATEGORY_WORDS: Record<string, string[]> = {
  Flowers: ['flower', 'rose', 'orchid', 'lily', 'lilie', 'carnation', 'gerbera', 'sunflower', 'bouquet', 'bloom', 'floral', 'dried', 'crochet', 'centerpiece', 'love', 'romance', 'sorry', 'sympathy'],
  Cakes: ['cake', 'eggless', 'cupcake', 'birthday', 'anniversary', 'truffle', 'velvet', 'butterscotch', 'pineapple', 'forest', 'fruit', 'bento'],
  Plants: ['plant', 'bamboo', 'snake', 'jade', 'bonsai', 'succulent', 'peace', 'planter', 'money', 'indoor', 'housewarming', 'warming'],
  Personalised: ['personalised', 'personalized', 'custom', 'mug', 'cushion', 'frame', 'photo', 'lamp', 'keychain', 'engraved'],
  Hampers: ['hamper', 'gourmet', 'spa', 'wellness', 'dry', 'corporate', 'diwali', 'festive'],
  Chocolates: ['chocolate', 'truffle', 'ferrero', 'cadbury', 'signature', 'handmade'],
};

const stem = (w: string) => (w.length > 3 ? w.replace(/s$/, '') : w);

function searchCatalog(query: string) {
  if (!query || query === 'all') return { results: SEARCH_CATALOG, exact: true };
  const words = query
    .split(/[^a-z0-9]+/)
    .filter((w) => w && !STOP_WORDS.has(w))
    .map(stem);
  if (words.length === 0) return { results: SEARCH_CATALOG, exact: true };

  const results = SEARCH_CATALOG.filter((item) => {
    const itemWords = (item.name + ' ' + item.category).toLowerCase().split(/[^a-z0-9]+/).map(stem);
    const categoryWords = (CATEGORY_WORDS[item.category] || []).map(stem);
    return words.some((w) => itemWords.includes(w) || categoryWords.includes(w));
  });

  // Never show an empty page: fall back to our most-loved products
  return results.length ? { results, exact: true } : { results: SEARCH_CATALOG, exact: false };
}

function SearchResults() {
  const params = useSearchParams();
  const query = (params.get('q') || '').toLowerCase().trim();

  const { results, exact } = searchCatalog(query);
  const showAll = query === 'all';

  return (
    <section className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 py-8">
      <h1 className="section-title mb-3">
        {showAll || !query ? 'All Products' : exact ? `Results for "${query}"` : 'Our most-loved gifts'}
      </h1>
      <p className="text-sm text-charcoal/60 mb-6">
        {exact
          ? `${results.length} product${results.length !== 1 ? 's' : ''} found`
          : `We couldn't find an exact match for "${query}", so here are our bestsellers.`}
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {results.map((item) => (
          <ProductCard key={item.id} product={item} />
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