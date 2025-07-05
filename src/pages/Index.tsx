import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import FloatingVideo from "@/components/FloatingVideo";
import FloatingCallButton from "@/components/FloatingCallButton";
import BookingForm from "@/components/BookingForm";
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
        {/* Hero Section */}
        <HeroSection />
        
        {/* Welcome Section */}
        <section id="welcome" className="section bg-gradient-to-b from-sand-light to-sand-light/50 dark:from-sand-dark/20 dark:to-sand-dark/10">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in [animation-delay:100ms]">
                <span className="text-sm text-primary font-medium uppercase tracking-wider">
                  {t.home.welcome.subtitle}
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6 text-foreground">
                  Experience Golden Hills
                </h2>
                <p className="text-muted-foreground mb-6">
                  {t.home.welcome.description1}
                </p>
                <p className="text-muted-foreground mb-8">
                  {t.home.welcome.description2}
                </p>
                <Button asChild className="btn-primary">
                  <Link to="/about">
                    {t.home.welcome.learnMore} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              
              <div className="relative animate-fade-in [animation-delay:300ms]">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&h=600&fit=crop"
                    alt="Seaside view" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 w-2/3 rounded-2xl overflow-hidden shadow-xl">
                  <img 
                    src="https://images.unsplash.com/photo-1545579133-99bb5ab189bd?w=400&h=300&fit=crop"
                    alt="Luxury apartment interior" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -top-6 -right-6 w-1/2 rounded-2xl overflow-hidden shadow-xl">
                  <img 
                    src="https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=400&h=300&fit=crop"
                    alt="Pool view" 
                    className="w-full h-full object-cover"
                  />
                </div>
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
                  src: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=400&h=300&fit=crop",
                  alt: "Aravalli Hills landscape"
                },
                {
                  src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop", 
                  alt: "Farmhouse plot view"
                },
                {
                  src: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=400&h=300&fit=crop",
                  alt: "Natural water features"
                },
                {
                  src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=300&fit=crop",
                  alt: "Peaceful environment"
                },
                {
                  src: "https://images.unsplash.com/photo-1584132905271-512c958d674a?w=400&h=300&fit=crop",
                  alt: "Recreation area"
                },
                {
                  src: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=400&h=300&fit=crop",
                  alt: "Green landscapes"
                },
                {
                  src: "https://images.unsplash.com/photo-1545579133-99bb5ab189bd?w=400&h=300&fit=crop",
                  alt: "Sunset views"
                },
                {
                  src: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=400&h=300&fit=crop",
                  alt: "Natural beauty"
                }
              ].map((image, index) => (
                <div 
                  key={index}
                  className="relative overflow-hidden rounded-xl aspect-[4/3] group cursor-pointer animate-fade-in hover:scale-105 transition-transform duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <img 
                    src={image.src} 
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
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
