"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "./CartContext";
import { useWishlist } from "./WishlistContext";
import SearchSuggestions from "./SearchSuggestions";

// Logo font (Cinzel) is bundled via @fontsource in app/layout.tsx
const cinzel = { className: "font-logo" };

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
        <div className="bg-botanical text-ivory">
          <div className="px-4 sm:px-6 lg:px-10 xl:px-14 py-1.5 flex items-center justify-center md:justify-between gap-4 text-[11px] sm:text-xs font-medium tracking-wide">
            <span className="truncate">
              🌿 Free Express Delivery on Orders Above ₹999 <span className="text-ivory/50 mx-1">|</span> Code: <strong className="text-gold">MALI15</strong>
            </span>
            <span className="hidden md:inline text-ivory/80">📞 24/7 Gifting Help: +91 1800-MALI-CARE</span>
          </div>
        </div>

        {/* Main Nav Bar */}
        <div className="w-full px-3 sm:px-6 lg:px-10 xl:px-14 py-2 md:py-2.5 flex items-center gap-2.5 sm:gap-4 lg:gap-6">
          {/* Logo: lily + "The Mali" wordmark */}
          <a href="/" className="flex items-center gap-3 shrink-0 group" aria-label="The Mali home">
            <img
              src="/logo-wide.png"
              fetchPriority="high"
              alt="The Mali"
              width={720}
              height={488}
              className="h-11 sm:h-12 lg:h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03]"
            />
            <div className="hidden 2xl:block border-l border-botanical/15 pl-3 leading-tight">
              <span className={`block text-[11px] font-bold uppercase tracking-[0.28em] text-gold-dark ${cinzel.className}`}>
                Flowers · Cakes · Gifts
              </span>
              <span className="block text-[11px] text-charcoal/60 mt-1">Delivered with love</span>
            </div>
          </a>

          {/* Location Pincode Button */}
          <button
            onClick={openPincodeModal}
            className="flex items-center gap-1.5 sm:gap-2 min-h-10 pl-2.5 pr-2 sm:pl-3 sm:pr-2.5 py-1.5 sm:py-2 rounded-xl bg-white border border-botanical/15 text-botanical hover:border-botanical/40 hover:shadow-xs transition-all shrink-0"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-4 h-4 text-rose"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
            <div className="text-left leading-tight hidden sm:block">
              <span className="text-[11px] text-charcoal/55 block">Deliver to</span>
              <strong className="text-xs font-bold text-botanical whitespace-nowrap">
                {pincode} · {selectedSlot.short}
              </strong>
            </div>
            <span className="sm:hidden text-xs font-bold">{pincode}</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-3.5 h-3.5 text-charcoal/40"><path d="m6 9 6 6 6-6" /></svg>
          </button>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex flex-1 min-w-0 max-w-3xl mx-auto relative">
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
              placeholder="Search flowers, cakes, perfumes, teddy bears..."
              aria-label="Search products"
              className="w-full h-11 pl-11 pr-24 text-sm rounded-full bg-white border border-botanical/15 focus:outline-none focus:border-botanical/50 focus:ring-4 focus:ring-blush text-charcoal placeholder:text-charcoal/40 shadow-xs transition-shadow"
            />
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/40 pointer-events-none"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
            <button
              onClick={runSearch}
              className="absolute right-1 top-1 bottom-1 px-4 rounded-full bg-botanical text-ivory text-xs font-semibold hover:bg-rose transition-colors"
            >
              Search
            </button>
            {searchFocused && <SearchSuggestions query={searchQuery} onPick={() => setSearchFocused(false)} />}
          </div>

          {/* Actions */}
          <div className="ml-auto md:ml-0 flex items-center gap-0.5 sm:gap-1.5 lg:gap-2.5 text-botanical shrink-0">
            <button
              onClick={goToGiftFinder}
              className="hidden xl:flex items-center gap-1.5 h-10 px-3.5 bg-blush border border-rose-light/70 rounded-full text-xs font-bold text-rose hover:bg-rose hover:text-ivory hover:border-rose transition-all mr-1"
            >
              <span aria-hidden="true">✨</span>
              <span>Gift Finder</span>
            </button>

            <a
              href="/wishlist"
              className="relative flex flex-col items-center justify-center gap-0.5 min-w-10 lg:min-w-14 h-11 px-1.5 rounded-xl hover:bg-blush transition-colors"
              title="Wishlist"
              aria-label={`Wishlist (${wishlistCount})`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-5 h-5"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>
              <span className="hidden lg:block text-[11px] font-semibold leading-none">Wishlist</span>
              {wishlistCount > 0 && (
                <span className="absolute top-0.5 right-0.5 lg:right-2 bg-rose text-ivory text-[11px] font-bold rounded-full h-4 min-w-4 px-1 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </a>

            <button
              onClick={openAuth}
              className="flex flex-col items-center justify-center gap-0.5 min-w-10 lg:min-w-14 h-11 px-1.5 rounded-xl hover:bg-blush transition-colors"
              aria-label="Login or register"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-5 h-5"><circle cx="12" cy="8" r="4" /><path d="M20 21a8 8 0 0 0-16 0" /></svg>
              <span className="hidden lg:block text-[11px] font-semibold leading-none">Login</span>
            </button>

            <button
              onClick={openCart}
              data-cart-target
              className="relative flex items-center gap-2 h-10 pl-3 pr-2.5 sm:pl-4 sm:pr-3 ml-1 bg-botanical text-ivory rounded-full text-xs sm:text-sm font-semibold hover:bg-rose transition-all shadow-xs"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-4 h-4"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
              <span className="hidden sm:inline">Cart</span>
              {/* key changes with the count, so the badge "bumps" every time something is added */}
              <span key={itemCount} className="bg-gold text-botanical text-[11px] font-bold rounded-full h-5 min-w-5 px-1 flex items-center justify-center animate-bump">
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
              className="w-full h-10 pl-9 pr-3 text-sm rounded-full bg-white border border-botanical/15 focus:outline-none focus:border-botanical/50 focus:ring-4 focus:ring-blush text-charcoal placeholder:text-charcoal/40 shadow-2xs"
            />
            <button onClick={runSearch} className="absolute left-0.5 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center text-xs text-charcoal/40" aria-label="Search">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-3.5 h-3.5"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
            </button>
            {searchFocused && <SearchSuggestions query={searchQuery} onPick={() => setSearchFocused(false)} />}
          </div>
        </div>
      </header>

      {/* PINCODE + DELIVERY SLOT MODAL */}
      {isPincodeModalOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setIsPincodeModalOpen(false)}
        >
          <div
            className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative border border-botanical/20 animate-pop-in"
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
                    <span className="text-[11px] font-bold uppercase tracking-wider text-gold block">{slot.tag}</span>
                    <span className="text-xs font-bold text-botanical block">{slot.name}</span>
                    <span className="text-[11px] text-charcoal/60 block">{slot.time}</span>
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
          className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setIsAuthModalOpen(false)}
        >
          <div
            className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl relative border border-botanical/20 animate-pop-in"
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

            <p className="text-[11px] text-charcoal/40 text-center mt-3">
              By continuing, you agree to The Mali&apos;s Terms &amp; Privacy Policy.
            </p>
          </div>
        </div>
      )}
    </>
  );
}