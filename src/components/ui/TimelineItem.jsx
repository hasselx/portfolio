import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const TimelineItem = ({ index, data }) => {
  const isEven = index % 2 === 0;
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="relative w-full mb-16 md:mb-24 px-4 md:px-0 group/timeline">
      
      {/* Center Node Desktop (Animates hollow to filled) */}
      <motion.div 
        initial={{ backgroundColor: "transparent", borderColor: "rgba(6, 182, 212, 1)", boxShadow: "0 0 0px rgba(6,182,212,0)", scale: 1, x: "-50%", y: "-50%" }}
        whileInView={{ backgroundColor: "rgba(6, 182, 212, 1)", boxShadow: "0 0 12px rgba(6,182,212,0.8)", scale: 1.15, x: "-50%", y: "-50%" }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        viewport={{ once: false, amount: 0.5 }}
        className="hidden md:block absolute left-1/2 top-1/2 w-4 h-4 rounded-full border-[2px] z-20" 
      />

      {/* Mobile Center Node */}
      <motion.div 
        initial={{ backgroundColor: "transparent", borderColor: "rgba(6, 182, 212, 1)", boxShadow: "0 0 0px rgba(6,182,212,0)", scale: 1, x: "-50%", y: "-50%" }}
        whileInView={{ backgroundColor: "rgba(6, 182, 212, 1)", boxShadow: "0 0 12px rgba(6,182,212,0.8)", scale: 1.15, x: "-50%", y: "-50%" }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        viewport={{ once: false, amount: 0.5 }}
        className="md:hidden absolute left-4 top-1/2 w-4 h-4 rounded-full border-[2px] z-20" 
      />

      {/* Desktop Layout: Symmetrical Flex Split */}
      <div 
        className="hidden md:flex w-full items-stretch justify-between relative z-10"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        
        {/* Left Side Half */}
        <a href={data.link} target="_blank" rel="noreferrer" className="w-[45%] flex justify-end pr-6 lg:pr-10 outline-none cursor-pointer block">
          {isEven ? (
            <TimelineContent data={data} align="right" />
          ) : (
            <TimelineImage data={data} align="right" isVisible={isHovered} />
          )}
        </a>

        {/* Right Side Half */}
        <a href={data.link} target="_blank" rel="noreferrer" className="w-[45%] flex justify-start pl-6 lg:pl-10 outline-none cursor-pointer block">
          {isEven ? (
            <TimelineImage data={data} align="left" isVisible={isHovered} />
          ) : (
            <TimelineContent data={data} align="left" />
          )}
        </a>

      </div>

      {/* Mobile Layout: Stacked Single Column */}
      <a href={data.link} target="_blank" rel="noreferrer" className="md:hidden flex flex-col w-full pl-12 relative z-10 outline-none cursor-pointer block">
         <TimelineContent data={data} align="left" isMobile />
         <div className="mt-4">
           {/* Image unconditionally visible below on mobile since hover is disabled */}
           <TimelineImage data={data} align="left" isMobile isVisible={true} />
         </div>
      </a>

    </div>
  );
};

/* Inner Content Component (Text Box) */
const TimelineContent = ({ data, align, isMobile }) => (
  <motion.div 
    initial={{ opacity: 0, x: isMobile ? 30 : (align === 'right' ? -40 : 40) }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className={`w-full max-w-xl h-full flex flex-col justify-center bg-surface border border-slate-700/60 p-6 md:p-8 lg:p-10 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.15)] transition-all duration-300 group ${align === 'right' ? 'text-right' : 'text-left'} hover:border-primary/40 hover:shadow-primary/10 hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(6,182,212,0.2)]`}
  >
    <div className={`text-primary font-mono text-sm mb-3 font-semibold tracking-wide drop-shadow-[0_0_8px_rgba(6,182,212,0.4)] ${align === 'right' ? 'ml-auto' : ''}`}>{data.duration}</div>
    <h3 className="text-xl lg:text-2xl font-bold text-slate-100 group-hover:text-primary transition-colors tracking-tight">{data.title}</h3>
    <h4 className={`text-md lg:text-lg text-slate-300 font-medium mb-4 mt-2 inline-block border-b border-slate-700 pb-1 ${align === 'right' ? 'ml-auto' : ''}`}>{data.organization}</h4>
    {data.description && <p className="text-slate-400 text-sm md:text-base leading-relaxed font-light">{data.description}</p>}
    {data.score && <p className={`text-slate-300 text-sm leading-relaxed font-medium mt-3 bg-slate-800/80 inline-block px-3 py-1 rounded-md border border-slate-700 ${align === 'right' ? 'ml-auto' : ''}`}>Score: <span className="text-primary tracking-wide drop-shadow-sm">{data.score}</span></p>}
  </motion.div>
);

/* Inner Image Component */
const TimelineImage = ({ data, align, isMobile, isVisible }) => {
  if (!data.preview) return <div className={`w-full max-w-xl h-full flex ${align === 'right' ? 'ml-auto' : 'mr-auto'}`} />;
  
  return (
    <div className={`w-full max-w-xl h-full flex items-center justify-center pointer-events-none ${align === 'right' ? 'ml-auto' : 'mr-auto'}`}>
      <AnimatePresence>
        {isVisible && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-full h-full rounded-xl overflow-hidden border border-slate-700/60 shadow-[0_8px_30px_rgba(0,0,0,0.3)] bg-slate-800"
          >
            <img src={data.preview} alt={`${data.title} view`} loading="lazy" className="w-full h-full object-cover object-top aspect-[4/3] md:aspect-auto" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
