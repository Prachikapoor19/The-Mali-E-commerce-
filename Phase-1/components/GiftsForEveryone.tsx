'use client';

const recipients = [
  { name: 'Him', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=380&fit=crop' },
  { name: 'Her', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=380&fit=crop' },
  { name: 'Kids', img: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=300&h=380&fit=crop' },
  { name: 'Friend', img: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=300&h=380&fit=crop' },
  { name: 'Wife', img: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=300&h=380&fit=crop' },
  { name: 'Husband', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=380&fit=crop' },
  { name: 'Parents', img: 'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=300&h=380&fit=crop' },
];

export default function GiftsForEveryone() {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 py-6">
      <h2 className="font-display text-xl md:text-2xl font-semibold text-charcoal mb-1">
        Gifts for Everyone
      </h2>
      <p className="text-xs text-charcoal/60 mb-4">
        Find the perfect surprise tailored for your loved ones.
      </p>

      <div className="flex gap-3 md:gap-4 overflow-x-auto pb-2">
        {recipients.map((r) => (
          <a key={r.name} href="#" className="shrink-0 w-32 md:w-40 group">
            <div className="aspect-[4/5] rounded-xl overflow-hidden mb-2 relative">
              <img
                src={r.img}
                alt={r.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <p className="text-center text-sm font-semibold text-charcoal">{r.name}</p>
          </a>
        ))}
      </div>
    </section>
  );
}