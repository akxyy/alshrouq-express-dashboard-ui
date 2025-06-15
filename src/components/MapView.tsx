
import React from 'react';
import { MapPin, Navigation, Truck, Clock } from 'lucide-react';

const MapView = () => {
  return (
    <div className="h-full relative">
      {/* Map Header */}
      <div className="absolute top-4 left-4 z-[1000] bg-white rounded-lg shadow-lg p-3">
        <h3 className="font-semibold text-gray-900 mb-1">Riyadh Operations Center</h3>
        <p className="text-sm text-gray-600">Active Deliveries: 24</p>
      </div>

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

      {/* Map Legend */}
      <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-3 z-[1000]">
        <h4 className="font-medium text-gray-900 mb-2 text-sm">Legend</h4>
        <div className="space-y-1 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-600 rounded-full"></div>
            <span className="text-gray-600">Hub</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span className="text-gray-600">Pending</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-gray-600">In Transit</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-gray-600">Delivered</span>
          </div>
        </div>
      </div>

      {/* Real-time Stats */}
      <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-lg p-3 z-[1000]">
        <h4 className="font-medium text-gray-900 mb-2 text-sm">Live Stats</h4>
        <div className="space-y-1 text-xs">
          <div className="flex justify-between space-x-4">
            <span className="text-gray-600">Active Orders:</span>
            <span className="font-medium">24</span>
          </div>
          <div className="flex justify-between space-x-4">
            <span className="text-gray-600">Avg Delivery:</span>
            <span className="font-medium">28 min</span>
          </div>
          <div className="flex justify-between space-x-4">
            <span className="text-gray-600">Drivers Online:</span>
            <span className="font-medium text-green-600">12</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;
