// "use client";

// import React, { useState } from "react";

// // Mega Menu Structure for Birthday
// const BIRTHDAY_MEGA_MENU = {
//   mustHaves: [
//     "Cakes",
//     "Flowers",
//     "Flowers n Cakes",
//     "Flowers n Chocolates",
//     "Personalised Gifts",
//     "Plants",
//     "Combos",
//     "Chocolates",
//     "Gift Hampers",
//     "Greeting Cards",
//     "Hatke Gifts",
//   ],
//   primePicks: [
//     { name: "All Gifts" },
//     { name: "Bestsellers" },
//     { name: "New Arrivals" },
//     { name: "LUXE Birthday", isNew: true },
//     { name: "Healthy Cakes", isNew: true },
//     { name: "Zodiac Gifts" },
//     { name: "Premium Gifts" },
//     { name: "Unusual Gifts" },
//     { name: "Midnight Delivery" },
//     { name: "Return Gifts" },
//     { name: "Pet Gifts", isNew: true },
//   ],
//   personalPicks: [
//     "Plant Lover",
//     "Wanderer",
//     "Foodies",
//     "Music Fan",
//     "Fashionista",
//   ],
//   birthdayGiftsFor: [
//     "Her",
//     "Him",
//     "Kids",
//     "Friends",
//     "Wife",
//     "Husband",
//     "Girlfriend",
//     "Boyfriend",
//     "Mother",
//     "Father",
//   ],
//   agePerfect: [
//     "1st Birthday",
//     "10th Birthday",
//     "18th Birthday",
//     "50th Birthday",
//   ],
//   uniqueGifting: [
//     "Spiritual Gifts",
//     "Jewellery",
//     "Experiential Gifts",
//     "Electronics",
//     "Exotic Flowers",
//     "Toys n Games",
//     "Balloon Decor",
//     "Gifts n Guitarist",
//   ],
//   priceWise: [
//     "Rs 500 - Rs 1000",
//     "Rs 1000 - Rs 2000",
//     "Above Rs 2000",
//     "Below Rs 500",
//   ],
// };

// const NAV_ITEMS = [
//   { id: "birthday", label: "Birthday", hasMenu: true },
//   { id: "occasions", label: "Occasions" },
//   { id: "anniversary", label: "Anniversary" },
//   { id: "flowers", label: "Flowers" },
//   { id: "cakes", label: "Cakes" },
//   { id: "personalised", label: "Personalised" },
//   { id: "plants", label: "Plants" },
//   { id: "chocolates", label: "Chocolates" },
//   { id: "lifestyle", label: "Lifestyle" },
//   { id: "hatke", label: "Hatke" },
//   { id: "luxe", label: "LUXE" },
//   { id: "hampers", label: "Hampers" },
//   { id: "balloons", label: "Balloons" },
//   { id: "global", label: "Global" },
// ];

// export default function CategoryNav() {
//   const [activeMenu, setActiveMenu] = useState<string | null>(null);

//   return (
//     <nav className="w-full bg-white border-b border-[#1B3B2B]/10 relative z-40 shadow-2xs">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center gap-6 overflow-x-auto scrollbar-none py-2.5 text-xs font-semibold text-[#1B3B2B]">
//           {NAV_ITEMS.map((item) => (
//             <div
//               key={item.id}
//               className="relative shrink-0"
//               onMouseEnter={() => item.hasMenu && setActiveMenu(item.id)}
//               onMouseLeave={() => setActiveMenu(null)}
//             >
//               <button
//                 onClick={() =>
//                   item.hasMenu &&
//                   setActiveMenu(activeMenu === item.id ? null : item.id)
//                 }
//                 className={`flex items-center gap-1 py-1 px-1 transition-colors hover:text-[#C86D51] ${
//                   activeMenu === item.id ? "text-[#C86D51] font-bold" : ""
//                 }`}
//               >
//                 <span>{item.label}</span>
//                 <span className="text-[9px] opacity-60">▼</span>
//               </button>

//               {/* --- BIRTHDAY MEGA MENU FLYOUT --- */}
//               {item.hasMenu && activeMenu === item.id && (
//                 <div className="fixed left-0 right-0 top-[112px] w-full bg-white/95 backdrop-blur-md shadow-2xl border-b border-[#1B3B2B]/10 py-6 px-4 sm:px-8 lg:px-16 z-50 text-gray-700 font-sans transition-all">
//                   <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-6 text-[11px]">
                    
//                     {/* Col 1: Must Haves */}
//                     <div>
//                       <h4 className="font-bold text-[#1B3B2B] mb-3 text-xs border-b pb-1 border-gray-100">
//                         Must Haves
//                       </h4>
//                       <ul className="space-y-1.5">
//                         {BIRTHDAY_MEGA_MENU.mustHaves.map((sub) => (
//                           <li key={sub}>
//                             <a href="#" className="hover:text-[#C86D51] transition-colors">
//                               {sub}
//                             </a>
//                           </li>
//                         ))}
//                       </ul>
//                     </div>

//                     {/* Col 2: Prime Picks */}
//                     <div>
//                       <h4 className="font-bold text-[#1B3B2B] mb-3 text-xs border-b pb-1 border-gray-100">
//                         Prime Picks
//                       </h4>
//                       <ul className="space-y-1.5">
//                         {BIRTHDAY_MEGA_MENU.primePicks.map((sub) => (
//                           <li key={sub.name} className="flex items-center gap-1.5">
//                             <a href="#" className="hover:text-[#C86D51] transition-colors">
//                               {sub.name}
//                             </a>
//                             {sub.isNew && (
//                               <span className="text-[8px] bg-rose-500 text-white font-extrabold px-1.5 py-0.2 rounded-full uppercase">
//                                 New
//                               </span>
//                             )}
//                           </li>
//                         ))}
//                       </ul>
//                     </div>

//                     {/* Col 3: Personal Picks */}
//                     <div>
//                       <h4 className="font-bold text-[#1B3B2B] mb-3 text-xs border-b pb-1 border-gray-100">
//                         Personal Picks
//                       </h4>
//                       <ul className="space-y-1.5">
//                         {BIRTHDAY_MEGA_MENU.personalPicks.map((sub) => (
//                           <li key={sub}>
//                             <a href="#" className="hover:text-[#C86D51] transition-colors">
//                               {sub}
//                             </a>
//                           </li>
//                         ))}
//                       </ul>
//                     </div>

//                     {/* Col 4: Birthday Gifts For */}
//                     <div>
//                       <h4 className="font-bold text-[#1B3B2B] mb-3 text-xs border-b pb-1 border-gray-100">
//                         Birthday Gifts For
//                       </h4>
//                       <ul className="space-y-1.5">
//                         {BIRTHDAY_MEGA_MENU.birthdayGiftsFor.map((sub) => (
//                           <li key={sub}>
//                             <a href="#" className="hover:text-[#C86D51] transition-colors">
//                               {sub}
//                             </a>
//                           </li>
//                         ))}
//                       </ul>
//                     </div>

//                     {/* Col 5: Age Perfect Gifts */}
//                     <div>
//                       <h4 className="font-bold text-[#1B3B2B] mb-3 text-xs border-b pb-1 border-gray-100">
//                         Age Perfect Gifts
//                       </h4>
//                       <ul className="space-y-1.5">
//                         {BIRTHDAY_MEGA_MENU.agePerfect.map((sub) => (
//                           <li key={sub}>
//                             <a href="#" className="hover:text-[#C86D51] transition-colors">
//                               {sub}
//                             </a>
//                           </li>
//                         ))}
//                       </ul>
//                     </div>

//                     {/* Col 6: Unique Gifting */}
//                     <div>
//                       <h4 className="font-bold text-[#1B3B2B] mb-3 text-xs border-b pb-1 border-gray-100">
//                         Unique Gifting
//                       </h4>
//                       <ul className="space-y-1.5">
//                         {BIRTHDAY_MEGA_MENU.uniqueGifting.map((sub) => (
//                           <li key={sub}>
//                             <a href="#" className="hover:text-[#C86D51] transition-colors">
//                               {sub}
//                             </a>
//                           </li>
//                         ))}
//                       </ul>
//                     </div>

//                     {/* Col 7: Price Wise Gifts */}
//                     <div>
//                       <h4 className="font-bold text-[#1B3B2B] mb-3 text-xs border-b pb-1 border-gray-100">
//                         Price Wise Gifts
//                       </h4>
//                       <ul className="space-y-1.5">
//                         {BIRTHDAY_MEGA_MENU.priceWise.map((sub) => (
//                           <li key={sub}>
//                             <a href="#" className="hover:text-[#C86D51] transition-colors">
//                               {sub}
//                             </a>
//                           </li>
//                         ))}
//                       </ul>
//                     </div>

//                   </div>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </nav>
//   );
// }


"use client";

import React, { useState } from "react";

// --- MEGA MENU DATA ---

const BIRTHDAY_MEGA_MENU = {
  mustHaves: ["Cakes", "Flowers", "Flowers n Cakes", "Flowers n Chocolates", "Personalised Gifts", "Plants", "Combos", "Chocolates", "Gift Hampers", "Greeting Cards", "Hatke Gifts"],
  primePicks: [{ name: "All Gifts" }, { name: "Bestsellers" }, { name: "New Arrivals" }, { name: "LUXE Birthday", isNew: true }, { name: "Healthy Cakes", isNew: true }, { name: "Zodiac Gifts" }, { name: "Premium Gifts" }, { name: "Unusual Gifts" }, { name: "Midnight Delivery" }, { name: "Return Gifts" }, { name: "Pet Gifts", isNew: true }],
  personalPicks: ["Plant Lover", "Wanderer", "Foodies", "Music Fan", "Fashionista"],
  birthdayGiftsFor: ["Her", "Him", "Kids", "Friends", "Wife", "Husband", "Girlfriend", "Boyfriend", "Mother", "Father"],
  agePerfect: ["1st Birthday", "10th Birthday", "18th Birthday", "50th Birthday"],
  uniqueGifting: ["Spiritual Gifts", "Jewellery", "Experiential Gifts", "Electronics", "Exotic Flowers", "Toys n Games", "Balloon Decor", "Gifts n Guitarist"],
  priceWise: ["Rs 500 - Rs 1000", "Rs 1000 - Rs 2000", "Above Rs 2000", "Below Rs 500"],
};

const OCCASIONS_MEGA_MENU = {
  festiveVibes: ["Ganesh Chaturthi - 14th Sep", "Navratri - 10th Oct", "Dussehra - 20th Oct", "Durga Puja - 21st Oct", "Karwa Chauth - 29th Oct", "Halloween - 31st Oct", "Diwali - 8th Nov", "Christmas - 25th Dec"],
  momentsOfJoy: ["Wife Appreciation Day - 20th Sep", "Daughters Day - 27th Sep", "Children's Day - 14th Nov", "International Men's Day - 19th Nov", "Thanksgiving Day - 26th Nov", "New Year - 1st Jan", "Valentine's Day - 14th Feb"],
  celebrationsAndSentiments: ["Wedding", "Congratulations", "I Am Sorry", "Love n Romance", "Miss You", "Thank You", "Thinking of You", "Best Wishes", "Get Well Soon", "House Warming", "New Born Baby", "Baby Shower", "Retirement", "Sympathy n Funeral"],
};

const ANNIVERSARY_MEGA_MENU = {
  featuredPicks: ["All Gifts", "Best Sellers", "Work Anniversary Gifts", "Proposal Anniversary Gifts", "Relationship Anniversary Gifts", "Premium Gifts", "New Arrivals", "LUXE Anniversary", "Hatke Gifts", "Experiential Gifts", "Photo Frames"],
  celebrateWith: ["Cakes", "Flowers", "Personalised Gifts", "Gift Hampers", "Chocolates", "Plants", "Flowers n Cakes", "Combos", "Decorations Services"],
  forYourLovedOnes: ["For Husband", "For Wife", "For Couples", "For Parents"],
  milestones: ["1st Anniversary", "10th Anniversary", "25th Anniversary", "50th Anniversary"],
  weddingGifts: ["All Gifts", "Cakes", "Flowers", "Hampers", "Jewellery", "Personalised Gifts", "Chocolates", "Premium Gifts", "Home Decor", "Gift Sets"],
  giftsForEveryone: ["Bride", "Groom", "Relatives & Friends"],
};

const FLOWERS_MEGA_MENU = {
  inFocus: ["All Flowers", "Best Sellers", "Same Day Delivery", "New Arrivals", "Centerpiece Flowers", "Personalised Flowers", "Crochet Flowers", "Premium Flowers", "Zodiac Flowers", "Forever Flowers", "Standing Flower Bouquets"],
  forEveryOccasions: ["Birthday", "Anniversary", "Congratulations", "Love n Romance", "Wedding", "Housewarming", "Condolences"],
  bloomAssortment: ["Flowers n Cakes", "Flowers n Chocolates", "Flowers n Guitarist", "Flower Hampers"],
  floralTypes: ["Roses", "Mixed Flowers", "Carnations", "Lilies", "Exotic Flowers", "Orchids", "Gerberas", "Sunflowers", "Dried Flowers", "Daisies", "Hydrangea"],
  blossomArrangement: ["LUXE Flowers", "Flower Arrangements", "Flower Bouquets", "Red", "Pink", "Purple", "Blue", "Yellow", "Pastel"],
  sendToCities: ["Delhi NCR", "Bengaluru", "Mumbai", "Pune", "Hyderabad", "Kolkata", "Chennai", "Lucknow", "Ahmedabad", "All Other Cities"],
};

const CAKES_MEGA_MENU = {
  allCakes: ["Bestselling Cakes", "New Arrivals Cakes", "Same Day Delivery", "Midnight Delivery", "Explore All"],
  forOccasions: ["Birthday Cakes", "Boys Birthday Cakes", "Girls Birthday Cakes", "Kids Birthday Cakes", "Anniversary Cakes", "Engagement Cakes", "Wedding Cakes", "Congratulations Cakes", "Baby Shower Cakes"],
  byType: ["Bento Cakes", "Jar Cakes", "Cup Cakes", "Brownies", "Cream Cakes", "Fondant Cakes", "Eggless Cakes", "Photo Cakes", "Designer Cakes", "Fusion Cakes", "Healthy Cakes", "Dry Cakes", "Heart Shaped Cakes", "Luxe Cakes"],
  byFlavour: ["Chocolate Cakes", "Mango Cakes", "Fresh Fruit Cakes", "Butterscotch Cakes", "Truffle Cakes", "Red Velvet Cakes", "Pineapple Cakes", "Cheesecakes", "Black Forest Cakes", "Vanilla Cakes", "Blueberry Cakes", "Tiramisu Cakes", "Walnut Cakes", "Coffee Cakes", "Caramel Cakes"],
  byTheme: ["Animal Cakes", "Barbie Cakes", "Unicorn Cakes"],
  curatedCombos: ["Flowers n Cakes", "Cake Combos", "Cake with Plants", "Cake with Chocolates", "Cakes n Guitarist"],
  milestoneCakes: ["1st Birthday", "10th Birthday", "18th Birthday", "50th Birthday", "1st Anniversary", "25th Anniversary", "50th Anniversary"],
  byRecipient: ["Him", "Her", "Father", "Mother", "Husband", "Wife"],
  byCities: ["Cakes in Delhi", "Cakes in Mumbai", "Cakes in Bengaluru", "Cakes in Pune", "Cakes in Hyderabad", "Cakes in Kolkata"],
};

const PERSONALISED_MEGA_MENU = {
  spotlight: ["Mugs", "Cushions", "Water Bottles", "Stationery", "Engraved", "Lamps", "Photo Frames", "Bar Accessories", "Clocks", "Glass Ware", "Name Plates", "Keychains", "Pet Gifts"],
  tailorTreasures: ["All Personalised Gifts", "Same Day Delivery", "Best Sellers", "New Arrivals", "Personalised Flowers", "Personalised Photo Cakes", "Personalised Plants", "Personalised Combos", "Personalised Chocolates", "Personalised Hampers", "Personalised Accessories"],
  forOccasions: ["Birthday", "Anniversary", "Love n Romance", "Wedding"],
  personaliseFor: ["For Him", "For Her", "For Kids", "For Husband", "For Wife"],
  trending: ["Hatke Gifts", "Explosion Boxes", "Jewellery", "Caricatures", "Neon Lights", "T-Shirts", "Travel Accessories", "Perfumes", "Greeting Cards"],
  byCities: ["Delhi NCR", "Mumbai", "Bengaluru", "Pune", "Hyderabad", "Kolkata", "Chennai", "Lucknow", "Ahmedabad", "All Other Cities"],
};

const PLANTS_MEGA_MENU = {
  eliteGreens: ["Lush Ferns Galore", "All Plants", "Best Sellers", "Same Day Delivery", "LUXE Plants", "New Arrivals", "Premium Plants", "Air Purifying Plants", "Plants for Her", "Plants for Him", "Kokedama Plants", "Plants Offers", "Garden Accessories", "Terrariums Plants", "Personalised Plants"],
  placements: ["Indoor Plants", "Desktop Plants"],
  forCelebrations: ["Birthday", "Anniversary", "House Warming", "Good Luck"],
  collection: ["Money Plants", "Snake Plants", "Jade Plants", "Peace Lily", "Plants DIY Kits", "Lucky Bamboo", "Palm Plants", "Bonsai Plants", "Ficus Plants", "Spider Plants", "Exotic Plants", "Aglaonema Plants", "Flowering Plants", "Cactus n Succulent Plants", "Low Maintenance Plants"],
  plantersStyle: ["Ceramic Planters", "Metal Planters", "Glass Planters", "Mugs Planters", "Planter Pots", "Cake n Plants", "Plants Combos", "Flowers n Plants"],
  sendToCities: ["Delhi NCR", "Bengaluru", "Mumbai", "Pune", "Hyderabad", "Kolkata", "Chennai", "Lucknow", "Ahmedabad", "All Other Cities"],
};

const CHOCOLATES_MEGA_MENU = {
  featured: ["All Chocolates", "Best Sellers", "Premium Gourmet Gifts", "Same Day Chocolates", "New Arrivals", "Premium Chocolates", "Gourmet Gifts", "Milk Chocolates", "Dark Chocolates", "Personalised Chocolates", "Sugar Free Chocolates", "Handmade Chocolates"],
  choices: ["Chocolate Bouquets", "Chocolate Hampers", "Chocolate Combos", "Flowers n Chocolates", "Imported Chocolates", "Dubai Chocolates"],
  brands: ["Ferrero Rocher", "Cadbury", "Artisanal Chocolates", "FNP Premium Chocolates", "Lindt Chocolates", "Toblerone", "Hershey Chocolates", "Kitkat Chocolates"],
  byOccasions: ["Birthday", "Anniversary", "Thank You", "Wedding"],
  byPrices: ["Gifts Rs 500 - Rs 1000", "Gifts Rs 1000 - Rs 2000", "Gifts above Rs 2000"],
  byCities: ["Delhi NCR", "Bengaluru", "Mumbai", "Pune", "Hyderabad", "Kolkata", "Chennai", "Lucknow", "All Other Cities"],
};

const LIFESTYLE_MEGA_MENU = {
  fashion: ["All Fashion Gifts", "Same Day Fashion Gifts", "Tshirts", "Jewellery", "Handbags n Bags", "Perfumes", "Cosmetics n Spa Hampers", "Accessories", "Curated for Him", "Curated for Her", "Watches"],
  kidsCorner: ["All Gifts for Kids", "Personalised Joys", "Soft Toys", "Game Zone", "School Accessories"],
  homeLiving: ["All Home n Living Gifts", "Home Decor", "Photo Frames", "Wall Art n Frames", "Toys n Games", "Kitchen n Dining", "Spiritual Gifts", "Soft Toys", "Unusual Gifts", "Electronics", "Desktop Gifts", "Garden Decor", "Silver Gifts", "Home Fragrances", "Mugs", "Zodiac Gifts", "Neon Lights", "Sustainable Gifts", "Cushions", "Wish Trees"],
  giftsFor: ["New Born", "Her", "Him", "Girlfriend", "Boyfriend", "Wife", "Husband", "Mother", "Father", "Sister", "Brother", "Daughter", "Kids", "Girls", "Boys", "Pet Lovers"],
  personality: ["Fashionista", "Decor Enthusiast", "Gadget Guru", "Plant Lover", "Music Fan", "Wanderer"],
  brands: ["Nuyug", "Ritualistic", "Carlton London", "Titan", "Kimirica"],
};

const HATKE_MEGA_MENU = {
  everyone: ["Birthday", "Bday Birthday", "Long Distance Love", "Hatke Today"],
  categories: ["All Gen-Z Gifts", "Flowers", "Cakes", "Personalised", "Decor", "Fashion"],
  giveToYour: ["Lover", "Friend", "Date", "Pet Parent"],
};

const HAMPERS_MEGA_MENU = {
  featured: ["New Arrivals", "Birthday Hampers", "Anniversary Hampers", "Premium Gift Hampers", "Wedding Hampers", "LUXE Hampers"],
  curated: ["All Gift Hampers", "Healthy Hampers", "Snacks Hampers", "Grooming Hampers", "Tea n Coffee Hampers", "Gourmet Hampers", "Chocolate Hampers", "Fruit Hampers", "Sweet Hampers", "Dry Fruit Hampers", "DIY Kits Hampers"],
  giftSets: ["All Gift Sets", "Best Sellers", "New Arrivals", "Birthday Gift Sets", "Anniversary Gift Sets", "Wedding Gift Sets", "Cake Surprise Sets", "Cake with Plants", "Cake With Chocolates", "Cakes n Guitarist"],
  floralSets: ["All Floral Gift Sets", "Flowers n Cakes", "Flowers n Chocolates", "Flowers n Plants", "Flowers n Guitarist", "Birthday Flowers n Cakes", "Birthday Flowers n Chocolates", "Anniversary Flowers n Cakes", "Anniversary Flowers n Chocolates"],
};

const BALLOONS_MEGA_MENU = {
  balloonDecor: ["Balloon Bouquets", "Balloon Decorations", "Room Decorations", "Balloon Kits", "Decorations for Kids", "Car Decorations"],
  occasions: ["Birthday Decorations", "Anniversary Decorations", "Baby Shower Decorations"],
  services: ["Experiential Gifts", "Digital Gifts", "Gifts n Guitarists", "Services"],
  experiences: ["Birthday Experiences", "Birthday Digital Gifts", "Anniversary Experiences"],
};

const NAV_ITEMS = [
  { id: "birthday", label: "Birthday", data: BIRTHDAY_MEGA_MENU, type: "7-col" },
  { id: "occasions", label: "Occasions", data: OCCASIONS_MEGA_MENU, type: "3-col" },
  { id: "anniversary", label: "Anniversary", data: ANNIVERSARY_MEGA_MENU, type: "6-col" },
  { id: "flowers", label: "Flowers", data: FLOWERS_MEGA_MENU, type: "6-col" },
  { id: "cakes", label: "Cakes", data: CAKES_MEGA_MENU, type: "7-col" },
  { id: "personalised", label: "Personalised", data: PERSONALISED_MEGA_MENU, type: "6-col" },
  { id: "plants", label: "Plants", data: PLANTS_MEGA_MENU, type: "5-col" },
  { id: "chocolates", label: "Chocolates", data: CHOCOLATES_MEGA_MENU, type: "6-col" },
  { id: "lifestyle", label: "Lifestyle", data: LIFESTYLE_MEGA_MENU, type: "5-col" },
  { id: "hatke", label: "Hatke", data: HATKE_MEGA_MENU, type: "3-col" },
  { id: "hampers", label: "Hampers", data: HAMPERS_MEGA_MENU, type: "4-col" },
  { id: "balloons", label: "Balloons", data: BALLOONS_MEGA_MENU, type: "4-col" },
];

export default function CategoryNav() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const renderSection = (title: string, items: any[]) => (
    <div>
      <h4 className="font-bold text-[#1B3B2B] mb-2 text-xs border-b pb-1 border-gray-100 uppercase tracking-wider">
        {title}
      </h4>
      <ul className="space-y-1">
        {items.map((sub: any) => {
          const name = typeof sub === "string" ? sub : sub.name;
          const isNew = typeof sub === "object" && sub.isNew;
          return (
            <li key={name} className="flex items-center gap-1">
              <a href="#" className="hover:text-[#C86D51] transition-colors">
                {name}
              </a>
              {isNew && (
                <span className="text-[7px] bg-rose-500 text-white font-extrabold px-1.5 py-0.2 rounded-full uppercase">
                  New
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );

  return (
    <nav className="w-full bg-white border-b border-[#1B3B2B]/10 relative z-40 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-5 overflow-x-auto scrollbar-none py-2.5 text-xs font-semibold text-[#1B3B2B]">
          {NAV_ITEMS.map((item) => (
            <div
              key={item.id}
              className="relative shrink-0"
              onMouseEnter={() => setActiveMenu(item.id)}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <button
                onClick={() => setActiveMenu(activeMenu === item.id ? null : item.id)}
                className={`flex items-center gap-1 py-1 px-1 transition-colors hover:text-[#C86D51] ${
                  activeMenu === item.id ? "text-[#C86D51] font-bold" : ""
                }`}
              >
                <span>{item.label}</span>
                <span className="text-[9px] opacity-60">▼</span>
              </button>

              {/* DYNAMIC FLYOUT MEGA MENU */}
              {activeMenu === item.id && (
                <div className="fixed left-0 right-0 top-[112px] w-full bg-white/98 backdrop-blur-md shadow-2xl border-b border-[#1B3B2B]/10 py-6 px-4 sm:px-8 lg:px-16 z-50 text-gray-700 font-sans transition-all max-h-[80vh] overflow-y-auto">
                  <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-6 text-[11px]">
                    {Object.entries(item.data).map(([key, list]) => {
                      const title = key
                        .replace(/([A-Z])/g, " $1")
                        .replace(/^./, (str) => str.toUpperCase());
                      return <React.Fragment key={key}>{renderSection(title, list)}</React.Fragment>;
                    })}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}