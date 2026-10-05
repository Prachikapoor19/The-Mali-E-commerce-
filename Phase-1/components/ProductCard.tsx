'use client';

import { sized } from './imageUrl';
import { useCart } from './CartContext';
import WishlistButton from './WishlistButton';
import { discountPercent, type CatalogItem } from './searchCatalog';
import { formatINR } from './pricing';
import { flyToCart } from './flyToCart';

// Shared product card: search results, wishlist and "You may also like"
export default function ProductCard({ product, onAdded }: { product: CatalogItem; onAdded?: () => void }) {
  const { addToCart, openPersonalize } = useCart();
  const off = discountPercent(product);
  const cartProduct = { id: product.id, name: product.name, price: product.price, image: product.image };

  return (
    <div data-product-card className="group bg-white rounded-2xl overflow-hidden border border-rose-light/20 shadow-xs lift-on-hover flex flex-col justify-between">
      <a href={`/product/${product.id}`} className="block">
        <div className="relative aspect-square bg-sand overflow-hidden">
          <img loading="lazy" decoding="async"
            src={sized(product.image, 500)}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {product.badge && (
            <span className="absolute top-2 left-2 bg-gold text-botanical font-bold text-[11px] px-2 py-0.5 rounded-full shadow-xs">
              {product.badge}
            </span>
          )}
          <WishlistButton id={product.id} className="absolute top-2 right-2" />
        </div>
        <div className="p-3">
          <h3 className="font-semibold text-xs sm:text-sm text-botanical line-clamp-1">{product.name}</h3>
          <div className="mt-1 flex items-center gap-1 text-[11px] text-charcoal/60">
            <span className="bg-blush text-rose-dark font-semibold px-1.5 py-0.5 rounded">{product.rating} ★</span>
            <span>({product.reviews.toLocaleString('en-IN')})</span>
          </div>
          <div className="mt-1.5 flex items-baseline gap-1.5 flex-wrap">
            <span className="font-bold text-sm text-botanical">{formatINR(product.price)}</span>
            {off > 0 && (
              <>
                <span className="text-xs text-charcoal/40 line-through">{formatINR(product.originalPrice)}</span>
                <span className="text-[11px] font-bold text-rose">{off}% OFF</span>
              </>
            )}
          </div>
        </div>
      </a>

      <div className="px-3 pb-3">
        <button
          onClick={(e) => {
            if (product.isPersonalised) {
              openPersonalize(cartProduct);
              onAdded?.();
              return;
            }
            flyToCart(e.currentTarget, product.image).then(() => {
              addToCart(cartProduct);
              onAdded?.();
            });
          }}
          className={`w-full min-h-10 py-2 rounded-full text-xs font-semibold transition-colors ${
            product.isPersonalised ? 'bg-botanical text-ivory hover:bg-botanical-light' : 'bg-rose text-ivory hover:bg-rose-dark'
          }`}
        >
          {product.isPersonalised ? 'Personalise Now' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}
