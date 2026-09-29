import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import CategoryNav from '@/components/CategoryNav';
import Footer from '@/components/Footer';
import ProductView from '@/components/ProductView';
import { SEARCH_CATALOG, getProduct } from '@/components/searchCatalog';

// Every product page is built ahead of time; unknown ids show the 404 page
export const dynamicParams = false;

export function generateStaticParams() {
  return SEARCH_CATALOG.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) return { title: 'Product not found — The Mali' };
  return {
    title: `${product.name} — The Mali`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) notFound();

  return (
    <main>
      <Header />
      <CategoryNav />
      <ProductView id={product.id} />
      <Footer />
    </main>
  );
}
