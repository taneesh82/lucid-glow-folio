import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  Code, 
  Palette, 
  DeviceMobile, 
  Lightning, 
  Globe, 
  Database,
  Cpu,
  Rocket
} from "@phosphor-icons/react";

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  const skills = [
    { icon: Code, name: "HTML5", color: "text-orange-500" },
    { icon: Palette, name: "CSS3", color: "text-blue-500" },
    { icon: Lightning, name: "JavaScript", color: "text-yellow-500" },
    { icon: Globe, name: "React", color: "text-cyan-500" },
    { icon: DeviceMobile, name: "TypeScript", color: "text-blue-600" },
    { icon: Database, name: "Node.js", color: "text-green-500" },
    { icon: Cpu, name: "GSAP", color: "text-cyber-pink" },
    { icon: Rocket, name: "Three.js", color: "text-cyber-purple" }
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

      // Image animation
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

      // Skills stagger animation
      gsap.fromTo(".skill-icon",
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
            trigger: skillsRef.current,
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
          {/* Profile Image */}
          <div 
            ref={imageRef}
            className="relative flex justify-center lg:justify-start"
            onMouseEnter={handleImageHover}
            onMouseLeave={handleImageLeave}
          >
            <div className="relative">
              {/* Glowing frame */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyber-pink to-cyber-cyan rounded-full blur-xl opacity-30 scale-110"></div>
              
              {/* Profile image placeholder */}
              <div className="relative w-80 h-80 rounded-full bg-gradient-to-br from-cyber-cyan/20 to-cyber-purple/20 border-4 border-cyber-cyan/50 overflow-hidden backdrop-blur-sm">
                <div className="w-full h-full flex items-center justify-center text-6xl text-cyber-cyan">
                  <Code weight="light" />
                </div>
                
                {/* Rotating border effect */}
                <div className="absolute inset-0 rounded-full border-2 border-transparent bg-gradient-to-r from-cyber-pink via-cyber-cyan to-cyber-purple opacity-60 animate-spin" style={{ animationDuration: '8s' }}></div>
              </div>
              
              {/* Floating particles */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-cyber-pink rounded-full blur-sm opacity-60 animate-float"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-cyber-cyan rounded-full blur-sm opacity-60 animate-float" style={{ animationDelay: '2s' }}></div>
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef} className="space-y-8">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                About <span className="text-gradient-cyber">Me</span>
              </h2>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  I'm a passionate web developer with expertise in creating 
                  immersive digital experiences. I specialize in modern JavaScript 
                  frameworks, advanced animations, and cutting-edge web technologies.
                </p>
                <p>
                  With a keen eye for design and a deep understanding of user experience, 
                  I craft websites that not only look stunning but perform exceptionally. 
                  My goal is to push the boundaries of what's possible on the web.
                </p>
              </div>
            </div>

            {/* Skills Grid */}
            <div ref={skillsRef}>
              <h3 className="text-2xl font-semibold mb-6 text-cyber-cyan">
                Technologies & Skills
              </h3>
              <div className="grid grid-cols-4 gap-6">
                {skills.map((skill, index) => (
                  <div 
                    key={skill.name}
                    className="skill-icon group relative"
                  >
                    <div className="glass rounded-xl p-4 text-center hover:scale-110 transition-all duration-300 cursor-pointer">
                      <skill.icon 
                        size={32} 
                        className={`mx-auto mb-2 ${skill.color} group-hover:scale-125 transition-transform duration-300`}
                        weight="light"
                      />
                      <p className="text-sm font-medium text-foreground group-hover:text-cyber-cyan transition-colors duration-300">
                        {skill.name}
                      </p>
                      
                      {/* Hover glow effect */}
                      <div className="absolute inset-0 rounded-xl bg-cyber-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;