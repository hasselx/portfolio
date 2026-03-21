import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, Mail, Github, Linkedin, Twitter } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';
import PortfolioShader from '../ui/Shader';

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
            <h1 className="text-[2.5rem] leading-[1.05] sm:text-6xl md:text-7xl lg:text-[5.5rem] font-black text-slate-100 tracking-tighter drop-shadow-lg pointer-events-auto break-words w-full">
              {line1}
              <br/>
              <span className="text-primary tracking-tight drop-shadow-[0_0_15px_rgba(6,182,212,0.4)]">
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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-5 pb-5 border-y border-slate-700/60 pointer-events-auto w-full">
              <div className="flex flex-col justify-center">
                <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-100 tracking-tight">{portfolioData.stats.cgpa}</span>
                <span className="text-[10px] sm:text-xs text-primary uppercase tracking-widest font-bold mt-1">CGPA</span>
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-100 tracking-tight">{portfolioData.experience.length}</span>
                <span className="text-[10px] sm:text-xs text-primary uppercase tracking-widest font-bold mt-1">Experiences</span>
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-100 tracking-tight">{portfolioData.projects.length}</span>
                <span className="text-[10px] sm:text-xs text-primary uppercase tracking-widest font-bold mt-1">Projects</span>
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-100 tracking-tight">{portfolioData.publications.length}</span>
                <span className="text-[10px] sm:text-xs text-primary drop-shadow-[0_0_15px_rgba(6,182,212,0.5)] uppercase tracking-widest font-bold mt-1">Publications</span>
              </div>
            </div>

            {/* Credibility Badges (Research Impact) */}
            <div className="flex gap-3 flex-wrap pointer-events-auto">
              <span className="px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs sm:text-sm font-semibold tracking-wide shadow-sm flex items-center gap-1.5 hover:bg-primary/20 transition-colors">MDPI Sensors</span>
              <span className="px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs sm:text-sm font-semibold tracking-wide shadow-sm flex items-center gap-1.5 hover:bg-primary/20 transition-colors">IEEE</span>
            </div>
            
            {/* Social Interaction Buttons & Resume Download */}
            <div className="flex justify-start gap-2 sm:gap-4 flex-wrap pt-4 pointer-events-auto">
              <a 
                href="/Naveen_Krishnan_Resume.pdf" 
                download="Naveen_Krishnan_Resume.pdf"
                className="text-primary hover:text-[#0a192f] bg-transparent hover:bg-primary transition-all p-2 sm:p-3 px-4 sm:px-6 border-2 border-primary hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:-translate-y-1 rounded-full font-bold text-xs sm:text-sm tracking-widest uppercase shadow-lg flex items-center justify-center cursor-pointer gap-2"
              >
                Resume <ArrowDown size={16} className="sm:w-[18px] sm:h-[18px]" />
              </a>
              {portfolioData.contact.heypage && <a href={portfolioData.contact.heypage} target="_blank" rel="noreferrer" className="text-slate-300 hover:text-primary transition-colors w-10 h-10 sm:w-12 sm:h-12 hover:bg-slate-800/80 border border-slate-700 hover:border-primary/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.2)] hover:-translate-y-1 transition-all rounded-full font-bold text-[18px] sm:text-[20px] shadow-lg flex items-center justify-center font-sans tracking-tighter">H</a>}
              {portfolioData.contact.github && <a href={portfolioData.contact.github} target="_blank" rel="noreferrer" className="text-slate-300 hover:text-primary transition-colors w-10 h-10 sm:w-12 sm:h-12 hover:bg-slate-800/80 border border-slate-700 hover:border-primary/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.2)] hover:-translate-y-1 transition-all rounded-full shadow-lg flex items-center justify-center"><Github size={18} className="sm:w-[22px] sm:h-[22px]" /></a>}
              {portfolioData.contact.linkedin && <a href={portfolioData.contact.linkedin} target="_blank" rel="noreferrer" className="text-slate-300 hover:text-primary transition-colors w-10 h-10 sm:w-12 sm:h-12 hover:bg-slate-800/80 border border-slate-700 hover:border-primary/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.2)] hover:-translate-y-1 transition-all rounded-full shadow-lg flex items-center justify-center"><Linkedin size={18} className="sm:w-[22px] sm:h-[22px]" /></a>}
              {portfolioData.contact.twitter && <a href={portfolioData.contact.twitter} target="_blank" rel="noreferrer" className="text-slate-300 hover:text-primary transition-colors w-10 h-10 sm:w-12 sm:h-12 hover:bg-slate-800/80 border border-slate-700 hover:border-primary/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.2)] hover:-translate-y-1 transition-all rounded-full shadow-lg flex items-center justify-center"><Twitter size={18} className="sm:w-[22px] sm:h-[22px]" /></a>}
              {portfolioData.contact.email && <a href={`mailto:${portfolioData.contact.email}`} className="text-slate-300 hover:text-primary transition-colors w-10 h-10 sm:w-12 sm:h-12 hover:bg-slate-800/80 border border-slate-700 hover:border-primary/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.2)] hover:-translate-y-1 transition-all rounded-full shadow-lg flex items-center justify-center"><Mail size={18} className="sm:w-[22px] sm:h-[22px]" /></a>}
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
