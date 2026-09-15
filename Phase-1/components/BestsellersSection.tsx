'use client';

import { useState } from 'react';

const tabs = ['Flowers', 'Cakes', 'Personalised', 'Hampers', 'Chocolates'];

const productsByTab: Record<string, { name: string; price: string; rating: string; emoji: string }[]> = {
  Flowers: [
    { name: 'Red Rose Bouquet', price: '\u20B9699', rating: '4.6', emoji: '\u{1F339}' },
    { name: 'Orchid Delight', price: '\u20B91,299', rating: '4.8', emoji: '\u{1F4AE}' },
    { name: 'Sunflower Basket', price: '\u20B9899', rating: '4.5', emoji: '\u{1F33B}' },
    { name: 'Mixed Flower Vase', price: '\u20B91,099', rating: '4.7', emoji: '\u{1F490}' },
    { name: 'Dried Flower Bunch', price: '\u20B9799', rating: '4.4', emoji: '\u{1F33E}' },
    { name: 'Lily Arrangement', price: '\u20B9949', rating: '4.6', emoji: '\u{1F337}' },
  ],
  Cakes: [
    { name: 'Chocolate Truffle Cake', price: '\u20B9599', rating: '4.7', emoji: '\u{1F370}' },
    { name: 'Red Velvet Cake', price: '\u20B9749', rating: '4.6', emoji: '\u{1F9C1}' },
    { name: 'Butterscotch Cake', price: '\u20B9549', rating: '4.5', emoji: '\u{1F382}' },
    { name: 'Pineapple Cake', price: '\u20B9499', rating: '4.4', emoji: '\u{1F34D}' },
    { name: 'Black Forest Cake', price: '\u20B9649', rating: '4.6', emoji: '\u{1F370}' },
    { name: 'Fresh Fruit Cake', price: '\u20B9849', rating: '4.7', emoji: '\u{1F353}' },
  ],
  Personalised: [
    { name: 'Photo Mug', price: '\u20B9399', rating: '4.5', emoji: '\u2615' },
    { name: 'Engraved Frame', price: '\u20B9899', rating: '4.6', emoji: '\u{1F5BC}\uFE0F' },
    { name: 'Custom Cushion', price: '\u20B9699', rating: '4.4', emoji: '\u{1F6CB}\uFE0F' },
    { name: 'Name Keychain', price: '\u20B9249', rating: '4.3', emoji: '\u{1F511}' },
    { name: 'Photo Collage Frame', price: '\u20B91,199', rating: '4.7', emoji: '\u{1F4F8}' },
    { name: 'Custom T-Shirt', price: '\u20B9599', rating: '4.4', emoji: '\u{1F455}' },
  ],
  Hampers: [
    { name: 'Chocolate Hamper', price: '\u20B91,499', rating: '4.8', emoji: '\u{1F36B}' },
    { name: 'Fruit & Nut Hamper', price: '\u20B91,299', rating: '4.6', emoji: '\u{1F34E}' },
    { name: 'Spa & Wellness Kit', price: '\u20B91,799', rating: '4.7', emoji: '\u{1F9F4}' },
    { name: 'Tea & Cookies Hamper', price: '\u20B9999', rating: '4.5', emoji: '\u{1F375}' },
    { name: 'Festive Gift Hamper', price: '\u20B92,199', rating: '4.9', emoji: '\u{1F9FA}' },
    { name: 'Snack Box Hamper', price: '\u20B9899', rating: '4.4', emoji: '\u{1F36A}' },
  ],
  Chocolates: [
    { name: 'Assorted Chocolate Box', price: '\u20B9599', rating: '4.6', emoji: '\u{1F36B}' },
    { name: 'Premium Truffle Box', price: '\u20B9799', rating: '4.8', emoji: '\u{1F36C}' },
    { name: 'Dark Chocolate Bars', price: '\u20B9449', rating: '4.5', emoji: '\u{1F36B}' },
    { name: 'Belgian Truffle Box', price: '\u20B91,099', rating: '4.7', emoji: '\u{1F36B}' },
    { name: 'Chocolate Gift Set', price: '\u20B9899', rating: '4.6', emoji: '\u{1F381}' },
    { name: 'Handmade Chocolates', price: '\u20B9699', rating: '4.5', emoji: '\u{1F36C}' },
  ],
};

export default function BestsellersSection() {
  const [activeTab, setActiveTab] = useState('Flowers');
  const products = productsByTab[activeTab];

  return (
    <section className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 py-6">
      <h2 className="font-display text-xl md:text-2xl font-semibold text-charcoal mb-1">
        Shop By Bestsellers
      </h2>
      <p className="text-xs text-charcoal/60 mb-4">
        Discover India&apos;s favourite gifting options, curated bestsellers that make every celebration extra special.
      </p>

      <div className="flex items-center gap-5 border-b border-charcoal/10 mb-5 overflow-x-auto whitespace-nowrap">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2.5 text-[13px] font-semibold transition-colors ${
              activeTab === tab
                ? 'text-rose border-b-2 border-rose'
                : 'text-charcoal/50 hover:text-charcoal'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
        {products.map((p) => (
          <div key={p.name} className="group border border-charcoal/10 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
            <div className="aspect-square bg-blush/40 flex items-center justify-center">
              <span className="text-3xl">{p.emoji}</span>
            </div>
            <div className="p-2.5">
              <h3 className="text-xs md:text-[13px] font-semibold text-charcoal leading-snug line-clamp-2">
                {p.name}
              </h3>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-gold text-[10px]">{'\u2605'}</span>
                <span className="text-[11px] text-charcoal/60">{p.rating}</span>
              </div>
              <div className="flex items-center justify-between mt-1">
                <span className="text-sm font-semibold text-charcoal">{p.price}</span>
                <button className="text-[11px] font-semibold text-rose hover:text-rose-dark transition-colors">
                  Order Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-6">
        <button className="text-sm font-semibold text-charcoal border border-charcoal/20 rounded-full px-6 py-2.5 hover:border-rose hover:text-rose transition-colors">
          View All {activeTab}
        </button>
      </div>
    </section>
  );
}