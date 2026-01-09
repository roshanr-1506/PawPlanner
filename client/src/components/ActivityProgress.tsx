import { Progress } from "@/components/ui/progress";
import { Dog, Heart, Pill } from "lucide-react";

interface Activity {
  label: string;
  icon: React.ElementType;
  completed: number;
  total: number;
  color: string;
}

interface ActivityProgressProps {
  activities: Activity[];
}

export function ActivityProgress({ activities }: ActivityProgressProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-display font-semibold">Activity Progress</h2>
      
      <div className="space-y-4">
        {activities.map((activity, index) => {
          const percentage = (activity.completed / activity.total) * 100;
          const Icon = activity.icon;
          
          return (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{activity.label}</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {activity.completed}/{activity.total}
                </span>
              </div>
              <Progress 
                value={percentage} 
                className="h-2"
                data-testid={`progress-${activity.label.toLowerCase().replace(/\s+/g, '-')}`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export const defaultActivities: Activity[] = [
  { label: "Feeding", icon: Dog, completed: 2, total: 3, color: "primary" },
  { label: "Walks", icon: Heart, completed: 1, total: 2, color: "accent" },
  { label: "Medication", icon: Pill, completed: 0, total: 1, color: "destructive" },
];
