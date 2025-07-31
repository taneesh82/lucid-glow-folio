import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  GithubLogo, 
  LinkedinLogo, 
  TwitterLogo, 
  EnvelopeSimple,
  PaperPlaneTilt
} from "@phosphor-icons/react";

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Form animation
      gsap.fromTo(".form-field",
        {
          x: -50,
          opacity: 0,
          filter: "blur(10px)"
        },
        {
          x: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Social icons animation
      gsap.fromTo(".social-icon",
        {
          scale: 0,
          rotation: -180,
          opacity: 0
        },
        {
          scale: 1,
          rotation: 0,
          opacity: 1,
          duration: 0.6,
          ease: "back.out(1.7)",
          stagger: 0.1,
          scrollTrigger: {
            trigger: socialRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Button animation
    gsap.to(".submit-btn", {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut"
    });

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      
      // Reset form
      if (formRef.current) {
        formRef.current.reset();
      }
    }, 2000);
  };

  const handleInputFocus = (e: React.FocusEvent) => {
    gsap.to(e.currentTarget, {
      scale: 1.02,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleInputBlur = (e: React.FocusEvent) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleSocialHover = (e: React.MouseEvent) => {
    gsap.to(e.currentTarget, {
      scale: 1.2,
      rotation: 5,
      duration: 0.3,
      ease: "back.out(1.7)"
    });
  };

  const handleSocialLeave = (e: React.MouseEvent) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      rotation: 0,
      duration: 0.3,
      ease: "back.out(1.7)"
    });
  };

  return (
    <section 
      ref={sectionRef}
      className="py-24 px-6 bg-gradient-to-b from-background to-muted/20 relative overflow-hidden"
    >
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/6 w-32 h-32 bg-cyber-pink/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/6 w-24 h-24 bg-cyber-cyan/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Let's <span className="text-gradient-cyber">Connect</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ready to bring your vision to life? Let's discuss your next project 
            and create something extraordinary together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Contact Form */}
          <div className="glass rounded-2xl p-8 backdrop-blur-xl border border-cyber-cyan/20">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="form-field">
                <label className="text-sm font-medium text-cyber-cyan mb-2 block">
                  Name
                </label>
                <Input
                  required
                  placeholder="Your full name"
                  className="bg-background/50 border-cyber-cyan/30 focus:border-cyber-cyan focus:ring-cyber-cyan/20 transition-all duration-300"
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                />
              </div>

              <div className="form-field">
                <label className="text-sm font-medium text-cyber-cyan mb-2 block">
                  Email
                </label>
                <Input
                  required
                  type="email"
                  placeholder="your.email@example.com"
                  className="bg-background/50 border-cyber-cyan/30 focus:border-cyber-cyan focus:ring-cyber-cyan/20 transition-all duration-300"
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                />
              </div>

              <div className="form-field">
                <label className="text-sm font-medium text-cyber-cyan mb-2 block">
                  Message
                </label>
                <Textarea
                  required
                  placeholder="Tell me about your project..."
                  rows={5}
                  className="bg-background/50 border-cyber-cyan/30 focus:border-cyber-cyan focus:ring-cyber-cyan/20 transition-all duration-300 resize-none"
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="submit-btn w-full bg-gradient-to-r from-cyber-cyan to-cyber-blue text-white font-medium py-6 text-lg rounded-xl hover:shadow-lg hover:shadow-cyber-cyan/25 transition-all duration-300 animate-pulse-glow disabled:opacity-50"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Sending...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <PaperPlaneTilt size={20} />
                    Send Message
                  </div>
                )}
              </Button>
            </form>
          </div>

          {/* Contact Info & Social */}
          <div className="space-y-8">
            {/* Contact Info */}
            <div className="glass rounded-2xl p-8 backdrop-blur-xl border border-cyber-purple/20">
              <h3 className="text-2xl font-semibold mb-6 text-cyber-purple">
                Get In Touch
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-cyber-cyan/10 rounded-lg flex items-center justify-center">
                    <EnvelopeSimple size={20} className="text-cyber-cyan" />
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-muted-foreground">milad@example.com</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-cyber-purple/10 rounded-lg flex items-center justify-center">
                    <GithubLogo size={20} className="text-cyber-purple" />
                  </div>
                  <div>
                    <p className="font-medium">GitHub</p>
                    <p className="text-muted-foreground">github.com/milad</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div ref={socialRef} className="glass rounded-2xl p-8 backdrop-blur-xl border border-cyber-pink/20">
              <h3 className="text-2xl font-semibold mb-6 text-cyber-pink">
                Follow Me
              </h3>
              
              <div className="flex gap-4">
                {[
                  { icon: GithubLogo, color: "text-gray-400", bg: "bg-gray-400/10" },
                  { icon: LinkedinLogo, color: "text-blue-500", bg: "bg-blue-500/10" },
                  { icon: TwitterLogo, color: "text-sky-500", bg: "bg-sky-500/10" }
                ].map((social, index) => (
                  <div
                    key={index}
                    className={`social-icon w-12 h-12 ${social.bg} rounded-xl flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110`}
                    onMouseEnter={handleSocialHover}
                    onMouseLeave={handleSocialLeave}
                  >
                    <social.icon size={24} className={social.color} />
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

export default ContactSection;