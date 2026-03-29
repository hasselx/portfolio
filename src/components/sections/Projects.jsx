import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "../../hooks/use-outside-click";
import { portfolioData } from "../../data/portfolioData";
import SectionWrapper from "../ui/SectionWrapper";
import { ExternalLink, X } from "lucide-react";

const Projects = () => {
  const [active, setActive] = useState(null);
  const ref = useRef(null);
  const id = useId();

  // Escape key support and scroll locking
  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "Escape") {
        setActive(null);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <SectionWrapper id="projects" title="Projects">
      
      {/* Background Dimming Overlay */}
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md h-full w-full z-[100]"
            data-lenis-prevent="true"
          />
        )}
      </AnimatePresence>

      {/* Expanded Active Card Modal */}
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div 
            className="fixed inset-0 flex items-end sm:items-center justify-center p-0 sm:p-8 z-[110] pointer-events-none"
            data-lenis-prevent="true"
          >
            
            {/* Modal Body: Bottom sheet on mobile, centered modal on desktop */}
            <motion.div
              layoutId={active ? `card-${active.title}-${id}` : undefined}
              exit={{ opacity: 0, y: 50, transition: { duration: 0.15 } }}
              ref={ref}
              className="w-full sm:max-w-3xl mx-auto h-[85dvh] sm:h-auto max-h-[85dvh] sm:max-h-[80vh] flex flex-col bg-[#0a192f] border-t sm:border border-slate-700 rounded-t-3xl sm:rounded-3xl overflow-hidden pointer-events-auto shadow-[0_-10px_40px_rgba(6,182,212,0.15)] sm:shadow-[0_0_40px_rgba(6,182,212,0.15)] relative overscroll-contain"
            >
              
              {/* Mobile Drawer Handle Cue */}
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-12 h-1.5 bg-slate-600 rounded-full z-[130] sm:hidden pointer-events-none opacity-80" />

              {/* Unified Close Button */}
              <button
                className="absolute top-4 right-4 sm:top-5 sm:right-5 flex items-center justify-center bg-slate-900/80 hover:bg-slate-800 rounded-full h-9 w-9 sm:h-10 sm:w-10 pointer-events-auto border border-slate-700/50 backdrop-blur-md z-[130] transition-colors shadow-lg"
                onClick={() => setActive(null)}
              >
                <X size={20} strokeWidth={2.5} className="text-slate-200" />
              </button>

              {/* Dynamic Image Header (Fixed Height) */}
              <motion.div layoutId={`image-${active.title}-${id}`} className="shrink-0 w-full relative">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a192f] via-transparent to-black/30 bg-blend-multiply opacity-60 z-10 bottom-0 top-0 pointer-events-none"></div>
                <img
                  src={active.image || active.preview}
                  alt={active.title}
                  className="w-full h-[220px] sm:h-[260px] object-cover object-top"
                />
              </motion.div>

              {/* Title & Button Area (Fixed) */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 sm:px-6 sm:py-5 border-b border-slate-800 shrink-0">
                <motion.h3
                  layoutId={`title-${active.title}-${id}`}
                  className="text-xl sm:text-2xl font-bold text-slate-100 leading-tight min-w-0"
                >
                  {active.title}
                </motion.h3>

                <motion.div
                  layoutId={`actions-${active.title}-${id}`}
                  className="shrink-0 w-full sm:w-auto"
                >
                  {active.live ? (
                    <a
                      href={active.live}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full sm:w-auto px-6 py-2.5 sm:px-6 sm:py-2.5 flex items-center justify-center gap-2 rounded-full font-bold bg-primary text-[#0a192f] hover:bg-cyan-400 hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all whitespace-nowrap"
                    >
                      Visit <ExternalLink size={16} />
                    </a>
                  ) : (
                    active.github && (
                      <a
                        href={active.github}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full sm:w-auto px-6 py-2.5 sm:px-6 sm:py-2.5 flex items-center justify-center gap-2 rounded-full font-bold bg-slate-800 border border-slate-700 text-slate-200 hover:bg-slate-700 transition-all whitespace-nowrap"
                      >
                        Source <ExternalLink size={16} />
                      </a>
                    )
                  )}
                </motion.div>
              </div>

              {/* Scrollable Content Area */}
              <div 
                className="p-4 sm:p-6 flex-1 overflow-y-auto min-h-0 [scrollbar-width:thin] [scrollbar-color:#334155_transparent] overscroll-contain"
                data-lenis-prevent="true"
              >
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.1 }}
                  className="flex flex-col gap-6"
                >
                  {/* Tech stack */}
                  <motion.div
                    layoutId={`tech-${active.title}-${id}`}
                    className="flex flex-wrap gap-2"
                  >
                    {active.tech?.map((t, i) => (
                      <span key={i} className="bg-primary/10 px-3 py-1 rounded-full border border-primary/20 text-primary font-bold text-xs uppercase tracking-wider shadow-sm">
                        {t}
                      </span>
                    ))}
                  </motion.div>

                  <div className="text-slate-300 text-sm sm:text-lg leading-relaxed max-w-prose">
                    <p>{active.description}</p>
                  </div>

                  {active.impact && (
                    <div className="p-5 rounded-2xl bg-slate-800/40 border border-slate-700 inline-block mt-2">
                      <span className="text-primary font-bold uppercase text-xs sm:text-sm tracking-wider block mb-2">Impact</span>
                      <span className="text-slate-200 text-sm sm:text-base">{active.impact}</span>
                    </div>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>

      {/* Default List View */}
      <ul className="max-w-[800px] mx-auto w-full flex flex-col gap-4">
        {portfolioData.projects.map((project) => (
          <motion.div
            layoutId={`card-${project.title}-${id}`}
            key={`card-${project.title}-${id}`}
            onClick={() => setActive(project)}
            className="group p-3 sm:p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center bg-surface border border-slate-700/50 hover:border-primary/40 hover:bg-slate-800/80 rounded-2xl cursor-pointer transition-colors duration-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.1)] w-full overflow-hidden"
          >
            {/* List Header Left (Flex-1) */}
            <div className="flex gap-4 items-center flex-1 min-w-0 w-full sm:w-auto">
              {/* Thumbnail */}
              <motion.div layoutId={`image-${project.title}-${id}`} className="shrink-0 overflow-hidden rounded-xl border border-slate-700 z-0">
                <img
                  src={project.image || project.preview}
                  alt={project.title}
                  className="h-16 w-16 sm:h-20 sm:w-20 object-cover object-top"
                />
              </motion.div>
              
              <div className="flex flex-col pr-4 min-w-0 flex-1">
                <motion.h3
                  layoutId={`title-${project.title}-${id}`}
                  className="font-bold text-slate-100 text-base sm:text-lg truncate group-hover:text-primary transition-colors"
                >
                  {project.title}
                </motion.h3>
                <div className="hidden sm:block">
                  <motion.p
                    layoutId={`tech-${project.title}-${id}`}
                    className="text-slate-400 text-xs sm:text-sm truncate mt-0.5"
                  >
                    {project.tech?.join(" • ")}
                  </motion.p>
                </div>
                <div className="block sm:hidden text-slate-400 text-xs mt-0.5 truncate">
                  {project.tech?.slice(0, 2).join(" • ")}...
                </div>
              </div>
            </div>

            {/* List CTA Right */}
            <motion.div
              layoutId={`actions-${project.title}-${id}`}
              className="mt-4 sm:mt-0 w-full sm:w-auto shrink-0 flex items-center justify-end"
            >
              <button className="w-full sm:w-auto px-5 py-2 text-xs sm:text-sm rounded-full font-bold bg-slate-800 text-slate-200 border border-slate-600 transition-colors pointer-events-none group-hover:bg-primary group-hover:text-[#0a192f] group-hover:border-primary shrink-0">
                View Project
              </button>
            </motion.div>
          </motion.div>
        ))}
      </ul>
    </SectionWrapper>
  );
}

export default Projects;
