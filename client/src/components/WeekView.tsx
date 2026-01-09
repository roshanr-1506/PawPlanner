import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Dog, Heart, Pill } from "lucide-react";
import { format, addDays, startOfWeek, isSameDay } from "date-fns";
import { cn } from "@/lib/utils";

interface Task {
  id: string;
  title: string;
  type: "feeding" | "walk" | "medication" | "other";
  time: string;
  date: Date;
  completed: boolean;
  status: "pending" | "completed" | "overdue";
}

interface WeekViewProps {
  tasks: Task[];
  onTaskClick?: (task: Task) => void;
}

const taskIcons = {
  feeding: Dog,
  walk: Heart,
  medication: Pill,
  other: null,
};

const taskColors = {
  feeding: "bg-primary/10 border-primary/30",
  walk: "bg-accent/30 border-accent",
  medication: "bg-destructive/10 border-destructive/30",
  other: "bg-muted border-muted-foreground/30",
};

export function WeekView({ tasks, onTaskClick }: WeekViewProps) {
  const [currentWeekStart, setCurrentWeekStart] = useState(startOfWeek(new Date()));

  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(currentWeekStart, i));

  const getTasksForDay = (day: Date) => {
    return tasks.filter((task) => isSameDay(task.date, day));
  };

  const goToPreviousWeek = () => {
    setCurrentWeekStart(addDays(currentWeekStart, -7));
  };

  const goToNextWeek = () => {
    setCurrentWeekStart(addDays(currentWeekStart, 7));
  };

  const isToday = (day: Date) => isSameDay(day, new Date());

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-display font-semibold">Week Schedule</h2>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={goToPreviousWeek}
            data-testid="button-previous-week"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={goToNextWeek}
            data-testid="button-next-week"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {weekDays.map((day, index) => {
          const dayTasks = getTasksForDay(day);
          const completedCount = dayTasks.filter((t) => t.completed).length;
          
          return (
            <div
              key={index}
              className={cn(
                "min-h-[120px] p-2 rounded-lg border transition-all",
                isToday(day) ? "bg-primary/5 border-primary" : "bg-card"
              )}
            >
              <div className="text-center mb-2">
                <div className="text-xs font-medium text-muted-foreground">
                  {format(day, "EEE")}
                </div>
                <div
                  className={cn(
                    "text-sm font-semibold mt-1",
                    isToday(day) && "text-primary"
                  )}
                >
                  {format(day, "d")}
                </div>
              </div>

              <div className="space-y-1">
                {dayTasks.slice(0, 3).map((task) => {
                  const Icon = taskIcons[task.type];
                  return (
                    <div
                      key={task.id}
                      onClick={() => onTaskClick?.(task)}
                      className={cn(
                        "text-xs p-1.5 rounded border cursor-pointer hover-elevate transition-all",
                        taskColors[task.type],
                        task.completed && "opacity-50 line-through"
                      )}
                      data-testid={`week-task-${task.id}`}
                    >
                      <div className="flex items-center gap-1">
                        {Icon && <Icon className="h-3 w-3 flex-shrink-0" />}
                        <span className="truncate text-xs">{task.time}</span>
                      </div>
                    </div>
                  );
                })}
                {dayTasks.length > 3 && (
                  <div className="text-xs text-muted-foreground text-center">
                    +{dayTasks.length - 3} more
                  </div>
                )}
              </div>

              {dayTasks.length > 0 && (
                <div className="mt-2 pt-2 border-t">
                  <div className="text-xs text-muted-foreground text-center">
                    {completedCount}/{dayTasks.length}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
}
