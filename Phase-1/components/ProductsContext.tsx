'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { CatalogItem } from './searchCatalog';

interface ProductsContextType {
  products: CatalogItem[];
  getProduct: (id: string) => CatalogItem | undefined;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

/**
 * Makes the shop's products available to every client component.
 * The page arrives with products from the server; we then fetch the latest
 * list once so admin changes appear straight away.
 */
export function ProductsProvider({ initialProducts, children }: { initialProducts: CatalogItem[]; children: ReactNode }) {
  const [products, setProducts] = useState<CatalogItem[]>(initialProducts);

  useEffect(() => {
    let alive = true;
    fetch('/api/products', { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (alive && Array.isArray(data?.products)) setProducts(data.products);
      })
      .catch(() => {
        // offline: keep what we have
      });
    return () => {
      alive = false;
    };
  }, []);

  return (
    <ProductsContext.Provider value={{ products, getProduct: (id) => products.find((p) => p.id === id) }}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error('useProducts must be used within ProductsProvider');
  return ctx;
}
