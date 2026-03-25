import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowDown, Mail, Github, Linkedin, Twitter, Copy, Check, ExternalLink } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';
import PortfolioShader from '../ui/Shader';

const MailPopover = ({ email }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const popoverRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleCopy = (e) => {
    e.stopPropagation();
    e.preventDefault();
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      setIsOpen(false);
    }, 1500);
  };

  const handleMailTo = (e) => {
    e.stopPropagation();
    window.open(`mailto:${email}`, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="relative pointer-events-auto" ref={popoverRef}>
      <button 
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="group relative text-slate-300 hover:text-primary transition-colors w-11 h-11 sm:w-12 sm:h-12 hover:bg-slate-800/80 border border-slate-700 hover:border-primary/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.2)] hover:-translate-y-1 transition-all rounded-full shadow-lg flex items-center justify-center focus:outline-none"
      >
        <Mail size={18} className="sm:w-[20px] sm:h-[20px]" />
        
        {/* Tooltip visible only when closed and hovering - Hidden on mobile entirely */}
        {!isOpen && (
          <div className="absolute bottom-full right-0 sm:right-auto sm:left-1/2 sm:-translate-x-1/2 mb-2 px-2.5 py-1.5 bg-slate-800 border border-slate-700 text-slate-200 text-[10px] sm:text-xs font-semibold rounded-md opacity-0 md:group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-lg z-50 hidden md:block">
            Contact Options
            <div className="absolute -bottom-1 right-[16px] sm:right-auto sm:left-1/2 sm:-translate-x-1/2 w-2 h-2 bg-slate-800 border-b border-r border-slate-700 rotate-45"></div>
          </div>
        )}
      </button>

      {/* Popover Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute bottom-full right-0 sm:right-auto sm:left-1/2 sm:-translate-x-1/2 mb-3.5 w-[160px] sm:w-[170px] bg-slate-900/85 backdrop-blur-xl border border-primary/30 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.5),0_0_15px_rgba(6,182,212,0.15)] overflow-visible z-[60] flex flex-col"
          >
            {/* Popover Arrow */}
            <div className="absolute -bottom-1.5 right-[16px] sm:right-auto sm:left-1/2 sm:-translate-x-1/2 w-3 h-3 bg-slate-900/90 border-b border-r border-primary/30 rotate-45 z-0"></div>

            <div className="relative z-10 p-1 flex flex-col w-full h-full bg-transparent rounded-xl overflow-hidden">
              <div className="px-3 py-2 text-[11px] font-bold text-slate-400 tracking-wide border-b border-slate-800/80 mb-1 w-full truncate text-center">
                {email.toLowerCase()}
              </div>

              <button 
                onClick={handleCopy}
                className="w-full flex items-center justify-start gap-3 px-3 py-2.5 text-xs font-semibold text-slate-300 hover:text-white hover:bg-primary/10 rounded-lg transition-colors focus:outline-none"
              >
                {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} className="text-primary" />}
                <span className={copied ? "text-emerald-400" : ""}>{copied ? 'Copied!' : 'Copy Email'}</span>
              </button>
              
              <button 
                onClick={handleMailTo}
                className="w-full flex items-center justify-start gap-3 px-3 py-2.5 text-xs font-semibold text-slate-300 hover:text-white hover:bg-primary/10 rounded-lg transition-colors focus:outline-none"
              >
                <ExternalLink size={14} className="text-primary" />
                <span>Send Email</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Home = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 800], [0, 150]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  const nameParts = portfolioData.name.split(' ');
  const line1 = nameParts.slice(0, 2).join(' ');
  const line2 = nameParts.slice(2).join(' ');

  return (
    <section id="home" className="w-full min-h-[100dvh] relative bg-background pb-20 pt-28 md:pt-0 md:pb-0 flex items-center justify-center">
      
      {/* Background WebGL Shader Layer completely detached from DOM flow */}
      <div className="absolute inset-0 z-0 pointer-events-auto overflow-hidden">
        <PortfolioShader style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 pointer-events-none">
        <motion.div 
          style={{ y: y1, opacity }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-start md:items-center w-full"
        >
          
          {/* LEFT SIDE: Name Column */}
          <div className="flex flex-col justify-center w-full">
            <div className="inline-block px-3 sm:px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-medium tracking-wide text-xs sm:text-sm mb-4 sm:mb-6 w-max shadow-sm pointer-events-auto">
              Hello, my name is
            </div>
            <h1 className="flex flex-col text-[2.2rem] min-[400px]:text-[2.5rem] sm:text-[3.5rem] md:text-[4.2rem] lg:text-[4.5rem] xl:text-[5.2rem] leading-[1.05] sm:leading-[1] font-black tracking-tighter drop-shadow-lg pointer-events-auto w-full max-w-[500px] md:max-w-[600px] xl:max-w-[800px]">
              <span className="block text-slate-100">{line1}</span>
              <span className="block text-primary tracking-tight drop-shadow-[0_0_15px_rgba(6,182,212,0.4)] mt-1 sm:mt-2">
                {line2}.
              </span>
            </h1>
          </div>

          {/* RIGHT SIDE: Parallel Content Column */}
          <div className="flex flex-col justify-center space-y-5 md:space-y-8 w-full pt-4 md:pt-0">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-300 tracking-tight leading-[1.2] pointer-events-auto break-words">
              {portfolioData.title}
            </h2>
            
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-400/90 leading-[1.6] font-light w-full pointer-events-auto break-words opacity-90">
              {portfolioData.tagline}
            </p>

            {/* Dynamic Stats Row */}
            <div className="grid grid-cols-3 gap-3 sm:gap-6 pt-5 pb-5 border-y border-slate-700/60 pointer-events-auto w-full">
              <div 
                onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex flex-col justify-center cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(6,182,212,0.2)] p-2 -m-2 sm:p-3 sm:-m-3 rounded-xl border border-transparent hover:border-primary/20 hover:bg-slate-800/40 group"
              >
                <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-100 tracking-tight group-hover:text-primary transition-colors">{portfolioData.experience.length}</span>
                <span className="text-[10px] sm:text-xs text-primary uppercase tracking-widest font-bold mt-1 group-hover:drop-shadow-[0_0_10px_rgba(6,182,212,0.5)] transition-all">Experiences</span>
              </div>
              <div 
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex flex-col justify-center cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(6,182,212,0.2)] p-2 -m-2 sm:p-3 sm:-m-3 rounded-xl border border-transparent hover:border-primary/20 hover:bg-slate-800/40 group"
              >
                <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-100 tracking-tight group-hover:text-primary transition-colors">{portfolioData.projects.length}</span>
                <span className="text-[10px] sm:text-xs text-primary uppercase tracking-widest font-bold mt-1 group-hover:drop-shadow-[0_0_10px_rgba(6,182,212,0.5)] transition-all">Projects</span>
              </div>
              <div 
                onClick={() => document.getElementById('publications')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex flex-col justify-center cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(6,182,212,0.2)] p-2 -m-2 sm:p-3 sm:-m-3 rounded-xl border border-transparent hover:border-primary/20 hover:bg-slate-800/40 group"
              >
                <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-100 tracking-tight group-hover:text-primary transition-colors">{portfolioData.publications.length}</span>
                <span className="text-[10px] sm:text-xs text-primary drop-shadow-[0_0_15px_rgba(6,182,212,0.5)] uppercase tracking-widest font-bold mt-1 group-hover:drop-shadow-[0_0_20px_rgba(6,182,212,0.8)] transition-all">Publications</span>
              </div>
            </div>

            {/* Credibility Badges (Research Impact) */}
            <div className="flex gap-3 flex-wrap pointer-events-auto">
              <span className="px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs sm:text-sm font-semibold tracking-wide shadow-sm flex items-center gap-1.5 hover:bg-primary/20 transition-colors">MDPI Sensors</span>
              <span className="px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs sm:text-sm font-semibold tracking-wide shadow-sm flex items-center gap-1.5 hover:bg-primary/20 transition-colors">IEEE</span>
            </div>
            
            {/* Social Interaction Buttons & Resume Download */}
            <div className="flex justify-center md:justify-start gap-2 sm:gap-4 flex-wrap pt-6 sm:pt-8 pb-4 pointer-events-auto w-full">
              <a 
                href="/Naveen_Krishnan_Resume.pdf" 
                download="Naveen_Krishnan_Resume.pdf"
                className="text-primary hover:text-[#0a192f] bg-transparent hover:bg-primary transition-all p-2 sm:p-3 px-4 sm:px-6 border-2 border-primary hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:-translate-y-1 rounded-full font-bold text-[11px] sm:text-xs tracking-widest uppercase shadow-lg flex items-center justify-center cursor-pointer gap-2 h-11 sm:h-12"
              >
                Resume <ArrowDown size={14} className="sm:w-[16px] sm:h-[16px]" />
              </a>
              {portfolioData.contact.heypage && <a href={portfolioData.contact.heypage} target="_blank" rel="noreferrer" className="text-slate-300 hover:text-primary transition-colors w-11 h-11 sm:w-12 sm:h-12 hover:bg-slate-800/80 border border-slate-700 hover:border-primary/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.2)] hover:-translate-y-1 transition-all rounded-full font-bold text-[15px] sm:text-[18px] shadow-lg flex items-center justify-center font-sans tracking-tighter">H</a>}
              {portfolioData.contact.github && <a href={portfolioData.contact.github} target="_blank" rel="noreferrer" className="text-slate-300 hover:text-primary transition-colors w-11 h-11 sm:w-12 sm:h-12 hover:bg-slate-800/80 border border-slate-700 hover:border-primary/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.2)] hover:-translate-y-1 transition-all rounded-full shadow-lg flex items-center justify-center"><Github size={18} className="sm:w-[20px] sm:h-[20px]" /></a>}
              {portfolioData.contact.linkedin && <a href={portfolioData.contact.linkedin} target="_blank" rel="noreferrer" className="text-slate-300 hover:text-primary transition-colors w-11 h-11 sm:w-12 sm:h-12 hover:bg-slate-800/80 border border-slate-700 hover:border-primary/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.2)] hover:-translate-y-1 transition-all rounded-full shadow-lg flex items-center justify-center"><Linkedin size={18} className="sm:w-[20px] sm:h-[20px]" /></a>}
              {portfolioData.contact.twitter && <a href={portfolioData.contact.twitter} target="_blank" rel="noreferrer" className="text-slate-300 hover:text-primary transition-colors w-11 h-11 sm:w-12 sm:h-12 hover:bg-slate-800/80 border border-slate-700 hover:border-primary/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.2)] hover:-translate-y-1 transition-all rounded-full shadow-lg flex items-center justify-center"><Twitter size={18} className="sm:w-[20px] sm:h-[20px]" /></a>}
              {portfolioData.contact.email && <MailPopover email={portfolioData.contact.email} />}
            </div>

          </div>

        </motion.div>
      </div>

      {/* Down arrow explicitly hidden on tight mobile devices to preserve bottom scroll bounds */}
      <motion.div 
        animate={{ y: [0, 10, 0] }} 
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-slate-500 hover:text-primary transition-colors cursor-pointer z-20 pointer-events-auto hidden md:block"
        onClick={() => { document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }); }}
      >
        <ArrowDown size={32} />
      </motion.div>
    </section>
  );
};

export default Home;
