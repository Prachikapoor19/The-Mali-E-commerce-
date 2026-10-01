// Starter product list. On first run these are copied into MongoDB, and from then
// on products are managed from the Admin page (/admin → Products).
// This list is also used as a fallback when the database is not connected.

// Shop categories (shared by the shop, admin form and database)
export const PRODUCT_CATEGORIES = [
  'Flowers', 'Cakes', 'Plants', 'Personalised', 'Chocolates', 'Hampers',
  'Perfumes', 'Dresses', 'Purses', 'Earrings', 'Bracelets', 'Soft Toys', 'Decor',
] as const;

// Categories added in October 2026 (shown together in the "Gifts & More" menu)
export const LIFESTYLE_CATEGORIES = ['Perfumes', 'Dresses', 'Purses', 'Earrings', 'Bracelets', 'Soft Toys', 'Decor'] as const;

export interface CatalogItem {
  id: string;
  name: string;
  category: (typeof PRODUCT_CATEGORIES)[number];
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  image: string;
  description: string;
  includes: string[];
  isPersonalised?: boolean;
  badge?: string;
  active?: boolean; // false = hidden from the shop (admin only)
}

const px = (id: number, w = 800) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

export const SEARCH_CATALOG: CatalogItem[] = [
  // ---------------- Flowers ----------------
  {
    id: 'f1', name: 'The Classic Red Rose Delight', category: 'Flowers', price: 549, originalPrice: 649, rating: 4.9, reviews: 1284,
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80', badge: 'Bestseller',
    description: 'A timeless bunch of fresh red roses, hand-tied by our florists and wrapped in premium paper. The simplest way to say "I love you".',
    includes: ['12 fresh red roses', 'Seasonal fillers', 'Premium wrapping with ribbon', 'Free message card'],
  },
  {
    id: 'f2', name: 'Hot Girl Bouquet', category: 'Flowers', price: 899, originalPrice: 999, rating: 4.8, reviews: 642,
    image: px(30891127), badge: 'Trending',
    description: 'Soft pink roses mixed with delicate white blooms for a bouquet that feels fresh, fun and full of love.',
    includes: ['Pink roses and white seasonal flowers', 'Pastel wrapping', 'Free message card'],
  },
  {
    id: 'f3', name: 'Blue Horizon Blooms', category: 'Flowers', price: 2199, originalPrice: 2449, rating: 4.7, reviews: 318,
    image: px(931177),
    description: 'A generous, statement arrangement of mixed seasonal flowers, designed to brighten up any room for days.',
    includes: ['25+ mixed seasonal stems', 'Designer box arrangement', 'Free message card'],
  },
  {
    id: 'f4', name: 'For My Better Half', category: 'Flowers', price: 499, originalPrice: 599, rating: 4.9, reviews: 987,
    image: px(1083822),
    description: 'Pretty pink blooms in a sweet, compact bouquet — perfect for a little everyday surprise.',
    includes: ['8 pink seasonal flowers', 'Paper wrapping with ribbon', 'Free message card'],
  },
  {
    id: 'f5', name: 'Sunlit Charm Sunflower', category: 'Flowers', price: 2399, originalPrice: 2799, rating: 4.8, reviews: 276,
    image: px(1366630),
    description: 'Big, bright sunflowers that bring instant sunshine. Ideal for congratulations, get-well-soon or just because.',
    includes: ['6 fresh sunflowers', 'Greens and fillers', 'Kraft wrapping', 'Free message card'],
  },

  // ---------------- Cakes ----------------
  {
    id: 'c1', name: 'Truffle Chocolate Cake', category: 'Cakes', price: 599, originalPrice: 699, rating: 4.9, reviews: 2103, image: px(291528), badge: 'Top Rated',
    description: 'Rich chocolate sponge layered with silky dark chocolate truffle. Freshly baked on the day of delivery.',
    includes: ['500 g cake (serves 4–6)', 'Eggless option available', 'Free candle and knife'],
  },
  {
    id: 'c2', name: 'Fresh Fruit Delight', category: 'Cakes', price: 699, originalPrice: 799, rating: 4.8, reviews: 811, image: px(9553728),
    description: 'Light vanilla sponge with fresh cream, topped with a colourful mix of seasonal fruits.',
    includes: ['500 g cake (serves 4–6)', 'Topped with seasonal fruits', 'Free candle and knife'],
  },
  {
    id: 'c3', name: 'Red Velvet Heart Cake', category: 'Cakes', price: 799, originalPrice: 899, rating: 4.9, reviews: 1456, image: px(38774006), badge: 'Bestseller',
    description: 'Heart-shaped red velvet cake with smooth cream-cheese frosting and berries — made for romance.',
    includes: ['500 g heart-shaped cake', 'Cream-cheese frosting', 'Free candle and knife'],
  },
  {
    id: 'c4', name: 'Butterscotch Crunch', category: 'Cakes', price: 549, originalPrice: 649, rating: 4.7, reviews: 690, image: px(19252761),
    description: 'Soft butterscotch sponge with caramel cream and crunchy praline nuts in every bite.',
    includes: ['500 g cake (serves 4–6)', 'Caramel praline topping', 'Free candle and knife'],
  },
  {
    id: 'c5', name: 'Black Forest Classic', category: 'Cakes', price: 599, originalPrice: 699, rating: 4.8, reviews: 1732, image: px(8802102),
    description: 'The all-time favourite: chocolate sponge, whipped cream and cherries, finished with chocolate shavings.',
    includes: ['500 g cake (serves 4–6)', 'Cherries and chocolate shavings', 'Free candle and knife'],
  },

  // ---------------- Personalised ----------------
  {
    id: 'p1', name: 'Custom LED Photo Frame', category: 'Personalised', price: 899, originalPrice: 1099, rating: 4.9, reviews: 540, image: px(9451328), isPersonalised: true, badge: 'Personalise It',
    description: 'Your favourite photo in a warm-glow LED frame. Add a name or a short message to make it truly theirs.',
    includes: ['LED photo frame (8 x 6 in)', 'Your photo and custom text', 'USB cable'],
  },
  {
    id: 'p2', name: 'Engraved Wooden Mug', category: 'Personalised', price: 499, originalPrice: 599, rating: 4.7, reviews: 312, image: px(1207918), isPersonalised: true,
    description: 'A sturdy mug engraved with a name or a short line — a daily reminder of you with every sip.',
    includes: ['350 ml mug', 'Custom name or message', 'Gift box'],
  },
  {
    id: 'p3', name: 'Personalised Cushion', category: 'Personalised', price: 399, originalPrice: 499, rating: 4.8, reviews: 455, image: px(1248583), isPersonalised: true,
    description: 'A soft cushion printed with your text — cosy, cute and perfect for their favourite corner.',
    includes: ['12 x 12 in cushion with filler', 'Custom text print'],
  },
  {
    id: 'p4', name: 'Customized Keychain', category: 'Personalised', price: 299, originalPrice: 399, rating: 4.6, reviews: 208, image: px(1194036), isPersonalised: true,
    description: 'A small keepsake with a big meaning. Add initials, a name or a special date.',
    includes: ['Keychain with custom text', 'Gift pouch'],
  },
  {
    id: 'p5', name: 'Magic Personalised Mug', category: 'Personalised', price: 449, originalPrice: 549, rating: 4.8, reviews: 367, image: px(1566308), isPersonalised: true,
    description: 'Looks plain until you pour a hot drink — then your message magically appears.',
    includes: ['330 ml colour-changing mug', 'Custom message', 'Gift box'],
  },

  // ---------------- Hampers ----------------
  {
    id: 'h1', name: 'Luxury Gourmet Box', category: 'Hampers', price: 2499, originalPrice: 2999, rating: 4.9, reviews: 189, image: px(264771), badge: 'LUXE',
    description: 'A beautifully wrapped box of gourmet treats, chocolates and snacks — our most-gifted luxury hamper.',
    includes: ['Assorted gourmet snacks', 'Premium chocolates', 'Handwritten greeting card', 'Luxury gift box'],
  },
  {
    id: 'h2', name: 'Spa & Wellness Kit', category: 'Hampers', price: 1899, originalPrice: 2199, rating: 4.8, reviews: 231, image: px(6621472),
    description: 'A little self-care in a box: bath and body favourites to help them relax and recharge.',
    includes: ['Body oil and scrub', 'Bath salts', 'Scented candle', 'Gift box'],
  },
  {
    id: 'h3', name: 'Chocolate Basket', category: 'Hampers', price: 1299, originalPrice: 1499, rating: 4.7, reviews: 402, image: px(918327),
    description: 'A basket full of chocolate bars and bites for the sweet tooth in your life.',
    includes: ['10+ assorted chocolates', 'Decorated basket', 'Free message card'],
  },
  {
    id: 'h4', name: 'Dry Fruits Celebration', category: 'Hampers', price: 1599, originalPrice: 1899, rating: 4.9, reviews: 376, image: px(1295572),
    description: 'Premium almonds, cashews and walnuts in an elegant box — a classic festive and corporate gift.',
    includes: ['Almonds, cashews, walnuts (400 g)', 'Elegant gift box', 'Free message card'],
  },
  {
    id: 'h5', name: 'Self Care Luxury Box', category: 'Hampers', price: 2199, originalPrice: 2499, rating: 4.8, reviews: 154, image: px(17555293),
    description: 'A thoughtfully curated box with a handmade cup, silk eye mask and little luxuries for a slow day.',
    includes: ['Handmade ceramic cup', 'Velvet eye mask', 'Scrunchie', 'Gift box'],
  },

  // ---------------- Chocolates ----------------
  {
    id: 'ch1', name: 'Ferrero Rocher Tower', category: 'Chocolates', price: 1199, originalPrice: 1399, rating: 4.9, reviews: 821, image: px(30727980),
    description: 'Golden Ferrero Rocher arranged with fresh white roses — a showstopper for any celebration.',
    includes: ['24 Ferrero Rocher', 'Fresh white roses', 'Decorative stand'],
  },
  {
    id: 'ch2', name: 'Handcrafted Truffles', category: 'Chocolates', price: 899, originalPrice: 999, rating: 4.8, reviews: 297,
    image: 'https://images.pexels.com/photos/65882/chocolate-dark-coffee-confiserie-65882.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Small-batch dark chocolate truffles dusted with cocoa — rich, smooth and made to share.',
    includes: ['16 handcrafted truffles', 'Gift box'],
  },
  {
    id: 'ch3', name: 'Cadbury Celebrations', category: 'Chocolates', price: 499, originalPrice: 599, rating: 4.7, reviews: 1044, image: px(37857736),
    description: 'An assorted box of milk chocolates everyone loves — easy, sweet and always welcome.',
    includes: ['Assorted milk chocolates box', 'Free message card'],
  },
  {
    id: 'ch4', name: 'Belgian Dark Chocolate', category: 'Chocolates', price: 999, originalPrice: 1199, rating: 4.9, reviews: 263, image: px(6167333),
    description: 'Premium Belgian dark chocolate bars for the true chocolate lover.',
    includes: ['4 Belgian dark chocolate bars (100 g each)', 'Gift wrap'],
  },
  {
    id: 'ch5', name: 'Assorted Chocolate Bouquet', category: 'Chocolates', price: 1099, originalPrice: 1299, rating: 4.8, reviews: 388, image: px(13831901),
    description: 'Red roses paired with a box of assorted chocolates — flowers and sweets in one gift.',
    includes: ['6 red roses', 'Box of assorted chocolates', 'Free message card'],
  },

  // ---------------- Plants ----------------
  {
    id: 'pl1', name: 'Money Plant in White Pot', category: 'Plants', price: 399, originalPrice: 499, rating: 4.8, reviews: 912, image: px(1084199), badge: 'Good Luck',
    description: 'A lush, easy-care money plant in a clean white ceramic pot. Believed to bring good luck and prosperity.',
    includes: ['Money plant (Pothos)', 'White ceramic pot', 'Care card'],
  },
  {
    id: 'pl2', name: 'Lucky Bamboo in Glass Vase', category: 'Plants', price: 449, originalPrice: 549, rating: 4.7, reviews: 433, image: px(30384232),
    description: 'Graceful lucky bamboo in a glass vase — lives happily in water and needs almost no care.',
    includes: ['Lucky bamboo stalks', 'Glass vase', 'Care card'],
  },
  {
    id: 'pl3', name: 'Peace Lily', category: 'Plants', price: 599, originalPrice: 699, rating: 4.8, reviews: 358, image: px(28182770),
    description: 'Glossy leaves and elegant white flowers. A calming indoor plant that also helps purify the air.',
    includes: ['Peace lily plant', 'Nursery pot', 'Care card'],
  },
  {
    id: 'pl4', name: 'Succulent in Grey Pot', category: 'Plants', price: 349, originalPrice: 449, rating: 4.6, reviews: 276, image: px(305821),
    description: 'A cute, low-maintenance succulent for a desk or window sill. Water once a week — that is it.',
    includes: ['Succulent plant', 'Grey ceramic pot', 'Care card'],
  },
  {
    id: 'pl5', name: 'Snake Plant', category: 'Plants', price: 649, originalPrice: 799, rating: 4.8, reviews: 301, image: px(4505161),
    description: 'Tall, striking and almost impossible to kill. A great air-purifying plant for bedrooms and offices.',
    includes: ['Snake plant (Sansevieria)', 'Pot', 'Care card'],
  },

  // ---------------- Perfumes ----------------
  {
    id: 'pf1', name: 'Rose Petal Eau de Parfum', category: 'Perfumes', price: 1299, originalPrice: 1599, rating: 4.8, reviews: 214,
    image: 'https://images.unsplash.com/photo-1595425959632-34f2822322ce?w=800&q=80', badge: 'New',
    description: 'A soft, romantic fragrance with notes of fresh rose and warm musk — made to linger all day.',
    includes: ['50 ml eau de parfum', 'Gift box with ribbon', 'Free message card'],
  },
  {
    id: 'pf2', name: 'Ocean Bloom Perfume', category: 'Perfumes', price: 999, originalPrice: 1199, rating: 4.7, reviews: 168,
    image: 'https://images.unsplash.com/photo-1615160460366-2c9a41771b51?w=800&q=80',
    description: 'A fresh, airy scent of sea breeze and white florals. Light enough for every day.',
    includes: ['50 ml eau de toilette', 'Gift box', 'Free message card'],
  },
  {
    id: 'pf3', name: 'Noir Gold Perfume', category: 'Perfumes', price: 1599, originalPrice: 1899, rating: 4.9, reviews: 96,
    image: 'https://images.unsplash.com/photo-1585218334450-afcf929da36e?w=800&q=80', badge: 'LUXE',
    description: 'A rich evening fragrance with amber, oud and a hint of vanilla in an elegant black-and-gold bottle.',
    includes: ['100 ml eau de parfum', 'Luxury gift box', 'Free message card'],
  },

  // ---------------- Dresses ----------------
  {
    id: 'dr1', name: 'White Sweetheart Dress', category: 'Dresses', price: 1899, originalPrice: 2299, rating: 4.7, reviews: 121,
    image: 'https://images.unsplash.com/photo-1540459920617-415d62f1f76b?w=800&q=80', badge: 'New',
    description: 'A graceful white dress with a sweetheart neckline — perfect for brunches, birthdays and photos.',
    includes: ['1 dress (S, M, L, XL — mention size in the message)', 'Gift wrap', 'Free message card'],
  },
  {
    id: 'dr2', name: 'Floral Sundress', category: 'Dresses', price: 1499, originalPrice: 1799, rating: 4.8, reviews: 187,
    image: 'https://images.unsplash.com/photo-1762154057377-cc9d3dd6900c?w=800&q=80', badge: 'Trending',
    description: 'A breezy floral sundress in soft cotton, made for sunny days and easy smiles.',
    includes: ['1 dress (S, M, L, XL — mention size in the message)', 'Gift wrap', 'Free message card'],
  },
  {
    id: 'dr3', name: 'Red Floral Maxi Dress', category: 'Dresses', price: 1999, originalPrice: 2499, rating: 4.6, reviews: 88,
    image: 'https://images.unsplash.com/photo-1502868354157-ec2edd2a1651?w=800&q=80',
    description: 'A flowing maxi dress with a red floral print that\'s festive, feminine and comfortable.',
    includes: ['1 dress (S, M, L, XL — mention size in the message)', 'Gift wrap', 'Free message card'],
  },

  // ---------------- Purses ----------------
  {
    id: 'pu1', name: 'Classic Red Handbag', category: 'Purses', price: 1799, originalPrice: 2199, rating: 4.8, reviews: 142,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80', badge: 'Bestseller',
    description: 'A structured red handbag with a smooth finish — the statement piece every wardrobe needs.',
    includes: ['1 handbag', 'Dust bag', 'Gift box'],
  },
  {
    id: 'pu2', name: 'Pearl White Mini Purse', category: 'Purses', price: 1199, originalPrice: 1499, rating: 4.7, reviews: 109,
    image: 'https://images.unsplash.com/photo-1682745230951-8a5aa9a474a0?w=800&q=80',
    description: 'A dainty white mini purse that fits the essentials and goes with everything.',
    includes: ['1 mini purse', 'Detachable strap', 'Gift box'],
  },
  {
    id: 'pu3', name: 'Floral Print Handbag', category: 'Purses', price: 1399, originalPrice: 1699, rating: 4.6, reviews: 77,
    image: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800&q=80', badge: 'New',
    description: 'A cheerful floral handbag that brings a pop of colour to any outfit.',
    includes: ['1 handbag', 'Gift box', 'Free message card'],
  },

  // ---------------- Earrings ----------------
  {
    id: 'er1', name: 'Blue Stone Silver Earrings', category: 'Earrings', price: 799, originalPrice: 999, rating: 4.8, reviews: 233,
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80', badge: 'Bestseller',
    description: 'Sparkling silver-tone earrings set with deep blue stones — elegant for festive evenings.',
    includes: ['1 pair of earrings', 'Velvet jewellery pouch', 'Gift box'],
  },
  {
    id: 'er2', name: 'Classic Drop Earrings', category: 'Earrings', price: 649, originalPrice: 799, rating: 4.7, reviews: 158,
    image: 'https://images.unsplash.com/photo-1693212793204-bcea856c75fe?w=800&q=80',
    description: 'Simple, graceful drop earrings that go from office to dinner.',
    includes: ['1 pair of earrings', 'Jewellery pouch', 'Gift box'],
  },
  {
    id: 'er3', name: 'Golden Statement Earrings', category: 'Earrings', price: 899, originalPrice: 1099, rating: 4.6, reviews: 94,
    image: 'https://images.unsplash.com/photo-1652766540048-de0a878a3266?w=800&q=80', badge: 'Trending',
    description: 'Bold golden earrings that finish any look — a gift she\'ll wear again and again.',
    includes: ['1 pair of earrings', 'Gift box', 'Free message card'],
  },

  // ---------------- Bracelets ----------------
  {
    id: 'br1', name: 'Gold Chain Bracelet', category: 'Bracelets', price: 899, originalPrice: 1099, rating: 4.8, reviews: 176,
    image: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800&q=80', badge: 'Bestseller',
    description: 'A delicate gold-tone chain bracelet for everyday elegance.',
    includes: ['1 bracelet (adjustable)', 'Jewellery pouch', 'Gift box'],
  },
  {
    id: 'br2', name: 'Heart Charm Silver Bracelet', category: 'Bracelets', price: 749, originalPrice: 899, rating: 4.9, reviews: 212,
    image: 'https://images.unsplash.com/photo-1676291055501-286c48bb186f?w=800&q=80', badge: 'Love',
    description: 'A silver-tone bracelet with little heart charms and red stones — made for saying \'I love you\'.',
    includes: ['1 bracelet (adjustable)', 'Gift box', 'Free message card'],
  },
  {
    id: 'br3', name: 'Multi-Stone Gold Bracelet', category: 'Bracelets', price: 1099, originalPrice: 1299, rating: 4.7, reviews: 83,
    image: 'https://images.unsplash.com/photo-1717605383946-96c6884c36b4?w=800&q=80', badge: 'New',
    description: 'A gold-tone bracelet set with four colourful stones — playful, bright and festive.',
    includes: ['1 bracelet (adjustable)', 'Gift box', 'Free message card'],
  },

  // ---------------- Soft Toys ----------------
  {
    id: 'st1', name: 'Bow-Tie Teddy Bear', category: 'Soft Toys', price: 699, originalPrice: 899, rating: 4.9, reviews: 341,
    image: 'https://images.unsplash.com/photo-1602734846297-9299fc2d4703?w=800&q=80', badge: 'Bestseller',
    description: 'A huggable brown teddy bear in a smart bow tie — the sweetest companion for any gift.',
    includes: ['1 teddy bear (approx. 30 cm)', 'Gift wrap', 'Free message card'],
  },
  {
    id: 'st2', name: 'Red Bow Love Teddy', category: 'Soft Toys', price: 799, originalPrice: 999, rating: 4.8, reviews: 264,
    image: 'https://images.unsplash.com/photo-1556012018-50c5c0da73bf?w=800&q=80', badge: 'Love',
    description: 'A soft teddy with a red bow, perfect for anniversaries, Valentine\'s Day or just because.',
    includes: ['1 teddy bear (approx. 35 cm)', 'Gift wrap', 'Free message card'],
  },
  {
    id: 'st3', name: 'Cuddly Brown Bear', category: 'Soft Toys', price: 549, originalPrice: 699, rating: 4.7, reviews: 198,
    image: 'https://images.unsplash.com/photo-1530325553241-4f6e7690cf36?w=800&q=80',
    description: 'A super-soft brown bear that kids and grown-ups both love to cuddle.',
    includes: ['1 soft toy (approx. 25 cm)', 'Gift wrap', 'Free message card'],
  },

  // ---------------- Decor ----------------
  {
    id: 'dc1', name: 'Eucalyptus Candle Set', category: 'Decor', price: 899, originalPrice: 1099, rating: 4.8, reviews: 147,
    image: 'https://images.unsplash.com/photo-1613068431228-8cb6a1e92573?w=800&q=80', badge: 'New',
    description: 'White pillar candles with eucalyptus leaves for a calm, cosy corner at home.',
    includes: ['3 pillar candles', 'Decorative eucalyptus sprigs', 'Gift box'],
  },
  {
    id: 'dc2', name: 'Warm Fairy String Lights', category: 'Decor', price: 499, originalPrice: 649, rating: 4.7, reviews: 289,
    image: 'https://images.unsplash.com/photo-1513538416877-f11f5fb85d83?w=800&q=80', badge: 'Trending',
    description: 'Warm-white fairy lights to make any room, balcony or celebration glow.',
    includes: ['10 m warm-white string lights', 'USB / plug adapter', 'Gift box'],
  },
  {
    id: 'dc3', name: 'Ceramic Vase with Blooms', category: 'Decor', price: 1199, originalPrice: 1399, rating: 4.8, reviews: 112,
    image: 'https://images.unsplash.com/photo-1534037984048-f20a42c90c2d?w=800&q=80',
    description: 'A white ceramic vase with a pretty pink-and-white flower arrangement for the living room.',
    includes: ['White ceramic vase', 'Artificial flower arrangement (lasts for years)', 'Gift box'],
  },
];

export function findIn(list: CatalogItem[], id: string): CatalogItem | undefined {
  return list.find((p) => p.id === id);
}

// Same-category products first, then others, never the product itself
export function relatedProducts(list: CatalogItem[], id: string, count = 4): CatalogItem[] {
  const current = findIn(list, id);
  const same = list.filter((p) => p.id !== id && p.category === current?.category);
  const others = list.filter((p) => p.id !== id && p.category !== current?.category);
  return [...same, ...others].slice(0, count);
}

export function discountPercent(p: CatalogItem): number {
  return p.originalPrice > p.price ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100) : 0;
}
