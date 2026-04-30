import React from 'react'
import { motion } from 'framer-motion'
import Header from '../components/ui/Header'
import GridBackground from '../components/animations/GridBackground'
import BlurText from '../components/animations/BlurText'
import Footer from '../components/ui/Footer'
import { useLanguage } from '../context/LanguageContext'
import ProgrammerModal from '../components/ui/ProgrammerModal'

// Import Team Images
import cedric from '../assets/OurTeam/CedricBelisario.png'
import nathaniel from '../assets/OurTeam/NathanielVasquez.png'
import charles from '../assets/OurTeam/CharlesAlvaran.png'
import john from '../assets/OurTeam/JohnMarcoPaja.png'
import patrick from '../assets/OurTeam/PatrickMirhan.png'

const team = [
  { 
    name: "Cedric Belisario", 
    role: "Fullstack Developer/Game Developer", 
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
    role: "Front end developer/Technical Support", 
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

const About: React.FC = () => {
  const { t } = useLanguage();
  const [selectedMember, setSelectedMember] = React.useState<typeof team[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const openMemberModal = (member: typeof team[0]) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };
  return (
    <div className="min-h-screen bg-[var(--background)] font-sans text-foreground selection:bg-[#fd9a00]/30 overflow-x-hidden transition-colors duration-300">
      <GridBackground lineColor="rgba(168, 85, 247, 0.1)" spacing={60} />
      <Header />

      <main className="pt-40 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-24 text-center">
            <BlurText
              text={t('about.title')}
              delay={100}
              animateBy="words"
              className="text-5xl md:text-8xl font-black tracking-tighter text-foreground leading-tight justify-center mb-8"
            />
            <p className="text-xl text-[var(--text-muted)] max-w-2xl mx-auto font-medium">
              {t('about.sub')}
            </p>
          </div>

          <div className="overflow-x-auto">
            <motion.table
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="w-full border-collapse"
            >
              <thead>
                <tr className="border-b border-foreground/10">
                  <th className="px-6 py-8 text-left text-[10px] font-black uppercase tracking-[0.3em] text-[#fd9a00]">Member</th>
                  <th className="px-6 py-8 text-left text-[10px] font-black uppercase tracking-[0.3em] text-[#fd9a00]">Role</th>
                  <th className="px-6 py-8 text-right text-[10px] font-black uppercase tracking-[0.3em] text-[#fd9a00]">Status</th>
                </tr>
              </thead>
              <tbody>
                {team.map((member, i) => (
                  <motion.tr
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="group border-b border-foreground/5 hover:bg-foreground/[0.02] transition-colors"
                  >
                    <td className="px-6 py-8">
                      <button 
                        onClick={() => openMemberModal(member)}
                        className="flex items-center gap-6 text-left hover:opacity-70 transition-opacity w-full"
                      >
                        <div className="relative w-20 h-20 shrink-0 rounded-2xl overflow-hidden border border-foreground/10 group-hover:border-[#fd9a00]/50 transition-colors">
                          <img
                            src={member.image}
                            alt={member.name}
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                          />
                        </div>
                        <div>
                          <h3 className="text-2xl font-black tracking-tight text-foreground">
                            {member.name}
                            <span className="text-[10px] font-black uppercase text-[#fd9a00] opacity-0 group-hover:opacity-100 transition-opacity ml-3">View Profile</span>
                          </h3>
                          <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">Programmer 0{i + 1}</p>
                        </div>
                      </button>
                    </td>
                    <td className="px-6 py-8">
                      <p className="text-lg font-bold text-foreground tracking-tight">{member.role}</p>
                    </td>
                    <td className="px-6 py-8 text-right">
                      {member.available ? (
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-black uppercase tracking-widest">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          Available
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[10px] font-black uppercase tracking-widest">
                          <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                          On Job
                        </div>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </motion.table>
          </div>
        </div>
      </main>
      <Footer />

      <ProgrammerModal 
        member={selectedMember}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  )
}

export default About
