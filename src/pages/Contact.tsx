import React from 'react'
import { motion } from 'framer-motion'
import { Mail, MessageSquare, Phone, Send, Rocket } from 'lucide-react'
import Header from '../components/ui/Header'
import GridBackground from '../components/animations/GridBackground'
import BlurText from '../components/animations/BlurText'
import Footer from '../components/ui/Footer'
import { useDiscovery } from '../context/DiscoveryContext'
import { useLanguage } from '../context/LanguageContext'

const Contact: React.FC = () => {
  const { openDiscovery } = useDiscovery()
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-[var(--background)] font-sans text-foreground selection:bg-[#fd9a00]/30 overflow-x-hidden transition-colors duration-300">
      <GridBackground lineColor="rgba(168, 85, 247, 0.1)" spacing={60} />
      <Header />

      <main className="pt-40 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 text-center">
            <BlurText 
              text={t('contact.title')} 
              delay={100}
              animateBy="words"
              className="text-5xl md:text-7xl font-black tracking-tight text-foreground leading-tight justify-center mb-8"
            />
            <p className="text-xl text-[var(--text-muted)] max-w-2xl mx-auto font-medium">
              {t('contact.sub')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-12"
            >
              <div className="flex gap-8 items-start group">
                <div className="w-16 h-16 rounded-[24px] bg-[#fd9a00]/10 text-[#fd9a00] flex items-center justify-center group-hover:scale-110 group-hover:bg-[#fd9a00] group-hover:text-white transition-all duration-500 shadow-xl shadow-[#fd9a00]/5">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Email Us</h3>
                  <p className="text-[var(--text-muted)] text-lg">vibebuilds.business@gmail.com</p>
                  <p className="text-[var(--text-muted)] text-sm mt-1 uppercase tracking-widest font-black opacity-30">Response within 24h</p>
                </div>
              </div>

              <div className="flex gap-8 items-start group">
                <div className="w-16 h-16 rounded-[24px] bg-[#fd9a00]/10 text-[#fd9a00] flex items-center justify-center group-hover:scale-110 group-hover:bg-[#fd9a00] group-hover:text-white transition-all duration-500 shadow-xl shadow-[#fd9a00]/5">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Live Chat</h3>
                  <p className="text-[var(--text-muted)] text-lg">Available Mon-Fri, 9am-6pm</p>
                  <p className="text-[var(--text-muted)] text-sm mt-1 uppercase tracking-widest font-black opacity-30">Immediate Support</p>
                </div>
              </div>

              <div className="pt-8 border-t border-[var(--border)]">
                <h3 className="text-xs font-black tracking-[0.3em] text-foreground uppercase mb-8">Social Channels</h3>
                <div className="flex gap-4">
                  {[
                    { domain: 'facebook.com', href: 'https://www.facebook.com/profile.php?id=61588893476661', label: 'Facebook' },
                    { domain: 'discord.com', href: 'https://discord.gg/prVnHEmgZV', label: 'Discord' },
                    { domain: 'telegram.org', href: 'https://t.me/DynMovies', label: 'Telegram' },
                  ].map((social, i) => (
                    <motion.a
                      key={i}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      whileHover={{ y: -4, scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-14 h-14 rounded-2xl bg-foreground/5 border border-foreground/10 flex items-center justify-center grayscale hover:grayscale-0 hover:bg-[#fd9a00]/10 hover:border-[#fd9a00]/30 transition-all duration-300 group/social"
                    >
                      <img 
                        src={`https://www.google.com/s2/favicons?sz=64&domain=${social.domain}`} 
                        className="w-6 h-6" 
                        alt={social.label} 
                      />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Discovery CTA */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-12 rounded-[48px] border border-[#fd9a00]/20 bg-[#fd9a00]/5 backdrop-blur-3xl shadow-2xl relative group text-center"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-[#fd9a00] rounded-[48px] blur-2xl opacity-10 group-hover:opacity-20 transition-opacity" />
              
              <div className="relative z-10">
                <div className="w-20 h-20 rounded-[28px] bg-[#fd9a00] text-white flex items-center justify-center mx-auto mb-8 shadow-xl shadow-[#fd9a00]/30">
                  <Rocket className="w-10 h-10" />
                </div>
                <h2 className="text-3xl font-black mb-6 tracking-tight">Ready for Launch?</h2>
                <p className="text-[var(--text-muted)] text-lg mb-10 font-medium">
                  Skip the long forms. Start our interactive discovery process and let's map out your vision in under 2 minutes.
                </p>
                <button 
                  onClick={openDiscovery}
                  className="w-full py-6 rounded-2xl bg-[#fd9a00] text-white font-black text-xs tracking-[0.2em] uppercase hover:opacity-90 transition-all shadow-2xl shadow-[#fd9a00]/20 flex items-center justify-center gap-3"
                >
                  START DISCOVERY FLOW <Send className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Contact
