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
      className={`w-full flex flex-col md:flex-row md:items-center justify-between py-5 px-6 border-2 border-theme-border rounded-[8px] bg-theme-bg group hover:bg-theme-text transition-all duration-300 cursor-pointer relative overflow-hidden ${
        isActive ? 'ring-2 ring-theme-accent shadow-[4px_4px_0px_0px_var(--c-border)]' : ''
      }`}
      onClick={onPreview}
    >
      <div className="flex items-center gap-8 w-full relative z-10">
        {/* Year / ID */}
        <span className="text-theme-subtext group-hover:text-theme-bg/70 font-mono text-sm min-w-[40px] transition-colors">
          202{4 - (index % 5)}
        </span>

        {/* Title */}
        <h3 className="text-2xl font-bold text-theme-text group-hover:text-theme-bg transition-colors duration-300 font-display tracking-tight">
          {item.name}
        </h3>
      </div>

      <div className="flex items-center gap-4 mt-4 md:mt-0 ml-auto relative z-10">
        {/* Tags */}
        <div className="hidden md:flex items-center gap-2">
          <span className="px-3 py-1 rounded-full border border-theme-border group-hover:border-theme-bg/30 text-xs font-bold uppercase tracking-wider text-theme-text group-hover:text-theme-bg transition-colors">
            {item.category}
          </span>
          <span className="px-3 py-1 rounded-full border border-theme-border group-hover:border-theme-bg/30 text-xs font-bold uppercase tracking-wider text-theme-text group-hover:text-theme-bg transition-colors">
            {item.type}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button 
            onClick={(e) => { e.stopPropagation(); onShowCode(); }}
            className="p-2 rounded-full border border-theme-border group-hover:border-theme-bg text-theme-text group-hover:text-theme-bg hover:scale-110 transition-all"
            title="View Code"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
          </button>
          
          <button 
            onClick={(e) => { e.stopPropagation(); onPreview(); }}
            className="px-5 py-2 rounded-full bg-theme-text text-theme-bg group-hover:bg-theme-bg group-hover:text-theme-text font-bold text-sm transition-colors border border-transparent"
          >
            Preview
          </button>
        </div>
      </div>
    </div>
  );
});

DemoCard.displayName = 'DemoCard';