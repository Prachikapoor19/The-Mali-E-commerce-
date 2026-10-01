# The Mali — Backend setup (MongoDB + Admin)

The backend runs inside this Next.js app (Node API routes in `app/api/`), with
MongoDB Atlas as the database. It deploys to Vercel together with the site.

## What it does

| URL | What |
| --- | --- |
| `POST /api/orders` | Places an order. Prices are always re-checked on the server against the live products in MongoDB. |
| `GET /api/orders/MALI123456` | Public order status for the Track Order page (no address or phone numbers). |
| `/admin` | Password-protected page: all orders, filter by status, change status. |
| `POST /api/admin/login`, `/logout` | Admin login (httpOnly cookie, 7 days). |
| `GET /api/admin/orders`, `PATCH /api/admin/orders/[id]` | Admin order list and status update. |
| `GET /api/products` | All visible products for the shop. |
| `GET/POST /api/admin/products` | Admin: list every product (including hidden) / add a product. |
| `PATCH/DELETE /api/admin/products/[id]` | Admin: edit, hide/show (`{ "active": false }`) or delete a product. |

### Products
Products live in MongoDB (`products` collection). The first time the site talks
to an empty database it copies in the 30 starter products from
`components/searchCatalog.ts` (only once — tracked in the `settings` collection).
After that, manage everything from **/admin → Products**: add, edit price/photo/
description, hide (out of stock) or delete. Pages refresh right after a change
(and at least every 60 seconds). Order prices are always re-checked against the
live product list, and hidden products can't be ordered.

Order statuses: `placed` → `preparing` → `out_for_delivery` → `delivered` (or `cancelled`).

Until `MONGODB_URI` is set, checkout keeps working in **demo mode** (orders are
saved only in the customer's browser).

### New-order email alerts
Every new order emails the shop (`lib/orderAlert.ts`) with the items, total to
collect, delivery date/slot, address, phone numbers, gift message and an
"Open admin" button. The email goes out after the customer already sees their
confirmation, and a failed email never affects the order. Set `RESEND_API_KEY`
and `ORDER_ALERT_EMAIL` to turn it on. Without your own verified domain, Resend
only delivers to the email address you signed up to Resend with.

## Environment variables

| Name | Example | Needed |
| --- | --- | --- |
| `MONGODB_URI` | `mongodb+srv://USER:PASSWORD@cluster0.xxxxx.mongodb.net/` | Yes |
| `ADMIN_PASSWORD` | a long password only you know | Yes |
| `MONGODB_DB` | `themali` (default) | No |
| `ADMIN_SECRET` | any long random text | No (recommended) |
| `RESEND_API_KEY` | `re_...` from resend.com → API Keys | For order emails |
| `ORDER_ALERT_EMAIL` | `you@gmail.com` (several: comma-separated) | For order emails |
| `MAIL_FROM` | `The Mali <orders@themali.in>` — only after verifying your domain in Resend | No |

Never commit these values or paste them in chat.

### On your computer
Create `Phase-1/.env.local` (it is already git-ignored):

```
MONGODB_URI=mongodb+srv://USER:PASSWORD@cluster0.xxxxx.mongodb.net/
ADMIN_PASSWORD=your-admin-password
```

Restart `npm run dev` after creating or changing it.

### On Vercel
Project → **Settings → Environment Variables** → add `MONGODB_URI` and
`ADMIN_PASSWORD` for **Production** (and Preview) → **Deployments → ⋯ → Redeploy**.

### MongoDB Atlas
- Free **M0** cluster (AWS, Mumbai).
- **Database Access**: a user with read/write.
- **Network Access**: allow `0.0.0.0/0` (Vercel's servers change IPs).
