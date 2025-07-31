import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    // Initial state
    gsap.set(logoRef.current, { opacity: 0, y: 50, scale: 0.8 });
    gsap.set(progressBarRef.current, { width: "0%" });
    gsap.set(percentRef.current, { opacity: 0 });

    // Animation sequence
    tl.to(logoRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1,
      ease: "power2.out"
    })
    .to(percentRef.current, {
      opacity: 1,
      duration: 0.5
    }, "-=0.3")
    .to(progressBarRef.current, {
      width: "100%",
      duration: 2.5,
      ease: "power2.out",
      onUpdate: function() {
        const progress = Math.round(this.progress() * 100);
        if (percentRef.current) {
          percentRef.current.textContent = `${progress}%`;
        }
      }
    }, "-=0.3")
    .to(logoRef.current, {
      scale: 1.1,
      duration: 0.3,
      ease: "power2.inOut"
    })
    .to([logoRef.current, percentRef.current], {
      opacity: 0,
      y: -30,
      duration: 0.8,
      ease: "power2.in"
    })
    .to(preloaderRef.current, {
      opacity: 0,
      scale: 0.9,
      duration: 1,
      ease: "power2.inOut",
      onComplete: () => {
        onComplete();
      }
    }, "-=0.4");

  }, [onComplete]);

  return (
    <div 
      ref={preloaderRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-cyber-pink/10 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-cyber-cyan/10 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-20 h-20 bg-cyber-purple/10 rounded-full blur-xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative z-10 text-center max-w-md mx-auto px-6">
        {/* Animated logo/name */}
        <div ref={logoRef} className="mb-12">
          <h1 className="text-6xl font-bold mb-4">
            <span className="text-gradient-cyber">QUANTUM</span> <span className="text-gradient-quantum">FX</span>
          </h1>
          <p className="text-muted-foreground text-lg font-light tracking-wide">
            AI-Powered Forex Trading Bots
          </p>
        </div>

        {/* Progress bar container */}
        <div className="relative mb-6">
          <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
            <div 
              ref={progressBarRef}
              className="h-full bg-gradient-to-r from-cyber-cyan to-cyber-pink relative"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyber-cyan to-cyber-pink blur-sm opacity-50"></div>
            </div>
          </div>
        </div>

        {/* Progress percentage */}
        <span 
          ref={percentRef}
          className="text-sm font-medium text-muted-foreground tracking-wider"
        >
          0%
        </span>
      </div>
    </div>
  );
};

export default Preloader;