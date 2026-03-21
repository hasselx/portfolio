import React from 'react';
import Navbar from './components/sections/Navbar';
import Home from './components/sections/Home';
import About from './components/sections/About';
import Education from './components/sections/Education';
import Experience from './components/sections/Experience';
import Projects from './components/sections/Projects';
import Publications from './components/sections/Publications';
import Volunteering from './components/sections/Volunteering';
import Skills from './components/sections/Skills';
import Contact from './components/sections/Contact';
import Footer from './components/sections/Footer';
import { ReactLenis } from '@studio-freight/react-lenis';

function App() {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothTouch: false }}>
        <div className="relative min-h-screen bg-background text-slate-200 font-sans selection:bg-primary/30 selection:text-white">
        <Navbar />
        <main className="w-full relative z-10">
          <Home />
          <About />
          <Education />
          <Experience />
          <Projects />
          <Publications />
          <Volunteering />
          <Skills />
          <Contact />
        </main>
        <Footer />
      </div>
    </ReactLenis>
  );
}

export default App;
