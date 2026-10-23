// Tells Google every page of the shop, so new products show up in search faster
import type { MetadataRoute } from 'next';
import { listProducts } from '@/lib/products';

const SITE = 'https://www.themali.in';

// Rebuild the list at most once an hour (new products from /admin get picked up)
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = ['', '/search?q=all', '/about-us', '/contact-us', '/corporate-gifts', '/faq', '/track-order',
    '/terms-and-conditions', '/privacy-policy', '/refund-policy'];
  const products = await listProducts();
  return [
    ...pages.map((p) => ({ url: `${SITE}${p}`, changeFrequency: 'weekly' as const, priority: p === '' ? 1 : 0.6 })),
    ...products.map((p) => ({ url: `${SITE}/product/${p.id}`, changeFrequency: 'weekly' as const, priority: 0.8 })),
  ];
}