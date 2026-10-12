'use client';

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import AuthModal from './AuthModal';

export interface AccountUser {
  name: string;
  email: string;
  phone: string;
  lastRecipient: { name: string; phone: string; address: string; city: string; pincode: string } | null;
  wishlist: string[];
}

export type AuthResult = { ok: true } | { ok: false; error?: string; errors?: Record<string, string> };

interface AuthContextType {
  user: AccountUser | null;
  /** false until we know whether someone is logged in */
  ready: boolean;
  openAuth: (tab?: 'login' | 'register') => void;
  login: (email: string, password: string) => Promise<AuthResult>;
  register: (data: { name: string; email: string; phone: string; password: string }) => Promise<AuthResult>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
  setUser: (u: AccountUser | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

async function send(url: string, body: unknown): Promise<{ status: number; data: Record<string, unknown> }> {
  try {
    const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    return { status: res.status, data: await res.json().catch(() => ({})) };
  } catch {
    return { status: 0, data: { error: 'Please check your internet connection and try again.' } };
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AccountUser | null>(null);
  const [ready, setReady] = useState(false);
  const [modal, setModal] = useState<'login' | 'register' | null>(null);

  const refresh = useCallback(async () => {
    try {
      const res = await fetch('/api/auth/me', { cache: 'no-store' });
      const data = await res.json();
      setUser(data.user ?? null);
    } catch {
      // offline — treat as logged out for now
    }
    setReady(true);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const finish = (status: number, data: Record<string, unknown>): AuthResult => {
    if (status >= 200 && status < 300 && data.user) {
      setUser(data.user as AccountUser);
      return { ok: true };
    }
    return {
      ok: false,
      error: typeof data.error === 'string' && data.error !== 'invalid' ? data.error : undefined,
      errors: (data.errors as Record<string, string>) ?? undefined,
    };
  };

  const login = async (email: string, password: string) => {
    const { status, data } = await send('/api/auth/login', { email, password });
    return finish(status, data);
  };

  const register = async (d: { name: string; email: string; phone: string; password: string }) => {
    const { status, data } = await send('/api/auth/register', d);
    return finish(status, data);
  };

  const logout = async () => {
    await send('/api/auth/logout', {});
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, ready, openAuth: (tab = 'login') => setModal(tab), login, register, logout, refresh, setUser }}
    >
      {children}
      {modal && <AuthModal initialTab={modal} onClose={() => setModal(null)} />}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
