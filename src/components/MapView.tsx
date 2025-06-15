
import React from 'react';
import { MapPin, Navigation, Truck, Clock } from 'lucide-react';

const MapView = () => {
  const deliveryPoints = [
    { id: 1, name: 'Order #ABC123', lat: 24.7300, lng: 46.7200, status: 'pending', color: 'bg-yellow-500' },
    { id: 2, name: 'Order #DEF456', lat: 24.6900, lng: 46.7500, status: 'in-transit', color: 'bg-green-500' },
    { id: 3, name: 'Order #GHI789', lat: 24.7400, lng: 46.7600, status: 'delivered', color: 'bg-blue-500' },
  ];

  return (
    <div className="h-full relative bg-gradient-to-br from-blue-50 to-green-50">
      {/* Map Header */}
      <div className="absolute top-4 left-4 z-10 bg-white rounded-lg shadow-lg p-3">
        <h3 className="font-semibold text-gray-900 mb-1">Riyadh Operations Center</h3>
        <p className="text-sm text-gray-600">Active Deliveries: 24</p>
      </div>

      {/* Mock Map Interface */}
      <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
        {/* Background grid pattern to simulate map */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-20 grid-rows-20 h-full w-full">
            {Array.from({ length: 400 }).map((_, i) => (
              <div key={i} className="border border-gray-300"></div>
            ))}
          </div>
        </div>

        {/* Center Hub */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center shadow-lg animate-pulse">
            <Truck className="w-6 h-6 text-white" />
          </div>
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
            <span className="text-xs font-medium bg-white px-2 py-1 rounded shadow">Hub</span>
          </div>
        </div>

        {/* Delivery Points */}
        {deliveryPoints.map((point, index) => (
          <div
            key={point.id}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2`}
            style={{
              top: `${30 + index * 15}%`,
              left: `${35 + index * 20}%`,
            }}
          >
            <div className={`w-8 h-8 ${point.color} rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform`}>
              <MapPin className="w-4 h-4 text-white" />
            </div>
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
              <span className="text-xs font-medium bg-white px-2 py-1 rounded shadow">
                {point.name}
              </span>
            </div>
          </div>
        ))}

        {/* Connecting lines from hub to delivery points */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {deliveryPoints.map((point, index) => (
            <line
              key={point.id}
              x1="50%"
              y1="50%"
              x2={`${35 + index * 20}%`}
              y2={`${30 + index * 15}%`}
              stroke="#e5e7eb"
              strokeWidth="2"
              strokeDasharray="5,5"
              opacity="0.5"
            />
          ))}
        </svg>
      </div>

      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col space-y-2">
        <button className="w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
          <Navigation className="w-5 h-5 text-gray-600" />
        </button>
        <button className="w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
          <Clock className="w-5 h-5 text-gray-600" />
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
      <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-lg p-3">
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
