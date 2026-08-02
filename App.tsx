import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { flushSync } from 'react-dom';
import { TRANSITIONS, CSS_VARS, TransitionCategory } from './constants';
import './types';
import { DemoCard } from './components/DemoCard';
import { CodeDrawer } from './components/CodeDrawer';
import { ThemeToggle } from './components/ThemeToggle';
import { GsapOverlay, GsapOverlayRef } from './components/GsapOverlay';
import { SearchModal } from './components/SearchModal';

const CATEGORIES: TransitionCategory[] = ['Basic', 'Hard', 'Crazy'];

const App = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [speedMode, setSpeedMode] = useState<'showcase' | 'optimal'>('showcase');
  const [activeTransitionId, setActiveTransitionId] = useState<string>('circle');
  const [activeCategory, setActiveCategory] = useState<TransitionCategory>('Basic');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [drawerContent, setDrawerContent] = useState({ title: '', css: '' });

  const gsapOverlayRef = useRef<GsapOverlayRef>(null);

  useEffect(() => {
    // Set style attribute to igma
    document.documentElement.setAttribute('data-style', 'igma');

    // Check system preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Update duration CSS property when speed mode changes
  useEffect(() => {
    const duration = speedMode === 'showcase' ? '1.2s' : '0.5s';
    document.documentElement.style.setProperty('--duration', duration);
  }, [speedMode]);

  const toggleTheme = useCallback(() => {
    setTheme(prev => {
      const nextTheme = prev === 'light' ? 'dark' : 'light';
      if (nextTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return nextTheme;
    });
  }, []);

  const toggleSpeed = useCallback(() => {
    setSpeedMode(prev => prev === 'showcase' ? 'optimal' : 'showcase');
  }, []);

  const handleTransition = useCallback((id: string, x?: number, y?: number) => {
    setActiveTransitionId(id);
    
    // GSAP Overlay Special Case
    if (id === 'gsap-overlay' || activeTransitionId === 'gsap-overlay') {
      if (gsapOverlayRef.current) {
        const duration = speedMode === 'showcase' ? 0.85 : 0.6; 
        gsapOverlayRef.current.animate(() => {
          flushSync(() => {
            toggleTheme();
          });
        }, duration);
      }
      return;
    }

    // Standard CSS View Transitions
    setTimeout(() => {
      if (!document.startViewTransition) {
        toggleTheme();
        return;
      }

      const transition = document.startViewTransition(() => {
        flushSync(() => {
          toggleTheme();
        });
      });

      transition.ready.then(() => {
        if (typeof x === 'number' && typeof y === 'number') {
          document.documentElement.style.setProperty('--x', `${x}px`);
          document.documentElement.style.setProperty('--y', `${y}px`);
        } else {
          const cx = window.innerWidth / 2;
          const cy = window.innerHeight / 2;
          document.documentElement.style.setProperty('--x', `${cx}px`);
          document.documentElement.style.setProperty('--y', `${cy}px`);
        }
      });
    }, 10);
  }, [activeTransitionId, speedMode, toggleTheme]);

  const openCodeDrawer = useCallback((id: string) => {
    const item = TRANSITIONS[id];
    if (item) {
      setDrawerContent({
        title: item.name,
        css: item.css
      });
      setIsDrawerOpen(true);
    }
  }, []);

  const handleCategoryClick = useCallback((category: TransitionCategory) => {
    setActiveCategory(category);
    const element = document.getElementById(category);
    if (element) {
      const headerOffset = 140;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }, []);

  const handleSearchSelect = useCallback((id: string) => {
    setIsSearchOpen(false);
    handleTransition(id);
    
    const item = TRANSITIONS[id];
    if (item) {
      setActiveCategory(item.category);
      const categoryEl = document.getElementById(item.category);
      if (categoryEl) {
        const headerOffset = 140;
        const elementPosition = categoryEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    }
  }, [handleTransition]);

  const activeCSS = useMemo(() => {
    return activeTransitionId === 'gsap-overlay' ? '' : (TRANSITIONS[activeTransitionId]?.css || '');
  }, [activeTransitionId]);

  // Pre-group transitions by category for efficient rendering
  const transitionsByCategory = useMemo(() => {
    const map: Record<TransitionCategory, typeof TRANSITIONS[string][]> = {
      Basic: [],
      Hard: [],
      Crazy: []
    };
    Object.values(TRANSITIONS).forEach(item => {
      if (map[item.category]) {
        map[item.category].push(item);
      }
    });
    return map;
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative selection:bg-theme-accent/30 selection:text-theme-accent pl-0 md:pl-20 bg-theme-bg">
      <style>{CSS_VARS}</style>
      <style>{activeCSS}</style>
      
      {/* Background Blobs */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-[-10%] w-[500px] h-[500px] bg-purple-300/20 dark:bg-purple-900/10 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 right-[-10%] w-[500px] h-[500px] bg-blue-300/20 dark:bg-blue-900/10 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-[20%] w-[500px] h-[500px] bg-indigo-300/20 dark:bg-indigo-900/10 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>
      
      <GsapOverlay ref={gsapOverlayRef} />
      
      <SearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
        onSelect={handleSearchSelect} 
      />

      {/* --- IGMA SIDEBAR (Left) --- */}
      <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-20 border-r-2 border-theme-border flex-col justify-between items-center py-8 z-50 bg-theme-bg">
        {/* Top Logo */}
        <div className="transform hover:scale-110 transition-transform duration-300 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <img 
            src="https://github.com/Subhan-code/Luma-Transitions-Page-Reveal-Animations-/blob/main/luma%20Pinterest%20Logo%20.png?raw=true" 
            alt="Luma Logo" 
            className="w-10 h-10 object-contain"
          />
        </div>

        {/* Vertical Text */}
        <div className="vertical-text font-bubble text-lg tracking-[0.2em] text-theme-text whitespace-nowrap select-none opacity-60 hover:opacity-100 transition-opacity">
          REALITY IS NEGOTIABLE
        </div>

        {/* Bottom Icon (Magic) */}
        <div className="text-theme-text transform hover:rotate-12 transition-transform cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m5 16 .5 3.5 3.5.5-3.5.5-.5 3.5-.5-3.5-3.5-.5 3.5-.5z"/><path d="m15 2 1 6 6 1-6 1-1 6-1-6-6-1 6-1z"/></svg>
        </div>
      </aside>

      {/* --- IGMA HEADER --- */}
      <header className="fixed top-0 left-0 right-0 z-40 md:left-20 bg-theme-bg/90 backdrop-blur-md border-b border-theme-border">
        <div className="w-full px-6 py-6 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left: Nav Buttons */}
          <div className="flex items-center gap-3">
            {CATEGORIES.map((cat) => (
              <button 
                key={cat} 
                onClick={() => handleCategoryClick(cat)}
                className={`
                  px-5 py-1.5 rounded-full border-2 text-sm font-bold uppercase tracking-wider transition-all duration-200
                  ${activeCategory === cat 
                    ? 'border-theme-text bg-theme-text text-theme-bg shadow-[4px_4px_0px_0px_var(--c-border)] translate-x-[-2px] translate-y-[-2px]' 
                    : 'border-theme-border text-theme-subtext hover:border-theme-text hover:text-theme-text'
                  }
                `}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Center: Status Pill */}
          <div className="hidden lg:flex items-center px-5 py-2 rounded-full border border-theme-border bg-theme-bg text-theme-text text-sm font-medium shadow-sm">
            <span className="relative flex h-2.5 w-2.5 mr-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-theme-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-theme-accent"></span>
            </span>
            Mode: {speedMode === 'showcase' ? 'Showcase (1.2s)' : 'Optimal (0.5s)'}
            <span className="ml-2 font-serif italic opacity-70">→ Igma Theme</span>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-4">
            <a 
              href="https://github.com/Subhan-code/Lumina-Transitions-" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-theme-border text-xs font-bold uppercase tracking-widest hover:bg-theme-text hover:text-theme-bg transition-colors"
              title="GitHub Repository"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
              <span>GitHub</span>
            </a>
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-theme-border text-xs font-bold uppercase tracking-widest hover:bg-theme-text hover:text-theme-bg transition-colors"
              title="Search (Cmd+K)"
            >
              <span>Search</span>
              <span className="px-1.5 py-0.5 rounded bg-theme-text/10 border border-theme-border/50 text-[10px] opacity-70">⌘K</span>
            </button>
            <button 
              onClick={toggleSpeed} 
              className="w-32 px-4 py-2 rounded-full border border-theme-border text-xs font-bold uppercase tracking-widest hover:bg-theme-text hover:text-theme-bg transition-colors text-center"
            >
              {speedMode === 'showcase' ? 'Slow Mode' : 'Fast Mode'}
            </button>
            <ThemeToggle theme={theme} onToggle={(x, y) => handleTransition(activeTransitionId, x, y)} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-6 max-w-7xl relative z-10 pt-32">
        {/* IGMA HERO - Marquee */}
        <div className="relative py-16 select-none overflow-hidden w-full mb-12">
          <div className="flex items-center whitespace-nowrap animate-marquee">
            <h1 className="text-[5rem] md:text-[7rem] leading-none igma-outline-text hover:text-theme-text hover:text-stroke-0 transition-all duration-700 ease-out mx-4">
              PAGE • TRANSITION • CREATIVE • DEVELOPER • 
            </h1>
            <h1 className="text-[5rem] md:text-[7rem] leading-none igma-outline-text hover:text-theme-text hover:text-stroke-0 transition-all duration-700 ease-out mx-4">
              PAGE • TRANSITION • CREATIVE • DEVELOPER • 
            </h1>
          </div>
        </div>

        {/* CONTENT - Igma List Sections */}
        <div className="space-y-24 mb-32">
          {CATEGORIES.map((category) => (
            <div key={category} id={category} className="scroll-mt-32">
              <div className="flex items-end gap-4 mb-8">
                <h2 className="text-4xl md:text-5xl font-bold text-theme-text tracking-tight font-bubble">
                  {category}
                </h2>
                <span className="text-sm font-mono text-theme-subtext mb-2 uppercase tracking-widest">
                  /// Selected Works
                </span>
              </div>
              
              <div className="flex flex-col gap-3">
                {transitionsByCategory[category]?.map((item, index) => (
                  <DemoCard 
                    key={item.id}
                    item={item}
                    index={index}
                    isActive={activeTransitionId === item.id}
                    onPreview={() => handleTransition(item.id)}
                    onShowCode={() => openCodeDrawer(item.id)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>

      <CodeDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        title={drawerContent.title} 
        css={drawerContent.css} 
      />
      
      {/* IGMA FOOTER */}
      <footer className="relative z-10 border-t-2 border-theme-border bg-theme-bg md:pl-20 text-theme-text">
        <div className="container mx-auto px-6 max-w-7xl py-16 flex flex-col md:flex-row justify-between items-start gap-12">
          {/* Left: Branding */}
          <div className="flex flex-col items-start gap-6 max-w-md">
            <div className="flex items-center gap-4">
              <img 
                src="https://github.com/Subhan-code/Luma-Transitions-Page-Reveal-Animations-/blob/main/luma%20Pinterest%20Logo%20.png?raw=true" 
                alt="Luma Logo" 
                className="w-12 h-12 object-contain"
              />
              <h2 className="text-4xl font-bold font-display tracking-tighter">Luma Transitions</h2>
            </div>
            
            <div className="space-y-2">
              <p className="text-xl font-medium">Designed & Engineered by <span className="underline decoration-wavy decoration-theme-accent/50 underline-offset-4">Syed Subhan</span></p>
              <p className="text-theme-subtext italic">"Simplicity is the ultimate sophistication."</p>
            </div>
            
            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs font-mono uppercase tracking-widest opacity-80">
              <span>Created by <strong className="text-theme-text font-bold">Syed Subhan</strong></span>
              <span>·</span>
              <span>Terms & License</span>
            </div>
          </div>

          {/* Right: Actions & Socials */}
          <div className="flex flex-col items-start md:items-end gap-8">
            <a 
              href="https://github.com/Subhan-code/Lumina-Transitions-" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-8 py-4 rounded-full border-2 border-theme-text bg-theme-text text-theme-bg hover:bg-theme-bg hover:text-theme-text transition-all duration-300 shadow-[4px_4px_0px_0px_var(--c-border)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              <span className="font-bold uppercase tracking-wider text-sm">Star on GitHub</span>
            </a>

            <div className="flex flex-col md:items-end gap-3">
              <h3 className="text-sm font-mono uppercase tracking-widest text-theme-subtext mb-1">Connect</h3>
              <div className="flex items-center gap-6">
                <a href="https://x.com/SubhanHQ" target="_blank" rel="noreferrer" className="text-lg font-bold hover:text-theme-accent transition-colors flex items-center gap-2 group">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-y-1 transition-transform"><path d="M4 4l11.733 16h4.267l-11.733 -16z" /><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" /></svg>
                  Twitter
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;