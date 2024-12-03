import React, { useState } from 'react';
import './emailsms.css';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const EmailSmsLog = () => {
  const [timeDuration, setTimeDuration] = useState('');
  const [showTable, setShowTable] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Sample data for the table
  const tableData = [
    { title: 'Email Campaign', date: '2023-11-01', email: 'example@mail.com', sms: 'Hello', group: 'Group A', individual: 'John Doe' },
    // Add more sample records as needed
  ];

  // Filtered data based on search term
  const filteredData = tableData.filter((data) =>
    data.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
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

  // Export to Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(tableData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'EmailSmsLog');
    XLSX.writeFile(workbook, 'EmailSmsLog.xlsx');
  };

  // Export to CSV
  const exportToCSV = () => {
    const worksheet = XLSX.utils.json_to_sheet(tableData);
    const csvOutput = XLSX.utils.sheet_to_csv(worksheet);
    const blob = new Blob([csvOutput], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'EmailSmsLog.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export to PDF
  const exportToPDF = () => {
    const input = document.getElementById('log-table');
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 190;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
      pdf.save('EmailSmsLog.pdf');
    });
  };

  // Copy to Clipboard
  const copyToClipboard = () => {
    const text = tableData.map(data => 
      `${data.title}, ${data.date}, ${data.email}, ${data.sms}, ${data.group}, ${data.individual}`
    ).join('\n');
    navigator.clipboard.writeText(text).then(() => {
      alert('Data copied to clipboard');
    });
  };

  // Print Table
  const printTable = () => {
    window.print();
  };

  const handleSearch = () => {
    setShowTable(true);
  };

  return (
    <div className="container">
      <h2>Email / SMS Log</h2>
      <div className="form-controls">
        <label>Time Duration</label>
        <select
          value={timeDuration}
          onChange={(e) => setTimeDuration(e.target.value)}
        >
          <option value="">Select Duration</option>
          <option value="This Month">This Month</option>
          <option value="Last Month">Last Month</option>
          <option value="Custom">Custom</option>
        </select>
        {timeDuration && (
          <button onClick={handleSearch} className="search-button">
            Search
          </button>
        )}
        {showTable && (
          <div className="button-container">
            <button onClick={copyToClipboard}>Copy</button>
            <button onClick={printTable}>Print</button>
            <button onClick={exportToExcel}>Excel</button>
            <button onClick={exportToCSV}>CSV</button>
            <button onClick={exportToPDF}>PDF</button>
          </div>
        )}
      </div>
      {showTable && (
        <>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <table id="log-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Date</th>
                <th>Email</th>
                <th>SMS</th>
                <th>Group</th>
                <th>Individual</th>
              </tr>
            </thead>
            <tbody>
              {currentData.length > 0 ? (
                currentData.map((data, index) => (
                  <tr key={index}>
                    <td>{data.title}</td>
                    <td>{data.date}</td>
                    <td>{data.email}</td>
                    <td>{data.sms}</td>
                    <td>{data.group}</td>
                    <td>{data.individual}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="no-data">
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
        </>
      )}
    </div>
  );
};

export default EmailSmsLog;


