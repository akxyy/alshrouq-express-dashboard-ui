
import React from 'react';
import { MapPin } from 'lucide-react';

const MapView = () => {
  return (
    <div className="h-full bg-gradient-to-br from-blue-50 to-green-50 relative overflow-hidden">
      {/* Map Header */}
      <div className="absolute top-4 left-4 z-10 bg-white rounded-lg shadow-lg p-3">
        <h3 className="font-semibold text-gray-900 mb-1">Riyadh Operations Center</h3>
        <p className="text-sm text-gray-600">Active Deliveries: 24</p>
      </div>

      {/* Mock Map Content */}
      <div className="h-full relative">
        {/* Map Grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-12 grid-rows-12 h-full">
            {Array.from({ length: 144 }, (_, i) => (
              <div key={i} className="border border-gray-300"></div>
            ))}
          </div>
        </div>

        {/* Riyadh Center Marker */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <div className="w-4 h-4 bg-red-600 rounded-full animate-pulse"></div>
            <div className="absolute -top-8 -left-12 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
              Riyadh Center
            </div>
          </div>
        </div>

        {/* Sample Delivery Points */}
        <div className="absolute top-1/3 left-1/3">
          <MapPin className="w-5 h-5 text-blue-600" />
        </div>
        <div className="absolute top-2/3 left-2/3">
          <MapPin className="w-5 h-5 text-green-600" />
        </div>
        <div className="absolute top-1/4 left-3/4">
          <MapPin className="w-5 h-5 text-yellow-600" />
        </div>

        {/* Map Controls */}
        <div className="absolute bottom-4 right-4 flex flex-col space-y-2">
          <button className="w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
            <span className="text-lg font-bold text-gray-700">+</span>
          </button>
          <button className="w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
            <span className="text-lg font-bold text-gray-700">-</span>
          </button>
        </div>

        {/* Map Legend */}
        <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-3">
          <h4 className="font-medium text-gray-900 mb-2 text-sm">Legend</h4>
          <div className="space-y-1 text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-600 rounded-full"></div>
              <span className="text-gray-600">Hub</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-3 h-3 text-blue-600" />
              <span className="text-gray-600">Pending</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-3 h-3 text-green-600" />
              <span className="text-gray-600">In Transit</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;
