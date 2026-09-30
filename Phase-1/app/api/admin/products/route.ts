// GET  /api/admin/products — every product, including hidden ones
// POST /api/admin/products — add a product
import { revalidatePath } from 'next/cache';
import { isAdminRequest } from '@/lib/adminGuard';
import { connectDB, isDbConfigured } from '@/lib/db';
import { ProductModel } from '@/lib/productModel';
import { listAllProducts, makeProductId, toItem, validateProductInput } from '@/lib/products';

export async function GET() {
  if (!(await isAdminRequest())) return Response.json({ error: 'unauthorized' }, { status: 401 });
  if (!isDbConfigured()) return Response.json({ error: 'not_configured' }, { status: 503 });
  try {
    return Response.json({ products: await listAllProducts() });
  } catch (err) {
    console.error('Admin product list failed', err);
    return Response.json({ error: 'server_error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!(await isAdminRequest())) return Response.json({ error: 'unauthorized' }, { status: 401 });
  if (!isDbConfigured()) return Response.json({ error: 'not_configured' }, { status: 503 });

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid request' }, { status: 400 });
  }
  const checked = validateProductInput(body);
  if ('error' in checked) return Response.json({ error: checked.error }, { status: 400 });

  try {
    await connectDB();
    await listAllProducts(); // makes sure starter products exist before adding new ones
    const last = await ProductModel.findOne({}).sort({ sortOrder: -1 }).lean();
    const doc = await ProductModel.create({
      ...checked.data,
      productId: makeProductId(checked.data.name as string),
      sortOrder: (last?.sortOrder ?? 0) + 1,
    });
    revalidatePath('/', 'layout'); // refresh every page that shows products
    return Response.json({ product: toItem(doc.toObject()) }, { status: 201 });
  } catch (err) {
    console.error('Add product failed', err);
    return Response.json({ error: 'Could not save the product' }, { status: 500 });
  }
}
