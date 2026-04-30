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
import ProgrammerModal from '../components/ui/ProgrammerModal'

// Import Mobile Project Assets
import dynmovs from '../assets/MobileProjects/Dynmovs.png'
import dynbooth from '../assets/MobileProjects/DynBooth.png'
import ismeye from "../assets/MobileProjects/Ismeye'sHaven.png"
import ddc from '../assets/MobileProjects/DDC.png'
import aspire from '../assets/MobileProjects/AspireQueueing.png'
import portfolio from '../assets/MobileProjects/Portfolio.png'

// Import Team Images
import cedric from '../assets/OurTeam/CedricBelisario.png'
import nathaniel from '../assets/OurTeam/NathanielVasquez.png'
import charles from '../assets/OurTeam/CharlesAlvaran.png'
import john from '../assets/OurTeam/JohnMarcoPaja.png'
import patrick from '../assets/OurTeam/PatrickMirhan.png'

const projects = [
  { name: "Dynmovs", image: dynmovs, category: "Streaming App", color: "from-[#fd9a00] to-indigo-600" },
  { name: "DynBooth", image: dynbooth, category: "Photo Experience", color: "from-[#fd9a00] to-orange-600" },
  { name: "Ismeye's Haven", image: ismeye, category: "Digital Marketplace", color: "from-amber-500 to-orange-600" },
  { name: "DDC", image: ddc, category: "Premium Service", color: "from-emerald-500 to-teal-600" },
  { name: "Aspire", image: aspire, category: "Healthcare System", color: "from-blue-500 to-cyan-600" },
  { name: "Portfolio", image: portfolio, category: "Personal Brand", color: "from-violet-500 to-fuchsia-600" },
]

const team = [
  { 
    name: "Cedric Belisario", 
    role: "Fullstack Developer", 
    image: cedric, 
    color: "from-[#fd9a00]/20", 
    available: false, 
    resume: null,
    summary: "Expert Fullstack & Game Developer with a passion for building immersive digital experiences and high-performance systems. Cedric specializes in complex logic and creative engineering."
  },
  { 
    name: "Nathaniel Vasquez", 
    role: "Fullstack Developer", 
    image: nathaniel, 
    color: "from-blue-500/20", 
    available: true, 
    resume: null,
    summary: "Strategic Fullstack Developer specializing in scalable web architectures and modern frontend frameworks. Nathaniel excels at turning business requirements into elegant code."
  },
  { 
    name: "Charles Alvaran", 
    role: "Fullstack Developer", 
    image: charles, 
    color: "from-[#fd9a00]/20", 
    available: true, 
    resume: "/assets/mmo/ismeye's/Resume/Resume - Charles Louie Alvaran.pdf",
    summary: "Versatile Fullstack Developer focused on creating seamless user interfaces and robust backend integrations. Charles brings a balanced perspective to every project he leads."
  },
  { 
    name: "John Marco Paja", 
    role: "Front end developer", 
    image: john, 
    color: "from-emerald-500/20", 
    available: true, 
    resume: "/assets/mmo/ismeye's/Resume/Resume - John Marco Paja.pdf",
    summary: "Creative Frontend Developer and Technical Support specialist with a keen eye for detail and user-centric design. John ensures every interaction is smooth and purposeful."
  },
  { 
    name: "Patrick Mirhan", 
    role: "Front end developer / Project manager", 
    image: patrick, 
    color: "from-amber-500/20", 
    available: true, 
    resume: null,
    summary: "Efficient Frontend Developer and Project Manager dedicated to delivering high-quality projects on time. Patrick bridges the gap between client vision and technical execution."
  },
]

const Home: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  const [selectedMember, setSelectedMember] = React.useState<typeof team[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const openMemberModal = (member: typeof team[0]) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

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
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-foreground/5 border border-foreground/10 text-[var(--text-muted)] text-[10px] font-black tracking-[0.2em] uppercase mb-10 shadow-sm"
          >
            <ShinyText text="VibeBuilds — Digital Programmers & Creative Engineers" speed={4} className="text-[var(--text-muted)]" />
          </motion.div>
          
          <div className="mb-8">
            <h1 className="text-6xl md:text-[100px] font-black tracking-tighter text-foreground leading-[0.85] justify-center">
              WE BUILD <br/>
              <span className="text-[#fd9a00]">ELITE SYSTEMS</span>
            </h1>
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="space-y-4 max-w-3xl mb-12"
          >
            <p className="text-xl md:text-3xl text-foreground font-black tracking-tight">
              We are open to new projects and partnerships.
            </p>
            <p className="text-lg md:text-xl text-[var(--text-muted)] leading-relaxed font-medium">
              Our portfolio shows the work we’ve done, and we’re ready to help companies bring their ideas to life. We turn digital concepts into real, high-performing solutions that make an impact.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-col sm:flex-row items-center gap-6"
          >
            <Link to="/about">
              <button className="group flex items-center gap-3 px-10 py-5 rounded-2xl bg-[#fd9a00] text-white font-black text-sm tracking-widest hover:scale-105 transition-all active:scale-95 shadow-2xl shadow-[#fd9a00]/20">
                HIRE THE TEAM <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <Link to="/projects">
              <button className="px-10 py-5 rounded-2xl bg-foreground/5 border border-foreground/10 text-foreground font-black text-sm tracking-widest hover:bg-foreground/10 transition-all active:scale-95">
                OUR CASE STUDIES
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Team & Vision Section */}
      <section className="py-32 px-6 max-w-7xl mx-auto" id="about">
        <div className="flex flex-col lg:flex-row gap-20 items-center mb-32">
          <div className="lg:w-1/2">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#fd9a00]/10 border border-[#fd9a00]/20 text-[#fd9a00] text-[10px] font-black tracking-widest uppercase mb-8">
              The Collective
            </div>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-[0.9]">Meet the <br/><span className="text-[#fd9a00]">Programmers</span></h2>
            <p className="text-[var(--text-muted)] text-xl mb-12 max-w-xl font-medium leading-relaxed">
              VibeBuilds is a focused collective of elite developers and designers. We don't just build products; we engineer digital legacies for forward-thinking clients.
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="text-4xl font-black text-[#fd9a00] mb-2">100%</h4>
                <p className="text-xs font-black uppercase tracking-widest text-[var(--text-muted)]">Commitment</p>
              </div>
              <div>
                <h4 className="text-4xl font-black text-[#fd9a00] mb-2">24/7</h4>
                <p className="text-xs font-black uppercase tracking-widest text-[var(--text-muted)]">Innovation</p>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2 overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-foreground/10">
                  <th className="pb-4 text-left text-[8px] font-black uppercase tracking-[0.3em] text-[#fd9a00]">Member</th>
                  <th className="pb-4 text-right text-[8px] font-black uppercase tracking-[0.3em] text-[#fd9a00]">Role</th>
                </tr>
              </thead>
              <tbody>
                {team.filter(m => m.resume).map((member, i) => (
                  <tr key={i} className="group border-b border-foreground/5 hover:bg-foreground/[0.02] transition-colors">
                    <td className="py-4">
                      <button 
                        onClick={() => openMemberModal(member)}
                        className="flex items-center gap-4 text-left hover:opacity-70 transition-opacity w-full"
                      >
                        <div className="w-12 h-12 rounded-xl overflow-hidden border border-foreground/10 group-hover:border-[#fd9a00]/50 transition-colors">
                          <img src={member.image} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                        </div>
                        <p className="text-sm font-black tracking-tight text-foreground">
                          {member.name} 
                          <span className="text-[8px] font-black uppercase text-[#fd9a00] opacity-0 group-hover:opacity-100 transition-opacity ml-2">View Profile</span>
                        </p>
                      </button>
                    </td>
                    <td className="py-4 text-right">
                      <div className="flex flex-col items-end gap-1">
                        <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-tighter">{member.role}</p>
                        <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[6px] font-black uppercase tracking-widest ${
                          member.available 
                            ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' 
                            : 'bg-amber-500/10 border-amber-500/20 text-amber-500'
                        }`}>
                          <div className={`w-1 h-1 rounded-full ${member.available ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                          {member.available ? 'Available' : 'On Job'}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-8 flex justify-end">
              <Link to="/about" className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#fd9a00] hover:opacity-70 transition-all">
                View Full Team Directory <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
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
      <Footer />

      <ProgrammerModal 
        member={selectedMember}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  )
}
export default Home
