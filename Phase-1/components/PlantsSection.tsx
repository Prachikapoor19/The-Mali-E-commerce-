import React from "react";

const plants = [
  { title: "Indoor Plants", desc: "Purify your air", image: "https://images.pexels.com/photos/305821/pexels-photo-305821.jpeg?auto=compress&cs=tinysrgb&w=400", price: "₹399" },
  { title: "Money Plants", desc: "Bring good fortune", image: "https://images.pexels.com/photos/1084199/pexels-photo-1084199.jpeg?auto=compress&cs=tinysrgb&w=400", price: "₹299" },
  { title: "Lucky Bamboo", desc: "Positivity & harmony", image: "https://images.pexels.com/photos/7084337/pexels-photo-7084337.jpeg?auto=compress&cs=tinysrgb&w=400", price: "₹499" },
  { title: "Peace Lily", desc: "Elegant & serene", image: "https://images.pexels.com/photos/4505161/pexels-photo-4505161.jpeg?auto=compress&cs=tinysrgb&w=400", price: "₹599" },
  { title: "All Plants", desc: "Explore entire range", image: "https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg?auto=compress&cs=tinysrgb&w=400", price: "From ₹249" },
];

export default function PlantsSection() {
  return (
    <section className="w-full bg-[#EBF3ED] py-8 px-4 sm:px-6 lg:px-10 xl:px-14 my-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="font-display text-xl sm:text-2xl font-bold text-botanical">
            Plants for Every Vibe
          </h2>
          <p className="text-xs sm:text-sm text-charcoal/70 mt-1">
            Breathe green life into your personal spaces
          </p>
        </div>
        <a href="#" className="text-xs sm:text-sm font-semibold text-rose hover:text-rose-dark transition-colors">
          View All Plants &rarr;
        </a>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {plants.map((plant) => (
          <a key={plant.title} href="#" className="group bg-white rounded-xl p-3 border border-rose-light/30 shadow-xs hover:shadow-md transition-all flex flex-col items-center text-center overflow-hidden">
            <div className="w-full h-32 rounded-lg overflow-hidden bg-blush/50 mb-3">
              <img src={plant.image} alt={plant.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
            <h3 className="font-semibold text-sm text-botanical">
              {plant.title}
            </h3>
            <p className="text-xs text-charcoal/60 mt-0.5">
              {plant.desc}
            </p>
            <span className="mt-2 text-xs font-bold text-rose">
              {plant.price}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}