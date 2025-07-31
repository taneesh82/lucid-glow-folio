import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const heroRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const splineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });
    
    // Initial states
    gsap.set([headlineRef.current, subtitleRef.current, ctaRef.current], {
      opacity: 0,
      y: 50,
      filter: "blur(10px)"
    });
    
    gsap.set(splineRef.current, {
      opacity: 0,
      x: 100,
      scale: 0.8
    });

    // Animation sequence
    tl.to(headlineRef.current, {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 1.2,
      ease: "power2.out"
    })
    .to(subtitleRef.current, {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 1,
      ease: "power2.out"
    }, "-=0.8")
    .to(ctaRef.current, {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 1,
      ease: "power2.out"
    }, "-=0.6")
    .to(splineRef.current, {
      opacity: 1,
      x: 0,
      scale: 1,
      duration: 1.5,
      ease: "power2.out"
    }, "-=1");

    // Floating orbs animation
    gsap.to(".glow-orb", {
      y: -20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      stagger: 0.5
    });

  }, []);

  const handleCTAHover = (e: React.MouseEvent) => {
    gsap.to(e.currentTarget, {
      scale: 1.05,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleCTALeave = (e: React.MouseEvent) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden"
    >
      {/* Background floating orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="glow-orb absolute top-1/4 left-1/6 w-64 h-64 bg-cyber-pink/5 rounded-full blur-3xl"></div>
        <div className="glow-orb absolute top-3/4 right-1/6 w-48 h-48 bg-cyber-cyan/5 rounded-full blur-3xl"></div>
        <div className="glow-orb absolute bottom-1/4 left-1/3 w-32 h-32 bg-cyber-purple/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left side - Content */}
        <div className="text-center lg:text-left space-y-8">
          <h1 
            ref={headlineRef}
            className="text-5xl lg:text-7xl font-bold leading-tight"
          >
            <span className="text-gradient-cyber">Quantum FX</span>
            <br />
            <span className="text-gradient-quantum">AI-Powered Forex Bots</span>
          </h1>
          
          <p 
            ref={subtitleRef}
            className="text-lg lg:text-xl text-muted-foreground max-w-lg leading-relaxed"
          >
            Trade Smarter. Sleep Better. Let our advanced AI algorithms handle 
            your Forex trading 24/7 while you focus on what matters most.
          </p>
          
          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-cyber-cyan to-cyber-blue text-white font-medium px-8 py-6 text-lg rounded-xl hover:shadow-lg hover:shadow-cyber-cyan/25 transition-all duration-300 animate-pulse-glow"
              onMouseEnter={handleCTAHover}
              onMouseLeave={handleCTALeave}
            >
              Get Started
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="border-cyber-pink text-cyber-pink hover:bg-cyber-pink hover:text-white font-medium px-8 py-6 text-lg rounded-xl transition-all duration-300"
              onMouseEnter={handleCTAHover}
              onMouseLeave={handleCTALeave}
            >
              View Bots
            </Button>
          </div>
        </div>

        {/* Right side - Spline 3D Robot Model */}
        <div 
          ref={splineRef}
          className="relative flex items-center justify-center"
        >
          <div className="relative w-full max-w-lg aspect-square">
            {/* Spline 3D Robot Model */}
            <iframe 
              src="https://my.spline.design/r4xbot-WFbjxu8R5LNR2KMlqZUMThKh/" 
              frameBorder="0" 
              width="100%" 
              height="100%"
              className="rounded-2xl"
              style={{ minHeight: '500px' }}
              title="Quantum FX Trading Robot"
            ></iframe>
            
            {/* Glow effect behind Spline */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyber-cyan/20 to-cyber-purple/20 rounded-2xl blur-2xl -z-10 scale-110"></div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-cyber-cyan rounded-full flex justify-center">
          <div className="w-1 h-3 bg-cyber-cyan rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;