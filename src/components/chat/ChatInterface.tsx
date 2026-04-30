import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Phone, MoreVertical, MessageSquare, Maximize2, Minimize2 } from 'lucide-react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { useChat } from './useChat';

interface ChatInterfaceProps {
  onClose?: () => void;
  isDemo?: boolean;
  isLight?: boolean;
  initialMessage?: string;
  title?: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ 
  onClose, 
  onToggleExpand,
  isExpanded = false,
  isMobile = false,
  isDemo = false, 
  isLight = false,
  initialMessage,
  title = "VibeAI Support"
}) => {
  const { messages, isTyping, suggestions, sendMessage, scrollRef } = useChat(initialMessage);

  const containerClasses = isDemo 
    ? 'bg-white' 
    : (isLight ? 'bg-white/95 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)]' : 'bg-black/80 backdrop-blur-2xl');

  const headerClasses = isDemo 
    ? 'bg-slate-50 border-slate-200' 
    : (isLight ? 'bg-white/50 border-slate-100' : 'bg-white/5 border-white/10');

  const titleClasses = isDemo || isLight ? 'text-[#0f172a]' : 'text-white';
  const closeButtonClasses = isDemo || isLight ? 'text-slate-400 hover:bg-slate-100 hover:text-slate-900' : 'text-white/40 hover:bg-white/10 hover:text-white';

  return (
    <div className={`flex flex-col h-full overflow-hidden ${containerClasses}`}>
      {/* Header */}
      <div className={`p-6 border-b ${headerClasses} flex items-center justify-between shrink-0`}>
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className={`rounded-xl flex items-center justify-center text-white shadow-lg shadow-amber-500/20 ${isDemo ? 'w-12 h-12 bg-[#fd9a00]' : 'w-10 h-10 bg-[#fd9a00]'}`}>
              <Bot className={isDemo ? "w-6 h-6" : "w-5 h-5"} />
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white" />
          </div>
          <div>
            <h3 className={`font-black text-sm tracking-tight ${titleClasses}`}>{title}</h3>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Active Now</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {!isMobile && onToggleExpand && (
            <button 
              onClick={onToggleExpand}
              className={`p-2 rounded-xl transition-all ${closeButtonClasses}`}
              title={isExpanded ? "Collapse" : "Expand"}
            >
              {isExpanded ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
            </button>
          )}
          
          {isDemo ? (
            <>
              <button className="p-3 rounded-xl hover:bg-slate-200 transition-all text-slate-400">
                <Phone className="w-5 h-5" />
              </button>
              <button className="p-3 rounded-xl hover:bg-slate-200 transition-all text-slate-400">
                <MoreVertical className="w-5 h-5" />
              </button>
            </>
          ) : (
            <button 
              onClick={onClose}
              className={`p-2 rounded-xl transition-all ${closeButtonClasses}`}
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className={`flex-1 overflow-y-auto p-6 space-y-4 scroll-smooth ${isDemo ? "bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-opacity-5" : ""}`}
      >
        {messages.map((msg) => (
          <ChatMessage 
            key={msg.id} 
            message={msg} 
            onActionClick={!isDemo ? onClose : undefined} 
            isDemo={isDemo}
            isLight={isLight}
          />
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className={`${isDemo || isLight ? 'bg-slate-100' : 'bg-white/5 border border-white/5'} p-3 rounded-2xl rounded-tl-none flex gap-1`}>
              <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 rounded-full bg-[#fd9a00]" />
              <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 rounded-full bg-[#fd9a00]" />
              <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 rounded-full bg-[#fd9a00]" />
            </div>
          </div>
        )}
      </div>

      {/* Quick Suggestions */}
      <AnimatePresence>
        {suggestions.length > 0 && !isTyping && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="px-6 py-2 flex flex-wrap gap-2 shrink-0 mb-2"
          >
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => sendMessage(s)}
                className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95 flex items-center gap-2 ${
                  isLight || isDemo 
                    ? 'bg-slate-100 text-[#0f172a] hover:bg-slate-200' 
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                <MessageSquare className="w-3 h-3 text-[#fd9a00]" /> {s}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input */}
      <div className="shrink-0">
        <ChatInput onSend={sendMessage} isDemo={isDemo} isLight={isLight} />
      </div>
    </div>
  );
};

export default ChatInterface;
