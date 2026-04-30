import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Paperclip, Smile } from 'lucide-react';

interface ChatInputProps {
  onSend: (text: string) => void;
  placeholder?: string;
  isDemo?: boolean;
  isLight?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend, placeholder = "Ask VibeAI anything...", isDemo, isLight }) => {
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (inputText.trim()) {
      onSend(inputText);
      setInputText('');
    }
  };

  const containerClasses = isDemo || isLight 
    ? 'bg-slate-50 border-slate-200 shadow-inner' 
    : 'bg-white/5 border-white/10';

  const inputClasses = isDemo || isLight 
    ? 'text-[#0f172a] placeholder:text-slate-300' 
    : 'text-white placeholder:text-white/20';

  return (
    <div className={`p-6 ${isDemo || isLight ? 'bg-white border-t border-slate-200' : 'bg-transparent border-t border-white/10'}`}>
      <div className={`flex items-center gap-3 ${containerClasses} rounded-2xl p-1.5`}>
        {isDemo && (
          <button className="p-2 rounded-full hover:bg-slate-200 transition-all text-slate-400">
            <Paperclip className="w-5 h-5" />
          </button>
        )}
        <input 
          type="text" 
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder={placeholder}
          className={`flex-1 bg-transparent border-none focus:outline-none text-xs font-bold ${inputClasses} px-3`}
        />
        {isDemo && (
          <button className="p-2 rounded-full hover:bg-slate-200 transition-all text-slate-400">
            <Smile className="w-5 h-5" />
          </button>
        )}
        <motion.button 
          whileTap={{ scale: 0.9 }}
          onClick={handleSend}
          className="w-10 h-10 rounded-xl bg-[#fd9a00] flex items-center justify-center text-white shadow-lg shadow-amber-500/20 hover:scale-105 transition-all"
        >
          <Send className="w-4 h-4 ml-0.5" />
        </motion.button>
      </div>
    </div>
  );
};

export default ChatInput;
