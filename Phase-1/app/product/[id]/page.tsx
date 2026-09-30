import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import CategoryNav from '@/components/CategoryNav';
import Footer from '@/components/Footer';
import ProductView from '@/components/ProductView';
import { findProduct } from '@/lib/products';

// Product pages are built on first visit and refreshed at most every 60s
// (or immediately when the product is edited in admin).
export const revalidate = 60;

// Nothing prebuilt at deploy time; each product page is created on its first visit and cached
export function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const product = await findProduct(id);
  if (!product) return { title: 'Product not found — The Mali' };
  return {
    title: `${product.name} — The Mali`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await findProduct(id);
  if (!product) notFound();

  return (
    <main>
      <Header />
      <CategoryNav />
      <ProductView product={product} />
      <Footer />
    </main>
  );
}
