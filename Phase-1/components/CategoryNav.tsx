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
    <>
      <nav className="border-t border-charcoal/10 hidden md:block bg-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex items-center justify-center gap-8 py-3 text-sm font-semibold">
            {categories.map((cat, i) => (
              <li key={cat}>
                <a
                  href="#"
                  className={
                    i === 0
                      ? 'text-rose border-b-2 border-rose pb-3 -mb-3'
                      : 'hover:text-rose transition-colors'
                  }
                >
                  {cat}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <nav className="border-t border-charcoal/10 md:hidden overflow-x-auto bg-ivory">
        <ul className="flex items-center gap-5 px-4 py-2.5 text-sm font-semibold whitespace-nowrap w-max">
          {categories.map((cat, i) => (
            <li key={cat}>
              <a href="#" className={i === 0 ? 'text-rose' : 'text-charcoal/70'}>
                {cat}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}