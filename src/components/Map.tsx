
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, DollarSign, Clock, Car } from 'lucide-react';

interface ParkingSpot {
  id: string;
  name: string;
  price: number;
  distance: string;
  available: boolean;
  type: 'covered' | 'uncovered';
  evCharging: boolean;
  coordinates: { lat: number; lng: number };
}

const mockParkingSpots: ParkingSpot[] = [
  {
    id: '1',
    name: 'Downtown Garage A',
    price: 8,
    distance: '0.2 miles',
    available: true,
    type: 'covered',
    evCharging: true,
    coordinates: { lat: 40.7589, lng: -73.9851 }
  },
  {
    id: '2',
    name: 'Street Parking - Main St',
    price: 5,
    distance: '0.4 miles',
    available: true,
    type: 'uncovered',
    evCharging: false,
    coordinates: { lat: 40.7614, lng: -73.9776 }
  },
  {
    id: '3',
    name: 'Private Driveway',
    price: 6,
    distance: '0.3 miles',
    available: true,
    type: 'uncovered',
    evCharging: false,
    coordinates: { lat: 40.7505, lng: -73.9934 }
  },
  {
    id: '4',
    name: 'Secure Lot B',
    price: 12,
    distance: '0.1 miles',
    available: true,
    type: 'covered',
    evCharging: true,
    coordinates: { lat: 40.7549, lng: -73.9840 }
  }
];

const Map = () => {
  const [selectedSpot, setSelectedSpot] = useState<ParkingSpot | null>(null);
  const [mapCenter] = useState({ lat: 40.7589, lng: -73.9851 });

  const handleSpotClick = (spot: ParkingSpot) => {
    setSelectedSpot(spot);
  };

  const handleBookSpot = (spot: ParkingSpot) => {
    // Mock booking functionality
    console.log('Booking spot:', spot);
    alert(`Booking confirmed for ${spot.name}! Check your dashboard for details.`);
  };

  return (
    <div className="grid lg:grid-cols-3 gap-6 h-[600px]">
      {/* Map Area - Mock */}
      <div className="lg:col-span-2 relative bg-gray-100 rounded-lg overflow-hidden">
        <div 
          className="w-full h-full bg-gradient-to-br from-blue-200 via-green-200 to-blue-300 relative flex items-center justify-center"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-gray-600">
              <MapPin className="h-16 w-16 mx-auto mb-4 text-blue-600" />
              <p className="text-lg font-semibold mb-2">Interactive Map</p>
              <p className="text-sm">Map integration would display here</p>
              <p className="text-xs mt-1 text-gray-500">(Google Maps or Mapbox API)</p>
            </div>
          </div>
          
          {/* Mock Map Pins */}
          {mockParkingSpots.map((spot, index) => (
            <div
              key={spot.id}
              className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 ${
                selectedSpot?.id === spot.id ? 'scale-125' : 'hover:scale-110'
              } transition-transform`}
              style={{
                left: `${25 + index * 15}%`,
                top: `${30 + index * 10}%`
              }}
              onClick={() => handleSpotClick(spot)}
            >
              <div className="bg-blue-600 text-white p-2 rounded-full shadow-lg">
                <Car className="h-4 w-4" />
              </div>
              <div className="bg-white px-2 py-1 rounded shadow-md text-xs font-semibold mt-1">
                ${spot.price}/hr
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sidebar with parking spots */}
      <div className="space-y-4 overflow-y-auto">
        <h3 className="text-lg font-semibold text-gray-900">Available Spots</h3>
        
        {mockParkingSpots.map((spot) => (
          <Card 
            key={spot.id} 
            className={`cursor-pointer transition-all hover:shadow-md ${
              selectedSpot?.id === spot.id ? 'ring-2 ring-blue-500 bg-blue-50' : ''
            }`}
            onClick={() => handleSpotClick(spot)}
          >
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-gray-900">{spot.name}</h4>
                <Badge variant={spot.available ? "default" : "secondary"}>
                  {spot.available ? 'Available' : 'Occupied'}
                </Badge>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                <div className="flex items-center gap-1">
                  <DollarSign className="h-4 w-4" />
                  ${spot.price}/hr
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {spot.distance}
                </div>
              </div>
              
              <div className="flex gap-2 mb-3">
                <Badge variant="outline" className="text-xs">
                  {spot.type}
                </Badge>
                {spot.evCharging && (
                  <Badge variant="outline" className="text-xs bg-green-50 text-green-700">
                    EV Charging
                  </Badge>
                )}
              </div>
              
              {selectedSpot?.id === spot.id && (
                <Button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBookSpot(spot);
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  size="sm"
                >
                  Book This Spot
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Map;
