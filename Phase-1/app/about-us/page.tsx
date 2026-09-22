import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AboutUsPage() {
  return (
    <main>
      <Header />
      <section className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-botanical mb-4">
            About The Mali
          </h1>
          <p className="text-charcoal/70 leading-relaxed mb-4">
            The Mali began with a simple idea: gifting should feel personal, fresh, and full of warmth —
            not transactional. From hand-picked flowers to freshly baked cakes and thoughtfully curated
            gift hampers, every product on our shelf is chosen the way you would choose it for someone you love.
          </p>
          <p className="text-charcoal/70 leading-relaxed mb-4">
            We deliver across Lucknow and nationwide, with same-day and express delivery options for
            those moments that can&apos;t wait. Whether it&apos;s a birthday, an anniversary, or just because —
            we&apos;re here to help you say it beautifully.
          </p>
          <p className="text-charcoal/70 leading-relaxed">
            Botanical at heart, luxury in detail — that&apos;s The Mali.
          </p>
        </div>
      </section>
      <Footer />
    </main>
  );
}


