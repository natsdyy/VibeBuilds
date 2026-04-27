import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send } from 'lucide-react';
import { ChatMessage } from '../types';

interface ChatBoxProps {
  showChat: boolean;
  showMapOnly: boolean;
  messages: ChatMessage[];
  inputText: string;
  setInputText: (text: string) => void;
  sendMessage: (e: React.FormEvent) => void;
}

const ChatBox: React.FC<ChatBoxProps> = ({ 
  showChat, 
  showMapOnly, 
  messages, 
  inputText, 
  setInputText, 
  sendMessage 
}) => {
  return (
    <AnimatePresence>
      {showChat && !showMapOnly && (
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="absolute bottom-8 left-8 w-80 max-h-96 flex flex-col gap-4 pointer-events-auto"
        >
          <div className="bg-black/50 border border-white/10 backdrop-blur-2xl rounded-[32px] p-6 flex flex-col overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-4">
              <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Global Shard</span>
              <MessageCircle className="w-4 h-4 text-[#fd9a00]" />
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-3 mb-4 custom-scrollbar max-h-48 pr-2">
              {messages.map(msg => (
                <div key={msg.id} className="text-sm">
                  <span className={`font-black uppercase text-[10px] mr-2 ${msg.sender === 'VibePlayer' ? 'text-[#fd9a00]' : 'text-white/40'}`}>
                    {msg.sender}:
                  </span>
                  <span className="text-white/80 font-medium">{msg.text}</span>
                </div>
              ))}
            </div>

            <form onSubmit={sendMessage} className="relative">
              <input 
                type="text" 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type a message..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-[#fd9a00]/50 transition-all"
              />
              <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-[#fd9a00]">
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ChatBox;
