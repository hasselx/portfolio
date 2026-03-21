import React from 'react';
import { Heart } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';
import SectionWrapper from '../ui/SectionWrapper';
import { Card } from '../ui/Card';

const Volunteering = () => {
  return (
    <SectionWrapper id="volunteering" title="Volunteering">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {portfolioData.volunteering.map((item, index) => (
          <Card key={index} className="p-6 md:p-8 flex flex-col h-full bg-surface group transition-all duration-300 hover:-translate-y-2">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-slate-900 transition-colors">
              <Heart size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-100 mb-3 group-hover:text-primary transition-colors">{item.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed flex-1">
              {item.description}
            </p>
          </Card>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default Volunteering;
