'use client';

import { useRouter } from 'next/navigation';
import CartDrawer from './CartDrawer';
import { useCart } from './CartContext';

export default function CartDrawerConnected() {
  const router = useRouter();
  const { items, isCartOpen, closeCart, updateQty, coupon, setCoupon } = useCart();

  return (
    <CartDrawer
      isOpen={isCartOpen}
      onClose={closeCart}
      cartItems={items}
      onUpdateQty={updateQty}
      appliedCoupon={coupon}
      onCouponChange={setCoupon}
      onConfirmOrder={() => {
        closeCart();
        router.push('/checkout');
      }}
    />
  );
}
