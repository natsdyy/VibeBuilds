import React from 'react';
import { motion } from 'framer-motion';

export const Preloader: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[var(--background)]"
    >
      <motion.div 
        animate={{ scale: [1, 1.05, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="w-20 h-20 md:w-24 md:h-24 rounded-[24px] bg-[#fd9a00]/10 border border-[#fd9a00]/20 flex items-center justify-center mb-8 relative"
      >
        <div className="absolute inset-0 bg-[#fd9a00] blur-xl opacity-20" />
        <span className="text-[#fd9a00] font-black text-2xl md:text-3xl tracking-tighter relative z-10">VB</span>
      </motion.div>
      
      <div className="h-1 w-48 bg-foreground/10 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.8, ease: "circOut" }}
          className="h-full bg-gradient-to-r from-[#fd9a00] to-orange-500 rounded-full"
        />
      </div>
      
      <p className="mt-6 text-[10px] md:text-xs font-black tracking-[0.4em] uppercase text-[var(--text-muted)] animate-pulse">
        Initializing Asset Cache
      </p>
    </motion.div>
  );
};
