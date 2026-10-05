'use client';

import { usePathname } from 'next/navigation';
import { useCart } from './CartContext';
import { useWishlist } from './WishlistContext';

// App-style bottom bar, phones only. Hidden on checkout (it has its own button)
// and admin. A spacer of the same height keeps the footer from hiding behind it.
const HIDDEN_ON = ['/checkout', '/admin'];

const icon = 'w-[22px] h-[22px]';
const ICONS = {
  home: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={icon}><path d="M3 10.5 12 3l9 7.5" /><path d="M5 9.5V20a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V9.5" /></svg>
  ),
  shop: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={icon}><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></svg>
  ),
  wishlist: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={icon}><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>
  ),
  orders: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={icon}><path d="M3 7h11v10H3z" /><path d="M14 10h4l3 3v4h-7" /><circle cx="7" cy="18" r="1.8" /><circle cx="17.5" cy="18" r="1.8" /></svg>
  ),
  cart: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={icon}><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
  ),
};

function Badge({ n }: { n: number }) {
  if (n <= 0) return null;
  return (
    <span
      key={n}
      className="absolute -top-1 left-1/2 ml-1.5 bg-rose text-ivory text-[10px] font-bold rounded-full h-[18px] min-w-[18px] px-1 flex items-center justify-center animate-bump"
    >
      {n > 99 ? '99+' : n}
    </span>
  );
}

export default function MobileTabBar() {
  const pathname = usePathname() || '/';
  const { itemCount, openCart, isCartOpen } = useCart();
  const { count: wishCount } = useWishlist();

  if (HIDDEN_ON.some((p) => pathname.startsWith(p))) return null;

  const tab = (active: boolean) =>
    `relative flex-1 flex flex-col items-center justify-center gap-1 h-full text-[11px] font-semibold transition-colors ${
      active ? 'text-rose' : 'text-botanical/70 active:text-rose'
    }`;
  const dot = (active: boolean) =>
    active ? <span className="absolute top-0 left-1/2 -translate-x-1/2 h-[3px] w-7 rounded-b-full bg-gold" /> : null;

  const links = [
    { href: '/', label: 'Home', icon: ICONS.home, active: pathname === '/' },
    { href: '/search?q=all', label: 'Shop', icon: ICONS.shop, active: pathname.startsWith('/search') || pathname.startsWith('/product') },
    { href: '/wishlist', label: 'Wishlist', icon: ICONS.wishlist, active: pathname.startsWith('/wishlist'), badge: wishCount },
    { href: '/track-order', label: 'Orders', icon: ICONS.orders, active: pathname.startsWith('/track-order') || pathname.startsWith('/order-confirmed') },
  ];

  return (
    <>
      {/* Spacer so the last part of the page isn't covered by the bar */}
      <div aria-hidden="true" className="md:hidden h-[calc(64px+env(safe-area-inset-bottom))]" />
      <nav
        aria-label="Quick links"
        className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-ivory/95 backdrop-blur-md border-t border-botanical/10 shadow-[0_-6px_20px_rgba(31,46,32,0.08)] pb-[env(safe-area-inset-bottom)]"
      >
        <div className="flex items-stretch h-16">
          {links.map((l) => (
            <a key={l.label} href={l.href} className={tab(l.active)} aria-current={l.active ? 'page' : undefined}>
              {dot(l.active)}
              <span className="relative">
                {l.icon}
                {l.badge ? <Badge n={l.badge} /> : null}
              </span>
              {l.label}
            </a>
          ))}
          <button type="button" onClick={openCart} className={tab(isCartOpen)} aria-label={`Cart (${itemCount})`}>
            {dot(isCartOpen)}
            <span className="relative">
              {ICONS.cart}
              <Badge n={itemCount} />
            </span>
            Cart
          </button>
        </div>
      </nav>
    </>
  );
}
