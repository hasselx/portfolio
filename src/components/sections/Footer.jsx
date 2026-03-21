import React from 'react';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';

const Footer = () => {
  return (
    <footer className="py-8 text-center border-t border-slate-800/80 mt-10">
      <div className="flex justify-center gap-6 mb-6 sm:hidden">
        {portfolioData.contact.github && <a href={portfolioData.contact.github} className="text-slate-400 hover:text-primary transition-colors"><Github size={20} /></a>}
        {portfolioData.contact.linkedin && <a href={portfolioData.contact.linkedin} className="text-slate-400 hover:text-primary transition-colors"><Linkedin size={20} /></a>}
        {portfolioData.contact.twitter && <a href={portfolioData.contact.twitter} className="text-slate-400 hover:text-primary transition-colors"><Twitter size={20} /></a>}
        {portfolioData.contact.email && <a href={`mailto:${portfolioData.contact.email}`} className="text-slate-400 hover:text-primary transition-colors"><Mail size={20} /></a>}
      </div>
      <p className="text-slate-500 text-sm font-mono tracking-wider">
        Designed & Built by {portfolioData.name.split(' ')[0]}
        <br className="sm:hidden mt-1" />
        <span className="hidden sm:inline"> &middot; </span> 
        &copy; {new Date().getFullYear()}
      </p>
    </footer>
  );
};

export default Footer;
