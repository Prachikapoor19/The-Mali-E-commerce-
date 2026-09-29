import mongoose, { Schema, type InferSchemaType, type Model } from 'mongoose';

export const ORDER_STATUSES = ['placed', 'preparing', 'out_for_delivery', 'delivered', 'cancelled'] as const;
export type OrderStatus = (typeof ORDER_STATUSES)[number];

const ItemSchema = new Schema(
  {
    productId: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, min: 1 },
    image: String,
    customText: String,
  },
  { _id: false }
);

const OrderSchema = new Schema(
  {
    orderId: { type: String, required: true, unique: true, index: true },
    items: { type: [ItemSchema], required: true },
    recipient: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      pincode: { type: String, required: true },
    },
    sender: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
    },
    deliveryDate: { type: String, required: true }, // YYYY-MM-DD
    slotId: { type: String, required: true },
    slotName: { type: String, required: true },
    giftMessage: { type: String, default: '' },
    paymentMethod: { type: String, default: 'Cash on Delivery' },
    coupon: { type: String, default: '' },
    subtotal: { type: Number, required: true },
    discount: { type: Number, required: true },
    delivery: { type: Number, required: true },
    total: { type: Number, required: true },
    status: { type: String, enum: ORDER_STATUSES, default: 'placed', index: true },
  },
  { timestamps: true }
);

export type OrderDoc = InferSchemaType<typeof OrderSchema>;

// Reuse the compiled model during hot reload
export const OrderModel: Model<OrderDoc> =
  (mongoose.models.Order as Model<OrderDoc>) || mongoose.model<OrderDoc>('Order', OrderSchema);
