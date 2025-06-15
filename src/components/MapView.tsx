
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { MapPin, Navigation, Truck, Clock } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const MapView = () => {
  // Riyadh coordinates
  const center: [number, number] = [24.7136, 46.6753];
  const hubPosition: [number, number] = [24.7136, 46.6753];
  
  const deliveryPoints = [
    { id: 1, name: 'Order #ABC123', position: [24.7300, 46.7200] as [number, number], status: 'pending', color: '#eab308' },
    { id: 2, name: 'Order #DEF456', position: [24.6900, 46.7500] as [number, number], status: 'in-transit', color: '#22c55e' },
    { id: 3, name: 'Order #GHI789', position: [24.7400, 46.7600] as [number, number], status: 'delivered', color: '#3b82f6' },
  ];

  // Custom icons for different statuses
  const createCustomIcon = (color: string) => {
    return L.divIcon({
      className: 'custom-div-icon',
      html: `<div style="background-color: ${color}; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
      iconSize: [20, 20],
      iconAnchor: [10, 10]
    });
  };

  const hubIcon = L.divIcon({
    className: 'custom-div-icon',
    html: '<div style="background-color: #dc2626; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center;"><div style="width: 8px; height: 8px; background-color: white; border-radius: 50%;"></div></div>',
    iconSize: [24, 24],
    iconAnchor: [12, 12]
  });

  return (
    <div className="h-full relative">
      {/* Map Header */}
      <div className="absolute top-4 left-4 z-[1000] bg-white rounded-lg shadow-lg p-3">
        <h3 className="font-semibold text-gray-900 mb-1">Riyadh Operations Center</h3>
        <p className="text-sm text-gray-600">Active Deliveries: 24</p>
      </div>

      {/* Map Container */}
      <MapContainer
        center={center}
        zoom={11}
        className="h-full w-full rounded-lg"
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Hub Marker */}
        <Marker position={hubPosition} icon={hubIcon}>
          <Popup>
            <div className="text-center">
              <strong>Distribution Hub</strong>
              <br />
              KFC-1210 malaz (sittin) RDHC
            </div>
          </Popup>
        </Marker>

        {/* Delivery Point Markers */}
        {deliveryPoints.map((point) => (
          <Marker
            key={point.id}
            position={point.position}
            icon={createCustomIcon(point.color)}
          >
            <Popup>
              <div>
                <strong>{point.name}</strong>
                <br />
                Status: {point.status}
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Routes from hub to delivery points */}
        {deliveryPoints.map((point) => (
          <Polyline
            key={`route-${point.id}`}
            positions={[hubPosition, point.position]}
            color="#e5e7eb"
            weight={2}
            opacity={0.7}
            dashArray="5, 10"
          />
        ))}
      </MapContainer>

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
