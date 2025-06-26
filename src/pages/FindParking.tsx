
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Map from '@/components/Map';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Search, MapPin, Filter } from 'lucide-react';

const FindParking = () => {
  const [destination, setDestination] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [evCharging, setEvCharging] = useState(false);
  const [covered, setCovered] = useState(false);

  const handleSearch = () => {
    console.log('Searching for parking near:', destination);
    // Mock search functionality - in real app this would trigger map update
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Parking</h1>
          <p className="text-gray-600">Discover available parking spots near your destination</p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Search for Parking
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="destination">Destination</Label>
                <div className="relative mt-1">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="destination"
                    placeholder="Enter address or landmark"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="maxPrice">Max Price ($/hr)</Label>
                <Select value={maxPrice} onValueChange={setMaxPrice}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Any price" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">Up to $5</SelectItem>
                    <SelectItem value="10">Up to $10</SelectItem>
                    <SelectItem value="15">Up to $15</SelectItem>
                    <SelectItem value="20">Up to $20</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-end">
                <Button onClick={handleSearch} className="w-full bg-blue-600 hover:bg-blue-700">
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>
            </div>
            
            {/* Filters Toggle */}
            <div className="mt-4">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="text-sm"
              >
                <Filter className="h-4 w-4 mr-2" />
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </Button>
            </div>
            
            {/* Advanced Filters */}
            {showFilters && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium mb-3">Additional Filters</h4>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="evCharging" 
                      checked={evCharging}
                      onCheckedChange={(checked) => setEvCharging(checked as boolean)}
                    />
                    <Label htmlFor="evCharging" className="text-sm">EV Charging Available</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="covered" 
                      checked={covered}
                      onCheckedChange={(checked) => setCovered(checked as boolean)}
                    />
                    <Label htmlFor="covered" className="text-sm">Covered Parking</Label>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Map Component */}
        <Card>
          <CardContent className="p-6">
            <Map />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FindParking;
