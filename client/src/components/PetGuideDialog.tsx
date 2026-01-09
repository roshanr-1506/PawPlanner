import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Heart, Activity, Brain, Utensils, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface GuideStep {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  tips: string[];
  color: string;
}

const guideSteps: GuideStep[] = [
  {
    id: "personality",
    title: "Understand Their Personality",
    description: "Every pet has a unique personality. Learn to recognize their traits!",
    icon: Brain,
    tips: [
      "Observe how they interact with new people and pets",
      "Notice their energy levels throughout the day",
      "Pay attention to their favorite activities and toys",
      "Track their reactions to different situations"
    ],
    color: "bg-primary/10 text-primary"
  },
  {
    id: "health",
    title: "Monitor Their Health",
    description: "Regular health tracking helps catch issues early and keeps them happy.",
    icon: Heart,
    tips: [
      "Check their eyes, ears, and teeth weekly",
      "Monitor their eating and drinking habits",
      "Track their bathroom routines",
      "Watch for changes in behavior or energy"
    ],
    color: "bg-destructive/10 text-destructive"
  },
  {
    id: "activity",
    title: "Exercise & Play Needs",
    description: "Physical activity is crucial for your pet's wellbeing.",
    icon: Activity,
    tips: [
      "Different breeds have different exercise needs",
      "Mix up activities to keep them engaged",
      "Use playtime to strengthen your bond",
      "Adjust activity levels based on age and health"
    ],
    color: "bg-accent/30 text-accent-foreground"
  },
  {
    id: "nutrition",
    title: "Nutrition & Diet",
    description: "Proper nutrition is the foundation of a healthy, happy pet.",
    icon: Utensils,
    tips: [
      "Choose high-quality food appropriate for their age",
      "Maintain consistent feeding times",
      "Monitor their weight and adjust portions",
      "Limit treats to 10% of daily calories"
    ],
    color: "bg-secondary/30 text-secondary-foreground"
  }
];

export function PetGuideDialog() {
  const [open, setOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  const handleStepComplete = (stepId: string) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId]);
    }
    
    if (currentStep < guideSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const progress = (completedSteps.length / guideSteps.length) * 100;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2" data-testid="button-pet-guide">
          <BookOpen className="h-4 w-4" />
          Pet Care Guide
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <DialogHeader>
            <DialogTitle className="text-2xl font-display">Get to Know Your Pet Better</DialogTitle>
            <DialogDescription>
              Complete this interactive guide to become a better pet parent!
            </DialogDescription>
          </DialogHeader>

          <div className="mt-6 space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Your Progress</span>
                <span className="text-sm text-muted-foreground">
                  {completedSteps.length} of {guideSteps.length} completed
                </span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            <div className="space-y-4">
              {guideSteps.map((step, index) => {
                const Icon = step.icon;
                const isCompleted = completedSteps.includes(step.id);
                const isCurrent = index === currentStep;
                
                return (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Card
                      className={`p-4 transition-all ${
                        isCurrent ? "ring-2 ring-primary shadow-lg" : ""
                      } ${isCompleted ? "opacity-70" : ""}`}
                      data-testid={`guide-step-${step.id}`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-lg ${step.color} flex-shrink-0`}>
                          <Icon className="h-6 w-6" />
                        </div>
                        
                        <div className="flex-1 space-y-3">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold font-display">{step.title}</h3>
                                {isCompleted && (
                                  <Badge className="text-xs">✓ Done</Badge>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground">{step.description}</p>
                            </div>
                          </div>

                          <AnimatePresence>
                            {isCurrent && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-2"
                              >
                                <ul className="space-y-2">
                                  {step.tips.map((tip, tipIndex) => (
                                    <motion.li
                                      key={tipIndex}
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ duration: 0.2, delay: tipIndex * 0.1 }}
                                      className="flex items-start gap-2 text-sm"
                                    >
                                      <span className="text-primary mt-0.5">•</span>
                                      <span>{tip}</span>
                                    </motion.li>
                                  ))}
                                </ul>
                                
                                {!isCompleted && (
                                  <Button
                                    onClick={() => handleStepComplete(step.id)}
                                    className="w-full mt-3"
                                    size="sm"
                                    data-testid={`button-complete-${step.id}`}
                                  >
                                    Got it! <ChevronRight className="h-4 w-4 ml-1" />
                                  </Button>
                                )}
                              </motion.div>
                            )}
                          </AnimatePresence>

                          {!isCurrent && !isCompleted && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setCurrentStep(index)}
                              className="w-full"
                            >
                              View Details
                            </Button>
                          )}
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            {completedSteps.length === guideSteps.length && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="p-6 bg-primary/10 border-primary/30 text-center">
                  <h3 className="text-xl font-display font-semibold mb-2">
                    Congratulations! 🎉
                  </h3>
                  <p className="text-muted-foreground">
                    You've completed the pet care guide! You're well on your way to being an amazing pet parent.
                  </p>
                </Card>
              </motion.div>
            )}
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
