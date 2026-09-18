// "use client";

// import React, { useState } from "react";

// interface Product {
//   id: string;
//   name: string;
//   price: string;
//   rating: string;
//   image: string;
//   tag?: string;
// }

// const bestsellersData: Record<string, Product[]> = {
//   Flowers: [
//     { id: "f1", name: "Red Rose Bouquet", price: "₹699", rating: "4.9 ★", image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&q=80", tag: "Bestseller" },
//     { id: "f2", name: "Orchid Delight", price: "₹1,299", rating: "4.8 ★", image: "https://images.pexels.com/photos/1408221/pexels-photo-1408221.jpeg?auto=compress&cs=tinysrgb&w=400" },
//     { id: "f3", name: "Sunflower Basket", price: "₹899", rating: "4.7 ★", image: "https://images.pexels.com/photos/1366630/pexels-photo-1366630.jpeg?auto=compress&cs=tinysrgb&w=400" },
//     { id: "f4", name: "Mixed Flower Vase", price: "₹1,099", rating: "4.9 ★", image: "https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&cs=tinysrgb&w=400", tag: "Trending" },
//     { id: "f5", name: "Pink Lily Bunch", price: "₹1,149", rating: "4.8 ★", image: "https://images.pexels.com/photos/1083822/pexels-photo-1083822.jpeg?auto=compress&cs=tinysrgb&w=400" },
//     { id: "f6", name: "Carnation Box", price: "₹799", rating: "4.6 ★", image: "https://images.pexels.com/photos/1158783/pexels-photo-1158783.jpeg?auto=compress&cs=tinysrgb&w=400" },
//   ],
//   Cakes: [
//     { id: "c1", name: "Truffle Chocolate Cake", price: "₹599", rating: "4.9 ★", image: "https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=400", tag: "Top Rated" },
//     { id: "c2", name: "Fresh Fruit Delight", price: "₹699", rating: "4.8 ★", image: "https://images.pexels.com/photos/1055272/pexels-photo-1055272.jpeg?auto=compress&cs=tinysrgb&w=400" },
//     { id: "c3", name: "Red Velvet Heart", price: "₹799", rating: "4.9 ★", image: "https://images.pexels.com/photos/1407305/pexels-photo-1407305.jpeg?auto=compress&cs=tinysrgb&w=400" },
//     { id: "c4", name: "Butterscotch Crunch", price: "₹549", rating: "4.7 ★", image: "https://images.pexels.com/photos/1721932/pexels-photo-1721932.jpeg?auto=compress&cs=tinysrgb&w=400" },
//     { id: "c5", name: "Black Forest Classic", price: "₹599", rating: "4.8 ★", image: "https://images.pexels.com/photos/2144112/pexels-photo-2144112.jpeg?auto=compress&cs=tinysrgb&w=400" },
//     { id: "c6", name: "Pineapple Cream Cake", price: "₹499", rating: "4.6 ★", image: "https://images.pexels.com/photos/1070850/pexels-photo-1070850.jpeg?auto=compress&cs=tinysrgb&w=400" },
//   ],
//   Personalised: [
//     { id: "p1", name: "Custom LED Photo Frame", price: "₹899", rating: "4.9 ★", image: "https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg?auto=compress&cs=tinysrgb&w=400" },
//     { id: "p2", name: "Engraved Wooden Mug", price: "₹499", rating: "4.7 ★", image: "https://images.pexels.com/photos/1207918/pexels-photo-1207918.jpeg?auto=compress&cs=tinysrgb&w=400" },
//     { id: "p3", name: "Personalised Cushion", price: "₹399", rating: "4.8 ★", image: "https://images.pexels.com/photos/1248583/pexels-photo-1248583.jpeg?auto=compress&cs=tinysrgb&w=400" },
//     { id: "p4", name: "Customized Keychain", price: "₹299", rating: "4.6 ★", image: "https://images.pexels.com/photos/1194036/pexels-photo-1194036.jpeg?auto=compress&cs=tinysrgb&w=400" },
//     { id: "p5", name: "Magic Mug", price: "₹449", rating: "4.8 ★", image: "https://images.pexels.com/photos/1566308/pexels-photo-1566308.jpeg?auto=compress&cs=tinysrgb&w=400" },
//     { id: "p6", name: "Custom Calendar", price: "₹599", rating: "4.7 ★", image: "https://images.pexels.com/photos/2730883/pexels-photo-2730883.jpeg?auto=compress&cs=tinysrgb&w=400" },
//   ],
//   Hampers: [
//     { id: "h1", name: "Luxury Gourmet Box", price: "₹2,499", rating: "4.9 ★", image: "https://images.pexels.com/photos/264771/pexels-photo-264771.jpeg?auto=compress&cs=tinysrgb&w=400", tag: "Luxury" },
//     { id: "h2", name: "Spa & Wellness Kit", price: "₹1,899", rating: "4.8 ★", image: "https://images.pexels.com/photos/6621472/pexels-photo-6621472.jpeg?auto=compress&cs=tinysrgb&w=400" },
//     { id: "h3", name: "Chocolate Basket", price: "₹1,299", rating: "4.7 ★", image: "https://images.pexels.com/photos/918327/pexels-photo-918327.jpeg?auto=compress&cs=tinysrgb&w=400" },
//     { id: "h4", name: "Dry Fruits Celebration", price: "₹1,599", rating: "4.9 ★", image: "https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=400" },
//     { id: "h5", name: "Self Care Luxury Box", price: "₹2,199", rating: "4.8 ★", image: "https://images.pexels.com/photos/3735657/pexels-photo-3735657.jpeg?auto=compress&cs=tinysrgb&w=400" },
//     { id: "h6", name: "Coffee Connoisseur Set", price: "₹1,799", rating: "4.9 ★", image: "https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&w=400" },
//   ],
//   Chocolates: [
//     { id: "ch1", name: "Ferrero Rocher Tower", price: "₹1,199", rating: "4.9 ★", image: "https://images.pexels.com/photos/918327/pexels-photo-918327.jpeg?auto=compress&cs=tinysrgb&w=400" },
//     { id: "ch2", name: "Handcrafted Truffles", price: "₹899", rating: "4.8 ★", image: "https://images.pexels.com/photos/65882/chocolate-dark-coffee-confiserie-65882.jpeg?auto=compress&cs=tinysrgb&w=400" },
//     { id: "ch3", name: "Cadbury Celebrations", price: "₹499", rating: "4.7 ★", image: "https://images.pexels.com/photos/4110004/pexels-photo-4110004.jpeg?auto=compress&cs=tinysrgb&w=400" },
//     { id: "ch4", name: "Belgian Dark Chocolate", price: "₹999", rating: "4.9 ★", image: "https://images.pexels.com/photos/3735657/pexels-photo-3735657.jpeg?auto=compress&cs=tinysrgb&w=400" },
//     { id: "ch5", name: "Assorted Chocolate Bouquet", price: "₹1,099", rating: "4.8 ★", image: "https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&cs=tinysrgb&w=400" },
//     { id: "ch6", name: "Imported Chocolate Tray", price: "₹1,499", rating: "4.9 ★", image: "https://images.pexels.com/photos/918327/pexels-photo-918327.jpeg?auto=compress&cs=tinysrgb&w=400" },
//   ],
// };

// export default function BestsellersSection() {
//   const [activeTab, setActiveTab] = useState<string>("Flowers");
//   const categories = ["Flowers", "Cakes", "Personalised", "Hampers", "Chocolates"];

//   return (
//     <section className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 py-8">
//       <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
//         <div>
//           <h2 className="font-display text-xl sm:text-2xl font-bold text-botanical">
//             Shop By Bestsellers
//           </h2>
//           <p className="text-xs sm:text-sm text-charcoal/70 mt-1">
//             Handpicked favorites loved by thousands across Lucknow
//           </p>
//         </div>

//         <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
//           {categories.map((cat) => (
//             <button
//               key={cat}
//               onClick={() => setActiveTab(cat)}
//               className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
//                 activeTab === cat
//                   ? "bg-rose text-ivory shadow-xs"
//                   : "bg-blush/40 text-charcoal/80 hover:bg-blush"
//               }`}
//             >
//               {cat}
//             </button>
//           ))}
//         </div>
//       </div>

//       <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
//         {bestsellersData[activeTab]?.map((item) => (
//           <div key={item.id} className="group bg-white rounded-xl overflow-hidden border border-rose-light/20 shadow-xs hover:shadow-md transition-all flex flex-col">
//             <div className="relative w-full h-40 bg-blush/20 overflow-hidden">
//               <img
//                 src={item.image}
//                 alt={item.name}
//                 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//               />
//               {item.tag && (
//                 <span className="absolute top-2 left-2 bg-gold text-botanical font-bold text-[10px] px-2 py-0.5 rounded-full shadow-xs">
//                   {item.tag}
//                 </span>
//               )}
//             </div>
            
//             <div className="p-3 flex flex-col flex-1 justify-between">
//               <div>
//                 <div className="flex items-center justify-between text-[11px] text-charcoal/60 mb-1">
//                   <span>In Stock</span>
//                   <span className="font-semibold text-rose">{item.rating}</span>
//                 </div>
//                 <h3 className="font-medium text-xs sm:text-sm text-botanical line-clamp-1">
//                   {item.name}
//                 </h3>
//               </div>

//               <div className="mt-3 flex items-center justify-between">
//                 <span className="font-bold text-xs sm:text-sm text-botanical">{item.price}</span>
//                 <button className="px-2.5 py-1 bg-rose text-ivory rounded text-[11px] font-medium hover:bg-rose-dark transition-colors">
//                   Order Now
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

"use client";

import React, { useState } from "react";

interface Product {
  id: string;
  name: string;
  price: string;
  originalPrice: string;
  discount: string;
  rating: string;
  image: string;
  badge?: string;
  tagColor?: string;
}

const bestsellersData: Record<string, Product[]> = {
  Flowers: [
    {
      id: "f1",
      name: "The Classic Red Rose Delight",
      price: "₹549",
      originalPrice: "₹649",
      discount: "15% OFF",
      rating: "4.9 ★",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&q=80",
      badge: "Wifey Wants This",
      tagColor: "bg-[#7A1C4B]",
    },
    {
      id: "f2",
      name: "Hot Girl Bouquet",
      price: "₹899",
      originalPrice: "₹999",
      discount: "10% OFF",
      rating: "4.8 ★",
      image: "https://images.pexels.com/photos/1408221/pexels-photo-1408221.jpeg?auto=compress&cs=tinysrgb&w=400",
      badge: "Wifey Wants This",
      tagColor: "bg-[#7A1C4B]",
    },
    {
      id: "f3",
      name: "Blue Horizon Blooms",
      price: "₹2,199",
      originalPrice: "₹2,449",
      discount: "10% OFF",
      rating: "4.7 ★",
      image: "https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&cs=tinysrgb&w=400",
      badge: "Bestseller",
      tagColor: "bg-gold text-botanical",
    },
    {
      id: "f4",
      name: "For My Better Half",
      price: "₹499",
      originalPrice: "₹599",
      discount: "16% OFF",
      rating: "4.9 ★",
      image: "https://images.pexels.com/photos/1083822/pexels-photo-1083822.jpeg?auto=compress&cs=tinysrgb&w=400",
      badge: "Wifey Wants This",
      tagColor: "bg-[#7A1C4B]",
    },
    {
      id: "f5",
      name: "Sunlit Charm Sunflower",
      price: "₹2,399",
      originalPrice: "₹2,799",
      discount: "14% OFF",
      rating: "4.8 ★",
      image: "https://images.pexels.com/photos/1366630/pexels-photo-1366630.jpeg?auto=compress&cs=tinysrgb&w=400",
      badge: "Bestseller",
      tagColor: "bg-gold text-botanical",
    },
  ],
  Cakes: [
    {
      id: "c1",
      name: "Truffle Chocolate Cake",
      price: "₹599",
      originalPrice: "₹699",
      discount: "14% OFF",
      rating: "4.9 ★",
      image: "https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=400",
      badge: "Top Rated",
      tagColor: "bg-rose",
    },
    {
      id: "c2",
      name: "Fresh Fruit Delight",
      price: "₹699",
      originalPrice: "₹799",
      discount: "12% OFF",
      rating: "4.8 ★",
      image: "https://images.pexels.com/photos/1055272/pexels-photo-1055272.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      id: "c3",
      name: "Red Velvet Heart Cake",
      price: "₹799",
      originalPrice: "₹899",
      discount: "11% OFF",
      rating: "4.9 ★",
      image: "https://images.pexels.com/photos/1407305/pexels-photo-1407305.jpeg?auto=compress&cs=tinysrgb&w=400",
      badge: "Bestseller",
      tagColor: "bg-gold text-botanical",
    },
    {
      id: "c4",
      name: "Butterscotch Crunch",
      price: "₹549",
      originalPrice: "₹649",
      discount: "15% OFF",
      rating: "4.7 ★",
      image: "https://images.pexels.com/photos/1721932/pexels-photo-1721932.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      id: "c5",
      name: "Black Forest Classic",
      price: "₹599",
      originalPrice: "₹699",
      discount: "14% OFF",
      rating: "4.8 ★",
      image: "https://images.pexels.com/photos/2144112/pexels-photo-2144112.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
  ],
  Personalised: [
    {
      id: "p1",
      name: "Custom LED Photo Frame",
      price: "₹899",
      originalPrice: "₹1,099",
      discount: "18% OFF",
      rating: "4.9 ★",
      image: "https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg?auto=compress&cs=tinysrgb&w=400",
      badge: "Personalise It!",
      tagColor: "bg-botanical",
    },
    {
      id: "p2",
      name: "Engraved Wooden Mug",
      price: "₹499",
      originalPrice: "₹599",
      discount: "16% OFF",
      rating: "4.7 ★",
      image: "https://images.pexels.com/photos/1207918/pexels-photo-1207918.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      id: "p3",
      name: "Personalised Cushion",
      price: "₹399",
      originalPrice: "₹499",
      discount: "20% OFF",
      rating: "4.8 ★",
      image: "https://images.pexels.com/photos/1248583/pexels-photo-1248583.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      id: "p4",
      name: "Customized Keychain",
      price: "₹299",
      originalPrice: "₹399",
      discount: "25% OFF",
      rating: "4.6 ★",
      image: "https://images.pexels.com/photos/1194036/pexels-photo-1194036.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      id: "p5",
      name: "Magic Personalised Mug",
      price: "₹449",
      originalPrice: "₹549",
      discount: "18% OFF",
      rating: "4.8 ★",
      image: "https://images.pexels.com/photos/1566308/pexels-photo-1566308.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
  ],
  Hampers: [
    {
      id: "h1",
      name: "Luxury Gourmet Box",
      price: "₹2,499",
      originalPrice: "₹2,999",
      discount: "16% OFF",
      rating: "4.9 ★",
      image: "https://images.pexels.com/photos/264771/pexels-photo-264771.jpeg?auto=compress&cs=tinysrgb&w=400",
      badge: "LUXE",
      tagColor: "bg-botanical",
    },
    {
      id: "h2",
      name: "Spa & Wellness Kit",
      price: "₹1,899",
      originalPrice: "₹2,199",
      discount: "13% OFF",
      rating: "4.8 ★",
      image: "https://images.pexels.com/photos/6621472/pexels-photo-6621472.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      id: "h3",
      name: "Chocolate Basket",
      price: "₹1,299",
      originalPrice: "₹1,499",
      discount: "13% OFF",
      rating: "4.7 ★",
      image: "https://images.pexels.com/photos/918327/pexels-photo-918327.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      id: "h4",
      name: "Dry Fruits Celebration",
      price: "₹1,599",
      originalPrice: "₹1,899",
      discount: "15% OFF",
      rating: "4.9 ★",
      image: "https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      id: "h5",
      name: "Self Care Luxury Box",
      price: "₹2,199",
      originalPrice: "₹2,499",
      discount: "12% OFF",
      rating: "4.8 ★",
      image: "https://images.pexels.com/photos/3735657/pexels-photo-3735657.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
  ],
  Chocolates: [
    {
      id: "ch1",
      name: "Ferrero Rocher Tower",
      price: "₹1,199",
      originalPrice: "₹1,399",
      discount: "14% OFF",
      rating: "4.9 ★",
      image: "https://images.pexels.com/photos/918327/pexels-photo-918327.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      id: "ch2",
      name: "Handcrafted Truffles",
      price: "₹899",
      originalPrice: "₹999",
      discount: "10% OFF",
      rating: "4.8 ★",
      image: "https://images.pexels.com/photos/65882/chocolate-dark-coffee-confiserie-65882.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      id: "ch3",
      name: "Cadbury Celebrations",
      price: "₹499",
      originalPrice: "₹599",
      discount: "16% OFF",
      rating: "4.7 ★",
      image: "https://images.pexels.com/photos/4110004/pexels-photo-4110004.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      id: "ch4",
      name: "Belgian Dark Chocolate",
      price: "₹999",
      originalPrice: "₹1,199",
      discount: "16% OFF",
      rating: "4.9 ★",
      image: "https://images.pexels.com/photos/3735657/pexels-photo-3735657.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      id: "ch5",
      name: "Assorted Chocolate Bouquet",
      price: "₹1,099",
      originalPrice: "₹1,299",
      discount: "15% OFF",
      rating: "4.8 ★",
      image: "https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
  ],
};

export default function BestsellersSection() {
  const [activeTab, setActiveTab] = useState<string>("Flowers");
  const categories = ["Flowers", "Cakes", "Personalised", "Hampers", "Chocolates"];

  return (
    <section className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 py-8">
      {/* Category Tabs */}
      <div className="flex items-center gap-3 overflow-x-auto pb-4 mb-4 scrollbar-none border-b border-rose-light/20">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`px-5 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === cat
                ? "bg-rose text-ivory shadow-xs"
                : "bg-blush/40 text-charcoal/80 hover:bg-blush"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* FNP Product Grid (Tall Portrait Cards) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {bestsellersData[activeTab]?.map((item) => (
          <a
            key={item.id}
            href="#"
            className="group bg-white rounded-2xl overflow-hidden border border-rose-light/20 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              {/* Tall Vertical Portrait Image Container */}
              <div className="relative w-full h-64 bg-[#F8F8F8] overflow-hidden flex items-center justify-center p-2">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Title & Tag Info */}
              <div className="p-3">
                <h3 className="font-semibold text-xs sm:text-sm text-botanical line-clamp-1">
                  {item.name}
                </h3>

                {item.badge && (
                  <span
                    className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded text-white mt-1.5 ${
                      item.tagColor || "bg-rose"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}

                {/* Price Display */}
                <div className="mt-2 flex items-center gap-1.5 flex-wrap">
                  <span className="font-bold text-sm text-botanical">{item.price}</span>
                  <span className="text-xs text-charcoal/40 line-through">
                    {item.originalPrice}
                  </span>
                  <span className="text-[10px] font-bold text-emerald-600">
                    {item.discount}
                  </span>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>

      <div className="mt-8 text-center">
        <button className="px-6 py-2.5 border border-rose text-rose rounded-full text-xs font-bold hover:bg-rose hover:text-ivory transition-colors">
          View All {activeTab} &rarr;
        </button>
      </div>
    </section>
  );
}