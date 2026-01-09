import { motion } from "framer-motion";

export function PawPrintLoader() {
  const pawVariants = {
    initial: { y: 0, opacity: 0.4 },
    animate: { y: -10, opacity: 1 },
  };

  return (
    <div className="flex items-center gap-2">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          variants={pawVariants}
          initial="initial"
          animate="animate"
          transition={{
            duration: 0.6,
            repeat: Infinity,
            repeatType: "reverse",
            delay: i * 0.2,
          }}
          className="w-3 h-3 rounded-full bg-primary"
        />
      ))}
    </div>
  );
}
