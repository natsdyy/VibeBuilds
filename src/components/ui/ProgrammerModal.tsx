import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, ExternalLink, ArrowRight } from 'lucide-react';

interface TeamMember {
  name: string;
  role: string;
  image: string;
  summary: string;
  resume: string | null;
  available: boolean;
}

interface ProgrammerModalProps {
  member: TeamMember | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProgrammerModal: React.FC<ProgrammerModalProps> = ({ member, isOpen, onClose }) => {
  const [view, setView] = React.useState<'profile' | 'resume'>('profile');

  React.useEffect(() => {
    if (isOpen) setView('profile');
  }, [isOpen]);

  if (!member) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-background/80 backdrop-blur-xl"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-5xl bg-[var(--background)] border border-foreground/10 rounded-[40px] overflow-hidden shadow-2xl flex flex-col md:flex-row h-[90vh] md:h-[85vh]"
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 md:top-6 md:right-6 z-[120] p-2 rounded-full bg-foreground/10 md:bg-foreground/5 hover:bg-foreground/20 text-foreground transition-colors shadow-lg"
            >
              <X className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            {/* Left Side: Image / Profile Nav */}
            <div className={`hidden md:flex md:w-1/3 relative flex-col ${view === 'resume' ? 'bg-foreground/5' : ''} transition-colors duration-500`}>
              <div className="h-2/3 relative overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className={`w-full h-full object-cover transition-all duration-700 ${view === 'resume' ? 'scale-110 blur-md opacity-30' : 'grayscale'}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-transparent to-transparent" />
              </div>
              
              <div className="p-8 flex flex-col gap-4 mt-auto">
                <button 
                  onClick={() => setView('profile')}
                  className={`w-full py-4 rounded-2xl font-black text-xs tracking-widest uppercase transition-all ${
                    view === 'profile' ? 'bg-[#fd9a00] text-white shadow-lg shadow-[#fd9a00]/20' : 'bg-foreground/5 text-foreground hover:bg-foreground/10'
                  }`}
                >
                  Programmer Profile
                </button>
                {member.resume && (
                  <button 
                    onClick={() => setView('resume')}
                    className={`w-full py-4 rounded-2xl font-black text-xs tracking-widest uppercase transition-all ${
                      view === 'resume' ? 'bg-[#fd9a00] text-white shadow-lg shadow-[#fd9a00]/20' : 'bg-foreground/5 text-foreground hover:bg-foreground/10'
                    }`}
                  >
                    View Full Resume
                  </button>
                )}
              </div>
            </div>

            {/* Right Side / Content Area */}
            <div className="flex-1 flex flex-col h-full overflow-hidden min-h-0">
              {/* Mobile Navigation Toggle */}
              <div className="flex md:hidden p-3 bg-foreground/5 gap-2 border-b border-foreground/10 pr-14">
                <button 
                  onClick={() => setView('profile')}
                  className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                    view === 'profile' ? 'bg-[#fd9a00] text-white shadow-lg' : 'bg-background/50 text-[var(--text-muted)]'
                  }`}
                >
                  Summary
                </button>
                {member.resume && (
                  <button 
                    onClick={() => setView('resume')}
                    className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                      view === 'resume' ? 'bg-[#fd9a00] text-white shadow-lg' : 'bg-background/50 text-[var(--text-muted)]'
                    }`}
                  >
                    Resume
                  </button>
                )}
              </div>

              <AnimatePresence mode="wait">
                {view === 'profile' ? (
                  <motion.div
                    key="profile"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="p-6 md:p-12 flex flex-col h-full overflow-y-auto"
                  >
                    {/* Mobile Image (Visible only on mobile profile view) */}
                    <div className="md:hidden w-full aspect-square rounded-[32px] overflow-hidden mb-6 border border-foreground/10 shrink-0">
                      <img src={member.image} alt={member.name} className="w-full h-full object-cover object-top grayscale" />
                    </div>

                    <div className="mb-4">
                      <p className="text-[#fd9a00] text-[10px] font-black uppercase tracking-[0.3em] mb-1">Programmer Profile</p>
                      <h2 className="text-3xl font-black tracking-tighter text-foreground leading-[0.9] mb-2">
                        {member.name.split(' ')[0]} <br/>
                        <span className="text-[#fd9a00]">{member.name.split(' ').slice(1).join(' ')}</span>
                      </h2>
                      <p className="text-base font-bold text-[var(--text-muted)] tracking-tight">{member.role}</p>
                    </div>

                    <div className="mb-6">
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-[#fd9a00] mb-2">Professional Summary</h4>
                      <p className="text-sm text-[var(--text-muted)] leading-relaxed font-medium">
                        {member.summary}
                      </p>
                    </div>

                    <div className="mt-auto pt-4 pb-12">
                      {member.resume ? (
                        <button 
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setView('resume');
                          }}
                          className="w-full flex items-center justify-center gap-3 px-8 py-5 rounded-2xl bg-[#fd9a00] text-white font-black text-sm tracking-widest active:scale-95 transition-all shadow-xl shadow-[#fd9a00]/20 relative z-[150] touch-none"
                          style={{ pointerEvents: 'auto' }}
                        >
                          <ExternalLink className="w-5 h-5" /> VIEW RESUME
                        </button>
                      ) : (
                        <div className="w-full flex items-center justify-center gap-3 px-8 py-5 rounded-2xl bg-foreground/5 border border-foreground/10 text-[var(--text-muted)] font-black text-sm tracking-widest opacity-60">
                          RESUME COMING SOON
                        </div>
                      )}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="resume"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex flex-col h-full overflow-hidden bg-white"
                  >
                    <div className="p-4 bg-[var(--background)] border-b border-foreground/10 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <button 
                          onClick={() => setView('profile')}
                          className="p-2 rounded-xl bg-foreground/5 hover:bg-foreground/10 text-foreground transition-colors"
                        >
                          <ArrowRight className="w-5 h-5 rotate-180" />
                        </button>
                        <p className="text-[10px] font-black uppercase tracking-widest text-foreground">Interactive Viewer</p>
                      </div>
                      <a 
                        href={member.resume!} 
                        download 
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#fd9a00] text-white font-black text-[8px] tracking-widest hover:scale-105 transition-all"
                      >
                        <Download className="w-3 h-3" /> DOWNLOAD
                      </a>
                    </div>
                    <iframe 
                      src={`${member.resume}#toolbar=0&navpanes=0&scrollbar=0`} 
                      className="w-full h-full border-none"
                      title={`${member.name} Resume`}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProgrammerModal;
