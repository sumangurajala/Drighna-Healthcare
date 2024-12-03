import React, { useState } from 'react';
import './death.css';
import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';

const DeathReport = () => {
  const [timeDuration, setTimeDuration] = useState('');
  const [gender, setGender] = useState('');

  const handleSearch = () => {
    console.log("Searching with Time Duration:", timeDuration, "and Gender:", gender);
  };

  // Dummy data to simulate table data (replace this with real data)
  const tableData = [
    { referenceNo: 1, caseId: 'D1001', guardianName: 'Alice', deathDate: '2023-10-01', patientName: 'Patient A', gender: 'Female', report: 'Cardiac Arrest' },
    { referenceNo: 2, caseId: 'D1002', guardianName: 'Bob', deathDate: '2023-10-02', patientName: 'Patient B', gender: 'Male', report: 'Respiratory Failure' },
    // Add more rows as needed
  ];

  const handleExportCSV = () => {
    const headers = ['Reference No', 'Case ID', 'Guardian Name', 'Death Date', 'Patient Name', 'Gender', 'Report'];
    const rows = tableData.map(row => [row.referenceNo, row.caseId, row.guardianName, row.deathDate, row.patientName, row.gender, row.report]);

    let csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "death_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text("Death Report", 20, 10);
    let yPosition = 20;

    // Adding headers
    const headers = ['Reference No', 'Case ID', 'Guardian Name', 'Death Date', 'Patient Name', 'Gender', 'Report'];
    headers.forEach((header, index) => {
      doc.text(header, 10 + index * 25, yPosition);
    });
    yPosition += 10;

    // Adding rows
    tableData.forEach(row => {
      const rowData = [row.referenceNo, row.caseId, row.guardianName, row.deathDate, row.patientName, row.gender, row.report];
      rowData.forEach((data, index) => {
        doc.text(data.toString(), 10 + index * 25, yPosition);
      });
      yPosition += 10;
    });

    doc.save("death_report.pdf");
  };

  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(tableData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Death Report");
    XLSX.writeFile(workbook, "death_report.xlsx");
  };

  const handlePrint = () => {
    window.print();
  };

  // Condition to check if both fields are selected
  const areFieldsSelected = timeDuration && gender;

  return (
    <div className="container">
      <h1>Death Report</h1>

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
              <th>Guardian Name</th>
              <th>Death Date</th>
              <th>Patient Name</th>
              <th>Gender</th>
              <th>Report</th>
            </tr>
          </thead>
          <tbody>
            {tableData.length > 0 ? (
              tableData.map((row, index) => (
                <tr key={index}>
                  <td>{row.referenceNo}</td>
                  <td>{row.caseId}</td>
                  <td>{row.guardianName}</td>
                  <td>{row.deathDate}</td>
                  <td>{row.patientName}</td>
                  <td>{row.gender}</td>
                  <td>{row.report}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="no-data">
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

export default DeathReport;

