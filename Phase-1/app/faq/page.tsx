import Header from '@/components/Header';
import Footer from '@/components/Footer';

const faqs = [
  { q: 'How fast can I get same-day delivery?', a: 'Order before 6 PM and we deliver the same day in 200+ cities across India.' },
  { q: 'Can I customise a cake or gift?', a: 'Yes — look for the "Personalise" option on eligible products to add a photo or custom message.' },
  { q: 'What if I need to change my delivery address?', a: 'Contact our support team within 2 hours of placing the order and we\u2019ll update it for you.' },
  { q: 'Do you deliver outside Lucknow?', a: 'Yes, we deliver nationwide, with express slots available in select cities.' },
  { q: 'What payment methods do you accept?', a: 'Visa, Mastercard, UPI, Rupay, and Paytm are all supported at checkout.' },
];

export default function FaqPage() {
  return (
    <main>
      <Header />
      <section className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 py-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-botanical mb-6">
            FAQ &amp; Help
          </h1>
          <div className="space-y-3">
            {faqs.map((item) => (
              <details key={item.q} className="bg-blush rounded-xl p-4 group">
                <summary className="font-semibold text-botanical text-sm cursor-pointer list-none flex items-center justify-between">
                  {item.q}
                  <span className="text-charcoal/40 group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="text-sm text-charcoal/70 mt-2">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
