export interface CatalogItem {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
}

export const SEARCH_CATALOG: CatalogItem[] = [
  { id: "f1", name: "The Classic Red Rose Delight", category: "Flowers", price: 549, image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&q=80" },
  { id: "f2", name: "Hot Girl Bouquet", category: "Flowers", price: 899, image: "https://images.pexels.com/photos/1408221/pexels-photo-1408221.jpeg?auto=compress&cs=tinysrgb&w=400" },
  { id: "f3", name: "Blue Horizon Blooms", category: "Flowers", price: 2199, image: "https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&cs=tinysrgb&w=400" },
  { id: "f4", name: "For My Better Half", category: "Flowers", price: 499, image: "https://images.pexels.com/photos/1083822/pexels-photo-1083822.jpeg?auto=compress&cs=tinysrgb&w=400" },
  { id: "f5", name: "Sunlit Charm Sunflower", category: "Flowers", price: 2399, image: "https://images.pexels.com/photos/1366630/pexels-photo-1366630.jpeg?auto=compress&cs=tinysrgb&w=400" },
  { id: "c1", name: "Truffle Chocolate Cake", category: "Cakes", price: 599, image: "https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=400" },
  { id: "c2", name: "Fresh Fruit Delight Cake", category: "Cakes", price: 699, image: "https://images.pexels.com/photos/1055272/pexels-photo-1055272.jpeg?auto=compress&cs=tinysrgb&w=400" },
  { id: "c3", name: "Red Velvet Heart Cake", category: "Cakes", price: 799, image: "https://images.pexels.com/photos/1407305/pexels-photo-1407305.jpeg?auto=compress&cs=tinysrgb&w=400" },
  { id: "c4", name: "Butterscotch Crunch Cake", category: "Cakes", price: 549, image: "https://images.pexels.com/photos/1721932/pexels-photo-1721932.jpeg?auto=compress&cs=tinysrgb&w=400" },
  { id: "c5", name: "Black Forest Classic Cake", category: "Cakes", price: 599, image: "https://images.pexels.com/photos/2144112/pexels-photo-2144112.jpeg?auto=compress&cs=tinysrgb&w=400" },
  { id: "p1", name: "Custom LED Photo Frame", category: "Personalised", price: 899, image: "https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg?auto=compress&cs=tinysrgb&w=400" },
  { id: "p2", name: "Engraved Wooden Mug", category: "Personalised", price: 499, image: "https://images.pexels.com/photos/1207918/pexels-photo-1207918.jpeg?auto=compress&cs=tinysrgb&w=400" },
  { id: "p3", name: "Personalised Cushion", category: "Personalised", price: 399, image: "https://images.pexels.com/photos/1248583/pexels-photo-1248583.jpeg?auto=compress&cs=tinysrgb&w=400" },
  { id: "h1", name: "Luxury Gourmet Box", category: "Hampers", price: 2499, image: "https://images.pexels.com/photos/264771/pexels-photo-264771.jpeg?auto=compress&cs=tinysrgb&w=400" },
  { id: "h2", name: "Spa & Wellness Kit", category: "Hampers", price: 1899, image: "https://images.pexels.com/photos/6621472/pexels-photo-6621472.jpeg?auto=compress&cs=tinysrgb&w=400" },
  { id: "ch1", name: "Ferrero Rocher Tower", category: "Chocolates", price: 1199, image: "https://images.pexels.com/photos/918327/pexels-photo-918327.jpeg?auto=compress&cs=tinysrgb&w=400" },
  { id: "ch2", name: "Handcrafted Truffles", category: "Chocolates", price: 899, image: "https://images.pexels.com/photos/65882/chocolate-dark-coffee-confiserie-65882.jpeg?auto=compress&cs=tinysrgb&w=400" },
  { id: "pl1", name: "Money Plant in White Pot", category: "Plants", price: 399, image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=400&fit=crop" },
];