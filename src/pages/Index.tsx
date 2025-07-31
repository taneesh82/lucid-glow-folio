import { useState, useEffect } from "react";
import Preloader from "@/components/Preloader";
import HeroSection from "@/components/HeroSection";
import AboutBotsSection from "@/components/AboutBotsSection";
import BotsShowcaseSection from "@/components/BotsShowcaseSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import PricingSection from "@/components/PricingSection";
import PaymentContactSection from "@/components/PaymentContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  const handlePreloaderComplete = () => {
    setIsLoading(false);
    // Small delay to ensure smooth transition
    setTimeout(() => {
      setShowContent(true);
    }, 100);
  };

  useEffect(() => {
    // Prevent scrolling during loading
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isLoading]);

  return (
    <div className="min-h-screen bg-background">
      {/* Preloader */}
      {isLoading && (
        <Preloader onComplete={handlePreloaderComplete} />
      )}

      {/* Main Content */}
      {showContent && (
        <main className="relative">
          <HeroSection />
          <AboutBotsSection />
          <BotsShowcaseSection />
          <TestimonialsSection />
          <PricingSection />
          <PaymentContactSection />
          <Footer />
        </main>
      )}
    </div>
  );
};

export default Index;
