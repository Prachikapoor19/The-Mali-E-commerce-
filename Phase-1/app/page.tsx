import Header from "@/components/Header";
import CategoryNav from "@/components/CategoryNav";
import IconStrip from "@/components/IconStrip";
import OccasionStrip from "@/components/OccasionStrip";
import HeroBanner from "@/components/HeroBanner";
import CategoryGrid from "@/components/CategoryGrid";
import BestsellersSection from "@/components/BestsellersSection";
import FlowersCollection from "@/components/FlowersCollection";
import GiftsForEveryone from "@/components/GiftsForEveryone";
import FreshlyBakedCakes from "@/components/FreshlyBakedCakes";
import GiftsForFeeling from "@/components/GiftsForFeeling";
import PlantsSection from "@/components/PlantsSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-ivory">
      <Header />
      <CategoryNav />
      <IconStrip />
      <OccasionStrip />
      <HeroBanner />
      <CategoryGrid />
      <BestsellersSection />
      <FlowersCollection />
      <GiftsForEveryone />
      <FreshlyBakedCakes />
      <GiftsForFeeling />
      <PlantsSection />
      <Footer />
    </main>
  );
}