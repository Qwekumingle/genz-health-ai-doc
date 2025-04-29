
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Navbar: React.FC = () => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="genz-container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-primary">
          <span className="text-2xl">💊</span> GenZ Doctor
        </Link>
        
        <div className="hidden space-x-4 md:flex">
          <Link to="/" className="px-4 py-2 font-medium text-foreground hover:text-primary">
            Home
          </Link>
          <Link to="/symptom-analyzer" className="px-4 py-2 font-medium text-foreground hover:text-primary">
            Symptom Analyzer
          </Link>
          <Link to="/image-analysis" className="px-4 py-2 font-medium text-foreground hover:text-primary">
            Image Analysis
          </Link>
          <Link to="/pricing" className="px-4 py-2 font-medium text-foreground hover:text-primary">
            Pricing
          </Link>
        </div>
        
        <div className="flex items-center gap-4">
          <Link to="/login">
            <Button variant="outline" size="sm">
              Log in
            </Button>
          </Link>
          <Link to="/signup">
            <Button size="sm">Sign up</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
