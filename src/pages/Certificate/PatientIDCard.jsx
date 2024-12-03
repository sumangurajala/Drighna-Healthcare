

import React from 'react';
import './patient.css'; // Import the CSS for styling

const PatientIDCard = () => {
    return (
        <div className="idcard-container">
            <div className="criteria-section">
                <h2>Select Criteria</h2>
                <div className="criteria-form">
                    <div className="form-group">
                        <label htmlFor="patient">Patient</label>
                        <select id="patient">
                            <option>All</option>
                            {/* Add more options as needed */}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="idCardTemplate">ID Card Template <span className="required">*</span></label>
                        <select id="idCardTemplate">
                            <option>Select</option>
                            {/* Add more options as needed */}
                        </select>
                    </div>
                    <button className="search-btn">Search</button>
                    <button className="template-btn">ID Card Template</button>
                </div>
            </div>

            <div className="patient-list-section">
                <h2>Patient List</h2>
                <button className="generate-btn">Generate</button>
                <table>
                    <thead>
                        <tr>
                            <th><input type="checkbox" /></th>
                            <th>Patient Name</th>
                            <th>Age</th>
                            <th>Gender</th>
                            <th>Phone</th>
                            <th>Guardian Name</th>
                            <th>Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan="7" className="no-data">
                                No data available in table
                                <div className="no-data-icon">
                                    {/* Icon or illustration can be an image or SVG */}
                                    <img src="empty-folder-icon.png" alt="No data" />
                                </div>
                                <p className="no-data-text">
                                    Add new record or search with different criteria.
                                </p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PatientIDCard;
