'use client';

const launches = [
  {
    name: 'Hot Girl Bouquet',
    price: '\u20B9649',
    oldPrice: '\u20B9799',
    img: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=300&h=380&fit=crop',
  },
  {
    name: 'Rose Pineapple Eggless Cake',
    price: '\u20B9599',
    oldPrice: '\u20B9699',
    img: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=300&h=380&fit=crop',
  },
  {
    name: 'Personalised Jewellery Box',
    price: '\u20B91,099',
    oldPrice: null,
    img: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=300&h=380&fit=crop',
  },
  {
    name: 'Red Rose Delight',
    price: '\u20B9549',
    oldPrice: '\u20B9649',
    img: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=300&h=380&fit=crop',
  },
  {
    name: 'Money Plant in White Pot',
    price: '\u20B9399',
    oldPrice: null,
    img: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=300&h=380&fit=crop',
  },
];

export default function NewlyLaunched() {
  return (
    <section className="w-full bg-blush py-8">
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14">
        <h2 className="font-display text-xl md:text-2xl font-semibold text-charcoal mb-5">
          Newly Launched
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4">
          {launches.map((item) => (
            <a key={item.name} href="#" className="bg-white rounded-xl overflow-hidden group">
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-2.5">
                <h3 className="text-xs font-semibold text-charcoal leading-snug line-clamp-2">
                  {item.name}
                </h3>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="text-sm font-semibold text-charcoal">{item.price}</span>
                  {item.oldPrice && (
                    <span className="text-[11px] text-charcoal/40 line-through">{item.oldPrice}</span>
                  )}
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="flex justify-center mt-6">
          <button className="text-sm font-semibold text-charcoal border border-charcoal/20 rounded-full px-6 py-2.5 hover:border-rose hover:text-rose transition-colors">
            View All Launches
          </button>
        </div>
      </div>
    </section>
  );
}