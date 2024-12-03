import React, { useState } from 'react';
import "./tpaReport.css";

const TPAReport = () => {
  // State hooks for form fields
  const [timeDuration, setTimeDuration] = useState("");
  const [doctor, setDoctor] = useState("");
  const [tpa, setTpa] = useState("");
  const [caseId, setCaseId] = useState("");
  const [chargeCategory, setChargeCategory] = useState("");
  const [charge, setCharge] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Check if all fields are filled
  const allFieldsFilled = timeDuration && doctor && tpa && caseId && chargeCategory && charge;

  return (
    <div className="container">
      <h2>TPA Report</h2>

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
          <label htmlFor="doctor">Doctor</label>
          <select
            id="doctor"
            value={doctor}
            onChange={(e) => setDoctor(e.target.value)}
          >
            <option value="">Select</option>
            <option value="doctor1">Dr. Amit Singh</option>
            <option value="doctor2">Dr. Sonia Bush</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="tpa">TPA</label>
          <select
            id="tpa"
            value={tpa}
            onChange={(e) => setTpa(e.target.value)}
          >
            <option value="">Select</option>
            <option value="tpa1">Star Health Insurance</option>
            <option value="tpa2">CGHS</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="case-id">Case ID</label>
          <input
            type="text"
            id="case-id"
            value={caseId}
            onChange={(e) => setCaseId(e.target.value)}
            placeholder="Enter Case ID"
          />
        </div>

        <div className="form-group">
          <label htmlFor="charge-category">Charge Category</label>
          <select
            id="charge-category"
            value={chargeCategory}
            onChange={(e) => setChargeCategory(e.target.value)}
          >
            <option value="">Select</option>
            <option value="opd">OPD</option>
            <option value="insurance">Insurance</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="charge">Charge</label>
          <select
            id="charge"
            value={charge}
            onChange={(e) => setCharge(e.target.value)}
          >
            <option value="">Select</option>
            <option value="insurance-charge">Insurance Charge</option>
            <option value="service-charge">Service Charge</option>
          </select>
        </div>

        <button type="button" className="search-button">
          <span role="img" aria-label="search">🔍</span> Search
        </button>
      </form>

      {/* Table Section */}
      <div className="table-container">
        <input
          type="text"
          className="table-search"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        
        <table>
          <thead>
            <tr>
              <th>Checkup/IPD No</th>
              <th>Case ID</th>
              <th>Head</th>
              <th>TPA Name</th>
              <th>Patient Name</th>
              <th>Appointment Date</th>
              <th>Doctor</th>
              <th>Charge Name</th>
              <th>Charge Category</th>
              <th>Charge Type</th>
              <th>Standard Charge (₹)</th>
              <th>Applied Charge (₹)</th>
              <th>TPA Charge (₹)</th>
              <th>Tax (₹)</th>
              <th>Amount (₹)</th>
            </tr>
          </thead>
        
        </table>
      </div>

      {/* Conditionally render export buttons if all fields are filled */}
      {allFieldsFilled && (
        <div className="export-buttons">
          <button className="export-btn">Excel</button>
          <button className="export-btn">PDF</button>
          <button className="export-btn">CSV</button>
          <button className="export-btn">Print</button>
        </div>
      )}

      {/* Footer Section with Pagination */}
      <div className="footer">
        <p>Records: 0 to 1 of 1</p>
        <div className="pagination">
          <span>&lt;</span>
          <span>&gt;</span>
        </div>
      </div>
    </div>
  );
};

export default TPAReport;

