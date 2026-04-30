import React from 'react';
import { motion } from 'framer-motion';
import { Bot, User, CheckCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Message } from './types';

interface ChatMessageProps {
  message: Message;
  onActionClick?: () => void;
  isDemo?: boolean;
  isLight?: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, onActionClick, isDemo, isLight }) => {
  const isBot = message.sender === 'bot';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className={`flex ${!isBot ? 'justify-end' : 'justify-start'}`}
    >
      <div className={`max-w-[85%] flex gap-2.5 ${!isBot ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm ${
          !isBot 
            ? (isDemo || isLight ? 'bg-slate-100 text-slate-600' : 'bg-white/10 text-white/60') 
            : 'bg-[#fd9a00] text-white'
        }`}>
          {!isBot ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
        </div>
        <div className={`p-3.5 rounded-2xl text-[13px] font-bold leading-relaxed shadow-sm whitespace-pre-wrap ${
          !isBot 
            ? 'bg-[#fd9a00] text-white rounded-tr-none' 
            : (isDemo || isLight ? 'bg-slate-100 text-[#0f172a] rounded-tl-none' : 'bg-white/5 text-white/90 border border-white/5 rounded-tl-none')
        }`}>
          <p>{message.text}</p>
          
          {message.action && (
            <Link 
              to={message.action.path}
              onClick={onActionClick}
              className="mt-4 flex items-center justify-center gap-2 px-4 py-2 bg-[#fd9a00] text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:scale-105 active:scale-95 transition-all shadow-lg shadow-amber-500/20"
            >
              {message.action.label} <ArrowRight className="w-3 h-3" />
            </Link>
          )}

          <div className={`flex items-center gap-1 mt-1.5 ${!isBot ? 'justify-end' : 'justify-start'}`}>
            <span className="text-[9px] opacity-40 font-black uppercase tracking-tighter">{message.timestamp}</span>
            {!isBot && <CheckCheck className={`w-3 h-3 ${isDemo || isLight ? 'text-emerald-500' : 'text-white/40'}`} />}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatMessage;
