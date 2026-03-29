import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';
import { Sheet, SheetTrigger, SheetContent, SheetClose } from '../ui/Sheet';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Journey', href: '#journey' },
    { name: 'Projects', href: '#projects' },
    { name: 'Publications', href: '#publications' },
    { name: 'Volunteering', href: '#volunteering' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ];

  const [activeTab, setActiveTab] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = document.querySelectorAll('section');
      let current = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 250) {
          current = section.getAttribute('id');
        }
      });
      if (current) setActiveTab(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-40 transition-all duration-300 ${isScrolled ? 'bg-background/90 backdrop-blur-md border-b border-slate-800 shadow-sm py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <a href="#" className="text-2xl font-bold font-sans text-slate-100 hover:text-primary transition-colors">
              {portfolioData.name.split(' ')[0]}<span className="text-primary">.</span>
            </a>
          </div>
          
          <div className="hidden lg:flex space-x-8">
            {navLinks.map((link) => {
              const isActive = activeTab === link.href.substring(1);
              return (
              <a key={link.name} href={link.href} className={`text-sm font-medium transition-all duration-300 ${isActive ? 'text-primary drop-shadow-[0_0_8px_rgba(6,182,212,0.8)] scale-105' : 'text-slate-300 hover:text-primary hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]'}`}>
                {link.name}
              </a>
              )
            })}
          </div>

          <div className="lg:hidden flex items-center">
            <Sheet>
              <SheetTrigger asChild>
                <button className="text-slate-300 hover:text-primary focus:outline-none menu-btn p-2">
                  <Menu size={28} />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[240px] sm:w-[260px] bg-[#0a192f] text-white border-l border-white/10">
                <div className="flex flex-col items-end text-right gap-6 mt-8 px-6">
                  {navLinks.map((link) => (
                    <SheetClose asChild key={link.name}>
                      <a 
                        href={link.href}
                        onClick={(e) => {
                          e.preventDefault();
                          document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="w-full text-right py-2 text-[18px] font-medium text-[#ccd6f6] transition-all duration-200 ease-out hover:text-[#22d3ee] hover:-translate-x-[4px]"
                      >
                        {link.name}
                      </a>
                    </SheetClose>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
