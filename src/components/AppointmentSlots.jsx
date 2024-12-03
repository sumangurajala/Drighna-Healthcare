import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AppointmentSlots = () => {
  const [slots, setSlots] = useState([]); // Initialize as an empty array

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const response = await axios.get('/api/appointment/slots'); // Adjust API endpoint accordingly
        if (Array.isArray(response.data)) {
          setSlots(response.data);
        } else {
          setSlots([]); // Set to an empty array if the response is not an array
        }
      } catch (error) {
        console.error('Error fetching slots:', error);
        setSlots([]); // Fallback in case of an error
      }
    };
    fetchSlots();
  }, []);

  return (
    <div>
      <h3>Available Slots</h3>
      <ul>
        {slots.length > 0 ? (
          slots.map((slot) => (
            <li key={slot.id}>
              {slot.timeFrom} - {slot.timeTo}
            </li>
          ))
        ) : (
          <p>No slots available</p>
        )}
      </ul>
    </div>
  );
};

export default AppointmentSlots;
