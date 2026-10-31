import React, { useState } from 'react';
import { ENGINEERING_TOPICS } from '../data/porscheData';
import { Cpu, Wind, Zap, Gauge, ShieldCheck, Activity, Compass, ArrowRight } from 'lucide-react';

export const PerformanceEngineering: React.FC = () => {
  const [activeTopicId, setActiveTopicId] = useState<string>('boxer-engine');

  // Interactive simulation states
  const [rpmSlider, setRpmSlider] = useState<number>(7500);
  const [speedSlider, setSpeedSlider] = useState<number>(240);
  const [attackModeActive, setAttackModeActive] = useState<boolean>(false);
  const [pdkGear, setPdkGear] = useState<number>(4);

  const activeTopic = ENGINEERING_TOPICS.find((t) => t.id === activeTopicId) || ENGINEERING_TOPICS[0];

  const getTopicIcon = (id: string) => {
    switch (id) {
      case 'boxer-engine':
        return <Cpu className="w-4 h-4" />;
      case 'electric-performance':
        return <Zap className="w-4 h-4" />;
      case 'aerodynamics':
        return <Wind className="w-4 h-4" />;
      case 'transmission':
        return <Gauge className="w-4 h-4" />;
      case 'braking-systems':
        return <ShieldCheck className="w-4 h-4" />;
      case 'driving-dynamics':
        return <Activity className="w-4 h-4" />;
      case 'design-philosophy':
      default:
        return <Compass className="w-4 h-4" />;
    }
  };

  // Aerodynamic downforce calculation: quadratic with speed (kg = (v/285)^2 * 860)
  const dynamicDownforce = Math.round(Math.pow(speedSlider / 285, 2) * 860);
  // Engine power calculation at RPM
  const simulatedHp = Math.round((rpmSlider / 9000) * 525);

  return (
    <section id="engineering" className="py-24 sm:py-32 bg-neutral-950 border-t border-neutral-800 text-white relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-red-500 font-semibold mb-3">
            <span>Weissach Development Center</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span>Motorsport Engineering</span>
          </div>
          <h2
            className="text-3xl sm:text-5xl font-bold tracking-tight text-white uppercase leading-tight"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            ENGINEERED TO EXCITE.
          </h2>
          <p className="mt-3 text-neutral-400 text-sm sm:text-base font-light leading-relaxed">
            Every millimeter is forged by aerodynamic necessity and tested on the world’s most punishing proving grounds.
            Explore the core pillars of Porsche technical mastery.
          </p>
        </div>

        {/* 7 Engineering Domain Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-neutral-800/80">
          {ENGINEERING_TOPICS.map((topic) => (
            <button
              key={topic.id}
              onClick={() => setActiveTopicId(topic.id)}
              className={`flex items-center gap-2.5 px-4 py-3 text-xs uppercase tracking-wider font-semibold transition-all whitespace-nowrap cursor-pointer shrink-0 border ${
                activeTopicId === topic.id
                  ? 'bg-neutral-100 text-neutral-950 border-neutral-100 shadow-md'
                  : 'bg-neutral-900/60 text-neutral-400 hover:text-white border-neutral-800 hover:border-neutral-700'
              }`}
            >
              <span className={activeTopicId === topic.id ? 'text-red-600' : 'text-neutral-500'}>
                {getTopicIcon(topic.id)}
              </span>
              <span>{topic.category}</span>
            </button>
          ))}
        </div>

        {/* Interactive Engineering Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Conceptual Prose & Real Metrics */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-neutral-900/40 border border-neutral-800 p-8">
            <div>
              <div className="text-xs uppercase tracking-[0.25em] text-red-500 font-semibold mb-2">
                {activeTopic.category}
              </div>
              <h3
                className="text-2xl sm:text-3xl font-bold uppercase text-white mb-2"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {activeTopic.title}
              </h3>
              <div className="text-xs text-neutral-400 uppercase tracking-widest mb-6">
                {activeTopic.subtitle}
              </div>

              <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed mb-8">
                {activeTopic.description}
              </p>

              {/* Animated Specification Counters */}
              <div className="grid grid-cols-3 gap-3 border-t border-neutral-800 pt-6">
                {activeTopic.metrics.map((metric, i) => (
                  <div key={i} className="text-center">
                    <div className="text-xl sm:text-2xl font-bold text-white tabular-nums tracking-tight">
                      {metric.value}
                    </div>
                    {metric.unit && (
                      <div className="text-[10px] text-red-400 uppercase tracking-wider font-semibold">
                        {metric.unit}
                      </div>
                    )}
                    <div className="text-[10px] uppercase text-neutral-400 tracking-wider mt-1 line-clamp-1">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-neutral-800/80 text-[11px] text-neutral-400">
              Tested & validated at Porsche Development Centre Weissach, Germany.
            </div>
          </div>

          {/* Right Column: Interactive Technical Visualization & Simulator */}
          <div className="lg:col-span-7 bg-neutral-950 border border-neutral-800 p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
            {/* Background Image Scrim */}
            <div className="absolute inset-0 opacity-15 pointer-events-none">
              <img
                src={activeTopic.image}
                alt={activeTopic.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-neutral-950/80" />
            </div>

            {/* Simulation Interface Header */}
            <div className="relative z-10 flex items-center justify-between border-b border-neutral-800 pb-4 mb-6">
              <div className="text-xs uppercase tracking-widest text-neutral-400 font-semibold">
                Interactive Engineering Telemetry
              </div>
              <div className="text-xs text-red-400 font-mono tracking-wider">
                WEISSACH // REAL-TIME MODEL
              </div>
            </div>

            {/* Dynamic Visualization Content Based on Active Topic */}
            <div className="relative z-10 flex-1 flex flex-col justify-center py-4">
              {activeTopic.visualType === 'boxer' && (
                <div className="space-y-6">
                  {/* Boxer Flat-Six Graphic Representation */}
                  <div className="p-6 bg-neutral-900/80 border border-neutral-800 text-center">
                    <div className="text-xs uppercase tracking-widest text-neutral-400 mb-4">
                      Horizontally Opposed Pistons (180° Flat-Six)
                    </div>
                    {/* Visual Opposed Pistons */}
                    <div className="flex items-center justify-center gap-6 py-4">
                      <div
                        className="w-16 h-12 bg-neutral-800 border-2 border-red-500 transition-all duration-75 flex items-center justify-center text-xs font-mono font-bold text-white shadow-lg"
                        style={{
                          transform: `translateX(-${(rpmSlider / 9000) * 12}px)`,
                        }}
                      >
                        CYL 1-3
                      </div>
                      <div className="w-12 h-12 rounded-full border-2 border-dashed border-neutral-600 flex items-center justify-center animate-spin"
                        style={{ animationDuration: `${Math.max(0.2, 9000 / rpmSlider * 0.4)}s` }}
                      >
                        <div className="w-3 h-3 bg-red-600 rounded-full" />
                      </div>
                      <div
                        className="w-16 h-12 bg-neutral-800 border-2 border-red-500 transition-all duration-75 flex items-center justify-center text-xs font-mono font-bold text-white shadow-lg"
                        style={{
                          transform: `translateX(${(rpmSlider / 9000) * 12}px)`,
                        }}
                      >
                        CYL 4-6
                      </div>
                    </div>
                    <div className="text-xs text-neutral-400 mt-2 font-mono">
                      Zero mass reciprocating vibrations · Ultra-low center of gravity
                    </div>
                  </div>

                  {/* RPM Interactive Slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-neutral-300">
                      <span>Engine Revolution Speed (RPM)</span>
                      <span className="font-mono text-red-400 font-bold tabular-nums">
                        {rpmSlider.toLocaleString()} RPM / 9,000 MAX
                      </span>
                    </div>
                    <input
                      type="range"
                      min={1000}
                      max={9000}
                      step={100}
                      value={rpmSlider}
                      onChange={(e) => setRpmSlider(Number(e.target.value))}
                      className="w-full accent-red-600 bg-neutral-800 cursor-pointer"
                    />
                    <div className="flex justify-between text-[11px] text-neutral-400">
                      <span>Idle (1,000)</span>
                      <span>Simulated Output: {simulatedHp} PS</span>
                      <span>Redline (9,000)</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTopic.visualType === 'electric' && (
                <div className="space-y-6">
                  <div className="p-6 bg-neutral-900/80 border border-neutral-800">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="text-xs uppercase tracking-widest text-neutral-400">
                          Attack Mode (Formula E Derivation)
                        </div>
                        <div className="text-xl font-bold text-white uppercase mt-1">
                          {attackModeActive ? '1,108 PS PEAK BOOST ACTIVE' : '789 PS NOMINAL'}
                        </div>
                      </div>
                      <button
                        onClick={() => setAttackModeActive(!attackModeActive)}
                        className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                          attackModeActive
                            ? 'bg-red-600 text-white border-red-500 shadow-lg shadow-red-950/60 animate-pulse'
                            : 'bg-neutral-800 text-neutral-300 border-neutral-700 hover:text-white hover:bg-neutral-700'
                        }`}
                      >
                        {attackModeActive ? 'Boost Engaged (+120 kW)' : 'Pull Paddle to Boost'}
                      </button>
                    </div>

                    {/* Voltage & Inverter Flow Graphic */}
                    <div className="grid grid-cols-3 gap-2 text-center py-4 border-t border-neutral-800 font-mono">
                      <div className="p-2 bg-neutral-950">
                        <div className="text-xs text-neutral-400">Inverter Current</div>
                        <div className="text-base text-white font-bold">900 Amperes</div>
                      </div>
                      <div className="p-2 bg-neutral-950">
                        <div className="text-xs text-neutral-400">Silicon Carbide</div>
                        <div className="text-base text-red-400 font-bold">SiC Efficiency</div>
                      </div>
                      <div className="p-2 bg-neutral-950">
                        <div className="text-xs text-neutral-400">Max DC Charge</div>
                        <div className="text-base text-white font-bold">320 kW</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTopic.visualType === 'aero' && (
                <div className="space-y-6">
                  <div className="p-6 bg-neutral-900/80 border border-neutral-800">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs uppercase tracking-widest text-neutral-400">
                        Active Rear Wing & DRS Telemetry
                      </span>
                      <span className="text-xs font-mono text-red-400 font-bold">
                        {speedSlider > 250 ? 'HIGH-DOWNFORCE TRACK CONFIG' : 'SPORT STAGE'}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 my-4 font-mono">
                      <div className="p-3 bg-neutral-950 border border-neutral-800 text-center">
                        <div className="text-[11px] text-neutral-400">Calculated Downforce</div>
                        <div className="text-2xl font-bold text-red-500 tabular-nums">
                          {dynamicDownforce} kg
                        </div>
                      </div>
                      <div className="p-3 bg-neutral-950 border border-neutral-800 text-center">
                        <div className="text-[11px] text-neutral-400">Wing Attack Angle</div>
                        <div className="text-2xl font-bold text-white tabular-nums">
                          {Math.min(34, Math.round((speedSlider / 296) * 34))}°
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Wind tunnel speed slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-neutral-300">
                      <span>Vehicle Speed on Circuit</span>
                      <span className="font-mono text-red-400 font-bold tabular-nums">
                        {speedSlider} km/h
                      </span>
                    </div>
                    <input
                      type="range"
                      min={60}
                      max={296}
                      step={5}
                      value={speedSlider}
                      onChange={(e) => setSpeedSlider(Number(e.target.value))}
                      className="w-full accent-red-600 bg-neutral-800 cursor-pointer"
                    />
                    <div className="flex justify-between text-[11px] text-neutral-400">
                      <span>60 km/h</span>
                      <span>860 kg Downforce @ 285 km/h</span>
                      <span>296 km/h (V-Max)</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTopic.visualType === 'pdk' && (
                <div className="space-y-6">
                  <div className="p-6 bg-neutral-900/80 border border-neutral-800">
                    <div className="text-xs uppercase tracking-widest text-neutral-400 mb-4 text-center">
                      8-Speed PDK Dual-Clutch Engagement Matrix
                    </div>
                    <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 mb-4">
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((g) => (
                        <button
                          key={g}
                          onClick={() => setPdkGear(g)}
                          className={`p-3 text-center border font-mono font-bold transition-all cursor-pointer ${
                            pdkGear === g
                              ? 'bg-red-600 text-white border-red-500 shadow-lg'
                              : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:text-white'
                          }`}
                        >
                          <div className="text-[10px] opacity-75">GEAR</div>
                          <div className="text-base">{g}</div>
                        </button>
                      ))}
                    </div>
                    <div className="text-xs text-neutral-300 bg-neutral-950 p-3 border border-neutral-800 font-mono text-center">
                      Active: Shaft {pdkGear % 2 !== 0 ? '1 (Odd Ratios)' : '2 (Even Ratios)'} · Pre-selected: Next Gear ready in 0.08s
                    </div>
                  </div>
                </div>
              )}

              {(activeTopic.visualType === 'brakes' ||
                activeTopic.visualType === 'chassis' ||
                activeTopic.visualType === 'philosophy') && (
                <div className="p-6 bg-neutral-900/80 border border-neutral-800 space-y-4">
                  <div className="text-xs uppercase tracking-widest text-red-500 font-semibold">
                    Core Technical Specifications
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-neutral-950 border border-neutral-800">
                      <div className="text-xs text-neutral-400 uppercase tracking-wider mb-1">
                        Architecture
                      </div>
                      <div className="text-sm font-semibold text-white">
                        Weissach Pure Motorsport Specification
                      </div>
                      <div className="text-xs text-neutral-400 mt-1">
                        Engineered for track endurance and street refinement.
                      </div>
                    </div>
                    <div className="p-4 bg-neutral-950 border border-neutral-800">
                      <div className="text-xs text-neutral-400 uppercase tracking-wider mb-1">
                        Reliability Factor
                      </div>
                      <div className="text-sm font-semibold text-white">
                        Over 70% of All Porsches Ever Built Are Still on the Road
                      </div>
                      <div className="text-xs text-neutral-400 mt-1">
                        Official Porsche Heritage Registry statistic.
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Status */}
            <div className="relative z-10 flex items-center justify-between text-[11px] text-neutral-400 border-t border-neutral-800 pt-3">
              <span>Dr. Ing. h.c. F. Porsche AG</span>
              <span>Stuttgart-Zuffenhausen</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
