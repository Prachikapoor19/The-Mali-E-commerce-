'use client';

const recipients = [
  { name: 'Him', emoji: '\u{1F454}' },
  { name: 'Her', emoji: '\u{1F457}' },
  { name: 'Kids', emoji: '\u{1F9F8}' },
  { name: 'Friend', emoji: '\u{1F91D}' },
  { name: 'Wife', emoji: '\u{1F49D}' },
  { name: 'Husband', emoji: '\u{1F48D}' },
  { name: 'Parents', emoji: '\u{1F468}\u200D\u{1F469}\u200D\u{1F466}' },
];

export default function GiftsForEveryone() {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 py-6">
      <h2 className="font-display text-xl md:text-2xl font-semibold text-charcoal mb-4">
        Gifts for Everyone
      </h2>

      <div className="flex gap-3 md:gap-4 overflow-x-auto pb-2">
        {recipients.map((r) => (
          <a key={r.name} href="#" className="shrink-0 w-32 md:w-40 group">
            <div className="aspect-[4/5] rounded-xl bg-[#F4EDE1] flex items-center justify-center mb-2 group-hover:-translate-y-0.5 transition-transform">
              <span className="text-4xl">{r.emoji}</span>
            </div>
            <p className="text-center text-sm font-semibold text-charcoal">{r.name}</p>
          </a>
        ))}
      </div>
    </section>
  );
}