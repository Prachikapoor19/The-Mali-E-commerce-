import React from "react";

const cakeItems = [
  { name: "Chocolate", image: "https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=400", price: "₹599" },
  { name: "Butterscotch", image: "https://images.pexels.com/photos/1721932/pexels-photo-1721932.jpeg?auto=compress&cs=tinysrgb&w=400", price: "₹549" },
  { name: "Fresh Fruit", image: "https://images.pexels.com/photos/1055272/pexels-photo-1055272.jpeg?auto=compress&cs=tinysrgb&w=400", price: "₹699" },
  { name: "Combos", image: "https://images.pexels.com/photos/1407305/pexels-photo-1407305.jpeg?auto=compress&cs=tinysrgb&w=400", price: "₹999" },
  { name: "Pineapple", image: "https://images.pexels.com/photos/1070850/pexels-photo-1070850.jpeg?auto=compress&cs=tinysrgb&w=400", price: "₹499" },
];

export default function FreshlyBakedCakes() {
  return (
    <section className="w-full bg-[#FDF0E3] py-8 px-4 sm:px-6 lg:px-10 xl:px-14 my-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="font-display text-xl sm:text-2xl font-bold text-botanical">
            Freshly Baked Cakes
          </h2>
          <p className="text-xs sm:text-sm text-charcoal/70 mt-1">
            Handcrafted with love for your sweetest celebrations
          </p>
        </div>
        <a key="view-all-cakes" href="#" className="text-xs sm:text-sm font-semibold text-rose hover:text-rose-dark transition-colors">
          View All &rarr;
        </a>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {cakeItems.map((item) => (
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