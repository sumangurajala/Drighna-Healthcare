import React, { useState } from 'react';
import "./livemeetingreport.css";

const LiveMeetingReport = () => {
  // State hooks for form fields
  const [timeDuration, setTimeDuration] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="container">
      <h2>Live Meeting Report</h2>

      {/* Filter Form */}
      <form className="filter-form">
        <div className="form-group">
          <label htmlFor="time-duration">Time Duration</label>
          <select
            id="time-duration"
            value={timeDuration}
            onChange={(e) => setTimeDuration(e.target.value)}
          >
            <option value="">Select</option>
            <option value="this-week">This Week</option>
            <option value="last-week">Last Week</option>
            <option value="this-month">This Month</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="created-by">Created By</label>
          <select
            id="created-by"
            value={createdBy}
            onChange={(e) => setCreatedBy(e.target.value)}
          >
            <option value="">Select</option>
            <option value="user1">User 1</option>
            <option value="user2">User 2</option>
          </select>
        </div>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <button type="button" className="search-button">
          <span role="img" aria-label="search">🔍</span> Search
        </button>
      </form>

      {/* Table Section */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Meeting Title</th>
              <th>Date</th>
              <th>Api Used</th>
              <th>Created By</th>
              <th>Total Join</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="6" className="no-data">
                No data available in table
              </td>
            </tr>
          </tbody>
        </table>
        
        <div className="add-record">
          <p>📄 Add new record or search with different criteria.</p>
        </div>
      </div>

      {/* Export Buttons Section - Moved below the table */}
      <div className="export-buttons">
        <button className="export-btn">Excel</button>
        <button className="export-btn">PDF</button>
        <button className="export-btn">CSV</button>
        <button className="export-btn">Print</button>
      </div>

      {/* Footer Section with Pagination */}
      <div className="footer">
        <p>Records: 0 to 0 of 0</p>
        <div className="pagination">
          <span>&lt;</span>
          <span>&gt;</span>
        </div>
      </div>
    </div>
  );
};

export default LiveMeetingReport;
