import React, { useState, createContext, useContext, useEffect } from 'react';
import { createPortal } from 'react-dom';
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

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);
  
  const content = (
    <AnimatePresence>
      {open && (
        <React.Fragment key="sheet-portal">
          {/* Dimmed Background Overlay */}
          <motion.div 
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[99998] bg-black/80 backdrop-blur-md"
          />
          {/* Animated Sliding Panel */}
          <motion.div 
            key="panel"
            initial={{ x: side === "right" ? "100%" : "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: side === "right" ? "100%" : "-100%" }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className={`fixed top-0 bottom-0 ${side === "right" ? "right-0" : "left-0"} h-[100dvh] z-[99999] flex flex-col shadow-2xl ${className}`}
          >
            {/* Close Button Anchor */}
            <div className="flex justify-end px-4 pt-6">
              <button 
                onClick={() => setOpen(false)}
                className="p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-colors focus:outline-none"
              >
                <X size={20} />
              </button>
            </div>
            {children}
          </motion.div>
        </React.Fragment>
      )}
    </AnimatePresence>
  );

  if (typeof document === 'undefined') return null;
  return createPortal(content, document.body);
};
