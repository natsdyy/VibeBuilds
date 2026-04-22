import React from 'react'
import { motion } from 'framer-motion'
import { Mail, MessageSquare, Phone, Send } from 'lucide-react'
import Header from '../components/ui/Header'
import GridBackground from '../components/animations/GridBackground'
import BlurText from '../components/animations/BlurText'

const Contact: React.FC = () => {
  return (
    <div className="min-h-screen bg-[var(--background)] font-sans text-foreground selection:bg-purple-500/30 overflow-x-hidden transition-colors duration-300">
      <GridBackground lineColor="rgba(168, 85, 247, 0.1)" spacing={60} />
      <Header />

      <main className="pt-40 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 text-center">
            <BlurText 
              text="Let's Build Something Great" 
              delay={100}
              animateBy="words"
              className="text-5xl md:text-7xl font-black tracking-tight text-foreground leading-tight justify-center mb-8"
            />
            <p className="text-xl text-[var(--text-muted)] max-w-2xl mx-auto font-medium">
              Ready to start your next project? Get in touch with our team today.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* Contact Info */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-12"
            >
              <div className="flex gap-8 items-start group">
                <div className="w-16 h-16 rounded-[24px] bg-purple-500/10 text-purple-500 flex items-center justify-center group-hover:scale-110 group-hover:bg-purple-500 group-hover:text-white transition-all duration-500 shadow-xl shadow-purple-500/5">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Email Us</h3>
                  <p className="text-[var(--text-muted)] text-lg">hello@vibebuilds.com</p>
                  <p className="text-[var(--text-muted)] text-sm mt-1 uppercase tracking-widest font-black opacity-30">Response within 24h</p>
                </div>
              </div>

              <div className="flex gap-8 items-start group">
                <div className="w-16 h-16 rounded-[24px] bg-purple-500/10 text-purple-500 flex items-center justify-center group-hover:scale-110 group-hover:bg-purple-500 group-hover:text-white transition-all duration-500 shadow-xl shadow-purple-500/5">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Live Chat</h3>
                  <p className="text-[var(--text-muted)] text-lg">Available Mon-Fri, 9am-6pm</p>
                  <p className="text-[var(--text-muted)] text-sm mt-1 uppercase tracking-widest font-black opacity-30">Immediate Support</p>
                </div>
              </div>

              <div className="flex gap-8 items-start group">
                <div className="w-16 h-16 rounded-[24px] bg-purple-500/10 text-purple-500 flex items-center justify-center group-hover:scale-110 group-hover:bg-purple-500 group-hover:text-white transition-all duration-500 shadow-xl shadow-purple-500/5">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Call Us</h3>
                  <p className="text-[var(--text-muted)] text-lg">+1 (555) 123-4567</p>
                  <p className="text-[var(--text-muted)] text-sm mt-1 uppercase tracking-widest font-black opacity-30">Worldwide Coverage</p>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-10 rounded-[40px] border border-[var(--border)] bg-foreground/[0.02] backdrop-blur-3xl shadow-2xl relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-[40px] blur-2xl opacity-0 group-hover:opacity-10 transition-opacity" />
              <form className="space-y-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black tracking-[0.2em] uppercase text-[var(--text-muted)] ml-2">Full Name</label>
                    <input type="text" placeholder="John Doe" className="w-full px-6 py-4 rounded-2xl bg-foreground/5 border border-foreground/10 focus:border-purple-500/50 focus:outline-none transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black tracking-[0.2em] uppercase text-[var(--text-muted)] ml-2">Email Address</label>
                    <input type="email" placeholder="john@example.com" className="w-full px-6 py-4 rounded-2xl bg-foreground/5 border border-foreground/10 focus:border-purple-500/50 focus:outline-none transition-all" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black tracking-[0.2em] uppercase text-[var(--text-muted)] ml-2">Message</label>
                  <textarea rows={4} placeholder="Tell us about your vision..." className="w-full px-6 py-4 rounded-2xl bg-foreground/5 border border-foreground/10 focus:border-purple-500/50 focus:outline-none transition-all resize-none"></textarea>
                </div>
                <button className="w-full py-5 rounded-2xl bg-foreground text-background font-black text-sm tracking-widest hover:opacity-90 transition-all flex items-center justify-center gap-3">
                  SEND MESSAGE <Send className="w-4 h-4" />
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </main>

      <footer className="py-20 border-t border-[var(--border)] bg-[var(--background)] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
           <div className="text-[10px] font-black tracking-widest text-foreground/10 uppercase">© 2026 VibeBuilds Digital</div>
           <div className="flex gap-8 text-[10px] font-black tracking-widest text-[var(--text-muted)]">
              <a href="#" className="hover:text-foreground transition-colors uppercase">Privacy</a>
              <a href="#" className="hover:text-foreground transition-colors uppercase">Terms</a>
            </div>
        </div>
      </footer>
    </div>
  )
}

export default Contact
