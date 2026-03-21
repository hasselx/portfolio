import React, { createContext, useContext, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const PreviewContext = createContext();

export const usePreview = () => useContext(PreviewContext);

export const PreviewProvider = ({ children }) => {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1280);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <PreviewContext.Provider value={{ setPreviewUrl, isMobile }}>
      {children}
      
      {/* Fixed Desktop Hover Preview */}
      <AnimatePresence>
        {previewUrl && !isMobile && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed right-10 top-1/2 -translate-y-1/2 w-[380px] h-auto hidden xl:block rounded-xl overflow-hidden border border-slate-700 shadow-[0_0_20px_rgba(0,0,0,0.5)] z-50 pointer-events-none"
          >
            <div className="bg-slate-800 px-4 py-3 flex gap-2 border-b border-slate-700/80 items-center">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
            <div className="relative bg-black w-full min-h-[220px]">
              <img 
                src={previewUrl} 
                alt="Highlight Preview" 
                loading="lazy"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Mobile inline preview is handled directly by TimelineItem component */}
    </PreviewContext.Provider>
  );
};
