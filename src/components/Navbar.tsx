
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import MobileNavbar from './MobileNavbar';
import { useAuth } from '@/context/AuthContext';

const Navbar: React.FC = () => {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  // Only show MobileNavbar for all screen sizes as it handles both mobile and desktop
  return <MobileNavbar user={user} onSignOut={handleSignOut} />;
};

export default Navbar;
