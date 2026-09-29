// import type { Metadata } from 'next';
// import { Fraunces, Manrope } from 'next/font/google';
// import './globals.css';

// const fraunces = Fraunces({
//   subsets: ['latin'],
//   weight: ['400', '500', '600', '700'],
//   variable: '--font-fraunces',
// });

// const manrope = Manrope({
//   subsets: ['latin'],
//   weight: ['400', '500', '600', '700', '800'],
//   variable: '--font-manrope',
// });

// export const metadata: Metadata = {
//   title: 'The Mali — Flowers, Cakes & Gifts',
//   description: 'Fresh flowers, cakes, and gifts delivered same-day.',
// };

// export default function RootLayout({
//   children,
// }: Readonly<{ children: React.ReactNode }>) {
//   return (
//     <html lang="en" className={`${fraunces.variable} ${manrope.variable}`}>
//       <body>{children}</body>
//     </html>
//   );
// }

import type { Metadata } from 'next';
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

export const metadata: Metadata = {
  title: 'The Mali — Flowers, Cakes & Gifts',
  description: 'Fresh flowers, cakes, and gifts delivered same-day.',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <WishlistProvider>
            {children}
            <CartDrawerConnected />
            <PersonalizationModalConnected />
            <ImageFallback />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}