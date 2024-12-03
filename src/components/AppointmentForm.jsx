import React, { useState, useEffect } from 'react';
import './AppointmentForm.css';

const AppointmentForm = ({ appointment, onFormSubmit }) => {
  const [formData, setFormData] = useState({
    patient_name: '',
    appointment_no: '',
    date: '',
    phone: '',
    gender: '',
    doctor: '',
    status: ''
  });

  useEffect(() => {
    if (appointment) {
      setFormData(appointment);
    }
  }, [appointment]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFormSubmit(formData);
  };

  return (
    <form className="appointment-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="patient_name"
        value={formData.patient_name}
        placeholder="Patient Name"
        onChange={handleChange}
      />
      <input
        type="text"
        name="appointment_no"
        value={formData.appointment_no}
        placeholder="Appointment No"
        onChange={handleChange}
      />
      <input
        type="datetime-local"
        name="date"
        value={formData.date}
        onChange={handleChange}
      />
      <input
        type="text"
        name="phone"
        value={formData.phone}
        placeholder="Phone"
        onChange={handleChange}
      />
      <input
        type="text"
        name="gender"
        value={formData.gender}
        placeholder="Gender"
        onChange={handleChange}
      />
      <input
        type="text"
        name="doctor"
        value={formData.doctor}
        placeholder="Doctor"
        onChange={handleChange}
      />
      <input
        type="text"
        name="status"
        value={formData.status}
        placeholder="Status"
        onChange={handleChange}
      />
      <button type="submit" className="btn btn-success">Save</button>
    </form>
  );
};

export default AppointmentForm;
