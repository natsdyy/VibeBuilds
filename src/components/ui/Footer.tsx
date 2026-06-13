import React from 'react';
import { MessageSquare, Mail } from 'lucide-react';
import { Facebook } from './Facebook';

const Footer: React.FC = () => {
  return (
    <footer className="py-20 border-t border-[var(--border)] bg-[var(--background)] transition-colors duration-300 relative z-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col gap-6 text-center md:text-left">
          <div className="text-[10px] font-black tracking-widest text-foreground/30 uppercase">© 2026 VibeBuilds Digital</div>
          <div className="flex gap-6 items-center justify-center md:justify-start text-[var(--text-muted)]">
            <a href="https://www.facebook.com/profile.php?id=61588893476661" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-500 transition-colors">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="https://discord.gg/FzW7XFnB4e" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-500 transition-colors">
              <MessageSquare className="w-5 h-5" />
            </a>
            <a href="mailto:vibebuilds.business@gmail.com" className="hover:text-yellow-500 transition-colors">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
        <div className="flex gap-8 text-[10px] font-black tracking-widest text-[var(--text-muted)] mt-4 md:mt-0">
          <a href="#" className="hover:text-foreground transition-colors uppercase">Privacy</a>
          <a href="#" className="hover:text-foreground transition-colors uppercase">Terms</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
