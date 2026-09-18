// "use client";

// import React from "react";

// const recipients = [
//   { label: "Him", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&q=80" },
//   { label: "Her", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&q=80" },
//   { label: "Kids", image: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=300&q=80" },
//   { label: "Friend", image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=300&q=80" },
//   { label: "Wife", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&q=80" },
//   { label: "Husband", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80" },
//   { label: "Grandparents", image: "https://images.pexels.com/photos/1083822/pexels-photo-1083822.jpeg?auto=compress&cs=tinysrgb&w=300" },
// ];

// export default function GiftsForEveryone() {
//   return (
//     <section className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 py-8 relative">
//       {/* Title */}
//       <h2 className="font-display text-xl sm:text-2xl font-bold text-botanical mb-6">
//         Gifts for Everyone
//       </h2>

//       {/* Recipient Cards Horizontal Scroll Container */}
//       <div className="relative group">
        
//         {/* Visual Reference Button Placeholder (Left) */}
//         <button className="absolute left-[-20px] top-1/2 -translate-y-1/2 z-10 p-1.5 bg-white rounded-full shadow-md border border-ivory/80 text-charcoal/60 hidden group-hover:block transition-all hover:bg-ivory">
//           <span className="text-xl">&lt;</span>
//         </button>

//         {/* Scrollable Container */}
//         <div className="flex items-center gap-4 overflow-x-auto pb-4 scrollbar-none scroll-smooth">
//           {recipients.map((item) => (
//             <a
//               key={item.label}
//               href="#"
//               className="group flex flex-col items-center shrink-0 w-36 sm:w-40"
//             >
//               {/* Soft Pink Tint Illustration Container */}
//               <div className="w-full h-28 rounded-2xl bg-gradient-to-br from-[#FFF0F3] to-[#FCEEEF] border border-[#FAD7DA]/60 p-2 overflow-hidden flex items-end justify-center relative shadow-2xs transition-all">
//                 <img
//                   src={item.image}
//                   alt={item.label}
//                   className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
//                 />
//               </div>

//               {/* Label Below Card */}
//               <span className="text-xs font-medium text-botanical mt-2 group-hover:text-rose transition-colors">
//                 {item.label}
//               </span>
//             </a>
//           ))}
//         </div>

//         {/* Visual Reference Button Placeholder (Right) */}
//         <button className="absolute right-[-20px] top-1/2 -translate-y-1/2 z-10 p-1.5 bg-white rounded-full shadow-md border border-ivory/80 text-charcoal/60 hidden group-hover:block transition-all hover:bg-ivory">
//           <span className="text-xl">&gt;</span>
//         </button>
//       </div>
//     </section>
//   );
// }

"use client";

import React, { useRef } from "react";

const recipients = [
  { label: "Him", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80" },
  { label: "Her", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&q=80" },
  { label: "Kids", image: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=400&q=80" },
  { label: "Friend", image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&q=80" },
  { label: "Wife", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80" },
  { label: "Husband", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80" },
  { label: "Parents", image: "https://images.pexels.com/photos/264771/pexels-photo-264771.jpeg?auto=compress&cs=tinysrgb&w=400" },
];

export default function GiftsForEveryone() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.6;
      scrollRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 py-8">
      {/* Title */}
      <h2 className="font-display text-xl sm:text-2xl font-bold text-botanical mb-6">
        Gifts for Everyone
      </h2>

      {/* Responsive Grid/Carousel Wrapper */}
      <div className="relative group">
        {/* Left Arrow Button */}
        <button
          onClick={() => scroll("left")}
          className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-white/90 backdrop-blur-xs rounded-full shadow-md border border-rose-light/30 flex items-center justify-center text-botanical hover:bg-white hover:scale-110 transition-all opacity-0 group-hover:opacity-100"
          aria-label="Scroll Left"
        >
          &lt;
        </button>

        {/* Responsive Grid on Desktop & Horizontal Swipe on Mobile */}
        <div
          ref={scrollRef}
          className="grid grid-flow-col auto-cols-[minmax(140px,1fr)] sm:auto-cols-[minmax(160px,1fr)] md:grid-cols-7 gap-4 overflow-x-auto md:overflow-visible pb-4 md:pb-0 scrollbar-none snap-x snap-mandatory"
        >
          {recipients.map((item) => (
            <a
              key={item.label}
              href="#"
              className="group/card flex flex-col items-center w-full snap-start"
            >
              {/* Card Frame with Soft Pink/Peach Backdrop */}
              <div className="w-full aspect-[4/3] rounded-2xl bg-gradient-to-br from-[#FFF0F3] via-[#FCEEEF] to-[#FAD7DA]/40 border border-[#FAD7DA]/60 p-2 overflow-hidden flex items-end justify-center shadow-2xs group-hover/card:shadow-md transition-all">
                <img
                  src={item.image}
                  alt={item.label}
                  className="w-full h-full object-cover rounded-xl group-hover/card:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Label Below Card */}
              <span className="text-xs sm:text-sm font-medium text-botanical mt-2.5 group-hover/card:text-rose transition-colors text-center">
                {item.label}
              </span>
            </a>
          ))}
        </div>

        {/* Right Arrow Button */}
        <button
          onClick={() => scroll("right")}
          className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-white/90 backdrop-blur-xs rounded-full shadow-md border border-rose-light/30 flex items-center justify-center text-botanical hover:bg-white hover:scale-110 transition-all opacity-0 group-hover:opacity-100"
          aria-label="Scroll Right"
        >
          &gt;
        </button>
      </div>
    </section>
  );
}