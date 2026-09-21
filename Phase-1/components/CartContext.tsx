'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

export interface CartProduct {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface CartItem extends CartProduct {
  quantity: number;
  customText?: string;
}

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (product: CartProduct, customText?: string) => void;
  updateQty: (id: string, delta: number) => void;
  clearCart: () => void;
  personalizeProduct: CartProduct | null;
  openPersonalize: (product: CartProduct) => void;
  closePersonalize: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [personalizeProduct, setPersonalizeProduct] = useState<CartProduct | null>(null);

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

  const clearCart = () => setItems([]);
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        isCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        addToCart,
        updateQty,
        clearCart,
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