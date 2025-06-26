
import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface LeafletMapProps {
  center?: [number, number];
  zoom?: number;
  onLocationSelect?: (lat: number, lng: number) => void;
  searchLocation?: string;
  className?: string;
}

const LeafletMap: React.FC<LeafletMapProps> = ({ 
  center = [40.7589, -73.9851], // Default to NYC
  zoom = 13,
  onLocationSelect,
  searchLocation,
  className = "h-96 w-full rounded-lg"
}) => {
  return (
    <div className={className}>
      <MapContainer 
        center={center} 
        zoom={zoom} 
        className="h-full w-full rounded-lg"
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Center marker */}
        <Marker position={center}>
          <Popup>
            Search location
          </Popup>
        </Marker>
        
        {/* Click handler for selecting location */}
        <MapClickHandler onLocationSelect={onLocationSelect} />
      </MapContainer>
    </div>
  );
};

// Component to handle map clicks
const MapClickHandler: React.FC<{ onLocationSelect?: (lat: number, lng: number) => void }> = ({ 
  onLocationSelect 
}) => {
  const map = useMap();
  
  useEffect(() => {
    if (!onLocationSelect) return;
    
    const handleClick = (e: L.LeafletMouseEvent) => {
      onLocationSelect(e.latlng.lat, e.latlng.lng);
    };
    
    map.on('click', handleClick);
    
    return () => {
      map.off('click', handleClick);
    };
  }, [map, onLocationSelect]);
  
  return null;
};

export default LeafletMap;
