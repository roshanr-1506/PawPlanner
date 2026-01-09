import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Clock, Dog, Heart, Pill, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

type TaskType = "feeding" | "walk" | "medication" | "other";
type TaskStatus = "pending" | "completed" | "overdue";

interface TaskCardProps {
  id: string;
  title: string;
  type: TaskType;
  time: string;
  status: TaskStatus;
  onComplete?: (id: string) => void;
}

const taskIcons = {
  feeding: Dog,
  walk: Heart,
  medication: Pill,
  other: Clock,
};

const taskColors = {
  feeding: "bg-primary/10 text-primary-foreground",
  walk: "bg-accent/30 text-accent-foreground",
  medication: "bg-destructive/10 text-destructive-foreground",
  other: "bg-muted text-muted-foreground",
};

export function TaskCard({ id, title, type, time, status, onComplete }: TaskCardProps) {
  const [isCompleted, setIsCompleted] = useState(status === "completed");
  const [showCheck, setShowCheck] = useState(false);
  const Icon = taskIcons[type];

  const handleToggle = () => {
    const newCompleted = !isCompleted;
    setIsCompleted(newCompleted);
    
    if (newCompleted) {
      setShowCheck(true);
      setTimeout(() => setShowCheck(false), 1000);
    }
    
    onComplete?.(id);
  };

  return (
    <motion.div
      initial={{ opacity: 1, scale: 1 }}
      animate={{ 
        opacity: isCompleted ? 0.6 : 1,
        scale: showCheck ? 1.05 : 1
      }}
      transition={{ duration: 0.3 }}
    >
      <Card
        className={cn(
          "p-4 card relative",
          status === "overdue" && !isCompleted && "border-destructive/50"
        )}
        style={{ borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
        data-testid={`card-task-${id}`}
      >
        <AnimatePresence>
          {showCheck && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
            >
              <CheckCircle className="h-12 w-12 text-primary" />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center gap-4">
          <div className={cn("p-2 rounded-lg", taskColors[type])}>
            <Icon className="h-5 w-5" />
          </div>
          
          <div className="flex-1">
            <h3 className={cn("font-medium", isCompleted && "line-through text-muted-foreground")}>
              {title}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <Clock className="h-3 w-3 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{time}</span>
              {status === "overdue" && !isCompleted && (
                <Badge variant="destructive" className="text-xs">Overdue</Badge>
              )}
            </div>
          </div>

          <Checkbox
            checked={isCompleted}
            onCheckedChange={handleToggle}
            data-testid={`checkbox-task-${id}`}
          />
        </div>
      </Card>
    </motion.div>
  );
}
