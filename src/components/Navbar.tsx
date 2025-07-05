
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import ThemeToggle from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Navbar() {
  const { t } = useLanguage();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const navLinks = [
    { name: t.nav.home, path: "/" },
    { name: t.nav.amenities, path: "/amenities" },
    { name: t.nav.gallery, path: "/gallery" },
    { name: t.nav.contact, path: "/contact" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  
  // Determine text color based on route and scroll state
  const isHomePage = location.pathname === "/";
  const getTextColor = () => {
    if (isHomePage && !scrolled) {
      return "text-white"; // White text on home page when not scrolled
    }
    return "text-black dark:text-white"; // Default behavior for other routes or when scrolled
  };
  
  return <header className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-500", scrolled ? "bg-white/80 dark:bg-card/80 backdrop-blur-lg py-3 shadow-md" : "bg-transparent py-5")}>
      <nav className="container flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <img 
            src="/lovable-uploads/676a26bb-7a10-4030-9e46-379c66a5be16.png" 
            alt="Golden Hills Logo" 
            className="h-10 w-10 rounded-full"
          />
          <Link to="/" className={cn("text-2xl font-bold", getTextColor())}>Golden Hills</Link>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-8">
          {navLinks.map(link => <li key={link.name} className="relative">
              <Link to={link.path} className={cn("font-medium transition-colors hover:text-primary after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full", getTextColor())}>
                {link.name}
              </Link>
            </li>)}
        </ul>

        <div className="hidden md:flex items-center space-x-2">
          {/* <ThemeToggle /> */}
          <a 
            href="tel:999-888-7776" 
            className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-medium"
          >
            <Phone className="h-4 w-4" />
            <span>{t.nav.phone}</span>
          </a>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center space-x-2">
          <ThemeToggle />
          <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className={cn("rounded-full", getTextColor())}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </nav>

      {/* Mobile Popup Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full right-4 mt-2 w-64 bg-background/95 backdrop-blur-sm border border-border rounded-lg shadow-lg animate-fade-in">
          <ul className="space-y-4 p-4">
            {navLinks.map(link => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className="block text-lg font-medium transition-colors hover:text-primary text-foreground"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="border-t border-border p-4">
            <a
              href="tel:999-888-7776"
              className="flex items-center justify-center space-x-2 w-full text-secondary-foreground font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Phone className="h-4 w-4" />
              <span>{t.nav.phone}</span>
            </a>
          </div>
        </div>
      )}
    </header>;
}
