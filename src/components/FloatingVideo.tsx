import { useState, useEffect } from "react";
import { X, Play, Pause, Maximize, Minimize } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function FloatingVideo() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleToggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Handle escape key to close fullscreen
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, [isFullscreen]);

  return (
    <>
      {/* Fullscreen Video Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black animate-fade-in">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full h-full max-w-6xl max-h-full p-4">
              {/* Fullscreen Controls */}
              <div className="absolute top-4 right-4 z-10 flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleTogglePlay}
                  className="bg-black/50 hover:bg-black/70 text-white"
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleToggleFullscreen}
                  className="bg-black/50 hover:bg-black/70 text-white"
                >
                  <Minimize className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleToggleFullscreen}
                  className="bg-black/50 hover:bg-black/70 text-white"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              {/* Fullscreen Video */}
              <div className="relative w-full h-full bg-muted rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-sand/20 flex items-center justify-center">
                  <button
                    onClick={handleTogglePlay}
                    className="bg-primary/20 backdrop-blur-sm rounded-full p-8 hover:bg-primary/30 transition-colors"
                  >
                    {isPlaying ? (
                      <Pause className="h-12 w-12 text-primary" />
                    ) : (
                      <Play className="h-12 w-12 text-primary ml-2" />
                    )}
                  </button>
                </div>
                
                <img
                  src="https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1200&h=675&fit=crop"
                  alt="Property tour fullscreen"
                  className={cn(
                    "absolute inset-0 w-full h-full object-cover transition-opacity",
                    isPlaying ? "opacity-30" : "opacity-100"
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Video Component */}
      <div className="fixed bottom-4 left-4 z-40 animate-fade-in">
        <div
          className={cn(
            "bg-background/95 backdrop-blur-sm border border-border rounded-xl shadow-lg transition-all duration-500 ease-out",
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
                <div className="min-w-0 flex-1">
                  <span className="text-sm font-medium text-primary block truncate">Property Tour</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleToggleExpand}
                  className="h-6 w-6 p-0 rounded-full hover:bg-muted flex-shrink-0 ml-2"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="relative bg-muted rounded-lg overflow-hidden aspect-video mb-3">
                {/* Fullscreen button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleToggleFullscreen}
                  className="absolute top-2 right-2 z-10 bg-black/50 hover:bg-black/70 text-white h-8 w-8 p-0"
                >
                  <Maximize className="h-4 w-4" />
                </Button>
                
                {/* Video content */}
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
              
              <div className="min-h-[2.5rem] flex items-center">
                <p className="text-xs text-muted-foreground leading-tight">
                  Take a virtual tour of Golden Hills farmhouse plots
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}