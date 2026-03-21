import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioData } from '../../data/portfolioData';
import SectionWrapper from '../ui/SectionWrapper';
import mainAvatar from '../../static/avatar/icon2.jpg';

const Contact = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <SectionWrapper id="contact">
      <div className="max-w-[1200px] mx-auto flex flex-col items-center justify-center text-center py-[100px] pb-[120px]">
        <h2 className="text-5xl md:text-6xl font-black text-slate-100 mb-8 tracking-tight">Get In Touch</h2>
        
        <p className="text-slate-400 mb-10 text-lg md:text-xl leading-relaxed font-light max-w-[650px] mx-auto">
          Open to internships, research roles, and machine learning opportunities. Feel free to reach out for collaboration.
        </p>
        
        {/* Social Links Sub-Grid */}
        <div className="flex items-center justify-center gap-6 mb-12 flex-wrap">
          {portfolioData.contact.email && <a href={`mailto:${portfolioData.contact.email}`} className="text-slate-400 hover:text-primary hover:drop-shadow-[0_0_10px_rgba(6,182,212,0.4)] transition-all hover:-translate-y-1 p-2 rounded-full border border-transparent hover:border-primary/30 hover:bg-slate-800/50"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg></a>}
          {portfolioData.contact.linkedin && <a href={portfolioData.contact.linkedin} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-primary hover:drop-shadow-[0_0_10px_rgba(6,182,212,0.4)] transition-all hover:-translate-y-1 p-2 rounded-full border border-transparent hover:border-primary/30 hover:bg-slate-800/50"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg></a>}
          {portfolioData.contact.github && <a href={portfolioData.contact.github} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-primary hover:drop-shadow-[0_0_10px_rgba(6,182,212,0.4)] transition-all hover:-translate-y-1 p-2 rounded-full border border-transparent hover:border-primary/30 hover:bg-slate-800/50"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg></a>}
        </div>

        {/* CTA Row */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 mt-2 flex-wrap">
          
          <a 
            href={`mailto:${portfolioData.contact.email}`} 
            className="inline-block px-12 py-4 rounded-xl bg-transparent border-2 border-primary text-primary font-bold text-lg hover:bg-primary/10 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all duration-300 pointer-events-auto"
          >
            Say Hello
          </a>

          {/* Main Interactive Avatar */}
          <div 
            className="relative z-20 flex items-center justify-center"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={() => {
              setHovered(true);
              setTimeout(() => setHovered(false), 2000);
            }}
          >
            <a href="https://www.heypage.online/hasselx?ref=portfolio&type=redirect" target="_blank" rel="noopener noreferrer" className="block focus:outline-none">
              <img 
                src={mainAvatar} 
                alt="Naveen krishnan R" 
                className="w-[72px] h-[72px] rounded-full object-cover border-2 border-slate-800 transition-all duration-300 hover:scale-[1.08] hover:border-primary shadow-lg hover:shadow-[0_0_25px_rgba(6,182,212,0.4)] cursor-pointer"
              />
            </a>

            {/* Animated Tooltip (Framer Motion) */}
            <AnimatePresence>
              {hovered && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="absolute -top-[4rem] left-1/2 transform -translate-x-1/2 flex flex-col items-center pointer-events-none z-50"
                >
                  <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700/80 px-5 py-2.5 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] relative z-30 whitespace-nowrap">
                    <span className="text-sm font-bold text-slate-100 tracking-wide">Naveen krishnan R</span>
                  </div>
                  {/* Small Glassmorphism Arrow pointer */}
                  <div className="w-3.5 h-3.5 bg-slate-900/80 border-b border-r border-slate-700/80 transform rotate-45 -translate-y-2 z-20"></div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </SectionWrapper>
  );
};

export default Contact;
