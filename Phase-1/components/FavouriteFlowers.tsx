'use client';

const flowers = [
  { name: 'Roses', img: 'https://images.unsplash.com/photo-1594291975567-6dab42430545?w=400&h=500&fit=crop' },
  { name: 'Orchids', img: 'https://images.unsplash.com/photo-1561831220-cc44b32786ca?w=400&h=500&fit=crop' },
  { name: 'Carnations', img: 'https://images.unsplash.com/photo-1533616688419-b7a585564566?w=400&h=500&fit=crop' },
  { name: 'Gerberas', img: 'https://images.unsplash.com/photo-1487070183336-b863922373d4?w=400&h=500&fit=crop' },
  { name: 'Sunflowers', img: 'https://images.unsplash.com/photo-1470509037663-253afd7f0f51?w=400&h=500&fit=crop' },
];

export default function FavouriteFlowers() {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 py-6">
      <h2 className="font-display text-xl md:text-2xl font-semibold text-charcoal mb-4">
        Pick their favourite Flower
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4">
        {flowers.map((f) => (
          <a key={f.name} href="#" className="group">
            <div className="aspect-[3/4] rounded-xl overflow-hidden mb-2 bg-blush">
              <img
                src={f.img}
                alt={f.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <p className="text-center text-sm font-semibold text-charcoal">{f.name}</p>
          </a>
        ))}
      </div>
    </section>
  );
}