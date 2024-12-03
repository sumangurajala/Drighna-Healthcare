import React, { useState } from 'react';
import './patient.css';
import * as XLSX from 'xlsx';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const PatientBillReport = () => {
  const [caseId, setCaseId] = useState('');
  const [showTable, setShowTable] = useState(false);
  const [isValid, setIsValid] = useState(true);

  // Sample data for the bill report
  const billData = [
    // Add records here if needed for testing
  ];

  const handleSearch = () => {
    if (caseId.trim() === '') {
      setIsValid(false);
      return;
    }
    setIsValid(true);
    setShowTable(true);
  };

  // Export functions
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(billData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'PatientBillReport');
    XLSX.writeFile(workbook, 'PatientBillReport.xlsx');
  };

  const exportToPDF = () => {
    const input = document.getElementById('report-content');
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 190;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
      pdf.save('PatientBillReport.pdf');
    });
  };

  return (
    <div className="container">
      <h2>Patient Bill Report</h2>
      <div className="search-section">
        <label>
          Case ID <span className="required">*</span>
        </label>
        <input
          type="text"
          placeholder="Case ID"
          value={caseId}
          onChange={(e) => setCaseId(e.target.value)}
          className={!isValid ? 'error' : ''}
        />
        <button onClick={handleSearch} className="search-button">Search</button>
        {!isValid && <span className="validation-error">The Case ID field is required.</span>}
      </div>

      {showTable && (
        <div id="report-content">
          <div className="section-header">
            <div className="button-container">
              <button onClick={exportToPDF}>Export to PDF</button>
              <button onClick={exportToExcel}>Export to Excel</button>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th>Module</th>
                <th>OPD No</th>
                <th>IPD No</th>
                <th>Bill No</th>
                <th>Payment Mode</th>
                <th>Payment Date</th>
                <th>Payment Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              {billData.length > 0 ? (
                billData.map((data, index) => (
                  <tr key={index}>
                    <td>{data.module}</td>
                    <td>{data.opdNo}</td>
                    <td>{data.ipdNo}</td>
                    <td>{data.billNo}</td>
                    <td>{data.paymentMode}</td>
                    <td>{data.paymentDate}</td>
                    <td>{data.paymentAmount}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">No bill data available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PatientBillReport;
