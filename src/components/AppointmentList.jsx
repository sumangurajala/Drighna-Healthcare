import React from 'react';
import './AppointmentList.css';

const AppointmentList = ({ appointments, onEdit, onDelete }) => {
  return (
    <table className="table appointment-table">
      <thead>
        <tr>
          <th>Patient Name</th>
          <th>Appointment No</th>
          <th>Date</th>
          <th>Phone</th>
          <th>Gender</th>
          <th>Doctor</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {appointments.map((appointment) => (
          <tr key={appointment.id}>
            <td>{appointment.patient_name}</td>
            <td>{appointment.appointment_no}</td>
            <td>{new Date(appointment.date).toLocaleDateString()}</td>
            <td>{appointment.phone}</td>
            <td>{appointment.gender}</td>
            <td>{appointment.doctor}</td>
            <td>{appointment.status}</td>
            <td>
              <button className="btn btn-primary" onClick={() => onEdit(appointment)}>Edit</button>
              <button className="btn btn-danger" onClick={() => onDelete(appointment.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AppointmentList;
