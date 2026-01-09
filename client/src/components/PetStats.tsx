import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PetAvatar } from "./PetAvatar";
import { motion } from "framer-motion";

interface PetStatsProps {
  petName: string;
  tasksCompleted: number;
  totalTasks: number;
  hasOverdueTasks: boolean;
}

export function PetStats({ petName, tasksCompleted, totalTasks, hasOverdueTasks }: PetStatsProps) {
  const percentage = totalTasks > 0 ? Math.round((tasksCompleted / totalTasks) * 100) : 0;

  return (
    <Card className="p-6 card" style={{ borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
      <div className="flex flex-col items-center space-y-4">
        <PetAvatar 
          tasksCompleted={tasksCompleted} 
          totalTasks={totalTasks} 
          hasOverdueTasks={hasOverdueTasks}
          size="lg" 
        />
        
        <div className="text-center">
          <h2 className="text-2xl font-display font-semibold">{petName}</h2>
          <p className="text-sm text-muted-foreground mt-1">Your loyal companion</p>
        </div>

        <div className="w-full pt-4 border-t">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Today's Progress</span>
            <span className="text-sm text-muted-foreground">{percentage}%</span>
          </div>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ transformOrigin: "left" }}
          >
            <div className="h-3 bg-gradient-to-r from-primary to-accent rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-accent"
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
          </motion.div>
          <p className="text-xs text-muted-foreground text-center mt-2">
            {tasksCompleted} of {totalTasks} tasks completed
          </p>
        </div>
      </div>
    </Card>
  );
}
