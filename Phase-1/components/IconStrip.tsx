'use client';

function IconWrap({ children }: { children: React.ReactNode }) {
  return (
    <span className="w-14 h-14 rounded-full bg-blush flex items-center justify-center group-hover:bg-gold/20 transition-colors">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#1F2E20" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        {children}
      </svg>
    </span>
  );
}

const items = [
  {
    label: 'Same Day',
    icon: (
      <>
        <circle cx="6" cy="18" r="2" /><circle cx="17" cy="18" r="2" />
        <path d="M2 18h2m2 0h6V7H4v11" /><path d="M10 10h5l3 3v5h-2" />
      </>
    ),
  },
  {
    label: 'Flowers',
    icon: (
      <>
        <circle cx="12" cy="7" r="2.5" /><circle cx="8" cy="9" r="2.5" /><circle cx="16" cy="9" r="2.5" />
        <path d="M12 12v8" /><path d="M9 20h6" />
      </>
    ),
  },
  {
    label: 'Cakes',
    icon: (
      <>
        <path d="M4 21V13a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8" />
        <path d="M2 21h20" /><path d="M4 17h16" />
        <path d="M12 11V6" /><path d="M12 3v1" />
      </>
    ),
  },
  {
    label: 'Personalised',
    icon: (
      <>
        <rect x="4" y="3" width="16" height="18" rx="1.5" />
        <path d="M12 9c-1-1.5-3-1.5-3.5 0-0.5 1.5 1.5 3 3.5 4.5 2-1.5 4-3 3.5-4.5-0.5-1.5-2.5-1.5-3.5 0z" fill="#1F2E20" />
      </>
    ),
  },
  {
    label: 'Plants',
    icon: (
      <>
        <path d="M12 21V11" />
        <path d="M12 11c0-3-2-5-5-5 0 3 2 5 5 5z" />
        <path d="M12 11c0-3 2-5 5-5 0 3-2 5-5 5z" />
        <path d="M8 21h8" />
      </>
    ),
  },
  {
    label: 'Chocolates',
    icon: (
      <>
        <rect x="4" y="8" width="16" height="12" rx="1.5" />
        <path d="M4 12h16" /><path d="M12 8v12" />
        <path d="M9 4l3 4 3-4" />
      </>
    ),
  },
  {
    label: 'Hampers',
    icon: (
      <>
        <path d="M4 10h16l-1.5 10a1.5 1.5 0 0 1-1.5 1.3H7A1.5 1.5 0 0 1 5.5 20L4 10z" />
        <path d="M2 10h20" />
        <path d="M12 3c-2 0-4 2-4 4h8c0-2-2-4-4-4z" />
      </>
    ),
  },
  {
    label: 'Spiritual',
    icon: (
      <>
        <path d="M12 2v4" /><path d="M8 6c0 3-4 4-4 8a8 8 0 0 0 16 0c0-4-4-5-4-8" />
        <circle cx="12" cy="14" r="2.5" />
      </>
    ),
  },
  {
    label: 'Balloon Decor',
    icon: (
      <>
        <path d="M9 8a3 3 0 1 1 6 0c0 3-1.5 5-3 6-1.5-1-3-3-3-6z" />
        <path d="M12 14v5" /><path d="M10 22h4" />
        <path d="M12 19l-1 1 1 1 1-1z" />
      </>
    ),
  },
  {
    label: 'Trendy Gifts',
    icon: (
      <>
        <path d="M5 3l1.5 3.5L10 8l-3.5 1.5L5 13l-1.5-3.5L0 8l3.5-1.5z" fill="#C9A15A" stroke="none" transform="translate(5,2) scale(0.9)" />
        <path d="M14 12l1 2.3 2.3 1-2.3 1-1 2.3-1-2.3-2.3-1 2.3-1z" fill="#C9A15A" stroke="none" />
        <circle cx="18" cy="6" r="1.3" fill="#C9A15A" stroke="none" />
      </>
    ),
  },
  {
    label: 'Combos',
    icon: (
      <>
        <rect x="3" y="9" width="8" height="12" rx="1" />
        <rect x="13" y="6" width="8" height="15" rx="1" />
        <path d="M3 13h8" /><path d="M13 11h8" />
      </>
    ),
  },
];

export default function IconStrip() {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 py-4 overflow-x-auto border-b border-charcoal/10">
      <div className="flex items-start gap-5 md:gap-8 min-w-max">
        {items.map((item) => (
          <a key={item.label} href="#" className="flex flex-col items-center gap-1.5 group w-16">
            <IconWrap>{item.icon}</IconWrap>
            <span className="text-[11px] text-charcoal/70 text-center leading-tight font-medium">
              {item.label}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}