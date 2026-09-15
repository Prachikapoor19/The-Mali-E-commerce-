'use client';

const categories = [
  { name: 'Fresh Flowers', tagline: 'Hand-picked, daily', emoji: '\u{1F490}', bg: 'bg-blush' },
  { name: 'Yummy Cakes', tagline: 'Baked to order', emoji: '\u{1F382}', bg: 'bg-[#F4EDE1]' },
  { name: 'Custom Gifts', tagline: 'Made just for them', emoji: '\u{1F381}', bg: 'bg-[#E7EFE4]' },
  { name: 'Combos', tagline: 'More joy, one order', emoji: '\u{1F9FA}', bg: 'bg-[#FDEBD3]' },
];

export default function CategoryGrid() {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 py-6">
      <div className="flex items-end justify-between mb-4">
        <h2 className="font-display text-xl md:text-2xl font-semibold text-charcoal">
          Shop by Category
        </h2>
        <a href="#" className="text-xs font-semibold text-rose hover:text-rose-dark transition-colors">
          View all
        </a>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {categories.map((cat) => (
          <a
          
            key={cat.name}
            href="#"
            className={`group rounded-xl ${cat.bg} min-h-[130px] md:min-h-[150px] flex flex-col justify-between p-4 md:p-5 hover:-translate-y-0.5 transition-transform`}
          >
            <span className="text-3xl md:text-4xl">{cat.emoji}</span>
            <div>
              <h3 className="font-display text-base md:text-lg font-semibold text-charcoal">
                {cat.name}
              </h3>
              <p className="text-xs text-charcoal/60 mt-0.5">{cat.tagline}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}