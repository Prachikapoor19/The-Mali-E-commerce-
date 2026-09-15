'use client';

const items = [
  { label: 'Same Day', emoji: '\u{1F69A}' },
  { label: 'Flowers', emoji: '\u{1F490}' },
  { label: 'Cakes', emoji: '\u{1F382}' },
  { label: 'Personalised', emoji: '\u{1F5BC}\uFE0F' },
  { label: 'Plants', emoji: '\u{1FAB4}' },
  { label: 'Chocolates', emoji: '\u{1F36B}' },
  { label: 'Hampers', emoji: '\u{1F9FA}' },
  { label: 'Spiritual', emoji: '\u{1FA94}' },
  { label: 'Balloon Decor', emoji: '\u{1F388}' },
  { label: 'Trendy Gifts', emoji: '\u{2728}' },
  { label: 'Combos', emoji: '\u{1F381}' },
];

export default function IconStrip() {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 py-4 overflow-x-auto border-b border-charcoal/10">
      <div className="flex items-start gap-6 md:gap-9 min-w-max">
        {items.map((item) => (
            <a
          
            key={item.label}
            href="#"
            className="flex flex-col items-center gap-1.5 group w-16"
          >
            <span className="w-12 h-12 rounded-full bg-blush flex items-center justify-center text-xl group-hover:bg-rose-light transition-colors">
              {item.emoji}
            </span>
            <span className="text-[11px] text-charcoal/70 text-center leading-tight">
              {item.label}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}