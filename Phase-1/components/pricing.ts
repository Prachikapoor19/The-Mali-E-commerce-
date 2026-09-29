// Shared price rules so the cart drawer, checkout and order page always agree.

export const FREE_DELIVERY_ABOVE = 999;
export const DELIVERY_CHARGE = 99;

export const DELIVERY_SLOTS = [
  { id: "express", name: "Express 60-Minute", time: "Delivered within 1 hour", fee: 149 },
  { id: "sameday", name: "Same-Day Delivery", time: "Anytime today", fee: 0 },
  { id: "fixed", name: "Fixed Time Slot", time: "2-hour slot of your choice", fee: 99 },
  { id: "midnight", name: "Midnight Delivery", time: "11:00 PM – 11:59 PM", fee: 249 },
] as const;

export type SlotId = (typeof DELIVERY_SLOTS)[number]["id"];

// Returns the discount (in ₹) for a coupon code, or 0 if the code is not valid.
export function couponDiscount(code: string, subtotal: number): number {
  const c = code.trim().toUpperCase();
  if (c === "MALI15") return Math.round(subtotal * 0.15);
  if (c === "NEWAPP") return Math.min(200, subtotal);
  return 0;
}

export function deliveryCharge(subtotal: number): number {
  return subtotal >= FREE_DELIVERY_ABOVE ? 0 : DELIVERY_CHARGE;
}

export function formatINR(n: number): string {
  return "₹" + n.toLocaleString("en-IN");
}
