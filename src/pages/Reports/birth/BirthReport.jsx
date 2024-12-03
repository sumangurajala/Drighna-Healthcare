import React, { useState } from 'react';
import './birth.css';
import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';

const BirthReport = () => {
  const [timeDuration, setTimeDuration] = useState('');
  const [gender, setGender] = useState('');

  const handleSearch = () => {
    console.log("Searching with Time Duration:", timeDuration, "and Gender:", gender);
  };

  // Dummy data to simulate table data (replace this with real data)
  const tableData = [
    { referenceNo: 1, caseId: 'C1001', childName: 'Baby A', gender: 'Female', birthDate: '2023-10-01', weight: '3.2 kg', motherName: 'Alice', fatherName: 'Bob', report: 'Normal' },
    { referenceNo: 2, caseId: 'C1002', childName: 'Baby B', gender: 'Male', birthDate: '2023-10-02', weight: '3.5 kg', motherName: 'Clara', fatherName: 'David', report: 'Normal' },
    // Add more rows as needed
  ];

  const handleExportCSV = () => {
    const headers = ['Reference No', 'Case ID', 'Child Name', 'Gender', 'Birth Date', 'Weight', 'Mother Name', 'Father Name', 'Report'];
    const rows = tableData.map(row => [row.referenceNo, row.caseId, row.childName, row.gender, row.birthDate, row.weight, row.motherName, row.fatherName, row.report]);

    let csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "birth_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text("Birth Report", 20, 10);
    let yPosition = 20;

    // Adding headers
    const headers = ['Reference No', 'Case ID', 'Child Name', 'Gender', 'Birth Date', 'Weight', 'Mother Name', 'Father Name', 'Report'];
    headers.forEach((header, index) => {
      doc.text(header, 10 + index * 20, yPosition);
    });
    yPosition += 10;

    // Adding rows
    tableData.forEach(row => {
      const rowData = [row.referenceNo, row.caseId, row.childName, row.gender, row.birthDate, row.weight, row.motherName, row.fatherName, row.report];
      rowData.forEach((data, index) => {
        doc.text(data.toString(), 10 + index * 20, yPosition);
      });
      yPosition += 10;
    });

    doc.save("birth_report.pdf");
  };

  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(tableData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Birth Report");
    XLSX.writeFile(workbook, "birth_report.xlsx");
  };

  const handlePrint = () => {
    window.print();
  };

  // Condition to check if both fields are selected
  const areFieldsSelected = timeDuration && gender;

  return (
    <div className="container">
      <h1>Birth Report</h1>

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
            <option value="Today">Today</option>
            <option value="This Week">This Week</option>
            <option value="This Month">This Month</option>
          </select>
        </div>

        <div className="input-group">
          <label htmlFor="gender">Gender</label>
          <select
            id="gender"
            className="select"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <button className="search-button" onClick={handleSearch}>Search</button>
      </div>

      {/* Conditionally render import/export buttons */}
      {areFieldsSelected && (
        <div className="import-buttons">
          <button className="import-button" onClick={handleExportCSV}>Export to CSV</button>
          <button className="import-button" onClick={handleExportPDF}>Export to PDF</button>
          <button className="import-button" onClick={handleExportExcel}>Export to Excel</button>
          <button className="import-button" onClick={handlePrint}>Print</button>
        </div>
      )}

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Reference No</th>
              <th>Case ID</th>
              <th>Child Name</th>
              <th>Gender</th>
              <th>Birth Date</th>
              <th>Weight</th>
              <th>Mother Name</th>
              <th>Father Name</th>
              <th>Report</th>
            </tr>
          </thead>
          <tbody>
            {tableData.length > 0 ? (
              tableData.map((row, index) => (
                <tr key={index}>
                  <td>{row.referenceNo}</td>
                  <td>{row.caseId}</td>
                  <td>{row.childName}</td>
                  <td>{row.gender}</td>
                  <td>{row.birthDate}</td>
                  <td>{row.weight}</td>
                  <td>{row.motherName}</td>
                  <td>{row.fatherName}</td>
                  <td>{row.report}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="no-data">
                  No data available in table
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="add-record">
          <p>📁 Add new record or search with different criteria.</p>
        </div>
      </div>
    </div>
  );
};

export default BirthReport;

