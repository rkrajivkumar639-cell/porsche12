import React, { useState } from 'react';
import { PorscheVehicle } from '../types/porsche';
import { PORSCHE_VEHICLES } from '../data/porscheData';
import { ArrowUpRight, Gauge, Zap, Wind, Eye } from 'lucide-react';

interface CarCollectionProps {
  onSelectVehicle: (vehicle: PorscheVehicle) => void;
  onBookTestDrive: (vehicle: PorscheVehicle) => void;
}

export const CarCollection: React.FC<CarCollectionProps> = ({
  onSelectVehicle,
  onBookTestDrive,
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [imageErrorMap, setImageErrorMap] = useState<Record<string, boolean>>({});

  const filterOptions = [
    { id: 'all', label: 'All 7 Vehicles' },
    { id: '911', label: '911 Dynasty' },
    { id: 'GT Motorsport', label: 'GT Motorsport' },
    { id: 'All-Electric', label: 'E-Performance' },
    { id: 'SUV & Saloon', label: 'Luxury GT & SUV' },
  ];

  const filteredVehicles = PORSCHE_VEHICLES.filter((vehicle) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === '911') return vehicle.series === '911';
    if (activeFilter === 'GT Motorsport') return vehicle.category === 'GT Motorsport';
    if (activeFilter === 'All-Electric') return vehicle.category === 'All-Electric';
    if (activeFilter === 'SUV & Saloon')
      return vehicle.series === 'Cayenne' || vehicle.series === 'Panamera';
    return true;
  });

  const handleImageError = (id: string) => {
    setImageErrorMap((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section id="models" className="py-24 sm:py-32 bg-neutral-950 text-white relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14 border-b border-neutral-800 pb-8">
          <div>
            <div className="flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-red-500 font-semibold mb-3">
              <span>Model Range</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span>Stuttgart Engineered</span>
            </div>
            <h2
              className="text-3xl sm:text-5xl font-bold tracking-tight text-white uppercase"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              The Porsche Collection
            </h2>
            <p className="mt-3 text-neutral-400 text-sm sm:text-base max-w-xl font-light">
              Seven distinct expressions of sports car obsession. From purist naturally aspirated flat-sixes to electrified hyper-performance.
            </p>
          </div>

          {/* Interactive Filter Bar */}
          <div className="flex items-center flex-wrap gap-2 p-1.5 bg-neutral-900 border border-neutral-800">
            {filterOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => setActiveFilter(option.id)}
                className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  activeFilter === option.id
                    ? 'bg-neutral-100 text-neutral-950 shadow-md'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Vehicles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVehicles.map((vehicle, index) => {
            const hasError = imageErrorMap[vehicle.id];
            return (
              <article
                key={vehicle.id}
                className="group flex flex-col bg-neutral-900/60 border border-neutral-800/80 hover:border-neutral-600 transition-all duration-300 overflow-hidden relative"
              >
                {/* Media Container with 16:9 Aspect Ratio */}
                <div className="relative aspect-[16/10] overflow-hidden bg-neutral-950 cursor-pointer"
                  onClick={() => onSelectVehicle(vehicle)}
                >
                  {!hasError ? (
                    <img
                      src={vehicle.image}
                      alt={vehicle.name}
                      onError={() => handleImageError(vehicle.id)}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  ) : (
                    /* Fallback styling container adhering to Zero-Broken-Image Policy */
                    <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 border-b border-neutral-800 text-center">
                      <div className="text-xs uppercase tracking-[0.3em] text-red-500 font-semibold mb-2">
                        {vehicle.series}
                      </div>
                      <div className="text-xl font-bold uppercase text-white mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                        {vehicle.name}
                      </div>
                      <div className="text-xs text-neutral-400 max-w-xs line-clamp-2">
                        {vehicle.specs.engine}
                      </div>
                    </div>
                  )}

                  {/* Gradient Scrim for contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-60" />

                  {/* Category Pill-Free Metadata Indicator */}
                  <div className="absolute top-4 left-4 z-10 flex items-center gap-2 text-[11px] uppercase tracking-widest text-neutral-300 bg-neutral-950/80 backdrop-blur-md px-3 py-1 border border-neutral-800">
                    <span className="text-red-500 font-bold">0{index + 1}</span>
                    <span aria-hidden="true" className="text-neutral-600">/</span>
                    <span>{vehicle.category}</span>
                  </div>

                  {/* Hover Quick View Trigger */}
                  <div className="absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px]">
                    <span className="inline-flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-widest font-semibold text-white bg-neutral-900/90 border border-neutral-600 shadow-xl">
                      <Eye className="w-3.5 h-3.5" />
                      <span>Explore Details</span>
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Model Title */}
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3
                        onClick={() => onSelectVehicle(vehicle)}
                        className="text-xl font-bold uppercase text-white hover:text-red-500 transition-colors cursor-pointer"
                        style={{ fontFamily: 'var(--font-heading)' }}
                      >
                        {vehicle.name}
                      </h3>
                      <button
                        onClick={() => onSelectVehicle(vehicle)}
                        aria-label={`Explore details for ${vehicle.name}`}
                        className="p-1.5 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                      >
                        <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </button>
                    </div>

                    {/* Short Description */}
                    <p className="text-xs text-neutral-400 leading-relaxed line-clamp-2 mb-6 font-light">
                      {vehicle.description}
                    </p>

                    {/* Key Technical Specs Grid */}
                    <div className="grid grid-cols-3 gap-2 py-3 border-y border-neutral-800/80 mb-6 text-center">
                      <div>
                        <div className="text-[10px] uppercase tracking-wider text-neutral-400 mb-0.5 flex items-center justify-center gap-1">
                          <Zap className="w-3 h-3 text-red-500" />
                          <span>Power</span>
                        </div>
                        <div className="text-sm font-bold text-white tabular-nums">
                          {vehicle.specs.powerPS}{' '}
                          <span className="text-[10px] font-normal text-neutral-400">PS</span>
                        </div>
                      </div>

                      <div>
                        <div className="text-[10px] uppercase tracking-wider text-neutral-400 mb-0.5 flex items-center justify-center gap-1">
                          <Gauge className="w-3 h-3 text-red-500" />
                          <span>0–100</span>
                        </div>
                        <div className="text-sm font-bold text-white tabular-nums">
                          {vehicle.specs.acceleration0to100}
                          <span className="text-[10px] font-normal text-neutral-400">s</span>
                        </div>
                      </div>

                      <div>
                        <div className="text-[10px] uppercase tracking-wider text-neutral-400 mb-0.5 flex items-center justify-center gap-1">
                          <Wind className="w-3 h-3 text-red-500" />
                          <span>Top Speed</span>
                        </div>
                        <div className="text-sm font-bold text-white tabular-nums">
                          {vehicle.specs.topSpeedKmh}
                          <span className="text-[10px] font-normal text-neutral-400">km/h</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Pricing and Action */}
                  <div className="mt-2 pt-2 flex items-center justify-between gap-4">
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-neutral-400">
                        Ex-Showroom India
                      </div>
                      <div className="text-base font-bold text-white tabular-nums">
                        {vehicle.startingPriceFormatted}
                        <span className="text-[10px] font-normal text-neutral-400 ml-1">starting</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onSelectVehicle(vehicle)}
                        className="px-3.5 py-2 text-xs font-semibold uppercase tracking-wider text-neutral-200 hover:text-white bg-neutral-800 hover:bg-neutral-700 transition-colors cursor-pointer border border-neutral-700"
                      >
                        Details
                      </button>
                      <button
                        onClick={() => onBookTestDrive(vehicle)}
                        className="px-3.5 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-red-600 hover:bg-red-700 transition-colors cursor-pointer shadow-md shadow-red-950/40"
                      >
                        Drive
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
