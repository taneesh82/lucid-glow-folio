import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  Robot, 
  TrendUp, 
  Shield, 
  Clock,
  ChartLineUp,
  CurrencyBtc,
  Brain,
  Lightning
} from "@phosphor-icons/react";

gsap.registerPlugin(ScrollTrigger);

const AboutBotsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  const features = [
    { icon: Robot, name: "Auto Trading", color: "text-cyber-cyan" },
    { icon: TrendUp, name: "Market Analysis", color: "text-green-500" },
    { icon: Shield, name: "Risk Management", color: "text-yellow-500" },
    { icon: Clock, name: "24/7 Operation", color: "text-blue-500" },
    { icon: ChartLineUp, name: "Strategy Optimization", color: "text-purple-500" },
    { icon: CurrencyBtc, name: "Multi-Currency", color: "text-orange-500" },
    { icon: Brain, name: "AI Learning", color: "text-cyber-pink" },
    { icon: Lightning, name: "Fast Execution", color: "text-cyber-purple" }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section fade in
      gsap.fromTo(sectionRef.current, 
        { 
          opacity: 0,
          filter: "blur(20px)"
        },
        {
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Bot image animation
      gsap.fromTo(imageRef.current,
        {
          x: -100,
          opacity: 0,
          rotateY: -15
        },
        {
          x: 0,
          opacity: 1,
          rotateY: 0,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Content animation
      gsap.fromTo(contentRef.current,
        {
          x: 100,
          opacity: 0
        },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Features stagger animation
      gsap.fromTo(".feature-icon",
        {
          scale: 0,
          opacity: 0,
          rotation: -180
        },
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 0.6,
          ease: "back.out(1.7)",
          stagger: 0.1,
          scrollTrigger: {
            trigger: featuresRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleImageHover = () => {
    gsap.to(imageRef.current, {
      rotateY: 5,
      scale: 1.05,
      duration: 0.5,
      ease: "power2.out"
    });
  };

  const handleImageLeave = () => {
    gsap.to(imageRef.current, {
      rotateY: 0,
      scale: 1,
      duration: 0.5,
      ease: "power2.out"
    });
  };

  return (
    <section 
      ref={sectionRef}
      className="py-24 px-6 bg-gradient-to-b from-background to-muted/20"
    >
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* AI Bot Visualization */}
          <div 
            ref={imageRef}
            className="relative flex justify-center lg:justify-start"
            onMouseEnter={handleImageHover}
            onMouseLeave={handleImageLeave}
          >
            <div className="relative">
              {/* Glowing frame */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyber-pink to-cyber-cyan rounded-2xl blur-xl opacity-30 scale-110"></div>
              
              {/* AI Bot container */}
              <div className="relative w-80 h-80 rounded-2xl bg-gradient-to-br from-cyber-cyan/20 to-cyber-purple/20 border-4 border-cyber-cyan/50 overflow-hidden backdrop-blur-sm">
                <div className="w-full h-full flex items-center justify-center text-8xl text-cyber-cyan">
                  <Robot weight="light" />
                </div>
                
                {/* Circuit pattern overlay */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-4 left-4 w-16 h-16 border border-cyber-pink rounded-lg"></div>
                  <div className="absolute bottom-4 right-4 w-12 h-12 border border-cyber-cyan rounded-lg"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 border border-cyber-purple rounded-full"></div>
                </div>
                
                {/* Rotating border effect */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-cyber-pink via-cyber-cyan to-cyber-purple opacity-60 animate-spin" style={{ animationDuration: '8s' }}></div>
              </div>
              
              {/* Floating data points */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-green-500 rounded-full blur-sm opacity-60 animate-float flex items-center justify-center text-xs font-bold text-white">$</div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-cyber-cyan rounded-full blur-sm opacity-60 animate-float flex items-center justify-center text-xs" style={{ animationDelay: '2s' }}>€</div>
              <div className="absolute top-1/4 -right-8 w-6 h-6 bg-cyber-purple rounded-full blur-sm opacity-60 animate-float flex items-center justify-center text-xs" style={{ animationDelay: '1s' }}>¥</div>
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef} className="space-y-8">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                About Our <span className="text-gradient-cyber">AI Bots</span>
              </h2>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Our AI trading bots are trained on years of Forex market data, 
                  utilizing advanced machine learning algorithms to identify profitable 
                  trading opportunities in real-time.
                </p>
                <p>
                  Each bot operates with sophisticated risk management protocols, 
                  ensuring your capital is protected while maximizing profit potential 
                  across multiple currency pairs.
                </p>
                <p>
                  Experience the power of automated trading with our cutting-edge 
                  technology that never sleeps, never gets emotional, and always 
                  follows the optimal strategy.
                </p>
              </div>
            </div>

            {/* Features Grid */}
            <div ref={featuresRef}>
              <h3 className="text-2xl font-semibold mb-6 text-cyber-cyan">
                Bot Capabilities
              </h3>
              <div className="grid grid-cols-4 gap-4">
                {features.map((feature, index) => (
                  <div 
                    key={feature.name}
                    className="feature-icon group relative"
                  >
                    <div className="glass rounded-xl p-3 text-center hover:scale-110 transition-all duration-300 cursor-pointer">
                      <feature.icon 
                        size={24} 
                        className={`mx-auto mb-2 ${feature.color} group-hover:scale-125 transition-transform duration-300`}
                        weight="light"
                      />
                      <p className="text-xs font-medium text-foreground group-hover:text-cyber-cyan transition-colors duration-300">
                        {feature.name}
                      </p>
                      
                      {/* Hover glow effect */}
                      <div className="absolute inset-0 rounded-xl bg-cyber-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Stats */}
            <div className="glass rounded-xl p-6 backdrop-blur-xl border border-cyber-purple/20">
              <h4 className="text-xl font-semibold mb-4 text-cyber-purple">Live Performance</h4>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-green-500">94.7%</div>
                  <div className="text-sm text-muted-foreground">Win Rate</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-cyber-cyan">+127%</div>
                  <div className="text-sm text-muted-foreground">Monthly ROI</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-cyber-pink">24/7</div>
                  <div className="text-sm text-muted-foreground">Uptime</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutBotsSection;