
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import MobileNavbar from './MobileNavbar';

const Navbar: React.FC = () => {
  // Only show MobileNavbar for all screen sizes as it handles both mobile and desktop
  return <MobileNavbar />;
};

export default Navbar;
