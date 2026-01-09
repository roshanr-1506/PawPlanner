import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dog, Heart, Pill, Clock, CheckCircle2, XCircle } from "lucide-react";
import { format } from "date-fns";
import { motion } from "framer-motion";

type TaskType = "feeding" | "walk" | "medication" | "other";

interface Task {
  id: string;
  title: string;
  type: TaskType;
  time: string;
  date: Date;
  completed: boolean;
  status: "pending" | "completed" | "overdue";
  notes?: string;
}

interface TaskDetailDialogProps {
  task: Task | null;
  open: boolean;
  onClose: () => void;
  onToggleComplete: (taskId: string) => void;
  onDelete: (taskId: string) => void;
}

const taskIcons = {
  feeding: Dog,
  walk: Heart,
  medication: Pill,
  other: Clock,
};

export function TaskDetailDialog({ task, open, onClose, onToggleComplete, onDelete }: TaskDetailDialogProps) {
  if (!task) return null;

  const Icon = taskIcons[task.type];

  const handleToggleComplete = () => {
    onToggleComplete(task.id);
  };

  const handleDelete = () => {
    onDelete(task.id);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <DialogHeader>
            <div className="flex items-start gap-3">
              <div className="p-3 rounded-lg bg-primary/10">
                <Icon className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <DialogTitle className="text-xl">{task.title}</DialogTitle>
                <DialogDescription className="mt-1">
                  {format(task.date, "EEEE, MMMM d, yyyy")} at {task.time}
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="py-4 space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant={task.completed ? "default" : "secondary"} className="capitalize">
                {task.type}
              </Badge>
              {task.completed && (
                <Badge className="bg-primary">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  Completed
                </Badge>
              )}
            </div>

            {task.notes && (
              <div className="p-3 rounded-lg bg-muted">
                <p className="text-sm text-muted-foreground">{task.notes}</p>
              </div>
            )}
          </div>

          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={handleDelete}
              data-testid="button-delete-task"
            >
              <XCircle className="h-4 w-4 mr-2" />
              Delete
            </Button>
            <Button
              onClick={handleToggleComplete}
              variant={task.completed ? "outline" : "default"}
              data-testid="button-toggle-complete"
            >
              {task.completed ? (
                <>
                  <XCircle className="h-4 w-4 mr-2" />
                  Mark Incomplete
                </>
              ) : (
                <>
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Mark Complete
                </>
              )}
            </Button>
          </DialogFooter>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
