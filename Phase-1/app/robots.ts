// Tells search engines what they may look at (not the admin, checkout or account pages)
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/admin', '/api/', '/checkout', '/account', '/order-confirmed'] },
    sitemap: 'https://www.themali.in/sitemap.xml',
  };
}