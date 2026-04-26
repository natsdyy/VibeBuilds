import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Beaker, BarChart3, Database, Gamepad2, ArrowRight, Box, ShoppingCart, Sword, LayoutGrid, MessageSquare, Users } from 'lucide-react';

import { Link } from 'react-router-dom';
import Header from '../components/ui/Header';
import Footer from '../components/ui/Footer';
import GridBackground from '../components/animations/GridBackground';
import { useLanguage } from '../context/LanguageContext';

const Labs: React.FC = () => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<'all' | 'systems' | 'gaming' | 'ecommerce'>('all');

  const experiments = [
    {
      id: 'crm',
      title: t('labs.crm.title'),
      description: t('labs.crm.desc'),
      icon: <Database className="w-8 h-8" />,
      path: '/labs/crm',
      color: 'from-blue-500 to-indigo-600',
      status: 'Live Logic',
      category: 'systems'
    },
    {
      id: 'inventory',
      title: t('labs.inventory.title'),
      description: t('labs.inventory.desc'),
      icon: <Box className="w-8 h-8" />,
      path: '/labs/inventory',
      color: 'from-amber-500 to-orange-600',
      status: 'System Demo',
      category: 'systems'
    },
    {
      id: 'ecommerce',
      title: t('labs.ecommerce.title'),
      description: t('labs.ecommerce.desc'),
      icon: <ShoppingCart className="w-8 h-8" />,
      path: '/labs/ecommerce',
      color: 'from-rose-500 to-pink-600',
      status: 'UX Sample',
      category: 'ecommerce'
    },
    {
      id: 'analytics',
      title: t('labs.analytics.title'),
      description: t('labs.analytics.desc'),
      icon: <BarChart3 className="w-8 h-8" />,
      path: '/labs/analytics',
      color: 'from-emerald-500 to-teal-600',
      status: 'Intelligence',
      category: 'systems'
    },
    {
      id: 'bot',
      title: t('labs.bot.title'),
      description: t('labs.bot.desc'),
      icon: <MessageSquare className="w-8 h-8" />,
      path: '/labs/bot',
      color: 'from-blue-600 to-cyan-500',
      status: 'Bot Sample',
      category: 'systems'
    },
    {
      id: 'mmorpg',
      title: t('labs.mmorpg.title'),
      description: t('labs.mmorpg.desc'),
      icon: <Sword className="w-8 h-8" />,
      path: '/mmorpg',
      color: 'from-amber-400 to-[#fd9a00]',
      status: 'Engine Demo',
      category: 'gaming'
    },
    {
      id: 'mmo-creator',
      title: t('labs.mmo_creator.title'),
      description: t('labs.mmo_creator.desc'),
      icon: <Users className="w-8 h-8" />,
      path: '/labs/mmo-creator',
      color: 'from-emerald-500 to-teal-500',
      status: 'Asset System',
      category: 'gaming'
    },
    {
      id: 'game',
      title: t('labs.game.title'),
      description: t('labs.game.desc'),
      icon: <Gamepad2 className="w-8 h-8" />,
      path: '/labs/game',
      color: 'from-slate-500 to-slate-700',
      status: 'Legacy Sample',
      category: 'gaming'
    },
    {
      id: 'configurator',
      title: t('labs.configurator.title'),
      description: t('labs.configurator.desc'),
      icon: <Box className="w-8 h-8" />,
      path: '/labs/configurator',
      color: 'from-indigo-500 to-purple-600',
      status: '3D UI',
      category: 'ecommerce'
    },
    {
      id: 'checkout',
      title: t('labs.checkout.title'),
      description: t('labs.checkout.desc'),
      icon: <ShoppingCart className="w-8 h-8" />,
      path: '/labs/checkout',
      color: 'from-green-500 to-emerald-600',
      status: 'Conversion Tool',
      category: 'ecommerce'
    }
  ];

  const categories = [
    { id: 'all', label: t('labs.filter.all'), icon: <LayoutGrid className="w-4 h-4" /> },
    { id: 'systems', label: t('labs.filter.systems'), icon: <Database className="w-4 h-4" /> },
    { id: 'ecommerce', label: t('labs.filter.ecommerce'), icon: <ShoppingCart className="w-4 h-4" /> },
    { id: 'gaming', label: t('labs.filter.gaming'), icon: <Sword className="w-4 h-4" /> },
  ] as const;

  const filteredExperiments = activeCategory === 'all' 
    ? experiments 
    : experiments.filter(exp => exp.category === activeCategory);

  return (
    <div className="min-h-screen bg-[var(--background)] text-foreground selection:bg-[#fd9a00]/30 overflow-x-hidden">
      <GridBackground spacing={60} />
      <Header />

      <main className="pt-40 pb-20 px-8 w-full max-w-none ml-0 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 text-left items-start w-full">
          {/* Sticky Sidebar Filter */}
          <aside className="w-full lg:w-72 flex-shrink-0">
            <div className="lg:sticky lg:top-40 space-y-6">
              <div className="p-2 bg-foreground/[0.03] backdrop-blur-xl border border-foreground/10 rounded-[32px] flex flex-col gap-2">
                <div className="px-6 py-4 border-b border-foreground/5 mb-2">
                  <span className="text-[10px] font-black text-foreground/30 uppercase tracking-[0.2em]">Filter Shards</span>
                </div>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`relative px-6 py-4 rounded-2xl text-xs font-black tracking-widest uppercase flex items-center gap-4 transition-all duration-300 group ${
                      activeCategory === cat.id 
                        ? 'text-white' 
                        : 'text-[var(--text-muted)] hover:text-foreground hover:bg-foreground/[0.05]'
                    }`}
                  >
                    {activeCategory === cat.id && (
                      <motion.div
                        layoutId="activeFilterSidebar"
                        className="absolute inset-0 bg-[#fd9a00] rounded-2xl -z-10 shadow-xl shadow-[#fd9a00]/20"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <div className={`transition-transform duration-300 ${activeCategory === cat.id ? 'scale-110' : 'group-hover:scale-110'}`}>
                      {cat.icon}
                    </div>
                    {cat.label}
                  </button>
                ))}
              </div>

              <div className="hidden lg:block p-8 rounded-[32px] border border-foreground/5 bg-foreground/[0.01]">
                <p className="text-[10px] font-bold text-foreground/20 leading-relaxed uppercase tracking-wider">
                  Select a category to filter our latest experiments and technical shards.
                </p>
              </div>
            </div>
          </aside>

          {/* Grid Content */}
          <div className="flex-1 w-full">
            <div className="grid grid-cols-[repeat(auto-fill,minmax(380px,1fr))] gap-6 w-full">
              <AnimatePresence mode="wait">
                {filteredExperiments.map((exp, i) => (
                  <motion.div
                    key={exp.id}
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    transition={{ duration: 0.3, delay: i * 0.03 }}
                    className="group relative"
                  >
                    <Link to={exp.path}>
                      <div className="h-full p-10 rounded-[40px] border border-foreground/10 bg-foreground/[0.02] backdrop-blur-3xl hover:border-[#fd9a00]/30 transition-all duration-500 group-hover:-translate-y-2 flex flex-col overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-[#fd9a00]/5">
                        {/* Background Glow */}
                        <div className={`absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br ${exp.color} opacity-0 group-hover:opacity-10 blur-[60px] transition-opacity duration-500`} />
                        
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${exp.color} flex items-center justify-center text-white mb-8 shadow-xl shadow-black/20 group-hover:scale-110 transition-transform duration-500`}>
                          {exp.icon}
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-4">
                            <span className="text-[10px] font-black tracking-widest uppercase text-[#fd9a00] bg-[#fd9a00]/10 px-3 py-1 rounded-full">
                              {exp.status}
                            </span>
                          </div>
                          <h2 className="text-3xl font-black mb-4 tracking-tight">{exp.title}</h2>
                          <p className="text-[var(--text-muted)] text-lg leading-relaxed font-medium mb-8">
                            {exp.description}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 text-sm font-black tracking-widest uppercase text-[#fd9a00] group-hover:gap-4 transition-all">
                          {t('labs.launch')} <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Empty State */}
            {filteredExperiments.length === 0 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <p className="text-[var(--text-muted)] text-xl font-medium">No experiments found in this category.</p>
              </motion.div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Labs;
