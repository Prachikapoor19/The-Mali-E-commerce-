import Header from '@/components/Header';
import CategoryNav from '@/components/CategoryNav';
import HeroBanner from '@/components/HeroBanner';
import CategoryGrid from '@/components/CategoryGrid';
import BestsellersSection from '@/components/BestsellersSection';

export default function Home() {
  return (
    <main>
      <Header />
      <CategoryNav />
      <HeroBanner />
      <CategoryGrid />
      <BestsellersSection />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <p className="text-center text-charcoal/40 font-display text-lg">
          Next: Full Featured Product Grid → Footer
        </p>
      </div>
    </main>
  );
}