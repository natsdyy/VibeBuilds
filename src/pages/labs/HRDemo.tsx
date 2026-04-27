import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, DollarSign, Calendar as CalendarIcon, Briefcase, 
  TrendingUp, TrendingDown, AlertCircle, FileText, Download,
  BrainCircuit, ChevronRight, CheckCircle2, Search, ArrowLeft,
  Building, CreditCard, MoreVertical, Square, CheckSquare, Ban, PlayCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import GridBackground from '../../components/animations/GridBackground';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';

// Mock Data
const payrollHistory = [
  { month: 'Jan', cost: 1250000 },
  { month: 'Feb', cost: 1280000 },
  { month: 'Mar', cost: 1295000 },
  { month: 'Apr', cost: 1350000 }, // Overtime spike
  { month: 'May', cost: 1310000 },
  { month: 'Jun', cost: 1330000 },
];

const initialEmployees = [
  { id: 'EMP-001', name: 'Sarah Jenkins', role: 'Lead Developer', dept: 'Engineering', base: 120000, ot: 15000, ded: 8000, status: 'Paid' },
  { id: 'EMP-002', name: 'Marcus Chen', role: 'UX Designer', dept: 'Design', base: 95000, ot: 0, ded: 6500, status: 'Paid' },
  { id: 'EMP-003', name: 'Elena Rodriguez', role: 'Product Manager', dept: 'Product', base: 140000, ot: 0, ded: 10000, status: 'Pending' },
  { id: 'EMP-004', name: 'David Kim', role: 'Backend Dev', dept: 'Engineering', base: 110000, ot: 25000, ded: 7500, status: 'Pending' },
];

const initialLeaves = [
  { id: 'LV-001', empId: 'EMP-003', name: 'Elena Rodriguez', type: 'Vacation', start: 'May 15, 2026', end: 'May 20, 2026', days: 5, status: 'Pending' },
  { id: 'LV-002', empId: 'EMP-004', name: 'David Kim', type: 'Sick Leave', start: 'May 10, 2026', end: 'May 11, 2026', days: 2, status: 'Approved' },
  { id: 'LV-003', empId: 'EMP-005', name: 'Rachel Foster', type: 'Vacation', start: 'Jun 01, 2026', end: 'Jun 05, 2026', days: 5, status: 'Pending' },
  { id: 'LV-004', empId: 'EMP-001', name: 'Sarah Jenkins', type: 'Maternity', start: 'Jul 01, 2026', end: 'Oct 01, 2026', days: 90, status: 'Approved' },
];

const HRDemo: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'payroll' | 'leave'>('dashboard');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSlip, setShowSlip] = useState<typeof initialEmployees[0] | null>(null);
  const [empData, setEmpData] = useState(initialEmployees);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [actionMenuOpen, setActionMenuOpen] = useState<string | null>(null);
  const [leaves, setLeaves] = useState(initialLeaves);

  const filteredEmployees = empData.filter(emp => 
    emp.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    emp.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pendingIds = filteredEmployees.filter(e => e.status !== 'Paid' && e.status !== 'Cancelled').map(e => e.id);
  const allSelected = pendingIds.length > 0 && pendingIds.every(id => selectedIds.includes(id));

  const toggleAll = () => {
    if (allSelected) setSelectedIds([]);
    else setSelectedIds(pendingIds);
  };

  const toggleEmployee = (id: string, status: string) => {
    if (status === 'Paid' || status === 'Cancelled') return;
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const runPayroll = () => {
    if (selectedIds.length === 0) {
      toast.error('Please select at least one employee.');
      return;
    }
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setEmpData(prev => prev.map(emp => selectedIds.includes(emp.id) ? { ...emp, status: 'Paid' } : emp));
      setSelectedIds([]);
      toast.success(`Payroll processed for ${selectedIds.length} employees!`);
    }, 2000);
  };

  const addBonus = (id: string) => {
    setEmpData(prev => prev.map(emp => {
      if (emp.id === id) {
        return { ...emp, ot: emp.ot + 5000 };
      }
      return emp;
    }));
    setActionMenuOpen(null);
    toast.success('₱5,000 bonus applied!');
  };

  const cancelPay = (id: string) => {
    setEmpData(prev => prev.map(emp => emp.id === id ? { ...emp, status: 'Cancelled' } : emp));
    setSelectedIds(prev => prev.filter(i => i !== id));
    setActionMenuOpen(null);
    toast.error('Payment cancelled for employee');
  };

  const payNow = (id: string) => {
    setEmpData(prev => prev.map(emp => emp.id === id ? { ...emp, status: 'Paid' } : emp));
    setSelectedIds(prev => prev.filter(i => i !== id));
    setActionMenuOpen(null);
    toast.success('Payment processed instantly');
  };

  const approveLeave = (id: string) => {
    setLeaves(prev => prev.map(l => l.id === id ? { ...l, status: 'Approved' } : l));
    toast.success('Leave request approved');
  };

  const rejectLeave = (id: string) => {
    setLeaves(prev => prev.map(l => l.id === id ? { ...l, status: 'Rejected' } : l));
    toast.error('Leave request rejected');
  };

  const getNetPay = (emp: typeof initialEmployees[0]) => emp.base + emp.ot - emp.ded;

  return (
    <div className="min-h-screen bg-[var(--background)] !text-[#0f172a] selection:bg-[#fd9a00]/30 font-sans pb-20">
      <GridBackground spacing={60} />
      
      {/* Top Navigation */}
      <header className="relative z-10 flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-xl border-b border-slate-200 sticky top-0">
        <div className="flex items-center gap-4">
          <Link to="/labs" className="p-2 rounded-xl hover:bg-slate-100 text-slate-500 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
              <Building className="w-4 h-4" />
            </div>
            <h1 className="text-xl font-black tracking-tight">Vibe<span className="text-emerald-600">HR</span></h1>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-xs font-black uppercase tracking-widest text-slate-500 hidden md:block">
            {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </div>
          <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center font-black text-emerald-700 border-2 border-white shadow-sm">
            HR
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 pt-8 relative z-10">
        
        {/* Navigation Tabs */}
        <div className="flex gap-2 p-1.5 bg-white border border-slate-200 rounded-2xl w-fit mb-8 shadow-sm">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: <TrendingUp className="w-4 h-4" /> },
            { id: 'payroll', label: 'Payroll', icon: <CreditCard className="w-4 h-4" /> },
            { id: 'leave', label: 'Time & Leave', icon: <CalendarIcon className="w-4 h-4" /> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-2.5 rounded-xl text-sm font-black tracking-widest uppercase flex items-center gap-2 transition-all ${
                activeTab === tab.id 
                  ? 'bg-[#0f172a] text-white shadow-lg shadow-slate-900/10' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dashboard View */}
        {activeTab === 'dashboard' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Total Employees', value: '142', trend: '+4 this month', icon: <Users className="text-blue-600" />, bg: 'bg-blue-50' },
                { label: 'Monthly Payroll', value: '₱1.33M', trend: '-1.5% vs last', icon: <DollarSign className="text-emerald-600" />, bg: 'bg-emerald-50' },
                { label: 'Pending Leaves', value: '12', trend: 'Needs approval', icon: <CalendarIcon className="text-amber-600" />, bg: 'bg-amber-50' },
                { label: 'Open Positions', value: '5', trend: 'Active hiring', icon: <Briefcase className="text-purple-600" />, bg: 'bg-purple-50' }
              ].map((kpi, i) => (
                <div key={i} className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-xl transition-all">
                  <div className="flex justify-between items-start mb-6">
                    <div className={`w-12 h-12 rounded-2xl ${kpi.bg} flex items-center justify-center`}>
                      {kpi.icon}
                    </div>
                    <span className="text-[10px] font-black tracking-widest uppercase text-slate-400">{kpi.trend}</span>
                  </div>
                  <div>
                    <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-500 mb-1">{kpi.label}</h3>
                    <p className="text-3xl font-black text-[#0f172a] tracking-tight">{kpi.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Chart */}
              <div className="lg:col-span-2 p-8 bg-white rounded-[40px] border border-slate-200 shadow-sm">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-xl font-black tracking-tight text-[#0f172a]">Payroll Cost Trend</h3>
                  <div className="text-[10px] font-black uppercase tracking-widest bg-slate-100 text-slate-600 px-3 py-1.5 rounded-full">YTD 2026</div>
                </div>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={payrollHistory}>
                      <defs>
                        <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                      <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12, fontWeight: 700 }} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12, fontWeight: 700 }} tickFormatter={(value) => `₱${value/1000}k`} />
                      <Tooltip 
                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                        formatter={(value: number) => [`₱${value.toLocaleString()}`, 'Cost']}
                      />
                      <Area type="monotone" dataKey="cost" stroke="#10b981" strokeWidth={4} fillOpacity={1} fill="url(#colorCost)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* DSS Module */}
              <div className="p-8 bg-gradient-to-br from-[#0f172a] to-slate-800 rounded-[40px] shadow-2xl text-white relative overflow-hidden flex flex-col">
                <BrainCircuit className="absolute -right-8 -top-8 w-40 h-40 text-white/5 rotate-12 pointer-events-none" />
                <div className="flex items-center gap-2 mb-8">
                  <div className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-black tracking-widest uppercase flex items-center gap-2 border border-emerald-500/30">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
                    HR DSS Active
                  </div>
                </div>
                <h3 className="text-2xl font-black tracking-tight mb-2">AI Insights</h3>
                <p className="text-slate-400 font-bold text-sm mb-8">Decision support analysis based on current workforce data.</p>
                
                <div className="space-y-4 flex-1">
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors cursor-default">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-black text-sm text-white mb-1">High Overtime in Engineering</h4>
                        <p className="text-xs text-slate-300 leading-relaxed font-medium">Overtime costs for backend developers increased by 40% in April. <span className="text-emerald-400 font-bold">Recommendation:</span> Hire 1 additional mid-level dev to reduce OT spend and prevent burnout.</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors cursor-default">
                    <div className="flex items-start gap-3">
                      <TrendingUp className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-black text-sm text-white mb-1">Leave Liability Alert</h4>
                        <p className="text-xs text-slate-300 leading-relaxed font-medium">15 employees have &gt;20 accrued vacation days. Encourage Q3 time-off to reduce year-end liability payouts.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        )}

        {/* Payroll View */}
        {activeTab === 'payroll' && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-white rounded-3xl border border-slate-200 shadow-sm">
              <div>
                <h2 className="text-xl font-black tracking-tight text-[#0f172a]">Payroll Run: May 2026</h2>
                <p className="text-sm font-bold text-slate-500">Processing period: May 1 - May 31</p>
              </div>
              <div className="flex gap-4">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Search employee..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:ring-2 focus:ring-emerald-500 w-full md:w-64" 
                  />
                </div>
                <button 
                  onClick={runPayroll}
                  disabled={isProcessing}
                  className="px-6 py-3 bg-emerald-600 text-white rounded-xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-emerald-700 transition-colors min-w-[160px]"
                >
                  {isProcessing ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <><DollarSign className="w-4 h-4"/> Run Payroll</>}
                </button>
              </div>
            </div>

            <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="p-6 w-12">
                        <button onClick={toggleAll} disabled={pendingIds.length === 0} className="text-slate-400 hover:text-indigo-600 transition-colors disabled:opacity-30">
                          {allSelected ? <CheckSquare className="w-5 h-5 text-indigo-600" /> : <Square className="w-5 h-5" />}
                        </button>
                      </th>
                      <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Employee</th>
                      <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Base Salary</th>
                      <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Overtime</th>
                      <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Deductions</th>
                      <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Net Pay</th>
                      <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
                      <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEmployees.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="p-8 text-center text-slate-500 font-bold">No employees found.</td>
                      </tr>
                    ) : (
                      filteredEmployees.map((emp) => {
                        const isSelected = selectedIds.includes(emp.id);
                        const isPayable = emp.status === 'Pending';
                        return (
                        <tr key={emp.id} className={`border-b border-slate-100 transition-colors ${isSelected ? 'bg-indigo-50/30' : 'hover:bg-slate-50/50'}`}>
                        <td className="p-6 w-12">
                          <button 
                            onClick={() => toggleEmployee(emp.id, emp.status)} 
                            disabled={!isPayable}
                            className={`transition-colors ${!isPayable ? 'opacity-30 cursor-not-allowed text-slate-300' : 'text-slate-400 hover:text-indigo-600'}`}
                          >
                            {isSelected ? <CheckSquare className="w-5 h-5 text-indigo-600" /> : <Square className="w-5 h-5" />}
                          </button>
                        </td>
                        <td className="p-6">
                          <div className="font-black text-[#0f172a]">{emp.name}</div>
                          <div className="text-xs font-bold text-slate-500">{emp.role}</div>
                        </td>
                        <td className="p-6 font-bold text-slate-600">₱{emp.base.toLocaleString()}</td>
                        <td className="p-6 font-bold text-slate-600">₱{emp.ot.toLocaleString()}</td>
                        <td className="p-6 font-bold text-red-500">-₱{emp.ded.toLocaleString()}</td>
                        <td className="p-6 font-black text-emerald-600 text-lg">₱{getNetPay(emp).toLocaleString()}</td>
                        <td className="p-6">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex w-fit items-center gap-1 ${
                            emp.status === 'Paid' ? 'bg-emerald-100 text-emerald-700' : 
                            emp.status === 'Cancelled' ? 'bg-red-100 text-red-700' :
                            'bg-amber-100 text-amber-700'
                          }`}>
                            {emp.status === 'Paid' && <CheckCircle2 className="w-3 h-3" />}
                            {emp.status === 'Cancelled' && <Ban className="w-3 h-3" />}
                            {emp.status}
                          </span>
                        </td>
                        <td className="p-6 text-right relative">
                          <button 
                            onClick={() => setActionMenuOpen(actionMenuOpen === emp.id ? null : emp.id)}
                            className="p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 rounded-lg transition-colors inline-flex items-center"
                          >
                            <MoreVertical className="w-5 h-5" />
                          </button>

                          <AnimatePresence>
                            {actionMenuOpen === emp.id && (
                              <motion.div 
                                initial={{ opacity: 0, scale: 0.95, transformOrigin: 'top right' }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="absolute right-6 top-16 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 z-20 py-2 flex flex-col text-left overflow-hidden"
                              >
                                <button onClick={() => { setShowSlip(emp); setActionMenuOpen(null); }} className="px-4 py-2 hover:bg-slate-50 font-bold text-sm text-slate-600 flex items-center gap-2">
                                  <FileText className="w-4 h-4 text-indigo-500" /> View Payslip
                                </button>
                                {emp.status === 'Pending' && (
                                  <>
                                    <button onClick={() => addBonus(emp.id)} className="px-4 py-2 hover:bg-slate-50 font-bold text-sm text-slate-600 flex items-center gap-2">
                                      <DollarSign className="w-4 h-4 text-emerald-500" /> Add ₱5k Bonus
                                    </button>
                                    <button onClick={() => payNow(emp.id)} className="px-4 py-2 hover:bg-emerald-50 font-bold text-sm text-emerald-600 flex items-center gap-2">
                                      <PlayCircle className="w-4 h-4" /> Pay Instantly
                                    </button>
                                    <div className="h-px bg-slate-100 my-1"></div>
                                    <button onClick={() => cancelPay(emp.id)} className="px-4 py-2 hover:bg-red-50 font-bold text-sm text-red-600 flex items-center gap-2">
                                      <Ban className="w-4 h-4" /> Cancel Payment
                                    </button>
                                  </>
                                )}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </td>
                      </tr>
                    );
                  })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* Leave View */}
        {activeTab === 'leave' && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-white rounded-3xl border border-slate-200 shadow-sm">
              <div>
                <h2 className="text-xl font-black tracking-tight text-[#0f172a]">Leave Requests</h2>
                <p className="text-sm font-bold text-slate-500">Manage employee time-off and absences</p>
              </div>
            </div>

            <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Employee</th>
                      <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Leave Type</th>
                      <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Duration</th>
                      <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Days</th>
                      <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
                      <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaves.map((leave) => (
                      <tr key={leave.id} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                        <td className="p-6">
                          <div className="font-black text-[#0f172a]">{leave.name}</div>
                          <div className="text-xs font-bold text-slate-500">{leave.empId}</div>
                        </td>
                        <td className="p-6 font-bold text-slate-600">{leave.type}</td>
                        <td className="p-6">
                          <div className="font-bold text-slate-600">{leave.start}</div>
                          <div className="text-xs font-bold text-slate-400">to {leave.end}</div>
                        </td>
                        <td className="p-6 font-black text-[#0f172a]">{leave.days}</td>
                        <td className="p-6">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex w-fit items-center gap-1 ${
                            leave.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' : 
                            leave.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                            'bg-amber-100 text-amber-700'
                          }`}>
                            {leave.status === 'Approved' && <CheckCircle2 className="w-3 h-3" />}
                            {leave.status === 'Rejected' && <Ban className="w-3 h-3" />}
                            {leave.status}
                          </span>
                        </td>
                        <td className="p-6 text-right space-x-2">
                          <button 
                            onClick={() => approveLeave(leave.id)}
                            disabled={leave.status !== 'Pending'}
                            className="p-2 text-slate-400 hover:bg-emerald-50 hover:text-emerald-600 rounded-lg transition-colors inline-flex items-center disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-slate-400"
                            title="Approve"
                          >
                            <CheckCircle2 className="w-5 h-5" />
                          </button>
                          <button 
                            onClick={() => rejectLeave(leave.id)}
                            disabled={leave.status !== 'Pending'}
                            className="p-2 text-slate-400 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors inline-flex items-center disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-slate-400"
                            title="Reject"
                          >
                            <Ban className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

      </main>

      {/* Payslip Modal Overlay */}
      <AnimatePresence>
        {showSlip && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setShowSlip(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-md rounded-[32px] shadow-2xl overflow-hidden flex flex-col"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-8 border-b border-slate-100 bg-slate-50 flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-black tracking-tight text-[#0f172a]">Payslip</h3>
                  <p className="text-sm font-bold text-slate-500">May 2026</p>
                </div>
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center">
                  <Building className="w-6 h-6" />
                </div>
              </div>
              
              <div className="p-8 space-y-6">
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Employee Details</div>
                  <div className="font-black text-lg text-[#0f172a]">{showSlip.name}</div>
                  <div className="text-sm font-bold text-slate-500">{showSlip.role} • {showSlip.id}</div>
                </div>

                <div className="space-y-3">
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-100 pb-2">Earnings</div>
                  <div className="flex justify-between text-sm font-bold text-slate-700">
                    <span>Base Salary</span>
                    <span>₱{showSlip.base.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-slate-700">
                    <span>Overtime Pay</span>
                    <span>₱{showSlip.ot.toLocaleString()}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-100 pb-2">Deductions</div>
                  <div className="flex justify-between text-sm font-bold text-red-500">
                    <span>Taxes & Benefits</span>
                    <span>-₱{showSlip.ded.toLocaleString()}</span>
                  </div>
                </div>

                <div className="bg-emerald-50 rounded-2xl p-6 flex justify-between items-center border border-emerald-100">
                  <span className="text-sm font-black uppercase tracking-widest text-emerald-800">Net Pay</span>
                  <span className="text-3xl font-black text-emerald-600">₱{getNetPay(showSlip).toLocaleString()}</span>
                </div>

                <button className="w-full py-4 bg-[#0f172a] text-white font-black uppercase tracking-widest text-xs rounded-xl flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20">
                  <Download className="w-4 h-4" /> Download PDF
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HRDemo;
