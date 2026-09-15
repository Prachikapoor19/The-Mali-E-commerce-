'use client';

const occasions = [
  { title: 'Birthday', bg: 'bg-[#FDEBD3]', emoji: '\u{1F382}' },
  { title: 'Congratulations', bg: 'bg-[#DCE9F5]', emoji: '\u{1F389}' },
  { title: 'Anniversary', bg: 'bg-[#FBE4E7]', emoji: '\u{1F490}' },
  { title: 'Festive Special', bg: 'bg-[#F4EDE1]', emoji: '\u{1FA94}' },
  { title: 'Wife Appreciation', bg: 'bg-[#F7D9DE]', emoji: '\u{1F49D}' },
  { title: 'Thank You', bg: 'bg-[#E7EFE4]', emoji: '\u{1F64F}' },
];

export default function OccasionStrip() {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 py-6">
      <h2 className="font-display text-xl md:text-2xl font-semibold text-charcoal mb-4">
        Gifts For Every Occasion
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 md:gap-4">
        {occasions.map((occ) => (
          <a key={occ.title} href="#" className={`${occ.bg} rounded-xl h-24 md:h-28 flex items-center justify-between px-4 hover:-translate-y-0.5 transition-transform`}>
            <span className="text-sm md:text-base font-semibold text-charcoal leading-tight">
              {occ.title}
            </span>
            <span className="text-3xl md:text-4xl shrink-0">{occ.emoji}</span>
          </a>
        ))}
      </div>
    </section>
  );
}