import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Laptop, ChevronRight, X, Play, Database, BarChart3, Gamepad2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import Header from '../components/ui/Header'
import GridBackground from '../components/animations/GridBackground'
import BlurText from '../components/animations/BlurText'
import Footer from '../components/ui/Footer'
import { useLanguage } from '../context/LanguageContext'

// Import Mobile Project Assets
import dynmovs from '../assets/MobileProjects/Dynmovs.png'
import dynbooth from '../assets/MobileProjects/DynBooth.png'
import ismeye from "../assets/MobileProjects/Ismeye'sHaven.png"
import ddc from '../assets/MobileProjects/DDC.png'
import aspire from '../assets/MobileProjects/AspireQueueing.png'
import portfolio from '../assets/MobileProjects/Portfolio.png'

// Import Project Videos
import aspireVideo from '../assets/ProjectsVideo/AspireQueue.mp4'
import countrysideVideo from '../assets/ProjectsVideo/Countryside.mp4'
import dynmoviesVideo from '../assets/ProjectsVideo/Dynmovies.mp4'
import ismeyeVideo from "../assets/ProjectsVideo/Ismeye'sHaven.mp4"

const projects = [
  { name: "Dynmovs", image: dynmovs, category: "Streaming App", color: "from-[#fd9a00] to-indigo-600" },
  { name: "DynBooth", image: dynbooth, category: "Photo Experience", color: "from-[#fd9a00] to-orange-600" },
  { name: "Ismeye's Haven", image: ismeye, category: "Digital Marketplace", color: "from-amber-500 to-orange-600" },
  { name: "DDC", image: ddc, category: "Premium Service", color: "from-emerald-500 to-teal-600" },
  { name: "Aspire", image: aspire, category: "Healthcare System", color: "from-blue-500 to-cyan-600" },
  { name: "Portfolio", image: portfolio, category: "Personal Brand", color: "from-violet-500 to-fuchsia-600" },
]

const videoReels = [
  { name: "Aspire Queue", video: aspireVideo, category: "Healthcare System" },
  { name: "Dynmovies", video: dynmoviesVideo, category: "Streaming Platform" },
  { name: "Ismeye's Haven", video: ismeyeVideo, category: "Marketplace" },
  { name: "Countryside", video: countrysideVideo, category: "Service System" },
]

const Projects: React.FC = () => {
  const { t } = useLanguage();
  const [selectedVideo, setSelectedVideo] = useState<{name: string, video: string} | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const totalPages = Math.ceil(projects.length / itemsPerPage);
  const paginatedProjects = projects.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="min-h-screen bg-[var(--background)] font-sans text-foreground selection:bg-[#fd9a00]/30 overflow-x-hidden transition-colors duration-300">
      <GridBackground lineColor="rgba(168, 85, 247, 0.1)" spacing={60} />
      <Header />

      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12"
          >
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedVideo(null)}
              className="absolute inset-0 bg-black/40 backdrop-blur-xl"
            />
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              className="relative w-full max-w-5xl bg-black rounded-[32px] md:rounded-[48px] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)] border border-white/10"
            >
              <button 
                onClick={() => setSelectedVideo(null)}
                className="absolute top-6 right-6 z-[110] p-3 rounded-full bg-black/50 backdrop-blur-md text-white hover:bg-white/10 transition-all border border-white/10"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="aspect-video w-full">
                <video 
                  key={selectedVideo.video}
                  src={selectedVideo.video} 
                  autoPlay 
                  controls
                  preload="none" 
                  className="w-full h-full object-contain"
                />
              </div>
              
              <div className="p-8 md:p-10 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                <p className="text-[10px] font-black tracking-[0.4em] text-emerald-400 uppercase mb-2">Now Playing</p>
                <h3 className="text-2xl md:text-4xl font-black text-white tracking-tighter uppercase leading-none">{selectedVideo.name}</h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pt-40 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 text-center">
            <BlurText 
              text={t('projects.title')} 
              delay={100}
              animateBy="words"
              className="text-5xl md:text-7xl font-black tracking-tight text-foreground leading-tight justify-center mb-8"
            />
            <p className="text-xl text-[var(--text-muted)] max-w-2xl mx-auto font-medium">
              {t('projects.sub')}
            </p>
          </div>

          <div className="mb-32">
            <div className="flex items-center gap-4 mb-12">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#fd9a00]/20 to-transparent" />
              <h2 className="text-[10px] font-black tracking-[0.4em] uppercase text-[#fd9a00]">Mobile Experience</h2>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#fd9a00]/20 to-transparent" />
            </div>

            {/* Projects Grid */}
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-4"
            >
              <AnimatePresence mode="popLayout">
                {paginatedProjects.map((project, i) => (
                  <motion.div 
                    key={project.name}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: i * 0.1 }}
                    className="group"
                  >
                    <div className="relative aspect-[9/18.5] rounded-[40px] overflow-hidden shadow-2xl transition-all duration-500 group-hover:shadow-[#fd9a00]/20 group-hover:-translate-y-4 group-hover:rotate-1">
                      <img 
                        src={project.image} 
                        alt={project.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                      <div className="absolute bottom-8 left-6 right-6">
                        <p className="text-[8px] font-black tracking-widest text-[#fd9a00] uppercase mb-2">{project.category}</p>
                        <h3 className="text-2xl font-black text-white tracking-tighter">{project.name}</h3>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-16">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-12 h-12 rounded-2xl border font-black text-xs transition-all ${
                      currentPage === i + 1 
                        ? 'bg-[#fd9a00] border-[#fd9a00] text-white shadow-xl shadow-[#fd9a00]/20' 
                        : 'bg-white/5 border-white/10 text-[var(--text-muted)] hover:border-[#fd9a00]/50'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Cinematic Reels Section */}
          <div className="mb-32">
            <div className="flex items-center gap-4 mb-12">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
              <h2 className="text-[10px] font-black tracking-[0.4em] uppercase text-emerald-500">Cinematic Reels</h2>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {videoReels.map((reel, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setSelectedVideo({ name: reel.name, video: reel.video })}
                  className="relative aspect-video rounded-[40px] overflow-hidden group shadow-2xl border border-white/10 cursor-pointer"
                >
                  <video 
                    src={reel.video} 
                    autoPlay 
                    muted 
                    loop 
                    playsInline
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity group-hover:opacity-40" />
                  
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white scale-75 group-hover:scale-100 transition-transform duration-500">
                      <Play className="w-8 h-8 fill-white" />
                    </div>
                  </div>

                  <div className="absolute bottom-10 left-10 right-10">
                    <p className="text-[10px] font-black tracking-[0.2em] text-emerald-400 uppercase mb-2">{reel.category}</p>
                    <h3 className="text-2xl md:text-3xl font-black text-white tracking-tighter leading-tight uppercase">{reel.name}</h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Live System Demos Section */}
          <div className="mb-32">
            <div className="flex items-center gap-4 mb-12">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#fd9a00]/20 to-transparent" />
              <h2 className="text-[10px] font-black tracking-[0.4em] uppercase text-[#fd9a00]">Interactive Demos</h2>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#fd9a00]/20 to-transparent" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { 
                  name: 'Lead CRM', 
                  desc: 'Real-time lead tracking and pipeline management system.',
                  path: '/labs/crm',
                  icon: <Database className="w-8 h-8" />,
                  color: 'text-blue-500'
                },
                { 
                  name: 'Sales Intel', 
                  desc: 'Decision support system with advanced sales forecasting.',
                  path: '/labs/analytics',
                  icon: <BarChart3 className="w-8 h-8" />,
                  color: 'text-emerald-500'
                },
                { 
                  name: 'FlappyVibe', 
                  desc: 'High-performance HTML5 canvas game engine demo.',
                  path: '/labs/game',
                  icon: <Gamepad2 className="w-8 h-8" />,
                  color: 'text-[#fd9a00]'
                },
              ].map((lab, i) => (
                <Link 
                  key={i} 
                  to={lab.path}
                  className="group relative p-10 rounded-[48px] bg-foreground/[0.02] border border-foreground/10 hover:border-[#fd9a00]/30 transition-all duration-500 overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-6">
                    <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[8px] font-black tracking-widest text-white/40 uppercase">
                      View Only
                    </div>
                  </div>

                  <div className={`w-16 h-16 rounded-2xl bg-foreground/5 flex items-center justify-center mb-8 ${lab.color} group-hover:scale-110 transition-transform duration-500`}>
                    {lab.icon}
                  </div>

                  <h3 className="text-2xl font-black tracking-tight mb-3">{lab.name}</h3>
                  <p className="text-sm text-[var(--text-muted)] font-medium leading-relaxed mb-8">
                    {lab.desc}
                  </p>

                  <div className="flex items-center gap-2 text-[10px] font-black tracking-widest uppercase text-[#fd9a00] group-hover:gap-4 transition-all">
                    Launch Demo <ChevronRight className="w-4 h-4" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Projects
