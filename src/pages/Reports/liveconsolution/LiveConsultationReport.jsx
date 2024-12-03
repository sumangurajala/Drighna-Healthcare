import React, { useState } from 'react';
import "./liveconsolution.css";

const LiveConsultationReport = () => {
  // State hooks for form fields
  const [timeDuration, setTimeDuration] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [opdIpd, setOpdIpd] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Check if all fields are filled
  const allFieldsFilled = timeDuration && createdBy && opdIpd && searchQuery;

  return (
    <div className="container">
      <h2>Live Consultation Report</h2>

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
            <option value="path-dh2">path (dh2)</option>
            <option value="path-dh3">path (dh3)</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="opd-ipd">OPD / IPD</label>
          <select
            id="opd-ipd"
            value={opdIpd}
            onChange={(e) => setOpdIpd(e.target.value)}
          >
            <option value="">Select</option>
            <option value="none">None</option>
            <option value="opd">OPD</option>
            <option value="ipd">IPD</option>
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

      {/* Conditionally render export buttons below the search form */}
      {allFieldsFilled && (
        <div className="export-buttons">
          <button className="export-btn">Export to Excel</button>
          <button className="export-btn">Export to PDF</button>
          <button className="export-btn">Export to CSV</button>
          <button className="export-btn">Print</button>
        </div>
      )}

      {/* Table Section */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Module</th>
              <th>Consultation Title</th>
              <th>Patient</th>
              <th>Date</th>
              <th>Api Used</th>
              <th>Created By</th>
              <th>Total Join</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="8" className="no-data">
                No data available in table
              </td>
            </tr>
          </tbody>
        </table>
             {/* Conditionally render export buttons below the search form */}
      {allFieldsFilled && (
        <div className="export-buttons">
          <button className="export-btn">Export to Excel</button>
          <button className="export-btn">Export to PDF</button>
          <button className="export-btn">Export to CSV</button>
          <button className="export-btn">Print</button>
        </div>
      )}
        
        <div className="add-record">
          <p>📄 Add new record or search with different criteria.</p>
        </div>
      </div>

      {/* Footer Section */}
      <div className="footer">
        <p>Records: 0 to 0 of 0</p>
      </div>
    </div>
  );
};

export default LiveConsultationReport;
