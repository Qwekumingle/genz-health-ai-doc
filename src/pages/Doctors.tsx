
import React from 'react';
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { fadeIn, staggerContainer, scaleIn } from '@/lib/animations';

interface DoctorProps {
  name: string;
  specialty: string;
  education: string;
  image: string;
  availableFrom: string;
}

const doctorsData: DoctorProps[] = [
  {
    name: "Dr. Alex Morgan",
    specialty: "General Medicine",
    education: "MD, Harvard Medical School",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    availableFrom: "May 15",
  },
  {
    name: "Dr. Jamie Williams",
    specialty: "Dermatology",
    education: "MD, Johns Hopkins University",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    availableFrom: "May 10",
  },
  {
    name: "Dr. Taylor Chen",
    specialty: "Psychiatry",
    education: "MD, Stanford University",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    availableFrom: "May 12",
  },
  {
    name: "Dr. Jordan Patel",
    specialty: "Pediatrics",
    education: "MD, University of California",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    availableFrom: "May 18",
  },
  {
    name: "Dr. Sam Rivera",
    specialty: "Cardiology",
    education: "MD, Yale University",
    image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    availableFrom: "May 20",
  },
  {
    name: "Dr. Casey Kim",
    specialty: "Neurology",
    education: "MD, Columbia University",
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    availableFrom: "May 14",
  },
];

const DoctorCard: React.FC<DoctorProps> = ({ name, specialty, education, image, availableFrom }) => {
  return (
    <motion.div variants={scaleIn}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="h-60 overflow-hidden">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
          />
        </div>
        <CardContent className="pt-6">
          <h3 className="text-xl font-semibold">{name}</h3>
          <p className="text-primary font-medium">{specialty}</p>
          <p className="text-muted-foreground text-sm mt-1">{education}</p>
          <div className="mt-3 inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
            Available from {availableFrom}
          </div>
        </CardContent>
        <CardFooter className="pt-0">
          <Button size="sm" className="w-full mt-4">
            Book Appointment
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

const Doctors = () => {
  return (
    <div className="py-16 bg-background">
      <div className="genz-container">
        <motion.div 
          className="space-y-16"
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          {/* Hero Section */}
          <motion.div variants={fadeIn} className="text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold bg-genz-gradient bg-clip-text text-transparent">
              Our Doctors
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Meet our team of experienced healthcare professionals ready to provide you with 
              the best medical advice and care.
            </p>
          </motion.div>

          {/* Doctors Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
          >
            {doctorsData.map((doctor, index) => (
              <DoctorCard key={index} {...doctor} />
            ))}
          </motion.div>

          {/* CTA Section */}
          <motion.div 
            variants={fadeIn} 
            className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 md:p-12 rounded-2xl text-center space-y-6"
          >
            <h2 className="text-2xl md:text-3xl font-bold">Need a Consultation?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our doctors are available for virtual consultations. Book an appointment and 
              get the medical advice you need from the comfort of your home.
            </p>
            <Button size="lg" className="px-8">
              Book Appointment
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Doctors;
