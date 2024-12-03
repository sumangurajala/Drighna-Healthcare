
import React, { useState } from 'react';
import './Referral.css';
import * as XLSX from 'xlsx';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const ReferralReport = () => {
  const [payee, setPayee] = useState('');
  const [patientType, setPatientType] = useState('');
  const [patient, setPatient] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Sample data for the referral report
  const referralData = [
    { name: 'Lawerence', patientName: 'hema (1286)', billNo: 'IPDN45', billAmount: 336.00, commissionPercentage: 25.00, commissionAmount: 84.00 },
    // Additional sample records can be added here
  ];

  const filteredData = referralData.filter(
    (data) => data.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination calculations
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  // Export functions
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(referralData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'ReferralReport');
    XLSX.writeFile(workbook, 'ReferralReport.xlsx');
  };

  const exportToCSV = () => {
    const worksheet = XLSX.utils.json_to_sheet(referralData);
    const csvOutput = XLSX.utils.sheet_to_csv(worksheet);
    const blob = new Blob([csvOutput], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'ReferralReport.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToPDF = () => {
    const input = document.getElementById('report-content');
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 190;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
      pdf.save('ReferralReport.pdf');
    });
  };

  const copyToClipboard = () => {
    const text = referralData.map(data => 
      `${data.name}, ${data.patientName}, ${data.billNo}, ${data.billAmount}, ${data.commissionPercentage}, ${data.commissionAmount}`
    ).join('\n');
    navigator.clipboard.writeText(text).then(() => {
      alert('Data copied to clipboard');
    });
  };

  const printTable = () => {
    window.print();
  };

  return (
    <div className="container">
      <h2>Referral Report</h2>
      <div className="filter-section">
        <label>
          Payee
          <select value={payee} onChange={(e) => setPayee(e.target.value)}>
            <option value="">Select</option>
            {/* Add more options here */}
          </select>
        </label>
        <label>
          Patient Type
          <select value={patientType} onChange={(e) => setPatientType(e.target.value)}>
            <option value="">Select</option>
            {/* Add more options here */}
            <option value="OPD">OPD</option>
        <option value="IPD">IPD</option>
        <option value="Pharmacy">Pharmacy</option>
        <option value="Pathology">Pathology</option>
        <option value="Radiology">Radiology</option>
        <option value="Blood Bank">Blood Bank</option>
        <option value="Ambulance">Ambulance</option>
          </select>
        </label>
        <label>
          Patient
          <select value={patient} onChange={(e) => setPatient(e.target.value)}>
            <option value="">Select</option>
            {/* Add more options here */}
          </select>
        </label>
        <button className="search-button">Search</button>
      </div>

      <div className="search-and-buttons">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <div className="button-container">
          <button onClick={copyToClipboard}>Copy</button>
          <button onClick={exportToPDF}>PDF</button>
          <button onClick={printTable}>Print</button>
          <button onClick={exportToExcel}>Excel</button>
          <button onClick={exportToCSV}>CSV</button>
        </div>
      </div>

      <div id="report-content">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Patient Name</th>
              <th>Bill No</th>
              <th>Bill Amount (₹)</th>
              <th>Commission Percentage (%)</th>
              <th>Commission Amount (₹)</th>
            </tr>
          </thead>
          <tbody>
            {currentData.length > 0 ? (
              currentData.map((data, index) => (
                <tr key={index}>
                  <td>{data.name}</td>
                  <td>{data.patientName}</td>
                  <td>{data.billNo}</td>
                  <td>{data.billAmount.toFixed(2)}</td>
                  <td>{data.commissionPercentage.toFixed(2)}</td>
                  <td>{data.commissionAmount.toFixed(2)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button onClick={goToPreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={goToNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
      <div className="records-info">
        Records: {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredData.length)} of {filteredData.length}
      </div>
    </div>
  );
};

export default ReferralReport;
