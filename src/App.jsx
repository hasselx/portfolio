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
import StarryDots from './components/ui/StarryDots';
import { ReactLenis } from '@studio-freight/react-lenis';

function App() {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothTouch: false }}>
        <div className="relative min-h-screen bg-transparent text-slate-200 font-sans selection:bg-primary/30 selection:text-white">
        
        {/* Global animated background */}
        <div className="fixed inset-0 z-[-1] pointer-events-none">
          <StarryDots
            count={50}
            minSize={1}
            maxSize={2.2}
            minOpacity={0.28}
            maxOpacity={0.5}
            minSpeed={0.8}
            maxSpeed={1.3}
            backgroundColor="#0f172a"
            dotColor={[6, 181, 216]}
          />
        </div>

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
