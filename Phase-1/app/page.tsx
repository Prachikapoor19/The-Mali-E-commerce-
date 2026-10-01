// import Header from "@/components/Header";
// import CategoryNav from "@/components/CategoryNav";
// import IconStrip from "@/components/IconStrip";
// import OccasionStrip from "@/components/OccasionStrip";
// import HeroBanner from "@/components/HeroBanner";
// import BestsellersSection from "@/components/BestsellersSection";
// import FlowersCollection from "@/components/FlowersCollection";
// import JoyfulGiftsSection from "@/components/JoyfulGiftsSection";
// import GiftsForEveryone from "@/components/GiftsForEveryone";
// import PickFavouriteFlower from "@/components/PickFavouriteFlower";
// import FreshlyBakedCakes from "@/components/FreshlyBakedCakes";
// import GiftsForFeeling from "@/components/GiftsForFeeling";
// import OffersBanner from "@/components/OffersBanner";
// import PlantsSection from "@/components/PlantsSection";
// import BrandsSection from "@/components/BrandsSection";
// import Footer from "@/components/Footer";

// export default function Home() {
//   return (
//     <main className="min-h-screen bg-ivory">
//       <Header />
//       <CategoryNav />
//       <IconStrip />
//       <OccasionStrip />
//       <HeroBanner />
//       <BestsellersSection />
//       <FlowersCollection />
//       <JoyfulGiftsSection />
//       <GiftsForEveryone />
//       <PickFavouriteFlower />
//       <FreshlyBakedCakes />
//       <GiftsForFeeling />
//       <OffersBanner />
//       <PlantsSection />
//       <BrandsSection />
//       <Footer />
//     </main>
//   );
// }

import Header from "@/components/Header";
import CategoryNav from "@/components/CategoryNav";
import IconStrip from "@/components/IconStrip";
import OccasionStrip from "@/components/OccasionStrip";
import HeroBanner from "@/components/HeroBanner";
import CategoryGrid from "@/components/CategoryGrid";
import GiftFinder from "@/components/GiftFinder";
import BestsellersSection from "@/components/BestsellersSection";
import FlowersCollection from "@/components/FlowersCollection";
import JoyfulGiftsSection from "@/components/JoyfulGiftsSection";
import GiftsForEveryone from "@/components/GiftsForEveryone";
import PickFavouriteFlower from "@/components/PickFavouriteFlower";
import FreshlyBakedCakes from "@/components/FreshlyBakedCakes";
import GiftsForFeeling from "@/components/GiftsForFeeling";
import NewlyLaunched from "@/components/NewlyLaunched";
import OffersBanner from "@/components/OffersBanner";
import PlantsSection from "@/components/PlantsSection";
import TrustBanner from "@/components/TrustBanner";
import BrandsSection from "@/components/BrandsSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <CategoryNav />
      <HeroBanner />
      <IconStrip />
      <div className="band band-petal">
        <OccasionStrip />
        <CategoryGrid />
      </div>
      <div id="gift-finder" className="scroll-mt-40"><GiftFinder /></div>
      <BestsellersSection />
      <div className="band band-sage">
        <FlowersCollection />
      </div>
      <JoyfulGiftsSection />
      <div className="band band-petal">
        <GiftsForEveryone />
        <PickFavouriteFlower />
      </div>
      <FreshlyBakedCakes />
      <GiftsForFeeling />
      <NewlyLaunched />
      <OffersBanner />
      <div className="band band-sand">
        <PlantsSection />
      </div>
      <TrustBanner />
      <BrandsSection />
      <Footer />
    </main>
  );
}
