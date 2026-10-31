export interface VehicleSpec {
  engine: string;
  powerPS: number;
  powerHP: number;
  torqueNM: number;
  topSpeedKmh: number;
  acceleration0to100: number; // in seconds
  transmission: string;
  drivetrain: string;
  weightKg: number;
  co2Emissions?: string;
  fuelConsumption?: string;
  batteryCapacityKwh?: number;
  electricRangeKm?: number;
}

export interface VehicleVariant {
  name: string;
  priceINR: number;
  priceFormatted: string;
  power: string;
  accel: string;
  description: string;
}

export interface VehicleColor {
  name: string;
  hex: string;
  type: 'Standard' | 'Metallic' | 'Special' | 'Paint to Sample';
}

export interface PorscheVehicle {
  id: string;
  name: string;
  tagline: string;
  series: '911' | '718' | 'Taycan' | 'Cayenne' | 'Panamera';
  category: 'Sports Car' | 'GT Motorsport' | 'Supercar' | 'All-Electric' | 'Performance SUV' | 'Luxury Saloon';
  image: string;
  secondaryImage: string;
  interiorImage: string;
  trackImage: string;
  description: string;
  overview: string;
  exteriorDesign: string;
  interiorDesign: string;
  startingPriceINR: number; // in INR
  startingPriceFormatted: string;
  specs: VehicleSpec;
  variants: VehicleVariant[];
  colors: VehicleColor[];
  highlights: string[];
  audioNote?: string;
}

export interface EngineeringTopic {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  metrics: { label: string; value: string; unit?: string }[];
  visualType: 'boxer' | 'aero' | 'electric' | 'pdk' | 'brakes' | 'chassis' | 'philosophy';
  image: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  subtitle: string;
  model: string;
  image: string;
  aspectRatio: string;
  location: string;
}

export interface BookingFormData {
  fullName: string;
  email: string;
  phone: string;
  preferredModel: string;
  preferredCity: string;
  preferredDate: string;
  preferredTime: string;
  message: string;
}
