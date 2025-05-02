
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar } from "@/components/booking/Calendar";
import { BookingForm } from "@/components/booking/BookingForm";
import { BookingConfirmation } from "@/components/booking/BookingConfirmation";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fadeIn } from "@/lib/animations";

type BookingStep = "select-slot" | "form" | "confirmation";

const Appointments = () => {
  const [currentStep, setCurrentStep] = useState<BookingStep>("select-slot");
  const [selectedSlot, setSelectedSlot] = useState<Date | null>(null);
  const [bookingData, setBookingData] = useState<any>(null);
  const { toast } = useToast();

  const handleSlotSelect = (slot: Date) => {
    setSelectedSlot(slot);
    setCurrentStep("form");
    toast({
      title: "Time slot selected",
      description: `You selected ${slot.toLocaleTimeString()} on ${slot.toLocaleDateString()}`,
    });
  };

  const handleFormSubmit = (formData: any) => {
    // In a real application, send this data to your backend
    const finalBookingData = {
      ...formData,
      appointmentTime: selectedSlot,
    };
    
    console.log("Booking data:", finalBookingData);
    setBookingData(finalBookingData);
    setCurrentStep("confirmation");
    
    toast({
      title: "Booking successful!",
      description: "Your appointment has been booked successfully.",
    });
  };

  const handleBookAgain = () => {
    setCurrentStep("select-slot");
    setSelectedSlot(null);
    setBookingData(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial="hidden"
        animate="show"
        variants={fadeIn}
        className="max-w-5xl mx-auto"
      >
        <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-genz-blue to-genz-purple bg-clip-text text-transparent">
          Book Your Appointment
        </h1>
        
        {currentStep === "select-slot" && (
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-center text-xl">Select a Time Slot</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar onSlotSelect={handleSlotSelect} />
            </CardContent>
          </Card>
        )}

        {currentStep === "form" && selectedSlot && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-center text-xl">Complete Your Booking</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center mb-6 text-muted-foreground">
                  Appointment on {selectedSlot.toLocaleDateString()} at{" "}
                  {selectedSlot.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
                <BookingForm onSubmit={handleFormSubmit} />
              </CardContent>
            </Card>
          </motion.div>
        )}

        {currentStep === "confirmation" && bookingData && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <BookingConfirmation 
              bookingData={bookingData} 
              onBookAgain={handleBookAgain} 
            />
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Appointments;
