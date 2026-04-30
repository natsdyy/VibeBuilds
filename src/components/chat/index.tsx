import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatInterface from './ChatInterface';
import ChatToggle from './ChatToggle';

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLight, setIsLight] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check for light mode - looking at the screenshot, the site has a light background
    // We can check if the body has a certain class or just check the system preference
    const checkTheme = () => {
      const isDarkMode = document.documentElement.classList.contains('dark');
      setIsLight(!isDarkMode);
    };

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkTheme();
    checkMobile();

    window.addEventListener('resize', checkMobile);
    // Observe class changes on documentElement if needed
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => {
      window.removeEventListener('resize', checkMobile);
      observer.disconnect();
    };
  }, []);

  return (
    <div className={`fixed z-[9999] flex flex-col items-end ${isMobile ? 'inset-x-0 bottom-0 p-4' : 'bottom-8 right-8'}`}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={isMobile 
              ? { opacity: 0, y: '100%' } 
              : { opacity: 0, y: 20, scale: 0.95, transformOrigin: 'bottom right' }
            }
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              width: isMobile ? '100%' : (isExpanded ? '800px' : '400px'),
              height: isMobile ? '85vh' : (isExpanded ? '800px' : '600px'),
            }}
            exit={isMobile 
              ? { opacity: 0, y: '100%' } 
              : { opacity: 0, y: 20, scale: 0.95 }
            }
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={`${
              isMobile 
                ? 'rounded-t-[40px]' 
                : 'mb-6 rounded-[32px]'
            } border ${isLight ? 'border-slate-100 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)]' : 'border-white/10 shadow-2xl'} flex flex-col overflow-hidden ${isLight ? 'bg-white/95' : 'bg-black/80'} backdrop-blur-2xl`}
          >
            <ChatInterface 
              isLight={isLight} 
              isMobile={isMobile}
              isExpanded={isExpanded}
              onToggleExpand={() => setIsExpanded(!isExpanded)}
              onClose={() => setIsOpen(false)} 
            />
          </motion.div>
        )}
      </AnimatePresence>

      {!isMobile && (
        <ChatToggle isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
      )}
      
      {isMobile && !isOpen && (
        <ChatToggle isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
      )}
    </div>
  );
};

export default Chatbot;
export { ChatInterface };
export { useChat } from './useChat';
export * from './types';
