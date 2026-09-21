'use client';

import CartDrawer from './CartDrawer';
import { useCart } from './CartContext';

export default function CartDrawerConnected() {
  const { items, isCartOpen, closeCart, updateQty, clearCart } = useCart();

  return (
    <CartDrawer
      isOpen={isCartOpen}
      onClose={closeCart}
      cartItems={items}
      onUpdateQty={updateQty}
      onConfirmOrder={() => {
        clearCart();
        closeCart();
      }}
    />
  );
}