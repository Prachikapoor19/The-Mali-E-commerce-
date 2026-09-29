// MongoDB connection (the "M" in MERN), shared by every API route.
// Set MONGODB_URI in .env.local (on your computer) and in Vercel → Settings → Environment Variables.
import mongoose from 'mongoose';

type Cache = { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null };

// Reuse one connection across hot reloads and serverless calls
const globalForMongo = globalThis as unknown as { _mongo?: Cache };
const cache: Cache = globalForMongo._mongo ?? (globalForMongo._mongo = { conn: null, promise: null });

export function isDbConfigured(): boolean {
  return Boolean(process.env.MONGODB_URI);
}

export async function connectDB(): Promise<typeof mongoose> {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('MONGODB_URI is not set');
  if (cache.conn) return cache.conn;
  if (!cache.promise) {
    cache.promise = mongoose.connect(uri, { dbName: process.env.MONGODB_DB || 'themali', bufferCommands: false });
  }
  try {
    cache.conn = await cache.promise;
  } catch (err) {
    cache.promise = null; // allow a retry on the next request
    throw err;
  }
  return cache.conn;
}
