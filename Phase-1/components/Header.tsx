import React from "react";
import Image from "next/image";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-ivory border-b border-rose-light/20 shadow-xs">
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 py-3 flex items-center justify-between gap-4">
        {/* Brand Logo & Wordmark */}
        <a href="/" className="flex items-center gap-2 shrink-0">
          <Image
            src="/logo-icon.png"
            alt="The Mali"
            width={36}
            height={36}
            className="object-contain"
            priority
          />
          <span className="font-display text-lg md:text-xl font-semibold tracking-tight leading-none text-botanical">
            The Mali
          </span>
        </a>

        {/* Location Selector Pill */}
        <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blush/60 border border-rose-light/30 text-xs font-medium text-botanical">
          <span>📍</span>
          <span>Deliver to <strong className="font-bold">226001</strong></span>
          <span className="text-[10px] text-charcoal/50">▼</span>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-xl relative">
          <input
            type="text"
            placeholder="Search flowers, cakes, gifts..."
            className="w-full py-2 pl-9 pr-4 text-xs rounded-full bg-white border border-rose-light/40 focus:outline-none focus:border-rose text-charcoal placeholder:text-charcoal/40 shadow-2xs"
          />
          <span className="absolute left-3 top-2.5 text-xs text-charcoal/40">🔍</span>
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-4 text-botanical">
          <button className="flex items-center gap-1 text-xs font-medium hover:text-rose transition-colors">
            <span className="text-base">👤</span>
            <span className="hidden sm:inline">Account</span>
          </button>
          <button className="relative flex items-center gap-1 text-xs font-medium hover:text-rose transition-colors">
            <span className="text-base">🛒</span>
            <span className="hidden sm:inline">Cart</span>
            <span className="absolute -top-1.5 -right-2 bg-rose text-ivory text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
              0
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}