// import React from "react";

// const cakeItems = [
//   { name: "Chocolate", image: "https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=400", price: "₹599" },
//   { name: "Butterscotch", image: "https://images.pexels.com/photos/1721932/pexels-photo-1721932.jpeg?auto=compress&cs=tinysrgb&w=400", price: "₹549" },
//   { name: "Fresh Fruit", image: "https://images.pexels.com/photos/1055272/pexels-photo-1055272.jpeg?auto=compress&cs=tinysrgb&w=400", price: "₹699" },
//   { name: "Combos", image: "https://images.pexels.com/photos/1407305/pexels-photo-1407305.jpeg?auto=compress&cs=tinysrgb&w=400", price: "₹999" },
//   { name: "Pineapple", image: "https://images.pexels.com/photos/1070850/pexels-photo-1070850.jpeg?auto=compress&cs=tinysrgb&w=400", price: "₹499" },
// ];

// export default function FreshlyBakedCakes() {
//   return (
//     <section className="w-full bg-sand py-8 sm:py-10 px-4 sm:px-6 lg:px-10 xl:px-14">
//       <div className="mb-6 flex items-center justify-between">
//         <div>
//           <h2 className="section-title">
//             Freshly Baked Cakes
//           </h2>
//           <p className="text-xs sm:text-sm text-charcoal/70 mt-1">
//             Handcrafted with love for your sweetest celebrations
//           </p>
//         </div>
//         <a key="view-all-cakes" href="#" className="text-xs sm:text-sm font-semibold text-rose hover:text-rose-dark transition-colors">
//           View All &rarr;
//         </a>
//       </div>

//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
//         {cakeItems.map((item) => (
//           <div key={item.name} className="bg-white rounded-2xl overflow-hidden p-2.5 border border-rose-light/20 shadow-xs flex flex-col justify-between group">
//             <div>
//               <div className="w-full h-56 rounded-xl overflow-hidden bg-sand mb-3">
//                 <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
//               </div>
//               <div className="text-center pb-2">
//                 <h3 className="font-semibold text-xs sm:text-sm text-botanical">
//                   {item.name}
//                 </h3>
//                 <span className="text-xs font-bold text-rose mt-1 block">
//                   {item.price}
//                 </span>
//               </div>
//             </div>
//             <button className="w-full py-2 bg-rose text-ivory rounded-xl text-xs font-semibold hover:bg-rose-dark transition-colors">
//               Order Now
//             </button>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

import React from "react";

const cakeItems = [
  { name: "Chocolate", image: "https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=500" },
  { name: "Butterscotch", image: "https://images.pexels.com/photos/19252761/pexels-photo-19252761.jpeg?auto=compress&cs=tinysrgb&w=500" },
  { name: "Fresh Fruit", image: "https://images.pexels.com/photos/9553728/pexels-photo-9553728.jpeg?auto=compress&cs=tinysrgb&w=500" },
  { name: "Combos", image: "https://images.pexels.com/photos/34263114/pexels-photo-34263114.jpeg?auto=compress&cs=tinysrgb&w=500" },
  { name: "Pineapple", image: "https://images.pexels.com/photos/8820012/pexels-photo-8820012.jpeg?auto=compress&cs=tinysrgb&w=500" },
];

export default function FreshlyBakedCakes() {
  return (
    <section className="w-full bg-sand py-8 sm:py-10 px-4 sm:px-6 lg:px-10 xl:px-14">
      <div className="mb-8">
        <h2 className="section-title">Freshly Baked Cakes</h2>
        <p className="text-xs sm:text-sm text-charcoal/70 mt-3">Baked on the day of delivery, in the flavours they love.</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 sm:gap-8">
        {cakeItems.map((item) => (
          <a key={item.name} href={`/search?q=${encodeURIComponent(item.name)}`} className="flex flex-col items-center group">
            {/* Round bakery-style frame */}
            <div className="relative w-full aspect-square rounded-full overflow-hidden bg-white ring-4 ring-white shadow-md group-hover:shadow-xl group-hover:-translate-y-1 transition-all duration-300 mb-4">
              <img
                src={item.image}
                alt={item.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>

            {/* Simple Center-Aligned Category Name */}
            <span className="font-display font-semibold text-sm sm:text-base text-botanical text-center group-hover:text-rose transition-colors">
              {item.name}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}