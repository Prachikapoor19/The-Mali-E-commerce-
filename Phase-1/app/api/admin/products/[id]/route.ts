// PATCH  /api/admin/products/<id> — edit a product (any subset of fields, e.g. { active: false })
// DELETE /api/admin/products/<id> — remove a product permanently
import { revalidatePath } from 'next/cache';
import { isAdminRequest } from '@/lib/adminGuard';
import { connectDB, isDbConfigured } from '@/lib/db';
import { ProductModel } from '@/lib/productModel';
import { toItem, validateProductInput } from '@/lib/products';

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: Ctx) {
  if (!(await isAdminRequest())) return Response.json({ error: 'unauthorized' }, { status: 401 });
  if (!isDbConfigured()) return Response.json({ error: 'not_configured' }, { status: 503 });
  const { id } = await params;

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid request' }, { status: 400 });
  }
  const checked = validateProductInput(body, true);
  if ('error' in checked) return Response.json({ error: checked.error }, { status: 400 });

  try {
    await connectDB();
    const current = await ProductModel.findOne({ productId: id }).lean();
    if (!current) return Response.json({ error: 'not_found' }, { status: 404 });
    const update = { ...checked.data };
    // keep MRP >= price when only one of them changes
    const price = update.price ?? current.price;
    const mrp = update.originalPrice ?? current.originalPrice;
    if (mrp < price) update.originalPrice = price;

    const doc = await ProductModel.findOneAndUpdate({ productId: id }, { $set: update }, { new: true }).lean();
    revalidatePath('/', 'layout');
    return Response.json({ product: toItem(doc!) });
  } catch (err) {
    console.error('Edit product failed', err);
    return Response.json({ error: 'Could not save the product' }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: Ctx) {
  if (!(await isAdminRequest())) return Response.json({ error: 'unauthorized' }, { status: 401 });
  if (!isDbConfigured()) return Response.json({ error: 'not_configured' }, { status: 503 });
  const { id } = await params;
  try {
    await connectDB();
    const res = await ProductModel.deleteOne({ productId: id });
    if (res.deletedCount === 0) return Response.json({ error: 'not_found' }, { status: 404 });
    revalidatePath('/', 'layout');
    return Response.json({ ok: true });
  } catch (err) {
    console.error('Delete product failed', err);
    return Response.json({ error: 'Could not delete the product' }, { status: 500 });
  }
}
