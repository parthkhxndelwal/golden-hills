import { useState } from "react";
import { X, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function FloatingVideo() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-4 left-4 z-40 animate-fade-in">
      <div
        className={cn(
          "bg-background/95 backdrop-blur-sm border border-border rounded-xl shadow-lg transition-all duration-300",
          isExpanded ? "w-80 sm:w-96" : "w-20 h-20"
        )}
      >
        {!isExpanded ? (
          // Collapsed state - small circular button
          <button
            onClick={handleToggleExpand}
            className="w-full h-full flex items-center justify-center rounded-xl bg-primary/10 hover:bg-primary/20 transition-colors"
          >
            <Play className="h-6 w-6 text-primary" />
          </button>
        ) : (
          // Expanded state - video player
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-primary">Property Tour</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleToggleExpand}
                className="h-6 w-6 p-0 rounded-full hover:bg-muted"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="relative bg-muted rounded-lg overflow-hidden aspect-video mb-3">
              {/* Placeholder for video - in real app, this would be an actual video element */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-sand/20 flex items-center justify-center">
                <button
                  onClick={handleTogglePlay}
                  className="bg-primary/20 backdrop-blur-sm rounded-full p-4 hover:bg-primary/30 transition-colors"
                >
                  {isPlaying ? (
                    <Pause className="h-6 w-6 text-primary" />
                  ) : (
                    <Play className="h-6 w-6 text-primary ml-1" />
                  )}
                </button>
              </div>
              
              {/* Video thumbnail overlay */}
              <img
                src="https://images.unsplash.com/photo-1519046904884-53103b34b206?w=400&h=225&fit=crop"
                alt="Property tour thumbnail"
                className={cn(
                  "absolute inset-0 w-full h-full object-cover transition-opacity",
                  isPlaying ? "opacity-30" : "opacity-100"
                )}
              />
            </div>
            
            <p className="text-xs text-muted-foreground">
              Take a virtual tour of Golden Hills farmhouse plots
            </p>
          </div>
        )}
      </div>
    </div>
  );
}