
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

interface BookingConfirmationProps {
  bookingData: {
    name: string;
    email: string;
    phone: string;
    reason: string;
    communicationPreference: string;
    appointmentTime: Date;
  };
  onBookAgain: () => void;
}

export const BookingConfirmation: React.FC<BookingConfirmationProps> = ({
  bookingData,
  onBookAgain,
}) => {
  const { name, email, phone, appointmentTime, communicationPreference } = bookingData;

  return (
    <Card className="shadow-lg border-0 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-genz-teal to-genz-blue text-white">
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="flex justify-center mb-4"
        >
          <CheckCircle className="w-16 h-16" />
        </motion.div>
        <CardTitle className="text-center text-2xl">Booking Confirmed!</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="text-center mb-6">
            <p className="text-lg font-medium">
              Thank you for booking with GenZ Doctor
            </p>
            <p className="text-muted-foreground">
              A confirmation has been sent to your email
            </p>
          </div>

          <div className="bg-muted/50 p-4 rounded-lg space-y-3">
            <div className="grid grid-cols-2">
              <p className="text-muted-foreground">Patient:</p>
              <p className="font-medium">{name}</p>
            </div>
            
            <div className="grid grid-cols-2">
              <p className="text-muted-foreground">Date:</p>
              <p className="font-medium">{appointmentTime.toLocaleDateString()}</p>
            </div>
            
            <div className="grid grid-cols-2">
              <p className="text-muted-foreground">Time:</p>
              <p className="font-medium">
                {appointmentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
            
            <div className="grid grid-cols-2">
              <p className="text-muted-foreground">Contact:</p>
              <p className="font-medium">{email}</p>
            </div>
            
            <div className="grid grid-cols-2">
              <p className="text-muted-foreground">Phone:</p>
              <p className="font-medium">{phone}</p>
            </div>
            
            <div className="grid grid-cols-2">
              <p className="text-muted-foreground">Communication:</p>
              <p className="font-medium capitalize">{communicationPreference}</p>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg">
            <h3 className="font-medium text-blue-800 mb-2">Next Steps</h3>
            <ul className="list-disc list-inside text-sm text-blue-700 space-y-1">
              <li>Check your email for detailed instructions</li>
              <li>Add this appointment to your calendar</li>
              <li>Be ready 5 minutes before your scheduled time</li>
              <li>Have any relevant medical records ready</li>
            </ul>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row gap-4 border-t p-6">
        <Button 
          variant="outline" 
          className="w-full sm:w-auto"
          onClick={onBookAgain}
        >
          Book Another Appointment
        </Button>
        <Button 
          className="w-full sm:w-auto bg-genz-gradient"
          onClick={() => window.print()}
        >
          Download Details
        </Button>
      </CardFooter>
    </Card>
  );
};
