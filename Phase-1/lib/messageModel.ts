// Contact-form messages ("messages" collection in MongoDB)
import mongoose, { Schema, type InferSchemaType, type Model } from 'mongoose';

export const MESSAGE_STATUSES = ['new', 'read'] as const;
export type MessageStatus = (typeof MESSAGE_STATUSES)[number];

const MessageSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, default: '' },
    message: { type: String, required: true },
    status: { type: String, enum: MESSAGE_STATUSES, default: 'new', index: true },
    // One-way hash of the sender's IP, only used to slow down spam (never shown)
    ipHash: { type: String, default: '', index: true },
  },
  { timestamps: true }
);

export type MessageDoc = InferSchemaType<typeof MessageSchema>;

export const MessageModel: Model<MessageDoc> =
  (mongoose.models.Message as Model<MessageDoc>) || mongoose.model<MessageDoc>('Message', MessageSchema);
