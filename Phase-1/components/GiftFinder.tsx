"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

// Turn the three choices into a shop search
const OCCASION_QUERY: Record<string, string> = {
  Birthday: "birthday cake flowers",
  Anniversary: "anniversary rose chocolate",
  Festive: "diwali hamper chocolate",
  Housewarming: "plant",
};
const RECIPIENT_QUERY: Record<string, string> = {
  "For Her": "rose personalised",
  "For Him": "chocolate hamper",
  Parents: "plant hamper",
  Friends: "cake personalised",
};

export default function GiftFinder() {
  const [occasion, setOccasion] = useState("Birthday");
  const [recipient, setRecipient] = useState("For Her");
  const [priceRange, setPriceRange] = useState("500-1000");
  const router = useRouter();

  const findGifts = () => {
    const q = `${OCCASION_QUERY[occasion] ?? ""} ${RECIPIENT_QUERY[recipient] ?? ""}`.trim();
    const params = new URLSearchParams({ q });
    if (priceRange !== "any") params.set("price", priceRange);
    router.push(`/search?${params.toString()}`);
  };

  return (
    <section className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 py-4 my-2">
      <div className="bg-sand border border-rose-light/30 rounded-2xl p-4 sm:p-5 shadow-2xs">
        <div className="flex items-center gap-2 mb-3">
          <h2 className="font-display font-bold text-sm sm:text-base text-botanical">
            15-Second Gift Finder Tool
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_1fr_auto] gap-3 items-end">
          {/* Occasion Filter */}
          <div>
            <label className="text-[11px] font-bold text-charcoal/60 uppercase tracking-wider block mb-1">
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
            <label className="text-[11px] font-bold text-charcoal/60 uppercase tracking-wider block mb-1">
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
            <label className="text-[11px] font-bold text-charcoal/60 uppercase tracking-wider block mb-1">
              Budget Range
            </label>
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="w-full text-xs py-2 px-3 rounded-xl bg-white border border-rose-light/40 focus:outline-none focus:border-botanical font-semibold text-botanical"
            >
              <option value="under500">Under ₹500</option>
              <option value="500-1000">₹500 – ₹1,000</option>
              <option value="1000-2000">₹1,000 – ₹2,000</option>
              <option value="above2000">Above ₹2,000</option>
              <option value="any">Any budget</option>
            </select>
          </div>

          <button
            onClick={findGifts}
            className="w-full sm:w-auto min-h-11 px-6 py-2.5 rounded-xl bg-botanical text-ivory text-xs font-bold hover:bg-botanical-light transition-colors whitespace-nowrap"
          >
            Find Gifts
          </button>
        </div>
      </div>
    </section>
  );
}