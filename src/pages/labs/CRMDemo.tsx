import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, Mail, Database, Search, Filter, 
  MoreVertical, CheckCircle2, Clock, XCircle, 
  ArrowRight, Laptop, Bot, Smartphone, Palette, 
  Gamepad2, MessageSquare, Briefcase, TrendingUp, Zap
} from 'lucide-react';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import GridBackground from '../../components/animations/GridBackground';

// Mock Lead Data
const initialLeads = [
  { 
    id: 1, 
    name: 'Alex Rivera', 
    email: 'alex@startup.io', 
    type: 'Web Application', 
    budget: '₱150k - ₱500k', 
    status: 'New', 
    date: '2026-04-23',
    vision: 'A high-performance real estate portal with real-time bidding.'
  },
  { 
    id: 2, 
    name: 'Maria Santos', 
    email: 'm.santos@enterprise.ph', 
    type: 'Custom System', 
    budget: '₱500k+', 
    status: 'Contacted', 
    date: '2026-04-22',
    vision: 'Inventory management system for a multi-branch warehouse.'
  },
  { 
    id: 3, 
    name: 'John Doe', 
    email: 'johndoe@thesis.edu', 
    type: 'Bot Development', 
    budget: 'Student Rate', 
    status: 'Negotiating', 
    date: '2026-04-21',
    vision: 'Telegram bot for automated library room booking.'
  },
  { 
    id: 4, 
    name: 'Sarah Chen', 
    email: 'sarah@gamepulse.com', 
    type: 'Game Development', 
    budget: '₱145k - ₱500k', 
    status: 'Signed', 
    date: '2026-04-20',
    vision: 'Hyper-casual mobile game for brand engagement.'
  },
  { 
    id: 5, 
    name: 'David Wilson', 
    email: 'david@pixel.studio', 
    type: 'UI/UX Design', 
    budget: '₱20k - ₱145k', 
    status: 'Lost', 
    date: '2026-04-19',
    vision: 'Rebranding and mobile app redesign for a fitness studio.'
  }
];

const statusColors: Record<string, string> = {
  'New': 'bg-blue-100 text-blue-900 border-blue-200',
  'Contacted': 'bg-purple-100 text-purple-900 border-purple-200',
  'Negotiating': 'bg-amber-100 text-amber-900 border-amber-200',
  'Signed': 'bg-emerald-100 text-emerald-900 border-emerald-200',
  'Lost': 'bg-red-100 text-red-900 border-red-200',
};

const typeIcons: Record<string, any> = {
  'Web Application': <Laptop className="w-4 h-4" />,
  'Custom System': <Database className="w-4 h-4" />,
  'Bot Development': <Bot className="w-4 h-4" />,
  'Game Development': <Gamepad2 className="w-4 h-4" />,
  'Mobile App': <Smartphone className="w-4 h-4" />,
  'UI/UX Design': <Palette className="w-4 h-4" />,
};

const CRMDemo: React.FC = () => {
  const [leads] = useState(initialLeads);
  const [selectedLead, setSelectedLead] = useState<typeof initialLeads[0] | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLeads = leads.filter(lead => 
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    lead.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[var(--background)] text-[#0f172a] selection:bg-[#fd9a00]/30 overflow-x-hidden">
      <GridBackground spacing={60} />
      <Header />

      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto relative z-10">
        {/* CRM Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-12 gap-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fd9a00]/10 border border-[#fd9a00]/30 text-[#451a03] text-[10px] font-black tracking-widest uppercase mb-4 shadow-sm">
              VibeBuilds Pipeline
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2 text-[#0f172a]">Lead <span className="text-[#fd9a00]">Management</span></h1>
            <p className="text-[#334155] font-bold">Tracking the vision of every potential partner.</p>
          </div>

          <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-2xl border border-slate-200 w-full lg:w-96 shadow-sm">
            <Search className="w-5 h-5 text-slate-400 ml-2" />
            <input 
              type="text" 
              placeholder="Search leads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent border-none focus:outline-none text-sm w-full font-bold placeholder:text-slate-300 text-[#0f172a]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Lead Table */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center justify-between px-6 py-4 bg-slate-50 rounded-2xl border border-slate-200 shadow-sm">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#64748b]">Active Leads ({filteredLeads.length})</span>
            </div>

            <div className="space-y-3">
              <AnimatePresence mode="popLayout">
                {filteredLeads.map((lead) => (
                  <motion.div
                    key={lead.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    onClick={() => setSelectedLead(lead)}
                    className={`p-6 rounded-[32px] border transition-all cursor-pointer group shadow-lg ${
                      selectedLead?.id === lead.id 
                        ? 'border-[#fd9a00] bg-amber-50 shadow-amber-500/10' 
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-[#0f172a] font-black border border-slate-200">
                          {lead.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <h3 className="font-black tracking-tight text-[#0f172a]">{lead.name}</h3>
                          <p className="text-xs text-[#64748b] font-bold">{lead.email}</p>
                        </div>
                      </div>

                      <div className="hidden md:flex items-center gap-8">
                        <div className="flex items-center gap-2 px-4 py-1.5 rounded-xl bg-slate-50 border border-slate-100 text-[#475569]">
                          {typeIcons[lead.type]}
                          <span className="text-[10px] font-black uppercase tracking-widest">{lead.type}</span>
                        </div>
                        <div className={`px-4 py-1.5 rounded-xl border text-[10px] font-black uppercase tracking-widest ${statusColors[lead.status]}`}>
                          {lead.status}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Lead Detail Sidebar */}
          <div className="lg:col-span-4">
            <AnimatePresence mode="wait">
              {selectedLead ? (
                <motion.div
                  key={selectedLead.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="p-8 rounded-[40px] border border-slate-200 bg-white sticky top-32 shadow-2xl"
                >
                  <div className="flex justify-between items-start mb-8">
                    <div className="w-16 h-16 rounded-3xl bg-[#fd9a00] flex items-center justify-center text-white text-2xl font-black shadow-xl shadow-amber-500/30">
                      {selectedLead.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <button onClick={() => setSelectedLead(null)} className="p-2 rounded-full bg-slate-100 hover:bg-slate-200">
                      <XCircle className="w-5 h-5 text-[#475569]" />
                    </button>
                  </div>

                  <h2 className="text-3xl font-black tracking-tight mb-2 text-[#0f172a]">{selectedLead.name}</h2>
                  <p className="text-[#64748b] font-bold mb-8 flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4" /> {selectedLead.email}
                  </p>

                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                        <p className="text-[8px] font-black text-[#64748b] uppercase tracking-widest mb-1">Project Type</p>
                        <p className="text-xs font-black uppercase tracking-tight text-[#0f172a]">{selectedLead.type}</p>
                      </div>
                      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                        <p className="text-[8px] font-black text-[#64748b] uppercase tracking-widest mb-1">Budget</p>
                        <p className="text-xs font-black uppercase tracking-tight text-[#0f172a]">{selectedLead.budget}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-[10px] font-black text-[#64748b] uppercase tracking-widest mb-3 flex items-center gap-2">
                        <Zap className="w-3 h-3 text-[#fd9a00]" /> The Vision
                      </h4>
                      <p className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-bold leading-relaxed italic text-[#334155]">
                        "{selectedLead.vision}"
                      </p>
                    </div>

                    <div className="space-y-3 pt-4">
                      <button className="w-full py-4 rounded-2xl bg-[#fd9a00] text-white font-black text-xs tracking-widest uppercase shadow-xl shadow-amber-500/30 flex items-center justify-center gap-3 hover:opacity-90 transition-all">
                        <MessageSquare className="w-4 h-4" /> Contact Lead
                      </button>
                      <button className="w-full py-4 rounded-2xl bg-slate-50 border border-slate-200 text-[#0f172a] font-black text-xs tracking-widest uppercase flex items-center justify-center gap-3 hover:bg-slate-100 transition-all">
                        <Briefcase className="w-4 h-4" /> Create Project
                      </button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="h-full min-h-[400px] rounded-[40px] border-2 border-slate-200 border-dashed flex flex-col items-center justify-center text-center p-12 text-slate-300">
                  <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center mb-6 border border-slate-100">
                    <Users className="w-10 h-10 opacity-20" />
                  </div>
                  <h3 className="text-xl font-black mb-2 text-slate-400">Select a Lead</h3>
                  <p className="text-sm font-medium">Click on a lead to view their vision.</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CRMDemo;
