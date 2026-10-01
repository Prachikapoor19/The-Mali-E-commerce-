'use client';

import { useCallback, useEffect, useState } from 'react';
import { PRODUCT_CATEGORIES, discountPercent, type CatalogItem } from '@/components/searchCatalog';
import { formatINR } from '@/components/pricing';

type Category = (typeof PRODUCT_CATEGORIES)[number];

type FormState = {
  name: string;
  category: Category;
  price: string;
  originalPrice: string;
  image: string;
  description: string;
  includes: string; // one per line
  badge: string;
  rating: string;
  reviews: string;
  isPersonalised: boolean;
  active: boolean;
};

const EMPTY: FormState = {
  name: '',
  category: 'Flowers',
  price: '',
  originalPrice: '',
  image: '',
  description: '',
  includes: '',
  badge: '',
  rating: '4.8',
  reviews: '0',
  isPersonalised: false,
  active: true,
};

const toForm = (p: CatalogItem): FormState => ({
  name: p.name,
  category: p.category,
  price: String(p.price),
  originalPrice: String(p.originalPrice),
  image: p.image,
  description: p.description,
  includes: p.includes.join('\n'),
  badge: p.badge ?? '',
  rating: String(p.rating),
  reviews: String(p.reviews),
  isPersonalised: Boolean(p.isPersonalised),
  active: p.active !== false,
});

const input =
  'w-full text-sm px-3 py-2.5 rounded-xl border border-botanical/20 bg-white focus:outline-none focus:border-botanical';
const label = 'text-xs font-semibold text-charcoal/70 mb-1 block';

export default function ProductsAdmin({ onUnauthorized }: { onUnauthorized: () => void }) {
  const [products, setProducts] = useState<CatalogItem[]>([]);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<'all' | Category>('all');
  const [editing, setEditing] = useState<CatalogItem | 'new' | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState('');
  const [notice, setNotice] = useState('');
  const [busyId, setBusyId] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/products', { cache: 'no-store' });
      if (res.status === 401) return onUnauthorized();
      if (!res.ok) return setStatus('error');
      setProducts((await res.json()).products);
      setStatus('ready');
    } catch {
      setStatus('error');
    }
  }, [onUnauthorized]);

  useEffect(() => {
    load();
  }, [load]);

  const flash = (msg: string) => {
    setNotice(msg);
    setTimeout(() => setNotice(''), 3500);
  };

  const openNew = () => {
    setForm(EMPTY);
    setFormError('');
    setEditing('new');
  };
  const openEdit = (p: CatalogItem) => {
    setForm(toForm(p));
    setFormError('');
    setEditing(p);
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setFormError('');
    const body = {
      ...form,
      price: Number(form.price),
      originalPrice: Number(form.originalPrice || form.price),
      rating: Number(form.rating),
      reviews: Number(form.reviews),
      includes: form.includes.split('\n'),
    };
    const isNew = editing === 'new';
    const res = await fetch(isNew ? '/api/admin/products' : `/api/admin/products/${(editing as CatalogItem).id}`, {
      method: isNew ? 'POST' : 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await res.json().catch(() => ({}));
    setSaving(false);
    if (res.status === 401) return onUnauthorized();
    if (!res.ok) return setFormError(data.error || 'Could not save. Please try again.');
    setProducts((list) => (isNew ? [...list, data.product] : list.map((p) => (p.id === data.product.id ? data.product : p))));
    setEditing(null);
    flash(isNew ? 'Product added — it is live on the site.' : 'Changes saved — live on the site.');
  };

  const toggleActive = async (p: CatalogItem) => {
    setBusyId(p.id);
    const res = await fetch(`/api/admin/products/${p.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ active: p.active === false }),
    });
    setBusyId(null);
    if (res.status === 401) return onUnauthorized();
    if (res.ok) {
      const { product } = await res.json();
      setProducts((list) => list.map((x) => (x.id === product.id ? product : x)));
      flash(product.active ? `"${product.name}" is visible again.` : `"${product.name}" is hidden from the shop.`);
    }
  };

  const remove = async (p: CatalogItem) => {
    if (!window.confirm(`Delete "${p.name}" permanently?\n\nTip: use "Hide" instead if it's just out of stock.`)) return;
    setBusyId(p.id);
    const res = await fetch(`/api/admin/products/${p.id}`, { method: 'DELETE' });
    setBusyId(null);
    if (res.status === 401) return onUnauthorized();
    if (res.ok) {
      setProducts((list) => list.filter((x) => x.id !== p.id));
      flash(`"${p.name}" deleted.`);
    }
  };

  const q = query.trim().toLowerCase();
  const shown = products.filter(
    (p) => (category === 'all' || p.category === category) && (!q || p.name.toLowerCase().includes(q))
  );
  const set = <K extends keyof FormState>(k: K, v: FormState[K]) => setForm((f) => ({ ...f, [k]: v }));

  if (status === 'loading') return <p className="p-10 text-center text-sm text-charcoal/60">Loading products…</p>;
  if (status === 'error')
    return (
      <div className="p-10 text-center">
        <p className="text-sm text-charcoal/70">Could not load products.</p>
        <button onClick={load} className="mt-4 px-5 py-2 rounded-full bg-botanical text-ivory text-sm">Try again</button>
      </div>
    );

  const previewOff =
    Number(form.originalPrice) > Number(form.price) && Number(form.price) > 0
      ? Math.round(((Number(form.originalPrice) - Number(form.price)) / Number(form.originalPrice)) * 100)
      : 0;

  return (
    <div>
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3 mb-5">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products…"
          className="flex-1 min-w-[180px] text-sm px-4 py-2.5 rounded-full border border-botanical/20 bg-white focus:outline-none focus:border-botanical"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as 'all' | Category)}
          className="text-sm px-3 py-2.5 rounded-full border border-botanical/20 bg-white"
          aria-label="Filter by category"
        >
          <option value="all">All categories</option>
          {PRODUCT_CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <button onClick={openNew} className="px-5 py-2.5 rounded-full bg-botanical text-ivory text-sm font-bold hover:bg-botanical-light">
          + Add product
        </button>
      </div>

      {notice && <p className="mb-4 text-sm font-semibold text-rose bg-blush rounded-xl px-4 py-2">{notice}</p>}

      <p className="text-xs text-charcoal/50 mb-3">
        {shown.length} of {products.length} products · {products.filter((p) => p.active === false).length} hidden
      </p>

      {/* List */}
      <div className="bg-white rounded-2xl border border-rose-light/30 divide-y divide-rose-light/20">
        {shown.map((p) => {
          const hidden = p.active === false;
          const off = discountPercent(p);
          return (
            <div key={p.id} className={`flex items-center gap-4 p-3 sm:p-4 ${hidden ? 'opacity-60' : ''}`}>
              <img src={p.image} alt="" className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover bg-sand shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-botanical truncate">{p.name}</p>
                <p className="text-xs text-charcoal/55">
                  {p.category} · <span className="font-semibold text-charcoal/80">{formatINR(p.price)}</span>
                  {off > 0 && <span className="line-through ml-1">{formatINR(p.originalPrice)}</span>}
                  {p.badge && <span className="ml-2 text-gold-dark font-semibold">{p.badge}</span>}
                </p>
              </div>
              <span className={`hidden sm:inline text-[11px] font-bold px-2.5 py-1 rounded-full ${hidden ? 'bg-charcoal/10 text-charcoal/60' : 'bg-blush text-rose-dark'}`}>
                {hidden ? 'Hidden' : 'Live'}
              </span>
              <div className="flex flex-wrap gap-2 justify-end">
                <button onClick={() => openEdit(p)} className="text-xs font-semibold px-3 py-1.5 rounded-full border border-botanical/25 hover:bg-blush">
                  Edit
                </button>
                <button
                  onClick={() => toggleActive(p)}
                  disabled={busyId === p.id}
                  className="text-xs font-semibold px-3 py-1.5 rounded-full border border-botanical/25 hover:bg-blush disabled:opacity-50"
                >
                  {hidden ? 'Show' : 'Hide'}
                </button>
                <button
                  onClick={() => remove(p)}
                  disabled={busyId === p.id}
                  className="text-xs font-semibold px-3 py-1.5 rounded-full text-red-600 border border-red-200 hover:bg-red-50 disabled:opacity-50"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
        {shown.length === 0 && <p className="p-10 text-center text-sm text-charcoal/60">No products match.</p>}
      </div>

      {/* Add / edit form */}
      {editing && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-start sm:items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fade-in" onClick={() => setEditing(null)}>
          <form
            onSubmit={save}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl w-full max-w-3xl p-5 sm:p-7 shadow-2xl my-6 animate-pop-in"
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display text-xl font-bold text-botanical">{editing === 'new' ? 'Add product' : 'Edit product'}</h2>
              <button type="button" onClick={() => setEditing(null)} className="w-8 h-8 rounded-full bg-sand text-charcoal" aria-label="Close">
                ✕
              </button>
            </div>

            <div className="grid md:grid-cols-[1fr_220px] gap-6">
              <div className="space-y-4">
                <div>
                  <label className={label}>Product name *</label>
                  <input className={input} value={form.name} onChange={(e) => set('name', e.target.value)} required maxLength={80} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={label}>Category *</label>
                    <select className={input} value={form.category} onChange={(e) => set('category', e.target.value as Category)}>
                      {PRODUCT_CATEGORIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={label}>Badge (optional)</label>
                    <input className={input} value={form.badge} onChange={(e) => set('badge', e.target.value)} placeholder="Bestseller, New, LUXE…" maxLength={24} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={label}>Selling price (₹) *</label>
                    <input className={input} type="number" min={1} value={form.price} onChange={(e) => set('price', e.target.value)} required />
                  </div>
                  <div>
                    <label className={label}>MRP (₹) — for the discount</label>
                    <input className={input} type="number" min={0} value={form.originalPrice} onChange={(e) => set('originalPrice', e.target.value)} placeholder="Same as price" />
                  </div>
                </div>
                <div>
                  <label className={label}>Photo link *</label>
                  <input className={input} value={form.image} onChange={(e) => set('image', e.target.value)} placeholder="https://…" required />
                  <p className="text-[11px] text-charcoal/50 mt-1">Paste an image link starting with https:// (for example from Pexels or your own image hosting).</p>
                </div>
                <div>
                  <label className={label}>Description</label>
                  <textarea className={input + ' min-h-[90px]'} value={form.description} onChange={(e) => set('description', e.target.value)} maxLength={800} />
                </div>
                <div>
                  <label className={label}>What&apos;s included (one per line)</label>
                  <textarea className={input + ' min-h-[90px]'} value={form.includes} onChange={(e) => set('includes', e.target.value)} placeholder={'12 fresh red roses\nFree message card'} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={label}>Rating (0–5)</label>
                    <input className={input} type="number" step="0.1" min={0} max={5} value={form.rating} onChange={(e) => set('rating', e.target.value)} />
                  </div>
                  <div>
                    <label className={label}>Number of reviews</label>
                    <input className={input} type="number" min={0} value={form.reviews} onChange={(e) => set('reviews', e.target.value)} />
                  </div>
                </div>
                <div className="flex flex-wrap gap-5 text-sm">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="accent-botanical w-4 h-4" checked={form.isPersonalised} onChange={(e) => set('isPersonalised', e.target.checked)} />
                    Customer adds a name/message (personalised)
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="accent-botanical w-4 h-4" checked={form.active} onChange={(e) => set('active', e.target.checked)} />
                    Show on the site
                  </label>
                </div>
              </div>

              {/* Live preview */}
              <div>
                <p className={label}>Preview</p>
                <div className="rounded-2xl border border-rose-light/30 overflow-hidden bg-white">
                  <div className="aspect-square bg-sand">
                    {form.image ? <img src={form.image} alt="" className="w-full h-full object-cover" /> : null}
                  </div>
                  <div className="p-3">
                    <p className="text-sm font-semibold text-botanical line-clamp-2">{form.name || 'Product name'}</p>
                    <p className="text-sm mt-1">
                      <span className="font-bold text-botanical">{form.price ? formatINR(Number(form.price)) : '₹—'}</span>
                      {previewOff > 0 && (
                        <>
                          <span className="text-xs text-charcoal/40 line-through ml-1.5">{formatINR(Number(form.originalPrice))}</span>
                          <span className="text-[10px] font-bold text-rose ml-1.5">{previewOff}% OFF</span>
                        </>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {formError && <p className="text-sm text-red-600 mt-4">{formError}</p>}
            <div className="flex justify-end gap-3 mt-6">
              <button type="button" onClick={() => setEditing(null)} className="px-5 py-2.5 rounded-full border border-botanical/25 text-sm font-semibold">
                Cancel
              </button>
              <button disabled={saving} className="px-6 py-2.5 rounded-full bg-botanical text-ivory text-sm font-bold hover:bg-botanical-light disabled:opacity-60">
                {saving ? 'Saving…' : editing === 'new' ? 'Add product' : 'Save changes'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
