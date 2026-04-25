import React, { useState, useEffect, FC, cloneElement, ReactElement } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle2, ArrowRight, ArrowLeft, Laptop, Smartphone, Database, Palette, Gamepad2, Send, Loader2, Bot, BookOpen } from 'lucide-react'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'

import toast from 'react-hot-toast'

interface DiscoveryModalProps {
  isOpen: boolean
  onClose: () => void
}

const DiscoveryModal: FC<DiscoveryModalProps> = ({ isOpen, onClose }) => {
  const { executeRecaptcha } = useGoogleReCaptcha()
  const [step, setStep] = useState(1)
  const [isVerifying, setIsVerifying] = useState(false)
  const [formData, setFormData] = useState({
    type: '',
    budget: '',
    otherBudget: '',
    name: '',
    email: '',
    message: '',
    hp: '' // Honeypot field
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleNext = () => setStep(prev => prev + 1)
  const handleBack = () => setStep(prev => prev - 1)
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // 1. Honeypot check
    if (formData.hp) {
      console.log('Bot detected via honeypot')
      return
    }

    if (!executeRecaptcha) {
      toast.error('ReCAPTCHA not ready. Please try again.')
      return
    }

    // 2. Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsVerifying(true)

    try {
      // 2. Execute reCAPTCHA v3
      const token = await executeRecaptcha('discovery_submission')
      
      // 3. Send to API
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          recaptchaToken: token // You can verify this on the backend if needed
        }),
      });

      if (response.ok) {
        toast.success('Vision received! We will contact you soon.', {
          icon: '🚀',
          duration: 6000
        })
        setIsVerifying(false)
        setIsSubmitted(true)
      } else {
        const errorData = await response.json().catch(() => ({ error: 'Server error: Check if backend is running' }));
        throw new Error(errorData.error || 'Failed to send discovery');
      }
      
    } catch (error: any) {
      console.error('Submission Error:', error)
      toast.error(error.message || 'Something went wrong. Please try again.')
      setIsVerifying(false)
    }
  }

  const projectTypes = [
    { id: 'web', label: 'Web Application', icon: <Laptop /> },
    { id: 'mobile', label: 'Mobile App', icon: <Smartphone /> },
    { id: 'system', label: 'Custom System', icon: <Database /> },
    { id: 'bot', label: 'Bot Development', icon: <Bot /> },
    { id: 'game', label: 'Game Development', icon: <Gamepad2 /> },
    { id: 'academic', label: 'Academic / Research', icon: <BookOpen /> },
    { id: 'design', label: 'UI/UX Design', icon: <Palette /> },
  ]

  const budgetRanges = [
    { id: 'academic', label: '₱2,000 - ₱10,000 (Academic)' },
    { id: 'basic', label: '₱20k - ₱145k' },
    { id: 'standard', label: '₱145k - ₱500k' },
    { id: 'premium', label: '₱500k+' },
    { id: 'custom', label: 'Custom / Specify' },
  ]

  // Reset modal state when closed
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep(1)
        setIsSubmitted(false)
        setFormData({ type: '', budget: '', name: '', email: '', message: '' })
      }, 300)
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 md:p-6">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-background/80 backdrop-blur-xl"
          />

          {/* Modal Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-2xl bg-foreground/[0.03] border border-foreground/10 rounded-[40px] shadow-2xl overflow-hidden backdrop-blur-3xl max-h-[90vh] flex flex-col"
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 md:top-8 md:right-8 w-10 h-10 rounded-full bg-foreground/5 flex items-center justify-center hover:bg-foreground/10 transition-colors z-30"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-8 md:p-12 overflow-y-auto custom-scrollbar">
              {!isSubmitted ? (
                <>
                  <div className="mb-10">
                    <div className="flex justify-between text-[10px] font-black tracking-widest uppercase text-[#fd9a00] mb-3 pr-12">
                      <span>Step {step} of 3</span>
                      <span>Discovery Phase</span>
                    </div>
                    <div className="h-1 w-full bg-foreground/5 rounded-full overflow-hidden">
                      <motion.div 
                        animate={{ width: `${(step / 3) * 100}%` }}
                        className="h-full bg-[#fd9a00]"
                      />
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    {step === 1 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="min-h-[300px]"
                      >
                        <h2 className="text-3xl font-black mb-8 tracking-tight">What's the vision?</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {projectTypes.map((type) => (
                            <button
                              key={type.id}
                              onClick={() => setFormData({ ...formData, type: type.label })}
                              className={`p-6 rounded-2xl border flex items-center gap-4 transition-all ${
                                formData.type === type.label 
                                  ? 'border-[#fd9a00] bg-[#fd9a00]/10 text-[#fd9a00]' 
                                  : 'border-foreground/5 bg-foreground/[0.02] hover:border-foreground/20'
                              }`}
                            >
                              <div className="w-10 h-10 rounded-xl bg-foreground/5 flex items-center justify-center">
                                {cloneElement(type.icon as ReactElement, { className: "w-5 h-5" })}
                              </div>
                              <span className="font-bold text-sm">{type.label}</span>
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {step === 2 && (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="min-h-[300px]"
                      >
                        <h2 className="text-3xl font-black mb-8 tracking-tight">Budget range?</h2>
                        <div className="grid grid-cols-1 gap-4">
                          {budgetRanges.map((range) => (
                            <div key={range.id} className="space-y-4">
                              <button
                                onClick={() => setFormData({ ...formData, budget: range.label })}
                                className={`w-full p-6 rounded-2xl border flex items-center justify-between transition-all ${
                                  formData.budget === range.label 
                                    ? 'border-[#fd9a00] bg-[#fd9a00]/10 text-[#fd9a00]' 
                                    : 'border-foreground/5 bg-foreground/[0.02] hover:border-foreground/20'
                                }`}
                              >
                                <span className="font-bold text-lg">{range.label}</span>
                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                                  formData.budget === range.label ? 'border-[#fd9a00] bg-[#fd9a00]' : 'border-foreground/20'
                                }`}>
                                  {formData.budget === range.label && <CheckCircle2 className="w-4 h-4 text-white" />}
                                </div>
                              </button>
                              
                              {range.id === 'custom' && formData.budget === 'Custom / Specify' && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  className="px-2 pb-2"
                                >
                                  <input 
                                    type="text" 
                                    placeholder="Enter your budget (e.g. ₱300k - ₱400k)"
                                    value={formData.otherBudget}
                                    onChange={(e) => setFormData({ ...formData, otherBudget: e.target.value })}
                                    className="w-full px-6 py-4 rounded-2xl bg-foreground/5 border border-[#fd9a00]/30 focus:border-[#fd9a00] focus:outline-none placeholder:text-foreground/30 font-medium"
                                    autoFocus
                                  />
                                </motion.div>
                              )}
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {step === 3 && (
                      <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="min-h-[300px] space-y-6"
                      >
                        <h2 className="text-3xl font-black mb-8 tracking-tight">Who are you?</h2>
                        <div className="space-y-4">
                          <input 
                            type="text" 
                            placeholder="Full Name" 
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-6 py-4 rounded-2xl bg-foreground/5 border border-foreground/10 focus:border-[#fd9a00]/50 focus:outline-none" 
                          />
                          <input 
                            type="email" 
                            placeholder="Email Address" 
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-6 py-4 rounded-2xl bg-foreground/5 border border-foreground/10 focus:border-[#fd9a00]/50 focus:outline-none" 
                          />
                          <textarea 
                            placeholder="Briefly describe your vision..." 
                            rows={3}
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            className="w-full px-6 py-4 rounded-2xl bg-foreground/5 border border-foreground/10 focus:border-[#fd9a00]/50 focus:outline-none resize-none"
                          />
                          
                          {/* Honeypot Field - Invisible to humans */}
                          <input 
                            type="text" 
                            name="hp" 
                            style={{ display: 'none' }} 
                            tabIndex={-1} 
                            autoComplete="off"
                            value={formData.hp}
                            onChange={(e) => setFormData({ ...formData, hp: e.target.value })}
                          />
                        </div>
                        
                        {/* reCAPTCHA Compliance Text */}
                        <div className="text-[10px] text-[var(--text-muted)] text-center mt-6 font-medium leading-relaxed opacity-60">
                          This site is protected by reCAPTCHA and the Google <br/>
                          <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className="underline hover:text-[#fd9a00]">Privacy Policy</a> and <a href="https://policies.google.com/terms" target="_blank" rel="noreferrer" className="underline hover:text-[#fd9a00]">Terms of Service</a> apply.
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="flex gap-4 mt-12">
                    {step > 1 && !isVerifying && (
                      <button 
                        onClick={handleBack}
                        className="px-6 md:px-8 py-5 rounded-2xl border border-foreground/10 font-black text-[10px] tracking-widest hover:bg-foreground/5 transition-all flex items-center gap-2"
                      >
                        <ArrowLeft className="w-4 h-4" /> <span className="hidden sm:inline">BACK</span>
                      </button>
                    )}
                    {step < 3 ? (
                      <button 
                        disabled={
                          step === 1 ? !formData.type : 
                          step === 2 ? (!formData.budget || (formData.budget === 'Custom / Specify' && !formData.otherBudget)) :
                          false
                        }
                        onClick={handleNext}
                        className="flex-1 py-5 rounded-2xl bg-[#fd9a00] text-white font-black text-[10px] tracking-widest hover:opacity-90 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-[#fd9a00]/20"
                      >
                        NEXT STEP <ArrowRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <button 
                        disabled={!formData.name || !formData.email || isVerifying}
                        onClick={handleSubmit}
                        className="flex-1 py-5 rounded-2xl bg-[#fd9a00] text-white font-black text-[10px] tracking-widest hover:opacity-90 transition-all flex items-center justify-center gap-3 disabled:opacity-50 shadow-xl shadow-[#fd9a00]/20"
                      >
                        {isVerifying ? (
                          <>VERIFYING... <Loader2 className="w-4 h-4 animate-spin" /></>
                        ) : (
                          <>SUBMIT DISCOVERY <Send className="w-4 h-4" /></>
                        )}
                      </button>
                    )}
                  </div>
                </>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="min-h-[450px] flex flex-col items-center justify-center text-center"
                >
                  <div className="w-24 h-24 rounded-[32px] bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-8">
                    <CheckCircle2 className="w-12 h-12" />
                  </div>
                  <h2 className="text-4xl font-black mb-4 tracking-tight">Discovery Sent!</h2>
                  <p className="text-[var(--text-muted)] text-lg mb-8 max-w-sm font-medium">
                    Our architects are reviewing your vision. Expect a response within 24 hours.
                  </p>
                  <button 
                    onClick={onClose}
                    className="px-12 py-5 rounded-2xl bg-[#fd9a00] text-white font-black text-[10px] tracking-widest hover:opacity-90 transition-all shadow-xl shadow-[#fd9a00]/20"
                  >
                    CLOSE WINDOW
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default DiscoveryModal
