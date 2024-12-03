// src/components/AddAppointmentModal.jsx

import React, { useState } from 'react';
import axios from 'axios';
import AddPatientModal from './AddPatientModal'; // Import the AddPatientModal component
import './AddAppointmentModal.css'; // Import the required CSS

const AddAppointmentModal = ({ onClose, fetchAppointments }) => {
  const [formData, setFormData] = useState({
    doctor: '',
    doctorFees: '',
    shift: '',
    slot: '',
    appointmentDate: '',
    appointmentPriority: 'Normal',
    paymentMode: 'Cash',
    status: '',
    liveConsult: 'No',
    message: '',
    patient_id: '', // This will be set when a new patient is added or selected
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isPatientModalOpen, setIsPatientModalOpen] = useState(false); // Control patient modal visibility
  const [selectedPatient, setSelectedPatient] = useState(null); // Track selected patient

  // Handle input changes in the appointment form
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle patient search
  const searchPatients = async (query) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/patients/search?query=${query}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error searching patients:', error);
    }
  };

  // Handle patient selection from the search results
  const handlePatientSelection = (patient) => {
    setFormData({ ...formData, patient_id: patient.id });
    setSelectedPatient(patient);
  };

  // Handle form submission for adding an appointment
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/appointments', formData);
      fetchAppointments(); // Refresh the list of appointments after adding a new one
      onClose(); // Close the modal after successful submission
    } catch (err) {
      console.error('Error adding appointment:', err);
    }
  };

  // Toggle the visibility of the AddPatientModal
  const togglePatientModal = () => {
    setIsPatientModalOpen(!isPatientModalOpen);
  };

  // Function to handle adding a new patient
  const handlePatientAdded = (patient) => {
    setFormData({ ...formData, patient_id: patient.id });
    setIsPatientModalOpen(false); // Close the patient modal after adding
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2 className="modal-title">Add Appointment</h2>
        <form onSubmit={handleSubmit} className="appointment-form">
          <div className="form-row">
            <div className="form-group">
              <label>Search Patient</label>
              <input
                type="text"
                placeholder="Search by Patient Name or ID"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onBlur={() => searchPatients(searchQuery)} // Trigger search on blur or when needed
              />
              <div className="search-results">
                {searchResults.map((patient) => (
                  <div
                    key={patient.id}
                    className="search-item"
                    onClick={() => handlePatientSelection(patient)}
                  >
                    {patient.id} - {patient.patient_name}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Form fields for appointment details */}
          <div className="form-row">
            <div className="form-group">
              <label>Doctor *</label>
              <select name="doctor" value={formData.doctor} onChange={handleChange} required>
                <option value="">Select</option>
                <option value="Amit Singh (011)">Amit Singh (011)</option>
                <option value="Chethan Kumbar (01)">Chethan Kumbar (01)</option>
              </select>
            </div>
            <div className="form-group">
              <label>Doctor Fees *</label>
              <input type="text" name="doctorFees" value={formData.doctorFees} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Shift *</label>
              <select name="shift" value={formData.shift} onChange={handleChange} required>
                <option value="">Select</option>
                <option value="Morning">Morning</option>
                <option value="Evening">Evening</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Slot *</label>
              <select name="slot" value={formData.slot} onChange={handleChange} required>
                <option value="">Select</option>
                <option value="9:00 AM - 10:00 AM">9:00 AM - 10:00 AM</option>
                <option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</option>
              </select>
            </div>
            <div className="form-group">
              <label>Appointment Date *</label>
              <input
                type="datetime-local"
                name="appointmentDate"
                value={formData.appointmentDate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Appointment Priority</label>
              <select name="appointmentPriority" value={formData.appointmentPriority} onChange={handleChange}>
                <option value="Normal">Normal</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Payment Mode</label>
              <select name="paymentMode" value={formData.paymentMode} onChange={handleChange}>
                <option value="Cash">Cash</option>
                <option value="Card">Card</option>
                <option value="Online">Online</option>
              </select>
            </div>
            <div className="form-group">
              <label>Status *</label>
              <select name="status" value={formData.status} onChange={handleChange} required>
                <option value="">Select</option>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
              </select>
            </div>
            <div className="form-group">
              <label>Live Consultant (On Video Conference) *</label>
              <select name="liveConsult" value={formData.liveConsult} onChange={handleChange} required>
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
            </div>
          </div>

          {/* Toggle New Patient Form Button */}
          <div className="form-group new-patient-container">
            <button type="button" className="add-patient-button" onClick={togglePatientModal}>
              {isPatientModalOpen ? 'Close New Patient Form' : '+ New Patient'}
            </button>
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="submit-button">
              Save
            </button>
          </div>
        </form>

        {/* Add Patient Modal */}
        {isPatientModalOpen && (
          <AddPatientModal
            onClose={togglePatientModal}
            onPatientAdded={handlePatientAdded}
          />
        )}
      </div>
    </div>
  );
};

export default AddAppointmentModal;
