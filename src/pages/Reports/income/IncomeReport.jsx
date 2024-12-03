import React, { useState } from 'react';
import "./Income.css";

const IncomeReport = () => {
  const [timeDuration, setTimeDuration] = useState("");

  return (
    <div className="container">
      <h2>Income Report</h2>

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

        <button type="button" className="search-button">
          <span role="img" aria-label="search">🔍</span> Search
        </button>
      </form>

      {/* Table Section */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Invoice Number</th>
              <th>Income Head</th>
              <th>Date</th>
              <th>Amount (₹)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="5" className="no-data">
                No data available in table
              </td>
            </tr>
          </tbody>
        </table>

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

export default IncomeReport;
