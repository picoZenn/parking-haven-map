
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MapPin, Menu, X, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, logout, isAuthenticated } = useAuth();
  
  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <MapPin className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">ParkNest</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/') ? 'text-blue-600 bg-blue-50' : ''
              }`}
            >
              Home
            </Link>
            <Link 
              to="/find-parking" 
              className={`text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/find-parking') ? 'text-blue-600 bg-blue-50' : ''
              }`}
            >
              Find Parking
            </Link>
            <Link 
              to="/list-space" 
              className={`text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/list-space') ? 'text-blue-600 bg-blue-50' : ''
              }`}
            >
              List Your Space
            </Link>
            <Link 
              to="/dashboard" 
              className={`text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/dashboard') ? 'text-blue-600 bg-blue-50' : ''
              }`}
            >
              Dashboard
            </Link>
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">
                  Welcome, {user?.email}
                </span>
                <Button 
                  variant="outline" 
                  onClick={handleLogout}
                  className="flex items-center space-x-1"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </Button>
              </div>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" className="mr-2">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-blue-600 hover:bg-blue-700">Sign Up</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 p-2"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
              <Link to="/" className="block px-3 py-2 text-gray-700 hover:text-blue-600">Home</Link>
              <Link to="/find-parking" className="block px-3 py-2 text-gray-700 hover:text-blue-600">Find Parking</Link>
              <Link to="/list-space" className="block px-3 py-2 text-gray-700 hover:text-blue-600">List Your Space</Link>
              <Link to="/dashboard" className="block px-3 py-2 text-gray-700 hover:text-blue-600">Dashboard</Link>
              
              {isAuthenticated ? (
                <div className="px-3 py-2">
                  <p className="text-sm text-gray-600 mb-2">Welcome, {user?.email}</p>
                  <Button 
                    variant="outline" 
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center space-x-1"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </Button>
                </div>
              ) : (
                <div className="flex space-x-2 px-3 py-2">
                  <Link to="/login" className="flex-1">
                    <Button variant="outline" className="w-full">Login</Button>
                  </Link>
                  <Link to="/signup" className="flex-1">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">Sign Up</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
