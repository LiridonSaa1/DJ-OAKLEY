import { ReactNode } from "react";
import { motion } from "framer-motion";

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
  width?: "fit-content" | "100%";
}

export function ScrollReveal({
  children,
  delay = 0,
  direction = "up",
  className = "",
  width = "100%"
}: ScrollRevealProps) {
  const directions = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
    none: { x: 0, y: 0 },
  };

  return (
    <div style={{ width }} className={`overflow-hidden ${className}`}>
      <motion.div
        variants={{
          hidden: {
            opacity: 0,
            ...directions[direction],
          },
          visible: {
            opacity: 1,
            x: 0,
            y: 0,
          },
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        transition={{
          duration: 0.6,
          delay: delay,
          ease: [0.22, 1, 0.36, 1], // Custom smooth ease
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
