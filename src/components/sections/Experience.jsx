import React, { useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import { portfolioData } from '../../data/portfolioData';
import SectionWrapper from '../ui/SectionWrapper';
import { TimelineItem } from '../ui/TimelineItem';

const Experience = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  return (
    <SectionWrapper id="experience" title="Work Experience">
      <div ref={containerRef} className="relative w-full max-w-[900px] mx-auto py-10 mt-6">
        
        {/* Background inactive line */}
        <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-[2px] bg-slate-800 -translate-x-1/2 rounded-full" />
        
        {/* Scroll progressive highlighted line */}
        <motion.div 
          className="absolute left-4 md:left-1/2 top-4 bottom-4 w-[2px] bg-primary rounded-full shadow-[0_0_12px_rgba(6,182,212,0.8)] origin-top z-0"
          style={{ x: "-50%", scaleY: scrollYProgress }} 
        />

        {portfolioData.experience.map((exp, index) => (
          <TimelineItem 
            key={index} 
            index={index} 
            data={{
              duration: exp.duration, 
              title: (
                <span className="font-normal">
                  {exp.role} at <span className="text-cyan-400 font-semibold">{exp.organization}</span>
                </span>
              ),
              organization: null,
              description: exp.description,
              preview: exp.preview,
              link: exp.link
            }} 
          />
        ))}
      </div>
    </SectionWrapper>
  );
};

export default Experience;
