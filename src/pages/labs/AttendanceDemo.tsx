import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Clock, LogIn, LogOut, Calendar, CheckCircle2, AlertCircle, 
  UserCheck, Activity, Coffee, Timer
} from 'lucide-react';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import GridBackground from '../../components/animations/GridBackground';

type LogEntry = {
  id: string;
  type: 'IN' | 'OUT';
  timestamp: Date;
};

const AttendanceDemo: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>([
    { id: '1', type: 'IN', timestamp: new Date(new Date().setHours(8, 0, 0, 0)) }
  ]);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Check initial state from logs
    if (logs.length > 0) {
      setIsCheckedIn(logs[logs.length - 1].type === 'IN');
    } else {
      setIsCheckedIn(false);
    }
  }, [logs]);

  const handleTimeAction = (type: 'IN' | 'OUT') => {
    setIsProcessing(true);
    // Simulate network delay
    setTimeout(() => {
      const newLog: LogEntry = {
        id: Math.random().toString(36).substr(2, 9),
        type,
        timestamp: new Date()
      };
      setLogs([...logs, newLog]);
      setIsProcessing(false);
    }, 800);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  const calculateHours = () => {
    if (logs.length < 2) return '0h 0m';
    
    let totalMs = 0;
    let lastIn: Date | null = null;
    
    logs.forEach(log => {
      if (log.type === 'IN') {
        lastIn = log.timestamp;
      } else if (log.type === 'OUT' && lastIn) {
        totalMs += log.timestamp.getTime() - lastIn.getTime();
        lastIn = null;
      }
    });
    
    // Add time from last IN to now if currently checked in
    if (lastIn && isCheckedIn) {
      totalMs += new Date().getTime() - lastIn.getTime();
    }
    
    const hours = Math.floor(totalMs / (1000 * 60 * 60));
    const minutes = Math.floor((totalMs % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="min-h-screen bg-[var(--background)] !text-[#0f172a] selection:bg-[#fd9a00]/30 overflow-x-hidden">
      <GridBackground spacing={60} />
      <Header />

      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-12 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-700 text-[10px] font-black tracking-widest uppercase shadow-sm">
                Workforce v2.0
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[#064e3b] text-[10px] font-black tracking-widest uppercase shadow-sm">
                <Activity className="w-3 h-3" /> Live Tracking
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2 !text-[#0f172a]">Time & <span className="text-[#fd9a00]">Attendance</span></h1>
            <p className="text-[#334155] font-bold">Real-time workforce management and logging system.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Main Time Control Panel */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-10 rounded-[48px] border border-slate-200 bg-white shadow-xl relative overflow-hidden flex flex-col items-center text-center">
              {/* Pulsing background effect when checked in */}
              <AnimatePresence>
                {isCheckedIn && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-emerald-50 opacity-50 z-0 pointer-events-none"
                  />
                )}
              </AnimatePresence>
              
              <div className="relative z-10 w-full">
                <div className="text-[#64748b] font-black uppercase tracking-widest text-sm mb-4">Current Time</div>
                <div className="text-6xl md:text-8xl font-black tracking-tight text-[#0f172a] mb-2 font-mono">
                  {formatTime(currentTime)}
                </div>
                <div className="text-[#64748b] font-bold text-lg mb-12">
                  {currentTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  <button
                    onClick={() => handleTimeAction('IN')}
                    disabled={isProcessing || isCheckedIn}
                    className={`relative w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-5 rounded-3xl font-black text-sm tracking-widest uppercase shadow-xl transition-all duration-300
                      ${isCheckedIn 
                        ? 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none' 
                        : 'bg-[#0f172a] text-white hover:scale-105 active:scale-95 shadow-[#0f172a]/20'
                      }`}
                  >
                    <LogIn className={`w-5 h-5 ${isProcessing && !isCheckedIn ? 'animate-pulse' : ''}`} />
                    Time In
                  </button>
                  
                  <button
                    onClick={() => handleTimeAction('OUT')}
                    disabled={isProcessing || !isCheckedIn}
                    className={`relative w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-5 rounded-3xl font-black text-sm tracking-widest uppercase shadow-xl transition-all duration-300
                      ${!isCheckedIn 
                        ? 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none' 
                        : 'bg-[#fd9a00] text-white hover:scale-105 active:scale-95 shadow-[#fd9a00]/20'
                      }`}
                  >
                    <LogOut className={`w-5 h-5 ${isProcessing && isCheckedIn ? 'animate-pulse' : ''}`} />
                    Time Out
                  </button>
                </div>
                
                <div className="mt-8 flex items-center justify-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${isCheckedIn ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`}></div>
                  <span className="text-xs font-black uppercase tracking-widest text-[#64748b]">
                    Status: <span className={isCheckedIn ? 'text-emerald-600' : 'text-slate-500'}>{isCheckedIn ? 'Active / Working' : 'Inactive / Away'}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-6">
              <div className="p-8 rounded-[32px] border border-slate-200 bg-white shadow-xl flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Timer className="w-8 h-8" />
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-[#64748b] mb-1">Total Hours</div>
                  <div className="text-3xl font-black text-[#0f172a]">{calculateHours()}</div>
                </div>
              </div>
              <div className="p-8 rounded-[32px] border border-slate-200 bg-white shadow-xl flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <Coffee className="w-8 h-8" />
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-[#64748b] mb-1">Breaks</div>
                  <div className="text-3xl font-black text-[#0f172a]">0h 0m</div>
                </div>
              </div>
            </div>
          </div>

          {/* Logs Panel */}
          <div className="lg:col-span-5 p-8 rounded-[40px] border border-slate-200 bg-white shadow-xl flex flex-col max-h-[600px]">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-black tracking-tight text-[#0f172a] flex items-center gap-2">
                <Calendar className="w-6 h-6 text-[#fd9a00]" /> Today's Log
              </h3>
              <span className="text-[10px] font-black bg-slate-100 text-slate-500 px-3 py-1 rounded-full uppercase tracking-widest">
                {logs.length} Entries
              </span>
            </div>
            
            <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
              <AnimatePresence>
                {logs.length === 0 ? (
                  <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="h-full flex flex-col items-center justify-center text-slate-400"
                  >
                    <Clock className="w-12 h-12 mb-4 opacity-20" />
                    <p className="font-bold">No logs yet for today.</p>
                  </motion.div>
                ) : (
                  [...logs].reverse().map((log) => (
                    <motion.div
                      key={log.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-5 rounded-2xl border border-slate-100 bg-slate-50 flex items-center justify-between group hover:border-slate-200 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${log.type === 'IN' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
                          {log.type === 'IN' ? <LogIn className="w-5 h-5" /> : <LogOut className="w-5 h-5" />}
                        </div>
                        <div>
                          <div className="font-black text-[#0f172a]">Time {log.type === 'IN' ? 'In' : 'Out'}</div>
                          <div className="text-xs font-bold text-[#64748b]">Recorded successfully</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-black text-[#0f172a] font-mono">{formatTime(log.timestamp)}</div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-[#64748b] mt-1 flex items-center gap-1 justify-end">
                          <CheckCircle2 className="w-3 h-3 text-emerald-500" /> Synced
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
};

export default AttendanceDemo;
