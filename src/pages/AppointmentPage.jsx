import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './AppointmentPage.css';
import AddAppointmentModal from '../components/AddAppointmentModal';

const AppointmentPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/appointments');
      setAppointments(response.data);
    } catch (err) {
      console.error('Error fetching appointments:', err);
    }
  };

  const handleAddAppointment = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const filteredAppointments = appointments.filter((appointment) =>
    (appointment?.patient_name || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Export functions
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredAppointments);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Appointments');
    XLSX.writeFile(workbook, 'Appointments.xlsx');
  };

  const exportToCSV = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredAppointments);
    const csvOutput = XLSX.utils.sheet_to_csv(worksheet);
    const blob = new Blob([csvOutput], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'Appointments.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToPDF = () => {
    const input = document.getElementById('table-content');
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 190;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
      pdf.save('Appointments.pdf');
    });
  };

  const copyToClipboard = () => {
    const text = filteredAppointments
      .map(
        (appointment) =>
          `${appointment.patient_name || 'N/A'}, ${appointment.id}, ${appointment.date || 'N/A'}, ${
            appointment.phone || 'N/A'
          }, ${appointment.gender || 'N/A'}, ${appointment.doctor || 'N/A'}, ${appointment.source || 'N/A'}, ${
            appointment.priority || 'N/A'
          }, ${appointment.live_consult || 'N/A'}, ${appointment.amount || 'N/A'}, ${
            appointment.appointment_status || 'N/A'
          }`
      )
      .join('\n');
    navigator.clipboard.writeText(text).then(() => {
      alert('Data copied to clipboard');
    });
  };

  const printTable = () => {
    window.print();
  };

  return (
    <div className="appointment-page">
      <h1>Appointment Details</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by Patient Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <div className="button-panel">
          <button onClick={handleAddAppointment} className="action-button add-appointment">
            Add Appointment
          </button>
          <button className="action-button doctor-wise">Doctor Wise</button>
          <button className="action-button queue">Queue</button>
        </div>
      </div>

      <div className="export-buttons">
        <button onClick={copyToClipboard}>Copy</button>
        <button onClick={exportToExcel}>Excel</button>
        <button onClick={exportToCSV}>CSV</button>
        <button onClick={exportToPDF}>PDF</button>
        <button onClick={printTable}>Print</button>
      </div>

      <div id="table-content">
        <table className="appointment-table">
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Appointment No</th>
              <th>Appointment Date</th>
              <th>Phone</th>
              <th>Gender</th>
              <th>Doctor</th>
              <th>Source</th>
              <th>Priority</th>
              <th>Live Consultant</th>
              <th>Fees</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.map((appointment) => (
              <tr key={appointment.id}>
                <td>{appointment.patient_name || 'N/A'}</td>
                <td>{appointment.id}</td>
                <td>{appointment.date ? new Date(appointment.date).toLocaleString() : 'N/A'}</td>
                <td>{appointment.phone || 'N/A'}</td>
                <td>{appointment.gender || 'N/A'}</td>
                <td>{appointment.doctor || 'N/A'}</td>
                <td>{appointment.source || 'N/A'}</td>
                <td>{appointment.priority || 'N/A'}</td>
                <td>{appointment.live_consult || 'N/A'}</td>
                <td>{appointment.amount || 'N/A'}</td>
                <td>
                  <span className={`status ${appointment.appointment_status?.toLowerCase()}`}>
                    {appointment.appointment_status || 'N/A'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Appointment Modal */}
      {isModalOpen && <AddAppointmentModal onClose={handleCloseModal} fetchAppointments={fetchAppointments} />}
    </div>
  );
};

export default AppointmentPage;

