import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import WeatherSection from "@/components/WeatherSection";
import CropSuggestion from "@/components/CropSuggestion";
import MarketPrices from "@/components/MarketPrices";
import GovSchemes from "@/components/GovSchemes";
import Footer from "@/components/Footer";
import FarmerChatbot from "@/components/FarmerChatbot";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Features />
        <CropSuggestion />
        <WeatherSection />
        <MarketPrices />
        <GovSchemes />
      </main>
      <Footer />
      <FarmerChatbot />
    </div>
  );
};

export default Index;
