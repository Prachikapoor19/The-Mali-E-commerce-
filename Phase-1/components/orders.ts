// Orders are saved in the visitor's browser for now (no backend yet).
// When a real backend/payment gateway is added, only this file needs to change.

import type { CartItem } from "./CartContext";

export interface Order {
  id: string;
  placedAt: string; // ISO date-time
  items: CartItem[];
  recipient: {
    name: string;
    phone: string;
    address: string;
    city: string;
    pincode: string;
  };
  sender: { name: string; phone: string };
  deliveryDate: string; // YYYY-MM-DD
  slotId: string;
  slotName: string;
  giftMessage: string;
  paymentMethod: string;
  coupon: string;
  subtotal: number;
  discount: number;
  delivery: number;
  total: number;
}

const KEY = "mali-orders";

export function makeOrderId(): string {
  return "MALI" + Math.floor(100000 + Math.random() * 900000);
}

export function loadOrders(): Order[] {
  try {
    const raw = window.localStorage.getItem(KEY);
    const data = raw ? JSON.parse(raw) : [];
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export function saveOrder(order: Order): boolean {
  try {
    const orders = [order, ...loadOrders()].slice(0, 20);
    window.localStorage.setItem(KEY, JSON.stringify(orders));
    return true;
  } catch {
    return false;
  }
}

export function findOrder(id: string): Order | undefined {
  const clean = id.trim().toUpperCase();
  return loadOrders().find((o) => o.id === clean);
}
