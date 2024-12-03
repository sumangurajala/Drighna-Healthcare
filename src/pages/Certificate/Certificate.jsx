import React, { useState } from 'react';
import axios from 'axios'; // Import Axios
import './certificate.css';

const Certificate = () => {
    const [module, setModule] = useState('');
    const [patientName, setPatientName] = useState('');
    const [certificateTemplate, setCertificateTemplate] = useState('');
    const [opdIpdNo, setOpdIpdNo] = useState(''); // Add state for OPD/IPD Number
    const [patientList, setPatientList] = useState([]); // Store fetched patients
    const [loading, setLoading] = useState(false); // Loading indicator
    const [error, setError] = useState(''); // Error message

    const handleSearch = async () => {
        // Reset error and set loading
        setError('');
        setLoading(true);

        try {
            // Use Axios to send the POST request to the backend
            const response = await axios.get('http://localhost:3000/api/opdbalanceget', {
                module,
                patientName,
                certificateTemplate,
                opdIpdNo, // Include OPD/IPD No in the request
            });

            // If the response is successful, set the patient list
            setPatientList(response.data.patients || []);
        } catch (err) {
            console.error('Axios Error:', err);  // Log the full error object
            if (err.response) {
                console.error('Response Error:', err.response);  // Log the response error details
                setError(err.response.data.message || 'Error fetching patients');
            } else if (err.request) {
                console.error('Request Error:', err.request);  // Log the request error details
                setError('Unable to connect to the server. Please try again later.');
            } else {
                console.error('Error Message:', err.message);  // Log the error message
                setError('An unknown error occurred.');
            }
            setPatientList([]);
        }
        
    };

    return (
        <div className="patient-container">
            <div className="criteria-section">
                <h2>Select Criteria</h2>
                <div className="criteria-form">
                    <div className="form-group">
                        <label htmlFor="module">Module <span className="required">*</span></label>
                        <input
                            id="module"
                            type="text"
                            value={module}
                            onChange={(e) => setModule(e.target.value)}
                            placeholder="Enter module"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="patientName">Patient Name</label>
                        <input
                            id="patientName"
                            type="text"
                            value={patientName}
                            onChange={(e) => setPatientName(e.target.value)}
                            placeholder="Enter patient name"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="certificateTemplate">Certificate Template <span className="required">*</span></label>
                        <input
                            id="certificateTemplate"
                            type="text"
                            value={certificateTemplate}
                            onChange={(e) => setCertificateTemplate(e.target.value)}
                            placeholder="Enter certificate template"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="opdIpdNo">OPD/IPD No</label>
                        <input
                            id="opdIpdNo"
                            type="text"
                            value={opdIpdNo}
                            onChange={(e) => setOpdIpdNo(e.target.value)}
                            placeholder="Enter OPD/IPD Number"
                        />
                    </div>
                    <div className="button-group">
                        <button className="search-btn" onClick={handleSearch} disabled={loading}>
                            {loading ? 'Searching...' : 'Search'}
                        </button>
                    </div>
                    {error && <p className="error-text">{error}</p>}
                </div>
            </div>

            <div className="patient-list-section">
                <h2>Patient List</h2>
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>OPD/IPD No</th>
                            <th>Patient Name</th>
                            <th>Gender</th>
                            <th>Mobile Number</th>
                            <th>Discharged</th>
                        </tr>
                    </thead>
                    <tbody>
                        {patientList.length > 0 ? (
                            patientList.map((patient, index) => (
                                <tr key={patient.id}>
                                    <td>{index + 1}</td>
                                    <td>{patient.opdIpdNo}</td>
                                    <td>{patient.name}</td>
                                    <td>{patient.gender}</td>
                                    <td>{patient.mobile}</td>
                                    <td>{patient.discharged ? 'Yes' : 'No'}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="no-data">
                                    No data available in table
                                    <div className="no-data-icon">
                                        <img src="empty-folder-icon.png" alt="No data" />
                                    </div>
                                    <p className="no-data-text">
                                        {loading ? 'Loading...' : 'Add new record or search with different criteria.'}
                                    </p>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Certificate;


