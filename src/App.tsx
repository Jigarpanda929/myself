import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Database, 
  Settings, 
  Users, 
  Zap, 
  Mail, 
  Linkedin, 
  ArrowRight, 
  ChevronRight,
  Target,
  BarChart3,
  Cpu,
  MousePointerClick,
  Home,
  CheckCircle2,
  Clock,
  Shield,
  Star,
  Globe,
  Twitter,
  Menu,
  ChevronDown,
  X,
  Search,
  Rocket,
  Puzzle,
  Send,
  FileText
} from 'lucide-react';

// --- DATA ---

const NAV_LINKS = [
  { name: 'Experience', href: '#problem' },
  { name: 'Execution', href: '#work' },
  { name: 'Systems', href: '#process' },
  { name: 'Services', href: '#services' },
  { name: 'FAQ', href: '#faq' },
  { name: 'Contact', href: '#contact' },
];

const WHY_CARDS = [
  { icon: Clock, title: "5+ years supporting US-based real estate professionals" },
  { icon: Shield, title: "Deep knowledge of Airbnb, MLS workflows, and transaction timelines" },
  { icon: Users, title: "Clear, proactive communication — you'll never wonder what's happening" },
  { icon: Target, title: "Detail-oriented approach that catches issues before they become problems" },
];

const SERVICES = [
  {
    icon: Home,
    title: "Airbnb & Short-Term Rental Management",
    desc: "Guest communication, listing optimization, calendar sync, pricing updates, and review management — keeping your occupancy high and guests happy."
  },
  {
    icon: CheckCircle2,
    title: "Real Estate Transaction Coordination",
    desc: "Contract-to-close support including deadline tracking, documentation, agent coordination, and compliance — so nothing falls through the cracks."
  },
  {
    icon: Database,
    title: "CRM & Admin Support",
    desc: "LoftyCRM, HubSpot, Follow Up Boss management plus email, scheduling, data entry, and research — your operations run smoothly behind the scenes."
  },
  {
    icon: MousePointerClick,
    title: "Marketing Support",
    desc: "Canva graphics, social media content, email campaigns, and listing presentations — keeping your brand visible without you lifting a finger."
  }
];

const RESULTS = [
  { metric: "20+", label: "Hours saved per week" },
  { metric: "5+", label: "Years of RE experience" },
  { metric: "100%", label: "Deadline compliance" },
  { metric: "20+", label: "Clients supported" }
];

const TOOLS = [
  "LoftyCRM", "HubSpot", "Follow Up Boss", "Guesty", "Hospitable", 
  "Airbnb Host Portal", "Google Workspace", "Canva", "Trello", 
  "Asana", "Slack", "Zoom", "DocuSign", "Dotloop", "Mailchimp"
];

const PROCESS = [
  { id: "01", title: "Quick Setup", desc: "Start quickly with a simple, hassle-free setup. No complex steps — begin instantly and focus on results." },
  { id: "02", title: "Smooth Workflow", desc: "Experience a seamless flow from start to finish. Each step is well-organized, reducing delays." },
  { id: "03", title: "User-Friendly", desc: "Designed to be simple for everyone. Clear steps make the process accessible from day one." },
  { id: "04", title: "Fast Results", desc: "Achieve high-quality outcomes quickly. Efficient execution ensures timely delivery every time." }
];

const TESTIMONIALS = [
  {
    author: "Sarah Mitchell",
    role: "Real Estate Agent, Austin TX",
    initials: "SM",
    quote: "Jigar completely transformed how I manage transactions. I used to spend hours on paperwork — now I focus on clients while everything runs like clockwork behind the scenes."
  },
  {
    author: "David Chen",
    role: "Airbnb Superhost, Miami FL",
    initials: "DC",
    quote: "My guest ratings jumped to 4.9 after Jigar took over guest communication and listing management. Responsive, detail-oriented, and genuinely proactive."
  },
  {
    author: "Rachel Thompson",
    role: "Property Manager, Denver CO",
    initials: "RT",
    quote: "I've worked with several VAs before. Jigar is the first one who actually understood real estate workflows without needing constant training. Absolute game-changer."
  }
];

const PROJECTS = [
  {
    title: "Luxury Airbnb Chain Management",
    client: "Short-Term stays, Florida",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    tags: ["Listing Optimization", "Guest Comm", "Pricing"],
    link: "#"
  },
  {
    title: "Commercial Contract Close",
    client: "Realty Group, Denver",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    tags: ["Compliance", "TC", "Documentation"],
    link: "#"
  },
  {
    title: "CRM Automation Setup",
    client: "Independent Broker, TX",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    tags: ["LoftyCRM", "HubSpot", "Zapier"],
    link: "#"
  }
];

const FAQS = [
  {
    question: "Do you have experience with US-based real estate laws?",
    answer: "Yes, I have 5+ years of experience working exclusively with US-based agents and property managers, ensuring full compliance with state-specific documentation and transaction requirements."
  },
  {
    question: "What CRM tools do you support?",
    answer: "I am an expert in LoftyCRM (formerly Chime), HubSpot, Follow Up Boss, and many others. I can handle database management, lead nurturing, and automation setup."
  },
  {
    question: "How do we handle timezone differences?",
    answer: "I align my work hours with your preferred US timezone (EST/CST/PST) to ensure seamless, real-time collaboration and fast response times."
  },
  {
    question: "What is your typical onboarding process?",
    answer: "We start with a discovery call, followed by a shared access setup for your tools. I can usually begin supporting your business within 48-72 hours."
  }
];

// --- COMPONENTS ---

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] // Custom quint ease-out
    } 
  }
};

const stagger = {
  show: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

const SectionHeading = ({ subtitle, title, light = false, align = 'center', subtitleClassName = '', className = '' }: { subtitle: string, title: string | React.ReactNode, light?: boolean, align?: 'left' | 'center', subtitleClassName?: string, className?: string }) => (
  <div className={`${className || 'mb-8 md:mb-9'} ${align === 'center' ? 'text-center' : 'text-left'}`}>
    <motion.span 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`font-bold uppercase tracking-[0.2em] text-yellow-500 mb-2 block ${subtitleClassName || 'text-[18px]'}`}
    >
      {subtitle}
    </motion.span>
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`text-4xl md:text-6xl font-poppins font-bold leading-tight ${light ? 'text-white' : 'text-gradient'}`}
    >
      {title}
    </motion.h2>
  </div>
);

const FAQItem = ({ question, answer }: { question: string, answer: string, key?: React.Key }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-zinc-200 py-5">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-left group"
      >
        <span className="text-xl font-bold text-zinc-950 group-hover:text-yellow-600 transition-colors uppercase tracking-tight">{question}</span>
        <div className={`w-8 h-8 rounded-full border border-zinc-200 bg-white flex items-center justify-center text-zinc-700 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <ChevronDown className="w-4 h-4" />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pt-4 pb-5 text-zinc-600 text-lg leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Card = ({ children, className = '', ...props }: any) => (
  <motion.div 
    variants={fadeUp}
    className={`glass-card p-6 md:p-8 group transition-all duration-300 ${className}`}
    {...props}
  >
    {children}
  </motion.div>
);

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-night-gradient text-white selection:bg-yellow-500/30 selection:text-white font-sans">
      {/* Background Ambience */}
      <div className="fixed inset-0 z-[-1] pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[80%] h-[80%] bg-amber-900/10 blur-[130px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[80%] h-[80%] bg-orange-900/10 blur-[130px] rounded-full" />
      </div>

      {/* Navigation */}
      <nav 
        className={`fixed top-4 md:top-5 left-0 right-0 z-50 transition-all duration-500 px-6`}
      >
        <div className={`bg-night-panel mx-auto flex w-full max-w-7xl items-center justify-between px-2 py-2 rounded-2xl border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)] backdrop-blur-2xl transition-all duration-500 ${isScrolled ? 'scale-95' : 'scale-100'}`}>
          {/* Logo Area */}
          <div className="px-6 py-2 border-r border-white/10 flex shrink-0 flex-col items-start gap-0.5">
            <span className="font-signature text-2xl text-white leading-tight">Jigar Panda</span>
            <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-yellow-500/80">Operation Executive</span>
          </div>

          {/* Navigation Links */}
          <div className="hidden flex-1 items-center justify-center px-4 gap-8 lg:flex">
            {NAV_LINKS.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-[13px] font-medium text-white/70 hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* CTA Area */}
          <div className="flex shrink-0 items-center gap-3 pl-4 border-l border-white/10 lg:border-l lg:ml-2">
            <a 
              href="mailto:jpbmu93@gmail.com" 
              className="px-8 py-3 rounded-xl bg-linear-to-r from-orange-400 to-orange-600 text-black font-extrabold text-[12px] uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all shadow-[0_0_20px_rgba(234,146,8,0.3)]"
            >
              BOOK A CALL
            </a>
            <button className="lg:hidden w-10 h-10 rounded-xl flex items-center justify-center text-zinc-400 hover:text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="bg-night-panel fixed inset-0 z-40 backdrop-blur-2xl p-10 flex flex-col items-center justify-center gap-10"
          >
            {NAV_LINKS.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-4xl font-poppins font-bold" 
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <a 
              href="mailto:jpbmu93@gmail.com" 
              className="text-4xl font-poppins font-bold text-orange-500" 
              onClick={() => setMobileMenuOpen(false)}
            >
              BOOK A CALL
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* HERO */}
        <section className="relative pt-28 pb-12 md:pt-40 md:pb-16 px-6 overflow-hidden">
          {/* Animated Background Decoration */}
          <div className="absolute top-[20%] right-[10%] w-64 h-64 bg-yellow-500/5 blur-[100px] rounded-full animate-pulse" />
          
          {/* Subtle Grid Background from Sample */}
          <div className="absolute inset-0 opacity-[0.03] z-0 pointer-events-none" 
            style={{ 
              backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
              backgroundSize: '40px 40px' 
            }} 
          />
          
          <div className="container mx-auto max-w-7xl grid lg:grid-cols-2 gap-12 md:gap-14 items-center">
            <motion.div
              initial="hidden"
              animate="show"
              variants={stagger}
            >
              <motion.div variants={fadeUp} className="inline-flex items-center gap-3 px-5 py-2 glass rounded-full border border-yellow-500/30 mb-8 shadow-lg shadow-yellow-500/5">
                <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(234,179,8,0.8)]" />
                <span className="text-[17px] font-bold uppercase tracking-[0.12em] text-yellow-500">Real Estate VA & Operations Executive</span>
              </motion.div>
              
              <motion.h1 variants={fadeUp} className="text-[30px] md:text-[50px] font-poppins font-bold leading-[1.25] mb-4 tracking-tighter">
                Close More Deals While I Handle <br />
                <span className="text-yellow-500 ">Everything Behind the Scenes</span>
              </motion.h1>
              
              <motion.p variants={fadeUp} className="text-zinc-400 text-lg md:text-xl max-w-xl leading-relaxed mb-6">
                I help real estate agents, Airbnb hosts, and property managers save 20+ hours a week — with expert transaction coordination, CRM management, and listing support.
              </motion.p>
              
              <div className="flex flex-wrap gap-4 mb-6">
                {["5+ years with US clients", "Real estate specialized", "Proactive & reliable"].map((text) => (
                  <motion.div 
                    key={text} 
                    variants={fadeUp}
                    className="flex items-center gap-2 px-4 py-2 glass border border-white/5 rounded-lg text-xs font-medium text-zinc-300"
                  >
                    <CheckCircle2 className="w-3 h-3 text-yellow-500" /> {text}
                  </motion.div>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <motion.a 
                  variants={fadeUp}
                  href="mailto:jpbmu93@gmail.com" 
                  className="px-10 py-5 rounded-2xl bg-white text-black font-bold flex items-center justify-center gap-3 hover:bg-yellow-600 hover:text-white transition-all active:scale-95 group shadow-2xl shadow-white/10 hover:shadow-yellow-600/30"
                >
                  BOOK A CALL <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.a>
                <motion.a 
                  variants={fadeUp}
                  href="#services" 
                  className="px-10 py-5 rounded-2xl glass border border-white/10 font-bold flex items-center justify-center hover:bg-white/5 transition-all active:scale-95"
                >
                  View My Services
                </motion.a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative hidden lg:flex flex-col items-center justify-center min-h-[700px] gap-12"
            >
              {/* Central Portrait Container */}
              <div className="relative group">
                <div className="relative z-10 w-80 h-96 rounded-[2rem] overflow-hidden border-4 border-white/10 shadow-[0_0_60px_rgba(234,179,8,0.1)] transition-all duration-700">
                  <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-transparent to-transparent z-10 opacity-60" />
                  <img 
                    src="/protfolio.jpg" 
                    alt="Jigar Panda Portfolio" 
                    className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000 grayscale-[0.2] group-hover:grayscale-0"
                    onError={(e) => {
                      // Fallback to a professional placeholder if the image fails to load
                      e.currentTarget.src = "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80&auto=format";
                    }}
                  />
                  <div className="absolute inset-0 bg-yellow-500/5 mix-blend-overlay group-hover:bg-transparent transition-all duration-500" />
                </div>
                
                {/* Decorative Accent behind photo */}
                <div className="absolute -inset-4 bg-linear-to-tr from-yellow-500/20 to-transparent blur-2xl rounded-[3rem] -z-10 group-hover:scale-110 transition-transform duration-700" />
              </div>

              {/* Service Labels Grid Below the Image */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="grid grid-cols-2 gap-4 w-full max-w-xl"
              >
                {[
                  { icon: Search, label: "CRM Automation", sub: "Strategy" },
                  { icon: BarChart3, label: "CRM Management", sub: "Operations" },
                  { icon: Rocket, label: "Marketing Support", sub: "Execution" },
                  { icon: Puzzle, label: "property management", sub: "Integration" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-zinc-900/50 backdrop-blur-xl border border-white/10 hover:border-yellow-500/50 transition-all hover:bg-zinc-900/80 group">
                    <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center text-yellow-500 group-hover:bg-yellow-500 group-hover:text-black transition-all">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-0.5">{item.sub}</p>
                      <p className="text-sm font-bold text-white whitespace-nowrap">{item.label}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
              
              {/* Background Glows */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-yellow-500/5 blur-[120px] rounded-full pointer-events-none z-[-1]" />
              
              {/* Extra Decorative Elements (Paper Plane & Document from sample) */}
              <motion.div 
                initial={{ opacity: 0, x: -50, y: 50, rotate: -20 }}
                animate={{ opacity: 0.3, x: 0, y: 0, rotate: -15 }}
                transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
                className="absolute top-20 left-[-15%] text-yellow-500/30"
              >
                <div className="relative">
                  <Send className="w-20 h-20 rotate-[-45deg] blur-[0.5px]" />
                  <div className="absolute inset-0 bg-yellow-500/20 blur-xl rounded-full -z-10" />
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: 50, y: -50, rotate: 10 }}
                animate={{ opacity: 0.25, x: 0, y: 0, rotate: 5 }}
                transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
                className="absolute bottom-10 right-[-15%] text-yellow-500/20 bg-zinc-900/40 p-4 rounded-xl border border-white/5 backdrop-blur-sm"
              >
                <div className="relative">
                  <FileText className="w-16 h-16" />
                  <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-yellow-500/20 border border-yellow-500/40 flex items-center justify-center">
                    <p className="text-[8px] font-black uppercase text-yellow-500 rotate-12">PAID</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Hero Section Footer Headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="container mx-auto max-w-7xl mt-8 pt-8 border-t border-white/5"
          >
            <div className="text-center max-w-4xl mx-auto">
              <h3 className="text-2xl md:text-4xl font-poppins font-black text-white px-4 tracking-tight leading-tight uppercase">
                VIRTUAL ASSISTANT EXPERT REVEALS HIS <br className="hidden md:block" />
                <span className="text-yellow-500">PLUG AND PLAY SYSTEM</span> TO:
              </h3>
            </div>
          </motion.div>
        </section>

        {/* WHY TRUST ME (PROBLEM) */}
        <section id="problem" className="py-24 md:py-28 px-6 bg-white">
          <div className="container mx-auto max-w-7xl">
            <SectionHeading 
              subtitle="Why Trust Me" 
              title={
                <>
                  <span className="text-zinc-950">Why Clients Trust Me With</span>
                  <br />
                  <span className="text-yellow-600">Their Business</span>
                </>
              } 
            />
            
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center text-zinc-600 text-lg max-w-2xl mx-auto mb-12 leading-relaxed"
            >
              Most virtual assistants are generalists. I'm not. For 5+ years I've worked exclusively with US-based
              real estate professionals — learning the language, tools, and timelines of the industry from the inside.
            </motion.p>
            
            <motion.div 
              initial="hidden"
              whileInView="show"
              variants={stagger}
              viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-6"
            >
              {WHY_CARDS.map((card, i) => (
                <Card key={i} className="flex gap-6 items-start border border-zinc-200 bg-white/90 shadow-[0_20px_45px_rgba(24,24,27,0.08)] transition-all duration-300 hover:border-yellow-600 hover:bg-yellow-600 group">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border border-yellow-100 bg-yellow-50 text-yellow-600 transition-colors duration-300 group-hover:border-white/40 group-hover:bg-white/10 group-hover:text-white">
                    <card.icon className="w-6 h-6" />
                  </div>
                  <p className="text-lg font-medium text-zinc-800 leading-snug pt-2 transition-colors duration-300 group-hover:text-white">
                    {card.title}
                  </p>
                </Card>
              ))}
            </motion.div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="bg-night-gradient py-24 md:py-28 px-6">
          <div className="container mx-auto max-w-7xl">
            <SectionHeading 
              subtitle="What I Do" 
              subtitleClassName="text-[18px]"
              title={<>Services Built for <br /><span className="text-yellow-600">Real Estate Professionals</span></>} 
            />
            
            <motion.div 
              initial="hidden"
              whileInView="show"
              variants={stagger}
              viewport={{ once: true }}
              className="grid lg:grid-cols-2 gap-8"
            >
              {SERVICES.map((s, i) => (
                <Card key={i}>
                  <div className="bg-night-panel w-14 h-14 rounded-2xl flex items-center justify-center mb-8 border border-white/5 text-yellow-400">
                    <s.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-display font-bold mb-4 group-hover:text-yellow-400 transition-colors">{s.title}</h3>
                  <p className="text-zinc-400 leading-relaxed">
                    {s.desc}
                  </p>
                </Card>
              ))}
            </motion.div>
          </div>
        </section>

        {/* WORK / PROJECTS */}
        <section id="work" className="py-24 md:py-28 px-6 bg-white">
          <div className="container mx-auto max-w-7xl">
            <SectionHeading 
              subtitle="Case Studies" 
              title={<> <span className="text-zinc-950">Selected</span> <span className="text-yellow-600">Client Wins</span></>} 
            />
            
            <div className="grid md:grid-cols-3 gap-8">
              {PROJECTS.map((project, i) => (
                <motion.div 
                  key={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="group relative overflow-hidden rounded-3xl"
                >
                  <div className="aspect-[4/5] overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-900/35 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map(tag => (
                        <span key={tag} className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 glass rounded-md text-yellow-500/80">{tag}</span>
                      ))}
                    </div>
                    <h3 className="text-2xl font-display font-bold mb-2 group-hover:text-yellow-400 transition-colors">{project.title}</h3>
                    <p className="text-zinc-500 text-sm">{project.client}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* RESULTS (PROOF) */}
        <section id="testimonials" className="py-24 md:py-28 px-6 relative overflow-hidden">
          <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-full h-[50%] bg-amber-900/10 blur-[150px] rounded-full z-[-1]" />
          
          <div className="container mx-auto max-w-7xl">
            <SectionHeading 
              subtitle="Results" 
              title={<>Real Impact on <span className="text-yellow-500">Your Business</span></>} 
            />
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {RESULTS.map((r, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card p-8 md:p-10 text-center flex flex-col items-center group cursor-default"
                >
                  <strong className="block text-6xl font-display font-bold text-white mb-4 group-hover:text-yellow-400 group-hover:scale-110 transition-all duration-500 italic">
                    {r.metric}
                  </strong>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 group-hover:text-yellow-300 transition-colors">
                    {r.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* TOOLS TRACK */}
        <section className="py-16 md:py-20 overflow-hidden border-y border-zinc-200 bg-white">
          <div className="container mx-auto px-6 mb-10 text-center">
            <span className="relative inline-flex items-center justify-center px-8 py-4">
              <span className="absolute inset-0 rounded-full border border-yellow-500/40 bg-yellow-100/60 blur-[1px]" />
              <span className="absolute inset-x-3 inset-y-1 rounded-full border border-yellow-600/20" />
              <span className="relative text-[18px] font-bold uppercase tracking-[0.3em] text-zinc-700">I Already Know Your Stack</span>
            </span>
          </div>
          
          <div className="relative flex whitespace-nowrap overflow-hidden">
            <div className="flex animate-scroll hover:pause">
              {[...TOOLS, ...TOOLS].map((tool, i) => (
                <div key={i} className="mx-4 px-8 py-4 rounded-2xl border border-zinc-200 bg-white text-lg font-medium text-zinc-700 shadow-[0_12px_30px_rgba(24,24,27,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-yellow-500/60 hover:bg-yellow-50 hover:text-yellow-700 hover:shadow-[0_18px_36px_rgba(161,98,7,0.18)]">
                  {tool}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section id="process" className="pt-24 pb-12 md:pt-28 md:pb-16 px-6">
          <div className="container mx-auto max-w-7xl">
            <SectionHeading 
              subtitle="How I Work" 
              className="mb-6"
              title={<>Simple, <span className="text-yellow-500">Seamless Process</span></>} 
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
              {/* Connector Line (Desktop) */}
              <div className="hidden lg:block absolute top-[50px] left-[10%] right-[10%] h-[1px] bg-white/5 z-0" />
              
              {PROCESS.map((step, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="relative z-10 flex flex-col items-center text-center group"
                >
                  <div className="bg-night-panel w-24 h-24 rounded-full glass border-2 border-white/5 flex items-center justify-center mb-8 group-hover:border-yellow-500 transition-all duration-500">
                    <span className="text-4xl font-display font-bold text-gradient">{step.id}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section id="testimonials" className="py-24 md:py-28 px-6">
          <div className="container mx-auto max-w-7xl">
            <SectionHeading 
              subtitle="Client Stories" 
              title={<>What It's Like <span className="text-yellow-600 italic">Working With Me</span></>} 
            />
            
            <div className="grid lg:grid-cols-3 gap-8">
              {TESTIMONIALS.map((testi, i) => (
                <Card key={i} className="relative flex flex-col h-full hover:shadow-[0_20px_50px_rgba(234,179,8,0.15)] overflow-hidden">
                  {/* Decorative shimmer */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-yellow-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="mb-8 flex gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                  
                  <blockquote className="text-zinc-300 text-lg leading-relaxed italic mb-10 flex-grow">
                    "{testi.quote}"
                  </blockquote>
                  
                  <div className="flex items-center gap-4 border-t border-white/5 pt-8">
                    <div className="w-12 h-12 rounded-full bg-linear-to-br from-yellow-500 to-orange-600 flex items-center justify-center font-display font-bold text-white shadow-lg shadow-yellow-500/20">
                      {testi.initials}
                    </div>
                    <div>
                      <strong className="block text-white group-hover:text-yellow-400 transition-colors">{testi.author}</strong>
                      <span className="text-xs text-zinc-500 uppercase tracking-widest font-medium">{testi.role}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="pt-24 pb-12 md:pt-28 md:pb-16 px-6 bg-white">
          <div className="container mx-auto max-w-4xl">
            <SectionHeading 
              subtitle="Common Questions" 
              title={<span className="text-zinc-950">Everything You Need to Know</span>} 
            />
            <div className="rounded-[2.5rem] border border-zinc-200 bg-yellow-50 shadow-[0_30px_80px_rgba(24,24,27,0.12)] p-6 md:p-10">
              {FAQS.map((faq, i) => (
                <FAQItem key={i} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA / CONTACT (REPLACED WITH NEW DESIGN) */}
        <section id="contact" className="py-24 md:py-32 px-6 bg-zinc-950 relative overflow-hidden">
          {/* Decorative Subtle Background Elements */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-yellow-500/5 blur-[150px] rounded-full -mr-64 -mt-64" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-yellow-500/5 blur-[150px] rounded-full -ml-64 -mb-64" />
          
          <div className="container mx-auto max-w-5xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-left"
            >
              <h2 className="text-[30px] md:text-[50px] font-poppins font-bold text-white mb-8 tracking-tighter leading-tight">
                If you’re juggling too <br className="hidden md:block" />
                many tasks and your <br className="hidden md:block" />
                <span className="text-yellow-600">
                  deals feel messy, <br className="hidden md:block" />
                  let’s fix that.
                </span>
              </h2>
              
              <div className="mb-12">
                <p className="text-zinc-400 text-xl md:text-2xl font-medium max-w-3xl leading-relaxed">
                  Let me take care of the systems, tasks, and tech so you can focus on scaling your business.
                </p>
              </div>

              <div className="flex flex-col items-start gap-8">
                <a 
                  href="mailto:jpbmu93@gmail.com"
                  className="group flex items-center gap-4 bg-yellow-500 hover:bg-yellow-400 text-black px-8 py-5 rounded-full font-black text-lg uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-[0_20px_50px_rgba(234,179,8,0.3)]"
                >
                  👉 Get Started Today
                </a>

                <div className="space-y-6">
                  <p className="text-zinc-600 text-[10px] md:text-xs font-black uppercase tracking-[0.3em] max-w-md leading-relaxed">
                    NO PRESSURE. JUST CLARITY ON WHAT'S BREAKING AND HOW TO FIX IT.
                  </p>
                  
                  <a 
                    href="mailto:jpbmu93@gmail.com" 
                    className="inline-block text-zinc-400 hover:text-white transition-colors text-lg font-bold border-b-2 border-zinc-800 pb-1"
                  >
                    jpbmu93@gmail.com
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="pt-8 pb-16 px-6 border-t border-white/5 relative overflow-hidden">
        <div className="container mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-10 relative z-10">
          <div>
            <div className="text-2xl font-poppins font-bold mb-4">
              JIGAR <span className="text-yellow-500">PANDA</span>
            </div>
            <p className="text-zinc-500 text-sm italic">© 2024 Jigar Panda. Real Estate VA & Operations Executive.</p>
          </div>
          
          <div className="flex gap-4">
            {[
              { icon: Linkedin, href: "#", color: "hover:bg-[#0077b5]" },
              { icon: Globe, href: "#", color: "hover:bg-yellow-600" },
              { icon: Mail, href: "mailto:jpbmu93@gmail.com", color: "hover:bg-red-600" },
              { icon: Twitter, href: "#", color: "hover:bg-[#1DA1F2]" }
            ].map((social, i) => (
              <a 
                key={i} 
                href={social.href} 
                className={`w-12 h-12 rounded-full glass flex items-center justify-center transition-all duration-300 border border-white/5 ${social.color} hover:text-white hover:border-transparent hover:-translate-y-1 active:scale-90`}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
        
        {/* Sub-footer decoration */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-yellow-500/20 to-transparent" />
      </footer>
    </div>
  );
}
