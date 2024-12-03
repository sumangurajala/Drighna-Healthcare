import React from 'react';
import './bloodisssue.css';

const BloodIssueReport = () => {
  
    return (
      <div className="container">
        <h2>Blood Issue Report</h2>
        <form className="filter-form">
          <div className="form-group">
            <label htmlFor="time-duration">
              Time Duration <span>*</span>
            </label>
            <select id="time-duration">
              <option>Select</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="blood-collect-by">Blood Collect By</label>
            <select id="blood-collect-by">
              <option>Select</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="amount-collect-by">Amount Collect By</label>
            <select id="amount-collect-by">
              <option>Select</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="blood-group">Blood Group</label>
            <select id="blood-group">
              <option>Select</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="blood-donor">Blood Donor</label>
            <select id="blood-donor">
              <option>Select</option>
            </select>
          </div>
          <button type="button" className="search-button">
            <span role="img" aria-label="search">🔍</span> Search
          </button>
        </form>
  
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Bill No</th>
                <th>Issue Date</th>
                <th>Received To</th>
                <th>Blood Group</th>
                <th>Gender</th>
                <th>Donor Name</th>
                <th>Bags</th>
                <th>Amount Collect By</th>
                <th>Blood Collect By</th>
                <th>Amount (₹)</th>
                <th>Paid Amount (₹)</th>
                <th>Balance Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="12" className="no-data">
                  No data available in table
                </td>
              </tr>
            </tbody>
          </table>
          <div className="add-record">
            <p>📄 Add new record or search with different criteria.</p>
          </div>
        </div>
        
        <div className="footer">
          <p>Records: 0 to 0 of 0</p>
        </div>
      </div>
    );

  
};

export default BloodIssueReport;
