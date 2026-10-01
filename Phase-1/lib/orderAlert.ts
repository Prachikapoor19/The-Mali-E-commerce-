// Emails the shop owner whenever a new order comes in.
// Uses Resend (https://resend.com) through its plain HTTPS API — no extra package.
//
// Environment variables (Vercel → Settings → Environment Variables, and .env.local):
//   RESEND_API_KEY      the API key from Resend (starts with "re_")
//   ORDER_ALERT_EMAIL   where alerts go. Several addresses: separate with commas.
//   MAIL_FROM           optional. Until you verify your own domain in Resend, leave it
//                       out: alerts then come from onboarding@resend.dev, which can only
//                       send to the email you signed up to Resend with.
//
// If the key or address is missing, nothing is sent and orders work exactly as before.

type AlertItem = { name: string; price: number; quantity: number; customText?: string | null };

export type OrderAlert = {
  orderId: string;
  items: AlertItem[];
  recipient: { name: string; phone: string; address: string; city: string; pincode: string };
  sender: { name: string; phone: string };
  deliveryDate: string;
  slotName: string;
  giftMessage?: string;
  paymentMethod: string;
  coupon?: string;
  subtotal: number;
  discount: number;
  delivery: number;
  total: number;
};

export function isOrderAlertConfigured() {
  return Boolean(process.env.RESEND_API_KEY && process.env.ORDER_ALERT_EMAIL);
}

const esc = (v: unknown) =>
  String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

const rupees = (n: number) => '₹' + n.toLocaleString('en-IN');

function prettyDate(ymd: string) {
  const d = new Date(ymd + 'T00:00:00');
  return isNaN(d.getTime())
    ? ymd
    : d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
}

function buildEmail(order: OrderAlert, siteUrl: string) {
  const itemCount = order.items.reduce((n, i) => n + i.quantity, 0);
  const subject = `New order ${order.orderId} · ${rupees(order.total)} · ${prettyDate(order.deliveryDate)}`;

  const rows = order.items
    .map(
      (i) => `<tr>
        <td style="padding:8px 0;border-bottom:1px solid #eee">${esc(i.name)}${
          i.customText ? `<div style="font-size:12px;color:#8C6D3B">Personalised: “${esc(i.customText)}”</div>` : ''
        }</td>
        <td style="padding:8px 0;border-bottom:1px solid #eee;text-align:center">× ${i.quantity}</td>
        <td style="padding:8px 0;border-bottom:1px solid #eee;text-align:right">${rupees(i.price * i.quantity)}</td>
      </tr>`
    )
    .join('');

  const line = (label: string, value: string, bold = false) =>
    `<tr><td style="padding:3px 0;color:#555">${label}</td><td style="padding:3px 0;text-align:right;${
      bold ? 'font-weight:700;font-size:16px' : ''
    }">${value}</td></tr>`;

  const html = `<!doctype html><html><body style="margin:0;background:#F6EEE0;font-family:Arial,Helvetica,sans-serif;color:#2B2A20">
  <div style="max-width:560px;margin:0 auto;padding:24px 16px">
    <div style="background:#1F2E20;color:#FDFBF2;border-radius:14px 14px 0 0;padding:18px 22px">
      <div style="font-size:12px;letter-spacing:2px;color:#C9A15A">THE MALI · NEW ORDER</div>
      <div style="font-size:22px;font-weight:700;margin-top:4px">${esc(order.orderId)} · ${rupees(order.total)}</div>
      <div style="font-size:13px;margin-top:4px;opacity:.85">${itemCount} item${itemCount === 1 ? '' : 's'} · ${esc(order.paymentMethod)}</div>
    </div>
    <div style="background:#fff;border-radius:0 0 14px 14px;padding:20px 22px">
      <div style="background:#EAF0E4;border-radius:10px;padding:12px 14px;margin-bottom:16px">
        <b>Deliver on:</b> ${esc(prettyDate(order.deliveryDate))}<br><b>Slot:</b> ${esc(order.slotName)}
      </div>

      <table style="width:100%;border-collapse:collapse;font-size:14px">${rows}</table>

      <table style="width:100%;border-collapse:collapse;font-size:14px;margin-top:10px">
        ${line('Subtotal', rupees(order.subtotal))}
        ${order.discount > 0 ? line(`Discount${order.coupon ? ` (${esc(order.coupon)})` : ''}`, '− ' + rupees(order.discount)) : ''}
        ${line('Delivery', order.delivery > 0 ? rupees(order.delivery) : 'Free')}
        ${line('Total to collect', rupees(order.total), true)}
      </table>

      <h3 style="font-size:14px;margin:20px 0 6px">Deliver to</h3>
      <div style="font-size:14px;line-height:1.5">
        <b>${esc(order.recipient.name)}</b> · <a href="tel:${esc(order.recipient.phone)}" style="color:#3F6C4C">${esc(order.recipient.phone)}</a><br>
        ${esc(order.recipient.address)}<br>${esc(order.recipient.city)} – ${esc(order.recipient.pincode)}
      </div>

      <h3 style="font-size:14px;margin:16px 0 6px">Ordered by</h3>
      <div style="font-size:14px">${esc(order.sender.name)} · <a href="tel:${esc(order.sender.phone)}" style="color:#3F6C4C">${esc(order.sender.phone)}</a></div>

      ${
        order.giftMessage
          ? `<h3 style="font-size:14px;margin:16px 0 6px">Gift message</h3>
             <div style="font-size:14px;background:#F7ECE8;border-radius:10px;padding:10px 12px;font-style:italic">“${esc(order.giftMessage)}”</div>`
          : ''
      }

      <div style="text-align:center;margin-top:22px">
        <a href="${esc(siteUrl)}/admin" style="display:inline-block;background:#3F6C4C;color:#fff;text-decoration:none;padding:11px 22px;border-radius:999px;font-weight:700;font-size:14px">Open admin</a>
      </div>
    </div>
  </div></body></html>`;

  const text = [
    `New order ${order.orderId} — ${rupees(order.total)} (${order.paymentMethod})`,
    `Deliver on ${prettyDate(order.deliveryDate)}, ${order.slotName}`,
    '',
    ...order.items.map((i) => `- ${i.name} x${i.quantity} = ${rupees(i.price * i.quantity)}${i.customText ? ` (personalised: ${i.customText})` : ''}`),
    '',
    `Deliver to: ${order.recipient.name}, ${order.recipient.phone}`,
    `${order.recipient.address}, ${order.recipient.city} - ${order.recipient.pincode}`,
    `Ordered by: ${order.sender.name}, ${order.sender.phone}`,
    order.giftMessage ? `Gift message: ${order.giftMessage}` : '',
    '',
    `Admin: ${siteUrl}/admin`,
  ]
    .filter((l, i, all) => l !== '' || all[i - 1] !== '')
    .join('\n');

  return { subject, html, text };
}

/** Sends the alert. Never throws — a failed email must never break an order. */
export async function sendOrderAlert(order: OrderAlert, siteUrl: string): Promise<boolean> {
  if (!isOrderAlertConfigured()) return false;
  const to = process.env
    .ORDER_ALERT_EMAIL!.split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  const from = process.env.MAIL_FROM?.trim() || 'The Mali Orders <onboarding@resend.dev>';
  const { subject, html, text } = buildEmail(order, siteUrl.replace(/\/$/, ''));

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ from, to, subject, html, text }),
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) {
      console.error('Order alert email failed', res.status, (await res.text()).slice(0, 300));
      return false;
    }
    return true;
  } catch (err) {
    console.error('Order alert email failed', err);
    return false;
  }
}

export { buildEmail as buildOrderAlertEmail };
