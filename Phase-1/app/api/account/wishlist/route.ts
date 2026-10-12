// PUT /api/account/wishlist { ids: string[] } — save the logged-in customer's wishlist
import { UserModel } from '@/lib/userModel';
import { currentUser } from '@/lib/userAuth';

export async function PUT(request: Request) {
  const user = await currentUser().catch(() => null);
  if (!user) return Response.json({ error: 'unauthorized' }, { status: 401 });
  let ids: string[] = [];
  try {
    const body = await request.json();
    ids = Array.isArray(body.ids) ? body.ids.filter((x: unknown) => typeof x === 'string').map((x: string) => x.slice(0, 60)).slice(0, 200) : [];
  } catch {
    return Response.json({ error: 'Invalid request' }, { status: 400 });
  }
  await UserModel.updateOne({ _id: user._id }, { wishlist: [...new Set(ids)] });
  return Response.json({ ok: true });
}
