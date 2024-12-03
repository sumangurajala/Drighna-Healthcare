import React from 'react';
import './AppointmentDetails.css';

const AppointmentDetails = () => {
  const appointmentData = [
    {
      patientName: 'kumutha (1289)',
      appointmentNo: 'APPN199',
      appointmentDate: '04-06-2024 10:57 AM',
      phone: '9637538426',
      gender: 'Female',
      doctor: 'Jeorge Tadese (007)',
      source: 'Offline',
      priority: 'Normal',
      liveConsultant: 'Yes',
      fees: '172.50',
      status: 'Approved',
    },
  ];

  return (
    <div className="appointment-details">
      <div className="appointment-header">
        <h2>Appointment Details</h2>
        <div className="appointment-actions">
          <button>Add Appointment</button>
          <button>Doctor Wise</button>
          <button>Queue</button>
        </div>
      </div>
      <input type="text" className="appointment-search-bar" placeholder="Search..." />
      <div className="appointment-table">
        <div className="appointment-table-header">
          <div>Patient Name</div>
          <div>Appointment No</div>
          <div>Appointment Date</div>
          <div>Phone</div>
          <div>Gender</div>
          <div>Doctor</div>
          <div>Source</div>
          <div>Priority</div>
          <div>Live Consultant</div>
          <div>Fees</div>
          <div>Status</div>
        </div>
        {appointmentData.map((appointment, index) => (
          <div key={index} className="appointment-table-row">
            <div>{appointment.patientName}</div>
            <div>{appointment.appointmentNo}</div>
            <div>{appointment.appointmentDate}</div>
            <div>{appointment.phone}</div>
            <div>{appointment.gender}</div>
            <div>{appointment.doctor}</div>
            <div>{appointment.source}</div>
            <div>{appointment.priority}</div>
            <div>{appointment.liveConsultant}</div>
            <div>{appointment.fees}</div>
            <div className={`status ${appointment.status.toLowerCase()}`}>{appointment.status}</div>
          </div>
        ))}
      </div>
      <div className="pagination">
        <span>Records: 1 to 1 of 1</span>
      </div>
    </div>
  );
};

export default AppointmentDetails;
