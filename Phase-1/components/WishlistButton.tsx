'use client';

import { useWishlist } from './WishlistContext';

// Heart toggle used on product cards and the product page
export default function WishlistButton({ id, className = '', size = 'sm' }: { id: string; className?: string; size?: 'sm' | 'lg' }) {
  const { has, toggle } = useWishlist();
  const saved = has(id);
  const box = size === 'lg' ? 'w-11 h-11' : 'w-9 h-9';
  const icon = size === 'lg' ? 'w-5 h-5' : 'w-4 h-4';
  // Card hearts sit on photos (always absolutely positioned): give them a 48px tap area without making them look bigger
  const hitArea = size === 'lg' ? '' : "before:absolute before:-inset-1.5 before:content-['']";

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(id);
      }}
      aria-pressed={saved}
      aria-label={saved ? 'Remove from wishlist' : 'Add to wishlist'}
      title={saved ? 'Remove from wishlist' : 'Add to wishlist'}
      className={`${box} ${hitArea} rounded-full flex items-center justify-center bg-white/95 border border-rose-light/40 shadow-xs hover:scale-105 transition-transform ${className}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={saved ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        key={saved ? 'on' : 'off'}
        className={`${icon} ${saved ? 'text-red-500 animate-bump' : 'text-botanical'}`}
      >
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </svg>
    </button>
  );
}
