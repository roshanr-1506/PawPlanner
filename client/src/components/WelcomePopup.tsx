import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Sparkles, Heart, Calendar } from "lucide-react";

export function WelcomePopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem("pawplanner-welcome-seen");
    if (!hasSeenWelcome) {
      setTimeout(() => setOpen(true), 800);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem("pawplanner-welcome-seen", "true");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-lg">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <DialogHeader>
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="flex justify-center mb-4"
            >
              <div className="relative">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  className="text-6xl"
                >
                  🐾
                </motion.div>
                <motion.div
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                  className="absolute -top-2 -right-2"
                >
                  <Sparkles className="h-6 w-6 text-primary" />
                </motion.div>
              </div>
            </motion.div>
            
            <DialogTitle className="text-2xl font-display text-center">
              Welcome to PawPlanner!
            </DialogTitle>
            <DialogDescription className="text-center pt-2">
              Your all-in-one companion for keeping your furry friend happy and healthy
            </DialogDescription>
          </DialogHeader>

          <div className="py-6 space-y-4">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="flex items-start gap-3"
            >
              <div className="p-2 rounded-lg bg-primary/10 mt-1">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">Never Miss a Moment</h4>
                <p className="text-sm text-muted-foreground">
                  Track feeding times, walks, medications, and vet appointments all in one place
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="flex items-start gap-3"
            >
              <div className="p-2 rounded-lg bg-accent/30 mt-1">
                <Heart className="h-5 w-5 text-accent-foreground" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">Monitor Their Well-being</h4>
                <p className="text-sm text-muted-foreground">
                  Log your pet's mood, track activities, and keep health records organized
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="flex items-start gap-3"
            >
              <div className="p-2 rounded-lg bg-secondary/30 mt-1">
                <Sparkles className="h-5 w-5 text-secondary-foreground" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">Get Expert Tips</h4>
                <p className="text-sm text-muted-foreground">
                  Access our interactive pet care guide to become the best pet parent you can be
                </p>
              </div>
            </motion.div>
          </div>

          <DialogFooter>
            <Button onClick={handleClose} className="w-full" data-testid="button-get-started">
              Get Started 🎉
            </Button>
          </DialogFooter>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
