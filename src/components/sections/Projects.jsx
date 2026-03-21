import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';
import SectionWrapper from '../ui/SectionWrapper';
import { Card } from '../ui/Card';

const Projects = () => {
  return (
    <SectionWrapper id="projects" title="Projects">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {portfolioData.projects.map((project, index) => (
          <a
            key={index}
            href={project.live || project.github || project.link || '#'}
            target="_blank"
            rel="noreferrer"
            className="block h-full outline-none"
          >
            <Card 
              className="bg-surface rounded-xl overflow-hidden border border-slate-700 hover:border-primary/50 hover:shadow-[0_0_25px_rgba(6,182,212,0.15)] hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full cursor-pointer relative"
            >
              {/* Top-Right click indicator overlaying the image */}
              <div className="absolute top-3 right-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-slate-900/60 p-1.5 rounded-full backdrop-blur-sm border border-slate-700/50 pointer-events-none">
                <ArrowUpRight size={16} className="text-primary" />
              </div>

              {/* Image Overlay */}
              <div className="relative aspect-video overflow-hidden bg-slate-800 border-b border-slate-700/60 pointer-events-none">
                <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-transparent transition-colors z-10 duration-500"></div>
                <img 
                  src={project.preview || project.image} 
                  alt={project.title} 
                  loading="lazy"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100"
                />
              </div>
              
              {/* Content Body */}
              <div className="p-4 sm:p-5 flex flex-col flex-1 justify-start pointer-events-none">
                <h3 className="text-lg font-bold text-slate-100 group-hover:text-primary transition-colors mb-1.5 leading-tight line-clamp-2">
                  {project.title}
                </h3>
                
                <p className="text-slate-400 text-[13px] leading-[1.5] mb-3 line-clamp-3">
                  {project.description}
                </p>

                {/* Impact Callout */}
                {project.impact && (
                  <div className="p-2.5 bg-primary/5 border border-primary/20 rounded-md mb-3 shadow-inner">
                    <p className="text-slate-200 text-[12px] leading-[1.4] font-medium line-clamp-3">
                      <span className="text-primary font-bold mr-1.5 uppercase tracking-wider text-[10px]">Impact:</span>
                      {project.impact}
                    </p>
                  </div>
                )}

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5 mt-auto pt-1">
                  {project.tech?.map((tech, i) => (
                    <span key={i} className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-primary bg-primary/10 border border-primary/20 rounded-md shadow-sm transition-colors">
                      {tech}
                    </span>
                  ))}
                </div>

              </div>
            </Card>
          </a>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default Projects;
