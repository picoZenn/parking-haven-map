
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, MapPin, DollarSign, Clock, Car, Edit, Trash2 } from 'lucide-react';

interface Listing {
  id: string;
  title: string;
  address: string;
  price: string;
  spaceType: string;
  createdAt: string;
}

interface Booking {
  id: string;
  spotName: string;
  date: string;
  duration: string;
  price: number;
  status: 'confirmed' | 'completed' | 'cancelled';
}

const Dashboard = () => {
  const [userType, setUserType] = useState<string>('renter');
  const [userName, setUserName] = useState<string>('');
  const [userListings, setUserListings] = useState<Listing[]>([]);
  const [userBookings] = useState<Booking[]>([
    {
      id: '1',
      spotName: 'Downtown Garage A',
      date: '2024-01-15',
      duration: '2 hours',
      price: 16,
      status: 'confirmed'
    },
    {
      id: '2',
      spotName: 'Private Driveway',
      date: '2024-01-12',
      duration: '4 hours',
      price: 24,
      status: 'completed'
    }
  ]);

  useEffect(() => {
    // Load user data from localStorage
    const storedUserType = localStorage.getItem('userType') || 'renter';
    const storedUserName = localStorage.getItem('userName') || 'User';
    const storedListings = JSON.parse(localStorage.getItem('userListings') || '[]');
    
    setUserType(storedUserType);
    setUserName(storedUserName);
    setUserListings(storedListings);
  }, []);

  const handleDeleteListing = (id: string) => {
    const updatedListings = userListings.filter(listing => listing.id !== id);
    setUserListings(updatedListings);
    localStorage.setItem('userListings', JSON.stringify(updatedListings));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <User className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, {userName}!
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className={userType === 'owner' ? 'bg-green-50 text-green-700' : 'bg-blue-50 text-blue-700'}>
              {userType === 'owner' ? 'Space Owner' : 'Renter'}
            </Badge>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {userType === 'owner' ? (
            <>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Active Listings</p>
                      <p className="text-3xl font-bold text-gray-900">{userListings.length}</p>
                    </div>
                    <MapPin className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Earnings</p>
                      <p className="text-3xl font-bold text-green-600">$247</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">This Month</p>
                      <p className="text-3xl font-bold text-purple-600">12</p>
                      <p className="text-sm text-gray-500">Bookings</p>
                    </div>
                    <Clock className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                      <p className="text-3xl font-bold text-gray-900">{userBookings.length}</p>
                    </div>
                    <Car className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Spent</p>
                      <p className="text-3xl font-bold text-green-600">$40</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Hours Parked</p>
                      <p className="text-3xl font-bold text-purple-600">6</p>
                    </div>
                    <Clock className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>

        {/* Main Content */}
        <Tabs defaultValue={userType === 'owner' ? 'listings' : 'bookings'} className="space-y-6">
          <TabsList>
            {userType === 'owner' ? (
              <>
                <TabsTrigger value="listings">My Listings</TabsTrigger>
                <TabsTrigger value="bookings">Bookings</TabsTrigger>
              </>
            ) : (
              <>
                <TabsTrigger value="bookings">My Bookings</TabsTrigger>
                <TabsTrigger value="favorites">Favorites</TabsTrigger>
              </>
            )}
          </TabsList>

          {/* Owner Listings Tab */}
          {userType === 'owner' && (
            <TabsContent value="listings">
              <Card>
                <CardHeader>
                  <CardTitle>Your Parking Listings</CardTitle>
                </CardHeader>
                <CardContent>
                  {userListings.length === 0 ? (
                    <div className="text-center py-8">
                      <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-4">You haven't listed any parking spaces yet.</p>
                      <Button className="bg-green-600 hover:bg-green-700">
                        List Your First Space
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {userListings.map((listing) => (
                        <div key={listing.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900 mb-1">{listing.title}</h3>
                              <p className="text-gray-600 text-sm mb-2">{listing.address}</p>
                              <div className="flex items-center gap-4 text-sm text-gray-500">
                                <span>${listing.price}/hr</span>
                                <span>{listing.spaceType}</span>
                                <span>Listed {new Date(listing.createdAt).toLocaleDateString()}</span>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleDeleteListing(listing.id)}
                                className="text-red-600 hover:text-red-800"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {/* Bookings Tab */}
          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle>
                  {userType === 'owner' ? 'Recent Bookings' : 'Your Bookings'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userBookings.map((booking) => (
                    <div key={booking.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">{booking.spotName}</h3>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span>{booking.date}</span>
                            <span>{booking.duration}</span>
                            <span>${booking.price}</span>
                          </div>
                        </div>
                        <Badge className={getStatusColor(booking.status)}>
                          {booking.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Favorites Tab (Renter only) */}
          {userType === 'renter' && (
            <TabsContent value="favorites">
              <Card>
                <CardHeader>
                  <CardTitle>Favorite Parking Spots</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No favorite spots yet. Start exploring!</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
