import React from 'react';
import { TransitionDefinition } from '../constants';

interface DemoCardProps {
  item: TransitionDefinition;
  isActive: boolean;
  onPreview: () => void;
  onShowCode: () => void;
  index?: number;
}

export const DemoCard: React.FC<DemoCardProps> = React.memo(({
  item,
  isActive,
  onPreview,
  onShowCode,
  index = 0
}) => {
  return (
    <div 
      className={`w-full flex flex-col md:flex-row md:items-center justify-between py-3.5 sm:py-5 px-4 sm:px-6 border-2 border-theme-border rounded-xl bg-theme-bg group hover:bg-theme-text transition-all duration-200 active:scale-[0.98] cursor-pointer relative overflow-hidden ${
        isActive ? 'ring-2 ring-theme-accent shadow-[4px_4px_0px_0px_var(--c-border)]' : ''
      }`}
      onClick={onPreview}
    >
      <div className="flex items-center gap-3 sm:gap-8 w-full relative z-10">
        {/* Year / ID */}
        <span className="text-theme-subtext group-hover:text-theme-bg/70 font-mono text-xs sm:text-sm min-w-[36px] sm:min-w-[40px] transition-colors">
          202{4 - (index % 5)}
        </span>

        {/* Title & Mobile Tag */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
          <h3 className="text-lg sm:text-2xl font-bold text-theme-text group-hover:text-theme-bg transition-colors duration-200 font-display tracking-tight">
            {item.name}
          </h3>
          {/* Subtle Mobile Tag */}
          <span className="inline-block sm:hidden px-2 py-0.5 rounded-full border border-theme-border/60 group-hover:border-theme-bg/30 text-[9px] font-mono font-medium uppercase tracking-wider text-theme-subtext group-hover:text-theme-bg/80 w-fit">
            {item.type}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between md:justify-end gap-3 mt-3 md:mt-0 w-full md:w-auto relative z-10">
        {/* Desktop Tags */}
        <div className="hidden md:flex items-center gap-2">
          <span className="px-3 py-1 rounded-full border border-theme-border group-hover:border-theme-bg/30 text-xs font-bold uppercase tracking-wider text-theme-text group-hover:text-theme-bg transition-colors">
            {item.category}
          </span>
          <span className="px-3 py-1 rounded-full border border-theme-border group-hover:border-theme-bg/30 text-xs font-bold uppercase tracking-wider text-theme-text group-hover:text-theme-bg transition-colors">
            {item.type}
          </span>
        </div>

        {/* Mobile Indicator / Category badge */}
        <div className="flex md:hidden items-center">
          <span className="px-2 py-0.5 rounded-full bg-theme-text/5 group-hover:bg-theme-bg/20 text-[10px] font-mono uppercase tracking-wider text-theme-subtext group-hover:text-theme-bg">
            {item.category}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 ml-auto md:ml-0">
          <button 
            onClick={(e) => { e.stopPropagation(); onShowCode(); }}
            className="p-2 sm:p-2.5 rounded-full border border-theme-border group-hover:border-theme-bg text-theme-text group-hover:text-theme-bg hover:scale-110 active:scale-90 transition-all flex items-center justify-center"
            title="View Code"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sm:w-[18px] sm:h-[18px]"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
          </button>
          
          <button 
            onClick={(e) => { e.stopPropagation(); onPreview(); }}
            className="px-4 py-1.5 sm:px-5 sm:py-2 rounded-full bg-theme-text text-theme-bg group-hover:bg-theme-bg group-hover:text-theme-text font-bold text-xs sm:text-sm transition-colors active:scale-95 border border-transparent shadow-sm"
          >
            Preview
          </button>
        </div>
      </div>
    </div>
  );
});

DemoCard.displayName = 'DemoCard';