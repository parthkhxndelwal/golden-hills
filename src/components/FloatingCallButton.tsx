import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function FloatingCallButton() {
  const handleCallClick = () => {
    window.location.href = "tel:9870450601";
  };

  return (
    <div className="fixed bottom-4 right-4 z-40 animate-fade-in">
      <Button
        onClick={handleCallClick}
        size="lg"
        className="rounded-full w-14 h-14 sm:w-16 sm:h-16 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
      >
        <Phone className="h-6 w-6 sm:h-7 sm:w-7" />
        <span className="sr-only">Call now: +919870450601</span>
      </Button>
      
      {/* Pulse animation rings */}
      <div className="absolute inset-0 rounded-full animate-ping bg-primary/20 -z-10" />
      <div className="absolute inset-0 rounded-full animate-pulse bg-primary/10 -z-10" />
    </div>
  );
}