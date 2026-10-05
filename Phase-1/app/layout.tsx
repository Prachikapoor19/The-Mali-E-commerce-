import type { Metadata, Viewport } from 'next';
// Fonts are bundled with the site (no download from Google at build time)
import '@fontsource-variable/fraunces';
import '@fontsource-variable/manrope';
import '@fontsource/cinzel/latin-400.css';
import '@fontsource/cinzel/latin-600.css';
import '@fontsource/cinzel/latin-700.css';
import './globals.css';
import { CartProvider } from '@/components/CartContext';
import { WishlistProvider } from '@/components/WishlistContext';
import CartDrawerConnected from '@/components/CartDrawerConnected';
import PersonalizationModalConnected from '@/components/PersonalizationModalConnected';
import ImageFallback from '@/components/ImageFallback';
import ScrollReveal from '@/components/ScrollReveal';
import MobileTabBar from '@/components/MobileTabBar';
import { ProductsProvider } from '@/components/ProductsContext';
import { listProducts } from '@/lib/products';

export const metadata: Metadata = {
  title: 'The Mali — Flowers, Cakes & Gifts',
  description: 'Fresh flowers, cakes, and gifts delivered same-day.',
};

// Phone browser bar in the brand green; content can use the full screen on notched phones
export const viewport: Viewport = {
  themeColor: '#1F2E20',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

// Pages are refreshed at most every 60s (and right away when admin edits a product)
export const revalidate = 60;

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const products = await listProducts();
  return (
    <html lang="en">
      <body>
        <ProductsProvider initialProducts={products}>
          <CartProvider>
            <WishlistProvider>
              {children}
              <MobileTabBar />
              <CartDrawerConnected />
              <PersonalizationModalConnected />
              <ImageFallback />
              <ScrollReveal />
            </WishlistProvider>
          </CartProvider>
        </ProductsProvider>
      </body>
    </html>
  );
}