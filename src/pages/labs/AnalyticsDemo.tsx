import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell, PieChart, Pie, Legend
} from 'recharts';
import { 
  TrendingUp, Users, Target, Zap, ArrowUpRight, Filter, Download, 
  Calendar, Tag, Clock, AlertCircle, Percent, BrainCircuit, Play,
  RefreshCw, Sparkles, TrendingDown, HelpCircle
} from 'lucide-react';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import GridBackground from '../../components/animations/GridBackground';

// Mock Data
const initialRevenueData = [
  { date: 'Jan', revenue: 45000 },
  { date: 'Feb', revenue: 52000 },
  { date: 'Mar', revenue: 48000 },
  { date: 'Apr', revenue: 61000 },
  { date: 'May', revenue: 55000 },
  { date: 'Jun', revenue: 72000 },
  { date: 'Jul', revenue: 85000 },
];

const serviceDistribution = [
  { name: 'Web Apps', value: 35, color: '#fd9a00' },
  { name: 'Bot Dev', value: 25, color: '#3b82f6' },
  { name: 'Game Dev', value: 20, color: '#8b5cf6' },
  { name: 'Systems', value: 20, color: '#10b981' },
];

const AnalyticsDemo: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [revenueData, setRevenueData] = useState(initialRevenueData);
  const [dssVariables, setDssVariables] = useState({ budget: 50, discount: 10 });
  const [aiInsight, setAiInsight] = useState("Market is stable. Ready for Q4 scaling.");

  const runDSS = () => {
    setIsAnalyzing(true);
    // Simulate complex calculation
    setTimeout(() => {
      const multiplier = 1 + (dssVariables.budget / 100) - (dssVariables.discount / 200);
      const newData = initialRevenueData.map(d => ({
        ...d,
        revenue: Math.round(d.revenue * (0.9 + Math.random() * 0.2) * multiplier)
      }));
      setRevenueData(newData);
      
      const insights = [
        "Budget increase detected. Forecasting 15% higher conversion in Q3.",
        "Optimum discount threshold found at 12%. Avoid higher cuts.",
        "High demand for Bot Dev. Consider reallocating resources.",
        "Seasonal peak incoming. Suggest 20% budget boost for August."
      ];
      setAiInsight(insights[Math.floor(Math.random() * insights.length)]);
      setIsAnalyzing(false);
    }, 2000);
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
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-[#451a03] text-[10px] font-black tracking-widest uppercase shadow-sm">
                Enterprise DSS v3.0
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[#064e3b] text-[10px] font-black tracking-widest uppercase shadow-sm">
                <BrainCircuit className="w-3 h-3" /> Predictive Active
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2 !text-[#0f172a]">Sales <span className="text-[#fd9a00]">Intelligence</span></h1>
            <p className="text-[#334155] font-bold">Intelligent Decision Support System for VibeBuilds Partners.</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-4">
            <button 
              onClick={runDSS}
              disabled={isAnalyzing}
              className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-[#0f172a] text-white font-black text-[10px] tracking-widest uppercase shadow-2xl hover:scale-105 transition-all active:scale-95 disabled:opacity-50"
            >
              {isAnalyzing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4 fill-current" />}
              {isAnalyzing ? 'Analyzing Data...' : 'Run DSS Analysis'}
            </button>
          </div>
        </div>

        {/* DSS Control Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          <div className="lg:col-span-4 space-y-6">
            <div className="p-8 rounded-[40px] border border-slate-200 bg-white shadow-xl">
              <h3 className="text-lg font-black tracking-tight mb-8 text-[#0f172a] flex items-center gap-2">
                <Filter className="w-5 h-5 text-amber-500" /> Variables
              </h3>
              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#64748b]">Monthly Budget</label>
                    <span className="text-xs font-black text-amber-600">₱{dssVariables.budget}k</span>
                  </div>
                  <input 
                    type="range" min="10" max="500" 
                    value={dssVariables.budget}
                    onChange={(e) => setDssVariables({...dssVariables, budget: Number(e.target.value)})}
                    className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-amber-500"
                  />
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#64748b]">Discount Depth</label>
                    <span className="text-xs font-black text-amber-600">{dssVariables.discount}%</span>
                  </div>
                  <input 
                    type="range" min="0" max="50" 
                    value={dssVariables.discount}
                    onChange={(e) => setDssVariables({...dssVariables, discount: Number(e.target.value)})}
                    className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-amber-500"
                  />
                </div>
              </div>
            </div>

            <div className="p-8 rounded-[40px] border border-amber-500/30 bg-amber-500/5 shadow-xl relative overflow-hidden">
              <Sparkles className="absolute -right-4 -top-4 w-24 h-24 text-amber-500/10 rotate-12" />
              <h3 className="text-lg font-black tracking-tight mb-4 text-[#0f172a] flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-600" /> AI Insight
              </h3>
              <p className="text-sm font-bold text-[#451a03] leading-relaxed relative z-10">
                "{aiInsight}"
              </p>
            </div>
          </div>

          <div className="lg:col-span-8 p-10 rounded-[48px] border border-slate-200 bg-white shadow-xl">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-2xl font-black tracking-tight text-[#0f172a]">Impact Forecast</h2>
              <div className="flex items-center gap-2 text-xs font-black text-emerald-600">
                <TrendingUp className="w-4 h-4" /> +14.2% Est. Growth
              </div>
            </div>
            <div className="h-[320px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#fd9a00" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#fd9a00" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#475569', fontSize: 10, fontWeight: 900 }} dy={15} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#475569', fontSize: 10, fontWeight: 900 }} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 20px 50px rgba(0,0,0,0.1)', padding: '16px' }}
                    labelStyle={{ fontWeight: 900, marginBottom: '8px', color: '#64748b' }}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#fd9a00" strokeWidth={4} fillOpacity={1} fill="url(#colorRev)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'Forecasted ROI', value: `${(dssVariables.budget * 2.4).toFixed(0)}%`, trend: '+2.4%', icon: <TrendingUp className="text-emerald-700" /> },
            { label: 'Lead Velocity', value: '1.4/day', trend: '+0.2', icon: <Users className="text-blue-700" /> },
            { label: 'Market Reach', value: '84k', trend: '+12k', icon: <Target className="text-[#fd9a00]" /> },
            { label: 'Risk Factor', value: 'Low', trend: 'Stable', icon: <AlertCircle className="text-purple-700" /> },
          ].map((stat, i) => (
            <div key={i} className="p-8 rounded-[32px] border border-slate-200 bg-white shadow-xl">
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100">{stat.icon}</div>
                <span className="text-[10px] font-black tracking-widest text-[#475569] uppercase">{stat.trend}</span>
              </div>
              <p className="text-[10px] font-black text-[#64748b] uppercase tracking-widest mb-1">{stat.label}</p>
              <h3 className="text-3xl font-black tracking-tight text-[#0f172a]">{stat.value}</h3>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AnalyticsDemo;
