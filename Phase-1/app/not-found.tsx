import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function NotFound() {
  return (
    <main>
      <Header />
      <section className="px-4 py-20 sm:py-28 text-center max-w-lg mx-auto">
        <p className="font-display text-7xl font-bold text-rose-light">404</p>
        <h1 className="section-title section-title-center mt-4 mb-4">This page wandered off</h1>
        <p className="text-sm text-charcoal/70 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has moved. Let&apos;s get you back to the flowers.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a href="/" className="px-6 py-3 rounded-full bg-botanical text-ivory text-sm font-semibold hover:bg-botanical-light transition-colors">
            Go to Homepage
          </a>
          <a href="/search?q=all" className="px-6 py-3 rounded-full border border-botanical text-botanical text-sm font-semibold hover:bg-blush transition-colors">
            Browse All Gifts
          </a>
        </div>
      </section>
      <Footer />
    </main>
  );
}
