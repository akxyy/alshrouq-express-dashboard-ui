
import React, { useEffect, useRef, useState } from 'react';
import { MapPin } from 'lucide-react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MapView = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [isTokenEntered, setIsTokenEntered] = useState(false);

  useEffect(() => {
    if (!mapContainer.current || !isTokenEntered || !mapboxToken) return;

    // Initialize map
    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [46.7382, 24.7136], // Riyadh coordinates
      zoom: 11,
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl(),
      'top-right'
    );

    // Add a marker for Riyadh Operations Center
    new mapboxgl.Marker({ color: '#dc2626' })
      .setLngLat([46.7382, 24.7136])
      .setPopup(new mapboxgl.Popup().setHTML('<h3>Riyadh Operations Center</h3><p>Active Deliveries: 24</p>'))
      .addTo(map.current);

    // Add some sample delivery markers
    const deliveryPoints = [
      { lng: 46.7200, lat: 24.7300, status: 'pending', color: '#2563eb' },
      { lng: 46.7500, lat: 24.6900, status: 'in-transit', color: '#16a34a' },
      { lng: 46.7600, lat: 24.7400, status: 'pending', color: '#eab308' },
    ];

    deliveryPoints.forEach(point => {
      new mapboxgl.Marker({ color: point.color })
        .setLngLat([point.lng, point.lat])
        .addTo(map.current!);
    });

    // Cleanup
    return () => {
      map.current?.remove();
    };
  }, [mapboxToken, isTokenEntered]);

  const handleTokenSubmit = () => {
    if (mapboxToken.trim()) {
      setIsTokenEntered(true);
    }
  };

  if (!isTokenEntered) {
    return (
      <div className="h-full bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full mx-4">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Enter Mapbox Token</h3>
          <p className="text-sm text-gray-600 mb-4">
            To display the map, please enter your Mapbox public token. You can get one from{' '}
            <a 
              href="https://mapbox.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              mapbox.com
            </a>
          </p>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="pk.eyJ1IjoieW91cnVzZXJuYW1lIiwi..."
              value={mapboxToken}
              onChange={(e) => setMapboxToken(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleTokenSubmit}
              disabled={!mapboxToken.trim()}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Load Map
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full relative">
      {/* Map Header */}
      <div className="absolute top-4 left-4 z-10 bg-white rounded-lg shadow-lg p-3">
        <h3 className="font-semibold text-gray-900 mb-1">Riyadh Operations Center</h3>
        <p className="text-sm text-gray-600">Active Deliveries: 24</p>
      </div>

      {/* Map Container */}
      <div ref={mapContainer} className="w-full h-full" />

      {/* Map Legend */}
      <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-3">
        <h4 className="font-medium text-gray-900 mb-2 text-sm">Legend</h4>
        <div className="space-y-1 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-600 rounded-full"></div>
            <span className="text-gray-600">Hub</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
            <span className="text-gray-600">Pending</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-600 rounded-full"></div>
            <span className="text-gray-600">In Transit</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;
