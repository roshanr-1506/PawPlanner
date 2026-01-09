import { useState, useRef } from "react";
import { TaskCard } from "@/components/TaskCard";
import { ActivityProgress, defaultActivities } from "@/components/ActivityProgress";
import { MoodLogger } from "@/components/MoodLogger";
import { MoodHistory } from "@/components/MoodHistory";
import { AppointmentCard } from "@/components/AppointmentCard";
import { PetStats } from "@/components/PetStats";
import { WeekView } from "@/components/WeekView";
import { AddTaskDialog } from "@/components/AddTaskDialog";
import { AddPetDialog } from "@/components/AddPetDialog";
import { ThemeToggle } from "@/components/ThemeToggle";
import { TaskDetailDialog } from "@/components/TaskDetailDialog";
import { SuccessConfetti } from "@/components/SuccessConfetti";
import { PetGuideDialog } from "@/components/PetGuideDialog";
import { WelcomePopup } from "@/components/WelcomePopup";
import { FloatingActionButton } from "@/components/FloatingActionButton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { addDays } from "date-fns";
import { motion } from "framer-motion";

type TaskType = "feeding" | "walk" | "medication" | "other";
type TaskStatus = "pending" | "completed" | "overdue";

interface Task {
  id: string;
  title: string;
  type: TaskType;
  time: string;
  date: Date;
  completed: boolean;
  status: TaskStatus;
}

export default function Dashboard() {
  const { toast } = useToast();
  const [showConfetti, setShowConfetti] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [taskDialogOpen, setTaskDialogOpen] = useState(false);
  const addTaskButtonRef = useRef<HTMLButtonElement>(null);
  const moodLoggerRef = useRef<HTMLDivElement>(null);
  
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", title: "Morning feeding", type: "feeding", time: "8:00 AM", date: new Date(), completed: true, status: "completed" },
    { id: "2", title: "Morning walk", type: "walk", time: "9:00 AM", date: new Date(), completed: true, status: "completed" },
    { id: "3", title: "Lunch feeding", type: "feeding", time: "12:00 PM", date: new Date(), completed: false, status: "pending" },
    { id: "4", title: "Afternoon walk", type: "walk", time: "4:00 PM", date: new Date(), completed: false, status: "pending" },
    { id: "5", title: "Evening medication", type: "medication", time: "6:00 PM", date: new Date(), completed: false, status: "overdue" },
    { id: "6", title: "Morning walk", type: "walk", time: "8:30 AM", date: addDays(new Date(), 1), completed: false, status: "pending" },
    { id: "7", title: "Breakfast", type: "feeding", time: "9:00 AM", date: addDays(new Date(), 1), completed: false, status: "pending" },
    { id: "8", title: "Evening walk", type: "walk", time: "7:00 PM", date: addDays(new Date(), 2), completed: false, status: "pending" },
  ]);

  const [moodEntries, setMoodEntries] = useState([
    { id: "1", mood: "happy" as const, date: new Date(Date.now() - 86400000 * 2), note: "Very playful today!" },
    { id: "2", mood: "energetic" as const, date: new Date(Date.now() - 86400000), note: "Lots of running around" },
    { id: "3", mood: "calm" as const, date: new Date(), note: "Relaxed after walk" },
  ]);

  const [appointments] = useState([
    {
      id: "1",
      title: "Vet Checkup",
      date: "2025-11-10",
      time: "2:00 PM",
      location: "Happy Paws Veterinary Clinic",
      notes: "Annual checkup and vaccination update",
    },
    {
      id: "2",
      title: "Grooming Appointment",
      date: "2025-11-15",
      time: "10:00 AM",
      location: "Pampered Pets Salon",
    },
  ]);

  const todaysTasks = tasks.filter(t => {
    const today = new Date();
    return t.date.toDateString() === today.toDateString();
  });

  const completedTasks = todaysTasks.filter(t => t.completed).length;
  const hasOverdueTasks = todaysTasks.some(t => t.status === "overdue");

  const handleTaskComplete = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id 
        ? { ...task, completed: !task.completed, status: (task.completed ? "pending" : "completed") as TaskStatus }
        : task
    ));
    
    const task = tasks.find(t => t.id === id);
    if (task && !task.completed) {
      setShowConfetti(true);
      toast({
        title: "Great job!",
        description: "You're taking wonderful care of your pet!",
      });
    }
  };

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setTaskDialogOpen(true);
  };

  const handleTaskDelete = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
    toast({
      title: "Task deleted",
      description: "The task has been removed from your schedule.",
    });
  };

  const handleTaskAdded = (newTask: any) => {
    setTasks([...tasks, newTask]);
  };

  const handleMoodLogged = (mood: any, note: string) => {
    const newEntry = {
      id: Date.now().toString(),
      mood,
      date: new Date(),
      note,
    };
    setMoodEntries([newEntry, ...moodEntries]);
  };

  const handleFabAddTask = () => {
    addTaskButtonRef.current?.click();
  };

  const handleFabLogMood = () => {
    moodLoggerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <div className="min-h-screen bg-background">
      <WelcomePopup />
      <SuccessConfetti trigger={showConfetti} onComplete={() => setShowConfetti(false)} />
      <FloatingActionButton 
        onAddTask={handleFabAddTask}
        onLogMood={handleFabLogMood}
      />
      
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur-sm z-10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl font-display font-bold text-primary">PawPlanner</h1>
              <p className="text-sm text-muted-foreground">Pet care made simple</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2"
            >
              <PetGuideDialog />
              <AddPetDialog />
              <ThemeToggle />
            </motion.div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div
            className="lg:col-span-2 space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Tabs defaultValue="today" className="w-full">
              <div className="flex items-center justify-between mb-4">
                <TabsList>
                  <TabsTrigger value="today" data-testid="tab-today">Today</TabsTrigger>
                  <TabsTrigger value="week" data-testid="tab-week">Week View</TabsTrigger>
                </TabsList>
                <div>
                  <button ref={addTaskButtonRef} className="hidden" />
                  <AddTaskDialog onTaskAdded={handleTaskAdded} />
                </div>
              </div>

              <TabsContent value="today" className="space-y-3">
                {todaysTasks.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-12"
                  >
                    <p className="text-muted-foreground">No tasks scheduled for today!</p>
                  </motion.div>
                ) : (
                  todaysTasks.map((task, index) => (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <div onClick={() => handleTaskClick(task)} className="cursor-pointer">
                        <TaskCard
                          {...task}
                          onComplete={handleTaskComplete}
                        />
                      </div>
                    </motion.div>
                  ))
                )}
              </TabsContent>

              <TabsContent value="week">
                <WeekView 
                  tasks={tasks} 
                  onTaskClick={handleTaskClick}
                />
              </TabsContent>
            </Tabs>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h2 className="text-2xl font-display font-semibold mb-4">Upcoming Appointments</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {appointments.map((appointment, index) => (
                  <motion.div
                    key={appointment.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                  >
                    <AppointmentCard {...appointment} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <PetStats
              petName="Max"
              tasksCompleted={completedTasks}
              totalTasks={todaysTasks.length}
              hasOverdueTasks={hasOverdueTasks}
            />

            <div className="bg-card border rounded-lg p-6">
              <ActivityProgress activities={defaultActivities} />
            </div>

            <div ref={moodLoggerRef}>
              <MoodLogger onMoodLogged={handleMoodLogged} />
            </div>

            <MoodHistory entries={moodEntries} />
          </motion.div>
        </div>
      </main>

      <TaskDetailDialog
        task={selectedTask}
        open={taskDialogOpen}
        onClose={() => setTaskDialogOpen(false)}
        onToggleComplete={handleTaskComplete}
        onDelete={handleTaskDelete}
      />
    </div>
  );
}
