'use client';

import { suggest } from './shopSearch';
import { useProducts } from './ProductsContext';
import { formatINR } from './pricing';

// Live product matches shown under the header search box while typing
export default function SearchSuggestions({ query, onPick }: { query: string; onPick: () => void }) {
  const { products } = useProducts();
  const items = suggest(query, products, 5);
  if (query.trim().length < 2) return null;

  return (
    <div
      className="absolute left-0 top-full mt-2 w-full min-w-[300px] sm:min-w-[360px] bg-white rounded-2xl shadow-xl border border-botanical/10 overflow-hidden z-[70]"
      // keep the input focused while clicking a suggestion
      onMouseDown={(e) => e.preventDefault()}
    >
      {items.length === 0 ? (
        <p className="px-4 py-3 text-xs text-charcoal/60">No matching products. Press Enter to see our bestsellers.</p>
      ) : (
        <ul>
          {items.map((p) => (
            <li key={p.id}>
              <a href={`/product/${p.id}`} onClick={onPick} className="flex items-center gap-3 px-4 py-2.5 hover:bg-blush transition-colors">
                <img src={p.image} alt="" className="w-10 h-10 rounded-lg object-cover bg-sand shrink-0" />
                <span className="flex-1 min-w-0">
                  <span className="block text-xs font-semibold text-botanical truncate">{p.name}</span>
                  <span className="block text-[11px] text-charcoal/50">{p.category}</span>
                </span>
                <span className="text-xs font-bold text-botanical">{formatINR(p.price)}</span>
              </a>
            </li>
          ))}
        </ul>
      )}
      <a
        href={`/search?q=${encodeURIComponent(query.trim())}`}
        onClick={onPick}
        className="block px-4 py-2.5 text-xs font-semibold text-rose bg-sand/60 hover:bg-sand border-t border-botanical/10"
      >
        See all results for &quot;{query.trim()}&quot; →
      </a>
    </div>
  );
}
