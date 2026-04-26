import React from 'react';
import { motion } from 'framer-motion';
import { Gamepad2, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const SupportOverlay: React.FC = () => {
  return (
    <div className="fixed bottom-8 right-8 z-[9999] flex flex-col items-end group">
      {/* Tooltip Label */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        whileHover={{ opacity: 1, x: 0 }}
        className="mb-4 mr-2 px-4 py-2 rounded-xl bg-black/80 border border-white/10 backdrop-blur-xl text-white text-[10px] font-black tracking-[0.2em] uppercase pointer-events-none opacity-0 group-hover:opacity-100 transition-all shadow-2xl"
      >
        Enter VibeMMO <span className="text-[#fd9a00] ml-2">Live Shard</span>
      </motion.div>

      {/* Main Game Button */}
      <Link to="/mmorpg">
        <motion.button
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          className="w-16 h-16 rounded-[24px] bg-[#fd9a00] text-white flex items-center justify-center shadow-2xl shadow-[#fd9a00]/30 hover:shadow-[#fd9a00]/50 transition-all duration-300 relative group cursor-pointer"
        >
          <Gamepad2 className="w-8 h-8" />
          
          {/* Pulsing Status Indicator */}
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full animate-pulse shadow-lg" />
          
          {/* Subtle Glow Effect */}
          <div className="absolute inset-0 rounded-[24px] bg-[#fd9a00] blur-xl opacity-20 group-hover:opacity-40 transition-opacity -z-10" />
          
          {/* Animated Sparkles */}
          <div className="absolute -top-4 -left-4 pointer-events-none">
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                opacity: [0, 1, 0]
              }}
              transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
            >
              <Sparkles className="w-4 h-4 text-[#fd9a00]" />
            </motion.div>
          </div>
        </motion.button>
      </Link>
    </div>
  );
};

export default SupportOverlay;
