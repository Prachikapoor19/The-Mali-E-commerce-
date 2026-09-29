// // "use client";

// // import React, { useState } from "react";

// // interface Product {
// //   id: string;
// //   name: string;
// //   price: string;
// //   originalPrice: string;
// //   discount: string;
// //   rating: string;
// //   image: string;
// //   badge?: string;
// //   tagColor?: string;
// // }

// // const bestsellersData: Record<string, Product[]> = {
// //   Flowers: [
// //     {
// //       id: "f1",
// //       name: "The Classic Red Rose Delight",
// //       price: "₹549",
// //       originalPrice: "₹649",
// //       discount: "15% OFF",
// //       rating: "4.9 ★",
// //       image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&q=80",
// //       badge: "Wifey Wants This",
// //       tagColor: "bg-rose-dark",
// //     },
// //     {
// //       id: "f2",
// //       name: "Hot Girl Bouquet",
// //       price: "₹899",
// //       originalPrice: "₹999",
// //       discount: "10% OFF",
// //       rating: "4.8 ★",
// //       image: "https://images.pexels.com/photos/1408221/pexels-photo-1408221.jpeg?auto=compress&cs=tinysrgb&w=400",
// //       badge: "Wifey Wants This",
// //       tagColor: "bg-rose-dark",
// //     },
// //     {
// //       id: "f3",
// //       name: "Blue Horizon Blooms",
// //       price: "₹2,199",
// //       originalPrice: "₹2,449",
// //       discount: "10% OFF",
// //       rating: "4.7 ★",
// //       image: "https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&cs=tinysrgb&w=400",
// //       badge: "Bestseller",
// //       tagColor: "bg-gold text-botanical",
// //     },
// //     {
// //       id: "f4",
// //       name: "For My Better Half",
// //       price: "₹499",
// //       originalPrice: "₹599",
// //       discount: "16% OFF",
// //       rating: "4.9 ★",
// //       image: "https://images.pexels.com/photos/1083822/pexels-photo-1083822.jpeg?auto=compress&cs=tinysrgb&w=400",
// //       badge: "Wifey Wants This",
// //       tagColor: "bg-rose-dark",
// //     },
// //     {
// //       id: "f5",
// //       name: "Sunlit Charm Sunflower",
// //       price: "₹2,399",
// //       originalPrice: "₹2,799",
// //       discount: "14% OFF",
// //       rating: "4.8 ★",
// //       image: "https://images.pexels.com/photos/1366630/pexels-photo-1366630.jpeg?auto=compress&cs=tinysrgb&w=400",
// //       badge: "Bestseller",
// //       tagColor: "bg-gold text-botanical",
// //     },
// //   ],
// //   Cakes: [
// //     {
// //       id: "c1",
// //       name: "Truffle Chocolate Cake",
// //       price: "₹599",
// //       originalPrice: "₹699",
// //       discount: "14% OFF",
// //       rating: "4.9 ★",
// //       image: "https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=400",
// //       badge: "Top Rated",
// //       tagColor: "bg-rose",
// //     },
// //     {
// //       id: "c2",
// //       name: "Fresh Fruit Delight",
// //       price: "₹699",
// //       originalPrice: "₹799",
// //       discount: "12% OFF",
// //       rating: "4.8 ★",
// //       image: "https://images.pexels.com/photos/1055272/pexels-photo-1055272.jpeg?auto=compress&cs=tinysrgb&w=400",
// //     },
// //     {
// //       id: "c3",
// //       name: "Red Velvet Heart Cake",
// //       price: "₹799",
// //       originalPrice: "₹899",
// //       discount: "11% OFF",
// //       rating: "4.9 ★",
// //       image: "https://images.pexels.com/photos/1407305/pexels-photo-1407305.jpeg?auto=compress&cs=tinysrgb&w=400",
// //       badge: "Bestseller",
// //       tagColor: "bg-gold text-botanical",
// //     },
// //     {
// //       id: "c4",
// //       name: "Butterscotch Crunch",
// //       price: "₹549",
// //       originalPrice: "₹649",
// //       discount: "15% OFF",
// //       rating: "4.7 ★",
// //       image: "https://images.pexels.com/photos/1721932/pexels-photo-1721932.jpeg?auto=compress&cs=tinysrgb&w=400",
// //     },
// //     {
// //       id: "c5",
// //       name: "Black Forest Classic",
// //       price: "₹599",
// //       originalPrice: "₹699",
// //       discount: "14% OFF",
// //       rating: "4.8 ★",
// //       image: "https://images.pexels.com/photos/2144112/pexels-photo-2144112.jpeg?auto=compress&cs=tinysrgb&w=400",
// //     },
// //   ],
// //   Personalised: [
// //     {
// //       id: "p1",
// //       name: "Custom LED Photo Frame",
// //       price: "₹899",
// //       originalPrice: "₹1,099",
// //       discount: "18% OFF",
// //       rating: "4.9 ★",
// //       image: "https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg?auto=compress&cs=tinysrgb&w=400",
// //       badge: "Personalise It!",
// //       tagColor: "bg-botanical",
// //     },
// //     {
// //       id: "p2",
// //       name: "Engraved Wooden Mug",
// //       price: "₹499",
// //       originalPrice: "₹599",
// //       discount: "16% OFF",
// //       rating: "4.7 ★",
// //       image: "https://images.pexels.com/photos/1207918/pexels-photo-1207918.jpeg?auto=compress&cs=tinysrgb&w=400",
// //     },
// //     {
// //       id: "p3",
// //       name: "Personalised Cushion",
// //       price: "₹399",
// //       originalPrice: "₹499",
// //       discount: "20% OFF",
// //       rating: "4.8 ★",
// //       image: "https://images.pexels.com/photos/1248583/pexels-photo-1248583.jpeg?auto=compress&cs=tinysrgb&w=400",
// //     },
// //     {
// //       id: "p4",
// //       name: "Customized Keychain",
// //       price: "₹299",
// //       originalPrice: "₹399",
// //       discount: "25% OFF",
// //       rating: "4.6 ★",
// //       image: "https://images.pexels.com/photos/1194036/pexels-photo-1194036.jpeg?auto=compress&cs=tinysrgb&w=400",
// //     },
// //     {
// //       id: "p5",
// //       name: "Magic Personalised Mug",
// //       price: "₹449",
// //       originalPrice: "₹549",
// //       discount: "18% OFF",
// //       rating: "4.8 ★",
// //       image: "https://images.pexels.com/photos/1566308/pexels-photo-1566308.jpeg?auto=compress&cs=tinysrgb&w=400",
// //     },
// //   ],
// //   Hampers: [
// //     {
// //       id: "h1",
// //       name: "Luxury Gourmet Box",
// //       price: "₹2,499",
// //       originalPrice: "₹2,999",
// //       discount: "16% OFF",
// //       rating: "4.9 ★",
// //       image: "https://images.pexels.com/photos/264771/pexels-photo-264771.jpeg?auto=compress&cs=tinysrgb&w=400",
// //       badge: "LUXE",
// //       tagColor: "bg-botanical",
// //     },
// //     {
// //       id: "h2",
// //       name: "Spa & Wellness Kit",
// //       price: "₹1,899",
// //       originalPrice: "₹2,199",
// //       discount: "13% OFF",
// //       rating: "4.8 ★",
// //       image: "https://images.pexels.com/photos/6621472/pexels-photo-6621472.jpeg?auto=compress&cs=tinysrgb&w=400",
// //     },
// //     {
// //       id: "h3",
// //       name: "Chocolate Basket",
// //       price: "₹1,299",
// //       originalPrice: "₹1,499",
// //       discount: "13% OFF",
// //       rating: "4.7 ★",
// //       image: "https://images.pexels.com/photos/918327/pexels-photo-918327.jpeg?auto=compress&cs=tinysrgb&w=400",
// //     },
// //     {
// //       id: "h4",
// //       name: "Dry Fruits Celebration",
// //       price: "₹1,599",
// //       originalPrice: "₹1,899",
// //       discount: "15% OFF",
// //       rating: "4.9 ★",
// //       image: "https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=400",
// //     },
// //     {
// //       id: "h5",
// //       name: "Self Care Luxury Box",
// //       price: "₹2,199",
// //       originalPrice: "₹2,499",
// //       discount: "12% OFF",
// //       rating: "4.8 ★",
// //       image: "https://images.pexels.com/photos/3735657/pexels-photo-3735657.jpeg?auto=compress&cs=tinysrgb&w=400",
// //     },
// //   ],
// //   Chocolates: [
// //     {
// //       id: "ch1",
// //       name: "Ferrero Rocher Tower",
// //       price: "₹1,199",
// //       originalPrice: "₹1,399",
// //       discount: "14% OFF",
// //       rating: "4.9 ★",
// //       image: "https://images.pexels.com/photos/918327/pexels-photo-918327.jpeg?auto=compress&cs=tinysrgb&w=400",
// //     },
// //     {
// //       id: "ch2",
// //       name: "Handcrafted Truffles",
// //       price: "₹899",
// //       originalPrice: "₹999",
// //       discount: "10% OFF",
// //       rating: "4.8 ★",
// //       image: "https://images.pexels.com/photos/65882/chocolate-dark-coffee-confiserie-65882.jpeg?auto=compress&cs=tinysrgb&w=400",
// //     },
// //     {
// //       id: "ch3",
// //       name: "Cadbury Celebrations",
// //       price: "₹499",
// //       originalPrice: "₹599",
// //       discount: "16% OFF",
// //       rating: "4.7 ★",
// //       image: "https://images.pexels.com/photos/4110004/pexels-photo-4110004.jpeg?auto=compress&cs=tinysrgb&w=400",
// //     },
// //     {
// //       id: "ch4",
// //       name: "Belgian Dark Chocolate",
// //       price: "₹999",
// //       originalPrice: "₹1,199",
// //       discount: "16% OFF",
// //       rating: "4.9 ★",
// //       image: "https://images.pexels.com/photos/3735657/pexels-photo-3735657.jpeg?auto=compress&cs=tinysrgb&w=400",
// //     },
// //     {
// //       id: "ch5",
// //       name: "Assorted Chocolate Bouquet",
// //       price: "₹1,099",
// //       originalPrice: "₹1,299",
// //       discount: "15% OFF",
// //       rating: "4.8 ★",
// //       image: "https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&cs=tinysrgb&w=400",
// //     },
// //   ],
// // };

// // const tabIcons: Record<string, string> = {
// //   Flowers: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=100&q=80",
// //   Cakes: "https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=100",
// //   Personalised: "https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg?auto=compress&cs=tinysrgb&w=100",
// //   Hampers: "https://images.pexels.com/photos/264771/pexels-photo-264771.jpeg?auto=compress&cs=tinysrgb&w=100",
// //   Chocolates: "https://images.pexels.com/photos/65882/chocolate-dark-coffee-confiserie-65882.jpeg?auto=compress&cs=tinysrgb&w=100",
// // };

// // export default function BestsellersSection() {
// //   const [activeTab, setActiveTab] = useState<string>("Flowers");
// //   const categories = ["Flowers", "Cakes", "Personalised", "Hampers", "Chocolates"];

// //   return (
// //     <section className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 py-8">
// //       {/* Section Title & Subtitle */}
// //       <div className="mb-4">
// //         <h2 className="section-title">
// //           Shop By Bestsellers
// //         </h2>
// //         <p className="text-xs sm:text-sm text-charcoal/70 mt-1">
// //           Discover India&apos;s favourite gifting options, curated bestsellers that make every celebration extra special
// //         </p>
// //       </div>

// //       {/* Category Tabs with Icons */}
// //       <div className="flex items-center gap-6 overflow-x-auto pb-3 mb-6 scrollbar-none border-b border-rose-light/20">
// //         {categories.map((cat) => (
// //           <button
// //             key={cat}
// //             onClick={() => setActiveTab(cat)}
// //             className={`flex items-center gap-2 pb-2 text-xs font-bold whitespace-nowrap border-b-2 transition-all ${
// //               activeTab === cat
// //                 ? "border-rose text-rose"
// //                 : "border-transparent text-charcoal/70 hover:text-botanical"
// //             }`}
// //           >
// //             <div className="w-6 h-6 rounded-full overflow-hidden border border-rose-light/40 shrink-0">
// //               <img src={tabIcons[cat]} alt={cat} className="w-full h-full object-cover" />
// //             </div>
// //             <span>{cat}</span>
// //           </button>
// //         ))}
// //       </div>

// //       {/* Product Cards */}
// //       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
// //         {bestsellersData[activeTab]?.map((item) => (
// //           <a
// //             key={item.id}
// //             href="#"
// //             className="group bg-white rounded-2xl overflow-hidden border border-rose-light/20 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
// //           >
// //             <div>
// //               <div className="relative w-full h-64 bg-sand overflow-hidden flex items-center justify-center p-2">
// //                 <img
// //                   src={item.image}
// //                   alt={item.name}
// //                   className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
// //                 />
// //               </div>

// //               <div className="p-3">
// //                 <h3 className="font-semibold text-xs sm:text-sm text-botanical line-clamp-1">
// //                   {item.name}
// //                 </h3>

// //                 {item.badge && (
// //                   <span
// //                     className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded text-white mt-1.5 ${
// //                       item.tagColor || "bg-rose"
// //                     }`}
// //                   >
// //                     {item.badge}
// //                   </span>
// //                 )}

// //                 <div className="mt-2 flex items-center gap-1.5 flex-wrap">
// //                   <span className="font-bold text-sm text-botanical">{item.price}</span>
// //                   <span className="text-xs text-charcoal/40 line-through">
// //                     {item.originalPrice}
// //                   </span>
// //                   <span className="text-[10px] font-bold text-rose">
// //                     {item.discount}
// //                   </span>
// //                 </div>
// //               </div>
// //             </div>
// //           </a>
// //         ))}
// //       </div>

// //       <div className="mt-8 text-center">
// //         <button className="px-6 py-2 border border-rose-light/60 text-botanical rounded-xl text-xs font-semibold hover:bg-rose hover:text-ivory transition-colors">
// //           View All {activeTab} &gt;
// //         </button>
// //       </div>
// //     </section>
// //   );
// // }

// "use client";

// import React, { useState } from "react";
// import { useCart } from "./CartContext";

// interface Product {
//   id: string;
//   name: string;
//   price: string;
//   originalPrice: string;
//   discount: string;
//   rating: string;
//   image: string;
//   badge?: string;
//   tagColor?: string;
// }

// const bestsellersData: Record<string, Product[]> = {
//   Flowers: [
//     {
//       id: "f1",
//       name: "The Classic Red Rose Delight",
//       price: "₹549",
//       originalPrice: "₹649",
//       discount: "15% OFF",
//       rating: "4.9 ★",
//       image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&q=80",
//       badge: "Wifey Wants This",
//       tagColor: "bg-rose-dark",
//     },
//     {
//       id: "f2",
//       name: "Hot Girl Bouquet",
//       price: "₹899",
//       originalPrice: "₹999",
//       discount: "10% OFF",
//       rating: "4.8 ★",
//       image: "https://images.pexels.com/photos/1408221/pexels-photo-1408221.jpeg?auto=compress&cs=tinysrgb&w=400",
//       badge: "Wifey Wants This",
//       tagColor: "bg-rose-dark",
//     },
//     {
//       id: "f3",
//       name: "Blue Horizon Blooms",
//       price: "₹2,199",
//       originalPrice: "₹2,449",
//       discount: "10% OFF",
//       rating: "4.7 ★",
//       image: "https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&cs=tinysrgb&w=400",
//       badge: "Bestseller",
//       tagColor: "bg-gold text-botanical",
//     },
//     {
//       id: "f4",
//       name: "For My Better Half",
//       price: "₹499",
//       originalPrice: "₹599",
//       discount: "16% OFF",
//       rating: "4.9 ★",
//       image: "https://images.pexels.com/photos/1083822/pexels-photo-1083822.jpeg?auto=compress&cs=tinysrgb&w=400",
//       badge: "Wifey Wants This",
//       tagColor: "bg-rose-dark",
//     },
//     {
//       id: "f5",
//       name: "Sunlit Charm Sunflower",
//       price: "₹2,399",
//       originalPrice: "₹2,799",
//       discount: "14% OFF",
//       rating: "4.8 ★",
//       image: "https://images.pexels.com/photos/1366630/pexels-photo-1366630.jpeg?auto=compress&cs=tinysrgb&w=400",
//       badge: "Bestseller",
//       tagColor: "bg-gold text-botanical",
//     },
//   ],
//   Cakes: [
//     {
//       id: "c1",
//       name: "Truffle Chocolate Cake",
//       price: "₹599",
//       originalPrice: "₹699",
//       discount: "14% OFF",
//       rating: "4.9 ★",
//       image: "https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=400",
//       badge: "Top Rated",
//       tagColor: "bg-rose",
//     },
//     {
//       id: "c2",
//       name: "Fresh Fruit Delight",
//       price: "₹699",
//       originalPrice: "₹799",
//       discount: "12% OFF",
//       rating: "4.8 ★",
//       image: "https://images.pexels.com/photos/1055272/pexels-photo-1055272.jpeg?auto=compress&cs=tinysrgb&w=400",
//     },
//     {
//       id: "c3",
//       name: "Red Velvet Heart Cake",
//       price: "₹799",
//       originalPrice: "₹899",
//       discount: "11% OFF",
//       rating: "4.9 ★",
//       image: "https://images.pexels.com/photos/1407305/pexels-photo-1407305.jpeg?auto=compress&cs=tinysrgb&w=400",
//       badge: "Bestseller",
//       tagColor: "bg-gold text-botanical",
//     },
//     {
//       id: "c4",
//       name: "Butterscotch Crunch",
//       price: "₹549",
//       originalPrice: "₹649",
//       discount: "15% OFF",
//       rating: "4.7 ★",
//       image: "https://images.pexels.com/photos/1721932/pexels-photo-1721932.jpeg?auto=compress&cs=tinysrgb&w=400",
//     },
//     {
//       id: "c5",
//       name: "Black Forest Classic",
//       price: "₹599",
//       originalPrice: "₹699",
//       discount: "14% OFF",
//       rating: "4.8 ★",
//       image: "https://images.pexels.com/photos/2144112/pexels-photo-2144112.jpeg?auto=compress&cs=tinysrgb&w=400",
//     },
//   ],
//   Personalised: [
//     {
//       id: "p1",
//       name: "Custom LED Photo Frame",
//       price: "₹899",
//       originalPrice: "₹1,099",
//       discount: "18% OFF",
//       rating: "4.9 ★",
//       image: "https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg?auto=compress&cs=tinysrgb&w=400",
//       badge: "Personalise It!",
//       tagColor: "bg-botanical",
//     },
//     {
//       id: "p2",
//       name: "Engraved Wooden Mug",
//       price: "₹499",
//       originalPrice: "₹599",
//       discount: "16% OFF",
//       rating: "4.7 ★",
//       image: "https://images.pexels.com/photos/1207918/pexels-photo-1207918.jpeg?auto=compress&cs=tinysrgb&w=400",
//     },
//     {
//       id: "p3",
//       name: "Personalised Cushion",
//       price: "₹399",
//       originalPrice: "₹499",
//       discount: "20% OFF",
//       rating: "4.8 ★",
//       image: "https://images.pexels.com/photos/1248583/pexels-photo-1248583.jpeg?auto=compress&cs=tinysrgb&w=400",
//     },
//     {
//       id: "p4",
//       name: "Customized Keychain",
//       price: "₹299",
//       originalPrice: "₹399",
//       discount: "25% OFF",
//       rating: "4.6 ★",
//       image: "https://images.pexels.com/photos/1194036/pexels-photo-1194036.jpeg?auto=compress&cs=tinysrgb&w=400",
//     },
//     {
//       id: "p5",
//       name: "Magic Personalised Mug",
//       price: "₹449",
//       originalPrice: "₹549",
//       discount: "18% OFF",
//       rating: "4.8 ★",
//       image: "https://images.pexels.com/photos/1566308/pexels-photo-1566308.jpeg?auto=compress&cs=tinysrgb&w=400",
//     },
//   ],
//   Hampers: [
//     {
//       id: "h1",
//       name: "Luxury Gourmet Box",
//       price: "₹2,499",
//       originalPrice: "₹2,999",
//       discount: "16% OFF",
//       rating: "4.9 ★",
//       image: "https://images.pexels.com/photos/264771/pexels-photo-264771.jpeg?auto=compress&cs=tinysrgb&w=400",
//       badge: "LUXE",
//       tagColor: "bg-botanical",
//     },
//     {
//       id: "h2",
//       name: "Spa & Wellness Kit",
//       price: "₹1,899",
//       originalPrice: "₹2,199",
//       discount: "13% OFF",
//       rating: "4.8 ★",
//       image: "https://images.pexels.com/photos/6621472/pexels-photo-6621472.jpeg?auto=compress&cs=tinysrgb&w=400",
//     },
//     {
//       id: "h3",
//       name: "Chocolate Basket",
//       price: "₹1,299",
//       originalPrice: "₹1,499",
//       discount: "13% OFF",
//       rating: "4.7 ★",
//       image: "https://images.pexels.com/photos/918327/pexels-photo-918327.jpeg?auto=compress&cs=tinysrgb&w=400",
//     },
//     {
//       id: "h4",
//       name: "Dry Fruits Celebration",
//       price: "₹1,599",
//       originalPrice: "₹1,899",
//       discount: "15% OFF",
//       rating: "4.9 ★",
//       image: "https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=400",
//     },
//     {
//       id: "h5",
//       name: "Self Care Luxury Box",
//       price: "₹2,199",
//       originalPrice: "₹2,499",
//       discount: "12% OFF",
//       rating: "4.8 ★",
//       image: "https://images.pexels.com/photos/3735657/pexels-photo-3735657.jpeg?auto=compress&cs=tinysrgb&w=400",
//     },
//   ],
//   Chocolates: [
//     {
//       id: "ch1",
//       name: "Ferrero Rocher Tower",
//       price: "₹1,199",
//       originalPrice: "₹1,399",
//       discount: "14% OFF",
//       rating: "4.9 ★",
//       image: "https://images.pexels.com/photos/918327/pexels-photo-918327.jpeg?auto=compress&cs=tinysrgb&w=400",
//     },
//     {
//       id: "ch2",
//       name: "Handcrafted Truffles",
//       price: "₹899",
//       originalPrice: "₹999",
//       discount: "10% OFF",
//       rating: "4.8 ★",
//       image: "https://images.pexels.com/photos/65882/chocolate-dark-coffee-confiserie-65882.jpeg?auto=compress&cs=tinysrgb&w=400",
//     },
//     {
//       id: "ch3",
//       name: "Cadbury Celebrations",
//       price: "₹499",
//       originalPrice: "₹599",
//       discount: "16% OFF",
//       rating: "4.7 ★",
//       image: "https://images.pexels.com/photos/4110004/pexels-photo-4110004.jpeg?auto=compress&cs=tinysrgb&w=400",
//     },
//     {
//       id: "ch4",
//       name: "Belgian Dark Chocolate",
//       price: "₹999",
//       originalPrice: "₹1,199",
//       discount: "16% OFF",
//       rating: "4.9 ★",
//       image: "https://images.pexels.com/photos/3735657/pexels-photo-3735657.jpeg?auto=compress&cs=tinysrgb&w=400",
//     },
//     {
//       id: "ch5",
//       name: "Assorted Chocolate Bouquet",
//       price: "₹1,099",
//       originalPrice: "₹1,299",
//       discount: "15% OFF",
//       rating: "4.8 ★",
//       image: "https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&cs=tinysrgb&w=400",
//     },
//   ],
// };

// const tabIcons: Record<string, string> = {
//   Flowers: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=100&q=80",
//   Cakes: "https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=100",
//   Personalised: "https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg?auto=compress&cs=tinysrgb&w=100",
//   Hampers: "https://images.pexels.com/photos/264771/pexels-photo-264771.jpeg?auto=compress&cs=tinysrgb&w=100",
//   Chocolates: "https://images.pexels.com/photos/65882/chocolate-dark-coffee-confiserie-65882.jpeg?auto=compress&cs=tinysrgb&w=100",
// };

// export default function BestsellersSection() {
//   const [activeTab, setActiveTab] = useState<string>("Flowers");
//   const { addToCart } = useCart();
//   const categories = ["Flowers", "Cakes", "Personalised", "Hampers", "Chocolates"];

//   return (
//     <section className="w-full px-3 sm:px-6 lg:px-10 xl:px-14 py-8 sm:py-10">
//       {/* Title */}
//       <div className="mb-4">
//         <h2 className="section-title">
//           Shop By Bestsellers
//         </h2>
//         <p className="text-xs sm:text-sm text-charcoal/70 mt-0.5">
//           Discover India&apos;s favourite gifting options, curated bestsellers that make every celebration extra special
//         </p>
//       </div>

//       {/* Tabs */}
//       <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto pb-2.5 mb-4 scrollbar-none border-b border-rose-light/20">
//         {categories.map((cat) => (
//           <button
//             key={cat}
//             onClick={() => setActiveTab(cat)}
//             className={`flex items-center gap-1.5 pb-2 text-xs font-bold whitespace-nowrap border-b-2 transition-all ${
//               activeTab === cat
//                 ? "border-rose text-rose"
//                 : "border-transparent text-charcoal/70 hover:text-botanical"
//             }`}
//           >
//             <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full overflow-hidden border border-rose-light/40 shrink-0">
//               <img src={tabIcons[cat]} alt={cat} className="w-full h-full object-cover" />
//             </div>
//             <span>{cat}</span>
//           </button>
//         ))}
//       </div>

//       {/* Responsive Grid/Carousel Container */}
//       <div className="flex md:grid md:grid-cols-5 gap-3 sm:gap-4 overflow-x-auto md:overflow-visible pb-3 md:pb-0 scrollbar-none snap-x snap-mandatory">
//                 {bestsellersData[activeTab]?.map((item) => (
//           <div
//             key={item.id}
//             className="group bg-white rounded-2xl overflow-hidden border border-rose-light/20 shadow-xs lift-on-hover flex flex-col justify-between shrink-0 w-44 sm:w-52 md:w-auto snap-start"
//           >
//             <div>
//               <div className="relative w-full h-52 sm:h-60 md:h-64 bg-sand overflow-hidden flex items-center justify-center p-2">
//                 <img
//                   src={item.image}
//                   alt={item.name}
//                   className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
//                 />
//               </div>

//               <div className="p-2.5 sm:p-3">
//                 <h3 className="font-semibold text-xs sm:text-sm text-botanical line-clamp-1">
//                   {item.name}
//                 </h3>

//                 {item.badge && (
//                   <span
//                     className={`inline-block text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded text-white mt-1 ${
//                       item.tagColor || "bg-rose"
//                     }`}
//                   >
//                     {item.badge}
//                   </span>
//                 )}

//                 <div className="mt-1.5 flex items-center gap-1.5 flex-wrap">
//                   <span className="font-bold text-xs sm:text-sm text-botanical">{item.price}</span>
//                   <span className="text-[10px] sm:text-xs text-charcoal/40 line-through">
//                     {item.originalPrice}
//                   </span>
//                   <span className="text-[9px] sm:text-[10px] font-bold text-rose">
//                     {item.discount}
//                   </span>
//                 </div>
//               </div>
//             </div>

//             <div className="px-2.5 sm:px-3 pb-2.5 sm:pb-3">
//               <button
//                 onClick={() =>
//                   addToCart({
//                     id: item.id,
//                     name: item.name,
//                     price: Number(item.price.replace(/[^0-9]/g, "")),
//                     image: item.image,
//                   })
//                 }
//                 className="w-full text-[10px] sm:text-xs font-semibold py-1.5 rounded-lg bg-rose text-ivory hover:bg-rose-dark transition-colors"
//               >
//                 Add to Cart
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="mt-6 sm:mt-8 text-center">
//         <button className="px-5 sm:px-6 py-2 border border-rose-light/60 text-botanical rounded-full text-xs font-semibold hover:bg-rose hover:text-ivory transition-colors">
//           View All {activeTab} &gt;
//         </button>
//       </div>
//     </section>
//   );
// }

"use client";

import React, { useState } from "react";
import { useCart } from "./CartContext";
import WishlistButton from "./WishlistButton";

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
  isPersonalised?: boolean;
}

const bestsellersData: Record<string, Product[]> = {
  Flowers: [
    { id: "f1", name: "The Classic Red Rose Delight", price: "₹549", originalPrice: "₹649", discount: "15% OFF", rating: "4.9 ★", image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&q=80", badge: "Wifey Wants This", tagColor: "bg-rose-dark" },
    { id: "f2", name: "Hot Girl Bouquet", price: "₹899", originalPrice: "₹999", discount: "10% OFF", rating: "4.8 ★", image: "https://images.pexels.com/photos/30891127/pexels-photo-30891127.jpeg?auto=compress&cs=tinysrgb&w=400", badge: "Wifey Wants This", tagColor: "bg-rose-dark" },
    { id: "f3", name: "Blue Horizon Blooms", price: "₹2,199", originalPrice: "₹2,449", discount: "10% OFF", rating: "4.7 ★", image: "https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&cs=tinysrgb&w=400", badge: "Bestseller", tagColor: "bg-gold text-botanical" },
    { id: "f4", name: "For My Better Half", price: "₹499", originalPrice: "₹599", discount: "16% OFF", rating: "4.9 ★", image: "https://images.pexels.com/photos/1083822/pexels-photo-1083822.jpeg?auto=compress&cs=tinysrgb&w=400", badge: "Wifey Wants This", tagColor: "bg-rose-dark" },
    { id: "f5", name: "Sunlit Charm Sunflower", price: "₹2,399", originalPrice: "₹2,799", discount: "14% OFF", rating: "4.8 ★", image: "https://images.pexels.com/photos/1366630/pexels-photo-1366630.jpeg?auto=compress&cs=tinysrgb&w=400", badge: "Bestseller", tagColor: "bg-gold text-botanical" },
  ],
  Cakes: [
    { id: "c1", name: "Truffle Chocolate Cake", price: "₹599", originalPrice: "₹699", discount: "14% OFF", rating: "4.9 ★", image: "https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=400", badge: "Top Rated", tagColor: "bg-rose" },
    { id: "c2", name: "Fresh Fruit Delight", price: "₹699", originalPrice: "₹799", discount: "12% OFF", rating: "4.8 ★", image: "https://images.pexels.com/photos/9553728/pexels-photo-9553728.jpeg?auto=compress&cs=tinysrgb&w=400" },
    { id: "c3", name: "Red Velvet Heart Cake", price: "₹799", originalPrice: "₹899", discount: "11% OFF", rating: "4.9 ★", image: "https://images.pexels.com/photos/38774006/pexels-photo-38774006.jpeg?auto=compress&cs=tinysrgb&w=400", badge: "Bestseller", tagColor: "bg-gold text-botanical" },
    { id: "c4", name: "Butterscotch Crunch", price: "₹549", originalPrice: "₹649", discount: "15% OFF", rating: "4.7 ★", image: "https://images.pexels.com/photos/19252761/pexels-photo-19252761.jpeg?auto=compress&cs=tinysrgb&w=400" },
    { id: "c5", name: "Black Forest Classic", price: "₹599", originalPrice: "₹699", discount: "14% OFF", rating: "4.8 ★", image: "https://images.pexels.com/photos/8802102/pexels-photo-8802102.jpeg?auto=compress&cs=tinysrgb&w=400" },
  ],
  Personalised: [
    { id: "p1", name: "Custom LED Photo Frame", price: "₹899", originalPrice: "₹1,099", discount: "18% OFF", rating: "4.9 ★", image: "https://images.pexels.com/photos/9451328/pexels-photo-9451328.jpeg?auto=compress&cs=tinysrgb&w=400", badge: "Personalise It!", tagColor: "bg-botanical", isPersonalised: true },
    { id: "p2", name: "Engraved Wooden Mug", price: "₹499", originalPrice: "₹599", discount: "16% OFF", rating: "4.7 ★", image: "https://images.pexels.com/photos/1207918/pexels-photo-1207918.jpeg?auto=compress&cs=tinysrgb&w=400", isPersonalised: true },
    { id: "p3", name: "Personalised Cushion", price: "₹399", originalPrice: "₹499", discount: "20% OFF", rating: "4.8 ★", image: "https://images.pexels.com/photos/1248583/pexels-photo-1248583.jpeg?auto=compress&cs=tinysrgb&w=400", isPersonalised: true },
    { id: "p4", name: "Customized Keychain", price: "₹299", originalPrice: "₹399", discount: "25% OFF", rating: "4.6 ★", image: "https://images.pexels.com/photos/1194036/pexels-photo-1194036.jpeg?auto=compress&cs=tinysrgb&w=400", isPersonalised: true },
    { id: "p5", name: "Magic Personalised Mug", price: "₹449", originalPrice: "₹549", discount: "18% OFF", rating: "4.8 ★", image: "https://images.pexels.com/photos/1566308/pexels-photo-1566308.jpeg?auto=compress&cs=tinysrgb&w=400", isPersonalised: true },
  ],
  Hampers: [
    { id: "h1", name: "Luxury Gourmet Box", price: "₹2,499", originalPrice: "₹2,999", discount: "16% OFF", rating: "4.9 ★", image: "https://images.pexels.com/photos/264771/pexels-photo-264771.jpeg?auto=compress&cs=tinysrgb&w=400", badge: "LUXE", tagColor: "bg-botanical" },
    { id: "h2", name: "Spa & Wellness Kit", price: "₹1,899", originalPrice: "₹2,199", discount: "13% OFF", rating: "4.8 ★", image: "https://images.pexels.com/photos/6621472/pexels-photo-6621472.jpeg?auto=compress&cs=tinysrgb&w=400" },
    { id: "h3", name: "Chocolate Basket", price: "₹1,299", originalPrice: "₹1,499", discount: "13% OFF", rating: "4.7 ★", image: "https://images.pexels.com/photos/918327/pexels-photo-918327.jpeg?auto=compress&cs=tinysrgb&w=400" },
    { id: "h4", name: "Dry Fruits Celebration", price: "₹1,599", originalPrice: "₹1,899", discount: "15% OFF", rating: "4.9 ★", image: "https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=400" },
    { id: "h5", name: "Self Care Luxury Box", price: "₹2,199", originalPrice: "₹2,499", discount: "12% OFF", rating: "4.8 ★", image: "https://images.pexels.com/photos/17555293/pexels-photo-17555293.jpeg?auto=compress&cs=tinysrgb&w=400" },
  ],
  Chocolates: [
    { id: "ch1", name: "Ferrero Rocher Tower", price: "₹1,199", originalPrice: "₹1,399", discount: "14% OFF", rating: "4.9 ★", image: "https://images.pexels.com/photos/30727980/pexels-photo-30727980.jpeg?auto=compress&cs=tinysrgb&w=400" },
    { id: "ch2", name: "Handcrafted Truffles", price: "₹899", originalPrice: "₹999", discount: "10% OFF", rating: "4.8 ★", image: "https://images.pexels.com/photos/65882/chocolate-dark-coffee-confiserie-65882.jpeg?auto=compress&cs=tinysrgb&w=400" },
    { id: "ch3", name: "Cadbury Celebrations", price: "₹499", originalPrice: "₹599", discount: "16% OFF", rating: "4.7 ★", image: "https://images.pexels.com/photos/37857736/pexels-photo-37857736.jpeg?auto=compress&cs=tinysrgb&w=400" },
    { id: "ch4", name: "Belgian Dark Chocolate", price: "₹999", originalPrice: "₹1,199", discount: "16% OFF", rating: "4.9 ★", image: "https://images.pexels.com/photos/6167333/pexels-photo-6167333.jpeg?auto=compress&cs=tinysrgb&w=400" },
    { id: "ch5", name: "Assorted Chocolate Bouquet", price: "₹1,099", originalPrice: "₹1,299", discount: "15% OFF", rating: "4.8 ★", image: "https://images.pexels.com/photos/13831901/pexels-photo-13831901.jpeg?auto=compress&cs=tinysrgb&w=400" },
  ],
};

const tabIcons: Record<string, string> = {
  Flowers: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=100&q=80",
  Cakes: "https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=100",
  Personalised: "https://images.pexels.com/photos/9451328/pexels-photo-9451328.jpeg?auto=compress&cs=tinysrgb&w=100",
  Hampers: "https://images.pexels.com/photos/264771/pexels-photo-264771.jpeg?auto=compress&cs=tinysrgb&w=100",
  Chocolates: "https://images.pexels.com/photos/65882/chocolate-dark-coffee-confiserie-65882.jpeg?auto=compress&cs=tinysrgb&w=100",
};

export default function BestsellersSection() {
  const [activeTab, setActiveTab] = useState<string>("Flowers");
  const categories = ["Flowers", "Cakes", "Personalised", "Hampers", "Chocolates"];
  const { addToCart, openPersonalize } = useCart();

  const handleAction = (item: Product) => {
    const product = {
      id: item.id,
      name: item.name,
      price: Number(item.price.replace(/[^0-9]/g, "")),
      image: item.image,
    };
    if (item.isPersonalised) {
      openPersonalize(product);
    } else {
      addToCart(product);
    }
  };

  return (
    <section className="w-full px-3 sm:px-6 lg:px-10 xl:px-14 py-8 sm:py-10">
      <div className="mb-4">
        <h2 className="section-title">
          Shop By Bestsellers
        </h2>
        <p className="text-xs sm:text-sm text-charcoal/70 mt-0.5">
          Discover India&apos;s favourite gifting options, curated bestsellers that make every celebration extra special
        </p>
      </div>

      <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto pb-2.5 mb-4 scrollbar-none border-b border-rose-light/20">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`flex items-center gap-1.5 pb-2 text-xs font-bold whitespace-nowrap border-b-2 transition-all ${
              activeTab === cat ? "border-rose text-rose" : "border-transparent text-charcoal/70 hover:text-botanical"
            }`}
          >
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full overflow-hidden border border-rose-light/40 shrink-0">
              <img src={tabIcons[cat]} alt={cat} className="w-full h-full object-cover" />
            </div>
            <span>{cat}</span>
          </button>
        ))}
      </div>

      <div className="flex md:grid md:grid-cols-5 gap-3 sm:gap-4 overflow-x-auto md:overflow-visible pb-3 md:pb-0 scrollbar-none snap-x snap-mandatory">
        {bestsellersData[activeTab]?.map((item) => (
          <div
            key={item.id}
            className="group bg-white rounded-2xl overflow-hidden border border-rose-light/20 shadow-xs lift-on-hover flex flex-col justify-between shrink-0 w-44 sm:w-52 md:w-auto snap-start"
          >
            <a href={`/product/${item.id}`} className="block">
              <div className="relative w-full h-52 sm:h-60 md:h-64 bg-sand overflow-hidden flex items-center justify-center p-2">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
                />
                <WishlistButton id={item.id} className="absolute top-3 right-3" />
              </div>

              <div className="p-2.5 sm:p-3">
                <h3 className="font-semibold text-xs sm:text-sm text-botanical line-clamp-1">
                  {item.name}
                </h3>

                {item.badge && (
                  <span className={`inline-block text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded text-white mt-1 ${item.tagColor || "bg-rose"}`}>
                    {item.badge}
                  </span>
                )}

                <div className="mt-1.5 flex items-center gap-1.5 flex-wrap">
                  <span className="font-bold text-xs sm:text-sm text-botanical">{item.price}</span>
                  <span className="text-[10px] sm:text-xs text-charcoal/40 line-through">{item.originalPrice}</span>
                  <span className="text-[9px] sm:text-[10px] font-bold text-rose">{item.discount}</span>
                </div>
              </div>
            </a>

            <div className="px-2.5 sm:px-3 pb-2.5 sm:pb-3">
              <button
                onClick={() => handleAction(item)}
                className={`w-full text-[10px] sm:text-xs font-semibold py-2 rounded-full transition-colors ${
                  item.isPersonalised
                    ? "bg-botanical text-ivory hover:bg-botanical-light"
                    : "bg-rose text-ivory hover:bg-rose-dark"
                }`}
              >
                {item.isPersonalised ? "Personalise Now" : "Add to Cart"}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 sm:mt-8 text-center">
        <a href={`/search?q=${encodeURIComponent(activeTab)}`} className="inline-block px-5 sm:px-6 py-2 border border-rose-light/60 text-botanical rounded-full text-xs font-semibold hover:bg-rose hover:text-ivory transition-colors">
          View All {activeTab} &gt;
        </a>
      </div>
    </section>
  );
}