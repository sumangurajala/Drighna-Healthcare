import React, { useState } from 'react';
import './payrollreort.css';
import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';

const PayrollReport = () => {
  const [timeDuration, setTimeDuration] = useState('');
  const [showTable, setShowTable] = useState(false);

  const handleSearch = () => {
    if (timeDuration) {
      setShowTable(true); // Display the table when "Search" is clicked and Time Duration is selected
    } else {
      alert("Please select a Time Duration");
    }
  };

  // Dummy data for the table
  const tableData = []; // Empty data to show "No data available" message

  // Export functions for CSV, PDF, and Excel
  const handleExportCSV = () => {
    const headers = ['Name', 'Role', 'Designation', 'Month', 'Year', 'Payment Date', 'Payslip #', 'Basic Salary (₹)', 'Earning (₹)', 'Deduction (₹)', 'Gross Salary (₹)', 'Tax (₹)', 'Net Salary (₹)'];
    const rows = tableData.map(row => [
      row.name, row.role, row.designation, row.month, row.year, row.paymentDate, row.payslipNo, row.basicSalary, row.earning, row.deduction, row.grossSalary, row.tax, row.netSalary,
    ]);

    let csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "payroll_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text("Payroll Report", 20, 10);
    doc.save("payroll_report.pdf");
  };

  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(tableData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Payroll Report");
    XLSX.writeFile(workbook, "payroll_report.xlsx");
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="container">
      <h1>Payroll Report</h1>

      <div className="form-group">
        <div className="input-group">
          <label htmlFor="timeDuration">Time Duration <span className="required">*</span></label>
          <select
            id="timeDuration"
            className="select"
            value={timeDuration}
            onChange={(e) => setTimeDuration(e.target.value)}
          >
            <option value="">Select</option>
            <option value="This Month">This Month</option>
            <option value="Last Month">Last Month</option>
            <option value="This Year">This Year</option>
          </select>
          {!timeDuration && <span className="error-message">The Time Duration field is required.</span>}
        </div>

        <button className="search-button" onClick={handleSearch}>Search</button>
      </div>

      {/* Conditionally render import/export buttons */}
      {timeDuration && (
        <div className="import-buttons">
          <button className="import-button" onClick={handleExportCSV}>Export to CSV</button>
          <button className="import-button" onClick={handleExportPDF}>Export to PDF</button>
          <button className="import-button" onClick={handleExportExcel}>Export to Excel</button>
          <button className="import-button" onClick={handlePrint}>Print</button>
        </div>
      )}

      {showTable && (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Designation</th>
                <th>Month</th>
                <th>Year</th>
                <th>Payment Date</th>
                <th>Payslip #</th>
                <th>Basic Salary (₹)</th>
                <th>Earning (₹)</th>
                <th>Deduction (₹)</th>
                <th>Gross Salary (₹)</th>
                <th>Tax (₹)</th>
                <th>Net Salary (₹)</th>
              </tr>
            </thead>
            <tbody>
              {tableData.length > 0 ? (
                tableData.map((row, index) => (
                  <tr key={index}>
                    <td>{row.name}</td>
                    <td>{row.role}</td>
                    <td>{row.designation}</td>
                    <td>{row.month}</td>
                    <td>{row.year}</td>
                    <td>{row.paymentDate}</td>
                    <td>{row.payslipNo}</td>
                    <td>{row.basicSalary}</td>
                    <td>{row.earning}</td>
                    <td>{row.deduction}</td>
                    <td>{row.grossSalary}</td>
                    <td>{row.tax}</td>
                    <td>{row.netSalary}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="13" className="no-data">
                    No data available in table
                    <div className="add-record">
                      <p>📁 Add new record or search with different criteria.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PayrollReport;
