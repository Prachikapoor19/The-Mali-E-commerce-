'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Gentle scroll animations for the whole site.
 * Sections (and the cards inside their grids) that start below the screen
 * rise gently into place as you scroll to them. Nothing is ever hidden. Cards in a row appear one after another.
 * Anything already visible is left alone, and visitors who turned off motion in
 * their device settings see everything immediately.
 */
const SECTION_SELECTOR = 'main section, main > div > section';
const CARD_SELECTOR = ':scope .grid > *';
const MAX_STAGGER = 6; // cards after the 6th in a row don't wait any longer

export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: '0px 0px -5% 0px', threshold: 0 } // rises as it comes into view
    );

    const below = (el: Element) => el.getBoundingClientRect().top > window.innerHeight;

    const prepare = (el: Element, delay = 0) => {
      const node = el as HTMLElement;
      if (node.dataset.revealDone || !below(node)) return; // never hide what's already on screen
      node.dataset.revealDone = '1';
      node.classList.add('reveal');
      if (delay) node.style.setProperty('--reveal-delay', `${delay}ms`);
      observer.observe(node);
    };

    const scan = () => {
      document.querySelectorAll(SECTION_SELECTOR).forEach((section) => {
        if ((section as HTMLElement).closest('[data-no-reveal]')) return;
        const cards = Array.from(section.querySelectorAll(CARD_SELECTOR));
        if (cards.length >= 2) {
          // Animate the heading area with the section, then the cards one by one
          const heading = section.querySelector(':scope > h2, :scope > div:first-child');
          if (heading && !heading.classList.contains('grid') && !heading.querySelector('.grid')) prepare(heading);
          cards.forEach((card, i) => {
            const row = card.parentElement as HTMLElement;
            // Sideways-swipe rows (mobile carousels): reveal the whole row at once
            if (row.scrollWidth > row.clientWidth + 4) prepare(row);
            else prepare(card, Math.min(i, MAX_STAGGER) * 60);
          });
        } else {
          prepare(section);
        }
      });
    };

    scan();
    // Content that appears later (search results, products loading) gets the same treatment
    let timer: ReturnType<typeof setTimeout> | undefined;
    const mo = new MutationObserver(() => {
      clearTimeout(timer);
      timer = setTimeout(scan, 120);
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      clearTimeout(timer);
      mo.disconnect();
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}
