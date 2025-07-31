import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GithubLogo, LinkedinLogo, TwitterLogo, Heart } from "@phosphor-icons/react";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Footer slide up animation
      gsap.fromTo(footerRef.current,
        {
          y: 60,
          opacity: 0,
          filter: "blur(20px)"
        },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Floating particles animation
      gsap.to(".footer-particle", {
        y: -30,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        stagger: {
          each: 0.5,
          from: "random"
        }
      });

      // Social icons hover effects
      const socialIcons = document.querySelectorAll('.footer-social');
      socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
          gsap.to(icon, {
            scale: 1.2,
            rotation: 10,
            duration: 0.3,
            ease: "back.out(1.7)"
          });
        });

        icon.addEventListener('mouseleave', () => {
          gsap.to(icon, {
            scale: 1,
            rotation: 0,
            duration: 0.3,
            ease: "back.out(1.7)"
          });
        });
      });

    }, footerRef);

    return () => ctx.revert();
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <footer 
      ref={footerRef}
      className="relative bg-gradient-to-t from-muted/30 to-background border-t border-cyber-cyan/10 overflow-hidden"
    >
      {/* Floating particles background */}
      <div ref={particlesRef} className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="footer-particle absolute top-1/4 left-1/6 w-16 h-16 bg-cyber-pink/5 rounded-full blur-xl"></div>
        <div className="footer-particle absolute top-1/2 right-1/4 w-12 h-12 bg-cyber-cyan/5 rounded-full blur-xl"></div>
        <div className="footer-particle absolute bottom-1/4 left-1/3 w-20 h-20 bg-cyber-purple/5 rounded-full blur-xl"></div>
        <div className="footer-particle absolute top-3/4 right-1/6 w-14 h-14 bg-cyber-blue/5 rounded-full blur-xl"></div>
      </div>

      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="grid md:grid-cols-3 gap-12 items-center">
          {/* Logo/Brand */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold mb-2">
              <span className="text-gradient-cyber">MILAD</span>
            </h3>
            <p className="text-muted-foreground">
              Web Developer & Digital Artist
            </p>
          </div>

          {/* Navigation */}
          <div className="text-center">
            <nav className="flex flex-wrap justify-center gap-6">
              {['Home', 'About', 'Projects', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-muted-foreground hover:text-cyber-cyan transition-colors duration-300 relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyber-cyan transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </nav>
          </div>

          {/* Social Links */}
          <div className="flex justify-center md:justify-end gap-4">
            {[
              { 
                icon: GithubLogo, 
                color: "text-gray-400", 
                hoverColor: "hover:text-white",
                bg: "hover:bg-gray-400/10"
              },
              { 
                icon: LinkedinLogo, 
                color: "text-blue-500", 
                hoverColor: "hover:text-blue-400",
                bg: "hover:bg-blue-500/10"
              },
              { 
                icon: TwitterLogo, 
                color: "text-sky-500", 
                hoverColor: "hover:text-sky-400",
                bg: "hover:bg-sky-500/10"
              }
            ].map((social, index) => (
              <div
                key={index}
                className={`footer-social w-12 h-12 rounded-xl border border-muted flex items-center justify-center cursor-pointer transition-all duration-300 ${social.bg} ${social.hoverColor}`}
              >
                <social.icon size={20} className={social.color} />
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="my-12">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-cyber-cyan/30 to-transparent"></div>
        </div>

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="text-muted-foreground text-sm">
            © {currentYear} Milad. All rights reserved.
          </p>
          
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <span>Made with</span>
            <Heart size={16} className="text-red-500 animate-pulse" />
            <span>using React & GSAP</span>
          </div>
        </div>
      </div>

      {/* Bottom glow effect */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-cyber-cyan/50 to-transparent"></div>
    </footer>
  );
};

export default Footer;