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
    <section id="home" className="w-full min-h-screen relative overflow-hidden hero-wrapper bg-background">
      
      <PortfolioShader style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 0 }}>
        
        {/* Pointer Events Auto strictly bounds interactivity inside the Hero container */}
        <div className="flex items-center justify-center w-full min-h-screen relative z-10 p-4">
          <div className="max-w-[1200px] mx-auto w-full hero-container">
            <motion.div 
              style={{ y: y1, opacity }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center w-full"
            >
              
              {/* LEFT SIDE: Name Column */}
              <div className="flex flex-col justify-center">
                <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-medium tracking-wide text-sm mb-6 w-max shadow-sm pointer-events-auto">
                  Hello, my name is
                </div>
                <h1 className="text-[3.5rem] leading-[1.1] sm:text-7xl lg:text-[5.5rem] font-black text-slate-100 tracking-tighter drop-shadow-lg pointer-events-auto">
                  {line1}
                  <br/>
                  <span className="text-primary tracking-tight drop-shadow-[0_0_15px_rgba(6,182,212,0.4)]">
                    {line2}.
                  </span>
                </h1>
              </div>

              {/* RIGHT SIDE: Parallel Content Column */}
              <div className="flex flex-col justify-center space-y-6 lg:space-y-8 mt-4 md:mt-0">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-300 tracking-tight leading-tight pointer-events-auto">
                  {portfolioData.title}
                </h2>
                
                <p className="text-lg sm:text-xl text-slate-400/90 leading-relaxed font-light max-w-xl pointer-events-auto">
                  {portfolioData.tagline}
                </p>

                {/* Dynamic Stats Row */}
                <div className="grid grid-cols-3 gap-4 pt-4 pb-4 border-y border-slate-700/60 pointer-events-auto">
                  <div className="flex flex-col justify-center">
                    <span className="text-3xl sm:text-4xl font-black text-slate-100 tracking-tight">{portfolioData.stats.cgpa}</span>
                    <span className="text-[10px] sm:text-xs text-primary uppercase tracking-widest font-bold mt-1">CGPA</span>
                  </div>
                  <div className="flex flex-col justify-center">
                    <span className="text-3xl sm:text-4xl font-black text-slate-100 tracking-tight">{portfolioData.experience.length}+</span>
                    <span className="text-[10px] sm:text-xs text-primary uppercase tracking-widest font-bold mt-1">Experiences</span>
                  </div>
                  <div className="flex flex-col justify-center">
                    <span className="text-3xl sm:text-4xl font-black text-slate-100 tracking-tight">{portfolioData.projects.length}+</span>
                    <span className="text-[10px] sm:text-xs text-primary uppercase tracking-widest font-bold mt-1">Projects</span>
                  </div>
                </div>
                
                {/* Social Interaction Buttons */}
                <div className="flex gap-4 items-center flex-wrap pt-2 pointer-events-auto">
                  {portfolioData.contact.heypage && <a href={portfolioData.contact.heypage} target="_blank" rel="noreferrer" className="text-slate-300 hover:text-primary transition-colors p-3 px-6 hover:bg-slate-800/80 border border-slate-700 hover:border-primary/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.2)] hover:-translate-y-1 transition-all rounded-full font-bold text-sm tracking-widest uppercase shadow-lg">HeyPage</a>}
                  {portfolioData.contact.github && <a href={portfolioData.contact.github} target="_blank" rel="noreferrer" className="text-slate-300 hover:text-primary transition-colors p-3 hover:bg-slate-800/80 border border-slate-700 hover:border-primary/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.2)] hover:-translate-y-1 transition-all rounded-full shadow-lg"><Github size={22} /></a>}
                  {portfolioData.contact.linkedin && <a href={portfolioData.contact.linkedin} target="_blank" rel="noreferrer" className="text-slate-300 hover:text-primary transition-colors p-3 hover:bg-slate-800/80 border border-slate-700 hover:border-primary/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.2)] hover:-translate-y-1 transition-all rounded-full shadow-lg"><Linkedin size={22} /></a>}
                  {portfolioData.contact.twitter && <a href={portfolioData.contact.twitter} target="_blank" rel="noreferrer" className="text-slate-300 hover:text-primary transition-colors p-3 hover:bg-slate-800/80 border border-slate-700 hover:border-primary/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.2)] hover:-translate-y-1 transition-all rounded-full shadow-lg"><Twitter size={22} /></a>}
                  {portfolioData.contact.email && <a href={`mailto:${portfolioData.contact.email}`} className="text-slate-300 hover:text-primary transition-colors p-3 hover:bg-slate-800/80 border border-slate-700 hover:border-primary/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.2)] hover:-translate-y-1 transition-all rounded-full shadow-lg"><Mail size={22} /></a>}
                </div>

              </div>

            </motion.div>
          </div>

          <motion.div 
            animate={{ y: [0, 10, 0] }} 
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 text-slate-500 hover:text-primary transition-colors cursor-pointer z-20 pointer-events-auto"
            onClick={() => { document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }); }}
          >
            <ArrowDown size={32} />
          </motion.div>
        </div>

      </PortfolioShader>
    </section>
  );
};

export default Home;
