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
        
        <p className="text-slate-400 mb-12 text-lg md:text-xl leading-relaxed font-light max-w-[600px] mx-auto">
          I'm currently looking for new opportunities. Whether you have a question, a project idea, or just want to say hi, I'll try my best to get back to you!
        </p>
        
        {/* CTA Row */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 mt-8 flex-wrap">
          
          <a 
            href={`mailto:${portfolioData.contact.email}`} 
            className="inline-block px-12 py-4 rounded-xl bg-transparent border-2 border-primary text-primary font-bold text-lg hover:bg-primary/10 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all duration-300"
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
