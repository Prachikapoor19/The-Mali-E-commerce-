'use client';

import Image from 'next/image';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-ivory border-b border-charcoal/10">
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14">
        <div className="flex items-center justify-between gap-3 py-2.5">

          <a href="/" className="flex items-center gap-2 shrink-0">
            <Image src="/logo-icon.png" alt="The Mali" width={32} height={32} className="object-contain" priority />
            <span className="font-display text-lg font-semibold tracking-tight leading-none text-botanical hidden sm:block">
              The Mali
            </span>
          </a>

          <button className="hidden lg:flex flex-col items-start shrink-0 text-xs border-l border-r border-charcoal/10 px-3">
            <span className="flex items-center gap-1 text-charcoal/50">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-botanical" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
              </svg>
              Where to deliver?
            </span>
            <span className="font-semibold text-charcoal">226001</span>
          </button>

          <div className="hidden md:flex flex-1 max-w-xl mx-2">
            <div className="flex items-center w-full rounded-full border border-charcoal/15 bg-white px-4 py-2 focus-within:border-rose transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-charcoal/40 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input type="text" placeholder="Search flowers, cakes, gifts..." className="w-full bg-transparent outline-none px-3 text-sm placeholder:text-charcoal/40" />
            </div>
          </div>

          <button className="hidden md:flex items-center gap-1.5 shrink-0 text-xs font-semibold border border-gold/50 rounded-full px-3.5 py-2 hover:bg-gold/10 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 3v3M12 18v3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M3 12h3M18 12h3M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
            </svg>
            Finder
          </button>

          <div className="flex items-center gap-2 md:gap-3 shrink-0">

            <button className="hidden xl:flex flex-col items-center gap-0.5 text-charcoal/70 hover:text-botanical transition-colors" aria-label="Reminders">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <span className="text-[10px]">Reminders</span>
            </button>

            <button className="hidden xl:flex flex-col items-center gap-0.5 text-charcoal/70 hover:text-botanical transition-colors" aria-label="Corporate">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-6M2 7h20v5H2zM12 22V7M12 7a2.5 2.5 0 1 1-2.5-2.5c1.5 0 2.5 1.5 2.5 2.5zM12 7a2.5 2.5 0 1 0 2.5-2.5c-1.5 0-2.5 1.5-2.5 2.5z" />
              </svg>
              <span className="text-[10px]">Corporate</span>
            </button>

            <button className="md:hidden w-8 h-8 flex items-center justify-center rounded-full hover:bg-blush transition-colors" aria-label="Search">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>

            <button className="relative w-8 h-8 flex items-center justify-center rounded-full hover:bg-blush transition-colors" aria-label="Cart">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-rose text-[10px] leading-4 text-ivory text-center font-bold">2</span>
            </button>

            <button className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-charcoal/70 hover:text-botanical transition-colors" aria-label="Account">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
              </svg>
              Hi, Guest
            </button>

            <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-blush transition-colors" aria-label="More">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="5" r="1.5" /><circle cx="12" cy="12" r="1.5" /><circle cx="12" cy="19" r="1.5" />
              </svg>
            </button>

          </div>
        </div>

        <div className="md:hidden pb-2.5">
          <div className="flex items-center w-full rounded-full border border-charcoal/15 bg-white px-4 py-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-charcoal/40 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input type="text" placeholder="Search flowers, cakes, gifts..." className="w-full bg-transparent outline-none px-3 text-sm placeholder:text-charcoal/40" />
          </div>
        </div>
      </div>
    </header>
  );
}