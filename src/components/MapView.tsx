
import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Navigation, Clock } from 'lucide-react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MapView = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [showTokenInput, setShowTokenInput] = useState(true);

  const initializeMap = () => {
    if (!mapContainer.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [44.4991, 26.0112], // Coordinates for Unaizah, Saudi Arabia
      zoom: 12,
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl(),
      'top-right'
    );

    // Add a marker for Unaizah 23
    new mapboxgl.Marker({ color: '#f97316' })
      .setLngLat([44.4991, 26.0112])
      .setPopup(
        new mapboxgl.Popup({ offset: 25 })
          .setHTML('<h3>Unaizah 23</h3><p>Pickup Location</p>')
      )
      .addTo(map.current);

    setShowTokenInput(false);
  };

  const handleTokenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mapboxToken.trim()) {
      initializeMap();
    }
  };

  useEffect(() => {
    return () => {
      map.current?.remove();
    };
  }, []);

  if (showTokenInput) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50 rounded-lg">
        <div className="text-center p-8 max-w-md">
          <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Setup Mapbox</h3>
          <p className="text-gray-600 mb-6">
            Enter your Mapbox public token to display the real map. 
            Get it from <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">mapbox.com</a>
          </p>
          <form onSubmit={handleTokenSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Enter Mapbox public token..."
              value={mapboxToken}
              onChange={(e) => setMapboxToken(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Load Map
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full relative">
      {/* Map Container */}
      <div ref={mapContainer} className="h-full w-full rounded-lg" />

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
