'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface WishlistContextType {
  ids: string[];
  count: number;
  isReady: boolean;
  has: (id: string) => boolean;
  toggle: (id: string) => void;
  remove: (id: string) => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);
const STORAGE_KEY = 'mali-wishlist';

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Load saved wishlist after mount (avoids hydration mismatch)
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      const data = raw ? JSON.parse(raw) : [];
      if (Array.isArray(data)) setIds(data.filter((x) => typeof x === 'string'));
    } catch {
      // ignore broken or blocked storage
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    } catch {
      // storage blocked — wishlist still works for this visit
    }
  }, [ids, loaded]);

  const toggle = (id: string) =>
    setIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [id, ...prev]));
  const remove = (id: string) => setIds((prev) => prev.filter((x) => x !== id));

  return (
    <WishlistContext.Provider
      value={{ ids, count: ids.length, isReady: loaded, has: (id) => ids.includes(id), toggle, remove }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
}
