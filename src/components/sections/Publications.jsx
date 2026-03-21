import React from 'react';
import { ExternalLink, BookOpen } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';
import SectionWrapper from '../ui/SectionWrapper';
import { Card } from '../ui/Card';

const Publications = () => {
  return (
    <SectionWrapper id="publications" title="Publications">
      <div className="space-y-8 max-w-4xl mx-auto">
        {portfolioData.publications.map((pub, index) => (
          <a href={pub.link} target="_blank" rel="noreferrer" key={index} className="block outline-none cursor-pointer">
          <Card 
            className="bg-surface rounded-xl overflow-hidden border border-slate-700 hover:border-primary/50 hover:shadow-[0_8px_30px_rgba(6,182,212,0.15)] hover:-translate-y-2 hover:scale-[1.02] transition-all duration-300 group flex flex-col md:flex-row h-full"
          >
            <div className="flex-1 p-6 md:p-8 order-2 md:order-1">
              <div className="flex items-center gap-2 mb-3">
                <BookOpen size={16} className="text-primary" />
                <span className="text-primary font-mono text-sm">{pub.year}</span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-slate-100 mb-2 group-hover:text-primary transition-colors leading-tight">
                {pub.title}
              </h3>
              <h4 className="text-slate-300 font-medium mb-4">{pub.publisher}</h4>
              <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-6">
                {pub.description}
              </p>
              <div className="inline-flex items-center text-primary font-medium text-sm group-hover:underline">
                Read Publication <ExternalLink size={14} className="ml-1" />
              </div>
            </div>
            <div className="w-full md:w-2/5 aspect-video md:aspect-[4/3] relative overflow-hidden bg-slate-800 order-1 md:order-2 border-b md:border-b-0 md:border-l border-slate-700">
              <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors z-10 duration-300"></div>
              <img 
                src={pub.preview || pub.image} 
                alt={pub.title} 
                loading="lazy"
                className="w-full h-full object-cover object-left-top opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
              />
            </div>
          </Card>
          </a>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default Publications;
