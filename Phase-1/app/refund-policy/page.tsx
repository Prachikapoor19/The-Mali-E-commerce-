import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function RefundPolicyPage() {
  return (
    <main>
      <Header />
      <section className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-botanical mb-4">
            Refund &amp; Return Policy
          </h1>
          <div className="space-y-4 text-sm text-charcoal/70 leading-relaxed">
            <p>Due to the perishable nature of flowers and cakes, we handle refunds and returns on a case-by-case basis.</p>
            <p><strong className="text-botanical">Damaged or wrong items:</strong> Contact us within 24 hours of delivery with photos, and we&apos;ll arrange a replacement or refund.</p>
            <p><strong className="text-botanical">Cancellations:</strong> Orders can be cancelled up to 4 hours before the scheduled delivery slot for a full refund.</p>
            <p><strong className="text-botanical">Refund timeline:</strong> Approved refunds are processed within 5–7 business days to the original payment method.</p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}