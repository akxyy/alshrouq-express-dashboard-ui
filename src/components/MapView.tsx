
import React from 'react';
import { MapPin, Navigation, Clock } from 'lucide-react';

const MapView = () => {
  return (
    <div className="h-full relative">
      {/* Google Maps Embed */}
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d233668.064285073!2d46.57304906640625!3d24.774264900000005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f03890d489399%3A0xba974d1c98e79fd5!2sRiyadh%20Saudi%20Arabia!5e0!3m2!1sen!2s!4v1703123456789!5m2!1sen!2s"
        width="100%"
        height="100%"
        className="rounded-lg border-0"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Riyadh Map"
      />

      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col space-y-2 z-[1000]">
        <button className="w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
          <Navigation className="w-5 h-5 text-gray-600" />
        </button>
        <button className="w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
          <Clock className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    </div>
  );
};

export default MapView;
