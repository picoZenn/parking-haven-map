
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import LeafletMap from './LeafletMap';
import { MapPin, DollarSign, Car } from 'lucide-react';

const Map = () => {
  const [selectedLocation, setSelectedLocation] = useState<{lat: number, lng: number} | null>(null);
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const handleLocationSelect = (lat: number, lng: number) => {
    setSelectedLocation({ lat, lng });
    console.log('Selected location:', { lat, lng });
    // TODO: Fetch nearby parking spots from backend based on selected location
    setSearchResults([]); // Clear results until backend integration
  };

  return (
    <div className="grid lg:grid-cols-3 gap-6 h-[600px]">
      {/* Map Area */}
      <div className="lg:col-span-2">
        <LeafletMap 
          center={[40.7589, -73.9851]}
          zoom={13}
          onLocationSelect={handleLocationSelect}
          className="h-full w-full rounded-lg"
        />
      </div>

      {/* Sidebar */}
      <div className="space-y-4 overflow-y-auto">
        <h3 className="text-lg font-semibold text-gray-900">Search Results</h3>
        
        {selectedLocation ? (
          <Card className="p-4">
            <div className="text-sm text-gray-600">
              <p className="font-medium">Selected Location:</p>
              <p>Lat: {selectedLocation.lat.toFixed(6)}</p>
              <p>Lng: {selectedLocation.lng.toFixed(6)}</p>
            </div>
          </Card>
        ) : (
          <Card className="p-4">
            <div className="text-center text-gray-500">
              <MapPin className="h-8 w-8 mx-auto mb-2" />
              <p className="text-sm">Click on the map to search for parking spots</p>
            </div>
          </Card>
        )}

        {searchResults.length === 0 && selectedLocation && (
          <Card className="p-4">
            <div className="text-center text-gray-500">
              <Car className="h-8 w-8 mx-auto mb-2" />
              <p className="text-sm">No parking spots found</p>
              <p className="text-xs text-gray-400 mt-1">
                Results will be loaded from backend
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Map;
