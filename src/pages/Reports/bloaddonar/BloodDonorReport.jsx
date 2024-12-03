import React from 'react';
import './bload .css';

const BloodDonorReport = () => {

    return (
      <div className="container">
        <h2>Blood Donor Report</h2>
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
                <th>Blood Group</th>
                <th>Bags</th>
                <th>Donor Name</th>
                <th>Age</th>
                <th>Donate Date</th>
                <th>Apply Charge (₹)</th>
                <th>Discount Percentage (%)</th>
                <th>Tax Percentage (%)</th>
                <th>Amount (₹)</th>
                <th>Paid Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="10" className="no-data">
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

export default BloodDonorReport;
