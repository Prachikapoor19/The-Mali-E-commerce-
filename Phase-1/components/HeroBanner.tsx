// 'use client';

// import { useRef } from 'react';

// const slides = [
//   {
//     tag: 'Same-Day Delivery',
//     title: 'Forgot a Date? We Have You Covered',
//     subtitle: 'Order before 6 PM for guaranteed delivery today in 200+ cities.',
//     cta: 'Order Now',
//     bg: 'bg-botanical',
//     text: 'text-ivory',
//     tagBg: 'bg-gold text-charcoal',
//     btnBg: 'bg-botanical-light hover:bg-botanical text-ivory',
//     img: 'https://images.unsplash.com/photo-1594291975567-6dab42430545?w=500&h=500&fit=crop',
//   },
//   {
//     tag: 'Gourmet Cakes',
//     title: 'Gourmet Cakes for Your Celebration',
//     subtitle: 'Find the sweetest delights for your sweetest moments.',
//     cta: 'Order Now',
//     bg: 'bg-sand',
//     text: 'text-charcoal',
//     tagBg: 'bg-white/70 text-charcoal',
//     btnBg: 'bg-botanical hover:bg-botanical-light text-ivory',
//     img: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=500&h=500&fit=crop',
//   },
//   {
//     tag: 'Personalised Gifts',
//     title: 'Gifts That Feel Truly Yours',
//     subtitle: 'Curated hampers and keepsakes for every relationship.',
//     cta: 'Shop Gifts',
//     bg: 'bg-blush',
//     text: 'text-charcoal',
//     tagBg: 'bg-white/70 text-rose',
//     btnBg: 'bg-rose hover:bg-rose-dark text-ivory',
//     img: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&h=500&fit=crop',
//   },
// ];

// export default function HeroBanner() {
//   const scrollRef = useRef<HTMLDivElement>(null);

//   const scroll = (direction: 'left' | 'right') => {
//     if (!scrollRef.current) return;
//     const width = scrollRef.current.clientWidth * 0.85;
//     scrollRef.current.scrollBy({
//       left: direction === 'left' ? -width : width,
//       behavior: 'smooth',
//     });
//   };

//   return (
//     <section className="w-full py-2 relative">
//       <button
//         onClick={() => scroll('left')}
//         aria-label="Previous"
//         className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-blush transition-colors"
//       >
//         <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-charcoal" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//           <polyline points="15 18 9 12 15 6" />
//         </svg>
//       </button>

//       <div
//         ref={scrollRef}
//         className="flex gap-3 overflow-x-auto scroll-smooth snap-x snap-mandatory px-[4%] md:px-[6%]"
//         style={{ scrollbarWidth: 'none' }}
//       >
//         {slides.map((slide) => (
//           <div
//             key={slide.title}
//             className={`snap-center shrink-0 w-[92%] md:w-[88%] rounded-2xl overflow-hidden relative ${slide.bg} h-[220px] md:h-[280px]`}
//           >
//             <div className="relative z-10 h-full flex flex-col justify-center gap-3 px-6 md:px-12 max-w-[60%] md:max-w-[55%]">
//               <span className={`inline-block w-fit text-[10px] md:text-xs font-semibold px-3 py-1 rounded-full ${slide.tagBg}`}>
//                 {slide.tag.toUpperCase()}
//               </span>
//               <h1 className={`font-display text-xl md:text-3xl font-bold leading-tight ${slide.text}`}>
//                 {slide.title}
//               </h1>
//               <p className={`text-xs md:text-sm ${slide.text} opacity-80`}>
//                 {slide.subtitle}
//               </p>
//               <button className={`mt-1 w-fit inline-flex items-center gap-2 text-xs md:text-sm font-semibold px-5 py-2.5 rounded-full transition-colors ${slide.btnBg}`}>
//                 {slide.cta}
//                 <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                   <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
//                 </svg>
//               </button>
//             </div>

//             <img
//               src={slide.img}
//               alt={slide.title}
//               className="absolute right-0 bottom-0 h-full w-[45%] md:w-[42%] object-cover"
//             />
//           </div>
//         ))}
//       </div>

//       <button
//         onClick={() => scroll('right')}
//         aria-label="Next"
//         className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-blush transition-colors"
//       >
//         <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-charcoal" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//           <polyline points="9 18 15 12 9 6" />
//         </svg>
//       </button>
//     </section>
//   );
// }


'use client';

import { useState, useEffect } from 'react';

const px = (id: number) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1600`;

// Full-bleed photo slides (all photos checked on Pexels to match the text)
const slides = [
  {
    tag: 'Same-Day Delivery',
    title: 'Fresh flowers, delivered today',
    subtitle: 'Hand-tied bouquets from our florists, at their door in as little as 60 minutes.',
    cta: 'Shop Flowers',
    href: '/search?q=flowers',
    img: px(30891127),
    alt: 'Bouquet of pink roses and white flowers',
  },
  {
    tag: 'Freshly Baked',
    title: 'Cakes baked on the day of delivery',
    subtitle: 'Red velvet, truffle, black forest and more — with a free candle and knife.',
    cta: 'Shop Cakes',
    href: '/search?q=cakes',
    img: px(38774006),
    alt: 'Heart-shaped red velvet cakes with berries',
  },
  {
    tag: 'Festive Season',
    title: 'Diwali gifting, beautifully wrapped',
    subtitle: 'Gourmet hampers, dry fruits and chocolates for everyone on your list.',
    cta: 'Shop Hampers',
    href: '/search?q=hampers',
    img: px(264771),
    alt: 'Wrapped gift box with a Just For You tag',
  },
  {
    tag: 'Personalised',
    title: 'Gifts that feel truly theirs',
    subtitle: 'Photo frames, mugs and keepsakes made with their name and your words.',
    cta: 'Personalise a Gift',
    href: '/search?q=personalised',
    img: px(9451803),
    alt: 'Framed photo of a couple surrounded by red ribbons',
  },
];

export default function HeroBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-play every 5s, paused while the visitor hovers
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const go = (delta: number) => setCurrentIndex((prev) => (prev + delta + slides.length) % slides.length);

  return (
    <section
      className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 pt-4 sm:pt-6"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-roledescription="carousel"
    >
      <div className="relative w-full h-[420px] sm:h-[460px] lg:h-[520px] rounded-3xl overflow-hidden bg-botanical shadow-lg">
        {slides.map((slide, idx) => {
          const active = idx === currentIndex;
          return (
            <div
              key={slide.title}
              className={`absolute inset-0 transition-opacity duration-1000 ease-out ${active ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
              aria-hidden={!active}
            >
              {/* Photo with a slow zoom while active */}
              <img
                src={slide.img}
                alt={slide.alt}
                className={`absolute inset-0 w-full h-full object-cover transition-transform duration-[6000ms] ease-out ${active ? 'scale-105' : 'scale-100'}`}
              />
              {/* Green wash so the text is always readable */}
              <div className="absolute inset-0 bg-gradient-to-r from-botanical/95 via-botanical/60 to-botanical/0" />
              <div className="absolute inset-0 bg-gradient-to-t from-botanical/50 via-transparent to-transparent sm:hidden" />

              {/* Text */}
              <div className="relative h-full flex flex-col justify-end sm:justify-center gap-4 px-6 sm:px-12 lg:px-16 pb-16 sm:pb-0 max-w-2xl">
                <span className={`w-fit text-[10px] sm:text-xs font-bold px-3 py-1 rounded-full uppercase tracking-[0.18em] bg-gold text-botanical ${active ? 'animate-fade-up' : ''}`}>
                  {slide.tag}
                </span>
                <h2 className={`font-display text-3xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] text-ivory ${active ? 'animate-fade-up [animation-delay:120ms]' : ''}`}>
                  {slide.title}
                </h2>
                <p className={`text-sm sm:text-base text-ivory/85 max-w-md ${active ? 'animate-fade-up [animation-delay:240ms]' : ''}`}>
                  {slide.subtitle}
                </p>
                <div className={`flex flex-wrap gap-3 mt-1 ${active ? 'animate-fade-up [animation-delay:360ms]' : ''}`}>
                  <a
                    href={slide.href}
                    tabIndex={active ? 0 : -1}
                    className="inline-flex items-center gap-2 text-sm font-bold px-6 py-3 rounded-full bg-ivory text-botanical hover:bg-gold transition-colors shadow-md"
                  >
                    {slide.cta}
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </a>
                  <a
                    href="/search?q=all"
                    tabIndex={active ? 0 : -1}
                    className="hidden sm:inline-flex items-center text-sm font-semibold px-6 py-3 rounded-full border border-ivory/60 text-ivory hover:bg-ivory/10 transition-colors"
                  >
                    Explore All Gifts
                  </a>
                </div>
              </div>
            </div>
          );
        })}

        {/* Arrows (bottom-right, clear of the text) */}
        <div className="hidden sm:flex absolute bottom-5 right-6 lg:right-10 z-20 gap-2">
          <button
            onClick={() => go(-1)}
            aria-label="Previous slide"
            className="w-11 h-11 rounded-full bg-ivory/15 backdrop-blur-md border border-ivory/30 flex items-center justify-center text-ivory hover:bg-ivory hover:text-botanical transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            onClick={() => go(1)}
            aria-label="Next slide"
            className="w-11 h-11 rounded-full bg-ivory/15 backdrop-blur-md border border-ivory/30 flex items-center justify-center text-ivory hover:bg-ivory hover:text-botanical transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        {/* Progress dots */}
        <div className="absolute bottom-5 left-6 sm:left-12 lg:left-16 z-20 flex items-center gap-2">
          {slides.map((s, idx) => (
            <button
              key={s.title}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-500 ${currentIndex === idx ? 'w-10 bg-gold' : 'w-4 bg-ivory/50 hover:bg-ivory/80'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
