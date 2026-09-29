'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export interface CartProduct {
  id: string;
  name: string;
  price: number;
  image: string;
}

export interface CartItem extends CartProduct {
  quantity: number;
  customText?: string;
}

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  isReady: boolean; // true once the saved cart has been loaded
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (product: CartProduct, customText?: string) => void;
  updateQty: (id: string, delta: number) => void;
  clearCart: () => void;
  coupon: string;
  setCoupon: (code: string) => void;
  personalizeProduct: CartProduct | null;
  openPersonalize: (product: CartProduct) => void;
  closePersonalize: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Cart is saved in the browser so it survives a page refresh
const STORAGE_KEY = 'mali-cart';

function loadSaved(): { items: CartItem[]; coupon: string } {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { items: [], coupon: '' };
    const data = JSON.parse(raw);
    return {
      items: Array.isArray(data.items) ? data.items : [],
      coupon: typeof data.coupon === 'string' ? data.coupon : '',
    };
  } catch {
    return { items: [], coupon: '' };
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [coupon, setCoupon] = useState('');
  const [loaded, setLoaded] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [personalizeProduct, setPersonalizeProduct] = useState<CartProduct | null>(null);

  // Load the saved cart once, after the page has mounted (avoids hydration mismatch)
  useEffect(() => {
    const saved = loadSaved();
    setItems(saved.items);
    setCoupon(saved.coupon);
    setLoaded(true);
  }, []);

  // Save whenever the cart changes
  useEffect(() => {
    if (!loaded) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ items, coupon }));
    } catch {
      // storage blocked (private mode etc.) — cart still works for this visit
    }
  }, [items, coupon, loaded]);

  const addToCart = (product: CartProduct, customText?: string) => {
    setItems((prev) => {
      if (!customText) {
        const existing = prev.find((i) => i.id === product.id && !i.customText);
        if (existing) {
          return prev.map((i) =>
            i.id === product.id && !i.customText ? { ...i, quantity: i.quantity + 1 } : i
          );
        }
      }
      return [...prev, { ...product, quantity: 1, customText }];
    });
    setIsCartOpen(true);
  };

  const updateQty = (id: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, quantity: item.quantity + delta } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => {
    setItems([]);
    setCoupon('');
  };
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        isReady: loaded,
        isCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        addToCart,
        updateQty,
        clearCart,
        coupon,
        setCoupon,
        personalizeProduct,
        openPersonalize: (product) => setPersonalizeProduct(product),
        closePersonalize: () => setPersonalizeProduct(null),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
