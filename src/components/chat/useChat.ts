import { useState, useEffect, useRef, useCallback } from 'react';
import { Message, ChatHandle, ChatAction } from './types';

const defaultHandles: ChatHandle[] = [
  {
    pattern: ['price', 'pricing', 'cost'],
    response: "Our development rates are tailored to your needs. Basic projects start at ₱2,000, while complex enterprise systems are quoted after a discovery session.",
    action: { label: 'View Pricing', path: '/services' }
  },
  {
    pattern: ['service', 'what do you do', 'build', 'services'],
    response: "Our Services:\n\n• Custom Business Systems (CRM, ERP, HR, Finance)\n• E‑commerce & POS Solutions\n• Mobile App Development\n• Data Analytics & Dashboards\n• Queueing & Booking Systems\n\n...and much more. We build systems that scale with your business!",
    action: { label: 'Explore Services', path: '/services', label2:'View Samples', path2: '/labs' }
  },
  {
    pattern: ['contact', 'hire', 'reach'],
    response: "You can reach us through the following channels:\n\n• Gmail: vibebuilds.business@gmail.com / charleslouiealvaran@gmail.com\n• Facebook: facebook.com/CharlesLouieAlvaran/\n• Instagram: instagram.com/natsdyyy/\n• Telegram: t.me/NatsDyn\n• Discord: @natsdy\n\nOr fill out the Discovery Modal on the home screen!",
    action: { label: 'Go to Contact', path: '/contact' }
  },
  {
    pattern: ['hello', 'hi', 'hey','hey there','hi there','hello there','Good morning','Good afternoon','Good evening','Good night','Good day', 'kamusta', 'Kumusta'],
    response: "Hello there! I'm here to guide you through the VibeBuilds ecosystem. What's on your mind?"
  },
  {
    pattern: ['portfolio', 'work', 'projects'],
    response: "We've built everything from streaming apps like Dynmovs to healthcare systems like Aspire. Check out the 'Projects' page for the full gallery!",
    action: { label: 'View Projects', path: '/projects' }
  },
  {
    pattern: ['team', 'who', 'programmers', 'members'],
    response: "VibeBuilds is powered by an elite collective of 5 core programmers:\n\n• Cedric Belisario — Fullstack & Game Expert\n• Nathaniel Vasquez — Strategic Fullstack Dev\n• Charles Alvaran — Versatile Fullstack Dev\n• John Marco Paja — Frontend Specialist\n• Patrick Mirhan — PM & Frontend Dev\n\nYou can ask me about any specific member for more details!",
    action: { label: 'Meet the Team', path: '/about' }
  },
  {
    pattern: ['charles', 'alvaran'],
    response: "Charles Alvaran is a Versatile Fullstack Developer. He focuses on creating seamless user interfaces and robust backend integrations. He is currently available for new projects!",
    action: { label: 'View Charles Resume', path: '/assets/mmo/ismeye\'s/Resume/Resume - Charles Louie Alvaran.pdf' }
  },
  {
    pattern: ['john', 'marco', 'paja'],
    response: "John Marco Paja is our Creative Frontend Specialist. He has a keen eye for detail and ensures every user interaction is smooth and purposeful. You can check his resume for his full technical stack!",
    action: { label: 'View John\'s Resume', path: '/assets/mmo/ismeye\'s/Resume/Resume - John Marco Paja.pdf' }
  },
  {
    pattern: ['cedric', 'nathaniel', 'patrick'],
    response: "They are core members of the VibeBuilds elite collective. Each brings years of expertise in Fullstack development and Project Management. We are currently preparing their full interactive resumes!",
    action: { label: 'Go to About', path: '/about' }
  },
  {
    pattern: ['how to use', 'guide', 'help', 'instructions', 'bot','paano'],
    response: "I'm your VibeBuilds navigator! You can:\n\n1. Type keywords like 'pricing' or 'projects'.\n2. Ask about specific team members (e.g., 'Who is Charles?').\n3. Use the quick-suggestion buttons at the bottom.\n4. Ask for contact info if you're ready to start a project!",
  },
];

export const useChat = (initialMessage: string = "Hello! How can I help you today?") => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 1, 
      text: initialMessage, 
      sender: 'bot', 
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>(['Pricing', 'Services', 'Projects', 'Contact']);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  const sendMessage = async (text: string) => {
    const userMsg: Message = {
      id: Date.now(),
      text,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);
    setSuggestions([]); // Clear suggestions when user sends a message

    // Simulate Bot Response
    setTimeout(() => {
      const lower = text.toLowerCase();
      let response = "I'm processing that... In the meantime, you can ask about our 'pricing', 'services', or 'contact' us!";
      let action: ChatAction | undefined = undefined;

      for (const handle of defaultHandles) {
        const patterns = Array.isArray(handle.pattern) ? handle.pattern : [handle.pattern];
        if (patterns.some(p => lower.includes(p))) {
          response = typeof handle.response === 'function' ? handle.response(text) : handle.response;
          action = typeof handle.action === 'function' ? handle.action(text) : handle.action;
          break;
        }
      }

      const botMsg: Message = {
        id: Date.now() + 1,
        text,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        action
      };

      // Set the response text correctly
      botMsg.text = response;

      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
      
      // Update suggestions based on context or just reset to defaults if no specific logic
      if (lower.includes('price') || lower.includes('pricing')) {
        setSuggestions(['Services', 'Contact']);
      } else {
        setSuggestions(['Pricing', 'Services', 'Projects', 'Contact']);
      }
    }, 1500);
  };

  return {
    messages,
    isTyping,
    suggestions,
    sendMessage,
    scrollRef,
    scrollToBottom
  };
};
