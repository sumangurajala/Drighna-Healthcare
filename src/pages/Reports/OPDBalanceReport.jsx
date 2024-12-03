import React, { useState } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver'; // For saving files (CSV, Excel)
import jsPDF from 'jspdf'; // For PDF export
import 'jspdf-autotable'; // Ensure you import the autoTable plugin for jsPDF
import * as XLSX from 'xlsx'; 

const OPDBalanceReport = () => {
  const [filters, setFilters] = useState({
    timeDuration: '',
    fromAge: '',
    toAge: '',
    gender: '',
    discharged: '',
  });

  const [data, setData] = useState([]); // Ensure data is initialized as an array


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handleSearch = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/opdbalance/id', filters);
      if (Array.isArray(response.data)) {
        setData(response.data); // Ensure data is an array
      } else {
        setData([]); // Fallback to empty array if response is not an array
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setData([]); // Fallback to empty array on error
    }
  };
  const handleSearchs = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/opdbalanceget', filters);
      if (Array.isArray(response.data)) {
        setData(response.data); // Ensure data is an array
      } else {
        setData([]); // Fallback to empty array if response is not an array
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setData([]); // Fallback to empty array on error
    }
  };


  // PDF export functionality
  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({ html: '#data-table' });
    doc.save('OPD_Balance_Report.pdf');
  };

  // Excel export functionality
  const handleExportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'OPD Report');
    const excelFile = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    saveAs(new Blob([excelFile]), 'OPD_Balance_Report.xlsx');
  };

  // Normal CSV export functionality (plain text format)
  const handleExportCSV = () => {
    const headers = ['OPD No', 'Patient Name', 'Case ID', 'Age', 'Gender', 'Mobile Number', 'Discharged', 'Net Amount (₹)', 'Paid Amount (₹)', 'Balance Amount (₹)'];
    const rows = data.map(item => [
      item.opdNo,
      item.patientName,
      item.caseId,
      item.age,
      item.gender,
      item.mobile,
      item.discharged,
      item.netAmount,
      item.paidAmount,
      item.balanceAmount
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    saveAs(blob, 'OPD_Balance_Report.csv');
  };

  // Copy table data to clipboard
  const handleCopy = () => {
    const tableText = data
      .map(item => `${item.opdNo}, ${item.patientName}, ${item.caseId}, ${item.age}, ${item.gender}, ${item.mobile}, ${item.discharged}, ${item.netAmount}, ${item.paidAmount}, ${item.balanceAmount}`)
      .join('\n');
    navigator.clipboard.writeText(tableText).then(() => {
      alert('Data copied to clipboard!');
    }, (error) => {
      alert('Failed to copy data: ', error);
    });
  };



 // Normal Print functionality (using window.print)
 const handlePrint = () => {
  // Temporarily create a new print-friendly window
  const printWindow = window.open('', '', 'height=600,width=800');
  printWindow.document.write('<html><head><title>OPD Balance Report</title>');
  printWindow.document.write('<style>body { font-family: Arial, sans-serif; margin: 20px; }</style>'); // Optional styles
  printWindow.document.write('</head><body>');
  
  // Copy the content of the component to the print window
  printWindow.document.write('<h2>OPD Balance Report</h2>');
  printWindow.document.write('<table border="1" cellspacing="0" cellpadding="5"><thead><tr><th>OPD No</th><th>Patient Name</th><th>Case ID</th><th>Age</th><th>Gender</th><th>Mobile</th><th>Discharged</th><th>Net Amount</th><th>Paid Amount</th><th>Balance Amount</th></tr></thead><tbody>');
  
  // Iterate over the data and create table rows
  data.forEach(item => {
    printWindow.document.write(`<tr>
      <td>${item.opdNo}</td>
      <td>${item.patientName}</td>
      <td>${item.caseId}</td>
      <td>${item.age}</td>
      <td>${item.gender}</td>
      <td>${item.mobile}</td>
      <td>${item.discharged}</td>
      <td>${item.netAmount}</td>
      <td>${item.paidAmount}</td>
      <td>${item.balanceAmount}</td>
    </tr>`);
  });

  printWindow.document.write('</tbody></table>');
  printWindow.document.write('</body></html>');
  
  // Once content is written, call the print function
  printWindow.document.close(); // Necessary for IE <= 10
  printWindow.print(); // Open print dialog
};
  

  return (
    <div style={styles.container}>
      <h2>OPD Balance Report</h2>
      <div style={styles.filterSection}>
        <div style={styles.filterRow}>
          <div style={styles.filterItem}>
            <label>Time Duration*</label>
            <select name="timeDuration" onChange={handleChange} value={filters.timeDuration}>
              <option value="">Select</option>
              <option value="lastWeek">Last Week</option>
              <option value="lastMonth">Last Month</option>
            </select>
          </div>
          <div style={styles.filterItem}>
            <label>From Age</label>
            <select name="fromAge" onChange={handleChange} value={filters.fromAge}>
              <option value="">Select</option>
              <option value="0">0</option>
              <option value="10">10</option>
            </select>
          </div>
          <div style={styles.filterItem}>
            <label>To Age</label>
            <select name="toAge" onChange={handleChange} value={filters.toAge}>
              <option value="">Select</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>
          <div style={styles.filterItem}>
            <label>Gender</label>
            <select name="gender" onChange={handleChange} value={filters.gender}>
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div style={styles.filterItem}>
            <label>Discharged</label>
            <select name="discharged" onChange={handleChange} value={filters.discharged}>
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
        </div>
        <button style={styles.searchButton} onClick={handleSearch}>Search</button>
        <button style={styles.saveButton} onClick={handleSearchs}>Search</button>
      </div>

      {/* Export Buttons */}
      <button onClick={handlePrint}>Print</button>
      <button onClick={handleExportPDF}>Export PDF</button>
      <button onClick={handleExportExcel}>Export Excel</button>
      <button onClick={handleExportCSV}>Export CSV</button>
      <button onClick={handleCopy}>Copy to Clipboard</button>

      
     
        {/* Render table and filters here */}
        <table id="data-table">
          <thead>
            <tr>
              <th>OPD No</th>
              <th>Patient Name</th>
              <th>Case ID</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Mobile</th>
              <th>Discharged</th>
              <th>Net Amount</th>
              <th>Paid Amount</th>
              <th>Balance Amount</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
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
            ))}
          </tbody>
        </table>
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

export default OPDBalanceReport;




