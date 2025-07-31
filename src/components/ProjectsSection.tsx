import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { ArrowSquareOut, GithubLogo } from "@phosphor-icons/react";

gsap.registerPlugin(ScrollTrigger);

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const projects = [
    {
      id: 1,
      title: "Quantum Dashboard",
      description: "A futuristic admin dashboard with real-time data visualization and advanced analytics.",
      tech: ["React", "TypeScript", "GSAP", "Three.js"],
      image: "/lovable-uploads/c84a0497-a05b-4730-aa0c-c334b9231037.png",
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: 2,
      title: "Neon Commerce",
      description: "E-commerce platform with immersive product experiences and smooth animations.",
      tech: ["Next.js", "Stripe", "Framer Motion", "TailwindCSS"],
      image: "/lovable-uploads/c84a0497-a05b-4730-aa0c-c334b9231037.png",
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: 3,
      title: "Cyber Portfolio",
      description: "Interactive portfolio website with 3D elements and parallax scrolling effects.",
      tech: ["React", "GSAP", "Locomotive Scroll", "Spline"],
      image: "/lovable-uploads/c84a0497-a05b-4730-aa0c-c334b9231037.png",
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: 4,
      title: "Neural Network",
      description: "Machine learning visualization tool with interactive neural network diagrams.",
      tech: ["Vue.js", "D3.js", "Python", "FastAPI"],
      image: "/lovable-uploads/c84a0497-a05b-4730-aa0c-c334b9231037.png",
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: 5,
      title: "Holographic UI",
      description: "Experimental interface design with holographic effects and gesture controls.",
      tech: ["React", "WebGL", "GSAP", "WebRTC"],
      image: "/lovable-uploads/c84a0497-a05b-4730-aa0c-c334b9231037.png",
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: 6,
      title: "Quantum Chat",
      description: "Real-time messaging app with end-to-end encryption and futuristic design.",
      tech: ["React Native", "Socket.io", "Node.js", "MongoDB"],
      image: "/lovable-uploads/c84a0497-a05b-4730-aa0c-c334b9231037.png",
      liveUrl: "#",
      githubUrl: "#"
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
      gsap.fromTo(".project-card",
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
    
    gsap.to(e.currentTarget.querySelector('.project-glow'), {
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
    
    gsap.to(e.currentTarget.querySelector('.project-glow'), {
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
          Featured <span className="text-gradient-quantum">Projects</span>
        </h2>

        {/* Desktop Grid */}
        <div 
          ref={containerRef}
          className="hidden lg:grid lg:grid-cols-3 gap-8"
        >
          {projects.map((project) => (
            <div 
              key={project.id}
              className="project-card group relative cursor-pointer"
              onMouseEnter={handleCardHover}
              onMouseLeave={handleCardLeave}
            >
              {/* Glow effect */}
              <div className="project-glow absolute inset-0 bg-gradient-to-r from-cyber-cyan/20 to-cyber-purple/20 rounded-2xl blur-xl opacity-0 -z-10 scale-95"></div>
              
              {/* Card */}
              <div className="glass rounded-2xl overflow-hidden border border-cyber-cyan/20 backdrop-blur-xl">
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  
                  {/* Action buttons */}
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button 
                      size="sm"
                      className="bg-cyber-cyan/20 hover:bg-cyber-cyan/40 text-white border-0 backdrop-blur-sm"
                    >
                      <ArrowSquareOut size={16} />
                    </Button>
                    <Button 
                      size="sm"
                      className="bg-cyber-purple/20 hover:bg-cyber-purple/40 text-white border-0 backdrop-blur-sm"
                    >
                      <GithubLogo size={16} />
                    </Button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-semibold text-cyber-cyan group-hover:text-cyber-cyan-glow transition-colors duration-300">
                    {project.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {project.description}
                  </p>
                  
                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span 
                        key={tech}
                        className="px-3 py-1 text-xs font-medium bg-cyber-purple/10 text-cyber-purple rounded-full border border-cyber-purple/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Horizontal Scroll */}
        <div className="lg:hidden overflow-x-auto">
          <div className="flex gap-6 pb-4" style={{ width: 'max-content' }}>
            {projects.map((project) => (
              <div 
                key={project.id}
                className="project-card w-80 flex-shrink-0"
                onMouseEnter={handleCardHover}
                onMouseLeave={handleCardLeave}
              >
                <div className="glass rounded-2xl overflow-hidden border border-cyber-cyan/20 backdrop-blur-xl">
                  <div className="relative h-40 overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  </div>
                  
                  <div className="p-4 space-y-3">
                    <h3 className="text-lg font-semibold text-cyber-cyan">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {project.tech.slice(0, 3).map((tech) => (
                        <span 
                          key={tech}
                          className="px-2 py-1 text-xs bg-cyber-purple/10 text-cyber-purple rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
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

export default ProjectsSection;