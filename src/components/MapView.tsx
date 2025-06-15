
import React from 'react';
import { MapPin, Navigation, Clock } from 'lucide-react';

const MapView = () => {
  return (
    <div className="h-full relative">
      {/* Map Placeholder */}
      <div className="h-full w-full rounded-lg bg-gray-200 flex items-center justify-center">
        <div className="text-center">
          <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">Map View</h3>
          <p className="text-gray-500">Interactive map will be displayed here</p>
        </div>
      </div>

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
