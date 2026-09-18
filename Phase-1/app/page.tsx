// import Header from '@/components/Header';
// import CategoryNav from '@/components/CategoryNav';
// import IconStrip from '@/components/IconStrip';
// import OccasionStrip from '@/components/OccasionStrip';
// import HeroBanner from '@/components/HeroBanner';
// import CategoryGrid from '@/components/CategoryGrid';
// import BestsellersSection from '@/components/BestsellersSection';
// import FlowersCollection from '@/components/FlowersCollection';
// import GiftsForEveryone from '@/components/GiftsForEveryone';
// import FavouriteFlowers from '@/components/FavouriteFlowers';
// import FreshlyBakedCakes from '@/components/FreshlyBakedCakes';
// import GiftsForFeeling from '@/components/GiftsForFeeling';
// import NewlyLaunched from '@/components/NewlyLaunched';
// import OffersBanner from '@/components/OffersBanner';
// import PlantsSection from '@/components/PlantsSection';
// import BrandsSection from '@/components/BrandsSection';
// import GiftingStories from '@/components/GiftingStories';
// import Footer from '@/components/Footer';

// export default function Home() {
//   return (
//     <main>
//       <Header />
//       <CategoryNav />
//       <IconStrip />
//       <OccasionStrip />
//       <HeroBanner />
//       <CategoryGrid />
//       <BestsellersSection />
//       <FlowersCollection />
//       <GiftsForEveryone />
//       <FavouriteFlowers />
//       <FreshlyBakedCakes />
//       <GiftsForFeeling />
//       <NewlyLaunched />
//       <OffersBanner />
//       <PlantsSection />
//       <BrandsSection />
//       <GiftingStories />
//       <Footer />
//     </main>
//   );
// }

import Header from "@/components/Header";
import CategoryNav from "@/components/CategoryNav";
import IconStrip from "@/components/IconStrip";
import OccasionStrip from "@/components/OccasionStrip";
import HeroBanner from "@/components/HeroBanner";
import BestsellersSection from "@/components/BestsellersSection";
import FlowersCollection from "@/components/FlowersCollection";
import GiftsForEveryone from "@/components/GiftsForEveryone";
import FreshlyBakedCakes from "@/components/FreshlyBakedCakes";
import GiftsForFeeling from "@/components/GiftsForFeeling";
import OffersBanner from "@/components/OffersBanner";
import PlantsSection from "@/components/PlantsSection";
import BrandsSection from "@/components/BrandsSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-ivory">
      <Header />
      <CategoryNav />
      <IconStrip />
      <OccasionStrip />
      <HeroBanner />
      <BestsellersSection />
      <FlowersCollection />
      <GiftsForEveryone />
      <FreshlyBakedCakes />
      <GiftsForFeeling />
      <OffersBanner />
      <PlantsSection />
      <BrandsSection />
      <Footer />
    </main>
  );
}
