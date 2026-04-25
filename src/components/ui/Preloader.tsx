import React from 'react';
import { motion } from 'framer-motion';
import logoImg from '../../assets/logo.png';

export const Preloader: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[var(--background)]"
    >
      <motion.div 
        animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="w-24 h-24 md:w-32 md:h-32 rounded-[32px] bg-foreground/[0.03] border border-foreground/5 flex items-center justify-center mb-8 relative group"
      >
        <div className="absolute inset-0 bg-[#fd9a00] blur-3xl opacity-10 group-hover:opacity-20 transition-opacity" />
        <img 
          src={logoImg} 
          alt="VibeBuilds" 
          className="w-12 h-12 md:w-16 md:h-16 object-contain relative z-10" 
        />
      </motion.div>
      
      <div className="h-1 w-48 bg-foreground/10 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.8, ease: "circOut" }}
          className="h-full bg-gradient-to-r from-[#fd9a00] to-orange-500 rounded-full"
        />
      </div>
    </motion.div>
  );
};
