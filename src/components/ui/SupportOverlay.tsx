import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Sparkles, Mail } from 'lucide-react';

const SupportOverlay: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-8 right-8 z-[9999] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mb-6 w-80 md:w-96 rounded-[32px] bg-background/40 border border-foreground/10 backdrop-blur-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 bg-gradient-to-r from-[#fd9a00]/20 to-orange-500/10 border-b border-foreground/5 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#fd9a00] flex items-center justify-center text-white shadow-lg shadow-[#fd9a00]/20">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-black tracking-tight">Live Support</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Active Soon</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-foreground/5 flex items-center justify-center hover:bg-foreground/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content */}
            <div className="p-8 text-center space-y-6">
              <div className="w-20 h-20 rounded-[24px] bg-foreground/5 flex items-center justify-center mx-auto mb-2">
                <Sparkles className="w-10 h-10 text-[#fd9a00]" />
              </div>
              <div className="space-y-2">
                <h4 className="text-xl font-black tracking-tight">Coming Soon</h4>
                <p className="text-sm text-[var(--text-muted)] font-medium leading-relaxed">
                  Our instant engineering support is being tuned for peak performance.
                </p>
              </div>
            </div>

            {/* Footer Placeholder */}
            <div className="px-6 py-4 bg-foreground/[0.02] border-t border-foreground/5">
              <div className="flex items-center gap-3 opacity-30 grayscale pointer-events-none">
                <div className="flex-1 h-10 rounded-xl bg-foreground/10" />
                <div className="w-10 h-10 rounded-xl bg-foreground/10" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`w-16 h-16 rounded-[24px] flex items-center justify-center shadow-2xl transition-all duration-500 ${
          isOpen 
          ? 'bg-foreground text-background' 
          : 'bg-[#fd9a00] text-white shadow-[#fd9a00]/30 hover:shadow-[#fd9a00]/50'
        }`}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              className="relative"
            >
              <MessageSquare className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 border-2 border-[#fd9a00] rounded-full animate-pulse" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export default SupportOverlay;
