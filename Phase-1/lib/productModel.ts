import mongoose, { Schema, type InferSchemaType, type Model } from 'mongoose';

import { PRODUCT_CATEGORIES } from '@/components/searchCatalog';

export { PRODUCT_CATEGORIES };

const ProductSchema = new Schema(
  {
    productId: { type: String, required: true, unique: true, index: true }, // used in URLs: /product/<productId>
    name: { type: String, required: true },
    category: { type: String, enum: PRODUCT_CATEGORIES, required: true, index: true },
    price: { type: Number, required: true },
    originalPrice: { type: Number, required: true },
    rating: { type: Number, default: 4.8 },
    reviews: { type: Number, default: 0 },
    image: { type: String, required: true },
    description: { type: String, default: '' },
    includes: { type: [String], default: [] },
    isPersonalised: { type: Boolean, default: false },
    badge: { type: String, default: '' },
    active: { type: Boolean, default: true, index: true }, // false = hidden from the shop
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export type ProductDoc = InferSchemaType<typeof ProductSchema>;

export const ProductModel: Model<ProductDoc> =
  (mongoose.models.Product as Model<ProductDoc>) || mongoose.model<ProductDoc>('Product', ProductSchema);

// Tiny key/value store (used to remember that the starter products were added once)
const SettingSchema = new Schema({ key: { type: String, required: true, unique: true }, value: Schema.Types.Mixed });
export const SettingModel =
  (mongoose.models.Setting as Model<{ key: string; value: unknown }>) ||
  mongoose.model<{ key: string; value: unknown }>('Setting', SettingSchema);
