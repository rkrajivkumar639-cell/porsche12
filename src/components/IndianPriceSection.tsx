import React, { useState } from 'react';
import { PorscheVehicle } from '../types/porsche';
import { PORSCHE_VEHICLES, OFFICIAL_PRICING_VERIFIED_DATE } from '../data/porscheData';
import { ArrowUpDown, ArrowUpRight, Search, ShieldAlert, Sparkles, SlidersHorizontal } from 'lucide-react';

interface IndianPriceSectionProps {
  onSelectVehicle: (vehicle: PorscheVehicle) => void;
  onFindYourPorscheClick: () => void;
}

export const IndianPriceSection: React.FC<IndianPriceSectionProps> = ({
  onSelectVehicle,
  onFindYourPorscheClick,
}) => {
  const [sortKey, setSortKey] = useState<'price-asc' | 'price-desc' | 'power-desc' | 'accel-asc'>('price-asc');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSeries, setSelectedSeries] = useState<string>('all');

  const filteredAndSorted = [...PORSCHE_VEHICLES]
    .filter((car) => {
      const matchesSearch =
        car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.specs.engine.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSeries = selectedSeries === 'all' || car.series === selectedSeries;
      return matchesSearch && matchesSeries;
    })
    .sort((a, b) => {
      if (sortKey === 'price-asc') return a.startingPriceINR - b.startingPriceINR;
      if (sortKey === 'price-desc') return b.startingPriceINR - a.startingPriceINR;
      if (sortKey === 'power-desc') return b.specs.powerPS - a.specs.powerPS;
      if (sortKey === 'accel-asc') return a.specs.acceleration0to100 - b.specs.acceleration0to100;
      return 0;
    });

  return (
    <section id="india-pricing" className="py-24 sm:py-32 bg-neutral-900/60 border-t border-neutral-800 text-white relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-red-500 font-semibold mb-3">
            <span>Official Ex-Showroom Pricing</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span>Republic of India</span>
          </div>
          <h2
            className="text-3xl sm:text-5xl font-bold tracking-tight text-white uppercase leading-tight"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            THE PORSCHE COLLECTION – INDIA
          </h2>
          <p className="mt-4 text-neutral-300 text-sm sm:text-base font-light leading-relaxed">
            Indicative starting ex-showroom prices for the complete Porsche portfolio in Indian Rupees (₹).
            Verified directly against current Porsche India dealership records.
          </p>
          <div className="mt-3 flex items-center gap-2 text-xs text-neutral-400">
            <span>Pricing Verification Date:</span>
            <span className="text-neutral-200 font-semibold">{OFFICIAL_PRICING_VERIFIED_DATE}</span>
            <span aria-hidden="true">·</span>
            <span>Currency: INR (₹)</span>
          </div>
        </div>

        {/* Filter & Sort Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 bg-neutral-950 border border-neutral-800 mb-8">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search model, engine, or category..."
              className="w-full bg-neutral-900 text-xs text-white pl-10 pr-4 py-2.5 border border-neutral-800 focus:outline-none focus:border-red-500 transition-colors placeholder:text-neutral-400"
            />
          </div>

          {/* Series Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0">
            {['all', '911', '718', 'Taycan', 'Cayenne', 'Panamera'].map((s) => (
              <button
                key={s}
                onClick={() => setSelectedSeries(s)}
                className={`px-3 py-1.5 text-xs uppercase tracking-wider font-semibold transition-colors cursor-pointer shrink-0 ${
                  selectedSeries === s
                    ? 'bg-neutral-100 text-neutral-950'
                    : 'text-neutral-400 hover:text-white bg-neutral-900'
                }`}
              >
                {s === 'all' ? 'All Series' : s}
              </button>
            ))}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs text-neutral-400 uppercase tracking-wider flex items-center gap-1">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Sort:</span>
            </span>
            <select
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value as any)}
              className="bg-neutral-900 text-xs text-white px-3 py-2 border border-neutral-800 focus:outline-none focus:border-red-500 cursor-pointer"
            >
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="power-desc">Power: Highest (PS)</option>
              <option value="accel-asc">Acceleration: Fastest (0-100)</option>
            </select>
          </div>
        </div>

        {/* Pricing Comparison Table */}
        <div className="overflow-x-auto border border-neutral-800 bg-neutral-950 shadow-xl">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-neutral-800 bg-neutral-900/90 text-neutral-400 uppercase tracking-wider">
                <th className="py-4 px-6 font-semibold">Model</th>
                <th className="py-4 px-6 font-semibold">Powertrain & Architecture</th>
                <th className="py-4 px-6 font-semibold text-center">Power Output</th>
                <th className="py-4 px-6 font-semibold text-center">0–100 km/h</th>
                <th className="py-4 px-6 font-semibold text-right">Starting Ex-Showroom</th>
                <th className="py-4 px-6 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-900">
              {filteredAndSorted.map((car) => (
                <tr
                  key={car.id}
                  className="hover:bg-neutral-900/60 transition-colors group"
                >
                  {/* Model Name & Thumbnail */}
                  <td className="py-4 px-6 font-bold text-white">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-10 bg-neutral-900 border border-neutral-800 overflow-hidden shrink-0 hidden sm:block">
                        <img
                          src={car.image}
                          alt={car.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div>
                        <div
                          onClick={() => onSelectVehicle(car)}
                          className="text-sm uppercase tracking-wide group-hover:text-red-500 transition-colors cursor-pointer"
                          style={{ fontFamily: 'var(--font-heading)' }}
                        >
                          {car.name}
                        </div>
                        <div className="text-[11px] font-normal text-neutral-400">
                          {car.category} · {car.series} Series
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Engine */}
                  <td className="py-4 px-6 text-neutral-300">
                    <div className="max-w-xs">{car.specs.engine}</div>
                    <div className="text-[11px] text-neutral-400 mt-0.5">{car.specs.transmission}</div>
                  </td>

                  {/* Power */}
                  <td className="py-4 px-6 text-center tabular-nums">
                    <div className="font-bold text-white text-sm">{car.specs.powerPS} PS</div>
                    <div className="text-[11px] text-neutral-400">{car.specs.torqueNM} Nm</div>
                  </td>

                  {/* Acceleration */}
                  <td className="py-4 px-6 text-center tabular-nums">
                    <div className="font-bold text-white text-sm">{car.specs.acceleration0to100} s</div>
                    <div className="text-[11px] text-neutral-400">{car.specs.topSpeedKmh} km/h</div>
                  </td>

                  {/* Starting Price */}
                  <td className="py-4 px-6 text-right tabular-nums">
                    <div className="text-base font-bold text-white">
                      {car.startingPriceFormatted}
                    </div>
                    <div className="text-[10px] text-neutral-400">
                      ₹{car.startingPriceINR.toLocaleString('en-IN')}
                    </div>
                  </td>

                  {/* Explore Button */}
                  <td className="py-4 px-6 text-right">
                    <button
                      onClick={() => onSelectVehicle(car)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-neutral-900 hover:bg-red-600 border border-neutral-700 hover:border-red-500 transition-colors cursor-pointer whitespace-nowrap"
                    >
                      <span>Explore</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Call to Action Banner: FIND YOUR PORSCHE */}
        <div className="mt-12 p-8 sm:p-12 bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-950 border border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-red-500 font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Tailored Consultation</span>
            </div>
            <h3
              className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white mb-2"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              FIND YOUR PORSCHE
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 max-w-xl font-light">
              Connect with a Porsche India Brand Ambassador for bespoke allocations, Porsche Exclusive Manufaktur personalizations, and delivery schedules across all Indian metropolitan centres.
            </p>
          </div>

          <button
            onClick={onFindYourPorscheClick}
            className="px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-white bg-red-600 hover:bg-red-700 active:scale-[0.98] transition-all whitespace-nowrap cursor-pointer shadow-xl shadow-red-950/40 border border-red-500/30"
          >
            FIND YOUR PORSCHE
          </button>
        </div>

        {/* Pricing Disclaimers (Strictly Required) */}
        <div className="mt-8 p-6 bg-neutral-950 border border-neutral-800/80 text-xs text-neutral-400 space-y-2">
          <div className="flex items-center gap-2 text-neutral-300 font-semibold uppercase tracking-wider">
            <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0" />
            <span>Important Official Indian Pricing Disclaimers:</span>
          </div>
          <p className="leading-relaxed font-light">
            1. All figures listed above are <strong className="text-neutral-200">indicative starting ex-showroom prices</strong> in Indian Rupees (₹) verified as of {OFFICIAL_PRICING_VERIFIED_DATE}.
          </p>
          <p className="leading-relaxed font-light">
            2. On-road prices vary considerably by state and union territory due to statutory state road tax (ranging typically from 10% to 20%), municipal registration fees, comprehensive motor insurance, Tax Collected at Source (TCS at 1%), and logistics/handling charges.
          </p>
          <p className="leading-relaxed font-light">
            3. Bespoke optional equipment, custom leather choices, lightweight packages (e.g., Weissach Package), and Paint to Sample (PTS) will adjust the final configuration invoice price.
          </p>
          <p className="leading-relaxed font-light">
            4. If an exact current model variant price cannot be verified for your preferred specification, please select "Request a Test Drive" or contact your nearest authorized Porsche India Centre directly.
          </p>
        </div>
      </div>
    </section>
  );
};
