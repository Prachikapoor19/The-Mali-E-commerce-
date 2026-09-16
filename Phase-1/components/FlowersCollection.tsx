import React from "react";

const flowerItems = [
  { name: "Orchids", image: "https://images.pexels.com/photos/1408221/pexels-photo-1408221.jpeg?auto=compress&cs=tinysrgb&w=400", price: "₹1,299" },
  { name: "Crochet", image: "https://images.pexels.com/photos/1366630/pexels-photo-1366630.jpeg?auto=compress&cs=tinysrgb&w=400", price: "₹899" },
  { name: "Centerpiece", image: "https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&cs=tinysrgb&w=400", price: "₹1,599" },
  { name: "Sunny Blooms", image: "https://images.pexels.com/photos/1083822/pexels-photo-1083822.jpeg?auto=compress&cs=tinysrgb&w=400", price: "₹999" },
  { name: "Dried Flowers", image: "https://images.pexels.com/photos/1158783/pexels-photo-1158783.jpeg?auto=compress&cs=tinysrgb&w=400", price: "₹799" },
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
          <div key={item.name} className="bg-white rounded-xl overflow-hidden p-3 border border-rose-light/20 shadow-xs flex flex-col items-center text-center">
            <div className="w-full h-36 rounded-lg overflow-hidden bg-blush/30 mb-3">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
            </div>
            <h3 className="font-semibold text-sm text-botanical">
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