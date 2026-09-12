'use client';

import { useState } from 'react';

const tabs = ['Flowers', 'Cakes', 'Personalised', 'Hampers', 'Chocolates'];

const productsByTab: Record<string, { name: string; price: string; rating: string }[]> = {
  Flowers: [
    { name: 'Red Rose Bouquet', price: '\u20B9699', rating: '4.6' },
    { name: 'Orchid Delight', price: '\u20B91,299', rating: '4.8' },
    { name: 'Sunflower Basket', price: '\u20B9899', rating: '4.5' },
    { name: 'Mixed Flower Vase', price: '\u20B91,099', rating: '4.7' },
    { name: 'Dried Flower Bunch', price: '\u20B9799', rating: '4.4' },
  ],
  Cakes: [
    { name: 'Chocolate Truffle Cake', price: '\u20B9599', rating: '4.7' },
    { name: 'Red Velvet Cake', price: '\u20B9749', rating: '4.6' },
    { name: 'Butterscotch Cake', price: '\u20B9549', rating: '4.5' },
    { name: 'Pineapple Cake', price: '\u20B9499', rating: '4.4' },
    { name: 'Black Forest Cake', price: '\u20B9649', rating: '4.6' },
  ],
  Personalised: [
    { name: 'Photo Mug', price: '\u20B9399', rating: '4.5' },
    { name: 'Engraved Frame', price: '\u20B9899', rating: '4.6' },
    { name: 'Custom Cushion', price: '\u20B9699', rating: '4.4' },
    { name: 'Name Keychain', price: '\u20B9249', rating: '4.3' },
    { name: 'Photo Collage Frame', price: '\u20B91,199', rating: '4.7' },
  ],
  Hampers: [
    { name: 'Chocolate Hamper', price: '\u20B91,499', rating: '4.8' },
    { name: 'Fruit & Nut Hamper', price: '\u20B91,299', rating: '4.6' },
    { name: 'Spa & Wellness Kit', price: '\u20B91,799', rating: '4.7' },
    { name: 'Tea & Cookies Hamper', price: '\u20B9999', rating: '4.5' },
    { name: 'Festive Gift Hamper', price: '\u20B92,199', rating: '4.9' },
  ],
  Chocolates: [
    { name: 'Assorted Chocolate Box', price: '\u20B9599', rating: '4.6' },
    { name: 'Ferrero Rocher Box', price: '\u20B9799', rating: '4.8' },
    { name: 'Dark Chocolate Bars', price: '\u20B9449', rating: '4.5' },
    { name: 'Belgian Truffle Box', price: '\u20B91,099', rating: '4.7' },
    { name: 'Chocolate Gift Set', price: '\u20B9899', rating: '4.6' },
  ],
};

export default function BestsellersSection() {
  const [activeTab, setActiveTab] = useState('Flowers');
  const products = productsByTab[activeTab];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <h2 className="font-display text-2xl md:text-3xl font-semibold text-charcoal mb-1">
        Shop By Bestsellers
      </h2>
      <p className="text-sm text-charcoal/60 mb-6">
        Discover India&apos;s favourite gifting options, curated bestsellers that make every celebration extra special.
      </p>

      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-charcoal/10 mb-7 overflow-x-auto whitespace-nowrap">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 text-sm font-semibold transition-colors ${
              activeTab === tab
                ? 'text-rose border-b-2 border-rose'
                : 'text-charcoal/50 hover:text-charcoal'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Product cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-5">
        {products.map((p) => (
          <div key={p.name} className="group">
            <div className="aspect-square rounded-2xl bg-blush overflow-hidden mb-3 flex items-center justify-center">
              <span className="text-4xl opacity-40">{'\u{1F490}'}</span>
            </div>
            <h3 className="text-sm font-semibold text-charcoal leading-snug">
              {p.name}
            </h3>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-gold text-xs">{'\u2605'}</span>
              <span className="text-xs text-charcoal/60">{p.rating}</span>
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="font-semibold text-charcoal">{p.price}</span>
              <button className="text-xs font-semibold text-rose hover:text-rose-dark transition-colors">
                Order Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}