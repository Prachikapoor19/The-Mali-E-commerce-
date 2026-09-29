'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/components/CartContext';
import { couponDiscount, deliveryCharge, DELIVERY_SLOTS, formatINR, FREE_DELIVERY_ABOVE } from '@/components/pricing';
import { makeOrderId, saveOrder, type Order } from '@/components/orders';

// YYYY-MM-DD in the visitor's own timezone
function toDateInput(d: Date) {
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

type FormState = {
  recipientName: string;
  recipientPhone: string;
  address: string;
  city: string;
  pincode: string;
  senderName: string;
  senderPhone: string;
  giftMessage: string;
};

const EMPTY_FORM: FormState = {
  recipientName: '',
  recipientPhone: '',
  address: '',
  city: '',
  pincode: '',
  senderName: '',
  senderPhone: '',
  giftMessage: '',
};

const inputClass =
  'w-full text-sm px-4 py-3 rounded-xl border border-botanical/20 bg-white focus:outline-none focus:border-botanical placeholder:text-charcoal/40';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, isReady, updateQty, clearCart, coupon, setCoupon } = useCart();

  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState | 'date', string>>>({});
  const [today, setToday] = useState('');
  const [maxDate, setMaxDate] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [slotId, setSlotId] = useState<string>('sameday');
  const [couponInput, setCouponInput] = useState('');
  const [couponMsg, setCouponMsg] = useState('');
  const [placing, setPlacing] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Dates are set after mount so they use the visitor's clock
  useEffect(() => {
    const now = new Date();
    const t = toDateInput(now);
    const max = new Date(now);
    max.setDate(max.getDate() + 30);
    setToday(t);
    setDeliveryDate(t);
    setMaxDate(toDateInput(max));
  }, []);

  useEffect(() => {
    setCouponInput(coupon);
  }, [coupon]);

  const isToday = deliveryDate === today;
  // Express 60-minute delivery only makes sense for today
  useEffect(() => {
    if (!isToday && slotId === 'express') setSlotId('sameday');
  }, [isToday, slotId]);

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const discount = couponDiscount(coupon, subtotal);
  const baseDelivery = deliveryCharge(subtotal);
  const slot = DELIVERY_SLOTS.find((s) => s.id === slotId) ?? DELIVERY_SLOTS[1];
  const delivery = baseDelivery + slot.fee;
  const total = Math.max(0, subtotal - discount + delivery);

  const setField = (key: keyof FormState, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const applyCoupon = () => {
    const code = couponInput.trim().toUpperCase();
    if (!code) {
      setCoupon('');
      setCouponMsg('');
    } else if (couponDiscount(code, subtotal) > 0) {
      setCoupon(code);
      setCouponMsg('');
    } else {
      setCoupon('');
      setCouponMsg('This coupon is not valid.');
    }
  };

  const validate = () => {
    const e: typeof errors = {};
    if (!form.recipientName.trim()) e.recipientName = "Enter the recipient's name";
    if (!/^[6-9]\d{9}$/.test(form.recipientPhone)) e.recipientPhone = 'Enter a valid 10-digit mobile number';
    if (form.address.trim().length < 10) e.address = 'Enter the full delivery address';
    if (!form.city.trim()) e.city = 'Enter the city';
    if (!/^\d{6}$/.test(form.pincode)) e.pincode = 'Enter a valid 6-digit pincode';
    if (!form.senderName.trim()) e.senderName = 'Enter your name';
    if (!/^[6-9]\d{9}$/.test(form.senderPhone)) e.senderPhone = 'Enter a valid 10-digit mobile number';
    if (!deliveryDate || deliveryDate < today || (maxDate && deliveryDate > maxDate)) e.date = 'Choose a date within the next 30 days';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const placeOrder = async () => {
    if (!validate()) {
      // Bring the first error into view
      setTimeout(() => document.querySelector('[data-error="true"]')?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 0);
      return;
    }
    setPlacing(true);
    setSubmitError('');

    const details = {
      recipient: {
        name: form.recipientName.trim(),
        phone: form.recipientPhone,
        address: form.address.trim(),
        city: form.city.trim(),
        pincode: form.pincode,
      },
      sender: { name: form.senderName.trim(), phone: form.senderPhone },
      deliveryDate,
      slotId: slot.id,
      giftMessage: form.giftMessage.trim(),
      coupon,
    };

    // Our own copy for the confirmation page on this device
    const finish = (orderId: string, totals: { subtotal: number; discount: number; delivery: number; total: number }) => {
      const order: Order = {
        id: orderId,
        placedAt: new Date().toISOString(),
        items,
        ...details,
        slotName: slot.name,
        paymentMethod: 'Cash on Delivery',
        ...totals,
      };
      saveOrder(order);
      clearCart();
      router.push(`/order-confirmed?id=${orderId}`);
    };

    try {
      // Save the order in the database (MongoDB) via our API
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...details,
          items: items.map((i) => ({ id: i.id, quantity: i.quantity, customText: i.customText })),
        }),
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        finish(data.orderId, { subtotal: data.subtotal, discount: data.discount, delivery: data.delivery, total: data.total });
        return;
      }
      if (res.status === 503 && data.error === 'not_configured') {
        // Database not connected yet (demo mode): keep the order on this device only
        finish(makeOrderId(), { subtotal, discount, delivery, total });
        return;
      }
      setSubmitError(data.error || 'Could not place the order. Please try again.');
    } catch {
      setSubmitError('No internet connection. Please check and try again.');
    }
    setPlacing(false);
  };

  const fieldError = (key: keyof FormState | 'date') =>
    errors[key] ? (
      <p data-error="true" className="text-[11px] text-red-600 mt-1">
        {errors[key]}
      </p>
    ) : null;

  // ---------- Loading / empty states ----------
  if (!isReady) {
    return (
      <main>
        <Header />
        <div className="py-24 text-center text-sm text-charcoal/50">Loading your cart…</div>
        <Footer />
      </main>
    );
  }

  if (items.length === 0 && !placing) {
    return (
      <main>
        <Header />
        <section className="px-4 py-20 text-center max-w-md mx-auto">
          <h1 className="section-title section-title-center mb-4">Your cart is empty</h1>
          <p className="text-sm text-charcoal/60 mb-8">Add some flowers, cakes or gifts to get started.</p>
          <a href="/" className="inline-block px-6 py-3 rounded-full bg-botanical text-ivory text-sm font-semibold hover:bg-botanical-light transition-colors">
            Continue Shopping
          </a>
        </section>
        <Footer />
      </main>
    );
  }

  // ---------- Checkout ----------
  return (
    <main>
      <Header />

      <section className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 py-8 sm:py-10">
        <h1 className="section-title mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-[1fr_380px] gap-8 items-start">
          {/* LEFT: details */}
          <div className="space-y-6">
            {/* Recipient */}
            <div className="bg-white rounded-2xl border border-rose-light/30 p-5 sm:p-6">
              <h2 className="font-display text-lg font-bold text-botanical mb-4">1. Delivery Address</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-charcoal/70 mb-1 block">Recipient&apos;s name</label>
                  <input className={inputClass} value={form.recipientName} onChange={(e) => setField('recipientName', e.target.value)} placeholder="Who is this gift for?" />
                  {fieldError('recipientName')}
                </div>
                <div>
                  <label className="text-xs font-semibold text-charcoal/70 mb-1 block">Recipient&apos;s mobile</label>
                  <input className={inputClass} inputMode="numeric" maxLength={10} value={form.recipientPhone} onChange={(e) => setField('recipientPhone', e.target.value.replace(/\D/g, ''))} placeholder="10-digit number" />
                  {fieldError('recipientPhone')}
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-charcoal/70 mb-1 block">Full address</label>
                  <textarea className={inputClass + ' min-h-[84px]'} value={form.address} onChange={(e) => setField('address', e.target.value)} placeholder="House / flat no., street, landmark" />
                  {fieldError('address')}
                </div>
                <div>
                  <label className="text-xs font-semibold text-charcoal/70 mb-1 block">City</label>
                  <input className={inputClass} value={form.city} onChange={(e) => setField('city', e.target.value)} placeholder="e.g. Lucknow" />
                  {fieldError('city')}
                </div>
                <div>
                  <label className="text-xs font-semibold text-charcoal/70 mb-1 block">Pincode</label>
                  <input className={inputClass} inputMode="numeric" maxLength={6} value={form.pincode} onChange={(e) => setField('pincode', e.target.value.replace(/\D/g, ''))} placeholder="6-digit pincode" />
                  {fieldError('pincode')}
                </div>
              </div>
            </div>

            {/* Date & slot */}
            <div className="bg-white rounded-2xl border border-rose-light/30 p-5 sm:p-6">
              <h2 className="font-display text-lg font-bold text-botanical mb-4">2. Delivery Date &amp; Time</h2>
              <div className="max-w-xs mb-4">
                <label className="text-xs font-semibold text-charcoal/70 mb-1 block">Delivery date</label>
                <input
                  type="date"
                  className={inputClass}
                  value={deliveryDate}
                  min={today}
                  max={maxDate}
                  onChange={(e) => {
                    setDeliveryDate(e.target.value);
                    setErrors((er) => ({ ...er, date: undefined }));
                  }}
                />
                {fieldError('date')}
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {DELIVERY_SLOTS.map((s) => {
                  const disabled = s.id === 'express' && !isToday;
                  const active = slotId === s.id;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      disabled={disabled}
                      onClick={() => setSlotId(s.id)}
                      className={`text-left p-4 rounded-xl border transition-all ${
                        active ? 'border-botanical bg-blush' : 'border-botanical/15 hover:border-botanical/40'
                      } ${disabled ? 'opacity-40 cursor-not-allowed' : ''}`}
                    >
                      <span className="flex justify-between items-center">
                        <span className="text-sm font-bold text-botanical">{s.name}</span>
                        <span className="text-xs font-semibold text-rose">{s.fee === 0 ? 'Free' : '+' + formatINR(s.fee)}</span>
                      </span>
                      <span className="text-xs text-charcoal/60 block mt-0.5">{disabled ? 'Only for today’s delivery' : s.time}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Gift message */}
            <div className="bg-white rounded-2xl border border-rose-light/30 p-5 sm:p-6">
              <h2 className="font-display text-lg font-bold text-botanical mb-1">3. Gift Message</h2>
              <p className="text-xs text-charcoal/60 mb-3">We&apos;ll print this on a free greeting card. (Optional)</p>
              <textarea
                className={inputClass + ' min-h-[96px]'}
                maxLength={200}
                value={form.giftMessage}
                onChange={(e) => setField('giftMessage', e.target.value)}
                placeholder="Happy Birthday! Wishing you a year full of love and laughter."
              />
              <p className="text-[11px] text-charcoal/40 text-right mt-1">{form.giftMessage.length}/200</p>
            </div>

            {/* Sender */}
            <div className="bg-white rounded-2xl border border-rose-light/30 p-5 sm:p-6">
              <h2 className="font-display text-lg font-bold text-botanical mb-4">4. Your Details</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-charcoal/70 mb-1 block">Your name</label>
                  <input className={inputClass} value={form.senderName} onChange={(e) => setField('senderName', e.target.value)} placeholder="Your full name" />
                  {fieldError('senderName')}
                </div>
                <div>
                  <label className="text-xs font-semibold text-charcoal/70 mb-1 block">Your mobile</label>
                  <input className={inputClass} inputMode="numeric" maxLength={10} value={form.senderPhone} onChange={(e) => setField('senderPhone', e.target.value.replace(/\D/g, ''))} placeholder="For order updates" />
                  {fieldError('senderPhone')}
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className="bg-white rounded-2xl border border-rose-light/30 p-5 sm:p-6">
              <h2 className="font-display text-lg font-bold text-botanical mb-4">5. Payment</h2>
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-4 rounded-xl border border-botanical bg-blush cursor-pointer">
                  <input type="radio" name="payment" defaultChecked className="accent-botanical" />
                  <span>
                    <span className="text-sm font-bold text-botanical block">Cash on Delivery</span>
                    <span className="text-xs text-charcoal/60">Pay by cash or UPI when the gift arrives</span>
                  </span>
                </label>
                <label className="flex items-center gap-3 p-4 rounded-xl border border-botanical/15 opacity-50 cursor-not-allowed">
                  <input type="radio" name="payment" disabled />
                  <span>
                    <span className="text-sm font-bold text-botanical block">UPI / Cards / Netbanking</span>
                    <span className="text-xs text-charcoal/60">Coming soon</span>
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* RIGHT: summary */}
          <aside className="bg-white rounded-2xl border border-rose-light/30 p-5 sm:p-6 lg:sticky lg:top-44">
            <h2 className="font-display text-lg font-bold text-botanical mb-4">Order Summary</h2>

            <div className="divide-y divide-rose-light/20 max-h-72 overflow-y-auto pr-1">
              {items.map((item) => (
                <div key={item.id + (item.customText || '')} className="py-3 flex gap-3 items-center">
                  <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded-xl shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-botanical line-clamp-1">{item.name}</p>
                    {item.customText && <p className="text-[10px] text-rose line-clamp-1">Text: &quot;{item.customText}&quot;</p>}
                    <p className="text-xs font-bold text-botanical mt-0.5">{formatINR(item.price * item.quantity)}</p>
                  </div>
                  <div className="flex items-center gap-2 bg-blush px-2 py-1 rounded-lg">
                    <button onClick={() => updateQty(item.id, -1)} className="text-xs font-bold text-botanical px-1" aria-label="Decrease">-</button>
                    <span className="text-xs font-bold">{item.quantity}</span>
                    <button onClick={() => updateQty(item.id, 1)} className="text-xs font-bold text-botanical px-1" aria-label="Increase">+</button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-2 mt-4">
              <input
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
                placeholder="Coupon code"
                className="flex-1 text-xs px-3 py-2.5 rounded-xl border border-botanical/20 uppercase font-semibold"
              />
              <button onClick={applyCoupon} className="px-4 text-xs font-bold rounded-xl bg-botanical text-ivory hover:bg-botanical-light transition-colors">
                Apply
              </button>
            </div>
            {couponMsg && <p className="text-[11px] text-red-600 mt-1">{couponMsg}</p>}
            {coupon && discount > 0 && <p className="text-[11px] text-rose font-semibold mt-1">{coupon} applied</p>}

            <div className="space-y-2 text-sm mt-5">
              <div className="flex justify-between text-charcoal/70">
                <span>Subtotal</span>
                <span>{formatINR(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-rose font-semibold">
                  <span>Coupon discount</span>
                  <span>-{formatINR(discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-charcoal/70">
                <span>Delivery ({slot.name})</span>
                <span>{delivery === 0 ? 'FREE' : formatINR(delivery)}</span>
              </div>
              {baseDelivery > 0 && (
                <p className="text-[11px] text-charcoal/50">Add {formatINR(FREE_DELIVERY_ABOVE - subtotal)} more to get free standard delivery</p>
              )}
              <div className="flex justify-between font-bold text-base text-botanical pt-3 border-t border-rose-light/30">
                <span>Total</span>
                <span>{formatINR(total)}</span>
              </div>
            </div>

            <button
              onClick={placeOrder}
              disabled={placing}
              className="w-full mt-5 py-3.5 rounded-full bg-rose text-ivory text-sm font-bold hover:bg-rose-dark transition-colors disabled:opacity-60"
            >
              {placing ? 'Placing order…' : `Place Order · ${formatINR(total)}`}
            </button>
            {submitError && <p className="text-xs text-red-600 text-center mt-3">{submitError}</p>}
            <p className="text-[11px] text-charcoal/50 text-center mt-3">
              By placing this order you agree to our <a href="/terms-and-conditions" className="underline">Terms</a> and{' '}
              <a href="/refund-policy" className="underline">Refund Policy</a>.
            </p>
          </aside>
        </div>
      </section>

      <Footer />
    </main>
  );
}
