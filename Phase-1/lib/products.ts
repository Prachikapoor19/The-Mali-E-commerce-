// Server-side product access. Products live in MongoDB; the first time the site
// talks to an empty database it copies in the starter products from
// components/searchCatalog.ts. Without a database it simply uses that list.
import { connectDB, isDbConfigured } from './db';
import { ProductModel, SettingModel, PRODUCT_CATEGORIES } from './productModel';
import { SEARCH_CATALOG, type CatalogItem } from '@/components/searchCatalog';

type Lean = {
  productId: string;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  rating?: number | null;
  reviews?: number | null;
  image: string;
  description?: string | null;
  includes?: string[] | null;
  isPersonalised?: boolean | null;
  badge?: string | null;
  active?: boolean | null;
};

export function toItem(d: Lean): CatalogItem {
  return {
    id: d.productId,
    name: d.name,
    category: d.category as CatalogItem['category'],
    price: d.price,
    originalPrice: d.originalPrice,
    rating: d.rating ?? 4.8,
    reviews: d.reviews ?? 0,
    image: d.image,
    description: d.description ?? '',
    includes: d.includes ?? [],
    isPersonalised: Boolean(d.isPersonalised),
    badge: d.badge || undefined,
    active: d.active !== false,
  };
}

const SEEDED_KEY = 'starterProductsAdded';

async function ensureSeeded() {
  const already = await SettingModel.findOne({ key: SEEDED_KEY }).lean();
  if (already) return;
  if ((await ProductModel.estimatedDocumentCount()) === 0) {
    try {
      await ProductModel.insertMany(
        SEARCH_CATALOG.map((p, i) => ({
          productId: p.id,
          name: p.name,
          category: p.category,
          price: p.price,
          originalPrice: p.originalPrice,
          rating: p.rating,
          reviews: p.reviews,
          image: p.image,
          description: p.description,
          includes: p.includes,
          isPersonalised: Boolean(p.isPersonalised),
          badge: p.badge ?? '',
          active: true,
          sortOrder: i,
        })),
        { ordered: false }
      );
    } catch (err) {
      // Two requests seeding at once → duplicate keys; the products are there either way
      if ((err as { code?: number }).code !== 11000) throw err;
    }
  }
  try {
    await SettingModel.updateOne({ key: SEEDED_KEY }, { $set: { value: true } }, { upsert: true });
  } catch (err) {
    if ((err as { code?: number }).code !== 11000) throw err; // another request just saved it
  }
}

/** Shop products (visible only). Falls back to the built-in list if the database is unavailable. */
export async function listProducts(): Promise<CatalogItem[]> {
  if (!isDbConfigured()) return SEARCH_CATALOG;
  try {
    await connectDB();
    await ensureSeeded();
    const docs = await ProductModel.find({ active: true }).sort({ sortOrder: 1, createdAt: 1 }).lean();
    return docs.map((d) => toItem(d as Lean));
  } catch (err) {
    console.error('Loading products failed, using built-in list', err);
    return SEARCH_CATALOG;
  }
}

/** Every product including hidden ones (admin). Throws if the database is unavailable. */
export async function listAllProducts(): Promise<CatalogItem[]> {
  await connectDB();
  await ensureSeeded();
  const docs = await ProductModel.find({}).sort({ sortOrder: 1, createdAt: 1 }).lean();
  return docs.map((d) => toItem(d as Lean));
}

export async function findProduct(id: string): Promise<CatalogItem | undefined> {
  return (await listProducts()).find((p) => p.id === id);
}

// ---------- Admin input checking ----------
export type ProductInput = {
  name: string;
  category: (typeof PRODUCT_CATEGORIES)[number];
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  image: string;
  description: string;
  includes: string[];
  isPersonalised: boolean;
  badge: string;
  active: boolean;
};

const s = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

/** Returns clean fields or an error message. `partial` allows updating only some fields. */
export function validateProductInput(
  body: Record<string, unknown>,
  partial = false
): { data: Partial<ProductInput> } | { error: string } {
  const data: Partial<ProductInput> = {};
  const has = (k: string) => Object.prototype.hasOwnProperty.call(body, k);

  if (!partial || has('name')) {
    const name = s(body.name, 80);
    if (name.length < 2) return { error: 'Please enter a product name' };
    data.name = name;
  }
  if (!partial || has('category')) {
    const category = s(body.category, 30);
    if (!(PRODUCT_CATEGORIES as readonly string[]).includes(category)) return { error: 'Please choose a category' };
    data.category = category as ProductInput['category'];
  }
  if (!partial || has('price')) {
    const price = Math.round(Number(body.price));
    if (!Number.isFinite(price) || price < 1 || price > 200000) return { error: 'Price must be between ₹1 and ₹2,00,000' };
    data.price = price;
  }
  if (!partial || has('originalPrice')) {
    const op = Math.round(Number(body.originalPrice || 0));
    if (!Number.isFinite(op) || op < 0 || op > 200000) return { error: 'MRP is not valid' };
    data.originalPrice = op;
  }
  if (!partial || has('image')) {
    const image = s(body.image, 600);
    if (!/^https:\/\/\S+$/.test(image) && !/^\/[\w\-./]+$/.test(image)) {
      return { error: 'Image must be a link starting with https:// (or a /file in the site)' };
    }
    data.image = image;
  }
  if (!partial || has('description')) data.description = s(body.description, 800);
  if (!partial || has('includes')) {
    const raw = Array.isArray(body.includes) ? body.includes : typeof body.includes === 'string' ? body.includes.split('\n') : [];
    data.includes = raw.map((x) => s(x, 120)).filter(Boolean).slice(0, 12);
  }
  if (!partial || has('badge')) data.badge = s(body.badge, 24);
  if (!partial || has('rating')) {
    const r = Number(body.rating ?? 4.8);
    data.rating = Number.isFinite(r) ? Math.min(5, Math.max(0, Math.round(r * 10) / 10)) : 4.8;
  }
  if (!partial || has('reviews')) {
    const n = Math.round(Number(body.reviews ?? 0));
    data.reviews = Number.isFinite(n) && n >= 0 ? Math.min(n, 10_000_000) : 0;
  }
  if (!partial || has('isPersonalised')) data.isPersonalised = body.isPersonalised === true;
  if (!partial || has('active')) data.active = body.active !== false;

  // MRP lower than the price makes no sense: show no discount instead
  if (data.price !== undefined && data.originalPrice !== undefined && data.originalPrice < data.price) {
    data.originalPrice = data.price;
  }
  return { data };
}

export function makeProductId(name: string): string {
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 40);
  return `${slug || 'product'}-${Math.random().toString(36).slice(2, 6)}`;
}
