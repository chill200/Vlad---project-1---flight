import { motion } from 'motion/react';

export default function GradientAnimation() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <motion.div
        className="absolute w-full h-full blur-3xl"
        style={{
          background: `radial-gradient(circle at 50% 50%, rgba(75, 127, 255, 0.3), transparent 70%)`,
        }}
        animate={{
          x: ['0%', '-20%', '20%', '0%'],
          y: ['0%', '20%', '-20%', '0%'],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
}
