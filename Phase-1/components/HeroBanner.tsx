'use client';

import { useState, useEffect } from 'react';

const slides = [
  {
    tag: 'Birthday Specials',
    title: 'Make Their Day\nBloom with Joy',
    subtitle: 'Fresh flowers + cakes combos starting at Rs. 499',
    cta: 'Shop Birthday Gifts',
    bg: 'bg-blush',
    accent: 'text-rose',
  },
  {
    tag: 'Anniversary',
    title: 'Celebrate Every\nYear of Love',
    subtitle: 'Curated romantic hampers, delivered with care',
    cta: 'Shop Anniversary',
    bg: 'bg-[#F4EDE1]',
    accent: 'text-gold',
  },
  {
    tag: 'Same-Day Delivery',
    title: 'Forgot a Date?\nWe Have You Covered',
    subtitle: 'Order before 4 PM for delivery today, in 200+ cities',
    cta: 'Order Now',
    bg: 'bg-[#E7EFE4]',
    accent: 'text-botanical',
  },
];

export default function HeroBanner() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[active];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 md:pt-8">
      <div className={`relative overflow-hidden rounded-3xl ${slide.bg} transition-colors duration-700`}>
        <div className="grid md:grid-cols-2 items-center gap-6 px-6 py-10 md:px-14 md:py-16 min-h-[320px] md:min-h-[420px]">

          <div>
            <span className={`inline-block text-sm font-semibold ${slide.accent} mb-3`}>
              {slide.tag}
            </span>
            <h1 className="font-display text-3xl md:text-5xl font-semibold leading-tight whitespace-pre-line text-charcoal">
              {slide.title}
            </h1>
            <p className="mt-4 text-base md:text-lg text-charcoal/70 max-w-md">
              {slide.subtitle}
            </p>
            <button className="mt-7 inline-flex items-center gap-2 bg-rose hover:bg-rose-dark text-ivory font-semibold px-6 py-3 rounded-full transition-colors">
              {slide.cta}
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>

          <div className="hidden md:flex justify-center items-center">
            <div className="w-64 h-64 rounded-full bg-white/50 flex items-center justify-center">
              <span className="text-6xl">
                {active === 0 ? '\u{1F382}' : active === 1 ? '\u{1F490}' : '\u{1F69A}'}
              </span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2 rounded-full transition-all ${
                i === active ? 'w-6 bg-charcoal' : 'w-2 bg-charcoal/25'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}