import React from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';
import SectionWrapper from '../ui/SectionWrapper';
import { Card } from '../ui/Card';

const Projects = () => {
  return (
    <SectionWrapper id="projects" title="Projects">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {portfolioData.projects.map((project, index) => (
          <a href={project.link} target="_blank" rel="noreferrer" key={index} className="block outline-none cursor-pointer">
          <Card 
            className="bg-surface rounded-xl overflow-hidden border border-slate-700 hover:border-primary/50 hover:shadow-[0_8px_30px_rgba(6,182,212,0.15)] hover:scale-[1.03] hover:-translate-y-2 transition-all duration-300 group flex flex-col h-full"
          >
            <div className="relative aspect-video overflow-hidden bg-slate-800 border-b border-slate-700/60">
              <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors z-10 duration-300"></div>
              <img 
                src={project.preview || project.image} 
                alt={project.title} 
                loading="lazy"
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
            <div className="p-6 flex flex-col flex-1">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-slate-100 group-hover:text-primary transition-colors">{project.title}</h3>
                <div className="flex gap-3 text-slate-400">
                  <div className="hover:text-primary transition-colors p-1" aria-label="External Link">
                    <ExternalLink size={20} />
                  </div>
                </div>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed flex-1">
                {project.description}
              </p>
            </div>
          </Card>
          </a>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default Projects;
