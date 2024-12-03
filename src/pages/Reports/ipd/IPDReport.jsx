import React, { useState } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';


const IPDReport = () => {
  const [filters, setFilters] = useState({
    timeDuration: '',
    doctor: '',
    fromAge: '',
    toAge: '',
    gender: '',
    symptoms: '',
    findings: '',
    ipdNo: '',          // New filter for opd_no
    Age:'',
    Gender:'',  // New filter for opd_checkup_id
    patientName: '',    // New filter for patient_name
    mobileNumber: '',   // New filter for mobile_number
    guardianName: '',
    DoctorName:'',
    Symptoms :'',
    Findings:'',
  });

  const [data, setData] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handleSearch = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/reportipd/opd-details', filters);
      console.log(response.data); // Check what the API returns
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };
  
 
  const handleSearchs = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/ipdget');
      if (response.status === 200) {
        setData(response.data); // Set the fetched data in the state
      } else {
        console.error('Unexpected response:', response.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error.message);
      if (error.response) {
        console.error('Response:', error.response.data);
      }
    }
  };
  
  
  const handleExportCSV = () => {
    const headers = ['Date', 'IPD No', 'Patient Name', 'Age', 'Gender', 'Mobile Number', 'Guardian Name', 'Doctor Name', 'Symptoms', 'Findings'];
    const rows = data.map(item => [
      item.date,
      item.opdNo,
      item.patientName,
      item.age,
      item.gender,
      item.mobile,
      item.guardianName,
      item.doctorName,
      item.symptoms,
      item.findings,
    ]);
  
    const csvContent = [headers, ...rows]
      .map(row => row.join(','))
      .join('\n');
  
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'IPD_Report.csv';
    link.click();
  };
  
  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'IPD Report');
    XLSX.writeFile(workbook, 'IPD_Report.xlsx');
  };


const handleExportPDF = () => {
  const doc = new jsPDF();
  const headers = [['Date', 'IPD No', 'Patient Name', 'Age', 'Gender', 'Mobile Number', 'Guardian Name', 'Doctor Name', 'Symptoms', 'Findings']];
  const rows = data.map(item => [
    item.date,
    item.opdNo,
    item.patientName,
    item.age,
    item.gender,
    item.mobile,
    item.guardianName,
    item.doctorName,
    item.symptoms,
    item.findings,
  ]);

  doc.autoTable({
    head: headers,
    body: rows,
  });

  doc.save('IPD_Report.pdf');
};

const handlePrint = () => {
    window.print(); // Prints the entire page
  };
  

  
  return (
    <div style={styles.container}>
      <h2>OPD Report</h2>

      {/* Filter Section */}
      <div style={styles.filterSection}>
        {/* ... (same as before) */}
        <div style={styles.filterSection}>
        <div style={styles.filterRow}>
          <div style={styles.filterItem}>
            <label>Time Duration*</label>
            <select name="timeDuration" onChange={handleChange} value={filters.timeDuration}>
              <option value="">Select</option>
              <option value="Today">Today</option>
              <option value="ThisWee">ThisWeek</option>
              <option value="LastWeek">LastWeek</option>
              <option value="This month<">This month</option>
              <option value="Last month">Last month</option>
              {/* Add options here */}
            </select>
          </div>

          <div style={styles.filterItem}>
            <label>Doctor</label>
            <select name="doctor" onChange={handleChange} value={filters.doctor}>
              <option value="Select">Select</option>
              <option value="Rinki">Rinki</option>
              <option value="Pallavi">Pallavi</option>
              {/* Add options here */}
            </select>
          </div>

          <div style={styles.filterItem}>
            <label>From Age</label>
            <select name="fromAge" onChange={handleChange} value={filters.fromAge}>
              <option value="">Select</option>
              <option value="0">0</option>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
              
              
              
              
              
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
        </div>

        <div style={styles.filterRow}>
          <div style={styles.filterItem}>
            <label>Gender</label>
            <select name="gender" onChange={handleChange} value={filters.gender}>
              <option value="">Select</option>
              <option value="male">male</option>
              <option value="Female">Female</option>
              {/* Add options here */}
            </select>
          </div>

          <div style={styles.filterItem}>
            <label>Symptoms</label>
            <select name="symptoms" onChange={handleChange} value={filters.symptoms}>
              <option value="">Select</option>
              <option value="Eating and Weight Problems">Eating and Weight Problems</option>
             </select>
          </div>

          <div style={styles.filterItem}>
            <label>Findings</label>
            <select name="findings" onChange={handleChange} value={filters.findings}>
              <option value="">Select</option>
              <option value="Feaver">Feaver</option>
              <option value="Typhidot">Typhidot</option>
              {/* Add options here */}
            </select>
          </div>
        </div>

        <button style={styles.searchButton} onClick={handleSearch}>Search</button>
      </div>
        <button style={styles.saveButton} onClick={handleSearchs}>Save</button>
      </div>

      <div style={styles.buttonContainer}>
  <button style={styles.button} onClick={handleExportCSV}>Export to CSV</button>
  <button style={styles.button} onClick={handleExportExcel}>Export to Excel</button>
  <button style={styles.button} onClick={handleExportPDF}>Export to PDF</button>
  <button style={styles.button} onClick={handlePrint}>Print</button>
</div>


      {/* Data Table Section */}
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Date</th>
              <th>IPD No</th>
              <th>Patient Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Mobile Number</th>
              <th>Guardian Name</th>
              <th>Doctor Name</th>
              <th>Symptoms</th>
              <th>Findings</th>
            </tr>
          </thead>
          <tbody>
  {Array.isArray(data) && data.length > 0 ? (
    data.map((item, index) => (
      <tr key={index}>
        <td>{item.date}</td>
        <td>{item.opdNo}</td>
        <td>{item.patientName}</td>
        <td>{item.age}</td>
        <td>{item.gender}</td>
        <td>{item.mobile}</td>
        <td>{item.guardianName}</td>
        <td>{item.doctorName}</td>
        <td>{item.symptoms}</td>
        <td>{item.findings}</td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="11" style={styles.noData}>No data available in table</td>
    </tr>
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
 
    button: {
      padding: '10px 20px',
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      margin: '5px',
    },
  
};

export default IPDReport;