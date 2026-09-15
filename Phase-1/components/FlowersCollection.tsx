import React from "react";

const flowerItems = [
  { name: "Orchids", emoji: "🪻", price: "₹1,299" },
  { name: "Crochet", emoji: "🌻", price: "₹899" },
  { name: "Centerpiece", emoji: "💐", price: "₹1,599" },
  { name: "Sunny Blooms", emoji: "🌻", price: "₹999" },
  { name: "Dried Flowers", emoji: "🌾", price: "₹799" },
];

export default function FlowersCollection() {
  return (
    <section className="w-full bg-[#DCEBF7] py-8 px-4 sm:px-6 lg:px-10 xl:px-14 my-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="font-display text-xl sm:text-2xl font-bold text-botanical">
            Flowers Collection
          </h2>
          <p className="text-xs sm:text-sm text-charcoal/70 mt-1">
            Freshly picked blooms curated for every moment
          </p>
        </div>
        <a key="view-all-flowers" href="#" className="text-xs sm:text-sm font-semibold text-rose hover:text-rose-dark transition-colors">
          View All &rarr;
        </a>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {flowerItems.map((item) => (
          <div key={item.name} className="bg-white rounded-xl p-4 border border-rose-light/20 shadow-xs flex flex-col items-center text-center">
            <div className="w-full h-32 rounded-lg bg-blush/30 flex items-center justify-center text-4xl mb-3">
              {item.emoji}
            </div>
            <h3 className="font-medium text-sm text-botanical">
              {item.name}
            </h3>
            <span className="text-xs font-bold text-rose mt-1 mb-3">
              {item.price}
            </span>
            <button className="w-full py-1.5 bg-rose text-ivory rounded-lg text-xs font-medium hover:bg-rose-dark transition-colors">
              Order Now
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}