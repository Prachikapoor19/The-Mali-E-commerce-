// Customer accounts ("users" collection) and login sessions ("sessions" collection)
import mongoose, { Schema, type InferSchemaType, type Model } from 'mongoose';

const RecipientSchema = new Schema(
  {
    name: String,
    phone: String,
    address: String,
    city: String,
    pincode: String,
  },
  { _id: false }
);

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String, default: '' },
    // "salt:hash" made with scrypt — the real password is never stored
    passwordHash: { type: String, required: true },
    // Delivery details of the last order, offered again at checkout
    lastRecipient: { type: RecipientSchema, default: null },
    wishlist: { type: [String], default: [] },
    // Slows down password guessing: after too many wrong tries the account waits a bit
    failedLogins: { type: Number, default: 0 },
    lockedUntil: { type: Date, default: null },
  },
  { timestamps: true }
);

export type UserDoc = InferSchemaType<typeof UserSchema> & { _id: mongoose.Types.ObjectId };

export const UserModel: Model<UserDoc> =
  (mongoose.models.User as Model<UserDoc>) || mongoose.model<UserDoc>('User', UserSchema);

const SessionSchema = new Schema({
  // sha256 of the random token in the visitor's cookie (the cookie alone can't be rebuilt from the database)
  tokenHash: { type: String, required: true, unique: true },
  userId: { type: Schema.Types.ObjectId, required: true, index: true },
  // MongoDB deletes the session automatically when this time passes
  expiresAt: { type: Date, required: true, index: { expires: 0 } },
});

export type SessionDoc = InferSchemaType<typeof SessionSchema>;

export const SessionModel: Model<SessionDoc> =
  (mongoose.models.Session as Model<SessionDoc>) || mongoose.model<SessionDoc>('Session', SessionSchema);
