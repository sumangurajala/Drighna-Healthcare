import React, { useState } from 'react';
import './audittrail.css';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const AuditTrailReportList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Initial audit data state
  const [auditData, setAuditData] = useState([
    { message: 'Record deleted Where Blood Issue id 41', user: 'Super Admin (9001)', ip: '49.207.202.167', action: 'Delete', platform: 'Windows 10', agent: 'Chrome 130.0.0.0', dateTime: '29-10-2024 04:24 PM' },
    { message: 'Record updated On Contents id 17', user: 'Super Admin (9001)', ip: '49.207.202.167', action: 'Update', platform: 'Windows 10', agent: 'Chrome 130.0.0.0', dateTime: '29-10-2024 03:53 PM' },
    // Add more sample data here
  ]);

  // Filter data based on search term
  const filteredData = auditData.filter(
    (data) => data.message.toLowerCase().includes(searchTerm.toLowerCase())
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

  // Delete all records after confirmation
  const deleteAllRecords = () => {
    const confirmed = window.confirm("Are you sure you want to delete all records?");
    if (confirmed) {
      setAuditData([]); // Clear the audit data
    }
  };

  // Export functions
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(auditData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'AuditTrailReport');
    XLSX.writeFile(workbook, 'AuditTrailReport.xlsx');
  };

  const exportToCSV = () => {
    const worksheet = XLSX.utils.json_to_sheet(auditData);
    const csvOutput = XLSX.utils.sheet_to_csv(worksheet);
    const blob = new Blob([csvOutput], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'AuditTrailReport.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToPDF = () => {
    const input = document.getElementById('audit-table');
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 190;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
      pdf.save('AuditTrailReport.pdf');
    });
  };

  const copyToClipboard = () => {
    const text = auditData.map(data => 
      `${data.message}, ${data.user}, ${data.ip}, ${data.action}, ${data.platform}, ${data.agent}, ${data.dateTime}`
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
      <h2>Audit Trail Report List</h2>
      <div className="header-actions">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button onClick={deleteAllRecords} className="delete-all-button">Delete All</button>
        <div className="button-container">
          <button onClick={copyToClipboard}>Copy</button>
          <button onClick={exportToPDF}>PDF</button>
          <button onClick={printTable}>Print</button>
          <button onClick={exportToExcel}>Excel</button>
          <button onClick={exportToCSV}>CSV</button>
        </div>
      </div>
      <table id="audit-table">
        <thead>
          <tr>
            <th>Message</th>
            <th>Users</th>
            <th>IP Address</th>
            <th>Action</th>
            <th>Platform</th>
            <th>Agent</th>
            <th>Date Time</th>
          </tr>
        </thead>
        <tbody>
          {currentData.length > 0 ? (
            currentData.map((data, index) => (
              <tr key={index}>
                <td>{data.message}</td>
                <td>{data.user}</td>
                <td>{data.ip}</td>
                <td>{data.action}</td>
                <td>{data.platform}</td>
                <td>{data.agent}</td>
                <td>{data.dateTime}</td>
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

export default AuditTrailReportList;
