'use client';

const categories: string[] = [
  'Flowers',
  'Cakes',
  'Personalised Gifts',
  'Plants',
  'Chocolates',
  'Combos',
  'Occasions',
];

export default function CategoryNav() {
  return (
    <nav className="border-b border-charcoal/10 bg-ivory overflow-x-auto sticky top-[53px] z-40">
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14">
        <ul className="flex items-center gap-6 md:gap-8 py-2.5 text-[13px] font-semibold whitespace-nowrap">
          {categories.map((cat, i) => (
            <li key={cat}>
              <a
                href="#"
                className={
                  i === 0
                    ? 'text-rose border-b-2 border-rose pb-2.5 -mb-2.5'
                    : 'text-charcoal/70 hover:text-rose transition-colors'
                }
              >
                {cat}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}