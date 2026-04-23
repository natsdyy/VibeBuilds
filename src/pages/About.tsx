import React from 'react'
import { motion } from 'framer-motion'
import Header from '../components/ui/Header'
import GridBackground from '../components/animations/GridBackground'
import BlurText from '../components/animations/BlurText'
import Footer from '../components/ui/Footer'

// Import Team Images
import cedric from '../assets/OurTeam/CedricBelisario.png'
import nathaniel from '../assets/OurTeam/NathanielVasquez.png'
import charles from '../assets/OurTeam/CharlesAlvaran.png'
import john from '../assets/OurTeam/JohnMarcoPaja.png'
import patrick from '../assets/OurTeam/PatrickMirhan.png'

const team = [
  { name: "Cedric Belisario", role: "Head Developer", image: cedric, color: "from-[#fd9a00]/20" },
  { name: "Nathaniel Vasquez", role: "Co-Founder", image: nathaniel, color: "from-blue-500/20" },
  { name: "Charles Alvaran", role: "Chief Marketing Officer CMO", image: charles, color: "from-[#fd9a00]/20" },
  { name: "John Marco Paja", role: "Founder", image: john, color: "from-emerald-500/20" },
  { name: "Patrick Mirhan", role: "Chief Technology Officer CTO", image: patrick, color: "from-amber-500/20" },
]

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-[var(--background)] font-sans text-foreground selection:bg-[#fd9a00]/30 overflow-x-hidden transition-colors duration-300">
      <GridBackground lineColor="rgba(168, 85, 247, 0.1)" spacing={60} />
      <Header />

      <main className="pt-40 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-24 text-center">
            <BlurText 
              text="The Minds Shaping VibeBuilds" 
              delay={100}
              animateBy="words"
              className="text-5xl md:text-8xl font-black tracking-tighter text-foreground leading-tight justify-center mb-8"
            />
            <p className="text-xl text-[var(--text-muted)] max-w-2xl mx-auto font-medium">
              We're more than just developers; we're digital architects dedicated to crafting your vision into reality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="group relative h-[500px] overflow-hidden rounded-[40px] bg-foreground/[0.03] border border-foreground/5"
              >
                {/* Image Container */}
                <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-110">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity`} />
                  <div className={`absolute inset-0 bg-gradient-to-br ${member.color} to-transparent opacity-0 group-hover:opacity-40 transition-opacity duration-500`} />
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 p-10 flex flex-col justify-end">
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: i * 0.1 + 0.3 }}
                  >
                    <p className="text-[10px] font-black tracking-[0.3em] text-[#fd9a00] uppercase mb-3 drop-shadow-lg">Team Member</p>
                    <h3 className="text-3xl md:text-4xl font-black text-white tracking-tighter mb-2 drop-shadow-2xl">{member.name}</h3>
                    <div className="h-0 overflow-hidden group-hover:h-8 transition-all duration-500 ease-in-out">
                      <p className="text-white/70 font-medium text-sm tracking-wide">{member.role}</p>
                    </div>
                  </motion.div>
                </div>

                {/* Corner Accent */}
                <div className="absolute top-8 right-8 w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                  <div className="w-2 h-2 rounded-full bg-[#fd9a00] animate-pulse" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default About
