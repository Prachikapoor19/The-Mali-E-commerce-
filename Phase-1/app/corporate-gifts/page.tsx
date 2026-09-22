import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function CorporateGiftsPage() {
  return (
    <main>
      <Header />
      <section className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-botanical mb-4">
            Corporate Gifting
          </h1>
          <p className="text-charcoal/70 leading-relaxed mb-6">
            Employee milestones, client appreciation, festive hampers, or event favours — The Mali helps
            businesses gift at scale without losing the personal touch. Branded packaging, bulk pricing,
            and pan-India delivery, handled end to end.
          </p>

          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            {['Bulk Pricing', 'Branded Packaging', 'Pan-India Delivery'].map((f) => (
              <div key={f} className="bg-blush rounded-xl p-4 text-center">
                <p className="text-sm font-semibold text-botanical">{f}</p>
              </div>
            ))}
          </div>

          <a href="/contact-us" className="inline-block bg-rose hover:bg-rose-dark text-ivory font-semibold px-6 py-2.5 rounded-full transition-colors">
            Get a Custom Quote
          </a>
        </div>
      </section>
      <Footer />
    </main>
  );
}