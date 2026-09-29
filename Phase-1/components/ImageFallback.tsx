'use client';

import { useEffect } from 'react';

const PLACEHOLDER = '/placeholder.svg';

// If any photo on the site fails to load (moved/removed online, slow network,
// blocked), show a soft branded placeholder instead of a broken-image icon.
export default function ImageFallback() {
  useEffect(() => {
    const swap = (img: HTMLImageElement) => {
      if (img.dataset.fallback) return; // only once, never loop
      img.dataset.fallback = '1';
      img.src = PLACEHOLDER;
    };

    // Images that already failed before this code ran
    document.querySelectorAll('img').forEach((img) => {
      if (img.complete && img.naturalWidth === 0 && img.getAttribute('src')) swap(img);
    });

    // Images that fail later (error events don't bubble, so listen in the capture phase)
    const onError = (e: Event) => {
      if (e.target instanceof HTMLImageElement) swap(e.target);
    };
    window.addEventListener('error', onError, true);
    return () => window.removeEventListener('error', onError, true);
  }, []);

  return null;
}
