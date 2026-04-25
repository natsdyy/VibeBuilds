import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, Bot, User, MessageSquare, Shield, 
  Zap, Info, ArrowLeft, ArrowRight, MoreVertical, Paperclip,
  Smile, Phone, Video, Search, CheckCheck
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import GridBackground from '../../components/animations/GridBackground';

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

const BotDemo: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 1, 
      text: "Hello! I'm VibeBot. How can I help you architect your vision today?", 
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
    const messageText = inputText.trim();
    if (!messageText) return;

    const userMessage: Message = {
      id: Date.now(),
      text: messageText,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulated Bot Logic
    setTimeout(() => {
      const lowerText = messageText.toLowerCase();
      let botReply = "I am VibeBot (Simulation Mode). Please use these commands only to see the chat responses: 'pricing', 'services', 'portfolio', 'contact', 'team'.";
      let action: { label: string, path: string } | undefined = undefined;

      if (lowerText.includes('start') || lowerText === '/') {
        botReply = "Welcome to the VibeBuilds Command Center! 🚀 I can help you explore our services, check pricing, or see our latest work. What's on your mind?";
      } else if (lowerText.includes('price') || lowerText.includes('pricing') || lowerText.includes('cost')) {
        botReply = "Our services range from Academic projects (₱2k) to Enterprise solutions (₱500k+). You can view the full breakdown on our services page!";
        action = { label: 'View Pricing', path: '/services' };
      } else if (lowerText.includes('hello') || lowerText.includes('hi')) {
        botReply = "Hi there! I'm ready to assist you. Ask me about our development services or pricing!";
      } else if (lowerText.includes('services') || lowerText.includes('build')) {
        botReply = "We specialize in Custom Systems, Web Applications, Game Development, and of course, Bots like me!";
      } else if (lowerText.includes('portfolio') || lowerText.includes('work') || lowerText.includes('projects')) {
        botReply = "We've built everything from streaming apps like Dynmovs to healthcare systems like Aspire. Check out the 'Projects' page for the full gallery!";
      } else if (lowerText.includes('contact') || lowerText.includes('hire') || lowerText.includes('reach')) {
        botReply = "You can reach us through the 'Contact' page or by using the Discovery Modal on the Home screen. We usually respond within 24 hours!";
      } else if (lowerText.includes('team') || lowerText.includes('who')) {
        botReply = "VibeBuilds is a team of dedicated freelance digital architects. We combine engineering excellence with creative vision.";
      } else if (lowerText.includes('help')) {
        botReply = "Commands you can try: 'pricing', 'services', 'portfolio', 'contact', 'team'.";
      } else if (lowerText.includes('status')) {
        botReply = "Systems are nominal. 🟢 All engines running at peak performance. Ready for your next big idea!";
      }

      const botMessage: Message = {
        id: Date.now() + 1,
        text: botReply,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        action: action
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[var(--background)] !text-[#0f172a] selection:bg-[#fd9a00]/30 overflow-x-hidden">
      <GridBackground spacing={60} />
      <Header />

      <main className="pt-32 pb-20 px-6 max-w-5xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-800 text-[10px] font-black tracking-widest uppercase mb-4 shadow-sm">
              <Zap className="w-3 h-3" /> Real-time Simulation
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2 !text-[#0f172a]">VibeBot <span className="text-[#fd9a00]">AI</span></h1>
            <p className="text-[#334155] font-bold">Experience the speed and logic of our automated systems.</p>
          </div>
          
          <Link 
            to="/labs"
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white border border-slate-200 text-[#0f172a] font-black text-[10px] tracking-widest uppercase hover:bg-slate-50 transition-all shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Demos
          </Link>
        </div>

        {/* Chat Interface */}
        <div className="w-full max-w-2xl mx-auto rounded-[48px] bg-white border border-slate-200 shadow-2xl overflow-hidden flex flex-col h-[700px]">
          {/* Bot Header */}
          <div className="p-6 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl bg-[#fd9a00] flex items-center justify-center text-white shadow-lg shadow-amber-500/30">
                  <Bot className="w-6 h-6" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white" />
              </div>
              <div>
                <h3 className="font-black tracking-tight text-[#0f172a]">VibeBot AI</h3>
                <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Always Active</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-3 rounded-xl hover:bg-slate-200 transition-all text-slate-400">
                <Phone className="w-5 h-5" />
              </button>
              <button className="p-3 rounded-xl hover:bg-slate-200 transition-all text-slate-400">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-8 space-y-6 scroll-smooth bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-opacity-5"
          >
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] flex gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm ${
                    msg.sender === 'user' ? 'bg-slate-100 text-slate-600' : 'bg-[#fd9a00] text-white'
                  }`}>
                    {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  <div className={`p-4 rounded-3xl shadow-sm relative ${
                    msg.sender === 'user' 
                      ? 'bg-[#0f172a] text-white rounded-tr-none' 
                      : 'bg-slate-100 text-[#0f172a] rounded-tl-none'
                  }`}>
                    <p className="text-sm font-bold leading-relaxed">{msg.text}</p>
                    
                    {msg.action && (
                      <Link 
                        to={msg.action.path}
                        className="mt-4 flex items-center justify-center gap-2 px-4 py-2 bg-[#fd9a00] text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:scale-105 transition-all shadow-lg shadow-amber-500/20"
                      >
                        {msg.action.label} <ArrowRight className="w-3 h-3" />
                      </Link>
                    )}

                    <div className={`flex items-center gap-1 mt-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <span className="text-[9px] opacity-40 font-black uppercase tracking-tighter">{msg.timestamp}</span>
                      {msg.sender === 'user' && <CheckCheck className="w-3 h-3 text-emerald-400" />}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="bg-slate-100 p-4 rounded-3xl rounded-tl-none flex gap-1">
                  <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1 }} className="w-2 h-2 rounded-full bg-[#fd9a00]" />
                  <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-2 h-2 rounded-full bg-[#fd9a00]" />
                  <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-2 h-2 rounded-full bg-[#fd9a00]" />
                </div>
              </motion.div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-6 bg-white border-t border-slate-200">
            <div className="flex items-center gap-4 bg-slate-50 rounded-[32px] p-2 border border-slate-200 shadow-inner">
              <button className="p-3 rounded-full hover:bg-slate-200 transition-all text-slate-400">
                <Paperclip className="w-5 h-5" />
              </button>
              <input 
                type="text" 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type a message..."
                className="flex-1 bg-transparent border-none focus:outline-none text-sm font-bold text-[#0f172a] placeholder:text-slate-300 px-2"
              />
              <button className="p-3 rounded-full hover:bg-slate-200 transition-all text-slate-400">
                <Smile className="w-5 h-5" />
              </button>
              <motion.button 
                whileTap={{ scale: 0.9 }}
                onClick={handleSend}
                className="w-12 h-12 rounded-full bg-[#fd9a00] flex items-center justify-center text-white shadow-lg shadow-amber-500/30 hover:scale-105 transition-all"
              >
                <Send className="w-5 h-5 ml-0.5" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
          {[
            { icon: <Shield className="w-6 h-6 text-blue-600" />, title: 'Encrypted', desc: 'Secure data processing with end-to-end encryption logic.' },
            { icon: <Zap className="w-6 h-6 text-amber-600" />, title: 'Instant', desc: 'Sub-second response times optimized for peak engagement.' },
            { icon: <MessageSquare className="w-6 h-6 text-emerald-600" />, title: 'Contextual', desc: 'Smart command parsing based on user intent and history.' },
          ].map((feature, i) => (
            <div key={i} className="p-8 rounded-[32px] border border-slate-200 bg-white shadow-xl">
              <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center mb-6 border border-slate-100">
                {feature.icon}
              </div>
              <h3 className="text-xl font-black tracking-tight mb-2 text-[#0f172a]">{feature.title}</h3>
              <p className="text-sm font-medium text-[#64748b] leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BotDemo;
