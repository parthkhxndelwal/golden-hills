
import { useState } from "react";
import { Check, CalendarIcon, Users } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";

export default function BookingForm() {
  const { t } = useLanguage();
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [adults, setAdults] = useState("2");
  const [children, setChildren] = useState("0");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the booking data to a server
    console.log("Booking submitted:", { startDate, endDate, adults, children });
    setSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
    }, 3000);
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="glass-card p-6 space-y-6 animate-fade-in [animation-delay:200ms]"
    >
      <h3 className="text-2xl font-bold text-center mb-6">Send Enquiry</h3>
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Preferred Visit Date */}
          <div className="space-y-2">
            <label htmlFor="check-in" className="block text-sm font-medium">
              Preferred Visit Date
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="check-in"
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !startDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? format(startDate, "PPP") : <span>Select date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                  initialFocus
                  disabled={(date) => date < new Date()}
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>
          
          {/* Preferred Time */}
          <div className="space-y-2">
            <label htmlFor="check-out" className="block text-sm font-medium">
              Preferred Time
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="check-out"
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !endDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {endDate ? format(endDate, "PPP") : <span>Select time</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={setEndDate}
                  initialFocus
                  disabled={(date) => date < (startDate || new Date())}
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Number of People */}
          <div className="space-y-2">
            <label htmlFor="adults" className="block text-sm font-medium">
              Number of People
            </label>
            <Select value={adults} onValueChange={setAdults}>
              <SelectTrigger id="adults" className="w-full">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num} {num === 1 ? "Person" : "People"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Special Requirements */}
          <div className="space-y-2">
            <label htmlFor="children" className="block text-sm font-medium">
              Special Requirements
            </label>
            <Select value={children} onValueChange={setChildren}>
              <SelectTrigger id="children" className="w-full">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">None</SelectItem>
                <SelectItem value="1">Transportation needed</SelectItem>
                <SelectItem value="2">Wheelchair accessible</SelectItem>
                <SelectItem value="3">Specific plot preferences</SelectItem>
                <SelectItem value="4">Other requirements</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-700 text-white relative">
        {submitted ? (
          <>
            <Check className="mr-2 h-4 w-4" />
            Enquiry Sent! We'll contact you soon.
          </>
        ) : (
          <>
            <Users className="mr-2 h-4 w-4" />
            Send Enquiry
          </>
        )}
      </Button>
    </form>
  );
}
