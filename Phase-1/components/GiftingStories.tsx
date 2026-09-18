'use client';

const stories = [
  { title: 'Take a Break', img: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=280&h=400&fit=crop' },
  { title: 'Anniversary Ideas', img: 'https://images.unsplash.com/photo-1758874089944-32dca2ce5d55?w=280&h=400&fit=crop' },
  { title: 'Birthday Magic', img: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=280&h=400&fit=crop' },
  { title: 'Festive Vibes', img: 'https://images.unsplash.com/photo-1509909756405-be0199881695?w=280&h=400&fit=crop' },
  { title: 'Love Notes', img: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=280&h=400&fit=crop' },
];

export default function GiftingStories() {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 py-6">
      <h2 className="font-display text-xl md:text-2xl font-semibold text-charcoal mb-4">
        Joyful Gifting Stories
      </h2>

      <div className="flex gap-3 md:gap-4 overflow-x-auto pb-2">
        {stories.map((s) => (
          <a key={s.title} href="#" className="shrink-0 w-36 md:w-44 group relative rounded-xl overflow-hidden">
            <div className="aspect-[9/16]">
              <img
                src={s.img}
                alt={s.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <p className="absolute bottom-3 left-3 right-3 text-white text-sm font-semibold">
              {s.title}
            </p>
          </a>
        ))}
      </div>
    </section>
  );
}