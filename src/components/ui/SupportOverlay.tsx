import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, Send, X, Bot, User, 
  Sparkles, CheckCheck, Paperclip, Smile,
  MoreVertical, Phone, ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface Message {
  id: number;
  text: string;
  sender: 'bot' | 'user';
  timestamp: string;
  action?: {
    label: string;
    path: string;
  };
}

const SupportOverlay: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 1, 
      text: "Welcome to VibeBuilds! I'm your VibeAI assistant. How can I help you architect your vision today?", 
      sender: 'bot', 
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = () => {
    const text = inputText.trim();
    if (!text) return;

    const userMsg: Message = {
      id: Date.now(),
      text,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Simulated AI Logic
    setTimeout(() => {
      const lower = text.toLowerCase();
      let response = "";
      let action: { label: string; path: string } | undefined = undefined;
      
      if (lower.includes('price') || lower.includes('pricing') || lower.includes('cost')) {
        response = "Our development rates are tailored to your needs. Basic projects start at ₱2,000, while complex enterprise systems are quoted after a discovery session. Would you like to see our services page for more details?";
        action = { label: 'View Pricing', path: '/services' };
      } else if (lower.includes('service') || lower.includes('what do you do') || lower.includes('build')) {
        response = "We specialize in high-end digital solutions: Custom Web Apps, Game Development (MMORPGs), and AI-driven systems. We're currently featuring our 'Labs' section for experimental tech!";
        action = { label: 'Explore Services', path: '/services' };
      } else if (lower.includes('contact') || lower.includes('hire') || lower.includes('reach')) {
        response = "You can reach our lead architect directly through the 'Contact' page, or fill out the Discovery Modal on the home screen. We usually respond within 24 hours!";
        action = { label: 'Get Started', path: '/contact' };
      } else if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
        response = "Hello there! I'm here to guide you through the VibeBuilds ecosystem. What's on your mind?";
      } else {
        response = "I'm processing that... In the meantime, you can ask about our 'pricing', 'services', or how to 'contact' us!";
      }

      const botMsg: Message = {
        id: Date.now() + 1,
        text: response,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        action
      };

      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="fixed bottom-8 right-8 z-[9999] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-6 w-[380px] h-[550px] bg-black/80 backdrop-blur-2xl border border-white/10 rounded-[32px] shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 bg-white/5 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-[#fd9a00] flex items-center justify-center text-white shadow-lg shadow-amber-500/20">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-black" />
                </div>
                <div>
                  <h3 className="text-white font-black text-sm tracking-tight">VibeAI Support</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Active Now</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-xl hover:bg-white/10 transition-all text-white/40 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 space-y-4 scroll-smooth"
            >
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] flex gap-2.5 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      msg.sender === 'user' ? 'bg-white/10 text-white/60' : 'bg-[#fd9a00] text-white'
                    }`}>
                      {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>
                    <div className={`p-3.5 rounded-2xl text-[13px] font-bold leading-relaxed ${
                      msg.sender === 'user' 
                        ? 'bg-[#fd9a00] text-white rounded-tr-none' 
                        : 'bg-white/5 text-white/90 border border-white/5 rounded-tl-none'
                    }`}>
                      <p>{msg.text}</p>
                      
                      {msg.action && (
                        <Link 
                          to={msg.action.path}
                          onClick={() => setIsOpen(false)}
                          className="mt-4 flex items-center justify-center gap-2 px-4 py-2 bg-[#fd9a00] text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:scale-105 active:scale-95 transition-all shadow-lg shadow-amber-500/20"
                        >
                          {msg.action.label} <ArrowRight className="w-3 h-3" />
                        </Link>
                      )}

                      <div className={`flex items-center gap-1 mt-1.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <span className="text-[9px] opacity-40 font-black uppercase tracking-tighter">{msg.timestamp}</span>
                        {msg.sender === 'user' && <CheckCheck className="w-3 h-3 text-white/40" />}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/5 border border-white/5 p-3 rounded-2xl rounded-tl-none flex gap-1">
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 rounded-full bg-[#fd9a00]" />
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 rounded-full bg-[#fd9a00]" />
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 rounded-full bg-[#fd9a00]" />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-6 bg-white/5 border-t border-white/10">
              <div className="flex items-center gap-3 bg-white/5 rounded-2xl p-1.5 border border-white/10">
                <input 
                  type="text" 
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask VibeAI anything..."
                  className="flex-1 bg-transparent border-none focus:outline-none text-xs font-bold text-white placeholder:text-white/20 px-3"
                />
                <motion.button 
                  whileTap={{ scale: 0.9 }}
                  onClick={handleSend}
                  className="w-10 h-10 rounded-xl bg-[#fd9a00] flex items-center justify-center text-white shadow-lg shadow-amber-500/20 hover:scale-105 transition-all"
                >
                  <Send className="w-4 h-4 ml-0.5" />
                </motion.button>
              </div>
              <p className="text-center text-[9px] font-black text-white/20 uppercase tracking-[0.2em] mt-4">
                Powered by VibeBuilds <span className="text-[#fd9a00]">Engine</span>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <div className="flex flex-col items-end group">
        {!isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileHover={{ opacity: 1, x: 0 }}
            className="mb-4 mr-2 px-4 py-2 rounded-xl bg-black/80 border border-white/10 backdrop-blur-xl text-white text-[10px] font-black tracking-[0.2em] uppercase pointer-events-none opacity-0 group-hover:opacity-100 transition-all shadow-2xl"
          >
            VibeAI <span className="text-[#fd9a00] ml-2">Online</span>
          </motion.div>
        )}

        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.1, rotate: isOpen ? -90 : 5 }}
          whileTap={{ scale: 0.9 }}
          className={`w-16 h-16 rounded-[24px] flex items-center justify-center shadow-2xl transition-all duration-300 relative group cursor-pointer ${
            isOpen 
              ? 'bg-white/10 text-white backdrop-blur-xl border border-white/10' 
              : 'bg-[#fd9a00] text-white shadow-[#fd9a00]/30 hover:shadow-[#fd9a00]/50'
          }`}
        >
          {isOpen ? <X className="w-7 h-7" /> : <MessageSquare className="w-7 h-7" />}
          
          {/* Pulsing Status Indicator */}
          {!isOpen && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full animate-pulse shadow-lg" />
          )}
          
          {/* Subtle Glow Effect */}
          <div className={`absolute inset-0 rounded-[24px] blur-xl opacity-20 group-hover:opacity-40 transition-opacity -z-10 ${
            isOpen ? 'bg-white' : 'bg-[#fd9a00]'
          }`} />
          
          {/* Animated Sparkles */}
          {!isOpen && (
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
          )}
        </motion.button>
      </div>
    </div>
  );
};

export default SupportOverlay;
