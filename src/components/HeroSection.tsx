
  import { useState, useEffect } from "react";
  import { Link } from "react-router-dom";
  import { ChevronDown } from "lucide-react";
  import { Button } from "@/components/ui/button";
  import { cn } from "@/lib/utils";
  import { useLanguage } from "@/contexts/LanguageContext";

  export default function HeroSection() {
    const { t } = useLanguage();
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
      const handleScroll = () => {
        setScrollY(window.scrollY);
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Calculate parallax effect
    const backgroundY = scrollY * 0.5;
    const contentY = scrollY * 0.2;

    return (
      <section className="relative h-screen overflow-hidden">
        {/* Background image with parallax */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/heroImage.png')",
            transform: `translateY(${backgroundY}px)`,
            backgroundPosition: `center ${50 + scrollY * 0.05}%`
          }}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/80 to-black/60" />

        {/* Content */}
        <div
          className="relative h-full flex flex-col justify-center items-center text-center px-4"
          style={{ transform: `translateY(${contentY}px)` }}
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
                <Link to="/contact">{t.hero.bookPlot}</Link>
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
