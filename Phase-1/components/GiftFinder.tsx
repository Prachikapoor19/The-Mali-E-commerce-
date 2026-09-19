"use client";

import React, { useState } from "react";

export default function GiftFinder() {
  const [occasion, setOccasion] = useState("Birthday");
  const [recipient, setRecipient] = useState("For Her");
  const [priceRange, setPriceRange] = useState("500-1000");

  return (
    <section className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 py-4 my-2">
      <div className="bg-[#FAF8F5] border border-rose-light/30 rounded-2xl p-4 sm:p-5 shadow-2xs">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-rose text-base">✨</span>
          <h2 className="font-display font-bold text-sm sm:text-base text-botanical">
            15-Second Gift Finder Tool
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Occasion Filter */}
          <div>
            <label className="text-[10px] font-bold text-charcoal/60 uppercase tracking-wider block mb-1">
              Select Occasion
            </label>
            <select
              value={occasion}
              onChange={(e) => setOccasion(e.target.value)}
              className="w-full text-xs py-2 px-3 rounded-xl bg-white border border-rose-light/40 focus:outline-none focus:border-botanical font-semibold text-botanical"
            >
              <option value="Birthday">Birthday Special</option>
              <option value="Anniversary">Anniversary Surprises</option>
              <option value="Festive">Festive Celebrations</option>
              <option value="Housewarming">Housewarming & Green Gifts</option>
            </select>
          </div>

          {/* Recipient Filter */}
          <div>
            <label className="text-[10px] font-bold text-charcoal/60 uppercase tracking-wider block mb-1">
              Gifting For
            </label>
            <select
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="w-full text-xs py-2 px-3 rounded-xl bg-white border border-rose-light/40 focus:outline-none focus:border-botanical font-semibold text-botanical"
            >
              <option value="For Her">For Her (Wife / Girlfriend / Sister)</option>
              <option value="For Him">For Him (Husband / Boyfriend / Brother)</option>
              <option value="Parents">For Parents & Family</option>
              <option value="Friends">For Friends & Colleagues</option>
            </select>
          </div>

          {/* Price Range Filter */}
          <div>
            <label className="text-[10px] font-bold text-charcoal/60 uppercase tracking-wider block mb-1">
              Budget Range
            </label>
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="w-full text-xs py-2 px-3 rounded-xl bg-white border border-rose-light/40 focus:outline-none focus:border-botanical font-semibold text-botanical"
            >
              <option value="under500">Under ₹500</option>
              <option value="500-1000">₹500 – ₹1,000</option>
              <option value="above2000">Above ₹2,000</option>
            </select>
          </div>
        </div>
      </div>
    </section>
  );
}