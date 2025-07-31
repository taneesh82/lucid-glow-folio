import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  TelegramLogo, 
  TwitterLogo, 
  YoutubeLogo,
  EnvelopeSimple,
  PaperPlaneTilt,
  CurrencyBtc,
  QrCode,
  Copy,
  CheckCircle
} from "@phosphor-icons/react";

gsap.registerPlugin(ScrollTrigger);

const PaymentContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const paymentRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const { toast } = useToast();

  const paymentMethods = {
    upi: {
      id: "quantum-fx@upi",
      qrCode: "/lovable-uploads/c84a0497-a05b-4730-aa0c-c334b9231037.png", // Using uploaded image as QR placeholder
      name: "UPI Payment"
    },
    crypto: {
      btc: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
      eth: "0x742d35Cc6534C0532925a3b8D0a8E6be7b0c1234",
      usdt: "TG7VwbkAWg6ZXz8mKQeHMBq7ZoqnGfL2Rt"
    }
  };

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

      // Payment methods animation
      gsap.fromTo(".payment-method",
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
            trigger: paymentRef.current,
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
        description: "Thank you for your interest. Our team will contact you within 24 hours.",
      });
      
      // Reset form
      if (formRef.current) {
        formRef.current.reset();
      }
    }, 2000);
  };

  const handleCopy = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(type);
      toast({
        title: "Copied!",
        description: `${type} address copied to clipboard`,
      });
      
      setTimeout(() => setCopiedText(null), 2000);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive"
      });
    }
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

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Ready to <span className="text-gradient-cyber">Start Trading?</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Contact us for personalized bot configuration or proceed with instant 
            payment to get started immediately.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Contact Form */}
          <div className="glass rounded-2xl p-8 backdrop-blur-xl border border-cyber-cyan/20">
            <h3 className="text-2xl font-semibold mb-6 text-cyber-cyan">
              Contact Our Experts
            </h3>
            
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
                  Trading Experience
                </label>
                <Input
                  placeholder="e.g., 2 years, Beginner, Professional"
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
                  placeholder="Tell us about your trading goals and preferred bot setup..."
                  rows={4}
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

            {/* Social Links */}
            <div className="mt-8 pt-6 border-t border-muted">
              <h4 className="text-lg font-semibold mb-4 text-cyber-purple">
                Join Our Community
              </h4>
              <div className="flex gap-4">
                {[
                  { icon: TelegramLogo, color: "text-blue-500", bg: "bg-blue-500/10", label: "Telegram" },
                  { icon: TwitterLogo, color: "text-sky-500", bg: "bg-sky-500/10", label: "Twitter" },
                  { icon: YoutubeLogo, color: "text-red-500", bg: "bg-red-500/10", label: "YouTube" }
                ].map((social) => (
                  <div
                    key={social.label}
                    className={`w-12 h-12 ${social.bg} rounded-xl flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 group`}
                  >
                    <social.icon size={24} className={`${social.color} group-hover:scale-125 transition-transform duration-300`} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div ref={paymentRef} className="space-y-6">
            {/* UPI Payment */}
            <div className="payment-method glass rounded-2xl p-6 backdrop-blur-xl border border-green-500/20">
              <h3 className="text-xl font-semibold mb-4 text-green-500 flex items-center gap-2">
                <QrCode size={24} />
                UPI Payment (India)
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6 items-center">
                <div>
                  <div className="bg-white p-4 rounded-lg mb-4">
                    <img 
                      src={paymentMethods.upi.qrCode} 
                      alt="UPI QR Code" 
                      className="w-full h-40 object-contain"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground text-center">
                    Scan with any UPI app
                  </p>
                </div>
                
                <div>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-green-500 block mb-1">
                        UPI ID
                      </label>
                      <div className="flex items-center gap-2">
                        <Input 
                          value={paymentMethods.upi.id} 
                          readOnly 
                          className="bg-background/50 border-green-500/30 text-sm"
                        />
                        <Button
                          size="sm"
                          onClick={() => handleCopy(paymentMethods.upi.id, "UPI ID")}
                          className="bg-green-500/20 hover:bg-green-500/30 text-green-500 border-0"
                        >
                          {copiedText === "UPI ID" ? <CheckCircle size={16} /> : <Copy size={16} />}
                        </Button>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Send payment and email screenshot to confirm your order
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Crypto Payment */}
            <div className="payment-method glass rounded-2xl p-6 backdrop-blur-xl border border-orange-500/20">
              <h3 className="text-xl font-semibold mb-4 text-orange-500 flex items-center gap-2">
                <CurrencyBtc size={24} />
                Cryptocurrency Payment
              </h3>
              
              <div className="space-y-4">
                {Object.entries(paymentMethods.crypto).map(([crypto, address]) => (
                  <div key={crypto} className="space-y-2">
                    <label className="text-sm font-medium text-orange-500 block">
                      {crypto.toUpperCase()} Address
                    </label>
                    <div className="flex items-center gap-2">
                      <Input 
                        value={address} 
                        readOnly 
                        className="bg-background/50 border-orange-500/30 text-xs font-mono"
                      />
                      <Button
                        size="sm"
                        onClick={() => handleCopy(address, crypto.toUpperCase())}
                        className="bg-orange-500/20 hover:bg-orange-500/30 text-orange-500 border-0"
                      >
                        {copiedText === crypto.toUpperCase() ? <CheckCircle size={16} /> : <Copy size={16} />}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <p className="text-xs text-muted-foreground mt-4 p-3 bg-orange-500/5 rounded-lg border border-orange-500/20">
                <strong>Important:</strong> Send exact payment amount and email the transaction 
                hash along with your email address to receive your bots instantly.
              </p>
            </div>

            {/* Contact Info */}
            <div className="payment-method glass rounded-2xl p-6 backdrop-blur-xl border border-cyber-purple/20">
              <h3 className="text-xl font-semibold mb-4 text-cyber-purple flex items-center gap-2">
                <EnvelopeSimple size={24} />
                Support & Delivery
              </h3>
              
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span><strong>Email:</strong> support@quantumfx.ai</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-cyber-cyan rounded-full animate-pulse"></div>
                  <span><strong>Response Time:</strong> Within 2 hours</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-cyber-purple rounded-full animate-pulse"></div>
                  <span><strong>Delivery:</strong> Instant via email</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentContactSection;