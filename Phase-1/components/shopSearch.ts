// Search + filter logic shared by the shop page and the header suggestions.

import { PRODUCT_CATEGORIES, type CatalogItem } from './searchCatalog';

// Words that don't help narrow down products
const STOP_WORDS = new Set(['n', 'and', 'for', 'the', 'of', 'a', 'in', 'with', 'to', 'my', 'your', 'gift', 'gifts', 'all', 'best', 'bestseller', 'bestsellers', 'same', 'day', 'delivery', 'midnight', 'new', 'premium', 'luxe', 'her', 'him', 'combo', 'combos']);

// A search word like "orchids" should still find items in the right category
const CATEGORY_WORDS: Record<string, string[]> = {
  Flowers: ['flower', 'rose', 'orchid', 'lily', 'lilie', 'carnation', 'gerbera', 'sunflower', 'bouquet', 'bloom', 'floral', 'dried', 'crochet', 'centerpiece', 'love', 'romance', 'sorry', 'sympathy', 'valentine', 'karwa', 'chauth'],
  Cakes: ['cake', 'eggless', 'cupcake', 'birthday', 'anniversary', 'truffle', 'velvet', 'butterscotch', 'pineapple', 'forest', 'fruit', 'bento'],
  Plants: ['plant', 'bamboo', 'snake', 'jade', 'bonsai', 'succulent', 'peace', 'planter', 'money', 'indoor', 'housewarming', 'warming', 'green'],
  Personalised: ['personalised', 'personalized', 'custom', 'mug', 'cushion', 'frame', 'photo', 'lamp', 'keychain', 'engraved'],
  Hampers: ['hamper', 'gourmet', 'spa', 'wellness', 'dry', 'corporate', 'diwali', 'festive', 'navratri', 'dooj', 'christmas'],
  Chocolates: ['chocolate', 'truffle', 'ferrero', 'cadbury', 'signature', 'handmade'],
};

const stem = (w: string) => (w.length > 3 ? w.replace(/s$/, '') : w);

export const CATEGORIES = PRODUCT_CATEGORIES;

export const PRICE_RANGES = [
  { id: 'under500', label: 'Under ₹500', min: 0, max: 499 },
  { id: '500-1000', label: '₹500 – ₹1,000', min: 500, max: 1000 },
  { id: '1000-2000', label: '₹1,000 – ₹2,000', min: 1001, max: 2000 },
  { id: 'above2000', label: 'Above ₹2,000', min: 2001, max: Infinity },
] as const;

export const SORTS = [
  { id: 'popular', label: 'Popularity' },
  { id: 'price-asc', label: 'Price: Low to High' },
  { id: 'price-desc', label: 'Price: High to Low' },
  { id: 'rating', label: 'Top Rated' },
] as const;

// Text search. `exact` is false when nothing matched and we fell back to everything.
export function searchCatalog(rawQuery: string, items: CatalogItem[]): { results: CatalogItem[]; exact: boolean } {
  const query = rawQuery.toLowerCase().trim();
  if (!query || query === 'all') return { results: items, exact: true };
  const words = query
    .split(/[^a-z0-9]+/)
    .filter((w) => w && !STOP_WORDS.has(w))
    .map(stem);
  if (words.length === 0) return { results: items, exact: true };

  const results = items.filter((item) => {
    const itemWords = (item.name + ' ' + item.category).toLowerCase().split(/[^a-z0-9]+/).map(stem);
    const categoryWords = (CATEGORY_WORDS[item.category] || []).map(stem);
    return words.some((w) => itemWords.includes(w) || categoryWords.includes(w));
  });

  return results.length ? { results, exact: true } : { results: items, exact: false };
}

// Quick name-first matches for the header dropdown
export function suggest(rawQuery: string, items: CatalogItem[], limit = 5): CatalogItem[] {
  const q = rawQuery.toLowerCase().trim();
  if (q.length < 2) return [];
  const byName = items.filter((p) => p.name.toLowerCase().includes(q));
  const { results, exact } = searchCatalog(q, items);
  const extra = exact ? results.filter((p) => !byName.includes(p)) : [];
  return [...byName, ...extra].slice(0, limit);
}

export function applyFilters(
  items: CatalogItem[],
  opts: { category?: string | null; price?: string | null; sort?: string | null }
): CatalogItem[] {
  let list = items;
  if (opts.category) list = list.filter((p) => p.category === opts.category);
  const range = PRICE_RANGES.find((r) => r.id === opts.price);
  if (range) list = list.filter((p) => p.price >= range.min && p.price <= range.max);

  const sorted = [...list];
  switch (opts.sort) {
    case 'price-asc':
      sorted.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      sorted.sort((a, b) => b.price - a.price);
      break;
    case 'rating':
      sorted.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
      break;
    default:
      sorted.sort((a, b) => b.reviews - a.reviews); // popularity = most reviewed
  }
  return sorted;
}
