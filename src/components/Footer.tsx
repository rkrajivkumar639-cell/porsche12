import React from 'react';
import { ArrowUp, MapPin, Phone } from 'lucide-react';
import { PORSCHE_CENTRES_INDIA } from '../data/porscheData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-neutral-950 border-t border-neutral-800 text-neutral-400 text-xs">
      {/* Dealership Network Strip */}
      <div className="border-b border-neutral-900 py-12">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-red-500 font-semibold block mb-1">
                Authorized Dealer Network
              </span>
              <h4 className="text-lg font-bold text-white uppercase" style={{ fontFamily: 'var(--font-heading)' }}>
                Porsche Centres in India
              </h4>
            </div>
            <div className="text-xs text-neutral-400">
              10 State-of-the-Art Sales & Service Facilities Across India
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {PORSCHE_CENTRES_INDIA.map((centre) => (
              <div
                key={centre.city}
                className="p-3.5 bg-neutral-900/40 border border-neutral-900 hover:border-neutral-800 transition-colors"
              >
                <div className="text-neutral-200 font-bold uppercase text-xs mb-1 flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-red-500 shrink-0" />
                  <span>{centre.city}</span>
                </div>
                <div className="text-[11px] text-neutral-400 leading-tight mb-2">
                  {centre.address}
                </div>
                <a
                  href={`tel:${centre.phone.replace(/\s/g, '')}`}
                  className="text-[11px] text-neutral-400 hover:text-white flex items-center gap-1 transition-colors"
                >
                  <Phone className="w-2.5 h-2.5" />
                  <span>{centre.phone}</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Links & Wordmark */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <a
              href="#"
              className="text-2xl font-bold tracking-[0.35em] text-white uppercase inline-block"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              PORSCHE
            </a>
            <p className="text-xs text-neutral-400 font-light max-w-sm leading-relaxed">
              Dr. Ing. h.c. F. Porsche AG is the manufacturer of sports cars based in Stuttgart-Zuffenhausen and Weissach, Germany.
              Imported and distributed in the Republic of India via official Porsche Centre dealerships.
            </p>
            <div className="text-[11px] text-neutral-400 uppercase tracking-wider">
              Porsche Concierge India: +91 98200 91100
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-semibold uppercase tracking-widest text-white mb-4">
              Model Showcase
            </div>
            <ul className="space-y-2 text-xs">
              <li><a href="#models" className="hover:text-white transition-colors">Porsche 911 Carrera</a></li>
              <li><a href="#models" className="hover:text-white transition-colors">Porsche 911 GT3 RS</a></li>
              <li><a href="#models" className="hover:text-white transition-colors">Porsche 911 Turbo S</a></li>
              <li><a href="#models" className="hover:text-white transition-colors">Porsche 718 Cayman GT4 RS</a></li>
              <li><a href="#models" className="hover:text-white transition-colors">Porsche Taycan Turbo GT</a></li>
              <li><a href="#models" className="hover:text-white transition-colors">Porsche Cayenne & Panamera</a></li>
            </ul>
          </div>

          {/* Engineering & Experience */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-xs font-semibold uppercase tracking-widest text-white mb-4">
              Experience & Heritage
            </div>
            <ul className="space-y-2 text-xs">
              <li><a href="#india-pricing" className="hover:text-white transition-colors">Indian Ex-Showroom Price List (October 2026)</a></li>
              <li><a href="#engineering" className="hover:text-white transition-colors">Weissach Engineering & Boxer Principle</a></li>
              <li><a href="#gallery" className="hover:text-white transition-colors">Interactive High-Resolution Gallery</a></li>
              <li><a href="#booking" className="hover:text-white transition-colors">Schedule Test Drive Appointment</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">Motorsport Heritage & Le Mans Victories</a></li>
            </ul>
          </div>
        </div>

        {/* Legal Disclaimers & Copyright */}
        <div className="mt-14 pt-8 border-t border-neutral-900 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-[11px] text-neutral-400 font-light">
            © {new Date().getFullYear()} Dr. Ing. h.c. F. Porsche AG · Indicative specifications and official ex-showroom prices for the Indian market.
          </div>

          <div className="flex items-center gap-6">
            <span className="text-[11px] text-neutral-400">Fuel & Energy Consumption Tested per WLTP standards.</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-neutral-300 hover:text-white transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
