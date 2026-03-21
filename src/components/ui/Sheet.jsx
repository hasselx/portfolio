import React, { useState, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const SheetContext = createContext();

export const Sheet = ({ children }) => {
  const [open, setOpen] = useState(false);
  return (
    <SheetContext.Provider value={{ open, setOpen }}>
      {children}
    </SheetContext.Provider>
  );
};

export const SheetTrigger = ({ asChild, children }) => {
  const { setOpen } = useContext(SheetContext);
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, { onClick: () => setOpen(true) });
  }
  return <div onClick={() => setOpen(true)}>{children}</div>;
};

export const SheetClose = ({ asChild, children }) => {
  const { setOpen } = useContext(SheetContext);
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, { 
      onClick: (e) => {
        setOpen(false);
        if (children.props.onClick) children.props.onClick(e);
      } 
    });
  }
  return <div onClick={() => setOpen(false)}>{children}</div>;
};

export const SheetContent = ({ side = "right", className = "", children }) => {
  const { open, setOpen } = useContext(SheetContext);
  
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Dimmed Background Overlay */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          />
          {/* Animated Sliding Panel */}
          <motion.div 
            initial={{ x: side === "right" ? "100%" : "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: side === "right" ? "100%" : "-100%" }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className={`fixed top-0 bottom-0 ${side === "right" ? "right-0" : "left-0"} z-50 flex flex-col shadow-2xl ${className}`}
          >
            {/* Close Button Anchor */}
            <button 
              onClick={() => setOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-colors focus:outline-none"
            >
              <X size={20} />
            </button>
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
