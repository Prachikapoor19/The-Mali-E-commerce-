'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from './CartContext';
import WishlistButton from './WishlistButton';
import ProductCard from './ProductCard';
import { discountPercent, relatedProducts, type CatalogItem } from './searchCatalog';
import { useProducts } from './ProductsContext';
import { formatINR, FREE_DELIVERY_ABOVE } from './pricing';

const TRUST = [
  { title: 'Fresh & handpicked', text: 'Prepared by our florists and bakers on the day of delivery' },
  { title: 'On-time delivery', text: 'Same-day, midnight and express slots available' },
  { title: 'Free message card', text: 'Add your personal note at checkout' },
];

export default function ProductView({ product: serverProduct }: { product: CatalogItem }) {
  const router = useRouter();
  const { addToCart, openPersonalize, closeCart } = useCart();
  const [qty, setQty] = useState(1);
  const { products, getProduct } = useProducts();
  // Prefer the freshest copy (e.g. a price changed in admin a moment ago)
  const product = getProduct(serverProduct.id) ?? serverProduct;

  const off = discountPercent(product);
  const cartProduct = { id: product.id, name: product.name, price: product.price, image: product.image };
  const related = relatedProducts(products, product.id, 4);

  const add = () => {
    for (let i = 0; i < qty; i++) addToCart(cartProduct);
  };

  return (
    <>
      <section className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 py-6 sm:py-10">
        {/* Breadcrumb */}
        <nav className="text-xs text-charcoal/60 mb-5" aria-label="Breadcrumb">
          <a href="/" className="hover:text-rose">Home</a>
          <span className="mx-1.5">/</span>
          <a href={`/search?q=${encodeURIComponent(product.category)}`} className="hover:text-rose">{product.category}</a>
          <span className="mx-1.5">/</span>
          <span className="text-botanical font-medium">{product.name}</span>
        </nav>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-14 items-start">
          {/* Image */}
          <div className="relative rounded-3xl overflow-hidden bg-sand aspect-square border border-rose-light/20">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            {product.badge && (
              <span className="absolute top-4 left-4 bg-gold text-botanical font-bold text-xs px-3 py-1 rounded-full shadow-xs">
                {product.badge}
              </span>
            )}
            <WishlistButton id={product.id} size="lg" className="absolute top-4 right-4" />
          </div>

          {/* Details */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gold-dark mb-2">{product.category}</p>
            <h1 className="font-display text-2xl sm:text-4xl font-bold text-botanical leading-tight">{product.name}</h1>

            <div className="mt-3 flex items-center gap-2 text-sm">
              <span className="bg-blush text-rose-dark font-semibold px-2 py-0.5 rounded">{product.rating} ★</span>
              <span className="text-charcoal/60">{product.reviews.toLocaleString('en-IN')} reviews</span>
            </div>

            <div className="mt-5 flex items-baseline gap-3 flex-wrap">
              <span className="text-3xl font-bold text-botanical">{formatINR(product.price)}</span>
              {off > 0 && (
                <>
                  <span className="text-lg text-charcoal/40 line-through">{formatINR(product.originalPrice)}</span>
                  <span className="text-sm font-bold text-rose bg-blush px-2 py-0.5 rounded-full">{off}% OFF</span>
                </>
              )}
            </div>
            <p className="text-xs text-charcoal/50 mt-1">
              Inclusive of all taxes · Free standard delivery on orders above {formatINR(FREE_DELIVERY_ABOVE)}
            </p>

            <p className="mt-6 text-sm leading-relaxed text-charcoal/80">{product.description}</p>

            {/* What's included */}
            <div className="mt-6">
              <h2 className="text-sm font-bold text-botanical mb-2">What&apos;s included</h2>
              <ul className="space-y-1.5">
                {product.includes.map((line) => (
                  <li key={line} className="flex items-start gap-2 text-sm text-charcoal/80">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                    {line}
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              {!product.isPersonalised && (
                <div className="flex items-center gap-3 bg-white border border-botanical/20 rounded-full px-2 py-1.5">
                  <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="w-8 h-8 rounded-full hover:bg-blush font-bold text-botanical" aria-label="Decrease quantity">
                    −
                  </button>
                  <span className="w-5 text-center font-semibold">{qty}</span>
                  <button onClick={() => setQty((q) => Math.min(10, q + 1))} className="w-8 h-8 rounded-full hover:bg-blush font-bold text-botanical" aria-label="Increase quantity">
                    +
                  </button>
                </div>
              )}

              {product.isPersonalised ? (
                <button
                  onClick={() => openPersonalize(cartProduct)}
                  className="flex-1 min-w-[180px] py-3.5 rounded-full bg-botanical text-ivory text-sm font-bold hover:bg-botanical-light transition-colors"
                >
                  Personalise &amp; Add to Cart
                </button>
              ) : (
                <>
                  <button
                    onClick={add}
                    className="flex-1 min-w-[150px] py-3.5 rounded-full border-2 border-botanical text-botanical text-sm font-bold hover:bg-blush transition-colors"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => {
                      add();
                      closeCart();
                      router.push('/checkout');
                    }}
                    className="flex-1 min-w-[150px] py-3.5 rounded-full bg-rose text-ivory text-sm font-bold hover:bg-rose-dark transition-colors"
                  >
                    Buy Now
                  </button>
                </>
              )}
            </div>

            {/* Trust points */}
            <div className="mt-8 grid sm:grid-cols-3 gap-3">
              {TRUST.map((t) => (
                <div key={t.title} className="bg-sand rounded-2xl p-4">
                  <p className="text-sm font-bold text-botanical">{t.title}</p>
                  <p className="text-xs text-charcoal/60 mt-1">{t.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* You may also like */}
      <section className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 py-8 sm:py-10 bg-blush/50">
        <h2 className="section-title mb-6">You may also like</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {related.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </>
  );
}
