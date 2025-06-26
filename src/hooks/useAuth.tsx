
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export interface User {
  email: string;
  userType: 'renter' | 'owner';
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in on mount
    const userEmail = localStorage.getItem('userEmail');
    const userType = localStorage.getItem('userType');
    
    if (userEmail && userType) {
      setUser({
        email: userEmail,
        userType: userType as 'renter' | 'owner'
      });
    }
    
    setIsLoading(false);
  }, []);

  const login = (email: string, userType: 'renter' | 'owner') => {
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userType', userType);
    setUser({ email, userType });
  };

  const logout = () => {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userType');
    setUser(null);
    navigate('/'); // Redirect to landing page
  };

  // TODO: Replace with real API calls when backend is integrated
  const fetchUserData = async () => {
    // Placeholder for backend API call
    return user;
  };

  const updateUserProfile = async (data: Partial<User>) => {
    // Placeholder for backend API call
    console.log('Update profile:', data);
  };

  return {
    user,
    isLoading,
    login,
    logout,
    fetchUserData,
    updateUserProfile,
    isAuthenticated: !!user
  };
};
