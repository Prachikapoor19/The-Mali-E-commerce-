// // 'use client';

// // const occasions = [
// //   {
// //     title: 'Birthday',
// //     label: 'CAKES',
// //     date: null,
// //     bg: 'bg-[#F4EDE1]',
// //     accent: 'text-gold',
// //     img: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=300&h=300&fit=crop',
// //   },
// //   {
// //     title: 'Wife Appreciation Day',
// //     label: null,
// //     date: '20TH SEP',
// //     bg: 'bg-blush',
// //     accent: 'text-rose',
// //     img: 'https://images.unsplash.com/photo-1533616688419-b7a585564566?w=300&h=300&fit=crop',
// //   },
// //   {
// //     title: 'Anniversary',
// //     label: null,
// //     date: null,
// //     bg: 'bg-[#FBE4E7]',
// //     accent: 'text-rose',
// //     img: 'https://images.unsplash.com/photo-1594291975567-6dab42430545?w=300&h=300&fit=crop',
// //   },
// //   {
// //     title: 'Festive Special',
// //     label: 'DECOR AVAILABLE',
// //     date: '14TH-25TH SEP',
// //     bg: 'bg-[#FDF0E3]',
// //     accent: 'text-gold',
// //     img: 'https://images.unsplash.com/photo-1487070183336-b863922373d4?w=300&h=300&fit=crop',
// //   },
// //   {
// //     title: 'Thank You',
// //     label: null,
// //     date: null,
// //     bg: 'bg-[#E7EFE4]',
// //     accent: 'text-botanical',
// //     img: 'https://images.unsplash.com/photo-1470509037663-253afd7f0f51?w=300&h=300&fit=crop',
// //   },
// //   {
// //     title: 'Congratulations',
// //     label: null,
// //     date: null,
// //     bg: 'bg-[#DCE9F5]',
// //     accent: 'text-charcoal/60',
// //     img: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=300&h=300&fit=crop',
// //   },
// // ];

// // export default function OccasionStrip() {
// //   return (
// //     <section className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 py-6">
// //       <h2 className="font-display text-xl md:text-2xl font-semibold text-charcoal mb-4">
// //         Gifts For Every Occasion
// //       </h2>
// //       <div className="flex gap-3 md:gap-4 overflow-x-auto pb-2">
// //         {occasions.map((occ) => (
// //           <a key={occ.title} href="#" className={`relative shrink-0 w-64 md:w-72 h-40 md:h-44 rounded-2xl overflow-hidden ${occ.bg} hover:-translate-y-0.5 transition-transform`}>
// //             {occ.date && (
// //               <span className="absolute top-3 right-3 bg-white/80 text-[10px] font-semibold px-2 py-1 rounded-md text-charcoal/70 z-10">
// //                 {occ.date}
// //               </span>
// //             )}

// //             <div className="relative z-10 p-4 h-full flex flex-col justify-start max-w-[65%]">
// //               <h3 className="font-display text-lg md:text-xl font-semibold text-charcoal leading-tight">
// //                 {occ.title}
// //               </h3>
// //               {occ.label && (
// //                 <span className={`text-[11px] font-semibold mt-1 ${occ.accent}`}>
// //                   {occ.label}
// //                 </span>
// //               )}
// //             </div>

// //             <div className="absolute -bottom-4 -right-4 w-32 h-32 md:w-36 md:h-36 rounded-full overflow-hidden">
// //               <img src={occ.img} alt={occ.title} className="w-full h-full object-cover" />
// //             </div>
// //           </a>
// //         ))}
// //       </div>
// //     </section>
// //   );
// // }


// 'use client';

// import { useRef } from 'react';

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
//   const scrollRef = useRef<HTMLDivElement>(null);

//   const scroll = (direction: 'left' | 'right') => {
//     if (!scrollRef.current) return;
//     const amount = 300;
//     scrollRef.current.scrollBy({
//       left: direction === 'left' ? -amount : amount,
//       behavior: 'smooth',
//     });
//   };

//   return (
//     <section className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 py-6">
//       <h2 className="font-display text-xl md:text-2xl font-semibold text-charcoal mb-4">
//         Gifts For Every Occasion
//       </h2>

//       <div className="relative">
//         <button
//           onClick={() => scroll('left')}
//           aria-label="Scroll left"
//           className="hidden md:flex absolute -left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white shadow-md border border-charcoal/10 items-center justify-center hover:bg-blush transition-colors"
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-charcoal" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//             <polyline points="15 18 9 12 15 6" />
//           </svg>
//         </button>

//         <div ref={scrollRef} className="flex gap-3 md:gap-4 overflow-x-auto pb-2 scroll-smooth">
//           {occasions.map((occ) => (
//             <a key={occ.title} href="#" className={`relative shrink-0 w-64 md:w-72 h-40 md:h-44 rounded-2xl overflow-hidden ${occ.bg} hover:-translate-y-0.5 transition-transform`}>
//               {occ.date && (
//                 <span className="absolute top-3 right-3 bg-white/80 text-[10px] font-semibold px-2 py-1 rounded-md text-charcoal/70 z-10">
//                   {occ.date}
//                 </span>
//               )}

//               <div className="relative z-10 p-4 h-full flex flex-col justify-start max-w-[65%]">
//                 <h3 className="font-display text-lg md:text-xl font-semibold text-charcoal leading-tight">
//                   {occ.title}
//                 </h3>
//                 {occ.label && (
//                   <span className={`text-[11px] font-semibold mt-1 ${occ.accent}`}>
//                     {occ.label}
//                   </span>
//                 )}
//               </div>

//               <div className="absolute -bottom-4 -right-4 w-32 h-32 md:w-36 md:h-36 rounded-full overflow-hidden">
//                 <img src={occ.img} alt={occ.title} className="w-full h-full object-cover" />
//               </div>
//             </a>
//           ))}
//         </div>

//         <button
//           onClick={() => scroll('right')}
//           aria-label="Scroll right"
//           className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white shadow-md border border-charcoal/10 items-center justify-center hover:bg-blush transition-colors"
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-charcoal" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//             <polyline points="9 18 15 12 9 6" />
//           </svg>
//         </button>
//       </div>
//     </section>
//   );
// }

"use client";

import React, { useState, useEffect, useRef } from "react";

// Auto-playing Slides Data for First Box (Birthday / Personalised)
const birthdaySlides = [
  {
    id: "s1",
    title: "Personalised Surprises",
    subTag: "CUSTOM LAMPS & FRAMES",
    badge: "EXPRESS 60-MIN",
    image:
      "https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: "s2",
    title: "Birthday Specials",
    subTag: "BALLOON DECOR & CAKES",
    badge: "MOST POPULAR",
    image:
      "https://images.pexels.com/photos/3735657/pexels-photo-3735657.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: "s3",
    title: "Exotic Roses & Bouquets",
    subTag: "FRESH FLOWER COMBOS",
    badge: "TRENDING NOW",
    image:
      "https://images.pexels.com/photos/56866/rose-rose-blooms-roses-pink-56866.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

// Expanded Occasion Cards List
const allOccasionCards = [
  {
    id: "wife",
    title: "Wife Appreciation Day",
    tag: "20TH SEP",
    image:
      "https://images.pexels.com/photos/56866/rose-rose-blooms-roses-pink-56866.jpeg?auto=compress&cs=tinysrgb&w=500",
    bg: "bg-[#FDE2E4]",
  },
  {
    id: "daughters",
    title: "Daughters' Day",
    tag: "27TH SEP",
    image:
      "https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg?auto=compress&cs=tinysrgb&w=500",
    bg: "bg-[#E2E2F5]",
  },
  {
    id: "ganesh",
    title: "Ganesh Chaturthi",
    tag: "14TH-25TH SEP",
    subTag: "DECOR AVAILABLE",
    image:
      "https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&cs=tinysrgb&w=500",
    bg: "bg-[#FFF3B0]",
  },
  {
    id: "anniversary",
    title: "Anniversary Romance",
    image:
      "https://images.pexels.com/photos/264771/pexels-photo-264771.jpeg?auto=compress&cs=tinysrgb&w=500",
    bg: "bg-[#FFCCD5]",
  },
  {
    id: "congrats",
    title: "Congratulations",
    image:
      "https://images.pexels.com/photos/1194036/pexels-photo-1194036.jpeg?auto=compress&cs=tinysrgb&w=500",
    bg: "bg-[#E0F2FE]",
  },
  {
    id: "thankyou",
    title: "Thank You Surprises",
    image:
      "https://images.pexels.com/photos/1408221/pexels-photo-1408221.jpeg?auto=compress&cs=tinysrgb&w=500",
    bg: "bg-[#EAF0E4]",
  },
  {
    id: "housewarming",
    title: "Housewarming Plants",
    image:
      "https://images.pexels.com/photos/305821/pexels-photo-305821.jpeg?auto=compress&cs=tinysrgb&w=500",
    bg: "bg-[#E8F5E9]",
  },
  {
    id: "love",
    title: "Love & Romance",
    image:
      "https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&cs=tinysrgb&w=500",
    bg: "bg-[#FCE4EC]",
  },
  {
    id: "sorry",
    title: "I Am Sorry Gifts",
    image:
      "https://images.pexels.com/photos/1083822/pexels-photo-1083822.jpeg?auto=compress&cs=tinysrgb&w=500",
    bg: "bg-[#FFF8E1]",
  },
];

export default function OccasionStrip() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Fast Auto-slide Timer (1.2 seconds)
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % birthdaySlides.length);
    }, 1200);

    return () => clearInterval(interval);
  }, [isPaused]);

  // Smooth Scroll Handler for Left/Right Arrows
  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const amount = clientWidth * 0.6;
      scrollRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - amount : scrollLeft + amount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 py-6 relative">
      <h2 className="font-display text-xl sm:text-2xl font-bold text-[#1B3B2B] mb-4">
        Gifts For Every Occasion
      </h2>

      <div className="relative group">
        {/* Permanent Visible Floating Scroll Arrows */}
        <button
          onClick={() => handleScroll("left")}
          className="absolute -left-4 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-white shadow-lg border border-black/10 flex items-center justify-center text-[#1B3B2B] font-bold text-sm hover:scale-110 hover:bg-[#1B3B2B] hover:text-white transition-all"
          aria-label="Scroll Left"
        >
          ❮
        </button>

        {/* Scrollable Cards Container */}
        <div
          ref={scrollRef}
          className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-none snap-x snap-mandatory"
        >
          {/* 1st Card: Fast Motion Auto-Sliding Banner */}
          <div
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="group/first relative w-64 sm:w-72 h-36 rounded-2xl overflow-hidden shrink-0 snap-start shadow-2xs hover:shadow-md transition-all cursor-pointer border border-[#1B3B2B]/10"
          >
            {birthdaySlides.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-400 ease-in-out ${
                  currentSlideIndex === index ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover transform group-hover/first:scale-105 transition-transform duration-500"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                <div className="absolute inset-0 p-4 flex flex-col justify-between text-white z-20">
                  <div className="flex justify-between items-start">
                    <span className="text-[9px] font-extrabold bg-[#1B3B2B]/90 text-white backdrop-blur-xs px-2 py-0.5 rounded-md uppercase tracking-wider border border-white/20">
                      {slide.badge}
                    </span>
                  </div>

                  <div>
                    <span className="text-[9px] font-bold text-amber-300 uppercase tracking-widest block mb-0.5">
                      {slide.subTag}
                    </span>
                    <h3 className="font-display font-bold text-base sm:text-lg leading-tight flex items-center justify-between text-white">
                      <span>{slide.title}</span>
                      <span className="text-xs">❯</span>
                    </h3>
                  </div>
                </div>
              </div>
            ))}

            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-30">
              <div
                className="h-full bg-[#C86D51] transition-all duration-200 ease-linear"
                style={{
                  width: `${((currentSlideIndex + 1) / birthdaySlides.length) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* All Static Cards */}
          {allOccasionCards.map((item) => (
            <a
              key={item.id}
              href="#"
              className={`group/card flex justify-between p-4 rounded-2xl ${item.bg} w-64 sm:w-72 h-36 shrink-0 snap-start shadow-2xs relative overflow-hidden transition-all hover:shadow-md border border-black/5`}
            >
              <div className="flex flex-col justify-between z-10 max-w-[55%]">
                <div>
                  <h3 className="font-display font-bold text-base sm:text-lg text-[#1B3B2B] leading-tight flex items-center gap-1">
                    {item.title} <span className="text-xs">❯</span>
                  </h3>
                  {item.subTag && (
                    <span className="text-[9px] font-bold text-[#1B3B2B]/60 uppercase tracking-wider block mt-1">
                      {item.subTag}
                    </span>
                  )}
                </div>

                {item.tag && (
                  <span className="inline-block self-start text-[9px] font-extrabold bg-white/80 backdrop-blur-xs text-[#1B3B2B] px-2 py-0.5 rounded-md border border-black/5">
                    {item.tag}
                  </span>
                )}
              </div>

              <div className="w-28 h-28 self-end rounded-xl overflow-hidden bg-white/40 p-1">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover rounded-lg group-hover/card:scale-105 transition-transform duration-300"
                />
              </div>
            </a>
          ))}
        </div>

        <button
          onClick={() => handleScroll("right")}
          className="absolute -right-4 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-white shadow-lg border border-black/10 flex items-center justify-center text-[#1B3B2B] font-bold text-sm hover:scale-110 hover:bg-[#1B3B2B] hover:text-white transition-all"
          aria-label="Scroll Right"
        >
          ❯
        </button>
      </div>
    </section>
  );
}