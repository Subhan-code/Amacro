import React, { useEffect, useState } from 'react';
import { CSS_VARS } from '../constants';

interface CodeDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  css: string;
}

export const CodeDrawer: React.FC<CodeDrawerProps> = ({ isOpen, onClose, title, css }) => {
  const [copyState, setCopyState] = useState<'idle' | 'copied'>('idle');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleCopy = () => {
    const fullCode = `${CSS_VARS}\n${css}`;
    navigator.clipboard.writeText(fullCode).then(() => {
      setCopyState('copied');
      setTimeout(() => setCopyState('idle'), 2000);
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end md:flex-row md:justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/30 dark:bg-black/70 backdrop-blur-sm transition-opacity opacity-100" 
        onClick={onClose}
      />
      
      {/* Panel / Bottom Sheet */}
      <div className="relative w-full max-w-2xl bg-theme-card/95 backdrop-blur-2xl h-[88vh] md:h-full rounded-t-3xl md:rounded-none shadow-2xl flex flex-col border-t md:border-t-0 md:border-l border-theme-border z-10 transition-transform duration-300">
        {/* Mobile Pull Handle Indicator */}
        <div className="w-12 h-1.5 bg-theme-subtext/30 rounded-full mx-auto mt-3 mb-1 md:hidden" />
        
        <div className="p-4 sm:p-6 border-b border-theme-border flex justify-between items-center">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-theme-text font-display">{title}</h2>
            <p className="text-xs sm:text-[15px] text-theme-subtext mt-0.5">Copy and paste into your project.</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-theme-bg transition-colors text-theme-subtext active:scale-95"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sm:w-6 sm:h-6"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        <div className="flex-1 overflow-auto p-6 bg-theme-bg">
          <pre className="text-sm font-mono text-theme-text whitespace-pre-wrap leading-relaxed">
            <code>
              <span className="text-theme-subtext opacity-60 block mb-4 italic">/* Add this to your global CSS */</span>
              {CSS_VARS}
              <br/>
              <span className="text-theme-subtext opacity-60 block mb-4 mt-8 italic">/* Specific animation styles */</span>
              {css}
            </code>
          </pre>
        </div>

        <div className="p-6 border-t border-theme-border bg-theme-card/50 flex justify-end gap-3 backdrop-blur-md">
             <button
            onClick={handleCopy}
            className={`flex items-center gap-2 px-8 py-3 rounded-full font-semibold transition-all duration-300 transform active:scale-95 ${
              copyState === 'copied' 
                ? 'bg-green-500 text-white' 
                : 'bg-theme-accent hover:bg-theme-accent-hover text-white shadow-lg shadow-theme-accent/20'
            }`}
          >
            {copyState === 'copied' ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                Copied
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                Copy CSS
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};