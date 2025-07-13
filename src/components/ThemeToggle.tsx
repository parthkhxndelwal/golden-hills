
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Default to dark mode, only use light mode if explicitly set
    const isDarkMode = localStorage.getItem("theme") !== "light";

    setIsDark(isDarkMode);

    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);

    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="rounded-full w-10 h-10 transition-all duration-300 hover:bg-muted"
    >
      {isDark ? (
        <Sun className="h-5 w-5 transition-transform duration-500 rotate-0" />
      ) : (
        <Moon className="h-5 w-5 transition-transform duration-500 rotate-0" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
