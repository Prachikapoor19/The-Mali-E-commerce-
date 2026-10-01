"use client";

import React, { useEffect, useState } from "react";
import { couponDiscount, deliveryCharge, formatINR, FREE_DELIVERY_ABOVE } from "./pricing";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  customText?: string;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQty: (id: string, delta: number) => void;
  onConfirmOrder: () => void;
  appliedCoupon?: string;
  onCouponChange?: (code: string) => void;
}

export default function CartDrawer({ isOpen, onClose, cartItems, onUpdateQty, onConfirmOrder, appliedCoupon = "", onCouponChange }: CartDrawerProps) {
  const [coupon, setCoupon] = useState(appliedCoupon);
  const [couponMsg, setCouponMsg] = useState("");

  useEffect(() => {
    setCoupon(appliedCoupon);
  }, [appliedCoupon]);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = couponDiscount(appliedCoupon, subtotal);
  const delivery = deliveryCharge(subtotal);
  const total = Math.max(0, subtotal - discount + delivery);

  const applyCouponCode = () => {
    const code = coupon.trim().toUpperCase();
    if (couponDiscount(code, subtotal) > 0) {
      onCouponChange?.(code);
      setCouponMsg("");
    } else {
      onCouponChange?.("");
      setCouponMsg(code ? "This coupon is not valid." : "");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-end animate-fade-in" onClick={onClose}>
      <div className="bg-white w-full max-w-md h-full flex flex-col justify-between p-6 shadow-2xl relative animate-slide-in-right" onClick={(e) => e.stopPropagation()}>
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-rose-light/20">
            <h3 className="font-display font-bold text-lg text-botanical flex items-center gap-2">
              Your Shopping Cart
            </h3>
            <button onClick={onClose} aria-label="Close cart" className="w-8 h-8 rounded-full bg-blush/60 flex items-center justify-center text-charcoal hover:bg-rose hover:text-white transition-colors">
              ✕
            </button>
          </div>

          <div className="divide-y divide-rose-light/20 overflow-y-auto max-h-[50vh] my-4 pr-1">
            {cartItems.length === 0 ? (
              <p className="text-xs text-center text-charcoal/50 py-10">Your cart is currently empty.</p>
            ) : (
              cartItems.map((item) => (
                <div key={item.id + (item.customText || "")} className="py-3 flex gap-3 items-center">
                  <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded-xl shrink-0" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-xs text-botanical line-clamp-1">{item.name}</h4>
                    {item.customText && <p className="text-[10px] text-rose font-medium">Text: "{item.customText}"</p>}
                    <span className="font-bold text-xs text-botanical mt-0.5 block">₹{item.price}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-blush/60 px-2 py-1 rounded-lg border border-rose-light/30">
                    <button onClick={() => onUpdateQty(item.id, -1)} className="text-xs font-bold text-botanical px-1">-</button>
                    <span className="text-xs font-bold">{item.quantity}</span>
                    <button onClick={() => onUpdateQty(item.id, 1)} className="text-xs font-bold text-botanical px-1">+</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {cartItems.length > 0 && (
          <div className="border-t border-rose-light/20 pt-4 space-y-3">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Coupon Code (MALI15 / NEWAPP)"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                className="flex-1 text-xs p-2.5 rounded-xl border border-rose-light/40 font-semibold uppercase text-botanical"
              />
              <button onClick={applyCouponCode} className="px-4 py-2.5 bg-botanical text-ivory text-xs font-bold rounded-xl hover:bg-botanical-light transition-colors">
                Apply
              </button>
            </div>
            {couponMsg && <p className="text-[11px] text-red-600 -mt-1">{couponMsg}</p>}

            <div className="space-y-1 text-xs">
              <div className="flex justify-between text-charcoal/60">
                <span>Subtotal</span>
                <span>{formatINR(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-rose font-bold">
                  <span>Coupon Discount</span>
                  <span>-{formatINR(discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-charcoal/60">
                <span>Delivery</span>
                <span>{delivery === 0 ? "FREE" : formatINR(delivery)}</span>
              </div>
              {delivery > 0 && (
                <p className="text-[10px] text-charcoal/50">Add {formatINR(FREE_DELIVERY_ABOVE - subtotal)} more for free delivery</p>
              )}
              <div className="flex justify-between font-bold text-sm text-botanical pt-2 border-t border-rose-light/20">
                <span>Total Amount</span>
                <span>{formatINR(total)}</span>
              </div>
            </div>

            <button onClick={onConfirmOrder} className="w-full py-3.5 bg-rose text-ivory text-xs font-bold rounded-xl hover:bg-rose-dark transition-colors shadow-xs">
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}