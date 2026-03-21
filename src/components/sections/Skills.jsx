import React from 'react';
import { portfolioData } from '../../data/portfolioData';
import SectionWrapper from '../ui/SectionWrapper';

const Skills = () => {
  return (
    <SectionWrapper id="skills" title="Skills & Languages">
      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-bold text-slate-200 mb-4">Technical Skills</h3>
            <div className="flex flex-wrap gap-2">
              {portfolioData.skills.technical.map((skill, index) => (
                <div key={`tech-${index}`} className="px-5 py-2.5 bg-surface border border-slate-700/60 rounded-xl text-sm text-primary font-bold shadow-sm">{skill}</div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-200 mb-4">Domains</h3>
            <div className="flex flex-wrap gap-2">
              {portfolioData.skills.domains.map((skill, index) => (
                <div key={`dom-${index}`} className="px-5 py-2.5 bg-surface border border-slate-700/60 rounded-xl text-sm text-slate-300 font-medium">{skill}</div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-200 mb-4">Soft Skills</h3>
            <div className="flex flex-wrap gap-2">
              {portfolioData.skills.soft.map((skill, index) => (
                <div key={`soft-${index}`} className="px-5 py-2.5 bg-surface border border-slate-700/60 rounded-xl text-sm text-slate-300 font-medium">{skill}</div>
              ))}
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-bold text-slate-200 mb-4">Languages</h3>
          <div className="space-y-4">
            {portfolioData.languages.map((lang, index) => (
              <div key={index} className="p-5 bg-surface border border-slate-700/60 rounded-xl flex justify-between items-center transition-all hover:border-slate-500">
                <div>
                  <h4 className="text-lg font-bold text-slate-100">{lang.name}</h4>
                  <p className="text-slate-400 text-sm mt-1">{lang.level}</p>
                </div>
                {lang.score && (
                  <div className="text-sm font-bold text-primary bg-primary/10 px-4 py-1.5 rounded-full border border-primary/20">
                    {lang.score}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Skills;
