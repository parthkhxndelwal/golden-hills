import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import FloatingVideo from "@/components/FloatingVideo";
import FloatingCallButton from "@/components/FloatingCallButton";
import LayoutGridDemo from "@/components/ui/layout-grid-demo";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Globe, Mountain, Droplet, Castle, Phone, Lock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Index() {
  const { t } = useLanguage();

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  // Feature items
  const features = [
    {
      icon: <Mountain className="h-8 w-8 text-primary" />,
      title: t.home.amenities.features.beachfront.title,
      description: t.home.amenities.features.beachfront.description
    },
    {
      icon: <Droplet className="h-8 w-8 text-primary" />,
      title: t.home.amenities.features.pools.title,
      description: t.home.amenities.features.pools.description
    },
    {
      icon: <Castle className="h-8 w-8 text-primary" />,
      title: t.home.amenities.features.restaurant.title,
      description: t.home.amenities.features.restaurant.description
    },
    {
      icon: <Globe className="h-8 w-8 text-primary" />,
      title: t.home.amenities.features.wifi.title,
      description: t.home.amenities.features.wifi.description
    },
    {
      icon: <Phone className="h-8 w-8 text-primary" />,
      title: t.home.amenities.features.bar.title,
      description: t.home.amenities.features.bar.description
    },
    {
      icon: <Lock className="h-8 w-8 text-primary" />,
      title: t.home.amenities.features.location.title,
      description: t.home.amenities.features.location.description
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        <title hidden>Golden Hills – Premium Farmhouse Plots near Delhi NCR</title>
        {/* Hero Section */}
        <HeroSection />

        {/* Welcome Section with Layout Grid */}
        <section id="welcome" className="section bg-gradient-to-b from-sand-light to-sand-light/50 dark:from-sand-dark/20 dark:to-sand-dark/10">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left side - Content */}
              <div className="animate-fade-in [animation-delay:100ms]">
                <span className="text-sm text-primary font-medium uppercase tracking-wider">
                  {t.home.welcome.subtitle}
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6 text-foreground">
                  {t.home.welcome.title}
                </h2>
                <p className="text-muted-foreground mb-6">
                  {t.home.welcome.description1}
                </p>
                <p className="text-muted-foreground mb-8">
                  {t.home.welcome.description2}
                </p>
                <Button asChild className="btn-primary">
                  <Link to="/contact">
                    Send Enquiry <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              
              {/* Right side - Layout Grid */}
              <div className="animate-fade-in [animation-delay:300ms]">
                <LayoutGridDemo />
              </div>
            </div>
          </div>
        </section>


        {/* Features Section */}
        <section className="section bg-gradient-to-b from-sand-light to-sand-light/50 dark:from-sand-dark/20 dark:to-sand-dark/10">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in">
              <span className="text-sm text-primary font-medium uppercase tracking-wider">
                {t.home.amenities.subtitle}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 text-foreground">
                {t.home.amenities.title}
              </h2>
              <p className="text-muted-foreground">
                {t.home.amenities.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="glass-card p-6 rounded-xl animate-fade-in flex flex-col items-center text-center border-sand/20 dark:border-sand-dark/20"
                  style={{ animationDelay: `${(index + 1) * 100}ms` }}
                >
                  <div className="mb-4 p-3 rounded-full bg-primary/10">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Preview Section */}
        <section className="section">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in">
              <span className="text-sm text-primary font-medium uppercase tracking-wider">
                {t.gallery.title}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 text-foreground">
                Explore Our Property
              </h2>
              <p className="text-muted-foreground">
                Take a glimpse of the beautiful landscapes and facilities at Golden Hills
              </p>
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
              {[
                {
                    id: 1,
                    src: "/gallery/image1.png",
                    alt: "",
                    category: "landscape"
                  },
                  {
                    id: 2,
                    src: "/gallery/image2.png",
                    alt: "",
                    category: "plots"
                  },
                  {
                    id: 3,
                    src: "/gallery/image3.png",
                    alt: "",
                    category: "plots"
                  },
                  {
                    id: 4,
                    src: "/gallery/image4.png",
                    alt: "",
                    category: "landscape"
                  },
                  {
                    id: 5,
                    src: "/gallery/image5.png",
                    alt: "",
                    category: "plots"
                  },
                  {
                    id: 6,
                    src: "/gallery/image6.png",
                    alt: "",
                    category: "plots"
                  },
                  {
                    id: 7,
                    src: "/gallery/image7.png",
                    alt: "Suitable Soil",
                    category: "amenities"
                  },
                  {
                    id: 8,
                    src: "/gallery/image8.png",
                    alt: "",
                    category: "landscape"
                  }
              ].map((image, index) => (
                <div
                  key={index}
                  className="relative overflow-hidden rounded-xl aspect-[4/3] group cursor-pointer animate-fade-in hover:scale-105 transition-transform duration-300"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <p className="text-white text-sm font-medium">{image.alt}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* View More Button */}
            <div className="text-center animate-fade-in [animation-delay:800ms]">
              <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <Link to="/gallery">
                  View More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-24 bg-gradient-to-r from-primary/10 to-sand/10 dark:from-primary/5 dark:to-sand-dark/10">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                {t.home.cta.title}
              </h2>
              <p className="text-muted-foreground mb-8">
                {t.home.cta.description}
              </p>
              <Button asChild size="lg" className="btn-primary">
                <Link to="/contact">Send Enquiry</Link>
              </Button>
            </div>
          </div>

        </section>
      </main>

      {/* Floating Components */}
      <FloatingVideo />
      <FloatingCallButton />

      <Footer />
    </div>
  );
}
