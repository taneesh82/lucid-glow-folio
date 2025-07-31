import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { Star, Quotes, TrendUp } from "@phosphor-icons/react";

gsap.registerPlugin(ScrollTrigger);

const TestimonialsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);

  const testimonials = [
    {
      id: 1,
      name: "Alex Rodriguez",
      role: "Day Trader",
      avatar: "A",
      rating: 5,
      text: "Quantum FX bots have completely transformed my trading. Made $15,000 in profit last month alone!",
      profit: "+$15,247",
      timeframe: "Last 30 days"
    },
    {
      id: 2,
      name: "Sarah Chen",
      role: "Investment Manager",
      avatar: "S",
      rating: 5,
      text: "The Neural Trend bot is incredible. It caught the EUR/USD trend perfectly and I'm seeing consistent profits.",
      profit: "+$8,932",
      timeframe: "Last 14 days"
    },
    {
      id: 3,
      name: "Mohammed Hassan",
      role: "Forex Trader",
      avatar: "M",
      rating: 5,
      text: "24/7 automated trading while I sleep. The bots work flawlessly and the support team is amazing!",
      profit: "+$22,156",
      timeframe: "Last 45 days"
    }
  ];

  const liveStats = [
    { label: "Active Users", value: "12,847", prefix: "" },
    { label: "Total Profits", value: "2.4M", prefix: "$" },
    { label: "Success Rate", value: "94.2", prefix: "", suffix: "%" },
    { label: "Bots Running", value: "8,234", prefix: "" }
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

      // Stats animation
      gsap.fromTo(".stat-card",
        {
          scale: 0,
          opacity: 0,
          rotation: -10
        },
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 0.6,
          ease: "back.out(1.7)",
          stagger: 0.1,
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Testimonials animation
      gsap.fromTo(".testimonial-card",
        {
          opacity: 0,
          y: 60,
          scale: 0.9
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: testimonialsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Floating animation for testimonials
      gsap.to(".testimonial-card", {
        y: -5,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        stagger: 0.5
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCardHover = (e: React.MouseEvent) => {
    gsap.to(e.currentTarget, {
      scale: 1.05,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleCardLeave = (e: React.MouseEvent) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  return (
    <section 
      ref={sectionRef}
      className="py-24 px-6 bg-gradient-to-b from-background to-muted/20 relative overflow-hidden"
    >
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/6 w-32 h-32 bg-green-500/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/6 w-24 h-24 bg-cyber-cyan/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="container mx-auto relative z-10">
        <h2 
          ref={titleRef}
          className="text-4xl lg:text-5xl font-bold text-center mb-16"
        >
          Trusted by <span className="text-gradient-cyber">Traders</span> Worldwide
        </h2>

        {/* Live Stats */}
        <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {liveStats.map((stat, index) => (
            <div 
              key={stat.label}
              className="stat-card glass rounded-xl p-6 text-center backdrop-blur-xl border border-cyber-cyan/20 hover:border-cyber-cyan/40 transition-all duration-300"
              onMouseEnter={handleCardHover}
              onMouseLeave={handleCardLeave}
            >
              <div className="text-3xl lg:text-4xl font-bold text-cyber-cyan mb-2">
                {stat.prefix}{stat.value}{stat.suffix}
              </div>
              <div className="text-sm text-muted-foreground">
                {stat.label}
              </div>
              
              {/* Pulse indicator */}
              <div className="w-2 h-2 bg-green-500 rounded-full mx-auto mt-2 animate-pulse"></div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div ref={testimonialsRef} className="grid lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id}
              className="testimonial-card group relative"
              onMouseEnter={handleCardHover}
              onMouseLeave={handleCardLeave}
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-cyber-cyan/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 scale-110"></div>
              
              {/* Card */}
              <div className="glass rounded-2xl p-6 backdrop-blur-xl border border-green-500/20 relative overflow-hidden">
                {/* Quote icon */}
                <div className="absolute top-4 right-4 opacity-10">
                  <Quotes size={40} className="text-cyber-cyan" />
                </div>
                
                {/* Header */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyber-cyan to-cyber-purple rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-500 fill-current" />
                  ))}
                </div>

                {/* Testimonial text */}
                <p className="text-muted-foreground leading-relaxed mb-6">
                  "{testimonial.text}"
                </p>

                {/* Profit display */}
                <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                  <div className="flex items-center gap-2">
                    <TrendUp size={20} className="text-green-500" />
                    <span className="text-sm text-muted-foreground">{testimonial.timeframe}</span>
                  </div>
                  <div className="font-bold text-green-500 text-lg">
                    {testimonial.profit}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Button 
            size="lg"
            className="bg-gradient-to-r from-green-500 to-cyber-cyan text-white font-medium px-12 py-6 text-lg rounded-xl hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300 animate-pulse-glow"
          >
            Join 12,000+ Successful Traders
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;