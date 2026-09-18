// 'use client';

// const occasions = [
//   {
//     title: 'Birthday',
//     label: 'CAKES',
//     date: null,
//     bg: 'bg-[#F4EDE1]',
//     accent: 'text-gold',
//     img: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=300&h=300&fit=crop',
//   },
//   {
//     title: 'Wife Appreciation Day',
//     label: null,
//     date: '20TH SEP',
//     bg: 'bg-blush',
//     accent: 'text-rose',
//     img: 'https://images.unsplash.com/photo-1533616688419-b7a585564566?w=300&h=300&fit=crop',
//   },
//   {
//     title: 'Anniversary',
//     label: null,
//     date: null,
//     bg: 'bg-[#FBE4E7]',
//     accent: 'text-rose',
//     img: 'https://images.unsplash.com/photo-1594291975567-6dab42430545?w=300&h=300&fit=crop',
//   },
//   {
//     title: 'Festive Special',
//     label: 'DECOR AVAILABLE',
//     date: '14TH-25TH SEP',
//     bg: 'bg-[#FDF0E3]',
//     accent: 'text-gold',
//     img: 'https://images.unsplash.com/photo-1487070183336-b863922373d4?w=300&h=300&fit=crop',
//   },
//   {
//     title: 'Thank You',
//     label: null,
//     date: null,
//     bg: 'bg-[#E7EFE4]',
//     accent: 'text-botanical',
//     img: 'https://images.unsplash.com/photo-1470509037663-253afd7f0f51?w=300&h=300&fit=crop',
//   },
//   {
//     title: 'Congratulations',
//     label: null,
//     date: null,
//     bg: 'bg-[#DCE9F5]',
//     accent: 'text-charcoal/60',
//     img: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=300&h=300&fit=crop',
//   },
// ];

// export default function OccasionStrip() {
//   return (
//     <section className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 py-6">
//       <h2 className="font-display text-xl md:text-2xl font-semibold text-charcoal mb-4">
//         Gifts For Every Occasion
//       </h2>
//       <div className="flex gap-3 md:gap-4 overflow-x-auto pb-2">
//         {occasions.map((occ) => (
//           <a key={occ.title} href="#" className={`relative shrink-0 w-64 md:w-72 h-40 md:h-44 rounded-2xl overflow-hidden ${occ.bg} hover:-translate-y-0.5 transition-transform`}>
//             {occ.date && (
//               <span className="absolute top-3 right-3 bg-white/80 text-[10px] font-semibold px-2 py-1 rounded-md text-charcoal/70 z-10">
//                 {occ.date}
//               </span>
//             )}

//             <div className="relative z-10 p-4 h-full flex flex-col justify-start max-w-[65%]">
//               <h3 className="font-display text-lg md:text-xl font-semibold text-charcoal leading-tight">
//                 {occ.title}
//               </h3>
//               {occ.label && (
//                 <span className={`text-[11px] font-semibold mt-1 ${occ.accent}`}>
//                   {occ.label}
//                 </span>
//               )}
//             </div>

//             <div className="absolute -bottom-4 -right-4 w-32 h-32 md:w-36 md:h-36 rounded-full overflow-hidden">
//               <img src={occ.img} alt={occ.title} className="w-full h-full object-cover" />
//             </div>
//           </a>
//         ))}
//       </div>
//     </section>
//   );
// }


'use client';

import { useRef } from 'react';

const occasions = [
  {
    title: 'Birthday',
    label: 'CAKES',
    date: null,
    bg: 'bg-[#F4EDE1]',
    accent: 'text-gold',
    img: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=300&h=300&fit=crop',
  },
  {
    title: 'Wife Appreciation Day',
    label: null,
    date: '20TH SEP',
    bg: 'bg-blush',
    accent: 'text-rose',
    img: 'https://images.unsplash.com/photo-1533616688419-b7a585564566?w=300&h=300&fit=crop',
  },
  {
    title: 'Anniversary',
    label: null,
    date: null,
    bg: 'bg-[#FBE4E7]',
    accent: 'text-rose',
    img: 'https://images.unsplash.com/photo-1594291975567-6dab42430545?w=300&h=300&fit=crop',
  },
  {
    title: 'Festive Special',
    label: 'DECOR AVAILABLE',
    date: '14TH-25TH SEP',
    bg: 'bg-[#FDF0E3]',
    accent: 'text-gold',
    img: 'https://images.unsplash.com/photo-1487070183336-b863922373d4?w=300&h=300&fit=crop',
  },
  {
    title: 'Thank You',
    label: null,
    date: null,
    bg: 'bg-[#E7EFE4]',
    accent: 'text-botanical',
    img: 'https://images.unsplash.com/photo-1470509037663-253afd7f0f51?w=300&h=300&fit=crop',
  },
  {
    title: 'Congratulations',
    label: null,
    date: null,
    bg: 'bg-[#DCE9F5]',
    accent: 'text-charcoal/60',
    img: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=300&h=300&fit=crop',
  },
];

export default function OccasionStrip() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = 300;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  };

  return (
    <section className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 py-6">
      <h2 className="font-display text-xl md:text-2xl font-semibold text-charcoal mb-4">
        Gifts For Every Occasion
      </h2>

      <div className="relative">
        <button
          onClick={() => scroll('left')}
          aria-label="Scroll left"
          className="hidden md:flex absolute -left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white shadow-md border border-charcoal/10 items-center justify-center hover:bg-blush transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-charcoal" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <div ref={scrollRef} className="flex gap-3 md:gap-4 overflow-x-auto pb-2 scroll-smooth">
          {occasions.map((occ) => (
            <a key={occ.title} href="#" className={`relative shrink-0 w-64 md:w-72 h-40 md:h-44 rounded-2xl overflow-hidden ${occ.bg} hover:-translate-y-0.5 transition-transform`}>
              {occ.date && (
                <span className="absolute top-3 right-3 bg-white/80 text-[10px] font-semibold px-2 py-1 rounded-md text-charcoal/70 z-10">
                  {occ.date}
                </span>
              )}

              <div className="relative z-10 p-4 h-full flex flex-col justify-start max-w-[65%]">
                <h3 className="font-display text-lg md:text-xl font-semibold text-charcoal leading-tight">
                  {occ.title}
                </h3>
                {occ.label && (
                  <span className={`text-[11px] font-semibold mt-1 ${occ.accent}`}>
                    {occ.label}
                  </span>
                )}
              </div>

              <div className="absolute -bottom-4 -right-4 w-32 h-32 md:w-36 md:h-36 rounded-full overflow-hidden">
                <img src={occ.img} alt={occ.title} className="w-full h-full object-cover" />
              </div>
            </a>
          ))}
        </div>

        <button
          onClick={() => scroll('right')}
          aria-label="Scroll right"
          className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white shadow-md border border-charcoal/10 items-center justify-center hover:bg-blush transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-charcoal" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </section>
  );
}