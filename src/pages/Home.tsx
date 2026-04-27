import React, { useRef } from 'react'
import { Globe, Zap, Laptop, MousePointer2, ChevronRight, ChevronLeft, ArrowRight } from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import Header from '../components/ui/Header'
import Logo from '../components/ui/Logo'
import Footer from '../components/ui/Footer'
import GridBackground from '../components/animations/GridBackground'
import ShinyText from '../components/animations/ShinyText'
import BlurText from '../components/animations/BlurText'
import CardSwap, { Card } from '../components/animations/CardSwap'
import { useLanguage } from '../context/LanguageContext'

// Import Mobile Project Assets
import dynmovs from '../assets/MobileProjects/Dynmovs.png'
import dynbooth from '../assets/MobileProjects/DynBooth.png'
import ismeye from "../assets/MobileProjects/Ismeye'sHaven.png"
import ddc from '../assets/MobileProjects/DDC.png'
import aspire from '../assets/MobileProjects/AspireQueueing.png'
import portfolio from '../assets/MobileProjects/Portfolio.png'

const projects = [
  { name: "Dynmovs", image: dynmovs, category: "Streaming App", color: "from-[#fd9a00] to-indigo-600" },
  { name: "DynBooth", image: dynbooth, category: "Photo Experience", color: "from-[#fd9a00] to-orange-600" },
  { name: "Ismeye's Haven", image: ismeye, category: "Digital Marketplace", color: "from-amber-500 to-orange-600" },
  { name: "DDC", image: ddc, category: "Premium Service", color: "from-emerald-500 to-teal-600" },
  { name: "Aspire", image: aspire, category: "Healthcare System", color: "from-blue-500 to-cyan-600" },
  { name: "Portfolio", image: portfolio, category: "Personal Brand", color: "from-violet-500 to-fuchsia-600" },
]

const Home: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[var(--background)] font-sans text-foreground selection:bg-[#fd9a00]/30 overflow-x-hidden transition-colors duration-300">
      {/* Dynamic Background */}
      <GridBackground lineColor="rgba(168, 85, 247, 0.1)" spacing={60} />
      
      <Header />

      {/* Hero Section */}
      <section className="relative pt-64 pb-32 px-6" id="home">
        <div className="hidden md:block absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#fd9a00]/10 blur-[120px] rounded-full -z-10" />
        
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-foreground/5 border border-foreground/10 text-[var(--text-muted)] text-[10px] font-bold tracking-[0.2em] uppercase mb-10 shadow-sm"
          >
            <ShinyText text="The Future of Digital Building" speed={4} className="text-[var(--text-muted)]" />
          </motion.div>
          
          <div className="mb-8">
            <BlurText 
              text={t('hero.title')} 
              delay={100}
              animateBy="words"
              className="text-6xl md:text-8xl font-black tracking-tight text-foreground leading-tight justify-center"
            />
          </div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-lg md:text-xl text-[var(--text-muted)] mb-12 leading-relaxed max-w-2xl font-medium"
          >
            {t('hero.sub')}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-col sm:flex-row items-center gap-6"
          >
            <Link to="/contact">
              <button className="px-10 py-4 rounded-2xl bg-foreground text-background font-black text-sm tracking-widest hover:opacity-90 transition-all active:scale-95 shadow-2xl">
                {t('hero.getStarted')}
              </button>
            </Link>
            <Link to="/projects">
              <button className="px-10 py-4 rounded-2xl bg-foreground/5 border border-foreground/10 text-foreground font-black text-sm tracking-widest hover:bg-foreground/10 transition-all active:scale-95">
                {t('hero.ourWork')}
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-32 relative overflow-hidden transition-colors duration-300" id="projects">
        {/* Decorative background glow */}
        <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-[#fd9a00]/5 blur-[120px] rounded-full -z-0" />
        
        <div className="max-w-7xl mx-auto px-6 mb-20 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="text-left">
              <h2 className="text-4xl md:text-7xl font-black tracking-tighter mb-4 text-foreground leading-[0.9]">Featured <br/><span className="text-[#fd9a00]">Work</span></h2>
              <p className="text-[var(--text-muted)] text-lg max-w-xl font-medium">Our latest digital creations, ranging from streaming apps to enterprise systems.</p>
            </div>
            <Link to="/projects">
              <button className="group flex items-center gap-4 px-8 py-4 rounded-2xl bg-[#fd9a00]/10 border border-[#fd9a00]/20 text-[#fd9a00] font-black text-xs tracking-widest uppercase hover:bg-[#fd9a00] hover:text-white transition-all active:scale-95 shadow-xl shadow-[#fd9a00]/5">
                View All Projects <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>
        </div>

        {/* Kinetic Draggable & Looping Carousel */}
        <div className="relative overflow-hidden py-10 bg-foreground/[0.02] cursor-grab active:cursor-grabbing">
          <motion.div 
            drag="x"
            dragConstraints={{ right: 0, left: -1872 * 2 }} // Double the constraint for triple the items
            dragElastic={0.05}
            animate={{
              x: [0, -1872],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 40,
                ease: "linear",
              },
            }}
            whileHover={{ transition: { duration: 80 } }} // Slow down on hover to let users drag
            whileTap={{ cursor: "grabbing" }}
            className="flex gap-8 px-8 w-max"
          >
            {[...projects, ...projects, ...projects].map((project, i) => (
              <div 
                key={i}
                className="flex-shrink-0 w-[260px] md:w-[320px] group perspective-1000"
              >
                <div 
                  className="relative aspect-[9/18.5] rounded-[40px] overflow-hidden shadow-2xl transition-all duration-500 group-hover:shadow-[#fd9a00]/20 group-hover:-translate-y-4 group-hover:rotate-1"
                >
                  <img 
                    src={project.image} 
                    alt={project.name}
                    className="w-full h-full object-cover"
                  />
                  {/* Overlay - lighter in light mode */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 dark:from-black via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-40" />
                  
                  <div className="absolute bottom-8 left-6 right-6">
                    <div className={`inline-block px-3 py-1 rounded-full bg-gradient-to-r ${project.color} text-[8px] font-black tracking-widest text-white uppercase mb-2 shadow-lg`}>
                      {project.category}
                    </div>
                    <h3 className="text-2xl font-black text-white tracking-tighter">{project.name}</h3>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#fd9a00]/10 border border-[#fd9a00]/20 text-[#fd9a00] text-[10px] font-black tracking-widest uppercase mb-8">
              The VibeBuilds Way
            </div>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-[0.9]">Our Engineering <br/><span className="text-[#fd9a00]">Process</span></h2>
            <p className="text-[var(--text-muted)] text-xl mb-12 max-w-xl font-medium leading-relaxed">
              We don't just write code; we architect solutions. Our phased approach ensures every project is built for maximum impact and infinite scalability.
            </p>
            
            <div className="space-y-6">
              {[
                "Bulletproof Digital Strategy",
                "Immersive UI/UX Design",
                "High-Performance Development",
                "Continuous Edge Optimization"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 text-sm font-bold tracking-tight">
                  <div className="w-6 h-6 rounded-lg bg-[#fd9a00]/10 flex items-center justify-center text-[#fd9a00]">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="relative pt-10">
            <CardSwap width="100%" height={450} cardDistance={40} verticalDistance={50} skewAmount={4}>
              {[
                {
                  title: "Digital Strategy",
                  description: "We map out your project's digital architecture to ensure bulletproof scalability and long-term success.",
                  icon: <Globe className="w-8 h-8" />,
                  color: "bg-gradient-to-br from-indigo-600 to-[#fd9a00]"
                },
                {
                  title: "Immersive Design",
                  description: "Crafting immersive UI/UX that captivates your audience and transforms visitors into lifelong advocates.",
                  icon: <MousePointer2 className="w-8 h-8" />,
                  color: "bg-gradient-to-br from-[#fd9a00] to-orange-600"
                },
                {
                  title: "Elite Dev",
                  description: "Turning complex blueprints into high-performance reality with clean, modular, and future-proof code.",
                  icon: <Zap className="w-8 h-8" />,
                  color: "bg-gradient-to-br from-blue-600 to-indigo-700"
                },
                {
                  title: "Edge Tuning",
                  description: "Continuous refinement and performance tuning to keep your product at the absolute edge of technology.",
                  icon: <Laptop className="w-8 h-8" />,
                  color: "bg-gradient-to-br from-emerald-600 to-teal-700"
                }
              ].map((item, i) => (
                <Card key={i} className={`p-10 flex flex-col justify-center border border-white/20 shadow-2xl ${item.color}`}>
                  <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mb-8 text-white shadow-xl">
                    {item.icon}
                  </div>
                  
                  <div className="space-y-4">
                    <p className="text-[10px] font-black tracking-[0.4em] text-white/40 uppercase">Phase 0{i + 1}</p>
                    <h2 className="text-4xl font-black text-white tracking-tighter leading-none">{item.title}</h2>
                    <p className="text-white/70 text-lg leading-relaxed font-medium">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-auto flex items-center gap-2 text-white/30 text-[9px] font-black tracking-[0.2em] uppercase">
                    <div className="w-8 h-px bg-white/20" />
                    <span>Auto-cycling active</span>
                  </div>
                </Card>
              ))}
            </CardSwap>
          </div>
        </div>
      </section>

      {/* Services/About Section Placeholder */}
      <section className="py-32 px-6 max-w-7xl mx-auto" id="about">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">Built for <span className="text-[#fd9a00]">Performance</span></h2>
          <p className="text-[var(--text-muted)] text-xl max-w-2xl mx-auto font-medium mb-10">We don't just build websites; we engineer digital experiences that push the boundaries of what's possible on the web.</p>
          <Link to="/about">
            <button className="px-8 py-3 rounded-xl bg-[#fd9a00] text-white font-black text-xs tracking-[0.2em] uppercase hover:bg-orange-500 transition-all active:scale-95 shadow-xl shadow-[#fd9a00]/20">
              Meet The Team
            </button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Full-Stack Dev",
              desc: "From backend architecture to frontend polish, we handle it all with precision.",
              icon: <Laptop className="w-6 h-6" />
            },
            {
              title: "UI/UX Strategy",
              desc: "User-centric design that doesn't just look good, but works perfectly.",
              icon: <Zap className="w-6 h-6" />
            },
            {
              title: "Cloud Native",
              desc: "Scalable infrastructure setup using the latest cloud technologies.",
              icon: <Globe className="w-6 h-6" />
            }
          ].map((service, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="p-10 rounded-[32px] border border-[var(--border)] bg-foreground/[0.02] backdrop-blur-md hover:border-[#fd9a00]/30 transition-all group"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#fd9a00]/10 text-[#fd9a00] flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-[#fd9a00] group-hover:text-white transition-all duration-500 shadow-lg shadow-[#fd9a00]/10">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 tracking-tight">{service.title}</h3>
              <p className="text-[var(--text-muted)] leading-relaxed text-lg font-medium">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
export default Home
