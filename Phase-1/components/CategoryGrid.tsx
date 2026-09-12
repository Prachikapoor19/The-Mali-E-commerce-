'use client';

const categories = [
  {
    name: 'Fresh Flowers',
    tagline: 'Hand-picked, daily',
    emoji: '\u{1F490}',
    bg: 'bg-blush',
    span: 'md:col-span-2 md:row-span-2',
  },
  {
    name: 'Yummy Cakes',
    tagline: 'Baked to order',
    emoji: '\u{1F382}',
    bg: 'bg-[#F4EDE1]',
    span: 'md:col-span-2',
  },
  {
    name: 'Custom Gifts',
    tagline: 'Made just for them',
    emoji: '\u{1F381}',
    bg: 'bg-[#E7EFE4]',
    span: '',
  },
  {
    name: 'Combos',
    tagline: 'More joy, one order',
    emoji: '\u{1F9FA}',
    bg: 'bg-[#FDEBD3]',
    span: '',
  },
];

export default function CategoryGrid() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="flex items-end justify-between mb-6 md:mb-8">
        <h2 className="font-display text-2xl md:text-3xl font-semibold text-charcoal">
          Shop by Category
        </h2>
        <a href="#" className="text-sm font-semibold text-rose hover:text-rose-dark transition-colors">
          View all
        </a>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 md:grid-rows-2 gap-4 md:gap-5">
        {categories.map((cat) => (
          <a
            key={cat.name}
            href="#"
            className={`group relative overflow-hidden rounded-2xl ${cat.bg} ${cat.span} min-h-[160px] md:min-h-[180px] flex flex-col justify-between p-5 md:p-7 transition-transform hover:-translate-y-1`}
          >
            <span className="text-4xl md:text-5xl">{cat.emoji}</span>
            <div>
              <h3 className="font-display text-lg md:text-xl font-semibold text-charcoal">
                {cat.name}
              </h3>
              <p className="text-sm text-charcoal/60 mt-0.5">{cat.tagline}</p>
            </div>
            <span className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-charcoal" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
              </svg>
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}