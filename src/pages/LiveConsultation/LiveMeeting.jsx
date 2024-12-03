import React from 'react';
import './livemeeting.css'; // Import the CSS for styling

const LiveMeeting = () => {
    return (
        <div className="live-meeting-container">
            <div className="header-section">
                <h2>Live Meeting</h2>
                <button className="add-btn">Add</button>
            </div>
            <div className="search-section">
                <input type="text" placeholder="Search..." className="search-input" />
                <div className="records-info">
                    <label htmlFor="recordsPerPage">100</label>
                    <select id="recordsPerPage" className="records-select">
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="100" selected>100</option>
                    </select>
                </div>
                <div className="import-buttons">
                    <button className="export-btn">PDF</button>
                    <button className="export-btn">CSV</button>
                    <button className="export-btn">Excel</button>
                    <button className="export-btn">Print</button>
                </div>
            </div>

            <div className="meeting-table">
                <table>
                    <thead>
                        <tr>
                            <th>Meeting Title</th>
                            <th>Date</th>
                            <th>Api Used</th>
                            <th>Created By</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan="6" className="no-data">
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
            <div className="pagination">
                <span>Records: 0 to 0 of 0</span>
                <div className="pagination-controls">
                    <button>&lt;</button>
                    <button>&gt;</button>
                </div>
            </div>
        </div>
    );
};

export default LiveMeeting;
