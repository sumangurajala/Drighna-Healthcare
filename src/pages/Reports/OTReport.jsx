import React from 'react';

const OTReport = () => {
  
    return (
      <div className="container">
        <h2>OT Report</h2>
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
            <label htmlFor="consultant-doctor">Consultant Doctor</label>
            <select id="consultant-doctor">
              <option>Select</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="operation-category">Operation Category</label>
            <select id="operation-category">
              <option>Select</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="operation-name">Operation Name</label>
            <select id="operation-name">
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
                <th>Date</th>
                <th>Reference No</th>
                <th>OPD No</th>
                <th>IPD No</th>
                <th>Consultant Doctor</th>
                <th>Assistant Consultant1</th>
                <th>Operation Name</th>
                <th>Operation Category</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="9" className="no-data">
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

export default OTReport;
