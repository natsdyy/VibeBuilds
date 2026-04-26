import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, Globe, Zap, Shield, Cpu, MessageSquare, Briefcase, Camera, ExternalLink } from 'lucide-react';
import Logo from './Logo';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Our Work', href: '/projects' },
      { name: 'Contact', href: '/contact' },
      { name: 'Careers', href: '#' },
    ],
    services: [
      { name: 'Web Development', href: '/services' },
      { name: 'UI/UX Design', href: '/services' },
      { name: 'Cloud Solutions', href: '/services' },
      { name: 'Digital Strategy', href: '/services' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
      { name: 'Cookie Policy', href: '#' },
    ],
  };

  const socialLinks = [
    { 
      icon: <img src="https://www.google.com/s2/favicons?sz=64&domain=facebook.com" className="w-5 h-5 grayscale group-hover:grayscale-0 transition-all" alt="Facebook" />, 
      href: 'https://www.facebook.com/profile.php?id=61588893476661', 
      label: 'Facebook' 
    },
    { 
      icon: <img src="https://www.google.com/s2/favicons?sz=64&domain=discord.com" className="w-5 h-5 grayscale group-hover:grayscale-0 transition-all" alt="Discord" />, 
      href: 'https://discord.gg/prVnHEmgZV', 
      label: 'Discord' 
    },
    { 
      icon: <img src="https://www.google.com/s2/favicons?sz=64&domain=telegram.org" className="w-5 h-5 grayscale group-hover:grayscale-0 transition-all" alt="Telegram" />, 
      href: 'https://t.me/DynMovies', 
      label: 'Telegram' 
    },
  ];

  return (
    <footer className="relative bg-[var(--background)] pt-32 pb-12 overflow-hidden transition-colors duration-300 border-t border-[var(--border)]">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#fd9a00]/5 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-500/5 blur-[120px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 mb-24">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-8">
            <Logo />
            <p className="text-[var(--text-muted)] text-lg leading-relaxed max-w-sm font-medium">
              Architecting high-performance digital experiences that scale with your vision. Elite engineering meets immersive design.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  aria-label={social.label}
                  whileHover={{ y: -4, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 rounded-2xl bg-foreground/5 border border-foreground/10 flex items-center justify-center text-[var(--text-muted)] hover:text-[#fd9a00] hover:border-[#fd9a00]/30 transition-all duration-300"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-8">
            <div className="space-y-8">
              <h4 className="text-[10px] font-black tracking-[0.3em] text-foreground uppercase">Company</h4>
              <ul className="space-y-4">
                {footerLinks.company.map((link, i) => (
                  <li key={i}>
                    <Link 
                      to={link.href} 
                      className="text-[var(--text-muted)] hover:text-[#fd9a00] font-medium transition-colors duration-300 flex items-center group"
                    >
                      <span className="w-0 group-hover:w-4 h-px bg-[#fd9a00] mr-0 group-hover:mr-2 transition-all duration-300" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-8">
              <h4 className="text-[10px] font-black tracking-[0.3em] text-foreground uppercase">Services</h4>
              <ul className="space-y-4">
                {footerLinks.services.map((link, i) => (
                  <li key={i}>
                    <Link 
                      to={link.href} 
                      className="text-[var(--text-muted)] hover:text-[#fd9a00] font-medium transition-colors duration-300 flex items-center group"
                    >
                      <span className="w-0 group-hover:w-4 h-px bg-[#fd9a00] mr-0 group-hover:mr-2 transition-all duration-300" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-4 space-y-8">
            <div className="p-8 rounded-[32px] bg-foreground/[0.03] border border-foreground/5 backdrop-blur-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#fd9a00]/10 blur-3xl -z-10 group-hover:bg-[#fd9a00]/20 transition-all duration-500" />
              
              <h4 className="text-xl font-black tracking-tight mb-4">Let's Build Your Vision</h4>
              <p className="text-sm text-[var(--text-muted)] mb-6 font-medium">Ready to transform your business? Start your interactive discovery journey today.</p>
              
              <Link to="/contact">
                <button 
                  className="w-full h-14 rounded-2xl bg-foreground text-background font-black text-[10px] tracking-widest flex items-center justify-center gap-3 hover:bg-[#fd9a00] transition-all duration-300 group/btn"
                >
                  START PROJECT <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>
            
            <div className="flex items-center gap-6 pt-4">
              <div className="flex items-center gap-2 text-[10px] font-black tracking-widest text-[var(--text-muted)] uppercase">
                <Shield className="w-4 h-4 text-[#fd9a00]" />
                Secure
              </div>
              <div className="flex items-center gap-2 text-[10px] font-black tracking-widest text-[var(--text-muted)] uppercase">
                <Zap className="w-4 h-4 text-[#fd9a00]" />
                Fast
              </div>
              <div className="flex items-center gap-2 text-[10px] font-black tracking-widest text-[var(--text-muted)] uppercase">
                <Cpu className="w-4 h-4 text-[#fd9a00]" />
                Elite
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-[var(--border)] flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2 text-[10px] font-black tracking-[0.3em] text-foreground/20 uppercase">
            <span>© {currentYear} VibeBuilds Digital</span>
            <span className="w-1.5 h-1.5 rounded-full bg-foreground/10" />
            <span>All Rights Reserved</span>
          </div>

          <div className="flex gap-8">
            {footerLinks.legal.map((link, i) => (
              <Link 
                key={i} 
                to={link.href} 
                className="text-[10px] font-black tracking-[0.2em] text-[var(--text-muted)] hover:text-foreground uppercase transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4 text-[10px] font-black tracking-[0.2em] text-[var(--text-muted)] uppercase">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Systems Operational
            </div>
            <div className="h-4 w-px bg-[var(--border)]" />
            <div className="flex items-center gap-2">
              <Globe className="w-3.5 h-3.5" />
              Global Edge
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
