'use client';

const categories: string[] = [
  'Birthday',
  'Occasions',
  'Anniversary',
  'Flowers',
  'Cakes',
  'Personalised',
  'Plants',
  'Chocolates',
  'Lifestyle',
  'Hatke',
  'LUXE',
  'Hampers',
  'Balloons',
  'Global',
];

export default function CategoryNav() {
  return (
    <nav className="border-b border-charcoal/10 bg-ivory overflow-x-auto sticky top-[53px] z-40">
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14">
        <ul className="flex items-center gap-5 md:gap-7 py-2.5 text-[13px] font-semibold whitespace-nowrap">
          {categories.map((cat, i) => (
            <li key={cat} className="flex items-center gap-0.5">
              <a href="#" className={i === 0 ? 'text-rose border-b-2 border-rose pb-2.5 -mb-2.5' : 'text-charcoal/70 hover:text-rose transition-colors'}>
                {cat}
              </a>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-charcoal/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}