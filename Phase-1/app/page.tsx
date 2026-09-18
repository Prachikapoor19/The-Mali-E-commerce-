import Header from "@/components/Header";
import CategoryNav from "@/components/CategoryNav";
import IconStrip from "@/components/IconStrip";
import OccasionStrip from "@/components/OccasionStrip";
import HeroBanner from "@/components/HeroBanner";
import BestsellersSection from "@/components/BestsellersSection";
import FlowersCollection from "@/components/FlowersCollection";
import JoyfulGiftsSection from "@/components/JoyfulGiftsSection";
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
      <JoyfulGiftsSection />
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