import React, { useState, useEffect } from 'react';
import { PorscheVehicle } from '../types/porsche';
import { PORSCHE_VEHICLES } from '../data/porscheData';
import { X, ChevronLeft, ChevronRight, Gauge, Zap, Wind, ShieldCheck, ArrowRight, Check } from 'lucide-react';

interface VehicleDetailModalProps {
  vehicle: PorscheVehicle | null;
  onClose: () => void;
  onSelectVehicle: (vehicle: PorscheVehicle) => void;
  onBookTestDrive: (vehicle: PorscheVehicle) => void;
}

export const VehicleDetailModal: React.FC<VehicleDetailModalProps> = ({
  vehicle,
  onClose,
  onSelectVehicle,
  onBookTestDrive,
}) => {
  const [selectedView, setSelectedView] = useState<'exterior' | 'secondary' | 'interior' | 'track'>('exterior');
  const [selectedColor, setSelectedColor] = useState<string>('');

  useEffect(() => {
    if (vehicle && vehicle.colors.length > 0) {
      setSelectedColor(vehicle.colors[0].name);
      setSelectedView('exterior');
    }
  }, [vehicle]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!vehicle) return null;

  const currentIndex = PORSCHE_VEHICLES.findIndex((v) => v.id === vehicle.id);
  const prevVehicle = PORSCHE_VEHICLES[(currentIndex - 1 + PORSCHE_VEHICLES.length) % PORSCHE_VEHICLES.length];
  const nextVehicle = PORSCHE_VEHICLES[(currentIndex + 1) % PORSCHE_VEHICLES.length];

  const currentImage =
    selectedView === 'exterior'
      ? vehicle.image
      : selectedView === 'secondary'
      ? vehicle.secondaryImage
      : selectedView === 'interior'
      ? vehicle.interiorImage
      : vehicle.trackImage;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      {/* Modal Wrapper */}
      <div className="relative w-full max-w-6xl bg-neutral-950 border border-neutral-800 text-white shadow-2xl my-auto max-h-[92vh] flex flex-col overflow-hidden">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-900/90 shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-[0.25em] text-red-500 font-semibold">
              Vehicle Dossier
            </span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span className="text-xs text-neutral-400 uppercase tracking-widest">
              {vehicle.series} Series
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Quick Prev / Next Vehicle Switcher */}
            <button
              onClick={() => onSelectVehicle(prevVehicle)}
              title={`Previous: ${prevVehicle.name}`}
              className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-xs text-neutral-400 tabular-nums px-1">
              0{currentIndex + 1} / 0{PORSCHE_VEHICLES.length}
            </span>
            <button
              onClick={() => onSelectVehicle(nextVehicle)}
              title={`Next: ${nextVehicle.name}`}
              className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <div className="w-[1px] h-5 bg-neutral-800 mx-2" />

            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Modal Content */}
        <div className="overflow-y-auto p-6 sm:p-10 space-y-12">
          {/* Main Hero Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Media Gallery Stage */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900 border border-neutral-800">
                <img
                  src={currentImage}
                  alt={vehicle.name}
                  className="w-full h-full object-cover object-center transition-all duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-40 pointer-events-none" />

                {/* View Badge */}
                <div className="absolute top-4 left-4 text-[11px] uppercase tracking-widest text-neutral-300 bg-neutral-950/80 backdrop-blur-md px-3 py-1 border border-neutral-800">
                  {selectedView.toUpperCase()} VIEW
                </div>
              </div>

              {/* View Switcher Thumbnails */}
              <div className="grid grid-cols-4 gap-2">
                {[
                  { id: 'exterior', label: 'Exterior Studio', img: vehicle.image },
                  { id: 'secondary', label: 'Angle View', img: vehicle.secondaryImage },
                  { id: 'track', label: 'Dynamics / Aero', img: vehicle.trackImage },
                  { id: 'interior', label: 'Cockpit View', img: vehicle.interiorImage },
                ].map((view) => (
                  <button
                    key={view.id}
                    onClick={() => setSelectedView(view.id as any)}
                    className={`relative aspect-[16/10] overflow-hidden border transition-all cursor-pointer ${
                      selectedView === view.id
                        ? 'border-red-500 ring-1 ring-red-500'
                        : 'border-neutral-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={view.img}
                      alt={view.label}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-end p-1.5">
                      <span className="text-[10px] uppercase tracking-wider text-white truncate">
                        {view.label}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Exterior Color Customizer */}
              <div className="p-4 bg-neutral-900/70 border border-neutral-800">
                <div className="flex items-center justify-between mb-3 text-xs">
                  <span className="uppercase tracking-widest text-neutral-400 font-medium">
                    Porsche Colorway
                  </span>
                  <span className="text-white font-semibold">{selectedColor}</span>
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                  {vehicle.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      title={`${c.name} (${c.type})`}
                      className={`w-7 h-7 rounded-full border-2 transition-transform cursor-pointer flex items-center justify-center ${
                        selectedColor === c.name
                          ? 'border-white scale-110 shadow-lg'
                          : 'border-transparent hover:scale-105'
                      }`}
                      style={{ backgroundColor: c.hex }}
                    >
                      {selectedColor === c.name && (
                        <Check
                          className={`w-3.5 h-3.5 ${
                            c.hex === '#f0f0f0' || c.hex === '#f4f5f5' || c.hex === '#ffd500'
                              ? 'text-black'
                              : 'text-white'
                          }`}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Model Summary & Pricing */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6">
              <div>
                <div className="text-xs uppercase tracking-[0.25em] text-red-500 font-semibold mb-2">
                  {vehicle.category}
                </div>
                <h2
                  className="text-2xl sm:text-4xl font-bold uppercase tracking-tight text-white mb-3"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {vehicle.name}
                </h2>
                <p className="text-sm text-neutral-300 italic mb-6 leading-relaxed">
                  "{vehicle.tagline}"
                </p>

                {/* Starting Price Box */}
                <div className="p-4 bg-neutral-900 border border-neutral-800 mb-6">
                  <div className="text-xs uppercase tracking-wider text-neutral-400 mb-1">
                    Official Starting Ex-Showroom India
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-white tabular-nums tracking-tight">
                    {vehicle.startingPriceFormatted}
                  </div>
                  <div className="text-[11px] text-neutral-400 mt-1">
                    Indicative base price · Ex-showroom Mumbai / Delhi-NCR
                  </div>
                </div>

                {/* Performance Gauge Strip */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="p-3 bg-neutral-900/50 border border-neutral-800">
                    <div className="flex items-center gap-1.5 text-xs text-neutral-400 uppercase tracking-wider mb-1">
                      <Zap className="w-3.5 h-3.5 text-red-500" />
                      <span>Total Output</span>
                    </div>
                    <div className="text-lg font-bold text-white tabular-nums">
                      {vehicle.specs.powerPS} PS{' '}
                      <span className="text-xs font-normal text-neutral-400">
                        ({vehicle.specs.powerHP} HP)
                      </span>
                    </div>
                  </div>

                  <div className="p-3 bg-neutral-900/50 border border-neutral-800">
                    <div className="flex items-center gap-1.5 text-xs text-neutral-400 uppercase tracking-wider mb-1">
                      <Gauge className="w-3.5 h-3.5 text-red-500" />
                      <span>0–100 km/h</span>
                    </div>
                    <div className="text-lg font-bold text-white tabular-nums">
                      {vehicle.specs.acceleration0to100} s
                    </div>
                  </div>

                  <div className="p-3 bg-neutral-900/50 border border-neutral-800">
                    <div className="flex items-center gap-1.5 text-xs text-neutral-400 uppercase tracking-wider mb-1">
                      <Wind className="w-3.5 h-3.5 text-red-500" />
                      <span>Top Speed</span>
                    </div>
                    <div className="text-lg font-bold text-white tabular-nums">
                      {vehicle.specs.topSpeedKmh} km/h
                    </div>
                  </div>

                  <div className="p-3 bg-neutral-900/50 border border-neutral-800">
                    <div className="flex items-center gap-1.5 text-xs text-neutral-400 uppercase tracking-wider mb-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-red-500" />
                      <span>Torque</span>
                    </div>
                    <div className="text-lg font-bold text-white tabular-nums">
                      {vehicle.specs.torqueNM} Nm
                    </div>
                  </div>
                </div>
              </div>

              {/* Primary Call to Action */}
              <div className="pt-2">
                <button
                  onClick={() => {
                    onClose();
                    onBookTestDrive(vehicle);
                  }}
                  className="w-full py-4 px-6 text-xs font-semibold uppercase tracking-[0.2em] text-white bg-red-600 hover:bg-red-700 active:scale-[0.99] transition-all flex items-center justify-center gap-3 cursor-pointer shadow-xl shadow-red-950/40"
                >
                  <span>Book a Test Drive for {vehicle.name}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Deep Editorial Overview & Design Chapters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-neutral-800">
            <div>
              <div className="text-xs uppercase tracking-[0.25em] text-neutral-400 mb-2 font-medium">
                01. Concept & Overview
              </div>
              <h4 className="text-lg font-bold text-white uppercase mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                Vehicle Philosophy
              </h4>
              <p className="text-xs text-neutral-300 leading-relaxed font-light">
                {vehicle.overview}
              </p>
            </div>

            <div>
              <div className="text-xs uppercase tracking-[0.25em] text-neutral-400 mb-2 font-medium">
                02. Aerodynamics & Exterior
              </div>
              <h4 className="text-lg font-bold text-white uppercase mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                Exterior Design
              </h4>
              <p className="text-xs text-neutral-300 leading-relaxed font-light">
                {vehicle.exteriorDesign}
              </p>
            </div>

            <div>
              <div className="text-xs uppercase tracking-[0.25em] text-neutral-400 mb-2 font-medium">
                03. Ergonomics & Cockpit
              </div>
              <h4 className="text-lg font-bold text-white uppercase mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                Interior Architecture
              </h4>
              <p className="text-xs text-neutral-300 leading-relaxed font-light">
                {vehicle.interiorDesign}
              </p>
            </div>
          </div>

          {/* Available Variants Table */}
          <div className="pt-8 border-t border-neutral-800">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-bold text-white uppercase" style={{ fontFamily: 'var(--font-heading)' }}>
                Available Model Variants
              </h4>
              <span className="text-xs text-neutral-400 uppercase tracking-wider">
                Ex-Showroom India (INR)
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-neutral-800 text-neutral-400 uppercase tracking-wider">
                    <th className="py-3 px-4 font-medium">Variant</th>
                    <th className="py-3 px-4 font-medium">Power</th>
                    <th className="py-3 px-4 font-medium">0–100 km/h</th>
                    <th className="py-3 px-4 font-medium">Starting Ex-Showroom</th>
                    <th className="py-3 px-4 font-medium text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-900">
                  {vehicle.variants.map((variant) => (
                    <tr key={variant.name} className="hover:bg-neutral-900/50 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-white">
                        {variant.name}
                        <div className="text-[11px] font-normal text-neutral-400 mt-0.5 max-w-sm">
                          {variant.description}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-neutral-300 tabular-nums">{variant.power}</td>
                      <td className="py-3.5 px-4 text-neutral-300 tabular-nums">{variant.accel}</td>
                      <td className="py-3.5 px-4 font-semibold text-white tabular-nums">
                        {variant.priceFormatted}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => {
                            onClose();
                            onBookTestDrive(vehicle);
                          }}
                          className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-red-400 hover:text-white hover:bg-red-600/20 border border-red-500/30 transition-colors cursor-pointer"
                        >
                          Enquire
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
