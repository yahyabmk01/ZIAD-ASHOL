
import React from 'react';
import { SlideData } from '../types';

interface SlideProps {
  slide: SlideData;
  inverted?: boolean;
}

const SlideComponent: React.FC<SlideProps> = ({ slide, inverted }) => {
  const isTitle = slide.type === 'title';

  const bgColor = inverted ? 'bg-zinc-100 text-black' : 'bg-black text-white';
  const accentColor = inverted ? 'bg-black text-white' : 'bg-white text-black';
  const borderCol = inverted ? 'border-black/20' : 'border-white/20';
  const textMuted = inverted ? 'text-black/40' : 'text-white/30';

  if (isTitle) {
    return (
      <div className={`h-full w-full flex flex-col items-center justify-center p-8 lg:p-24 ${bgColor} transition-colors duration-1000 relative overflow-hidden`}>
        {/* Visual Background */}
        <div className="absolute inset-0 opacity-40 z-0 grayscale contrast-125 mix-blend-luminosity">
          <img src={slide.imageUrl} alt="" className="w-full h-full object-cover ken-burns" />
        </div>
        
        <div className="relative z-10 text-center w-full max-w-7xl">
          <div className="mb-12">
            <span className={`text-xs lg:text-sm uppercase tracking-[1.5em] font-black ${textMuted} block mb-6 animate-pulse`}>
               توعية الشباب العربي
            </span>
            <h1 className="text-5xl lg:text-[11rem] font-black leading-none tracking-tighter uppercase mb-6">
              {slide.title}
            </h1>
            <p className="text-xl lg:text-4xl font-light opacity-90 tracking-wide">{slide.subtitle}</p>
          </div>
          
          <div className={`h-0.5 w-full max-w-2xl mx-auto bg-current opacity-20 mb-16`} />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-12 w-full">
            {slide.presenters?.map((p, i) => (
              <div key={i} className="flex flex-col gap-2">
                <span className={`text-[10px] uppercase tracking-widest font-black ${textMuted}`}>مقدم {i+1}</span>
                <span className="text-sm lg:text-2xl font-black">{p}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`h-full w-full flex flex-col lg:flex-row-reverse overflow-hidden ${bgColor} transition-colors duration-1000 relative`}>
      
      {/* Image Column - Fixed 50% */}
      <div className="w-full lg:w-1/2 h-[35%] lg:h-full relative overflow-hidden grayscale contrast-125 border-b lg:border-b-0 lg:border-l border-white/10">
        <img 
          src={slide.imageUrl} 
          alt="visual" 
          className="w-full h-full object-cover ken-burns" 
        />
        <div className={`absolute inset-0 bg-gradient-to-t ${inverted ? 'from-white/60' : 'from-black/80'} via-transparent to-transparent lg:hidden`} />
        
        {/* Floating Number Decor */}
        <div className={`absolute bottom-10 left-10 text-[8rem] lg:text-[18rem] font-black opacity-10 pointer-events-none select-none`}>
          0{slide.id}
        </div>
      </div>

      {/* Content Column - Strictly NO scrolling */}
      <div className="w-full lg:w-1/2 h-[65%] lg:h-full flex flex-col justify-center p-8 lg:p-24 relative overflow-hidden">
        <div className="w-full max-w-4xl text-right ml-auto flex flex-col justify-between h-full lg:h-auto gap-8 lg:gap-16">
          
          <div className="space-y-4">
             <span className={`text-[10px] uppercase tracking-[0.5em] font-black ${textMuted}`}>الجزء 0{slide.id}</span>
            <h2 className="text-4xl lg:text-[6rem] font-black leading-[0.9] tracking-tighter uppercase">
              {slide.title}
            </h2>
          </div>

          <div className="space-y-8 lg:space-y-12">
            {slide.intro && (
              <p className="text-xl lg:text-3xl font-bold leading-relaxed border-r-[12px] border-current pr-8 py-2">
                {slide.intro}
              </p>
            )}

            <div className="space-y-8 lg:space-y-12">
              {slide.sections?.map((section, idx) => (
                <div key={idx} className="space-y-6">
                  <h3 className={`text-xs lg:text-lg font-black uppercase tracking-[0.4em] ${textMuted} border-b-2 ${borderCol} pb-3 inline-block`}>
                    {section.title}
                  </h3>
                  <ul className="grid grid-cols-1 gap-4 lg:gap-8">
                    {section.items.map((item, i) => (
                      <li key={i} className="text-lg lg:text-2xl font-black flex gap-6 items-start">
                         <span className="w-3 h-3 mt-3 bg-current shrink-0 transform rotate-45" />
                         <span className="leading-tight">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {slide.extraInfo && (
              <div className={`${accentColor} p-6 lg:p-10 font-black text-lg lg:text-3xl border-4 border-current shadow-[12px_12px_0px_rgba(128,128,128,0.2)] transform -rotate-1`}>
                {slide.extraInfo}
              </div>
            )}
          </div>

          {slide.footer && (
            <div className="pt-8 lg:pt-12 border-t-2 border-current/10">
               <p className="text-2xl lg:text-5xl font-black italic tracking-tighter">
                  {slide.footer}
               </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SlideComponent;
