import React from 'react';
import './staffidcard.css'; // Import the CSS file for styling

const StaffIDCard = () => {
    return (
        <div className="staff-container">
            <div className="criteria-section">
                <h2>Select Criteria</h2>
                <div className="criteria-form">
                    <div className="form-group">
                        <label htmlFor="role">Role <span className="required">*</span></label>
                        <select id="role">
                            <option>Select</option>
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

            <div className="staff-list-section">
                <h2>Staff List</h2>
                <button className="generate-btn">Generate</button>
                <table>
                    <thead>
                        <tr>
                            <th><input type="checkbox" /></th>
                            <th>Staff ID</th>
                            <th>Name</th>
                            <th>Designation</th>
                            <th>Department</th>
                            <th>Father Name</th>
                            <th>Mother Name</th>
                            <th>Date Of Joining</th>
                            <th>Address</th>
                            <th>Phone</th>
                            <th>Date Of Birth</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan="11" className="no-data">
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

export default StaffIDCard;
