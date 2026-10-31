import React, { useState, useEffect } from 'react';
import { GALLERY_ITEMS } from '../data/porscheData';
import { ChevronLeft, ChevronRight, Maximize2, X, MapPin } from 'lucide-react';

export const InteractiveGallery: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const currentItem = GALLERY_ITEMS[activeIndex];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % GALLERY_ITEMS.length);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'Escape') setIsFullscreen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section id="gallery" className="py-24 sm:py-32 bg-neutral-950 text-white relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-red-500 font-semibold mb-3">
              <span>Visual Anthology</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span>Cinematic Portfolio</span>
            </div>
            <h2
              className="text-3xl sm:text-5xl font-bold tracking-tight text-white uppercase"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Porsche In Motion
            </h2>
            <p className="mt-3 text-neutral-400 text-sm sm:text-base max-w-xl font-light">
              High-resolution captures from Weissach development tracks, legendary circuits, and dramatic mountain passes.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-neutral-400 uppercase tracking-widest tabular-nums">
              Frame 0{activeIndex + 1} / 0{GALLERY_ITEMS.length}
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={handlePrev}
                aria-label="Previous photograph"
                className="p-3 bg-neutral-900 border border-neutral-800 hover:border-neutral-600 text-white transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next photograph"
                className="p-3 bg-neutral-900 border border-neutral-800 hover:border-neutral-600 text-white transition-colors cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Large Cinematic Frame */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-900 border border-neutral-800 shadow-2xl group">
          <img
            key={currentItem.id}
            src={currentItem.image}
            alt={currentItem.title}
            className="w-full h-full object-cover object-center transition-all duration-700 ease-out"
            referrerPolicy="no-referrer"
          />

          {/* Scrim Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent opacity-80" />

          {/* Caption & Metadata Strip */}
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-red-500 font-semibold mb-2">
                <span>{currentItem.model}</span>
                <span aria-hidden="true" className="text-neutral-500">·</span>
                <span className="text-neutral-400 flex items-center gap-1 font-normal">
                  <MapPin className="w-3 h-3 text-neutral-400" />
                  {currentItem.location}
                </span>
              </div>
              <h3
                className="text-xl sm:text-3xl font-bold uppercase text-white tracking-tight"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {currentItem.title}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 font-light mt-1 max-w-xl">
                {currentItem.subtitle}
              </p>
            </div>

            <button
              onClick={() => setIsFullscreen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs uppercase tracking-wider font-semibold text-neutral-200 bg-neutral-950/80 hover:bg-neutral-900 hover:text-white border border-neutral-700/80 backdrop-blur-md transition-colors cursor-pointer shrink-0"
            >
              <Maximize2 className="w-4 h-4" />
              <span>Full View</span>
            </button>
          </div>

          {/* Arrow Overlays */}
          <button
            onClick={handlePrev}
            aria-label="Previous image"
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/60 hover:bg-black text-white border border-neutral-700/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hidden sm:block"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={handleNext}
            aria-label="Next image"
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/60 hover:bg-black text-white border border-neutral-700/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hidden sm:block"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Thumbnail Navigation Scrubber */}
        <div className="grid grid-cols-4 sm:grid-cols-7 gap-3 mt-4">
          {GALLERY_ITEMS.map((item, index) => (
            <button
              key={item.id}
              onClick={() => setActiveIndex(index)}
              className={`relative aspect-[16/10] overflow-hidden border transition-all cursor-pointer ${
                activeIndex === index
                  ? 'border-red-500 ring-2 ring-red-500/50 scale-[1.02]'
                  : 'border-neutral-800 opacity-50 hover:opacity-100'
              }`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute bottom-1 left-1.5 text-[9px] uppercase font-bold text-white tracking-widest drop-shadow">
                0{index + 1}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Fullscreen Modal View */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-4 sm:p-8 animate-in fade-in duration-200">
          <div className="flex items-center justify-between z-10 pb-4">
            <div className="text-sm font-bold uppercase tracking-widest text-white">
              {currentItem.title} · <span className="text-neutral-400 font-normal">{currentItem.model}</span>
            </div>
            <button
              onClick={() => setIsFullscreen(false)}
              className="p-3 text-neutral-300 hover:text-white bg-neutral-900 border border-neutral-800 cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="relative flex-1 flex items-center justify-center overflow-hidden my-4">
            <img
              src={currentItem.image}
              alt={currentItem.title}
              className="max-w-full max-h-[80vh] object-contain shadow-2xl"
              referrerPolicy="no-referrer"
            />

            <button
              onClick={handlePrev}
              className="absolute left-4 p-4 bg-black/70 hover:bg-black text-white border border-neutral-800 cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 p-4 bg-black/70 hover:bg-black text-white border border-neutral-800 cursor-pointer"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          <div className="flex items-center justify-between text-xs text-neutral-400 border-t border-neutral-800 pt-4">
            <div>{currentItem.subtitle}</div>
            <div className="tabular-nums">0{activeIndex + 1} / 0{GALLERY_ITEMS.length}</div>
          </div>
        </div>
      )}
    </section>
  );
};
