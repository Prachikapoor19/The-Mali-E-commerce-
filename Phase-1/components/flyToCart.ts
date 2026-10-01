// "Fly to cart": a copy of the product photo curves up into the header cart.
// Resolves when it lands (or immediately if there is nothing to animate).

export function flyToCart(from: Element | null | undefined, imageUrl?: string): Promise<void> {
  if (typeof window === 'undefined' || !from) return Promise.resolve();
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return Promise.resolve();

  // Visible cart button in the header (desktop and mobile share it)
  const target = Array.from(document.querySelectorAll<HTMLElement>('[data-cart-target]')).find(
    (el) => el.offsetParent !== null
  );
  if (!target) return Promise.resolve();

  // Start from the product photo in the same card, otherwise from the button itself
  const card = from.closest('[data-product-card]');
  const photo = card?.querySelector('img') ?? null;
  const start = (photo ?? from).getBoundingClientRect();
  const end = target.getBoundingClientRect();
  const src = photo?.currentSrc || photo?.src || imageUrl;

  const size = Math.min(start.width, start.height, 140);
  const ghost = document.createElement(src ? 'img' : 'div');
  if (src) (ghost as HTMLImageElement).src = src;
  Object.assign(ghost.style, {
    position: 'fixed',
    left: `${start.left + start.width / 2 - size / 2}px`,
    top: `${start.top + start.height / 2 - size / 2}px`,
    width: `${size}px`,
    height: `${size}px`,
    objectFit: 'cover',
    borderRadius: '9999px',
    background: '#3F6C4C',
    boxShadow: '0 12px 30px -8px rgba(31,46,32,.45)',
    zIndex: '80',
    pointerEvents: 'none',
  } as CSSStyleDeclaration);
  document.body.appendChild(ghost);

  const dx = end.left + end.width / 2 - (start.left + start.width / 2);
  const dy = end.top + end.height / 2 - (start.top + start.height / 2);
  const lift = Math.min(160, Math.abs(dy) * 0.35 + 60); // arc upwards before landing

  const anim = ghost.animate(
    [
      { transform: 'translate(0, 0) scale(1)', opacity: 1 },
      { transform: `translate(${dx * 0.45}px, ${dy * 0.45 - lift}px) scale(0.7)`, opacity: 1, offset: 0.45 },
      { transform: `translate(${dx}px, ${dy}px) scale(0.12)`, opacity: 0.4 },
    ],
    { duration: 750, easing: 'cubic-bezier(0.45, 0, 0.25, 1)' }
  );

  return new Promise((resolve) => {
    const done = () => {
      ghost.remove();
      // little "catch" wiggle on the cart button
      target.animate(
        [{ transform: 'scale(1)' }, { transform: 'scale(1.12)' }, { transform: 'scale(1)' }],
        { duration: 300, easing: 'ease-out' }
      );
      resolve();
    };
    anim.onfinish = done;
    anim.oncancel = done;
  });
}
