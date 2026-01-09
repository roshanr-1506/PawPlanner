import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Heart, Smile, Zap, Moon } from "lucide-react";
import { format } from "date-fns";

interface MoodEntry {
  id: string;
  mood: "happy" | "calm" | "energetic" | "low-energy";
  date: Date;
  note?: string;
}

interface MoodHistoryProps {
  entries: MoodEntry[];
}

const moodConfig = {
  happy: { icon: Smile, color: "bg-primary/20 text-primary-foreground", label: "Happy" },
  calm: { icon: Heart, color: "bg-accent/30 text-accent-foreground", label: "Calm" },
  energetic: { icon: Zap, color: "bg-chart-2/30 text-chart-2", label: "Energetic" },
  "low-energy": { icon: Moon, color: "bg-muted text-muted-foreground", label: "Low Energy" },
};

export function MoodHistory({ entries }: MoodHistoryProps) {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-display font-semibold mb-4">Mood History</h2>
      
      <ScrollArea className="h-[300px] pr-4">
        <div className="space-y-3">
          {entries.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">
              No mood entries yet. Start logging to track your pet's well-being!
            </p>
          ) : (
            entries.map((entry) => {
              const config = moodConfig[entry.mood];
              const Icon = config.icon;
              
              return (
                <div
                  key={entry.id}
                  className="flex items-start gap-3 p-3 rounded-lg bg-card border hover-elevate transition-all"
                  data-testid={`mood-entry-${entry.id}`}
                >
                  <div className={`p-2 rounded-lg ${config.color}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant="secondary" className="text-xs">
                        {config.label}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {format(entry.date, "MMM d, h:mm a")}
                      </span>
                    </div>
                    {entry.note && (
                      <p className="text-sm text-muted-foreground mt-1">{entry.note}</p>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </ScrollArea>
    </Card>
  );
}
