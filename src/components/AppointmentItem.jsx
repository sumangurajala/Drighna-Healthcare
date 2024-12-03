import React from 'react';

const AppointmentItem = ({ appointment, onEdit, onDelete }) => {
  return (
    <tr>
      <td>{appointment.id}</td>
      <td>{appointment.patient_name}</td>
      <td>{appointment.doctor_name}</td>
      <td>{appointment.date}</td>
      <td>{appointment.status}</td>
      <td>
        <button onClick={() => onEdit(appointment)}>Edit</button>
        <button onClick={() => onDelete(appointment.id)}>Delete</button>
      </td>
    </tr>
  );
};

export default AppointmentItem;
