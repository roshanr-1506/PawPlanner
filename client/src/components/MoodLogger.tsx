import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Heart, Smile, Zap, Moon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";

type Mood = "happy" | "calm" | "energetic" | "low-energy";

const moodOptions = [
  { value: "happy", label: "Happy", icon: Smile },
  { value: "calm", label: "Calm", icon: Heart },
  { value: "energetic", label: "Energetic", icon: Zap },
  { value: "low-energy", label: "Low Energy", icon: Moon },
];

interface MoodLoggerProps {
  onMoodLogged?: (mood: Mood, note: string) => void;
}

export function MoodLogger({ onMoodLogged }: MoodLoggerProps) {
  const [selectedMood, setSelectedMood] = useState<Mood | "">("");
  const [note, setNote] = useState("");
  const [isLogging, setIsLogging] = useState(false);
  const { toast } = useToast();

  const handleLogMood = () => {
    if (!selectedMood) return;
    
    setIsLogging(true);
    
    setTimeout(() => {
      onMoodLogged?.(selectedMood as Mood, note);
      
      toast({
        title: "Mood logged!",
        description: `Your pet is feeling ${selectedMood} today.`,
      });
      
      setSelectedMood("");
      setNote("");
      setIsLogging(false);
    }, 300);
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-display font-semibold mb-4">Log Mood & Health</h2>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="mood-select">How is your pet today?</Label>
          <Select value={selectedMood} onValueChange={(value) => setSelectedMood(value as Mood)}>
            <SelectTrigger id="mood-select" data-testid="select-mood">
              <SelectValue placeholder="Select mood..." />
            </SelectTrigger>
            <SelectContent>
              {moodOptions.map((mood) => {
                const Icon = mood.icon;
                return (
                  <SelectItem key={mood.value} value={mood.value}>
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4" />
                      {mood.label}
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>

        <AnimatePresence>
          {selectedMood && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-2"
            >
              <Label htmlFor="mood-note">Notes (optional)</Label>
              <Textarea
                id="mood-note"
                placeholder="Any observations about your pet's behavior..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
                data-testid="textarea-mood-note"
                className="resize-none"
                rows={3}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <Button 
          onClick={handleLogMood} 
          disabled={!selectedMood || isLogging}
          className="w-full"
          data-testid="button-log-mood"
        >
          {isLogging ? "Logging..." : "Log Mood"}
        </Button>
      </div>
    </Card>
  );
}
