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
    response: "We specialize in high-end digital solutions: Custom Web Apps, Game Development (MMORPGs), and AI-driven systems.",
    action: { label: 'Explore Services', path: '/services' }
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
    pattern: ['team', 'who'],
    response: "VibeBuilds is powered by a elite team of digital programmers:\n\n• Cedric Belisario — Fullstack Developer (Currently on a project)\n• Nathaniel Vasquez — Fullstack Developer\n• Charles Alvaran — Fullstack Developer\n• John Marco Paja — Front end Developer\n• Patrick Mirhan — Front end Developer / Project Manager",
    action: { label: 'Meet the Team', path: '/about' }
  },
  {
    pattern: ['status'],
    response: "Systems are nominal. 🟢 All engines running at peak performance. Ready for your next big idea!"
  }
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
