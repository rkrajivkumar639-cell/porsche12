/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CarCollection } from './components/CarCollection';
import { VehicleDetailModal } from './components/VehicleDetailModal';
import { IndianPriceSection } from './components/IndianPriceSection';
import { InteractiveGallery } from './components/InteractiveGallery';
import { PerformanceEngineering } from './components/PerformanceEngineering';
import { BookingSection } from './components/BookingSection';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';
import { PorscheVehicle } from './types/porsche';

export default function App() {
  const [selectedVehicle, setSelectedVehicle] = useState<PorscheVehicle | null>(null);
  const [preselectedBookingModelId, setPreselectedBookingModelId] = useState<string>('911-carrera');

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookTestDrive = (vehicle?: PorscheVehicle) => {
    if (vehicle) {
      setPreselectedBookingModelId(vehicle.id);
    }
    scrollToSection('booking');
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-red-600 selection:text-white">
      {/* Sticky Premium Navigation */}
      <Navbar onBookClick={() => handleBookTestDrive()} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Section 2: Hero Section – Cinematic Experience */}
        <Hero
          onExploreClick={() => scrollToSection('models')}
          onDiscoverClick={() => scrollToSection('india-pricing')}
        />

        {/* Section 3: Porsche Car Collection – 7 Vehicles */}
        <CarCollection
          onSelectVehicle={(vehicle) => setSelectedVehicle(vehicle)}
          onBookTestDrive={(vehicle) => handleBookTestDrive(vehicle)}
        />

        {/* Section 4: Indian Porsche Price Section */}
        <IndianPriceSection
          onSelectVehicle={(vehicle) => setSelectedVehicle(vehicle)}
          onFindYourPorscheClick={() => handleBookTestDrive()}
        />

        {/* Section 7: Performance and Engineering Section */}
        <PerformanceEngineering />

        {/* Section 6: Interactive Car Gallery */}
        <InteractiveGallery />

        {/* Section 9: About Porsche Section */}
        <AboutSection />

        {/* Section 8: Booking Section */}
        <BookingSection preselectedModelId={preselectedBookingModelId} />
      </main>

      {/* Section 5: Dedicated Vehicle Detail Experience (Modal) */}
      <VehicleDetailModal
        vehicle={selectedVehicle}
        onClose={() => setSelectedVehicle(null)}
        onSelectVehicle={(vehicle) => setSelectedVehicle(vehicle)}
        onBookTestDrive={(vehicle) => handleBookTestDrive(vehicle)}
      />

      {/* Footer & Dealership Network */}
      <Footer />
    </div>
  );
}
