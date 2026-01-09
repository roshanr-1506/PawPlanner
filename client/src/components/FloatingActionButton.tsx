import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Calendar, Heart, Pill, Dog } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface FloatingActionButtonProps {
  onAddTask?: () => void;
  onAddAppointment?: () => void;
  onLogMood?: () => void;
}

export function FloatingActionButton({ onAddTask, onAddAppointment, onLogMood }: FloatingActionButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    { icon: Calendar, label: "Add Task", onClick: onAddTask, color: "bg-primary hover:bg-primary/90" },
    { icon: Heart, label: "Log Mood", onClick: onLogMood, color: "bg-accent hover:bg-accent/90" },
    { icon: Pill, label: "Appointment", onClick: onAddAppointment, color: "bg-secondary hover:bg-secondary/90" },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-16 right-0 space-y-3"
          >
            {actions.map((action, index) => {
              const Icon = action.icon;
              return (
                <motion.div
                  key={action.label}
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.8 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Button
                    onClick={() => {
                      action.onClick?.();
                      setIsOpen(false);
                    }}
                    className={cn("shadow-lg gap-2 min-w-[160px]", action.color)}
                    data-testid={`fab-${action.label.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <Icon className="h-4 w-4" />
                    {action.label}
                  </Button>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "h-14 w-14 rounded-full shadow-2xl transition-all duration-300",
            isOpen ? "bg-destructive hover:bg-destructive/90" : "bg-primary hover:bg-primary/90"
          )}
          data-testid="fab-main"
        >
          <motion.div
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <Plus className="h-6 w-6" />
          </motion.div>
        </Button>
      </motion.div>
    </div>
  );
}
