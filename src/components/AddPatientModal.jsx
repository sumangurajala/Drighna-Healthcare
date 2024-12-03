// src/components/AddPatientModal.jsx

import React, { useState } from 'react';
import axios from 'axios';
import './AddPatientModal.css'; // Import custom CSS for styling

const AddPatientModal = ({ onClose, onPatientAdded }) => {
  const [patientData, setPatientData] = useState({
    patient_name: '',
    dob: '',
    age: '',
    month: '',
    day: '',
    gender: '',
    mobileno: '',
    email: '',
    remarks: '',
    identification_number: '', // Add identification_number field
    guardian_name: '',
    blood_group: '',
    marital_status: '',
    address: '',
    known_allergies: '',
    patientPhoto: null, // For handling file uploads if needed
  });

  // Function to handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatientData({ ...patientData, [name]: value });

    if (name === 'dob') {
      const birthDate = new Date(value);
      const today = new Date();
      let calculatedAge = today.getFullYear() - birthDate.getFullYear();
      const monthDifference = today.getMonth() - birthDate.getMonth();
      const dayDifference = today.getDate() - birthDate.getDate();

      if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
        calculatedAge--;
      }

      setPatientData((prevData) => ({
        ...prevData,
        age: calculatedAge.toString(),
        month: (birthDate.getMonth() + 1).toString(),
        day: birthDate.getDate().toString(),
      }));
    }
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!patientData.patient_name || !patientData.age) {
      alert('Name and Age are required.');
      return;
    }

    // Prepare form data to be sent to the backend
    const formData = {
      patient_name: patientData.patient_name,
      dob: patientData.dob,
      age: patientData.age,
      month: patientData.month,
      day: patientData.day,
      gender: patientData.gender,
      mobileno: patientData.mobileno,
      email: patientData.email,
      remarks: patientData.remarks,
      identification_number: patientData.identification_number, // Include identification_number
      guardian_name: patientData.guardian_name,
      blood_group: patientData.blood_group,
      marital_status: patientData.marital_status,
      address: patientData.address,
      known_allergies: patientData.known_allergies,
    };

    try {
      const response = await axios.post('http://localhost:3000/api/patients', formData);

      // Check if response contains the patient object with patient_name
      if (response.data && response.data.patient) {
        alert(`Patient ${response.data.patient.patient_name} saved successfully `);
        onPatientAdded(response.data.patient); // Call callback to update patient list or perform any additional action
      } else {
        alert('Patient saved successfully');
      }
      onClose(); // Close the modal on successful submission
    } catch (err) {
      console.error('Error adding patient:', err);
      alert('Failed to save patient.');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2 className="modal-title">Add Patient</h2>
        <form onSubmit={handleSubmit} className="patient-form">
          {/* Name, Gender, DOB, Age, and Guardian Name */}
          <div className="form-row">
            <div className="form-group">
              <label>Name *</label>
              <input type="text" name="patient_name" value={patientData.patient_name} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Guardian Name</label>
              <input type="text" name="guardian_name" value={patientData.guardian_name} onChange={handleChange} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Gender</label>
              <select name="gender" value={patientData.gender} onChange={handleChange}>
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label>Date Of Birth *</label>
              <input
                type="date"
                name="dob"
                value={patientData.dob}
                onChange={handleChange}
                placeholder="yyyy-MM-dd"
                required
              />
            </div>
            <div className="form-group">
              <label>Age (yy-mm-dd) *</label>
              <div className="age-display">
                <span>{patientData.age} Years</span>
                <span>{patientData.month} Months</span>
                <span>{patientData.day} Days</span>
              </div>
            </div>
          </div>

          {/* Phone, Email, and Address */}
          <div className="form-row">
            <div className="form-group">
              <label>Phone</label>
              <input type="text" name="mobileno" value={patientData.mobileno} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" name="email" value={patientData.email} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Address</label>
              <input type="text" name="address" value={patientData.address} onChange={handleChange} />
            </div>
          </div>

          {/* Blood Group, Marital Status, and Known Allergies */}
          <div className="form-row">
            <div className="form-group">
              <label>Blood Group</label>
              <select name="blood_group" value={patientData.blood_group} onChange={handleChange}>
                <option value="">Select</option>
                <option value="A+">A+</option>
                <option value="B+">B+</option>
                <option value="O+">O+</option>
                <option value="AB+">AB+</option>
                <option value="A-">A-</option>
                <option value="B-">B-</option>
                <option value="O-">O-</option>
                <option value="AB-">AB-</option>
              </select>
            </div>
            <div className="form-group">
              <label>Marital Status</label>
              <select name="marital_status" value={patientData.marital_status} onChange={handleChange}>
                <option value="">Select</option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Widowed">Widowed</option>
                <option value="Separated">Separated</option>
              </select>
            </div>
            <div className="form-group">
              <label>Any Known Allergies</label>
              <input type="text" name="known_allergies" value={patientData.known_allergies} onChange={handleChange} />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>TPA ID</label>
              <input type="text" name="tpa_id" value={patientData.tpa_id} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>TPA Validity</label>
              <input type="text" name="tpa_validity" value={patientData.tpa_validity} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>National Identification Number</label>
              <input type="text" name="nationalId" value={patientData.nationalId} onChange={handleChange} />
            </div>
          </div>
          {/* Save and Cancel Buttons */}
          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="submit-button">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPatientModal;
