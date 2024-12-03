import React, { useState } from 'react';

const PharmacyBillReport = () => {
  const [filters, setFilters] = useState({
    timeDuration: '',
    collectedBy: '',
    fromAge: '',
    toAge: '',
    gender: '',
    paymentMode: '',
  });

  const [data, setData] = useState([]); // Empty data to show "No data available"

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handleSearch = () => {
    setData([]); // Simulating empty data for no results
  };

  return (
    <div style={styles.container}>
      <h2>Pharmacy Bill Report</h2>

      {/* Filter Section */}
      <div style={styles.filterSection}>
        <div style={styles.filterRow}>
          <div style={styles.filterItem}>
            <label>Time Duration*</label>
            <select name="timeDuration" onChange={handleChange} value={filters.timeDuration}>
              <option value="">Select</option>
              {/* Add time duration options */}
            </select>
          </div>

          <div style={styles.filterItem}>
            <label>Collected By</label>
            <select name="collectedBy" onChange={handleChange} value={filters.collectedBy}>
              <option value="">Select</option>
              {/* Add collected by options */}
            </select>
          </div>

          <div style={styles.filterItem}>
            <label>From Age</label>
            <select name="fromAge" onChange={handleChange} value={filters.fromAge}>
              <option value="">Select</option>
              {/* Add from age options */}
            </select>
          </div>

          <div style={styles.filterItem}>
            <label>To Age</label>
            <select name="toAge" onChange={handleChange} value={filters.toAge}>
              <option value="">Select</option>
              {/* Add to age options */}
            </select>
          </div>

          <div style={styles.filterItem}>
            <label>Gender</label>
            <select name="gender" onChange={handleChange} value={filters.gender}>
              <option value="">Select</option>
              {/* Add gender options */}
            </select>
          </div>

          <div style={styles.filterItem}>
            <label>Payment Mode</label>
            <select name="paymentMode" onChange={handleChange} value={filters.paymentMode}>
              <option value="">Select</option>
              {/* Add payment mode options */}
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
              <th>Bill No</th>
              <th>Date</th>
              <th>Patient Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Prescription No</th>
              <th>Doctor Name</th>
              <th>Collected By</th>
              <th>Total (₹)</th>
              <th>Paid Amount (₹)</th>
              <th>Balance Amount (₹)</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan="11" style={styles.noData}>
                  No data available in table
                </td>
              </tr>
            ) : (
              data.map((item, index) => (
                <tr key={index}>
                  {/* Replace with actual item values */}
                  <td>{item.billNo}</td>
                  <td>{item.date}</td>
                  <td>{item.patientName}</td>
                  <td>{item.age}</td>
                  <td>{item.gender}</td>
                  <td>{item.prescriptionNo}</td>
                  <td>{item.doctorName}</td>
                  <td>{item.collectedBy}</td>
                  <td>{item.total}</td>
                  <td>{item.paidAmount}</td>
                  <td>{item.balanceAmount}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {data.length === 0 && (
          <div style={styles.noDataContainer}>
            <img src="path/to/your/image.png" alt="No data illustration" style={styles.noDataImage} />
            <p style={styles.addNewRecord}>Add new record or search with different criteria.</p>
          </div>
        )}
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
  noDataContainer: {
    textAlign: 'center',
    color: '#888',
    marginTop: '20px',
  },
  noDataImage: {
    width: '50px',
    height: '50px',
    marginBottom: '10px',
  },
  addNewRecord: {
    color: '#28a745',
    fontWeight: 'bold',
  },
};

export default PharmacyBillReport;

