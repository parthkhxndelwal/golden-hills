
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const { t } = useLanguage();
  const backgroundRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Prevent scrollbar during animation
    document.body.style.overflow = 'hidden';
    
    const tl = gsap.timeline({
      onComplete: () => {
        // Re-enable scrolling after animation
        document.body.style.overflow = 'auto';
      }
    });
    
    // Initial scale animation for background
    tl.fromTo(
      backgroundRef.current,
      {
        scale: 2,
      },
      {
        scale: 1,
        duration: 1,
        ease: "power2.out",
        transformOrigin: "center center",
      }
    );
    
    // Setup scroll-triggered parallax after initial animation
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "bottom top",
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        // Animate background scale from 1 to 2 as you scroll
        const scale = 1 + progress * 0.3; // 1 to 2
        // Animate background y from 0 to 100px as you scroll
        const yPos = progress * 100;
        gsap.to(backgroundRef.current, {
          y: yPos,
          scale: scale,
          duration: 0.2,
          overwrite: "auto",
          ease: "power1.out",
        });
        // Animate content y from 0 to 30px as you scroll
        gsap.to(contentRef.current, {
          y: yPos * 0.3,
          duration: 0.2,
          overwrite: "auto",
          ease: "power1.out",
        });
      }
    });
    
    return () => {
      // Cleanup ScrollTrigger
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden">
      {/* Background container with proper overflow handling */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Background image with parallax */}
        <div
          ref={backgroundRef}
          className="absolute bg-cover bg-center"
          style={{
            backgroundImage: "url('/heroImage.png')",
            backgroundPosition: "center center",
            transformOrigin: "center center",
            width: "120%",
            height: "120%",
            top: "-10%",
            left: "-10%"
          }}
        />
      </div>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/80 to-black/60" />
      
      {/* Content */}
      <div
        ref={contentRef}
        className="relative h-full flex flex-col justify-center items-center text-center px-4"
      >
        <div className="max-w-3xl animate-fade-in">
          <span className="inline-block text-white/90 text-lg mb-4 tracking-wide border-b border-white/30 pb-2">
            {t.hero.subtitle}
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            {t.hero.title}
          </h1>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            {t.hero.description}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" variant="heroSolid" className="min-w-[200px] rounded-full transform transition-all duration-300 hover:translate-y-[-2px]">
              <Link to="/booking">{t.hero.bookPlot}</Link>
            </Button>
            <Button 
              variant="hero" 
              size="lg" 
              className="min-w-[200px] rounded-full transform transition-all duration-300 hover:translate-y-[-2px]"
              onClick={() => {
                const link = document.createElement('a');
                link.href = '/brochure.pdf';
                link.download = 'Golden-Hills-Brochure.pdf';
                link.click();
              }}
            >
              Download Brochure
            </Button>
          </div>
        </div>
      </div>
      
      {/* Scroll down indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <a 
          href="#welcome" 
          className="flex flex-col items-center opacity-70 hover:opacity-100 transition-opacity"
        >
          <span className="text-sm mb-2">{t.hero.scrollDown}</span>
          <ChevronDown className="h-6 w-6" />
        </a>
      </div>
    </section>
  );
}
