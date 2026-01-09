import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PetAvatarProps {
  tasksCompleted: number;
  totalTasks: number;
  hasOverdueTasks: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function PetAvatar({ tasksCompleted, totalTasks, hasOverdueTasks, size = "md", className }: PetAvatarProps) {
  const [animationClass, setAnimationClass] = useState("");
  const [prevCompleted, setPrevCompleted] = useState(tasksCompleted);

  const hour = new Date().getHours();
  const isNightTime = hour >= 21 || hour < 6;

  useEffect(() => {
    if (tasksCompleted > prevCompleted) {
      setAnimationClass("bounce-avatar");
      setTimeout(() => setAnimationClass(""), 600);
    }
    setPrevCompleted(tasksCompleted);
  }, [tasksCompleted, prevCompleted]);

  useEffect(() => {
    if (hasOverdueTasks && !animationClass) {
      setAnimationClass("shake-avatar");
      setTimeout(() => setAnimationClass(""), 500);
    }
  }, [hasOverdueTasks, animationClass]);

  const getEmoji = () => {
    if (isNightTime) return "😴";
    if (hasOverdueTasks) return "😢";
    if (tasksCompleted === totalTasks && totalTasks > 0) return "😊";
    if (tasksCompleted > 0) return "🙂";
    return "🐾";
  };

  const baseClass = isNightTime && !animationClass ? "breathe-avatar" : "";

  const sizeClasses = {
    sm: "text-4xl",
    md: "text-8xl",
    lg: "text-9xl",
  };

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5, type: "spring" }}
      className={cn(
        "flex items-center justify-center select-none",
        sizeClasses[size],
        baseClass,
        animationClass,
        className
      )}
      data-testid="pet-avatar"
    >
      {getEmoji()}
    </motion.div>
  );
}
