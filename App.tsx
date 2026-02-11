
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { SLIDES_CONTENT } from './constants';
import SlideComponent from './components/Slide';
import Navigation from './components/Navigation';

const App: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const totalSlides = SLIDES_CONTENT.length;

  const handleSlideChange = useCallback((nextIdx: number) => {
    if (isAnimating || nextIdx === currentSlide) return;
    setIsAnimating(true);
    
    // Smooth cross-fade timing
    setTimeout(() => {
      setCurrentSlide(nextIdx);
      setIsAnimating(false);
    }, 400);
  }, [currentSlide, isAnimating]);

  const goToNext = useCallback(() => {
    if (currentSlide < totalSlides - 1) {
      handleSlideChange(currentSlide + 1);
    }
  }, [currentSlide, totalSlides, handleSlideChange]);

  const goToPrev = useCallback(() => {
    if (currentSlide > 0) {
      handleSlideChange(currentSlide - 1);
    }
  }, [currentSlide, handleSlideChange]);

  useEffect(() => {
    // Ensure keyboard focus is captured immediately on load
    if (containerRef.current) {
      containerRef.current.focus();
    }
    
    const handleKeyDown = (e: KeyboardEvent) => {
      // Right/Enter/Space = Forward, Left = Back
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowRight') {
        goToNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'Backspace') {
        goToPrev();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrev]);

  return (
    <div 
      ref={containerRef}
      tabIndex={0}
      className={`h-screen w-screen relative overflow-hidden transition-colors duration-1000 outline-none select-none bg-black`}
      onClick={goToNext}
    >
      {/* Slide Transition Layer - Pure Opacity Fade */}
      <div className={`h-full w-full transition-opacity duration-500 ease-in-out ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
        <SlideComponent 
          slide={SLIDES_CONTENT[currentSlide]} 
          inverted={currentSlide % 2 !== 0}
        />
      </div>

      {/* Progress Line */}
      <div className="fixed top-0 left-0 w-full h-1 bg-white/10 z-50">
        <div 
          className="h-full bg-white transition-all duration-700 ease-out shadow-[0_0_10px_#fff]"
          style={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
        />
      </div>

      <Navigation 
        current={currentSlide} 
        total={totalSlides} 
        onSelect={handleSlideChange} 
      />

      <div className="fixed bottom-12 right-12 z-50 mix-blend-difference">
        <span className="text-[14px] uppercase tracking-[1em] font-black text-white/50">
          {currentSlide + 1} / {totalSlides}
        </span>
      </div>
    </div>
  );
};

export default App;
