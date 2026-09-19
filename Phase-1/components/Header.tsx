// "use client";

// import React, { useState } from "react";

// export default function Header() {
//   const [isPincodeModalOpen, setIsPincodeModalOpen] = useState(false);
//   const [isGiftFinderOpen, setIsGiftFinderOpen] = useState(false);
//   const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
//   const [pincode, setPincode] = useState("226001");
//   const [selectedSlot, setSelectedSlot] = useState("Express 60-Minute");
//   const [pincodeInput, setPincodeInput] = useState("226001");

//   const deliverySlots = [
//     { id: "express", name: "Express 60-Minute", time: "Delivered within 1 hour", tag: "Fastest" },
//     { id: "sameday", name: "Same-Day Delivery", time: "Standard Delivery Today", tag: "Popular" },
//     { id: "fixed", name: "Fixed Time Delivery", time: "Choose your preferred 2-hr slot", tag: "Scheduled" },
//     { id: "midnight", name: "Midnight Delivery Slot", time: "11:00 PM – 11:59 PM", tag: "Surprise" },
//   ];

//   return (
//     <>
//       {/* Sticky Header Wrapper with Solid Background & High Z-Index */}
//       <header className="sticky top-0 z-50 w-full bg-[#FAF8F5] border-b border-rose-light/20 shadow-xs">
//         {/* Top Announcement Bar */}
//         <div className="bg-botanical text-ivory text-[11px] py-1.5 px-4 text-center font-medium tracking-wide flex justify-between items-center">
//           <span className="truncate">🌿 Free Express Delivery on Orders Above ₹999 | Code: <strong>MALI15</strong></span>
//           <span className="hidden md:inline text-[10px] text-ivory/80">📞 24/7 Gifting Help: +91 1800-MALI-CARE</span>
//         </div>

//         {/* Main Nav Bar */}
//         <div className="w-full px-3 sm:px-6 lg:px-10 py-2.5 flex items-center justify-between gap-2 sm:gap-4 bg-[#FAF8F5]">
//           {/* Logo */}
//           <a href="/" className="flex items-center gap-2 shrink-0">
//             <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-botanical text-ivory flex items-center justify-center font-bold text-lg shadow-xs">
//               🌱
//             </div>
//             <div>
//               <span className="font-display text-base sm:text-xl font-bold tracking-tight text-botanical leading-tight block">
//                 The Mali
//               </span>
//               <span className="text-[9px] text-charcoal/50 uppercase tracking-widest block font-medium">
//                 Botanical & Gifts
//               </span>
//             </div>
//           </a>

//           {/* Location Pincode Button */}
//           <button
//             onClick={() => setIsPincodeModalOpen(true)}
//             className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-rose-light/30 text-xs font-medium text-botanical hover:border-botanical transition-all shadow-2xs shrink-0"
//           >
//             <span className="text-rose text-sm">📍</span>
//             <div className="text-left leading-tight hidden sm:block">
//               <span className="text-[10px] text-charcoal/60 block">Deliver to</span>
//               <strong className="text-xs font-bold text-botanical">{pincode} • {selectedSlot.split(" ")[0]}</strong>
//             </div>
//             <span className="sm:hidden text-xs font-bold">{pincode}</span>
//             <span className="text-[9px] text-charcoal/40">▼</span>
//           </button>

//           {/* Search Bar */}
//           <div className="hidden md:flex flex-1 max-w-md relative">
//             <input
//               type="text"
//               placeholder="Search flowers, cakes, plants, personalized gifts..."
//               className="w-full py-2 pl-9 pr-4 text-xs rounded-full bg-white border border-rose-light/40 focus:outline-none focus:border-botanical text-charcoal placeholder:text-charcoal/40 shadow-2xs"
//             />
//             <span className="absolute left-3 top-2.5 text-xs text-charcoal/40">🔍</span>
//           </div>

//           {/* Actions */}
//           <div className="flex items-center gap-2 sm:gap-4 text-botanical shrink-0">
//             <button
//               onClick={() => setIsGiftFinderOpen(true)}
//               className="hidden lg:flex items-center gap-1 px-3 py-1.5 bg-[#FFF0F3] border border-[#FAD7DA] rounded-full text-xs font-bold text-rose hover:bg-rose hover:text-white transition-all shadow-2xs"
//             >
//               <span>✨</span>
//               <span>Gift Finder</span>
//             </button>

//             <button className="p-1.5 rounded-full hover:bg-blush transition-colors relative" title="Wishlist">
//               <span className="text-lg">🤍</span>
//             </button>

//             <button
//               onClick={() => setIsAuthModalOpen(true)}
//               className="flex items-center gap-1 text-xs font-semibold hover:text-rose transition-colors"
//             >
//               <span className="text-base">👤</span>
//               <span className="hidden sm:inline">Login / Register</span>
//             </button>

//             <button className="relative flex items-center gap-1.5 px-3 py-1.5 bg-botanical text-ivory rounded-full text-xs font-semibold hover:bg-botanical-light transition-all shadow-xs">
//               <span className="text-sm">🛒</span>
//               <span className="hidden sm:inline">Cart</span>
//               <span className="bg-rose text-ivory text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
//                 0
//               </span>
//             </button>
//           </div>
//         </div>

//         {/* Mobile Search Row */}
//         <div className="md:hidden px-3 pb-2.5 pt-0 bg-[#FAF8F5]">
//           <div className="relative w-full">
//             <input
//               type="text"
//               placeholder="Search flowers, cakes, gifts..."
//               className="w-full py-1.5 pl-8 pr-3 text-xs rounded-full bg-white border border-rose-light/40 focus:outline-none focus:border-botanical text-charcoal placeholder:text-charcoal/40 shadow-2xs"
//             />
//             <span className="absolute left-2.5 top-2 text-xs text-charcoal/40">🔍</span>
//           </div>
//         </div>
//       </header>

//       {/* MODALS */}
//       {isPincodeModalOpen && (
//         <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
//           <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative border border-rose-light/30">
//             <button onClick={() => setIsPincodeModalOpen(false)} className="absolute top-4 right-4 text-charcoal">✕</button>
//             <h3 className="font-display font-bold text-lg text-botanical mb-2">Select Delivery Location</h3>
//             <input
//               type="text"
//               value={pincodeInput}
//               onChange={(e) => setPincodeInput(e.target.value)}
//               className="w-full text-xs p-3 rounded-xl border border-rose-light/40 mb-3"
//             />
//             <button
//               onClick={() => { setPincode(pincodeInput); setIsPincodeModalOpen(false); }}
//               className="w-full py-3 bg-botanical text-ivory text-xs font-bold rounded-xl"
//             >
//               Confirm
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

"use client";

import React, { useState } from "react";

export default function Header() {
  const [isPincodeModalOpen, setIsPincodeModalOpen] = useState(false);
  const [isGiftFinderOpen, setIsGiftFinderOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [pincode, setPincode] = useState("226001");
  const [selectedSlot, setSelectedSlot] = useState("Express 60-Minute");
  const [pincodeInput, setPincodeInput] = useState("226001");

  return (
    <>
      {/* Google Font Link for Luxury Serif Typography */}
      <link
        href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap"
        rel="stylesheet"
      />

      {/* Sticky Header Wrapper */}
      <header className="sticky top-0 z-50 w-full bg-[#FAF8F5] border-b border-[#1B3B2B]/10 shadow-xs">
        {/* Top Announcement Bar */}
        <div className="bg-[#1B3B2B] text-[#FAF8F5] text-[11px] py-1.5 px-4 text-center font-medium tracking-wide flex justify-between items-center">
          <span className="truncate">🌿 Free Express Delivery on Orders Above ₹999 | Code: <strong>MALI15</strong></span>
          <span className="hidden md:inline text-[10px] text-[#FAF8F5]/80">📞 24/7 Gifting Help: +91 1800-MALI-CARE</span>
        </div>

        {/* Main Nav Bar */}
        <div className="w-full px-3 sm:px-6 lg:px-10 py-2.5 flex items-center justify-between gap-2 sm:gap-4 bg-[#FAF8F5]">
          {/* Logo & Custom Luxury Typography Matching Your Design */}
          <a href="/" className="flex items-center gap-3 shrink-0 py-1 group">
            <img
              src="/logo.png"
              alt="The Mali Logo"
              className="h-11 sm:h-13 md:h-14 w-auto object-contain transition-transform group-hover:scale-105"
            />
            <div className="hidden sm:block border-l-2 border-[#1B3B2B]/15 pl-3">
              {/* Brand Title in Elegant Serif Font */}
              <span
                style={{ fontFamily: "'Cinzel', 'Playfair Display', serif" }}
                className="font-bold text-xl sm:text-2xl md:text-3xl tracking-[0.25em] text-[#1B3B2B] uppercase leading-none block"
              >
                THE MALI
              </span>
              {/* Luxury Subtitle Line */}
              <span
                style={{ fontFamily: "'Cinzel', serif" }}
                className="text-[7.5px] sm:text-[9px] text-[#8C6D3B] uppercase tracking-[0.22em] block font-semibold mt-1.5 leading-tight"
              >
                WE DELIVER YOU LUXURY. WE EMBELLISH YOUR JUBILANT.
              </span>
            </div>
          </a>

          {/* Location Pincode Button */}
          <button
            onClick={() => setIsPincodeModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#1B3B2B]/15 text-xs font-medium text-[#1B3B2B] hover:border-[#1B3B2B] transition-all shadow-2xs shrink-0"
          >
            <span className="text-[#C86D51] text-sm">📍</span>
            <div className="text-left leading-tight hidden sm:block">
              <span className="text-[10px] text-charcoal/60 block">Deliver to</span>
              <strong className="text-xs font-bold text-[#1B3B2B]">{pincode} • {selectedSlot.split(" ")[0]}</strong>
            </div>
            <span className="sm:hidden text-xs font-bold">{pincode}</span>
            <span className="text-[9px] text-charcoal/40">▼</span>
          </button>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md relative">
            <input
              type="text"
              placeholder="Search flowers, cakes, plants, personalized gifts..."
              className="w-full py-2 pl-9 pr-4 text-xs rounded-full bg-white border border-[#1B3B2B]/20 focus:outline-none focus:border-[#1B3B2B] text-charcoal placeholder:text-charcoal/40 shadow-2xs"
            />
            <span className="absolute left-3 top-2.5 text-xs text-charcoal/40">🔍</span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-4 text-[#1B3B2B] shrink-0">
            <button
              onClick={() => setIsGiftFinderOpen(true)}
              className="hidden lg:flex items-center gap-1 px-3 py-1.5 bg-[#FFF0F3] border border-[#FAD7DA] rounded-full text-xs font-bold text-[#C86D51] hover:bg-[#C86D51] hover:text-white transition-all shadow-2xs"
            >
              <span>✨</span>
              <span>Gift Finder</span>
            </button>

            <button className="p-1.5 rounded-full hover:bg-blush transition-colors relative" title="Wishlist">
              <span className="text-lg">🤍</span>
            </button>

            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="flex items-center gap-1 text-xs font-semibold hover:text-[#C86D51] transition-colors"
            >
              <span className="text-base">👤</span>
              <span className="hidden sm:inline">Login / Register</span>
            </button>

            <button className="relative flex items-center gap-1.5 px-3 py-1.5 bg-[#1B3B2B] text-[#FAF8F5] rounded-full text-xs font-semibold hover:bg-emerald-900 transition-all shadow-xs">
              <span className="text-sm">🛒</span>
              <span className="hidden sm:inline">Cart</span>
              <span className="bg-[#C86D51] text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                0
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Search Row */}
        <div className="md:hidden px-3 pb-2.5 pt-0 bg-[#FAF8F5]">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search flowers, cakes, gifts..."
              className="w-full py-1.5 pl-8 pr-3 text-xs rounded-full bg-white border border-[#1B3B2B]/20 focus:outline-none focus:border-[#1B3B2B] text-charcoal placeholder:text-charcoal/40 shadow-2xs"
            />
            <span className="absolute left-2.5 top-2 text-xs text-charcoal/40">🔍</span>
          </div>
        </div>
      </header>

      {/* MODALS */}
      {isPincodeModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative border border-[#1B3B2B]/20">
            <button onClick={() => setIsPincodeModalOpen(false)} className="absolute top-4 right-4 text-charcoal">✕</button>
            <h3 className="font-serif font-bold text-lg text-[#1B3B2B] mb-2">Select Delivery Location</h3>
            <input
              type="text"
              value={pincodeInput}
              onChange={(e) => setPincodeInput(e.target.value)}
              className="w-full text-xs p-3 rounded-xl border border-[#1B3B2B]/20 mb-3"
            />
            <button
              onClick={() => { setPincode(pincodeInput); setIsPincodeModalOpen(false); }}
              className="w-full py-3 bg-[#1B3B2B] text-white text-xs font-bold rounded-xl"
            >
              Confirm
            </button>
          </div>
        </div>
      )}
    </>
  );
}