
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

// Sample gallery images
const galleryImages = [
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
  },
  {
    id: 9,
    src: "/gallery/image9.png",
    alt: "",
    category: "landscape"
  },
  {
    id: 10,
    src: "/gallery/image10.png",
    alt: "",
    category: "landscape"
  },
  {
    id: 11,
    src: "/gallery/image11.png",
    alt: "",
    category: "landscape"
  },
  {
    id: 12,
    src: "/gallery/image12.png",
    alt: "",
    category: "landscape"
  },
  {
    id: 13,
    src: "/gallery/image13.png",
    alt: "Water Supply",
    category: "amenities"
  },
  {
    id: 14,
    src: "/gallery/image14.png",
    alt: "",
    category: "landscape"
  },
  {
    id: 15,
    src: "/gallery/image15.png",
    alt: "",
    category: "landscape"
  },
  {
    id: 16,
    src: "/gallery/image16.png",
    alt: "Gated Society",
    category: "amenities"
  },

];

export default function Gallery() {
  const { t } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [filteredImages, setFilteredImages] = useState(galleryImages);
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  // Filter gallery images by category
  const filterGallery = (category: string) => {
    setActiveFilter(category);

    if (category === "all") {
      setFilteredImages(galleryImages);
    } else {
      setFilteredImages(galleryImages.filter(img => img.category === category));
    }
  };

  // Handle lightbox navigation
  const navigateGallery = (direction: "prev" | "next") => {
    if (selectedImage === null) return;

    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage);
    let newIndex;

    if (direction === "prev") {
      newIndex = currentIndex > 0 ? currentIndex - 1 : filteredImages.length - 1;
    } else {
      newIndex = currentIndex < filteredImages.length - 1 ? currentIndex + 1 : 0;
    }

    setSelectedImage(filteredImages[newIndex].id);
  };

  // Handle keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage === null) return;

      if (e.key === "Escape") {
        setSelectedImage(null);
      } else if (e.key === "ArrowLeft") {
        navigateGallery("prev");
      } else if (e.key === "ArrowRight") {
        navigateGallery("next");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, filteredImages]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-20">
        {/* Header Section */}
        <section className="relative py-20 bg-gradient-to-r from-sand-light to-sand-light/50 dark:from-sand-dark/30 dark:to-sand-dark/10">
          <div className="container relative z-10">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <span className="text-sm text-primary font-medium uppercase tracking-wider">
                Golden Hills
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-2 mb-6 text-foreground">
                {t.gallery.title}
              </h1>
              <p className="text-muted-foreground text-lg">
                {t.gallery.subtitle}
              </p>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
            <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-primary/50 blur-3xl" />
            <div className="absolute bottom-10 right-40 w-48 h-48 rounded-full bg-sand/50 blur-3xl" />
          </div>
        </section>

        {/* Gallery Filters */}
        <section className="py-8">
          <div className="container">
            <div className="flex flex-wrap justify-center gap-2 mb-8 animate-fade-in">
              {["all", "landscape", "plots", "amenities"].map((category) => (
                <button
                  key={category}
                  onClick={() => filterGallery(category)}
                  className={cn(
                    "px-6 py-2 rounded-full transition-all",
                    activeFilter === category
                      ? "bg-primary text-white shadow-lg"
                      : "bg-card hover:bg-muted"
                  )}
                >
                  {category === "all"
                    ? t.gallery.filters.all
                    : category === "landscape"
                      ? t.gallery.filters.landscape
                      : category === "plots"
                        ? t.gallery.filters.plots
                        : t.gallery.filters.amenities}
                </button>
              ))}
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredImages.map((image, index) => (
                <div
                  key={image.id}
                  className="relative overflow-hidden rounded-xl aspect-[4/3] cursor-pointer group animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                  onClick={() => setSelectedImage(image.id)}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <p className="text-white">{image.alt}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Lightbox */}
        {selectedImage !== null && (
          <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 animate-fade-in">
            <button
              className="absolute top-4 right-4 text-white p-2 rounded-full hover:bg-white/10 transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X className="h-6 w-6" />
              <span className="sr-only">Close</span>
            </button>

            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-4 rounded-full hover:bg-white/10 transition-colors"
              onClick={() => navigateGallery("prev")}
            >
              <span className="sr-only">Previous</span>
              <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div className="max-w-5xl max-h-[80vh] overflow-hidden">
              {filteredImages.find(img => img.id === selectedImage) && (
                <img
                  src={filteredImages.find(img => img.id === selectedImage)?.src}
                  alt={filteredImages.find(img => img.id === selectedImage)?.alt}
                  className="max-w-full max-h-[80vh] object-contain"
                />
              )}
            </div>

            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-4 rounded-full hover:bg-white/10 transition-colors"
              onClick={() => navigateGallery("next")}
            >
              <span className="sr-only">Next</span>
              <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
