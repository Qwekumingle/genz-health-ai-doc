
import React, { useState, useMemo } from "react";
import { Calendar as BigCalendar, dateFnsLocalizer, View, SlotInfo } from "react-big-calendar";
import { format, parse, startOfWeek, getDay, addHours } from "date-fns";
import { enUS } from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { motion } from "framer-motion";

// React Big Calendar localizer setup
const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

interface CalendarProps {
  onSlotSelect: (slot: Date) => void;
}

// Simulate some booked slots (in a real app, fetch these from your API/database)
const generateAvailableSlots = () => {
  const today = new Date();
  const slots = [];
  
  // Generate time slots for the next 7 days
  for (let day = 0; day < 7; day++) {
    const currentDay = new Date(today);
    currentDay.setDate(today.getDate() + day);
    
    // Skip weekends
    if (currentDay.getDay() === 0 || currentDay.getDay() === 6) continue;
    
    // Add slots for this day (9am to 5pm)
    for (let hour = 9; hour < 17; hour++) {
      // Skip lunch hour
      if (hour === 12) continue;
      
      const start = new Date(currentDay);
      start.setHours(hour, 0, 0, 0);
      
      const end = new Date(start);
      end.setHours(hour + 1, 0, 0, 0);
      
      // 80% chance to be available
      if (Math.random() > 0.2) {
        slots.push({
          start,
          end,
          title: "Available",
        });
      }
    }
  }
  
  return slots;
};

export const Calendar: React.FC<CalendarProps> = ({ onSlotSelect }) => {
  const [view, setView] = useState<View>("week");
  const [date, setDate] = useState(new Date());
  const availableSlots = useMemo(generateAvailableSlots, []);

  const handleSelectSlot = (slotInfo: SlotInfo) => {
    // Check if the slot is in our available slots
    const isAvailable = availableSlots.some(
      (slot) =>
        slot.start.getTime() <= slotInfo.start.getTime() &&
        slot.end.getTime() >= slotInfo.end.getTime()
    );

    if (isAvailable) {
      onSlotSelect(slotInfo.start);
    } else {
      alert("This time slot is not available. Please select another.");
    }
  };

  const eventStyleGetter = () => {
    return {
      style: {
        backgroundColor: "#0EA5E9",
        borderRadius: "8px",
        opacity: 0.8,
        color: "white",
        border: "0px",
        display: "block",
        fontWeight: "bold",
        fontSize: "14px",
        padding: "4px",
      },
    };
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="h-[600px] bg-white rounded-xl overflow-hidden"
    >
      <BigCalendar
        localizer={localizer}
        events={availableSlots}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "100%" }}
        views={["month", "week", "day"]}
        view={view}
        onView={setView as any}
        date={date}
        onNavigate={setDate}
        selectable
        onSelectSlot={handleSelectSlot}
        eventPropGetter={eventStyleGetter}
        dayPropGetter={(date) => {
          const today = new Date();
          return {
            className: date.getDate() === today.getDate() && 
                       date.getMonth() === today.getMonth() &&
                       date.getFullYear() === today.getFullYear()
              ? "rbc-today bg-blue-50"
              : "",
            style: {
              backgroundColor: date.getDay() === 0 || date.getDay() === 6 
                ? "#f8f8f8" 
                : undefined,
            },
          };
        }}
      />
    </motion.div>
  );
};
