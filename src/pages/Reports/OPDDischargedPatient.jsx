
import React, { useState } from 'react';

const OPDDischargedpointReport = () => {
  // State to store the selected filters and data
  const [filters, setFilters] = useState({
    timeDuration: '',
    fromAge: '',
    toAge: '',
    gender: '',
    discharged: '',
  });
  
  const [data, setData] = useState([]); // Empty array to simulate no data

  // Handle change in filter inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  // Handle search button click
  const handleSearch = () => {
    // Logic to fetch data based on filters
    // Here, we'll simulate empty data
    setData([]);
  };

  return (
    <div style={styles.container}>
      <h2>OPD Balance Report</h2>
      
      {/* Filter Section */}
      <div style={styles.filterSection}>
        <div style={styles.filterRow}>
          <div style={styles.filterItem}>
            <label>Time Duration*</label>
            <select name="timeDuration" onChange={handleChange} value={filters.timeDuration}>
              <option value="">Select</option>
              {/* Add options here */}
            </select>
          </div>

          <div style={styles.filterItem}>
            <label>From Age</label>
            <select name="fromAge" onChange={handleChange} value={filters.fromAge}>
              <option value="">Select</option>
              {/* Add options here */}
            </select>
          </div>

          <div style={styles.filterItem}>
            <label>To Age</label>
            <select name="toAge" onChange={handleChange} value={filters.toAge}>
              <option value="">Select</option>
              {/* Add options here */}
            </select>
          </div>

          <div style={styles.filterItem}>
            <label>Gender</label>
            <select name="gender" onChange={handleChange} value={filters.gender}>
              <option value="">Select</option>
              {/* Add options here */}
            </select>
          </div>

          <div style={styles.filterItem}>
            <label>Discharged</label>
            <select name="discharged" onChange={handleChange} value={filters.discharged}>
              <option value="">Select</option>
              {/* Add options here */}
            </select>
          </div>
        </div>

        <button style={styles.searchButton} onClick={handleSearch}>Search</button>
      </div>

      {/* Data Table Section */}
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>OPD No</th>
              <th>Patient Name</th>
              <th>Case ID</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Mobile Number</th>
              <th>Discharged</th>
              <th>Net Amount (₹)</th>
              <th>Paid Amount (₹)</th>
              <th>Balance Amount (₹)</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan="10" style={styles.noData}>No data available in table</td>
              </tr>
            ) : (
              data.map((item, index) => (
                <tr key={index}>
                  {/* Replace with item values */}
                  <td>{item.opdNo}</td>
                  <td>{item.patientName}</td>
                  <td>{item.caseId}</td>
                  <td>{item.age}</td>
                  <td>{item.gender}</td>
                  <td>{item.mobile}</td>
                  <td>{item.discharged}</td>
                  <td>{item.netAmount}</td>
                  <td>{item.paidAmount}</td>
                  <td>{item.balanceAmount}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: '90%',
    maxWidth: '1000px',
    margin: '20px auto',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  },
  filterSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  filterRow: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
  },
  filterItem: {
    flex: '1 1 150px',
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  },
  searchButton: {
    alignSelf: 'flex-start',
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px',
  },
  tableContainer: {
    marginTop: '20px',
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  noData: {
    textAlign: 'center',
    color: '#888',
    padding: '20px',
  },
  th: {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '10px',
    textAlign: 'left',
  },
  td: {
    padding: '10px',
    borderBottom: '1px solid #ddd',
  },
};

export default OPDDischargedpointReport;