import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Check, 
  Crown, 
  Lightning, 
  Rocket,
  Star
} from "@phosphor-icons/react";

gsap.registerPlugin(ScrollTrigger);

const PricingSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const plans = [
    {
      id: 1,
      name: "Starter Bot",
      subtitle: "Perfect for beginners",
      price: "$299",
      originalPrice: "$499",
      discount: "40% OFF",
      icon: Lightning,
      color: "from-cyber-cyan to-cyber-blue",
      borderColor: "border-cyber-cyan/30",
      popular: false,
      features: [
        "1 Trading Bot (Quantum Scalper)",
        "EUR/USD & GBP/USD pairs",
        "Basic risk management",
        "Email support",
        "MT4/MT5 compatibility",
        "30-day money back guarantee"
      ],
      limitations: [
        "Single currency pair focus",
        "Basic strategy only"
      ]
    },
    {
      id: 2,
      name: "Pro Bot",
      subtitle: "Most popular choice",
      price: "$599",
      originalPrice: "$999",
      discount: "BEST VALUE",
      icon: Crown,
      color: "from-cyber-purple to-cyber-pink",
      borderColor: "border-cyber-purple/30",
      popular: true,
      features: [
        "3 Trading Bots (Scalper + Neural + Swing)",
        "All major currency pairs",
        "Advanced risk management",
        "Priority support + Live chat",
        "Multi-platform support",
        "Weekly strategy updates",
        "Performance analytics dashboard",
        "60-day money back guarantee"
      ],
      limitations: []
    },
    {
      id: 3,
      name: "Elite AI Bundle",
      subtitle: "Professional traders",
      price: "$1,299",
      originalPrice: "$2,499",
      discount: "48% OFF",
      icon: Rocket,
      color: "from-orange-500 to-red-500",
      borderColor: "border-orange-500/30",
      popular: false,
      features: [
        "All 6 Trading Bots",
        "Crypto + Forex markets",
        "AI-powered risk optimization",
        "24/7 VIP support",
        "Custom bot configuration",
        "Real-time market analysis",
        "Advanced backtesting tools",
        "Lifetime updates",
        "90-day money back guarantee",
        "1-on-1 strategy consultation"
      ],
      limitations: []
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(titleRef.current,
        {
          opacity: 0,
          y: 50,
          filter: "blur(10px)"
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Cards stagger animation
      gsap.fromTo(".pricing-card",
        {
          opacity: 0,
          y: 80,
          scale: 0.8
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Popular card special animation
      gsap.to(".popular-card", {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCardHover = (e: React.MouseEvent) => {
    gsap.to(e.currentTarget, {
      y: -15,
      scale: 1.02,
      duration: 0.3,
      ease: "power2.out"
    });
    
    gsap.to(e.currentTarget.querySelector('.pricing-glow'), {
      opacity: 1,
      scale: 1.1,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleCardLeave = (e: React.MouseEvent) => {
    gsap.to(e.currentTarget, {
      y: e.currentTarget.classList.contains('popular-card') ? -10 : 0,
      scale: 1,
      duration: 0.3,
      ease: "power2.out"
    });
    
    gsap.to(e.currentTarget.querySelector('.pricing-glow'), {
      opacity: 0,
      scale: 1,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  return (
    <section 
      ref={sectionRef}
      className="py-24 px-6 bg-gradient-to-b from-muted/20 to-background relative overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/6 w-40 h-40 bg-cyber-purple/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/6 w-32 h-32 bg-cyber-cyan/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 
            ref={titleRef}
            className="text-4xl lg:text-5xl font-bold mb-6"
          >
            Choose Your <span className="text-gradient-cyber">Trading Plan</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Start your automated trading journey today. All plans include our 
            industry-leading AI technology and comprehensive support.
          </p>
        </div>

        <div ref={cardsRef} className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan) => (
            <div 
              key={plan.id}
              className={`pricing-card group relative cursor-pointer ${plan.popular ? 'popular-card' : ''}`}
              onMouseEnter={handleCardHover}
              onMouseLeave={handleCardLeave}
            >
              {/* Glow effect */}
              <div className="pricing-glow absolute inset-0 bg-gradient-to-r from-cyber-cyan/20 to-cyber-purple/20 rounded-2xl blur-xl opacity-0 -z-10 scale-95"></div>
              
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                  <Badge className="bg-gradient-to-r from-cyber-purple to-cyber-pink text-white px-4 py-2 font-medium">
                    <Star size={16} className="mr-1" />
                    MOST POPULAR
                  </Badge>
                </div>
              )}
              
              {/* Card */}
              <div className={`glass rounded-2xl overflow-hidden border-2 ${plan.borderColor} backdrop-blur-xl ${plan.popular ? 'scale-105' : ''} transition-all duration-300`}>
                {/* Header with gradient */}
                <div className={`h-40 bg-gradient-to-r ${plan.color} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="relative z-10 p-6 h-full flex flex-col justify-center items-center text-center">
                    <plan.icon size={40} className="text-white mb-3" />
                    <h3 className="text-2xl font-bold text-white mb-1">{plan.name}</h3>
                    <p className="text-white/80 text-sm">{plan.subtitle}</p>
                  </div>
                  
                  {/* Discount badge */}
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-white/20 text-white border-0 font-bold">
                      {plan.discount}
                    </Badge>
                  </div>
                </div>

                {/* Pricing */}
                <div className="p-6 text-center border-b border-muted">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-lg text-muted-foreground line-through">
                      {plan.originalPrice}
                    </span>
                    <span className="text-4xl font-bold text-cyber-cyan">
                      {plan.price}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">One-time payment</p>
                </div>

                {/* Features */}
                <div className="p-6 space-y-4 flex-1">
                  <div className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check size={12} className="text-green-500" />
                        </div>
                        <span className="text-sm text-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="p-6 pt-0">
                  <Button 
                    className={`w-full bg-gradient-to-r ${plan.color} text-white hover:shadow-lg transition-all duration-300 py-6 text-lg font-medium rounded-xl ${plan.popular ? 'animate-pulse-glow' : ''}`}
                  >
                    {plan.popular ? 'Get Started Now' : 'Choose Plan'}
                  </Button>
                  
                  <p className="text-xs text-muted-foreground text-center mt-3">
                    Instant download • Lifetime access
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust indicators */}
        <div className="text-center mt-16 space-y-4">
          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Secure Payment</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-cyber-cyan rounded-full animate-pulse"></div>
              <span>Instant Access</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-cyber-purple rounded-full animate-pulse"></div>
              <span>Money Back Guarantee</span>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground">
            Join 12,000+ traders who've already transformed their trading with Quantum FX
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;