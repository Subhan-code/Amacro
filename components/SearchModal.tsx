import React, { useState, useEffect, useRef } from 'react';
import { TRANSITIONS } from '../constants';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (id: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onSelect }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
    }
  }, [isOpen]);

  const filtered = Object.values(TRANSITIONS).filter(t => 
    t.name.toLowerCase().includes(query.toLowerCase()) || 
    t.description.toLowerCase().includes(query.toLowerCase()) ||
    t.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Enter' && filtered.length > 0) {
          onSelect(filtered[0].id);
      }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={onClose} />
      
      <div className="relative w-full max-w-xl bg-theme-card rounded-xl shadow-2xl border border-theme-border overflow-hidden flex flex-col max-h-[60vh] animate-fade-in ring-1 ring-white/10">
        <div className="flex items-center px-4 py-4 border-b border-theme-border gap-3 bg-theme-bg/50">
          <svg className="w-5 h-5 text-theme-subtext" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <input 
            ref={inputRef}
            type="text" 
            className="flex-1 bg-transparent border-none outline-none text-theme-text placeholder-theme-subtext text-lg h-6"
            placeholder="Search transitions..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <kbd className="hidden sm:inline-block px-2 py-1 rounded bg-theme-bg border border-theme-border text-[10px] font-bold text-theme-subtext font-mono shadow-sm">ESC</kbd>
        </div>
        
        <div className="overflow-y-auto p-2 bg-theme-bg/30">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-theme-subtext">No results found for "{query}"</div>
          ) : (
            <div className="space-y-1">
                {filtered.map((item) => (
                <button
                    key={item.id}
                    onClick={() => onSelect(item.id)}
                    className="w-full text-left px-4 py-3 rounded-lg hover:bg-theme-accent/10 hover:border-theme-accent/20 border border-transparent transition-all flex items-center justify-between group"
                >
                    <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-md flex items-center justify-center bg-theme-bg border border-theme-border text-theme-subtext group-hover:text-theme-accent group-hover:border-theme-accent/30`}>
                             {item.type === 'mask' && <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/></svg>}
                             {item.type === 'clip-path' && <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>}
                             {item.type === 'gif' && <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect><path d="M7 2v20M17 2v20M2 12h20M2 7h5M2 17h5M17 17h5M17 7h5"/></svg>}
                             {item.type === 'transform' && <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>}
                        </div>
                        <div>
                            <div className="font-semibold text-theme-text group-hover:text-theme-accent">{item.name}</div>
                            <div className="text-xs text-theme-subtext">{item.category} • {item.description}</div>
                        </div>
                    </div>
                    <span className="text-xs font-mono text-theme-subtext opacity-0 group-hover:opacity-100 transition-opacity">Jump to</span>
                </button>
                ))}
            </div>
          )}
        </div>
        
        <div className="px-4 py-2 bg-theme-bg/80 border-t border-theme-border text-[10px] text-theme-subtext flex justify-between">
            <span><strong>↑↓</strong> to navigate</span>
            <span><strong>↵</strong> to select</span>
        </div>
      </div>
    </div>
  );
};
