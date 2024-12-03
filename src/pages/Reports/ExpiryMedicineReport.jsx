import React from 'react';

const ExpiryMedicineReport = () => {

   return(
  
  
      <div className="container">
        <h2>Expiry Medicine Report</h2>
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
            <label htmlFor="medicine-category">Medicine Category</label>
            <select id="medicine-category">
              <option>Select</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="supplier">Supplier</label>
            <select id="supplier">
              <option>Select Supplier</option>
            </select>
          </div>
          <button type="button" className="search-button">
            <span role="img" aria-label="search">
              🔍
            </span>{" "}
            Search
          </button>
        </form>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Medicine Name</th>
                <th>Batch No</th>
                <th>Company Name</th>
                <th>Medicine Category</th>
                <th>Medicine Group</th>
                <th>Supplier</th>
                <th>Expire Date</th>
                <th>Qty</th>
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

export default ExpiryMedicineReport;
