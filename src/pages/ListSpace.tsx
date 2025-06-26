
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/hooks/use-toast';
import { MapPin, DollarSign, Clock, Camera } from 'lucide-react';

const ListSpace = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    address: '',
    price: '',
    spaceType: '',
    availability: 'fulltime',
    evCharging: false,
    covered: false,
    instructions: ''
  });
  
  const navigate = useNavigate();

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock validation
    if (!formData.title || !formData.address || !formData.price) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    // Mock successful listing
    toast({
      title: "Success!",
      description: "Your parking space has been listed successfully!",
    });
    
    // Store mock listing
    const existingListings = JSON.parse(localStorage.getItem('userListings') || '[]');
    const newListing = {
      id: Date.now().toString(),
      ...formData,
      createdAt: new Date().toISOString()
    };
    existingListings.push(newListing);
    localStorage.setItem('userListings', JSON.stringify(existingListings));
    
    // Redirect to dashboard after short delay
    setTimeout(() => {
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">List Your Parking Space</h1>
          <p className="text-gray-600">Share your unused parking space and start earning money</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Listing Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., Safe driveway near downtown"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your parking space, any special instructions, nearby landmarks..."
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="mt-1"
                  rows={3}
                />
              </div>
              
              <div>
                <Label htmlFor="address">Address/Location *</Label>
                <Input
                  id="address"
                  placeholder="Enter full address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>

          {/* Location & Map */}
          <Card>
            <CardHeader>
              <CardTitle>Location Picker</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-100 rounded-lg p-8 text-center">
                <MapPin className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600 mb-2">Interactive Map Location Picker</p>
                <p className="text-sm text-gray-500">Click on the map to pin your exact parking location</p>
                <p className="text-xs text-gray-400 mt-1">(Map integration would be implemented here)</p>
              </div>
            </CardContent>
          </Card>

          {/* Pricing & Availability */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Pricing & Availability
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">Price per Hour (USD) *</Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="8.00"
                    min="0"
                    step="0.50"
                    value={formData.price}
                    onChange={(e) => handleInputChange('price', e.target.value)}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="availability">Availability</Label>
                  <Select value={formData.availability} onValueChange={(value) => handleInputChange('availability', value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fulltime">Available 24/7</SelectItem>
                      <SelectItem value="weekdays">Weekdays Only</SelectItem>
                      <SelectItem value="weekends">Weekends Only</SelectItem>
                      <SelectItem value="custom">Custom Schedule</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Space Details */}
          <Card>
            <CardHeader>
              <CardTitle>Space Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="spaceType">Space Type</Label>
                <Select value={formData.spaceType} onValueChange={(value) => handleInputChange('spaceType', value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select space type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="driveway">Private Driveway</SelectItem>
                    <SelectItem value="garage">Garage</SelectItem>
                    <SelectItem value="lot">Parking Lot</SelectItem>
                    <SelectItem value="street">Street Parking</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="covered" 
                    checked={formData.covered}
                    onCheckedChange={(checked) => handleInputChange('covered', checked as boolean)}
                  />
                  <Label htmlFor="covered">Covered/Sheltered</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="evCharging" 
                    checked={formData.evCharging}
                    onCheckedChange={(checked) => handleInputChange('evCharging', checked as boolean)}
                  />
                  <Label htmlFor="evCharging">EV Charging Available</Label>
                </div>
              </div>
              
              <div>
                <Label htmlFor="instructions">Special Instructions</Label>
                <Textarea
                  id="instructions"
                  placeholder="Any special parking instructions, access codes, etc."
                  value={formData.instructions}
                  onChange={(e) => handleInputChange('instructions', e.target.value)}
                  className="mt-1"
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>

          {/* Photos Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5" />
                Photos (Optional)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Camera className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600 mb-2">Upload photos of your parking space</p>
                <p className="text-sm text-gray-500">Drag & drop or click to upload (JPG, PNG)</p>
                <Button type="button" variant="outline" className="mt-4">
                  Choose Files
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button type="submit" size="lg" className="bg-green-600 hover:bg-green-700">
              List My Space
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ListSpace;
