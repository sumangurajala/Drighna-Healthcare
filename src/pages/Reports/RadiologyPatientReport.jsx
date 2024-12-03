import React from 'react';

const RadiologyPatientReport = () => {
  
    return (
      <div className="container">
        <h2>Radiology Patient Report</h2>
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
            <label htmlFor="sample-collected-person-name">Sample Collected Person Name</label>
            <select id="sample-collected-person-name">
              <option>Select</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="category-name">Category Name</label>
            <select id="category-name">
              <option>Select</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="test-name">Test Name</label>
            <select id="test-name">
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
                <th>Date</th>
                <th>Patient Name</th>
                <th>Category Name</th>
                <th>Test Name</th>
                <th>Description</th>
                <th>Consultant Doctor</th>
                <th>Sample Collected Person Name</th>
                <th>Amount (₹)</th>
                <th>Paid Amount (₹)</th>
                <th>Balance Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="11" className="no-data">
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

export default RadiologyPatientReport;
