
import React, { useRef } from 'react';

interface ThemeToggleProps {
  theme: 'light' | 'dark';
  onToggle: (x: number, y: number) => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, onToggle }) => {
  const labelRef = useRef<HTMLLabelElement>(null);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Handled manually
    
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;

    if (labelRef.current) {
      const rect = labelRef.current.getBoundingClientRect();
      x = rect.left + rect.width / 2;
      y = rect.top + rect.height / 2;
    }
    
    onToggle(x, y);
  };

  return (
    <label ref={labelRef} className="toggle" onClick={handleClick} aria-label="Toggle theme">
      <input type="checkbox" checked={theme === 'dark'} readOnly />
      <div></div>
    </label>
  );
};
