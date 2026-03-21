import React from 'react';
import { portfolioData } from '../../data/portfolioData';
import SectionWrapper from '../ui/SectionWrapper';

const About = () => {
  return (
    <SectionWrapper id="about">
      <div className="max-w-5xl mx-auto w-full flex flex-col items-center justify-center px-4 md:px-0">
        
        <div className="w-full">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-slate-100 flex items-center justify-center md:justify-start tracking-tight drop-shadow-md">
            <span className="text-primary mr-3 text-3xl md:text-4xl drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]">#</span>
            About Me
          </h2>
          
          <p className="text-lg md:text-xl text-slate-300 leading-relaxed font-light mb-12 text-center md:text-left">
            {portfolioData.about}
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">
          <div className="p-8 bg-surface border border-slate-700/60 rounded-xl text-center shadow-[0_8px_30px_rgba(0,0,0,0.15)] hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] hover:border-primary/40 hover:scale-[1.03] transition-all duration-300 group">
             <div className="text-4xl md:text-5xl font-black text-primary mb-3 tracking-tight group-hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.5)] transition-all">{portfolioData.stats.cgpa}</div>
             <div className="text-xs md:text-sm text-slate-400 uppercase tracking-widest font-bold">CGPA</div>
          </div>
          
          <div className="p-8 bg-surface border border-slate-700/60 rounded-xl text-center shadow-[0_8px_30px_rgba(0,0,0,0.15)] hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] hover:border-primary/40 hover:scale-[1.03] transition-all duration-300 group">
             <div className="text-4xl md:text-5xl font-black text-primary mb-3 tracking-tight group-hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.5)] transition-all">{portfolioData.experience.length}</div>
             <div className="text-xs md:text-sm text-slate-400 uppercase tracking-widest font-bold">Experiences</div>
          </div>
          
          <div className="p-8 bg-surface border border-slate-700/60 rounded-xl text-center shadow-[0_8px_30px_rgba(0,0,0,0.15)] hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] hover:border-primary/40 hover:scale-[1.03] transition-all duration-300 group">
             <div className="text-4xl md:text-5xl font-black text-primary mb-3 tracking-tight group-hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.5)] transition-all">{portfolioData.projects.length}</div>
             <div className="text-xs md:text-sm text-slate-400 uppercase tracking-widest font-bold">Projects</div>
          </div>
        </div>

      </div>
    </SectionWrapper>
  );
};

export default About;
