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
//       <header className="sticky top-0 z-50 w-full bg-ivory border-b border-rose-light/20 shadow-xs">
//         {/* Top Announcement Bar */}
//         <div className="bg-botanical text-ivory text-[11px] py-1.5 px-4 text-center font-medium tracking-wide flex justify-between items-center">
//           <span className="truncate">🌿 Free Express Delivery on Orders Above ₹999 | Code: <strong>MALI15</strong></span>
//           <span className="hidden md:inline text-[10px] text-ivory/80">📞 24/7 Gifting Help: +91 1800-MALI-CARE</span>
//         </div>

//         {/* Main Nav Bar */}
//         <div className="w-full px-3 sm:px-6 lg:px-10 py-2.5 flex items-center justify-between gap-2 sm:gap-4 bg-ivory">
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
//             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-4 h-4 text-rose"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
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
//             <span className="absolute left-3 top-2.5 text-xs text-charcoal/40"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-3.5 h-3.5"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg></span>
//           </div>

//           {/* Actions */}
//           <div className="flex items-center gap-2 sm:gap-4 text-botanical shrink-0">
//             <button
//               onClick={() => setIsGiftFinderOpen(true)}
//               className="hidden lg:flex items-center gap-1 px-3 py-1.5 bg-petal border border-petal-dark rounded-full text-xs font-bold text-rose hover:bg-rose hover:text-white transition-all shadow-2xs"
//             >
//               <span>✨</span>
//               <span>Gift Finder</span>
//             </button>

//             <button className="p-1.5 rounded-full hover:bg-blush transition-colors relative" title="Wishlist">
//               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-5 h-5"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>
//             </button>

//             <button
//               onClick={() => setIsAuthModalOpen(true)}
//               className="flex items-center gap-1 text-xs font-semibold hover:text-rose transition-colors"
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-5 h-5"><circle cx="12" cy="8" r="4" /><path d="M20 21a8 8 0 0 0-16 0" /></svg>
//               <span className="hidden sm:inline">Login / Register</span>
//             </button>

//             <button className="relative flex items-center gap-1.5 px-3 py-1.5 bg-botanical text-ivory rounded-full text-xs font-semibold hover:bg-botanical-light transition-all shadow-xs">
//               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-4 h-4"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
//               <span className="hidden sm:inline">Cart</span>
//               <span className="bg-rose text-ivory text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
//                 0
//               </span>
//             </button>
//           </div>
//         </div>

//         {/* Mobile Search Row */}
//         <div className="md:hidden px-3 pb-2.5 pt-0 bg-ivory">
//           <div className="relative w-full">
//             <input
//               type="text"
//               placeholder="Search flowers, cakes, gifts..."
//               className="w-full py-1.5 pl-8 pr-3 text-xs rounded-full bg-white border border-rose-light/40 focus:outline-none focus:border-botanical text-charcoal placeholder:text-charcoal/40 shadow-2xs"
//             />
//             <span className="absolute left-2.5 top-2 text-xs text-charcoal/40"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-3.5 h-3.5"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg></span>
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

// "use client";

// import React, { useState } from "react";
// import { useCart } from "./CartContext";
// import { useRouter } from "next/navigation";

// export default function Header() {
//   const [isPincodeModalOpen, setIsPincodeModalOpen] = useState(false);
//   const [isGiftFinderOpen, setIsGiftFinderOpen] = useState(false);
//   const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
//     const [authTab, setAuthTab] = useState<"login" | "register">("login");
//   const [pincode, setPincode] = useState("226001");
//   const { itemCount, openCart } = useCart();
//     const router = useRouter();
//     const [searchQuery, setSearchQuery] = useState("");
//   const [selectedSlot, setSelectedSlot] = useState("Express 60-Minute");
//   const [pincodeInput, setPincodeInput] = useState("226001");

//   return (
//     <>
//       {/* Google Font Link for Luxury Serif Typography */}
//       <link
//         href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap"
//         rel="stylesheet"
//       />

//       {/* Sticky Header Wrapper */}
//       <header className="sticky top-0 z-50 w-full bg-ivory border-b border-botanical/10 shadow-xs">
//         {/* Top Announcement Bar */}
//         <div className="bg-botanical text-ivory text-[11px] py-1.5 px-4 text-center font-medium tracking-wide flex justify-between items-center">
//           <span className="truncate">🌿 Free Express Delivery on Orders Above ₹999 | Code: <strong>MALI15</strong></span>
//           <span className="hidden md:inline text-[10px] text-ivory/80">📞 24/7 Gifting Help: +91 1800-MALI-CARE</span>
//         </div>

//         {/* Main Nav Bar */}
//         <div className="w-full px-3 sm:px-6 lg:px-10 py-2.5 flex items-center justify-between gap-2 sm:gap-4 bg-ivory">
//           {/* Logo & Custom Luxury Typography Matching Your Design */}
//           <a href="/" className="flex items-center gap-3 shrink-0 py-1 group">
//             <img
//               src="/logo.png"
//               alt="The Mali Logo"
//               className="h-11 sm:h-13 md:h-14 w-auto object-contain transition-transform group-hover:scale-105"
//             />
//             <div className="hidden sm:block border-l-2 border-botanical/15 pl-3">
//               {/* Brand Title in Elegant Serif Font */}
//               <span
//                 style={{ fontFamily: "'Cinzel', 'Playfair Display', serif" }}
//                 className="font-bold text-xl sm:text-2xl md:text-3xl tracking-[0.25em] text-botanical uppercase leading-none block"
//               >
//                 THE MALI
//               </span>
//               {/* Luxury Subtitle Line */}
//               <span
//                 style={{ fontFamily: "'Cinzel', serif" }}
//                 className="text-[7.5px] sm:text-[9px] text-gold-dark uppercase tracking-[0.22em] block font-semibold mt-1.5 leading-tight"
//               >
//                 WE DELIVER YOU LUXURY. WE EMBELLISH YOUR JUBILANT.
//               </span>
//             </div>
//           </a>

//           {/* Location Pincode Button */}
//           <button
//             onClick={() => setIsPincodeModalOpen(true)}
//             className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-botanical/15 text-xs font-medium text-botanical hover:border-botanical transition-all shadow-2xs shrink-0"
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-4 h-4 text-rose"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
//             <div className="text-left leading-tight hidden sm:block">
//               <span className="text-[10px] text-charcoal/60 block">Deliver to</span>
//               <strong className="text-xs font-bold text-botanical">{pincode} • {selectedSlot.split(" ")[0]}</strong>
//             </div>
//             <span className="sm:hidden text-xs font-bold">{pincode}</span>
//             <span className="text-[9px] text-charcoal/40">▼</span>
//           </button>


//                     {/* Search Bar */}
//           <div className="hidden md:flex flex-1 max-w-md relative">
//             <input
//               type="text"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               onKeyDown={(e) => {
//                 if (e.key === "Enter" && searchQuery.trim()) {
//                   router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
//                 }
//               }}
//               placeholder="Search flowers, cakes, plants, personalized gifts..."
//               className="w-full py-2 pl-9 pr-4 text-xs rounded-full bg-white border border-botanical/20 focus:outline-none focus:border-botanical text-charcoal placeholder:text-charcoal/40 shadow-2xs"
//             />
//             <button
//               onClick={() => searchQuery.trim() && router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)}
//               className="absolute left-3 top-2.5 text-xs text-charcoal/40"
//               aria-label="Search"
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-3.5 h-3.5"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
//             </button>
//           </div>



//           {/* Actions */}
//           <div className="flex items-center gap-2 sm:gap-4 text-botanical shrink-0">
//             <button
//               onClick={() => setIsGiftFinderOpen(true)}
//               className="hidden lg:flex items-center gap-1 px-3 py-1.5 bg-petal border border-petal-dark rounded-full text-xs font-bold text-rose hover:bg-rose hover:text-white transition-all shadow-2xs"
//             >
//               <span>✨</span>
//               <span>Gift Finder</span>
//             </button>

//             <button className="p-1.5 rounded-full hover:bg-blush transition-colors relative" title="Wishlist">
//               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-5 h-5"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>
//             </button>

//             <button
//               onClick={() => setIsAuthModalOpen(true)}
//               className="flex items-center gap-1 text-xs font-semibold hover:text-rose transition-colors"
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-5 h-5"><circle cx="12" cy="8" r="4" /><path d="M20 21a8 8 0 0 0-16 0" /></svg>
//               <span className="hidden sm:inline">Login / Register</span>
//             </button>

//             <button
//               onClick={openCart}
//               className="relative flex items-center gap-1.5 px-3 py-1.5 bg-botanical text-ivory rounded-full text-xs font-semibold hover:bg-botanical-light transition-all shadow-xs"
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-4 h-4"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
//               <span className="hidden sm:inline">Cart</span>
//               <span className="bg-rose text-ivory text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
//                 {itemCount}
//               </span>
//             </button>
//           </div>
//         </div>

//         {/* Mobile Search Row */}
//         <div className="md:hidden px-3 pb-2.5 pt-0 bg-ivory">
//           <div className="relative w-full">
//             <input
//               type="text"
//               placeholder="Search flowers, cakes, gifts..."
//               className="w-full py-1.5 pl-8 pr-3 text-xs rounded-full bg-white border border-botanical/20 focus:outline-none focus:border-botanical text-charcoal placeholder:text-charcoal/40 shadow-2xs"
//             />
//             <span className="absolute left-2.5 top-2 text-xs text-charcoal/40"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-3.5 h-3.5"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg></span>
//           </div>
//         </div>
//       </header>

//       {/* MODALS */}
//       {isPincodeModalOpen && (
//         <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
//           <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative border border-botanical/20">
//             <button onClick={() => setIsPincodeModalOpen(false)} className="absolute top-4 right-4 text-charcoal">✕</button>
//             <h3 className="font-serif font-bold text-lg text-botanical mb-2">Select Delivery Location</h3>
//             <input
//               type="text"
//               value={pincodeInput}
//               onChange={(e) => setPincodeInput(e.target.value)}
//               className="w-full text-xs p-3 rounded-xl border border-botanical/20 mb-3"
//             />
//             <button
//               onClick={() => { setPincode(pincodeInput); setIsPincodeModalOpen(false); }}
//               className="w-full py-3 bg-botanical text-white text-xs font-bold rounded-xl"
//             >
//               Confirm
//             </button>
//           </div>
//         </div>
//       )}
//             {isAuthModalOpen && (
//         <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
//           <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl relative border border-botanical/20">
//             <button onClick={() => setIsAuthModalOpen(false)} className="absolute top-4 right-4 text-charcoal">✕</button>

//             <div className="flex gap-4 mb-5 border-b border-botanical/10">
//               <button
//                 onClick={() => setAuthTab("login")}
//                 className={`pb-2 text-sm font-bold ${authTab === "login" ? "text-botanical border-b-2 border-botanical" : "text-charcoal/40"}`}
//               >
//                 Login
//               </button>
//               <button
//                 onClick={() => setAuthTab("register")}
//                 className={`pb-2 text-sm font-bold ${authTab === "register" ? "text-botanical border-b-2 border-botanical" : "text-charcoal/40"}`}
//               >
//                 Register
//               </button>
//             </div>

//             {authTab === "register" && (
//               <input type="text" placeholder="Full Name" className="w-full text-xs p-3 rounded-xl border border-botanical/20 mb-3" />
//             )}
//             <input type="tel" placeholder="Mobile Number" className="w-full text-xs p-3 rounded-xl border border-botanical/20 mb-3" />
//             {authTab === "register" && (
//               <input type="email" placeholder="Email (optional)" className="w-full text-xs p-3 rounded-xl border border-botanical/20 mb-3" />
//             )}

//             <button
//               onClick={() => setIsAuthModalOpen(false)}
//               className="w-full py-3 bg-botanical text-white text-xs font-bold rounded-xl"
//             >
//               {authTab === "login" ? "Send OTP" : "Create Account"}
//             </button>

//             <p className="text-[10px] text-charcoal/40 text-center mt-3">
//               By continuing, you agree to The Mali&apos;s Terms &amp; Privacy Policy.
//             </p>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }


"use client";

import React, { useState } from "react";
import { Cinzel } from "next/font/google";
import { useRouter } from "next/navigation";
import { useCart } from "./CartContext";
import { useWishlist } from "./WishlistContext";
import SearchSuggestions from "./SearchSuggestions";

// Logo font loaded the Next.js way (no <link> tag, no layout shift)
const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const DELIVERY_SLOTS = [
  { id: "express", name: "Express 60-Minute", short: "Express", time: "Delivered within 1 hour", tag: "Fastest" },
  { id: "sameday", name: "Same-Day Delivery", short: "Same-Day", time: "Standard delivery today", tag: "Popular" },
  { id: "fixed", name: "Fixed Time Delivery", short: "Fixed Time", time: "Choose your preferred 2-hr slot", tag: "Scheduled" },
  { id: "midnight", name: "Midnight Delivery", short: "Midnight", time: "11:00 PM – 11:59 PM", tag: "Surprise" },
];

export default function Header() {
  const router = useRouter();
  const { itemCount, openCart } = useCart();
  const { count: wishlistCount } = useWishlist();

  // Search (shared by desktop + mobile inputs)
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const runSearch = () => {
    const q = searchQuery.trim();
    if (q) {
      setSearchFocused(false);
      router.push(`/search?q=${encodeURIComponent(q)}`);
    }
  };

  // Pincode + delivery slot
  const [isPincodeModalOpen, setIsPincodeModalOpen] = useState(false);
  const [pincode, setPincode] = useState("226001");
  const [pincodeInput, setPincodeInput] = useState("226001");
  const [slotId, setSlotId] = useState("express");
  const [slotInput, setSlotInput] = useState("express");
  const [pincodeError, setPincodeError] = useState("");
  const selectedSlot = DELIVERY_SLOTS.find((s) => s.id === slotId) ?? DELIVERY_SLOTS[0];

  const openPincodeModal = () => {
    setPincodeInput(pincode);
    setSlotInput(slotId);
    setPincodeError("");
    setIsPincodeModalOpen(true);
  };

  const confirmPincode = () => {
    if (!/^\d{6}$/.test(pincodeInput)) {
      setPincodeError("Please enter a valid 6-digit pincode.");
      return;
    }
    setPincode(pincodeInput);
    setSlotId(slotInput);
    setIsPincodeModalOpen(false);
  };

  // Auth
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authTab, setAuthTab] = useState<"login" | "register">("login");
  const [authPhone, setAuthPhone] = useState("");
  const [authError, setAuthError] = useState("");
  const [authDone, setAuthDone] = useState(false);

  const openAuth = () => {
    setAuthError("");
    setAuthDone(false);
    setIsAuthModalOpen(true);
  };

  // Accounts need a backend (OTP SMS). Until then, be honest and point to guest checkout.
  const submitAuth = () => {
    if (!/^[6-9]\d{9}$/.test(authPhone)) {
      setAuthError("Please enter a valid 10-digit mobile number.");
      return;
    }
    setAuthError("");
    setAuthDone(true);
  };

  // Gift Finder → smooth-scroll to the Gift Finder section on the homepage
  const goToGiftFinder = () => {
    const el = document.getElementById("gift-finder");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      router.push("/#gift-finder");
    }
  };

  return (
    <>
      {/* Sticky Header Wrapper */}
      <header className="sticky top-0 z-50 w-full bg-ivory border-b border-botanical/10 shadow-xs">
        {/* Top Announcement Bar */}
        <div className="bg-botanical text-ivory text-[11px] py-1.5 px-4 text-center font-medium tracking-wide flex justify-between items-center">
          <span className="truncate">
            🌿 Free Express Delivery on Orders Above ₹999 | Code: <strong>MALI15</strong>
          </span>
          <span className="hidden md:inline text-[10px] text-ivory/80">📞 24/7 Gifting Help: +91 1800-MALI-CARE</span>
        </div>

        {/* Main Nav Bar */}
        <div className="w-full px-3 sm:px-6 lg:px-10 py-2.5 flex items-center justify-between gap-2 sm:gap-4 bg-ivory">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3 shrink-0 py-1 group">
            <img
              src="/logo.png"
              alt="The Mali Logo"
              className="h-11 sm:h-13 md:h-14 w-auto object-contain transition-transform group-hover:scale-105"
            />
            <div className={`hidden sm:block border-l-2 border-botanical/15 pl-3 ${cinzel.className}`}>
              <span className="font-bold text-xl sm:text-2xl md:text-3xl tracking-[0.25em] text-botanical uppercase leading-none block">
                THE MALI
              </span>
              <span className="text-[7.5px] sm:text-[9px] text-gold-dark uppercase tracking-[0.22em] block font-semibold mt-1.5 leading-tight">
                WE DELIVER YOU LUXURY. WE EMBELLISH YOUR JUBILANT.
              </span>
            </div>
          </a>

          {/* Location Pincode Button */}
          <button
            onClick={openPincodeModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-botanical/15 text-xs font-medium text-botanical hover:border-botanical transition-all shadow-2xs shrink-0"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-4 h-4 text-rose"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
            <div className="text-left leading-tight hidden sm:block">
              <span className="text-[10px] text-charcoal/60 block">Deliver to</span>
              <strong className="text-xs font-bold text-botanical">
                {pincode} • {selectedSlot.short}
              </strong>
            </div>
            <span className="sm:hidden text-xs font-bold">{pincode}</span>
            <span className="text-[9px] text-charcoal/40">▼</span>
          </button>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") runSearch();
                if (e.key === "Escape") setSearchFocused(false);
              }}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              placeholder="Search flowers, cakes, plants, personalized gifts..."
              aria-label="Search products"
              className="w-full py-2 pl-9 pr-4 text-xs rounded-full bg-white border border-botanical/20 focus:outline-none focus:border-botanical text-charcoal placeholder:text-charcoal/40 shadow-2xs"
            />
            <button onClick={runSearch} className="absolute left-3 top-2.5 text-xs text-charcoal/40" aria-label="Search">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-3.5 h-3.5"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
            </button>
            {searchFocused && <SearchSuggestions query={searchQuery} onPick={() => setSearchFocused(false)} />}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-4 text-botanical shrink-0">
            <button
              onClick={goToGiftFinder}
              className="hidden lg:flex items-center gap-1 px-3 py-1.5 bg-blush border border-rose-light rounded-full text-xs font-bold text-rose hover:bg-rose hover:text-ivory hover:border-rose transition-all shadow-2xs"
            >
              <span>✨</span>
              <span>Gift Finder</span>
            </button>

            <a href="/wishlist" className="p-1.5 rounded-full hover:bg-blush transition-colors relative" title="Wishlist" aria-label={`Wishlist (${wishlistCount})`}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-5 h-5"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-rose text-ivory text-[9px] font-bold rounded-full h-4 min-w-4 px-1 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </a>

            <button
              onClick={openAuth}
              className="flex items-center gap-1 text-xs font-semibold hover:text-rose transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-5 h-5"><circle cx="12" cy="8" r="4" /><path d="M20 21a8 8 0 0 0-16 0" /></svg>
              <span className="hidden sm:inline">Login / Register</span>
            </button>

            <button
              onClick={openCart}
              className="relative flex items-center gap-1.5 px-3 py-1.5 bg-botanical text-ivory rounded-full text-xs font-semibold hover:bg-botanical-light transition-all shadow-xs"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-4 h-4"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
              <span className="hidden sm:inline">Cart</span>
              <span className="bg-rose text-ivory text-[10px] font-bold rounded-full h-4 min-w-4 px-1 flex items-center justify-center">
                {itemCount}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Search Row */}
        <div className="md:hidden px-3 pb-2.5 pt-0 bg-ivory">
          <div className="relative w-full">
            <input
              type="search"
              enterKeyHint="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") runSearch();
                if (e.key === "Escape") setSearchFocused(false);
              }}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              placeholder="Search flowers, cakes, gifts..."
              className="w-full py-1.5 pl-8 pr-3 text-xs rounded-full bg-white border border-botanical/20 focus:outline-none focus:border-botanical text-charcoal placeholder:text-charcoal/40 shadow-2xs"
            />
            <button onClick={runSearch} className="absolute left-2.5 top-2 text-xs text-charcoal/40" aria-label="Search">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-3.5 h-3.5"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
            </button>
            {searchFocused && <SearchSuggestions query={searchQuery} onPick={() => setSearchFocused(false)} />}
          </div>
        </div>
      </header>

      {/* PINCODE + DELIVERY SLOT MODAL */}
      {isPincodeModalOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setIsPincodeModalOpen(false)}
        >
          <div
            className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative border border-botanical/20"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsPincodeModalOpen(false)}
              className="absolute top-4 right-4 text-charcoal"
              aria-label="Close"
            >
              ✕
            </button>
            <h3 className="font-display font-bold text-lg text-botanical mb-1">Select Delivery Location</h3>
            <p className="text-[11px] text-charcoal/60 mb-3">Enter pincode and choose how you&apos;d like it delivered.</p>

            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={pincodeInput}
              onChange={(e) => {
                setPincodeInput(e.target.value.replace(/\D/g, ""));
                setPincodeError("");
              }}
              onKeyDown={(e) => e.key === "Enter" && confirmPincode()}
              placeholder="6-digit pincode"
              className="w-full text-xs p-3 rounded-xl border border-botanical/20 focus:outline-none focus:border-botanical"
            />
            {pincodeError && <p className="text-[11px] text-red-600 mt-1">{pincodeError}</p>}

            <div className="grid grid-cols-2 gap-2 mt-4 mb-4">
              {DELIVERY_SLOTS.map((slot) => {
                const active = slotInput === slot.id;
                return (
                  <button
                    key={slot.id}
                    onClick={() => setSlotInput(slot.id)}
                    className={`text-left p-3 rounded-xl border transition-all ${
                      active ? "border-botanical bg-blush" : "border-botanical/15 hover:border-botanical/40"
                    }`}
                  >
                    <span className="text-[9px] font-bold uppercase tracking-wider text-gold block">{slot.tag}</span>
                    <span className="text-xs font-bold text-botanical block">{slot.name}</span>
                    <span className="text-[10px] text-charcoal/60 block">{slot.time}</span>
                  </button>
                );
              })}
            </div>

            <button
              onClick={confirmPincode}
              className="w-full py-3 bg-botanical text-ivory text-xs font-bold rounded-xl hover:bg-botanical-light transition-colors"
            >
              Confirm
            </button>
          </div>
        </div>
      )}

      {/* AUTH MODAL */}
      {isAuthModalOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setIsAuthModalOpen(false)}
        >
          <div
            className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl relative border border-botanical/20"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsAuthModalOpen(false)}
              className="absolute top-4 right-4 text-charcoal"
              aria-label="Close"
            >
              ✕
            </button>

            <div className="flex gap-4 mb-5 border-b border-botanical/10">
              <button
                onClick={() => setAuthTab("login")}
                className={`pb-2 text-sm font-bold ${authTab === "login" ? "text-botanical border-b-2 border-botanical" : "text-charcoal/40"}`}
              >
                Login
              </button>
              <button
                onClick={() => setAuthTab("register")}
                className={`pb-2 text-sm font-bold ${authTab === "register" ? "text-botanical border-b-2 border-botanical" : "text-charcoal/40"}`}
              >
                Register
              </button>
            </div>

            {authTab === "register" && (
              <input type="text" placeholder="Full Name" className="w-full text-xs p-3 rounded-xl border border-botanical/20 mb-3" />
            )}
            <input
              type="tel"
              inputMode="numeric"
              maxLength={10}
              placeholder="Mobile Number"
              value={authPhone}
              onChange={(e) => {
                setAuthPhone(e.target.value.replace(/\D/g, ""));
                setAuthError("");
              }}
              onKeyDown={(e) => e.key === "Enter" && submitAuth()}
              className="w-full text-xs p-3 rounded-xl border border-botanical/20 mb-3"
            />
            {authError && <p className="text-[11px] text-red-600 -mt-2 mb-3">{authError}</p>}
            {authTab === "register" && (
              <input type="email" placeholder="Email (optional)" className="w-full text-xs p-3 rounded-xl border border-botanical/20 mb-3" />
            )}

            {authDone ? (
              <div className="bg-blush rounded-xl p-4 text-xs text-botanical">
                <p className="font-bold mb-1">Accounts are launching soon!</p>
                <p className="text-charcoal/70">
                  You don&apos;t need an account to order. Checkout as a guest and we&apos;ll send order updates to your mobile.
                  You can track any order with its Order ID.
                </p>
                <button
                  onClick={() => setIsAuthModalOpen(false)}
                  className="mt-3 w-full py-2.5 bg-botanical text-ivory font-bold rounded-xl hover:bg-botanical-light transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <button
                onClick={submitAuth}
                className="w-full py-3 bg-botanical text-ivory text-xs font-bold rounded-xl hover:bg-botanical-light transition-colors"
              >
                {authTab === "login" ? "Send OTP" : "Create Account"}
              </button>
            )}

            <p className="text-[10px] text-charcoal/40 text-center mt-3">
              By continuing, you agree to The Mali&apos;s Terms &amp; Privacy Policy.
            </p>
          </div>
        </div>
      )}
    </>
  );
}