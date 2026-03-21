import React from 'react';
import { motion } from 'framer-motion';

const SectionWrapper = ({ id, title, children }) => {
  return (
    <section id={id} className="py-20 md:py-24 w-full flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-[1200px] mx-auto px-4 sm:px-6 w-full relative"
      >
        {title && (
          <h2 className="text-3xl md:text-4xl font-bold mb-10 md:mb-14 text-slate-100 flex items-center justify-start tracking-tight w-full">
            <span className="text-primary mr-3 text-3xl md:text-4xl drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]">#</span>
            <span className="drop-shadow-md">{title}</span>
          </h2>
        )}
        {children}
      </motion.div>
    </section>
  );
};

export default SectionWrapper;
