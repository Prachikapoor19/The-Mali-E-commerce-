// GET /api/products — all visible products for the shop (from MongoDB)
import { listProducts } from '@/lib/products';

export async function GET() {
  const products = await listProducts();
  return Response.json({ products }, { headers: { 'Cache-Control': 'no-store' } });
}
