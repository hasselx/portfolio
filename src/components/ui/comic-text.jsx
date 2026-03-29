import React from 'react';

export function ComicText({ children, className = "", fontSize = 2 }) {
  return (
    <span 
      className={`font-black uppercase tracking-wider text-primary ${className}`}
      style={{
        fontSize: `${fontSize}rem`,
        lineHeight: 1,
        textShadow: `
          -1.5px -1.5px 0 #0f172a, 
           1.5px -1.5px 0 #0f172a, 
          -1.5px  1.5px 0 #0f172a, 
           1.5px  1.5px 0 #0f172a, 
           2px  2px 0 #0f172a, 
           3px  3px 0 #0f172a, 
           4px  4px 0 #0f172a,
           5px  5px 0 #0f172a
        `
      }}
    >
      {children}
    </span>
  );
}
