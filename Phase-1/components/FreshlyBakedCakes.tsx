'use client';

const cakes = [
  { name: 'Chocolate', emoji: '\u{1F36B}' },
  { name: 'Butterscotch', emoji: '\u{1F36E}' },
  { name: 'Fresh Fruit', emoji: '\u{1F353}' },
  { name: 'Combos', emoji: '\u{1F381}' },
  { name: 'Pineapple', emoji: '\u{1F34D}' },
];

export default function FreshlyBakedCakes() {
  return (
    <section className="w-full bg-[#FDF0E3] py-8">
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14">
        <h2 className="font-display text-xl md:text-2xl font-semibold text-charcoal mb-5">
          Freshly Baked Cakes
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4">
          {cakes.map((c) => (
            <a key={c.name} href="#" className="group">
              <div className="aspect-[4/3] rounded-xl bg-white flex items-center justify-center mb-2 group-hover:-translate-y-0.5 transition-transform">
                <span className="text-4xl">{c.emoji}</span>
              </div>
              <p className="text-center text-sm font-semibold text-charcoal">{c.name}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}