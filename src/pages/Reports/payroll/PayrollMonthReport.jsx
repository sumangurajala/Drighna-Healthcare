import React, { useState } from 'react';
import './payroll.css';
import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';

const PayrollMonthReport = () => {
  const [role, setRole] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('2024'); // Default year as per the image
  const [showTable, setShowTable] = useState(false); // Controls table display

  const handleSearch = () => {
    console.log("Searching with Role:", role, "Month:", month, "Year:", year);
    setShowTable(true); // Display the table when "Search" is clicked
  };

  // Dummy data for table display
  const tableData = [
    {
      name: 'John Doe',
      role: 'Engineer',
      designation: 'Software Engineer',
      monthYear: `${month} - ${year}`,
      payslipNo: 'PS12345',
      basicSalary: '50000',
      earning: '7000',
      deduction: '3000',
      grossSalary: '57000',
      tax: '2000',
      netSalary: '55000',
    },
    {
      name: 'Jane Smith',
      role: 'Manager',
      designation: 'Project Manager',
      monthYear: `${month} - ${year}`,
      payslipNo: 'PS12346',
      basicSalary: '80000',
      earning: '10000',
      deduction: '5000',
      grossSalary: '90000',
      tax: '3000',
      netSalary: '87000',
    },
    // Add more rows as needed
  ];

  // Check if all fields are selected
  const areFieldsSelected = role && month && year;

  const handleExportCSV = () => {
    const headers = ['Name', 'Role', 'Designation', 'Month - Year', 'Payslip #', 'Basic Salary (₹)', 'Earning (₹)', 'Deduction (₹)', 'Gross Salary (₹)', 'Tax (₹)', 'Net Salary (₹)'];
    const rows = tableData.map(row => [
      row.name, row.role, row.designation, row.monthYear, row.payslipNo, row.basicSalary, row.earning, row.deduction, row.grossSalary, row.tax, row.netSalary,
    ]);

    let csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "payroll_month_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text("Payroll Month Report", 20, 10);
    let yPosition = 20;

    // Adding headers
    const headers = ['Name', 'Role', 'Designation', 'Month - Year', 'Payslip #', 'Basic Salary (₹)', 'Earning (₹)', 'Deduction (₹)', 'Gross Salary (₹)', 'Tax (₹)', 'Net Salary (₹)'];
    headers.forEach((header, index) => {
      doc.text(header, 10 + index * 25, yPosition);
    });
    yPosition += 10;

    // Adding rows
    tableData.forEach(row => {
      const rowData = [row.name, row.role, row.designation, row.monthYear, row.payslipNo, row.basicSalary, row.earning, row.deduction, row.grossSalary, row.tax, row.netSalary];
      rowData.forEach((data, index) => {
        doc.text(data.toString(), 10 + index * 25, yPosition);
      });
      yPosition += 10;
    });

    doc.save("payroll_month_report.pdf");
  };

  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(tableData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Payroll Month Report");
    XLSX.writeFile(workbook, "payroll_month_report.xlsx");
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="container">
      <h1>Payroll Month Report</h1>

      <div className="form-group">
        <div className="input-group">
          <label htmlFor="role">Role</label>
          <select
            id="role"
            className="select"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="">Select</option>
            <option value="Manager">Manager</option>
            <option value="Engineer">Engineer</option>
            <option value="Accountant">Accountant</option>
          </select>
        </div>

        <div className="input-group">
          <label htmlFor="month">Month</label>
          <select
            id="month"
            className="select"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          >
            <option value="">Select</option>
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
            <option value="November">November</option>
            <option value="December">December</option>
          </select>
        </div>

        <div className="input-group">
          <label htmlFor="year">Year <span className="required">*</span></label>
          <select
            id="year"
            className="select"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          >
            <option value="">Select</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
          </select>
        </div>

        <button className="search-button" onClick={handleSearch}>Search</button>
      </div>

      {/* Conditionally render import/export buttons and table */}
      {areFieldsSelected && (
        <div className="import-buttons">
          <button className="import-button" onClick={handleExportCSV}>Export to CSV</button>
          <button className="import-button" onClick={handleExportPDF}>Export to PDF</button>
          <button className="import-button" onClick={handleExportExcel}>Export to Excel</button>
          <button className="import-button" onClick={handlePrint}>Print</button>
        </div>
      )}

      {showTable && (
        <div className="table-container">
          <input type="text" placeholder="Search..." className="search-input" />
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Designation</th>
                <th>Month - Year</th>
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
              {tableData.map((row, index) => (
                <tr key={index}>
                  <td>{row.name}</td>
                  <td>{row.role}</td>
                  <td>{row.designation}</td>
                  <td>{row.monthYear}</td>
                  <td>{row.payslipNo}</td>
                  <td>{row.basicSalary}</td>
                  <td>{row.earning}</td>
                  <td>{row.deduction}</td>
                  <td>{row.grossSalary}</td>
                  <td>{row.tax}</td>
                  <td>{row.netSalary}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PayrollMonthReport;
