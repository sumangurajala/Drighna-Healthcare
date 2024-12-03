import React, { useState } from 'react';

const IPDDischargedPatientReport = () => {
  // State to store the selected filters and data
  const [filters, setFilters] = useState({
    timeDuration: '',
    fromAge: '',
    toAge: '',
    gender: '',
    dischargeStatus: '',
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
      <h2>IPD Discharged Patient Report</h2>
      
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
            <label>Doctor</label>
            <select name="doctor" onChange={handleChange} value={filters.doctor}>
              <option value="">Select</option>
              {/* Add doctor options here */}
            </select>
          </div>

          <div style={styles.filterItem}>
            <label>From Age</label>
            <select name="fromAge" onChange={handleChange} value={filters.fromAge}>
              <option value="">Select</option>
              {/* Add age options here */}
            </select>
          </div>

          <div style={styles.filterItem}>
            <label>To Age</label>
            <select name="toAge" onChange={handleChange} value={filters.toAge}>
              <option value="">Select</option>
              {/* Add age options here */}
            </select>
          </div>

          <div style={styles.filterItem}>
            <label>Gender</label>
            <select name="gender" onChange={handleChange} value={filters.gender}>
              <option value="">Select</option>
              {/* Add gender options here */}
            </select>
          </div>

          <div style={styles.filterItem}>
            <label>Discharge Status</label>
            <select name="dischargeStatus" onChange={handleChange} value={filters.dischargeStatus}>
              <option value="">Select</option>
              {/* Add discharge status options here */}
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
              <th>Patient Name</th>
              <th>IPD No</th>
              <th>Case ID</th>
              <th>Gender</th>
              <th>Phone</th>
              <th>Consultant</th>
              <th>Bed</th>
              <th>Admission Date</th>
              <th>Discharged Date</th>
              <th>Discharge Status</th>
              <th>Total Admit Days</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan="11" style={styles.noData}>No data available in table</td>
              </tr>
            ) : (
              data.map((item, index) => (
                <tr key={index}>
                  {/* Replace with actual item values */}
                  <td>{item.patientName}</td>
                  <td>{item.ipdNo}</td>
                  <td>{item.caseId}</td>
                  <td>{item.gender}</td>
                  <td>{item.phone}</td>
                  <td>{item.consultant}</td>
                  <td>{item.bed}</td>
                  <td>{item.admissionDate}</td>
                  <td>{item.dischargedDate}</td>
                  <td>{item.dischargeStatus}</td>
                  <td>{item.totalAdmitDays}</td>
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

export default IPDDischargedPatientReport;
