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
//     <section className="w-full bg-[#FDF0E3] py-8 px-4 sm:px-6 lg:px-10 xl:px-14 my-6">
//       <div className="mb-6 flex items-center justify-between">
//         <div>
//           <h2 className="font-display text-xl sm:text-2xl font-bold text-botanical">
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
//               <div className="w-full h-56 rounded-xl overflow-hidden bg-[#F8F8F8] mb-3">
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
  { name: "Butterscotch", image: "https://images.pexels.com/photos/1721932/pexels-photo-1721932.jpeg?auto=compress&cs=tinysrgb&w=500" },
  { name: "Fresh Fruit", image: "https://images.pexels.com/photos/1055272/pexels-photo-1055272.jpeg?auto=compress&cs=tinysrgb&w=500" },
  { name: "Combos", image: "https://images.pexels.com/photos/1407305/pexels-photo-1407305.jpeg?auto=compress&cs=tinysrgb&w=500" },
  { name: "Pineapple", image: "https://images.pexels.com/photos/1070850/pexels-photo-1070850.jpeg?auto=compress&cs=tinysrgb&w=500" },
];

export default function FreshlyBakedCakes() {
  return (
    <section className="w-full bg-[#FDF0E3] py-8 px-4 sm:px-6 lg:px-10 xl:px-14 my-6">
      <h2 className="font-display text-xl sm:text-2xl font-bold text-botanical mb-6">
        Freshly Baked Cakes
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6">
        {cakeItems.map((item) => (
          <a key={item.name} href="#" className="flex flex-col items-center group">
            {/* Tall Vertical Portrait Card Frame */}
            <div className="w-full aspect-[3/4] rounded-2xl overflow-hidden bg-white/40 shadow-xs border border-white/60 mb-3">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Simple Center-Aligned Category Name */}
            <span className="font-semibold text-xs sm:text-sm text-botanical text-center group-hover:text-rose transition-colors">
              {item.name}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
