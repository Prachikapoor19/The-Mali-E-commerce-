'use client';

import PersonalizationModal from './PersonalizationModal';
import { useCart } from './CartContext';

export default function PersonalizationModalConnected() {
  const { personalizeProduct, closePersonalize, addToCart } = useCart();

  if (!personalizeProduct) return null;

  return (
    <PersonalizationModal
      product={personalizeProduct}
      onClose={closePersonalize}
      onSave={(customText) => {
        addToCart(personalizeProduct, customText);
        closePersonalize();
      }}
    />
  );
}