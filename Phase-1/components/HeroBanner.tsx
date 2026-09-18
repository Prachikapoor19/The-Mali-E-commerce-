'use client';

import { useRef } from 'react';

const slides = [
  {
    tag: 'Same-Day Delivery',
    title: 'Forgot a Date? We Have You Covered',
    subtitle: 'Order before 6 PM for guaranteed delivery today in 200+ cities.',
    cta: 'Order Now',
    bg: 'bg-botanical',
    text: 'text-ivory',
    tagBg: 'bg-gold text-charcoal',
    btnBg: 'bg-botanical-light hover:bg-botanical text-ivory',
    img: 'https://images.unsplash.com/photo-1594291975567-6dab42430545?w=500&h=500&fit=crop',
  },
  {
    tag: 'Gourmet Cakes',
    title: 'Gourmet Cakes for Your Celebration',
    subtitle: 'Find the sweetest delights for your sweetest moments.',
    cta: 'Order Now',
    bg: 'bg-[#F4E3D3]',
    text: 'text-charcoal',
    tagBg: 'bg-white/70 text-charcoal',
    btnBg: 'bg-botanical hover:bg-botanical-light text-ivory',
    img: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=500&h=500&fit=crop',
  },
  {
    tag: 'Personalised Gifts',
    title: 'Gifts That Feel Truly Yours',
    subtitle: 'Curated hampers and keepsakes for every relationship.',
    cta: 'Shop Gifts',
    bg: 'bg-blush',
    text: 'text-charcoal',
    tagBg: 'bg-white/70 text-rose',
    btnBg: 'bg-rose hover:bg-rose-dark text-ivory',
    img: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&h=500&fit=crop',
  },
];

export default function HeroBanner() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const width = scrollRef.current.clientWidth * 0.85;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -width : width,
      behavior: 'smooth',
    });
  };

  return (
    <section className="w-full py-2 relative">
      <button
        onClick={() => scroll('left')}
        aria-label="Previous"
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-blush transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-charcoal" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto scroll-smooth snap-x snap-mandatory px-[4%] md:px-[6%]"
        style={{ scrollbarWidth: 'none' }}
      >
        {slides.map((slide) => (
          <div
            key={slide.title}
            className={`snap-center shrink-0 w-[92%] md:w-[88%] rounded-2xl overflow-hidden relative ${slide.bg} h-[220px] md:h-[280px]`}
          >
            <div className="relative z-10 h-full flex flex-col justify-center gap-3 px-6 md:px-12 max-w-[60%] md:max-w-[55%]">
              <span className={`inline-block w-fit text-[10px] md:text-xs font-semibold px-3 py-1 rounded-full ${slide.tagBg}`}>
                {slide.tag.toUpperCase()}
              </span>
              <h1 className={`font-display text-xl md:text-3xl font-bold leading-tight ${slide.text}`}>
                {slide.title}
              </h1>
              <p className={`text-xs md:text-sm ${slide.text} opacity-80`}>
                {slide.subtitle}
              </p>
              <button className={`mt-1 w-fit inline-flex items-center gap-2 text-xs md:text-sm font-semibold px-5 py-2.5 rounded-full transition-colors ${slide.btnBg}`}>
                {slide.cta}
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </div>

            <img
              src={slide.img}
              alt={slide.title}
              className="absolute right-0 bottom-0 h-full w-[45%] md:w-[42%] object-cover"
            />
          </div>
        ))}
      </div>

      <button
        onClick={() => scroll('right')}
        aria-label="Next"
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-blush transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-charcoal" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </section>
  );
}