import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  TrendUp, 
  TrendDown, 
  Coins,
  Lightning,
  Shield,
  Target
} from "@phosphor-icons/react";

gsap.registerPlugin(ScrollTrigger);

const BotsShowcaseSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const bots = [
    {
      id: 1,
      name: "Quantum Scalper",
      strategy: "High-Frequency Scalping",
      riskLevel: "Medium",
      riskColor: "text-yellow-500",
      winRate: "96.2%",
      dailyReturn: "+2.4%",
      platforms: ["MT4", "MT5"],
      description: "Lightning-fast scalping bot for quick profits on EUR/USD and GBP/USD pairs.",
      price: "$299",
      color: "from-cyber-cyan to-cyber-blue",
      image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      name: "Neural Trend",
      strategy: "AI Trend Following",
      riskLevel: "Low",
      riskColor: "text-green-500",
      winRate: "89.7%",
      dailyReturn: "+1.8%",
      platforms: ["MT4", "MT5", "cTrader"],
      description: "Advanced neural network that identifies and follows major market trends.",
      price: "$499",
      color: "from-cyber-purple to-cyber-pink",
      image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      name: "Quantum Swing",
      strategy: "Swing Trading",
      riskLevel: "Medium",
      riskColor: "text-yellow-500",
      winRate: "92.1%",
      dailyReturn: "+3.2%",
      platforms: ["MT4", "MT5"],
      description: "Perfect for capturing medium-term price movements with optimal entry/exit points.",
      price: "$399",
      color: "from-green-500 to-cyber-cyan",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=300&fit=crop"
    },
    {
      id: 4,
      name: "Crypto Arbitrage",
      strategy: "Multi-Exchange Arbitrage",
      riskLevel: "Low",
      riskColor: "text-green-500",
      winRate: "98.5%",
      dailyReturn: "+1.2%",
      platforms: ["Binance", "Coinbase"],
      description: "Exploits price differences across cryptocurrency exchanges for guaranteed profits.",
      price: "$699",
      color: "from-orange-500 to-cyber-purple",
      image: "https://images.unsplash.com/photo-1640340434855-6084b1f4901c?w=400&h=300&fit=crop"
    },
    {
      id: 5,
      name: "Grid Master",
      strategy: "Grid Trading",
      riskLevel: "High",
      riskColor: "text-red-500",
      winRate: "87.3%",
      dailyReturn: "+4.1%",
      platforms: ["MT4", "MT5"],
      description: "Sophisticated grid system that profits from market volatility in ranging markets.",
      price: "$599",
      color: "from-red-500 to-cyber-pink",
      image: "https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=400&h=300&fit=crop"
    },
    {
      id: 6,
      name: "News Trader",
      strategy: "News-Based Trading",
      riskLevel: "High",
      riskColor: "text-red-500",
      winRate: "91.8%",
      dailyReturn: "+5.7%",
      platforms: ["MT4", "MT5", "cTrader"],
      description: "Reacts to economic news and events within milliseconds for maximum profit.",
      price: "$799",
      color: "from-cyber-blue to-cyber-purple",
      image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=400&h=300&fit=crop"
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
      gsap.fromTo(".bot-card",
        {
          opacity: 0,
          y: 60,
          scale: 0.8
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Horizontal scroll for mobile
      if (window.innerWidth < 1024) {
        const scrollContainer = containerRef.current;
        if (scrollContainer) {
          gsap.to(scrollContainer, {
            x: () => -(scrollContainer.scrollWidth - window.innerWidth),
            ease: "none",
            scrollTrigger: {
              trigger: scrollContainer,
              start: "top center",
              end: () => `+=${scrollContainer.scrollWidth}`,
              scrub: 1,
              pin: true
            }
          });
        }
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCardHover = (e: React.MouseEvent) => {
    gsap.to(e.currentTarget, {
      y: -10,
      scale: 1.02,
      duration: 0.3,
      ease: "power2.out"
    });
    
    gsap.to(e.currentTarget.querySelector('.bot-glow'), {
      opacity: 1,
      scale: 1.1,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleCardLeave = (e: React.MouseEvent) => {
    gsap.to(e.currentTarget, {
      y: 0,
      scale: 1,
      duration: 0.3,
      ease: "power2.out"
    });
    
    gsap.to(e.currentTarget.querySelector('.bot-glow'), {
      opacity: 0,
      scale: 1,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  return (
    <section 
      ref={sectionRef}
      className="py-24 px-6 bg-gradient-to-b from-muted/20 to-background"
    >
      <div className="container mx-auto">
        <h2 
          ref={titleRef}
          className="text-4xl lg:text-5xl font-bold text-center mb-16"
        >
          Our Trading <span className="text-gradient-quantum">Bots</span>
        </h2>

        {/* Desktop Grid */}
        <div 
          ref={containerRef}
          className="hidden lg:grid lg:grid-cols-3 gap-8"
        >
          {bots.map((bot) => (
            <div 
              key={bot.id}
              className="bot-card group relative cursor-pointer"
              onMouseEnter={handleCardHover}
              onMouseLeave={handleCardLeave}
            >
              {/* Glow effect */}
              <div className="bot-glow absolute inset-0 bg-gradient-to-r from-cyber-cyan/20 to-cyber-purple/20 rounded-2xl blur-xl opacity-0 -z-10 scale-95"></div>
              
              {/* Card */}
              <div className="glass rounded-2xl overflow-hidden border border-cyber-cyan/20 backdrop-blur-xl h-full">
                {/* Header with gradient */}
                <div className={`h-32 bg-gradient-to-r ${bot.color} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="relative z-10 p-6 h-full flex items-center justify-center">
                    <div className="text-center">
                      <h3 className="text-xl font-bold text-white mb-2">{bot.name}</h3>
                      <Badge variant="secondary" className="bg-white/20 text-white border-0">
                        {bot.strategy}
                      </Badge>
                    </div>
                  </div>
                  
                  {/* Floating icons */}
                  <div className="absolute top-4 right-4 opacity-30">
                    <Lightning size={24} className="text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4 flex-1">
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {bot.description}
                  </p>
                  
                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-cyber-cyan/5 rounded-lg">
                      <div className="font-bold text-cyber-cyan">{bot.winRate}</div>
                      <div className="text-xs text-muted-foreground">Win Rate</div>
                    </div>
                    <div className="text-center p-3 bg-green-500/5 rounded-lg">
                      <div className="font-bold text-green-500">{bot.dailyReturn}</div>
                      <div className="text-xs text-muted-foreground">Daily Return</div>
                    </div>
                  </div>
                  
                  {/* Risk Level */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Risk Level:</span>
                    <Badge variant="outline" className={`${bot.riskColor} border-current`}>
                      {bot.riskLevel}
                    </Badge>
                  </div>
                  
                  {/* Platforms */}
                  <div>
                    <div className="text-sm font-medium mb-2">Supported Platforms:</div>
                    <div className="flex flex-wrap gap-1">
                      {bot.platforms.map((platform) => (
                        <Badge 
                          key={platform}
                          variant="outline" 
                          className="text-xs bg-cyber-purple/10 text-cyber-purple border-cyber-purple/20"
                        >
                          {platform}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  {/* Price and CTA */}
                  <div className="pt-4 border-t border-muted">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold text-cyber-cyan">{bot.price}</span>
                      <span className="text-sm text-muted-foreground">one-time</span>
                    </div>
                    
                    <Button 
                      className="w-full bg-gradient-to-r from-cyber-cyan to-cyber-blue text-white hover:shadow-lg hover:shadow-cyber-cyan/25 transition-all duration-300"
                    >
                      Buy Now
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Horizontal Scroll */}
        <div className="lg:hidden overflow-x-auto">
          <div className="flex gap-6 pb-4" style={{ width: 'max-content' }}>
            {bots.map((bot) => (
              <div 
                key={bot.id}
                className="bot-card w-80 flex-shrink-0"
                onMouseEnter={handleCardHover}
                onMouseLeave={handleCardLeave}
              >
                <div className="glass rounded-2xl overflow-hidden border border-cyber-cyan/20 backdrop-blur-xl h-full">
                  <div className={`h-24 bg-gradient-to-r ${bot.color} relative`}>
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="relative z-10 p-4 h-full flex items-center justify-center">
                      <h3 className="text-lg font-bold text-white text-center">{bot.name}</h3>
                    </div>
                  </div>
                  
                  <div className="p-4 space-y-3">
                    <p className="text-muted-foreground text-sm">
                      {bot.description}
                    </p>
                    
                    <div className="flex justify-between text-sm">
                      <span>Win Rate: <strong className="text-cyber-cyan">{bot.winRate}</strong></span>
                      <span>Return: <strong className="text-green-500">{bot.dailyReturn}</strong></span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-cyber-cyan">{bot.price}</span>
                      <Button size="sm" className="bg-gradient-to-r from-cyber-cyan to-cyber-blue text-white">
                        Buy Now
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BotsShowcaseSection;