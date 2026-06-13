import React, { useRef } from 'react'
import { Globe, Zap, Laptop, MousePointer2, ChevronRight, ChevronLeft } from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import Header from '../components/ui/Header'
import Footer from '../components/ui/Footer'
import Logo from '../components/ui/Logo'
import GridBackground from '../components/animations/GridBackground'
import ShinyText from '../components/animations/ShinyText'
import BlurText from '../components/animations/BlurText'
import CardSwap, { Card } from '../components/animations/CardSwap'

// Import Mobile Project Assets
import dynmovs from '../assets/MobileProjects/Dynmovs.png'
import dynbooth from '../assets/MobileProjects/DynBooth.png'
import ismeye from "../assets/MobileProjects/Ismeye'sHaven.png"
import ddc from '../assets/MobileProjects/DDC.png'
import aspire from '../assets/MobileProjects/AspireQueueing.png'
import portfolio from '../assets/MobileProjects/Portfolio.png'

const projects = [
  { name: "Dynmovs", image: dynmovs, category: "Streaming App", color: "from-yellow-500 to-indigo-600" },
  { name: "DynBooth", image: dynbooth, category: "Photo Experience", color: "from-[#fd9a00] to-orange-600" },
  { name: "Ismeye's Haven", image: ismeye, category: "Digital Marketplace", color: "from-amber-500 to-orange-600" },
  { name: "DDC", image: ddc, category: "Premium Service", color: "from-emerald-500 to-teal-600" },
  { name: "Aspire", image: aspire, category: "Healthcare System", color: "from-blue-500 to-cyan-600" },
  { name: "Portfolio", image: portfolio, category: "Personal Brand", color: "from-violet-500 to-fuchsia-600" },
]

const Home: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen bg-[var(--background)] font-sans text-foreground selection:bg-yellow-500/30 overflow-x-hidden transition-colors duration-300">
      {/* Dynamic Background */}
      <GridBackground lineColor="rgba(168, 85, 247, 0.1)" spacing={60} />
      
      <Header />

      {/* Hero Section */}
      <section className="relative pt-64 pb-32 px-6" id="home">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-yellow-600/10 blur-[120px] rounded-full -z-10" />
        
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
              text="Scale Your Vision With Expert Code" 
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
            VibeBuilds delivers high-performance web applications and digital products. We turn complex ideas into seamless user experiences.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-col sm:flex-row items-center gap-6"
          >
            <Link to="/contact">
              <button className="px-10 py-4 rounded-2xl bg-foreground text-background font-black text-sm tracking-widest hover:opacity-90 transition-all active:scale-95 shadow-2xl">
                GET STARTED
              </button>
            </Link>
            <Link to="/projects">
              <button className="px-10 py-4 rounded-2xl bg-foreground/5 border border-foreground/10 text-foreground font-black text-sm tracking-widest hover:bg-foreground/10 transition-all active:scale-95">
                OUR WORK
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-32 relative overflow-hidden transition-colors duration-300" id="projects">
        {/* Decorative background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-yellow-600/5 blur-[120px] rounded-full -z-0" />
        
        <div className="max-w-7xl mx-auto px-6 mb-20 relative z-10">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 text-center text-foreground">Featured <span className="text-yellow-500">Work</span></h2>
          <p className="text-[var(--text-muted)] text-lg max-w-xl mx-auto text-center font-medium">Our latest digital creations, ranging from streaming apps to enterprise systems.</p>
        </div>

        {/* Infinite Auto-Scrolling Carousel */}
        <div className="relative flex overflow-hidden py-20 bg-foreground/[0.02]">
          <motion.div 
            className="flex gap-8 px-4"
            animate={{
              x: [0, -1872], // 6 projects * (280px + 32px gap)
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 40,
                ease: "linear",
              },
            }}
            whileHover={{ transition: { duration: 80 } }} // Slow down on hover
          >
            {/* Double the projects for a seamless loop */}
            {[...projects, ...projects].map((project, i) => (
              <div 
                key={i}
                className="flex-shrink-0 w-[240px] md:w-[280px] group perspective-1000"
              >
                <div 
                  className="relative aspect-[9/18.5] rounded-[40px] overflow-hidden shadow-2xl transition-all duration-500 group-hover:shadow-yellow-500/20 group-hover:-translate-y-4 group-hover:rotate-1"
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
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-[10px] font-black tracking-widest uppercase mb-8">
              The VibeBuilds Way
            </div>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-[0.9]">Our Engineering <br/><span className="text-yellow-500">Process</span></h2>
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
                  <div className="w-6 h-6 rounded-lg bg-yellow-500/10 flex items-center justify-center text-yellow-500">
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
                  color: "bg-gradient-to-br from-indigo-600 to-yellow-700"
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
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">Built for <span className="text-yellow-500">Performance</span></h2>
          <p className="text-[var(--text-muted)] text-xl max-w-2xl mx-auto font-medium mb-10">We don't just build websites; we engineer digital experiences that push the boundaries of what's possible on the web.</p>
          <Link to="/about">
            <button className="px-8 py-3 rounded-xl bg-yellow-500 text-white font-black text-xs tracking-[0.2em] uppercase hover:bg-yellow-600 transition-all active:scale-95 shadow-xl shadow-yellow-500/20">
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
              className="p-10 rounded-[32px] border border-[var(--border)] bg-foreground/[0.02] backdrop-blur-md hover:border-yellow-500/30 transition-all group"
            >
              <div className="w-14 h-14 rounded-2xl bg-yellow-500/10 text-yellow-500 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-yellow-500 group-hover:text-white transition-all duration-500 shadow-lg shadow-yellow-500/10">
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
