// frontend/src/pages/AppointmentDetails.jsx

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const AppointmentDetails = () => {
  const { id } = useParams();
  const [appointment, setAppointment] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/api/appointments/${id}`)
      .then(response => {
        setAppointment(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching appointment details', error);
      });
  }, [id]);

  return (
    <div className="appointment-details-page">
      {appointment ? (
        <div>
          <h2>Appointment Details</h2>
          <p><strong>Patient Name:</strong> {appointment.patient_name}</p>
          <p><strong>Doctor:</strong> {appointment.doctor_name}</p>
          <p><strong>Status:</strong> {appointment.appointment_status}</p>
          <p><strong>Date:</strong> {appointment.date}</p>
          <p><strong>Contact:</strong> {appointment.mobileno}</p>
          <p><strong>Email:</strong> {appointment.email}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default AppointmentDetails;
