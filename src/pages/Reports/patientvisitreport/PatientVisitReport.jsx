import React, { useState } from 'react';
import './patientvisit.css';
import * as XLSX from 'xlsx';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const PatientVisitReport = () => {
  const [patientId, setPatientId] = useState('');
  const [showTables, setShowTables] = useState(false);
  const [isValid, setIsValid] = useState(true);

  // Sample data for the report
  const opdData = [
    // Add OPD records if needed
  ];

  const ipdData = [
    // Add IPD records if needed
  ];

  const pharmacyData = [
    // Add Pharmacy records if needed
  ];

  const handleSearch = () => {
    if (patientId.trim() === '') {
      setIsValid(false);
      return;
    }
    setIsValid(true);
    setShowTables(true);
  };

  // Export functions
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet([...opdData, ...ipdData, ...pharmacyData]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'PatientVisitReport');
    XLSX.writeFile(workbook, 'PatientVisitReport.xlsx');
  };

  const exportToPDF = () => {
    const input = document.getElementById('report-content');
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 190;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
      pdf.save('PatientVisitReport.pdf');
    });
  };

  return (
    <div className="container">
      <h2>Patient Visit Report</h2>
      <div className="search-section">
        <label>
          Patient ID <span className="required">*</span>
        </label>
        <input
          type="text"
          placeholder="Patient ID"
          value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
          className={!isValid ? 'error' : ''}
        />
        <button onClick={handleSearch} className="search-button">Search</button>
        {!isValid && <span className="validation-error">The Patient ID field is required.</span>}
      </div>

      {showTables && (
        <div id="report-content">
          <div className="section-header">
            <h3>OPD Details</h3>
            <div className="button-container">
              <button onClick={exportToExcel}>Export to Excel</button>
              <button onClick={exportToPDF}>Export to PDF</button>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th>OPD No</th>
                <th>Case ID</th>
                <th>Date</th>
                <th>OPD Checkup ID</th>
                <th>Doctor Name</th>
                <th>Symptoms</th>
                <th>Findings</th>
              </tr>
            </thead>
            <tbody>
              {opdData.length > 0 ? (
                opdData.map((data, index) => (
                  <tr key={index}>
                    <td>{data.opdNo}</td>
                    <td>{data.caseId}</td>
                    <td>{data.date}</td>
                    <td>{data.checkupId}</td>
                    <td>{data.doctorName}</td>
                    <td>{data.symptoms}</td>
                    <td>{data.findings}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">No OPD data available</td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="section-header">
            <h3>IPD Details</h3>
          </div>
          <table>
            <thead>
              <tr>
                <th>IPD No</th>
                <th>Case ID</th>
                <th>Date</th>
                <th>Doctor Name</th>
                <th>Symptoms</th>
                <th>Findings</th>
              </tr>
            </thead>
            <tbody>
              {ipdData.length > 0 ? (
                ipdData.map((data, index) => (
                  <tr key={index}>
                    <td>{data.ipdNo}</td>
                    <td>{data.caseId}</td>
                    <td>{data.date}</td>
                    <td>{data.doctorName}</td>
                    <td>{data.symptoms}</td>
                    <td>{data.findings}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No IPD data available</td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="section-header">
            <h3>Pharmacy Details</h3>
          </div>
          <table>
            <thead>
              <tr>
                <th>Bill No</th>
                <th>Case ID</th>
                <th>Date</th>
                <th>Discount (₹)</th>
                <th>Amount (₹)</th>
                <th>Paid Amount (₹)</th>
                <th>Balance Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              {pharmacyData.length > 0 ? (
                pharmacyData.map((data, index) => (
                  <tr key={index}>
                    <td>{data.billNo}</td>
                    <td>{data.caseId}</td>
                    <td>{data.date}</td>
                    <td>{data.discount}</td>
                    <td>{data.amount}</td>
                    <td>{data.paidAmount}</td>
                    <td>{data.balanceAmount}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">No Pharmacy data available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PatientVisitReport;
