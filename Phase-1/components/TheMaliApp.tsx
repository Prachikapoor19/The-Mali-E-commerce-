"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  ShoppingBag,
  MapPin,
  Sparkles,
  Heart,
  User,
  X,
  Plus,
  Minus,
  Upload,
  CheckCircle,
  Truck,
  Clock,
  Gift,
  ShieldCheck,
  Star,
  ChevronRight,
  Filter,
} from "lucide-react";

// --- Types ---
interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  discount: string;
  rating: number;
  reviewsCount: number;
  image: string;
  deliveryBadge: "Express 60-Min" | "Same Day" | "Midnight";
  isPersonalised?: boolean;
}

interface CartItem extends Product {
  quantity: number;
  customText?: string;
  customImageName?: string;
}

// --- Mock Data ---
const PRODUCTS: Product[] = [
  {
    id: "m1",
    name: "Classic Velvet Red Roses Bouquet",
    category: "Fresh Flowers",
    price: 699,
    originalPrice: 899,
    discount: "22% OFF",
    rating: 4.9,
    reviewsCount: 1280,
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&q=80",
    deliveryBadge: "Express 60-Min",
  },
  {
    id: "m2",
    name: "Exotic Blue Orchid Symphony",
    category: "Fresh Flowers",
    price: 1299,
    originalPrice: 1599,
    discount: "18% OFF",
    rating: 4.8,
    reviewsCount: 940,
    image: "https://images.pexels.com/photos/1408221/pexels-photo-1408221.jpeg?auto=compress&cs=tinysrgb&w=600",
    deliveryBadge: "Same Day",
  },
  {
    id: "m3",
    name: "Rich Belgian Truffle Cake",
    category: "Yummy Cakes",
    price: 749,
    originalPrice: 999,
    discount: "25% OFF",
    rating: 4.9,
    reviewsCount: 2150,
    image: "https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=600",
    deliveryBadge: "Express 60-Min",
  },
  {
    id: "m4",
    name: "Fresh Fruit Overload Gateau",
    category: "Yummy Cakes",
    price: 899,
    originalPrice: 1099,
    discount: "18% OFF",
    rating: 4.7,
    reviewsCount: 810,
    image: "https://images.pexels.com/photos/1055272/pexels-photo-1055272.jpeg?auto=compress&cs=tinysrgb&w=600",
    deliveryBadge: "Same Day",
  },
  {
    id: "m5",
    name: "Air Purifying Snake & Money Plant Duo",
    category: "Green Plants",
    price: 599,
    originalPrice: 799,
    discount: "25% OFF",
    rating: 4.9,
    reviewsCount: 620,
    image: "https://images.pexels.com/photos/305821/pexels-photo-305821.jpeg?auto=compress&cs=tinysrgb&w=600",
    deliveryBadge: "Same Day",
  },
  {
    id: "m6",
    name: "3-Tier Lucky Bamboo in Glass Vase",
    category: "Green Plants",
    price: 499,
    originalPrice: 649,
    discount: "23% OFF",
    rating: 4.8,
    reviewsCount: 1100,
    image: "https://images.pexels.com/photos/7084337/pexels-photo-7084337.jpeg?auto=compress&cs=tinysrgb&w=600",
    deliveryBadge: "Express 60-Min",
  },
  {
    id: "m7",
    name: "Custom Engraved LED Wooden Lamp",
    category: "Personalised Gifts",
    price: 999,
    originalPrice: 1299,
    discount: "23% OFF",
    rating: 4.9,
    reviewsCount: 1540,
    image: "https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg?auto=compress&cs=tinysrgb&w=600",
    deliveryBadge: "Same Day",
    isPersonalised: true,
  },
  {
    id: "m8",
    name: "Personalised Photo Memory Mug",
    category: "Personalised Gifts",
    price: 399,
    originalPrice: 599,
    discount: "33% OFF",
    rating: 4.8,
    reviewsCount: 3100,
    image: "https://images.pexels.com/photos/1566308/pexels-photo-1566308.jpeg?auto=compress&cs=tinysrgb&w=600",
    deliveryBadge: "Express 60-Min",
    isPersonalised: true,
  },
  {
    id: "m9",
    name: "Royal Gourmet Chocolate Basket",
    category: "Gourmet Hampers",
    price: 1899,
    originalPrice: 2299,
    discount: "17% OFF",
    rating: 4.9,
    reviewsCount: 430,
    image: "https://images.pexels.com/photos/264771/pexels-photo-264771.jpeg?auto=compress&cs=tinysrgb&w=600",
    deliveryBadge: "Midnight",
  },
  {
    id: "m10",
    name: "The Mali Luxe Forever Gold Rose",
    category: "The Mali Luxe",
    price: 3499,
    originalPrice: 4299,
    discount: "18% OFF",
    rating: 5.0,
    reviewsCount: 290,
    image: "https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&cs=tinysrgb&w=600",
    deliveryBadge: "Same Day",
  },
  {
    id: "m11",
    name: "Quirky Gen-Z LED Neon Sign",
    category: "Hatke Gifts",
    price: 1199,
    originalPrice: 1599,
    discount: "25% OFF",
    rating: 4.7,
    reviewsCount: 510,
    image: "https://images.pexels.com/photos/1194036/pexels-photo-1194036.jpeg?auto=compress&cs=tinysrgb&w=600",
    deliveryBadge: "Same Day",
  },
  {
    id: "m12",
    name: "Romantic Balloon Canopy Decor",
    category: "Balloon Decor",
    price: 2499,
    originalPrice: 2999,
    discount: "16% OFF",
    rating: 4.9,
    reviewsCount: 780,
    image: "https://images.pexels.com/photos/3735657/pexels-photo-3735657.jpeg?auto=compress&cs=tinysrgb&w=600",
    deliveryBadge: "Midnight",
  },
];

const CATEGORIES = [
  "All Gifts",
  "Birthday & Anniversary",
  "Fresh Flowers",
  "Yummy Cakes",
  "Green Plants",
  "Personalised Gifts",
  "Gourmet Hampers",
  "The Mali Luxe",
  "Hatke Gifts",
  "Balloon Decor",
];

export default function TheMaliApp() {
  // --- States ---
  const [selectedCategory, setSelectedCategory] = useState("All Gifts");
  const [searchQuery, setSearchQuery] = useState("");
  const [pincode, setPincode] = useState("226001");
  const [deliverySlot, setDeliverySlot] = useState("Express 60-Minute");
  const [isPincodeModalOpen, setIsPincodeModalOpen] = useState(false);
  
  // Gift Finder States
  const [finderOccasion, setFinderOccasion] = useState("All");
  const [finderRecipient, setFinderRecipient] = useState("All");
  const [finderPrice, setFinderPrice] = useState("All");

  // Cart & Modals
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProductForCustomization, setSelectedProductForCustomization] = useState<Product | null>(null);
  const [customText, setCustomText] = useState("");
  const [customImageName, setCustomImageName] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(0);
  const [toastMessage, setToastMessage] = useState("");

  // Helper Toast
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  // --- Filter Logic ---
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory =
        selectedCategory === "All Gifts" ||
        product.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
        (selectedCategory === "Birthday & Anniversary" && (product.category === "Fresh Flowers" || product.category === "Yummy Cakes"));

      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase());

      let matchesPrice = true;
      if (finderPrice === "under500") matchesPrice = product.price <= 500;
      if (finderPrice === "500-1000") matchesPrice = product.price > 500 && product.price <= 1000;
      if (finderPrice === "above2000") matchesPrice = product.price > 2000;

      return matchesCategory && matchesSearch && matchesPrice;
    });
  }, [selectedCategory, searchQuery, finderPrice]);

  // --- Cart Handlers ---
  const handleAddToCart = (product: Product) => {
    if (product.isPersonalised) {
      setSelectedProductForCustomization(product);
      return;
    }

    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    showToast(`Added "${product.name}" to cart!`);
  };

  const handleCustomizationSubmit = () => {
    if (!selectedProductForCustomization) return;

    setCart((prev) => [
      ...prev,
      {
        ...selectedProductForCustomization,
        quantity: 1,
        customText,
        customImageName: customImageName || "custom_photo.jpg",
      },
    ]);

    showToast(`Personalised item added to cart!`);
    setSelectedProductForCustomization(null);
    setCustomText("");
    setCustomImageName("");
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = Math.max(0, subtotal - discountApplied);

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === "MALI15") {
      const disc = Math.round(subtotal * 0.15);
      setDiscountApplied(disc);
      showToast("15% MALI15 Discount Applied!");
    } else if (couponCode.toUpperCase() === "NEWAPP") {
      setDiscountApplied(200);
      showToast("₹200 NEWAPP Discount Applied!");
    } else {
      showToast("Invalid Coupon Code");
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1B3B2B] font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1B3B2B] text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-bounce">
          <CheckCircle className="w-5 h-5 text-emerald-400" />
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* 1. Header & Navigation */}
      <header className="sticky top-0 z-40 bg-white border-b border-[#829B88]/20 shadow-xs">
        {/* Top Announcement Bar */}
        <div className="bg-[#1B3B2B] text-white text-[11px] py-1.5 px-4 text-center font-medium tracking-wide flex justify-between items-center">
          <span>🌿 Free Express Delivery on Orders Above ₹999 | Code: MALI15</span>
          <span className="hidden md:inline">📞 24/7 Support: +91 1800-MALI-CARE</span>
        </div>

        {/* Main Nav Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setSelectedCategory("All Gifts")}>
            <div className="w-10 h-10 rounded-full bg-[#1B3B2B] text-[#FAF8F5] flex items-center justify-center font-bold text-xl shadow-md">
              🌱
            </div>
            <div>
              <h1 className="font-serif text-2xl font-bold tracking-tight text-[#1B3B2B]">The Mali</h1>
              <p className="text-[10px] text-[#829B88] tracking-widest uppercase font-semibold">Botanical & Gifting</p>
            </div>
          </div>

          {/* Location / Pincode Selector */}
          <button
            onClick={() => setIsPincodeModalOpen(true)}
            className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF8F5] border border-[#829B88]/30 text-xs font-semibold hover:border-[#1B3B2B] transition-all"
          >
            <MapPin className="w-4 h-4 text-[#C86D51]" />
            <span>Deliver to <strong className="text-[#1B3B2B]">{pincode}</strong> ({deliverySlot})</span>
          </button>

          {/* Search Bar */}
          <div className="flex-1 max-w-md relative hidden md:block">
            <input
              type="text"
              placeholder="Search flowers, cakes, plants, personalized gifts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-2 pl-9 pr-4 text-xs rounded-full bg-[#FAF8F5] border border-[#829B88]/30 focus:outline-none focus:border-[#1B3B2B] transition-colors"
            />
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-[#829B88]" />
          </div>

          {/* Action Badges */}
          <div className="flex items-center gap-4 text-[#1B3B2B]">
            <button className="flex items-center gap-1 text-xs font-medium hover:text-[#C86D51] transition-colors">
              <User className="w-5 h-5" />
              <span className="hidden lg:inline">Account</span>
            </button>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 rounded-full bg-[#FAF8F5] hover:bg-[#829B88]/10 transition-colors"
            >
              <ShoppingBag className="w-5 h-5 text-[#1B3B2B]" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#C86D51] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Categories Horizontal Nav Bar */}
        <div className="bg-[#FAF8F5] border-t border-[#829B88]/20 overflow-x-auto scrollbar-none">
          <div className="max-w-7xl mx-auto px-4 flex items-center gap-6 whitespace-nowrap py-2 text-xs font-semibold">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`py-1 transition-all border-b-2 ${
                  selectedCategory === cat
                    ? "border-[#1B3B2B] text-[#1B3B2B]"
                    : "border-transparent text-[#829B88] hover:text-[#1B3B2B]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* 2. Interactive 15-Second Gift Finder Tool */}
      <section className="bg-white border-b border-[#829B88]/20 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto bg-[#FAF8F5] border border-[#829B88]/30 rounded-2xl p-4 shadow-2xs">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-[#C86D51]" />
            <h2 className="font-serif font-bold text-sm sm:text-base text-[#1B3B2B]">
              15-Second Gift Finder Tool
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Occasion Filter */}
            <div>
              <label className="text-[10px] uppercase tracking-wider font-bold text-[#829B88] block mb-1">
                Occasion
              </label>
              <select
                value={finderOccasion}
                onChange={(e) => setFinderOccasion(e.target.value)}
                className="w-full text-xs py-2 px-3 rounded-xl bg-white border border-[#829B88]/30 focus:outline-none"
              >
                <option value="All">All Occasions</option>
                <option value="Birthday">Birthday Special</option>
                <option value="Anniversary">Anniversary</option>
                <option value="Housewarming">Housewarming</option>
              </select>
            </div>

            {/* Recipient Filter */}
            <div>
              <label className="text-[10px] uppercase tracking-wider font-bold text-[#829B88] block mb-1">
                For Whom
              </label>
              <select
                value={finderRecipient}
                onChange={(e) => setFinderRecipient(e.target.value)}
                className="w-full text-xs py-2 px-3 rounded-xl bg-white border border-[#829B88]/30 focus:outline-none"
              >
                <option value="All">Everyone</option>
                <option value="Him">For Him</option>
                <option value="Her">For Her</option>
                <option value="Parents">For Parents / Family</option>
              </select>
            </div>

            {/* Price Filter */}
            <div>
              <label className="text-[10px] uppercase tracking-wider font-bold text-[#829B88] block mb-1">
                Budget Range
              </label>
              <select
                value={finderPrice}
                onChange={(e) => setFinderPrice(e.target.value)}
                className="w-full text-xs py-2 px-3 rounded-xl bg-white border border-[#829B88]/30 focus:outline-none"
              >
                <option value="All">All Prices</option>
                <option value="under500">Under ₹500</option>
                <option value="500-1000">₹500 – ₹1,000</option>
                <option value="above2000">Above ₹2,000</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Product Catalog Showcase */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#1B3B2B]">{selectedCategory}</h2>
            <p className="text-xs text-[#829B88] mt-0.5">Showing {filteredProducts.length} curated botanical gifts</p>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-2xl border border-[#829B88]/20 overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                {/* Image Frame */}
                <div className="relative aspect-4/5 bg-[#FAF8F5] overflow-hidden p-2">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Delivery Badge */}
                  <span className="absolute top-4 left-4 bg-[#1B3B2B]/90 text-white text-[9px] font-bold px-2 py-0.5 rounded-full backdrop-blur-xs flex items-center gap-1">
                    <Clock className="w-2.5 h-2.5 text-emerald-400" />
                    {product.deliveryBadge}
                  </span>
                </div>

                {/* Info Container */}
                <div className="p-3.5">
                  <div className="flex items-center gap-1 text-[11px] font-bold text-amber-600 mb-1">
                    <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                    <span>{product.rating}</span>
                    <span className="text-[#829B88] font-normal">({product.reviewsCount})</span>
                  </div>

                  <h3 className="font-semibold text-xs sm:text-sm text-[#1B3B2B] line-clamp-1">
                    {product.name}
                  </h3>

                  {/* Pricing */}
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="font-bold text-sm text-[#1B3B2B]">₹{product.price}</span>
                    <span className="text-xs text-[#829B88] line-through">₹{product.originalPrice}</span>
                    <span className="text-[10px] font-bold text-[#C86D51]">{product.discount}</span>
                  </div>
                </div>
              </div>

              {/* Add to Cart CTA */}
              <div className="p-3.5 pt-0">
                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-full py-2 bg-[#1B3B2B] text-white text-xs font-semibold rounded-xl hover:bg-[#829B88] transition-colors flex items-center justify-center gap-1.5"
                >
                  {product.isPersonalised ? <Sparkles className="w-3.5 h-3.5" /> : <ShoppingBag className="w-3.5 h-3.5" />}
                  <span>{product.isPersonalised ? "Personalise Now" : "Add to Cart"}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* 4. Trust Badges Section */}
      <section className="bg-white border-t border-[#829B88]/20 py-10 my-8">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-2xl bg-[#FAF8F5] text-[#1B3B2B] flex items-center justify-center mb-2">
              <Truck className="w-6 h-6 text-[#C86D51]" />
            </div>
            <h4 className="font-bold text-sm text-[#1B3B2B]">19,000+ PIN Codes Covered</h4>
            <p className="text-xs text-[#829B88] mt-1">Express 60-Minute & Midnight Slots across India</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-2xl bg-[#FAF8F5] text-[#1B3B2B] flex items-center justify-center mb-2">
              <Star className="w-6 h-6 text-amber-500 fill-amber-500" />
            </div>
            <h4 className="font-bold text-sm text-[#1B3B2B]">4.8★ Verified Customer Reviews</h4>
            <p className="text-xs text-[#829B88] mt-1">Over 500,000+ happy gifting celebrations</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-2xl bg-[#FAF8F5] text-[#1B3B2B] flex items-center justify-center mb-2">
              <ShieldCheck className="w-6 h-6 text-emerald-600" />
            </div>
            <h4 className="font-bold text-sm text-[#1B3B2B]">100% Safe & Fresh Guarantee</h4>
            <p className="text-xs text-[#829B88] mt-1">Directly sourced fresh blooms & artisan cakes</p>
          </div>
        </div>
      </section>

      {/* --- MODALS & DRAWERS --- */}

      {/* Pincode / Delivery Modal */}
      {isPincodeModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setIsPincodeModalOpen(false)}
              className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>

            <h3 className="font-serif font-bold text-lg text-[#1B3B2B] mb-1">Select Delivery Location</h3>
            <p className="text-xs text-[#829B88] mb-4">Check available express slots for your area pincode.</p>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-[#1B3B2B] block mb-1">Enter PIN Code</label>
                <input
                  type="text"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-[#829B88]/40 focus:outline-none focus:border-[#1B3B2B]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#1B3B2B] block mb-1">Select Delivery Slot</label>
                <div className="grid grid-cols-2 gap-2">
                  {["Express 60-Minute", "Same Day", "Fixed Time", "Midnight (11-12 PM)"].map((slot) => (
                    <button
                      key={slot}
                      onClick={() => setDeliverySlot(slot)}
                      className={`p-2.5 rounded-xl text-xs font-semibold border transition-all text-left ${
                        deliverySlot === slot
                          ? "bg-[#1B3B2B] text-white border-[#1B3B2B]"
                          : "bg-[#FAF8F5] text-[#1B3B2B] border-[#829B88]/30"
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  setIsPincodeModalOpen(false);
                  showToast(`Location updated to ${pincode}`);
                }}
                className="w-full py-3 bg-[#1B3B2B] text-white text-xs font-bold rounded-xl mt-2 hover:bg-[#829B88]"
              >
                Confirm Location
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Product Personalization Modal */}
      {selectedProductForCustomization && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setSelectedProductForCustomization(null)}
              className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>

            <h3 className="font-serif font-bold text-lg text-[#1B3B2B] mb-1">Personalise Your Gift</h3>
            <p className="text-xs text-[#829B88] mb-4">Add your photo and custom message for engraving.</p>

            <div className="space-y-4">
              {/* Photo Upload Simulation */}
              <div>
                <label className="text-xs font-bold text-[#1B3B2B] block mb-1">Upload Photo</label>
                <div className="border-2 border-dashed border-[#829B88]/40 rounded-xl p-4 text-center cursor-pointer hover:bg-[#FAF8F5]">
                  <Upload className="w-6 h-6 text-[#C86D51] mx-auto mb-1" />
                  <span className="text-xs text-[#829B88]">Click to select memory photo</span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => setCustomImageName(e.target.files?.[0]?.name || "")}
                  />
                  {customImageName && <p className="text-[11px] text-emerald-600 mt-1 font-bold">{customImageName}</p>}
                </div>
              </div>

              {/* Message Input */}
              <div>
                <label className="text-xs font-bold text-[#1B3B2B] block mb-1">Engraved Message / Name</label>
                <input
                  type="text"
                  placeholder="e.g. Happy Birthday Prachi!"
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-[#829B88]/40 focus:outline-none focus:border-[#1B3B2B]"
                />
              </div>

              <button
                onClick={handleCustomizationSubmit}
                className="w-full py-3 bg-[#1B3B2B] text-white text-xs font-bold rounded-xl hover:bg-[#829B88]"
              >
                Save & Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Slide-over Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-end">
          <div className="bg-white w-full max-w-md h-full flex flex-col justify-between p-6 shadow-2xl relative animate-in slide-in-from-right duration-300">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#829B88]/20">
                <h3 className="font-serif font-bold text-lg text-[#1B3B2B] flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-[#C86D51]" /> Your Cart
                </h3>
                <button onClick={() => setIsCartOpen(false)} className="p-1 rounded-full hover:bg-gray-100">
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Cart Items List */}
              <div className="divide-y divide-[#829B88]/20 overflow-y-auto max-h-[50vh] my-4">
                {cart.length === 0 ? (
                  <p className="text-xs text-center text-[#829B88] py-8">Your shopping cart is empty.</p>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="py-3 flex gap-3">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-xl shrink-0" />
                      <div className="flex-1">
                        <h4 className="font-semibold text-xs text-[#1B3B2B]">{item.name}</h4>
                        {item.customText && (
                          <p className="text-[10px] text-[#C86D51]">Msg: "{item.customText}"</p>
                        )}
                        <span className="font-bold text-xs text-[#1B3B2B] mt-1 block">₹{item.price}</span>

                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-1 bg-[#FAF8F5] rounded-md border border-[#829B88]/30"
                          >
                            <Minus className="w-3 h-3 text-[#1B3B2B]" />
                          </button>
                          <span className="text-xs font-bold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-1 bg-[#FAF8F5] rounded-md border border-[#829B88]/30"
                          >
                            <Plus className="w-3 h-3 text-[#1B3B2B]" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Checkout Footer */}
            {cart.length > 0 && (
              <div className="border-t border-[#829B88]/20 pt-4 space-y-3">
                {/* Coupon Code Input */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Coupon (MALI15 or NEWAPP)"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 text-xs p-2 rounded-xl border border-[#829B88]/30 uppercase"
                  />
                  <button
                    onClick={applyCoupon}
                    className="px-4 py-2 bg-[#FAF8F5] text-[#1B3B2B] text-xs font-bold rounded-xl border border-[#829B88]/40"
                  >
                    Apply
                  </button>
                </div>

                {/* Bill Summary */}
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between text-[#829B88]">
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                  {discountApplied > 0 && (
                    <div className="flex justify-between text-emerald-600 font-semibold">
                      <span>Discount</span>
                      <span>-₹{discountApplied}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-sm text-[#1B3B2B] pt-2 border-t">
                    <span>Total Amount</span>
                    <span>₹{total}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    showToast("Order Confirmed! Thank you for shopping with The Mali.");
                    setCart([]);
                    setIsCartOpen(false);
                  }}
                  className="w-full py-3 bg-[#1B3B2B] text-white text-xs font-bold rounded-xl hover:bg-[#829B88] transition-colors"
                >
                  Proceed to Secure Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}