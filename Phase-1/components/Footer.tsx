// components/Footer.tsx
import React from "react";

const SHOP = [
  { label: "Flowers", href: "/search?q=flowers" },
  { label: "Cakes", href: "/search?q=cakes" },
  { label: "Plants", href: "/search?q=plants" },
  { label: "Personalised Gifts", href: "/search?q=personalised" },
  { label: "Chocolates", href: "/search?q=chocolates" },
  { label: "Hampers", href: "/search?q=hampers" },
  { label: "Perfumes", href: "/search?q=perfumes" },
  { label: "Dresses & Purses", href: "/search?q=dresses%20purses" },
  { label: "Earrings & Bracelets", href: "/search?q=earrings%20bracelets" },
  { label: "Soft Toys", href: "/search?q=soft%20toys" },
  { label: "Decor", href: "/search?q=decor" },
];

const COMPANY = [
  { label: "About Us", href: "/about-us" },
  { label: "Contact Us", href: "/contact-us" },
  { label: "Track Order", href: "/track-order" },
  { label: "Corporate Gifts", href: "/corporate-gifts" },
  { label: "My Wishlist", href: "/wishlist" },
];

const HELP = [
  { label: "FAQ & Help", href: "/faq" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Refund & Return Policy", href: "/refund-policy" },
];

const svgProps = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

function LinkList({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h4 className="text-[11px] font-bold uppercase tracking-[0.18em] text-gold mb-4">{title}</h4>
      <ul className="space-y-0.5 sm:space-y-1 text-sm text-ivory/75">
        {links.map((l) => (
          <li key={l.href}>
            <a href={l.href} className="inline-flex items-center min-h-9 sm:min-h-0 sm:py-1 hover:text-ivory transition-colors">
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="w-full bg-botanical text-ivory mt-8">
      <div className="px-4 sm:px-6 lg:px-10 xl:px-14 pt-14 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-10 pb-10 border-b border-ivory/10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4">
            <a href="/" className="inline-flex items-center gap-3">
              <img loading="lazy" decoding="async" src="/logo.png" alt="" className="h-12 w-12 rounded-full bg-ivory object-contain p-1" />
              <span className="font-display text-2xl font-bold tracking-wide">The Mali</span>
            </a>
            <p className="text-sm text-ivory/70 leading-relaxed mt-4 max-w-sm">
              Fresh flowers, cakes, plants and thoughtful gifts — handpicked with care and delivered across Lucknow and beyond.
            </p>
            <div className="mt-6 space-y-2 text-sm text-ivory/80">
              <p className="flex items-center gap-2">
                <svg {...svgProps} className="w-4 h-4 text-gold">
                  <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2Z" />
                </svg>
                24/7 Gifting Help: 1800-MALI-GIFT
              </p>
              <p className="flex items-center gap-2">
                <svg {...svgProps} className="w-4 h-4 text-gold">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m3 7 9 6 9-6" />
                </svg>
                <a href="mailto:support@themali.com" className="inline-block py-2 hover:text-ivory">support@themali.com</a>
              </p>
            </div>
          </div>

          <div className="md:col-span-3">
            <LinkList title="Shop" links={SHOP} />
          </div>
          <div className="md:col-span-2">
            <LinkList title="Company" links={COMPANY} />
          </div>
          <div className="col-span-2 md:col-span-3">
            <LinkList title="Help" links={HELP} />
            <div className="mt-6 rounded-2xl bg-ivory/5 border border-ivory/10 p-4">
              <p className="text-xs font-semibold text-gold">Cash on Delivery available</p>
              <p className="text-xs text-ivory/60 mt-1">Pay by cash or UPI when your gift arrives.</p>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-ivory/50 gap-3">
          <p>© {new Date().getFullYear()} The Mali. All rights reserved.</p>
          <p>Made with love in Lucknow</p>
        </div>
      </div>
    </footer>
  );
}
