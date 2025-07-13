import { useRef, useState, useEffect } from "react";
import { X, Play, Pause, Maximize, Minimize } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const POSTER_URL =
  "/video.mp4";

export default function FloatingVideo() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [savedTime, setSavedTime] = useState(0);
  const [isClosing, setIsClosing] = useState(false);
  const [isCollapsing, setIsCollapsing] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleToggleExpand = () => {
    if (isExpanded && !isClosing) {
      // Start closing sequence
      setIsClosing(true);
      setShowContent(false);
      // Wait for content to fade out, then start collapsing
      setTimeout(() => {
        setIsCollapsing(true);
        setIsExpanded(false);
        // Wait for popup to shrink, then show play button and reset states
        setTimeout(() => {
          setIsClosing(false);
          setIsCollapsing(false);
        }, 500); // Match the popup shrink duration
      }, 300); // Content fade duration
    } else if (!isExpanded) {
      setIsExpanded(true);
    }
  };

  const handleTogglePlay = () => {
    setIsPlaying((prev) => {
      const next = !prev;
      if (videoRef.current) {
        if (next) {
          videoRef.current.play();
        } else {
          videoRef.current.pause();
        }
      }
      return next;
    });
  };

  const handleToggleFullscreen = () => {
    if (!isFullscreen && videoRef.current) {
      // Save current time when entering fullscreen
      setSavedTime(videoRef.current.currentTime);
    } else if (isFullscreen && videoRef.current) {
      // Save current time when exiting fullscreen
      setSavedTime(videoRef.current.currentTime);
    }
    setIsFullscreen(!isFullscreen);
  };

  // Pause video when closing fullscreen or collapsed
  useEffect(() => {
    if (!isFullscreen && videoRef.current && savedTime > 0) {
      // Restore time when returning from fullscreen
      videoRef.current.currentTime = savedTime;
      videoRef.current.pause();
      setIsPlaying(false);
    } else if (!isFullscreen && videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [isFullscreen]);

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    document.addEventListener("keydown", handleEscapeKey);
    return () => document.removeEventListener("keydown", handleEscapeKey);
  }, [isFullscreen]);

  // Sync play/pause state with video events
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const handleEnded = () => setIsPlaying(false);
    video.addEventListener("ended", handleEnded);
    return () => video.removeEventListener("ended", handleEnded);
  }, []);

  // Autoplay when expanded
  useEffect(() => {
    if (isExpanded && videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  }, [isExpanded]);

  // Fade in content after expansion completes
  useEffect(() => {
    if (isExpanded && !isClosing) {
      const timer = setTimeout(() => {
        setShowContent(true);
      }, 520); // 500ms expansion + 20ms delay
      return () => clearTimeout(timer);
    }
  }, [isExpanded, isClosing]);

  // Resume video from saved time when entering fullscreen
  useEffect(() => {
    if (isFullscreen && videoRef.current && savedTime >= 0) {
      // Use a small delay to ensure video is ready
      const timer = setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.currentTime = savedTime;
          if (isPlaying) {
            videoRef.current.play().catch(error => {
              console.log("Auto-play was prevented:", error);
            });
          }
        }
      }, 100);
      return () => clearTimeout(timer);
    }
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
                <video
                  ref={videoRef}
                  src="/video.mp4"
                  className={cn(
                    "absolute inset-0 w-full h-full object-cover transition-opacity",
                    isPlaying ? "opacity-100" : "opacity-70"
                  )}
                  controls={false}
                  loop={false}
                  preload="metadata"
                  poster={POSTER_URL}
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  {!isPlaying && (
                    <button
                      onClick={handleTogglePlay}
                      className="pointer-events-auto bg-primary/20 backdrop-blur-sm rounded-full p-8 hover:bg-primary/30 transition-colors"
                    >
                      <Play className="h-12 w-12 text-primary ml-2" />
                    </button>
                  )}
                </div>
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
              className={cn(
                "w-full h-full flex items-center justify-center rounded-xl bg-primary/10 hover:bg-primary/20 transition-all duration-300",
                isCollapsing ? "opacity-0" : "opacity-100"
              )}
            >
              <Play className="h-6 w-6 text-primary" />
            </button>
          ) : (
            // Expanded state - video player
            <div className={cn(
              "p-4 transition-opacity duration-300",
              showContent ? "opacity-100" : "opacity-0"
            )}>
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
                <video
                  ref={videoRef}
                  src="/video.mp4"
                  className={cn(
                    "absolute inset-0 w-full h-full object-cover transition-opacity",
                    isPlaying ? "opacity-100" : "opacity-70"
                  )}
                  controls={false}
                  loop={false}
                  preload="metadata"
                  poster={POSTER_URL}
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  {!isPlaying && (
                    <button
                      onClick={handleTogglePlay}
                      className="pointer-events-auto bg-primary/20 backdrop-blur-sm rounded-full p-4 hover:bg-primary/30 transition-colors"
                    >
                      <Play className="h-6 w-6 text-primary ml-1" />
                    </button>
                  )}
                </div>
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