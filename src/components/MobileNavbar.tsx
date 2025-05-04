
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const MobileNavbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-primary">
          <span className="text-2xl">💊</span> GenZ Doctor
        </Link>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden p-2 rounded-md"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-4">
          <Link to="/" className="px-4 py-2 font-medium text-foreground hover:text-primary">
            Home
          </Link>
          <Link to="/symptom-analyzer" className="px-4 py-2 font-medium text-foreground hover:text-primary">
            Symptom Analyzer
          </Link>
          <Link to="/image-analysis" className="px-4 py-2 font-medium text-foreground hover:text-primary">
            Image Analysis
          </Link>
          <Link to="/about" className="px-4 py-2 font-medium text-foreground hover:text-primary">
            About Us
          </Link>
          <Link to="/doctors" className="px-4 py-2 font-medium text-foreground hover:text-primary">
            Our Doctors
          </Link>
          <Link to="/pricing" className="px-4 py-2 font-medium text-foreground hover:text-primary">
            Pricing
          </Link>
        </div>
        
        <div className="hidden md:flex items-center gap-4">
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

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-background border-t px-4 py-2 shadow-md">
          <div className="flex flex-col space-y-3 py-3">
            <Link to="/" className="px-4 py-2 font-medium text-foreground hover:text-primary" onClick={toggleMenu}>
              Home
            </Link>
            <Link to="/symptom-analyzer" className="px-4 py-2 font-medium text-foreground hover:text-primary" onClick={toggleMenu}>
              Symptom Analyzer
            </Link>
            <Link to="/image-analysis" className="px-4 py-2 font-medium text-foreground hover:text-primary" onClick={toggleMenu}>
              Image Analysis
            </Link>
            <Link to="/about" className="px-4 py-2 font-medium text-foreground hover:text-primary" onClick={toggleMenu}>
              About Us
            </Link>
            <Link to="/doctors" className="px-4 py-2 font-medium text-foreground hover:text-primary" onClick={toggleMenu}>
              Our Doctors
            </Link>
            <Link to="/pricing" className="px-4 py-2 font-medium text-foreground hover:text-primary" onClick={toggleMenu}>
              Pricing
            </Link>
            <div className="flex space-x-2 pt-2">
              <Link to="/login" className="flex-1">
                <Button variant="outline" size="sm" className="w-full" onClick={toggleMenu}>
                  Log in
                </Button>
              </Link>
              <Link to="/signup" className="flex-1">
                <Button size="sm" className="w-full" onClick={toggleMenu}>
                  Sign up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default MobileNavbar;
