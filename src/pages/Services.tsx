import React from 'react'
import { motion } from 'framer-motion'
import { Check, Zap, Globe, Shield, Cpu, MessageSquare, Layout, Database, ShoppingCart, Gamepad2, Settings, Smartphone, Users, Search, PenTool, Code2, Rocket, BarChart3, Bot } from 'lucide-react'
import Header from '../components/ui/Header'
import GridBackground from '../components/animations/GridBackground'
import BlurText from '../components/animations/BlurText'
import Footer from '../components/ui/Footer'
import { useDiscovery } from '../context/DiscoveryContext'
import { useLanguage } from '../context/LanguageContext'

const plans = [
  {
    name: "Academic",
    price: "2,000 - 10,000",
    description: "Simple projects, SHS/College research, assignments, and school activities.",
    features: [
      "Rapid Turnaround",
      "Source Code Included",
      "Documentation Support",
      "Free Consultation"
    ],
    color: "from-purple-500/20 to-indigo-600/5",
    accent: "text-purple-500"
  },
  {
    name: "Essential",
    price: "20,000",
    description: "Ideal for high-impact landing pages and professional portfolios.",
    features: [
      "Premium UI/UX Design",
      "Fully Responsive",
      "SEO Optimization",
      "1 Month Technical Support"
    ],
    color: "from-blue-500/20 to-blue-600/5",
    accent: "text-blue-500"
  },
  {
    name: "Advanced",
    price: "145,000",
    description: "Custom web applications and specialized business systems.",
    features: [
      "Everything in Essential",
      "Custom Admin Dashboard",
      "CRM/Database Integration",
      "Automated Bot Systems",
      "Advanced Animations",
      "3 Months Technical Support"
    ],
    color: "from-[#fd9a00]/20 to-orange-600/5",
    accent: "text-[#fd9a00]",
    popular: true
  },
  {
    name: "Custom",
    price: "Custom",
    description: "Enterprise-grade ERP systems and complex digital products.",
    features: [
      "Everything in Advanced",
      "ERP/CRM System Integration",
      "Cloud Infrastructure Setup",
      "Game & Interactive Dev",
      "Custom Bot Architectures",
      "24/7 Priority Support"
    ],
    color: "from-emerald-500/20 to-teal-600/5",
    accent: "text-emerald-500"
  }
]

const Services: React.FC = () => {
  const { openDiscovery } = useDiscovery()
  const { t } = useLanguage()
  
  return (
    <div className="min-h-screen bg-[var(--background)] font-sans text-foreground selection:bg-[#fd9a00]/30 overflow-x-hidden transition-colors duration-300">
      <GridBackground lineColor="rgba(168, 85, 247, 0.1)" spacing={60} />
      <Header />

      <main className="pt-40 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-24 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#fd9a00]/10 border border-[#fd9a00]/20 text-[#fd9a00] text-[10px] font-black tracking-widest uppercase mb-8">
              Pricing & Services
            </div>
            <BlurText 
              text={t('services.title')} 
              delay={100}
              animateBy="words"
              className="text-5xl md:text-8xl font-black tracking-tighter text-foreground leading-tight justify-center mb-8"
            />
            <p className="text-xl text-[var(--text-muted)] max-w-2xl mx-auto font-medium">
              {t('services.sub')}
            </p>
          </div>

          {/* Engineering Process Section */}
          <div className="mb-40">
            <div className="flex items-center gap-4 mb-16">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
              <h2 className="text-[10px] font-black tracking-[0.4em] uppercase text-blue-500 text-center">Our Engineering Process</h2>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              {[
                { step: "01", name: "Discovery", desc: "Strategic mapping of your vision and goals.", icon: <Search /> },
                { step: "02", name: "Design", desc: "Crafting immersive, high-conversion UI/UX.", icon: <PenTool /> },
                { step: "03", name: "Build", desc: "Engineering with elite code and scalability.", icon: <Code2 /> },
                { step: "04", name: "Optimize", desc: "Fine-tuning for peak speed and security.", icon: <Rocket /> },
                { step: "05", name: "Launch", desc: "Seamless global deployment and scale.", icon: <Globe /> }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative p-8 rounded-[32px] bg-foreground/[0.02] border border-foreground/5 hover:border-[#fd9a00]/30 transition-all group"
                >
                  <div className="text-[#fd9a00] mb-6 opacity-40 group-hover:opacity-100 transition-opacity">
                    {React.cloneElement(item.icon as React.ReactElement, { className: "w-8 h-8" })}
                  </div>
                  <div className="text-[10px] font-black text-[#fd9a00] mb-2 tracking-widest">{item.step}</div>
                  <h3 className="text-lg font-black mb-2 tracking-tight">{item.name}</h3>
                  <p className="text-xs text-[var(--text-muted)] font-medium leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Core Services Section */}
          <div className="mb-40">
            <div className="flex items-center gap-4 mb-16">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#fd9a00]/20 to-transparent" />
              <h2 className="text-[10px] font-black tracking-[0.4em] uppercase text-[#fd9a00] text-center">Core Expertise</h2>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#fd9a00]/20 to-transparent" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { 
                  name: "Custom Systems", 
                  desc: "Architecting robust ERP, CRM, and Management systems to automate your business workflow.", 
                  icon: <Database />,
                  color: "from-blue-500/20"
                },
                { 
                  name: "Bot Development", 
                  desc: "Building advanced automation bots for Telegram, Discord, and custom API integrations.", 
                  icon: <Bot />,
                  color: "from-amber-500/20"
                },
                { 
                  name: "Game Development", 
                  desc: "Creating immersive 2D/3D interactive experiences and web-based games.", 
                  icon: <Gamepad2 />,
                  color: "from-emerald-500/20"
                }
              ].map((service, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative p-10 rounded-[40px] bg-foreground/[0.02] border border-foreground/5 hover:border-[#fd9a00]/30 transition-all overflow-hidden"
                >
                  <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${service.color} blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  <div className="w-16 h-16 rounded-2xl bg-[#fd9a00]/10 text-[#fd9a00] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                    {React.cloneElement(service.icon as React.ReactElement, { className: "w-8 h-8" })}
                  </div>
                  <h3 className="text-2xl font-black mb-4 tracking-tight">{service.name}</h3>
                  <p className="text-sm text-[var(--text-muted)] font-medium leading-relaxed">{service.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-40">
            {plans.map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative p-10 rounded-[40px] border transition-all duration-500 group overflow-hidden ${
                  plan.popular ? 'bg-foreground/[0.03] border-[#fd9a00]/50 scale-105 z-10' : 'bg-foreground/[0.02] border-foreground/5'
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-8 right-8 px-4 py-1.5 rounded-full bg-[#fd9a00] text-white text-[9px] font-black tracking-[0.2em] uppercase shadow-lg z-10">
                    Most Popular
                  </div>
                )}

                <div className={`absolute -top-24 -right-24 w-64 h-64 bg-gradient-to-br ${plan.color} blur-3xl opacity-50 group-hover:opacity-80 transition-opacity duration-500`} />

                <div className="mb-10 relative z-10">
                  <h3 className="text-sm font-black tracking-[0.3em] uppercase text-[var(--text-muted)] mb-4">{plan.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black tracking-tighter">
                      {plan.price === "Custom" ? "" : "₱"}
                      {plan.price}
                    </span>
                    {plan.price !== "Custom" && <span className="text-[var(--text-muted)] font-medium text-xs ml-1 uppercase tracking-widest">Starting at</span>}
                  </div>
                  <p className="mt-4 text-[var(--text-muted)] font-medium leading-relaxed text-sm">{plan.description}</p>
                </div>

                <div className="space-y-4 mb-12 relative z-10">
                  {plan.features.map((feature, j) => (
                    <div key={j} className="flex items-center gap-3 text-sm font-medium">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center bg-foreground/5 ${plan.accent}`}>
                        <Check className="w-3 h-3" />
                      </div>
                      {feature}
                    </div>
                  ))}
                </div>

                <button 
                  onClick={openDiscovery}
                  className={`w-full py-5 rounded-2xl font-black text-xs tracking-widest transition-all relative z-10 ${
                    plan.popular ? 'bg-[#fd9a00] text-white shadow-xl shadow-[#fd9a00]/20 hover:opacity-90' : 'bg-foreground text-background hover:opacity-90'
                  }`}
                >
                  GET STARTED
                </button>
              </motion.div>
            ))}
          </div>

          {/* Tech Stack Showcase */}
          <div className="mt-40 mb-20">
            <div className="flex items-center gap-4 mb-12">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
              <h2 className="text-[10px] font-black tracking-[0.4em] uppercase text-blue-500 text-center">Elite Tech Stack</h2>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
            </div>

            <div className="relative flex overflow-hidden py-12 bg-foreground/[0.02] rounded-[40px] border border-foreground/5">
              <motion.div 
                className="flex gap-20 px-10 will-change-transform whitespace-nowrap"
                animate={{
                  x: [0, -1000],
                }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 20,
                    ease: "linear",
                  },
                }}
              >
                {[
                  "React 19", "Vite 8", "TypeScript", "Tailwind CSS 4", 
                  "Framer Motion", "GSAP", "Node.js", "Vercel", 
                  "PostgreSQL", "MongoDB", "Express", "GraphQL"
                ].map((tech, i) => (
                  <div key={i} className="flex items-center gap-3 group cursor-default">
                    <div className="w-2 h-2 rounded-full bg-[#fd9a00] group-hover:scale-150 transition-transform" />
                    <span className="text-2xl font-black tracking-tighter opacity-30 group-hover:opacity-100 group-hover:text-[#fd9a00] transition-all duration-300">
                      {tech}
                    </span>
                  </div>
                ))}
                {/* Duplicate for seamless loop */}
                {[
                  "React 19", "Vite 8", "TypeScript", "Tailwind CSS 4", 
                  "Framer Motion", "GSAP", "Node.js", "Vercel", 
                  "PostgreSQL", "MongoDB", "Express", "GraphQL"
                ].map((tech, i) => (
                  <div key={i + 100} className="flex items-center gap-3 group cursor-default">
                    <div className="w-2 h-2 rounded-full bg-[#fd9a00] group-hover:scale-150 transition-transform" />
                    <span className="text-2xl font-black tracking-tighter opacity-30 group-hover:opacity-100 group-hover:text-[#fd9a00] transition-all duration-300">
                      {tech}
                    </span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-20">
            <div className="flex items-center gap-4 mb-16">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
              <h2 className="text-[10px] font-black tracking-[0.4em] uppercase text-emerald-500 text-center">Common Questions</h2>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              {/* Column 1 */}
              <div className="space-y-6">
                {[
                  { 
                    q: "How long does a custom system development take?", 
                    a: "Timelines vary based on complexity. A standard admin dashboard typically takes 4-6 weeks, while a full-scale ERP system may take 3-6 months." 
                  },
                  { 
                    q: "What kind of bots and games do you develop?", 
                    a: "We build everything from Telegram/Discord automation bots to custom trading bots. For games, we specialize in 2D/3D web-based interactive experiences using technologies like Three.js and Unity." 
                  }
                ].map((faq, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <details className="group p-6 rounded-3xl bg-foreground/[0.02] border border-foreground/5 hover:border-[#fd9a00]/30 transition-all cursor-pointer">
                      <summary className="flex items-center justify-between list-none font-black tracking-tight text-lg">
                        {faq.q}
                        <div className="w-8 h-8 rounded-full bg-foreground/5 flex items-center justify-center group-open:rotate-180 transition-transform">
                          <Zap className="w-4 h-4 text-[#fd9a00]" />
                        </div>
                      </summary>
                      <p className="mt-4 text-[var(--text-muted)] font-medium leading-relaxed border-t border-foreground/5 pt-4 text-sm">
                        {faq.a}
                      </p>
                    </details>
                  </motion.div>
                ))}
              </div>

              {/* Column 2 */}
              <div className="space-y-6">
                {[
                  { 
                    q: "Who owns the source code after the project is finished?", 
                    a: "You do. Upon full payment, we transfer 100% ownership of the source code and all intellectual property to you." 
                  },
                  { 
                    q: "Can you migrate our existing data to a new ERP or CRM?", 
                    a: "Absolutely. We specialize in secure data migration and integration, ensuring your legacy data is perfectly mapped to your new high-performance system." 
                  }
                ].map((faq, i) => (
                  <motion.div
                    key={i + 2}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: (i + 2) * 0.1 }}
                  >
                    <details className="group p-6 rounded-3xl bg-foreground/[0.02] border border-foreground/5 hover:border-[#fd9a00]/30 transition-all cursor-pointer">
                      <summary className="flex items-center justify-between list-none font-black tracking-tight text-lg">
                        {faq.q}
                        <div className="w-8 h-8 rounded-full bg-foreground/5 flex items-center justify-center group-open:rotate-180 transition-transform">
                          <Zap className="w-4 h-4 text-[#fd9a00]" />
                        </div>
                      </summary>
                      <p className="mt-4 text-[var(--text-muted)] font-medium leading-relaxed border-t border-foreground/5 pt-4 text-sm">
                        {faq.a}
                      </p>
                    </details>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Services
