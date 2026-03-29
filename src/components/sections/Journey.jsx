import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SectionWrapper from '../ui/SectionWrapper';
import { portfolioData } from '../../data/portfolioData';

// Custom Spine Component for Parallax Tracking
const TimelineSpine = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });
  
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={ref} className="absolute left-[11px] top-6 bottom-0 w-[2px] bg-slate-700 z-0 overflow-hidden">
      <motion.div 
        style={{ scaleY, transformOrigin: "top" }} 
        className="absolute inset-0 bg-gradient-to-b from-transparent via-primary to-primary rounded-full shadow-[0_0_15px_rgba(6,182,212,0.8)]" 
      />
    </div>
  );
};

// Helper to parse "Month Year" to a JS Date
const parseDate = (dateStr) => {
  if (!dateStr || dateStr.toLowerCase().includes('present')) {
    return new Date();
  }
  const parts = dateStr.trim().split(' ');
  if (parts.length === 2) {
    return new Date(`${parts[0]} 1, ${parts[1]}`);
  }
  return new Date(`${dateStr.trim()}-01-01`);
};

// Calculate total experience dynamically
const calculateTotalExperience = (experienceArray) => {
  let totalMonths = 0;

  experienceArray.forEach((exp) => {
    const separator = exp.duration.includes('—') ? '—' : '-';
    const parts = exp.duration.split(separator);

    if (parts.length === 2) {
      const start = parseDate(parts[0]);
      const end = parseDate(parts[1]);

      let months = (end.getFullYear() - start.getFullYear()) * 12;
      months -= start.getMonth();
      months += end.getMonth();
      
      totalMonths += Math.max(0, months);
    }
  });

  const years = totalMonths / 12;
  return years.toFixed(1);
};

const Journey = () => {
  const totalExp = calculateTotalExperience(portfolioData.experience);

  return (
    <section id="journey" className="w-full relative bg-transparent text-slate-200 py-24 z-20 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-24 relative lg:items-start">
          
          {/* Left Side: Sticky Header */}
          <div className="lg:w-1/3">
            <div className="lg:sticky lg:top-1/2 lg:-translate-y-1/2">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-slate-100">
                The <span className="text-primary">journey</span> so far
              </h2>
            </div>
          </div>

          {/* Right Side: Timeline */}
          <div className="lg:w-2/3 relative">
            
            {/* Parent container for timeline entries */}
            <div className="relative pt-2 pb-6">

              {/* ---------------- EDUCATION GROUP ---------------- */}
              <div className="relative mb-20">
                {/* Local Section Spine */}
                <TimelineSpine />
                
                {/* Section Title with its own dot */}
                <div className="relative mb-10 pl-12 flex items-center">
                  {/* Dot: 12px width -> left: 12px (center) - 6px = 6px */}
                  <div className="absolute left-[6px] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-slate-500 ring-4 ring-[#0f172a] z-10 box-content"></div>
                  <h3 className="text-2xl font-semibold text-slate-100">Education</h3>
                </div>
                
                <div className="flex flex-col gap-10">
                  {portfolioData.education.map((edu, index) => (
                    <a 
                      href={edu.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      key={index} 
                      className="group relative flex flex-col sm:flex-row sm:items-start transition-transform duration-300 hover:translate-x-2 pl-[100px] cursor-pointer"
                    >
                      {/* Timeline Dot (vertically centered to logo which is 48px -> top-1/2 of 48 is 24. Dot is 12 -> top: 24-6=18px) */}
                      <div className="absolute left-[6px] top-[18px] w-3 h-3 rounded-full bg-[#0a192f] border-2 border-slate-500 z-10 transition-colors duration-300 group-hover:border-primary group-hover:bg-primary"></div>
                      
                      {/* Logo Container */}
                      <div className="absolute left-[36px] top-0 w-12 h-12 rounded-xl overflow-hidden bg-transparent border-none z-10 transition-transform duration-300 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.2)]">
                        {edu.preview && (
                          <img 
                            src={edu.preview} 
                            alt={`${edu.institution} logo`} 
                            className="w-full h-full object-cover scale-110"
                          />
                        )}
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 w-full flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 sm:gap-4 mt-1 sm:mt-0">
                        <div className="flex flex-col gap-2">
                          <div className="flex flex-wrap items-center gap-3">
                            <h4 className="text-lg font-bold text-slate-100 leading-tight group-hover:text-primary transition-colors">{edu.degree}</h4>
                            {/* Score inline badge per requirement */}
                            {edu.score && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 shrink-0">
                                {edu.score}
                              </span>
                            )}
                          </div>
                          <p className="text-slate-400 font-medium">
                            {edu.institution}
                          </p>
                        </div>
                        {/* Date (Right Aligned on desktop) */}
                        <div className="text-sm font-medium text-slate-500 whitespace-nowrap shrink-0 mt-2 sm:mt-1">
                          {edu.duration}
                        </div>
                      </div>

                    </a>
                  ))}
                </div>
              </div>

              {/* ---------------- EXPERIENCE GROUP ---------------- */}
              <div className="relative">
                {/* Local Section Spine */}
                <TimelineSpine />
                
                {/* Section Title with its own dot */}
                <div className="relative mb-10 pl-12 flex items-center">
                  <div className="absolute left-[6px] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-slate-500 ring-4 ring-[#0f172a] z-10 box-content"></div>
                  <h3 className="text-2xl font-semibold text-slate-100 flex items-center gap-2">
                    Experience 
                    <span className="text-slate-600 font-normal leading-none">&bull;</span>
                    <span className="text-primary">{totalExp} yrs</span>
                  </h3>
                </div>
                
                <div className="flex flex-col gap-10">
                  {portfolioData.experience.map((exp, index) => (
                    <a 
                      href={exp.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      key={index} 
                      className="group relative flex flex-col sm:flex-row sm:items-start transition-transform duration-300 hover:translate-x-2 pl-[100px] cursor-pointer"
                    >
                      {/* Timeline Dot */}
                      <div className="absolute left-[6px] top-[18px] w-3 h-3 rounded-full bg-[#0a192f] border-2 border-slate-500 z-10 transition-colors duration-300 group-hover:border-primary group-hover:bg-primary"></div>
                      
                      {/* Logo Container */}
                      <div className="absolute left-[36px] top-0 w-12 h-12 rounded-xl overflow-hidden bg-transparent border-none z-10 transition-transform duration-300 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.2)]">
                        {exp.preview && (
                          <img 
                            src={exp.preview} 
                            alt={`${exp.organization} logo`} 
                            className="w-full h-full object-cover scale-110"
                          />
                        )}
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 w-full flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 sm:gap-4 mt-1 sm:mt-0">
                        <div className="flex flex-col gap-1">
                          <h4 className="text-lg font-bold text-slate-100 leading-tight group-hover:text-primary transition-colors">{exp.organization}</h4>
                          <p className="text-primary font-medium mb-1">
                            {exp.role}
                          </p>
                          <p className="text-slate-400 text-sm leading-relaxed max-w-2xl mt-1">
                            {exp.description}
                          </p>
                        </div>
                        {/* Date (Right Aligned on desktop) */}
                        <div className="text-sm font-medium text-slate-500 whitespace-nowrap shrink-0 mt-2 sm:mt-1">
                          {exp.duration}
                        </div>
                      </div>

                    </a>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Journey;
