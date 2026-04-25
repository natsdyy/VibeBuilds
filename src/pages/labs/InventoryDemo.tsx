import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Box, Search, Plus, Filter, AlertTriangle, 
  ArrowUpRight, ArrowDownRight, Package, Truck, 
  History, Settings, MoreHorizontal, CheckCircle2, X, Trash2
} from 'lucide-react';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import GridBackground from '../../components/animations/GridBackground';

const InventoryDemo: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [items, setItems] = useState([
    { id: 'SKU-001', name: 'Premium Server Rack', category: 'Hardware', stock: 12, price: '₱45,000' },
    { id: 'SKU-002', name: 'Fiber Optic Cable (1km)', category: 'Cables', stock: 5, price: '₱12,500' },
    { id: 'SKU-003', name: 'Ethernet Switch 48-Port', category: 'Networking', stock: 0, price: '₱28,000' },
    { id: 'SKU-004', name: 'Cooling Unit 5kW', category: 'HVAC', stock: 8, price: '₱120,000' },
    { id: 'SKU-005', name: 'UPS Battery Backup', category: 'Power', stock: 3, price: '₱35,000' },
  ]);

  const [newItem, setNewItem] = useState({ name: '', category: 'Hardware', stock: 0, price: '' });

  const getStatus = (stock: number) => {
    if (stock === 0) return 'Out of Stock';
    if (stock <= 5) return 'Low Stock';
    return 'In Stock';
  };

  const updateStock = (id: string, delta: number) => {
    setItems(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, stock: Math.max(0, item.stock + delta) };
      }
      return item;
    }));
  };

  const addItem = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `SKU-00${items.length + 1}`;
    setItems(prev => [...prev, { ...newItem, id, stock: Number(newItem.stock) }]);
    setNewItem({ name: '', category: 'Hardware', stock: 0, price: '' });
    setIsAddModalOpen(false);
  };

  const deleteItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[var(--background)] !text-[#0f172a] selection:bg-[#fd9a00]/30 overflow-x-hidden">
      <GridBackground spacing={60} />
      <Header />

      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-12 gap-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-[#451a03] text-[10px] font-black tracking-widest uppercase mb-4 shadow-sm">
              Inventory Systems Lab
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2 !text-[#0f172a]">Stock <span className="text-amber-600">Control</span></h1>
            <p className="text-[#334155] font-bold">Enterprise asset management and automated logistics.</p>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0f172a] text-white font-black text-[10px] tracking-widest uppercase shadow-xl hover:opacity-90 transition-all active:scale-95"
            >
              <Plus className="w-4 h-4" /> Add Item
            </button>
            <button className="p-3 rounded-xl bg-white border border-slate-300 text-[#0f172a] hover:bg-slate-50 transition-all shadow-sm">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Total Assets', value: `₱${(items.length * 45000).toLocaleString()}`, icon: <Package className="text-blue-800" />, trend: '+4.2%' },
            { label: 'Low Stock Items', value: items.filter(i => i.stock <= 5 && i.stock > 0).length.toString().padStart(2, '0'), icon: <AlertTriangle className="text-amber-800" />, trend: '-2' },
            { label: 'Out of Stock', value: items.filter(i => i.stock === 0).length.toString().padStart(2, '0'), icon: <X className="text-red-800" />, trend: 'Critical' },
            { label: 'Active Shipments', value: '12', icon: <Truck className="text-emerald-800" />, trend: 'On Time' },
          ].map((stat, i) => (
            <div key={i} className="p-8 rounded-[32px] border border-slate-200 bg-white shadow-xl">
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100">{stat.icon}</div>
                <span className={`text-[10px] font-black tracking-widest uppercase ${stat.trend === 'Critical' ? 'text-red-600' : 'text-[#475569]'}`}>{stat.trend}</span>
              </div>
              <p className="text-[10px] font-black text-[#64748b] uppercase tracking-widest mb-1">{stat.label}</p>
              <h3 className="text-3xl font-black tracking-tight text-[#0f172a]">{stat.value}</h3>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Inventory List */}
          <div className="lg:col-span-12">
            <div className="p-8 rounded-[48px] border border-slate-200 bg-white shadow-xl overflow-hidden">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
                <h2 className="text-xl font-black tracking-tight uppercase text-[#0f172a]">Master Inventory</h2>
                <div className="flex items-center gap-4 bg-slate-50 px-4 py-2 rounded-xl border border-slate-200 w-full md:w-72">
                  <Search className="w-4 h-4 text-[#475569]" />
                  <input 
                    type="text" 
                    placeholder="Search SKU or Name..." 
                    className="bg-transparent border-none focus:outline-none text-xs font-black uppercase tracking-widest w-full placeholder:text-slate-400 text-[#0f172a]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-slate-100">
                      <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-[#64748b]">SKU / Item</th>
                      <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-[#64748b]">Category</th>
                      <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-[#64748b]">Inventory Level</th>
                      <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-[#64748b]">Status</th>
                      <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-[#64748b]">Value</th>
                      <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-[#64748b]">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    <AnimatePresence>
                      {filteredItems.map((item) => (
                        <motion.tr 
                          key={item.id}
                          layout
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="group hover:bg-slate-50 transition-colors"
                        >
                          <td className="py-6">
                            <p className="text-[8px] font-black text-amber-800 uppercase mb-1">{item.id}</p>
                            <p className="font-black text-sm text-[#0f172a]">{item.name}</p>
                          </td>
                          <td className="py-6">
                            <span className="text-[10px] font-black uppercase tracking-widest text-[#475569]">{item.category}</span>
                          </td>
                          <td className="py-6">
                            <div className="flex items-center gap-4">
                              <button 
                                onClick={() => updateStock(item.id, -1)}
                                className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-[#0f172a] hover:bg-amber-100 transition-all"
                              >
                                <Minus size={14} />
                              </button>
                              <span className="font-black text-lg text-[#0f172a] min-w-[2ch] text-center">{item.stock}</span>
                              <button 
                                onClick={() => updateStock(item.id, 1)}
                                className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-[#0f172a] hover:bg-emerald-100 transition-all"
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                          </td>
                          <td className="py-6">
                            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border transition-colors ${
                              getStatus(item.stock) === 'In Stock' ? 'bg-emerald-50 text-[#064e3b] border-emerald-200' :
                              getStatus(item.stock) === 'Low Stock' ? 'bg-amber-50 text-[#451a03] border-amber-200' :
                              'bg-red-50 text-[#7f1d1d] border-red-200'
                            }`}>
                              {getStatus(item.stock)}
                            </div>
                          </td>
                          <td className="py-6 font-black text-sm text-[#0f172a]">{item.price}</td>
                          <td className="py-6">
                            <button 
                              onClick={() => deleteItem(item.id)}
                              className="p-2 rounded-xl text-slate-300 hover:text-red-600 hover:bg-red-50 transition-all"
                            >
                              <Trash2 size={18} />
                            </button>
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Add Item Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsAddModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-md bg-white border border-slate-200 p-8 rounded-[40px] shadow-2xl"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-black tracking-tight text-[#0f172a]">Add New <span className="text-amber-600">Asset</span></h2>
                <button onClick={() => setIsAddModalOpen(false)} className="p-2 rounded-full bg-slate-50 hover:bg-slate-100">
                  <X className="w-5 h-5 text-[#0f172a]" />
                </button>
              </div>

              <form onSubmit={addItem} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[#64748b]">Item Name</label>
                  <input 
                    required type="text" placeholder="e.g. Core Switch v2" 
                    className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-amber-500/50 outline-none font-black text-[#0f172a]"
                    value={newItem.name} onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#64748b]">Category</label>
                    <select 
                      className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-amber-500/50 outline-none font-black text-[#0f172a] appearance-none"
                      value={newItem.category} onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                    >
                      <option>Hardware</option>
                      <option>Networking</option>
                      <option>Cables</option>
                      <option>Power</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#64748b]">Initial Stock</label>
                    <input 
                      required type="number" placeholder="0" 
                      className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-amber-500/50 outline-none font-black text-[#0f172a]"
                      value={newItem.stock} onChange={(e) => setNewItem({...newItem, stock: Number(e.target.value)})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[#64748b]">Estimated Value</label>
                  <input 
                    required type="text" placeholder="₱0.00" 
                    className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-amber-500/50 outline-none font-black text-[#0f172a]"
                    value={newItem.price} onChange={(e) => setNewItem({...newItem, price: e.target.value})}
                  />
                </div>
                <button type="submit" className="w-full py-5 rounded-[24px] bg-[#0f172a] text-white font-black text-sm tracking-widest uppercase shadow-xl hover:opacity-90 transition-all">
                  Register Asset
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

const Minus = ({size}: {size: number}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>;

export default InventoryDemo;
