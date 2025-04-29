
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="mt-auto border-t bg-background py-8">
      <div className="genz-container">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-semibold">GenZ Doctor</h3>
            <p className="text-sm text-muted-foreground">
              AI-powered medical assistant designed for the GenZ generation.
            </p>
          </div>
          
          <div>
            <h3 className="mb-4 text-lg font-semibold">Features</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/symptom-analyzer" className="text-muted-foreground hover:text-primary">
                  Symptom Analyzer
                </Link>
              </li>
              <li>
                <Link to="/image-analysis" className="text-muted-foreground hover:text-primary">
                  Medical Image Analysis
                </Link>
              </li>
              <li>
                <Link to="/appointments" className="text-muted-foreground hover:text-primary">
                  Doctor Appointments
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="mb-4 text-lg font-semibold">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/doctors" className="text-muted-foreground hover:text-primary">
                  Our Doctors
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="mb-4 text-lg font-semibold">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-primary">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="text-muted-foreground hover:text-primary">
                  Medical Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} GenZ Doctor. All rights reserved.</p>
          <p className="mt-2">
            This service is not a substitute for professional medical advice, diagnosis, or treatment.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
