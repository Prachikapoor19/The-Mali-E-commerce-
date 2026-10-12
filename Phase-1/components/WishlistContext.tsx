'use client';

import { createContext, useContext, useEffect, useRef, useState, ReactNode } from 'react';
import { useAuth } from './AuthContext';

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

  // Logged-in customers: merge this browser's wishlist with their account once,
  // then keep the account copy up to date so it follows them to every device.
  const { user } = useAuth();
  const syncedFor = useRef<string | null>(null);
  useEffect(() => {
    if (!loaded) return;
    if (!user) {
      syncedFor.current = null;
      return;
    }
    if (syncedFor.current !== user.email) {
      syncedFor.current = user.email;
      setIds((prev) => [...new Set([...prev, ...(user.wishlist ?? [])])]);
    }
  }, [user, loaded]);
  useEffect(() => {
    if (!loaded || !user || syncedFor.current !== user.email) return;
    const t = setTimeout(() => {
      fetch('/api/account/wishlist', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids }),
      }).catch(() => {});
    }, 600);
    return () => clearTimeout(t);
  }, [ids, user, loaded]);

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
