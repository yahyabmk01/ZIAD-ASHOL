
import React from 'react';

interface NavProps {
  current: number;
  total: number;
  onSelect: (idx: number) => void;
}

const Navigation: React.FC<NavProps> = ({ current, total, onSelect }) => {
  return (
    <div className="fixed bottom-12 left-10 flex flex-col gap-8 z-50">
      {Array.from({ length: total }).map((_, i) => (
        <button 
          key={i}
          onClick={(e) => { e.stopPropagation(); onSelect(i); }}
          className="group flex items-center gap-6 relative outline-none"
          aria-label={`Slide ${i + 1}`}
        >
          <div 
            className={`h-0.5 transition-all duration-700 ease-in-out ${i === current ? 'w-24 bg-white shadow-[0_0_20px_rgba(255,255,255,0.8)]' : 'w-6 bg-white/10 group-hover:bg-white/40 group-hover:w-12'}`}
          />
          <span className={`text-[12px] font-black tracking-widest transition-all duration-500 ${i === current ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
            SLIDE 0{i + 1}
          </span>
        </button>
      ))}
    </div>
  );
};

export default Navigation;
