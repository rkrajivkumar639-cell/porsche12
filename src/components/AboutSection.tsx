import React from 'react';
import { Trophy, Flag, Shield, Award, Sparkles } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const milestones = [
    {
      year: '1948',
      title: 'Porsche 356 "No. 1" Roadster',
      text: 'Ferry Porsche creates the first automobile bearing the Porsche crest. Lightweight tubular frame with mid-mounted boxer engine.',
    },
    {
      year: '1963',
      title: 'The Birth of the 911',
      text: 'Ferdinand Alexander "Butzi" Porsche pens the iconic flyline and air-cooled flat-six architecture that remains unbroken today.',
    },
    {
      year: '1970',
      title: 'First Overall Le Mans Victory',
      text: 'The legendary Porsche 917 KH in Salzburg livery conquers the 24 Hours of Le Mans, inaugurating 19 overall victories.',
    },
    {
      year: '1984',
      title: 'PDK Dual-Clutch & Group C Era',
      text: 'Porsche invents dual-clutch transmission in motorsport competition on the invincible 956/962 prototypes.',
    },
    {
      year: '2019',
      title: 'Taycan & Electrified Supremacy',
      text: 'First 800V production vehicle arrives, demonstrating that electric propulsion can deliver authentic, repeatable Porsche soul.',
    },
    {
      year: '2026+',
      title: 'eFuels & Carbon-Neutral Performance',
      text: 'Pioneering synthetic eFuels from wind power in Patagonia, keeping internal combustion engines alive with net-zero carbon.',
    },
  ];

  return (
    <section id="about" className="py-24 sm:py-32 bg-neutral-950 border-t border-neutral-800 text-white relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Quote Spotlight */}
        <div className="max-w-4xl mx-auto text-center mb-24">
          <div className="w-12 h-[1px] bg-red-600 mx-auto mb-8" />
          <blockquote
            className="text-2xl sm:text-4xl lg:text-5xl font-light text-neutral-100 tracking-tight leading-tight uppercase"
            style={{ fontFamily: 'var(--font-heading)', textWrap: 'balance' }}
          >
            "IN THE BEGINNING I LOOKED AROUND AND COULD NOT FIND QUITE THE CAR I DREAMED OF. SO I DECIDED TO BUILD IT MYSELF."
          </blockquote>
          <cite className="block mt-6 text-xs uppercase tracking-[0.3em] text-neutral-400 not-italic font-semibold">
            — Ferry Porsche, 1948
          </cite>
        </div>

        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-red-500 font-semibold mb-3">
            <span>Stuttgart-Zuffenhausen & Weissach</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span>Est. 1948</span>
          </div>
          <h2
            className="text-3xl sm:text-5xl font-bold tracking-tight text-white uppercase leading-tight"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            MORE THAN A CAR. A LEGACY.
          </h2>
          <p className="mt-4 text-neutral-300 text-sm sm:text-base font-light leading-relaxed">
            For more than seven decades, Porsche has refused to treat the sports car as an indulgence.
            To us, it is an exacting mathematical question: how to translate mechanical friction, airflow, and kinetic energy into pure human exhilaration.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          <div className="p-8 bg-neutral-900/40 border border-neutral-800 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 bg-neutral-950 border border-neutral-800 flex items-center justify-center text-red-500 mb-6">
                <Trophy className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold uppercase text-white mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                19 Le Mans Victories
              </h3>
              <p className="text-xs text-neutral-400 font-light leading-relaxed">
                The most successful manufacturer in the history of the 24 Hours of Le Mans. Every road car inherits technology forged under 24-hour endurance stress.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-neutral-800 text-[11px] text-neutral-500 uppercase tracking-wider">
              Motorsport Genesis
            </div>
          </div>

          <div className="p-8 bg-neutral-900/40 border border-neutral-800 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 bg-neutral-950 border border-neutral-800 flex items-center justify-center text-red-500 mb-6">
                <Flag className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold uppercase text-white mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                Nürburgring Benchmark
              </h3>
              <p className="text-xs text-neutral-400 font-light leading-relaxed">
                From the all-time 5:19.55 lap of the 919 Hybrid Evo to production benchmarks set by the 911 GT3 RS and Taycan Turbo GT.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-neutral-800 text-[11px] text-neutral-500 uppercase tracking-wider">
              Green Hell Mastery
            </div>
          </div>

          <div className="p-8 bg-neutral-900/40 border border-neutral-800 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 bg-neutral-950 border border-neutral-800 flex items-center justify-center text-red-500 mb-6">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold uppercase text-white mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                70%+ In Service
              </h3>
              <p className="text-xs text-neutral-400 font-light leading-relaxed">
                More than 70 percent of all Porsche vehicles ever manufactured are still licensed and driven on roads worldwide today.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-neutral-800 text-[11px] text-neutral-500 uppercase tracking-wider">
              Obsessive Durability
            </div>
          </div>

          <div className="p-8 bg-neutral-900/40 border border-neutral-800 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 bg-neutral-950 border border-neutral-800 flex items-center justify-center text-red-500 mb-6">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold uppercase text-white mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                Exclusive Manufaktur
              </h3>
              <p className="text-xs text-neutral-400 font-light leading-relaxed">
                Handcrafted bespoke commissions directly at Zuffenhausen. Bespoke leathers, personalized Paint to Sample (PTS), and tailored trim.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-neutral-800 text-[11px] text-neutral-500 uppercase tracking-wider">
              Bespoke Artistry
            </div>
          </div>
        </div>

        {/* Heritage Timeline */}
        <div className="border border-neutral-800 bg-neutral-900/20 p-8 sm:p-12">
          <div className="text-xs uppercase tracking-[0.25em] text-red-500 font-semibold mb-8">
            The Historical Lineage · Key Milestones
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {milestones.map((m) => (
              <div key={m.year} className="relative pl-6 border-l border-neutral-800">
                <div className="absolute -left-[5px] top-0 w-2 h-2 bg-red-600" />
                <div className="text-2xl font-bold text-white tabular-nums mb-1 font-mono">
                  {m.year}
                </div>
                <div className="text-sm font-semibold text-neutral-200 uppercase mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                  {m.title}
                </div>
                <p className="text-xs text-neutral-400 font-light leading-relaxed">
                  {m.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
