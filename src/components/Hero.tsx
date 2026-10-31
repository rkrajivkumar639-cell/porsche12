import React, { useState } from 'react';
import { ChevronDown, ArrowRight, Gauge, Zap, Trophy, ShieldCheck } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
  onDiscoverClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onDiscoverClick }) => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);

  // Reliable ultra-cinematic automotive video loop
  // Falls back gracefully to high-res cinematic image + ambient animation if video fails or is blocked
  const videoSource = 'https://assets.mixkit.co/videos/preview/mixkit-sports-car-drifting-on-a-road-at-sunset-41275-large.mp4';
  const fallbackHeroImage = 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=2560&q=90';

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden bg-neutral-950">
      {/* Background Media Container */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Cinematic Fallback Image (always present, cross-fades) */}
        <img
          src={fallbackHeroImage}
          alt="Porsche 911 on Alpine pass"
          className={`absolute inset-0 w-full h-full object-cover object-center scale-105 transition-transform duration-10000 ease-out transform motion-safe:hover:scale-100 ${
            videoLoaded && !videoError ? 'opacity-0' : 'opacity-100'
          }`}
          referrerPolicy="no-referrer"
        />

        {/* Cinematic Background Video with Auto-play, Muted, Loop */}
        {!videoError && (
          <video
            autoPlay
            loop
            muted
            playsInline
            onLoadedData={() => setVideoLoaded(true)}
            onError={() => setVideoError(true)}
            className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ${
              videoLoaded ? 'opacity-70' : 'opacity-0'
            }`}
          >
            <source src={videoSource} type="video/mp4" />
          </video>
        )}

        {/* Premium Vignette & Contrast Scrims */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-neutral-950/70" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(10,10,10,0.85)_100%)]" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 sm:px-8 pt-36 sm:pt-44 pb-20 flex-1 flex flex-col justify-center">
        <div className="max-w-3xl">
          {/* Brand Kicker */}
          <div className="flex items-center gap-3 text-xs sm:text-sm tracking-[0.3em] uppercase text-neutral-400 font-medium mb-4">
            <span className="w-8 h-[1px] bg-red-600 inline-block" />
            <span>The Ultimate Porsche Experience</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span>Stuttgart</span>
          </div>

          {/* Main Heading */}
          <h1
            className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white uppercase leading-[1.05] mb-6"
            style={{ fontFamily: 'var(--font-heading)', textWrap: 'balance' }}
          >
            DRIVEN BY <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neutral-400">PERFECTION.</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-neutral-300 font-light leading-relaxed max-w-2xl mb-10">
            Engineering excellence. Timeless design. Unmatched performance.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button
              onClick={onExploreClick}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-white bg-red-600 hover:bg-red-700 active:scale-[0.98] transition-all shadow-xl shadow-red-950/50 cursor-pointer border border-red-500/40"
            >
              <span>Explore Porsche</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onDiscoverClick}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-200 bg-neutral-900/80 hover:bg-neutral-800 hover:text-white active:scale-[0.98] transition-all border border-neutral-700/80 backdrop-blur-sm cursor-pointer"
            >
              <span>Discover Models</span>
            </button>
          </div>
        </div>
      </div>

      {/* Animated Scroll Indicator */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 sm:px-8 pb-8 flex items-center justify-between">
        <button
          onClick={onExploreClick}
          className="group inline-flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-neutral-400 hover:text-white transition-colors cursor-pointer"
        >
          <span className="w-5 h-8 border border-neutral-600 group-hover:border-white rounded-full flex items-start justify-center p-1 transition-colors">
            <span className="w-1 h-2 bg-red-500 rounded-full animate-bounce" />
          </span>
          <span className="hidden sm:inline">Scroll to Explore</span>
        </button>

        {/* Quick Ex-Showroom Note */}
        <div className="text-xs text-neutral-400 uppercase tracking-widest hidden md:block">
          Official Porsche India Lineup · 2026 Collection
        </div>
      </div>

      {/* KPI Proof Strip Below Hero */}
      <div className="relative z-10 border-t border-neutral-800/80 bg-neutral-950/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div className="flex items-center gap-4">
              <div className="p-2.5 bg-neutral-900 border border-neutral-800 text-neutral-300">
                <Gauge className="w-5 h-5 text-red-500" />
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-white tabular-nums tracking-tight">
                  2.2<span className="text-xs text-neutral-400 ml-1 font-normal uppercase">sec</span>
                </div>
                <div className="text-xs uppercase tracking-wider text-neutral-400 mt-0.5">
                  0–100 km/h (Taycan GT)
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-2.5 bg-neutral-900 border border-neutral-800 text-neutral-300">
                <Zap className="w-5 h-5 text-red-500" />
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-white tabular-nums tracking-tight">
                  1,108<span className="text-xs text-neutral-400 ml-1 font-normal uppercase">PS</span>
                </div>
                <div className="text-xs uppercase tracking-wider text-neutral-400 mt-0.5">
                  Peak Electric Power
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-2.5 bg-neutral-900 border border-neutral-800 text-neutral-300">
                <Trophy className="w-5 h-5 text-red-500" />
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-white tabular-nums tracking-tight">
                  19<span className="text-xs text-neutral-400 ml-1 font-normal uppercase">Wins</span>
                </div>
                <div className="text-xs uppercase tracking-wider text-neutral-400 mt-0.5">
                  24h Le Mans Overall
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-2.5 bg-neutral-900 border border-neutral-800 text-neutral-300">
                <ShieldCheck className="w-5 h-5 text-red-500" />
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-white tabular-nums tracking-tight">
                  330<span className="text-xs text-neutral-400 ml-1 font-normal uppercase">km/h</span>
                </div>
                <div className="text-xs uppercase tracking-wider text-neutral-400 mt-0.5">
                  Top Speed (Turbo S)
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
