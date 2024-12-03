import React, { useState } from 'react';
import './Inventory.css';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const InventoryIssueReport = () => {
  const [timeDuration, setTimeDuration] = useState('');
  const [showTable, setShowTable] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Sample data for the inventory issue report
  const inventoryData = [
    // Sample records can be added here if needed
  ];

  // Filter data based on search term
  const filteredData = inventoryData.filter(
    (data) => data.item && data.item.toLowerCase().includes(searchTerm.toLowerCase())
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

  // Validation for Time Duration
  const isTimeDurationValid = timeDuration !== '';

  // Export functions
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(inventoryData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'InventoryIssueReport');
    XLSX.writeFile(workbook, 'InventoryIssueReport.xlsx');
  };

  const exportToCSV = () => {
    const worksheet = XLSX.utils.json_to_sheet(inventoryData);
    const csvOutput = XLSX.utils.sheet_to_csv(worksheet);
    const blob = new Blob([csvOutput], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'InventoryIssueReport.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToPDF = () => {
    const input = document.getElementById('inventory-table');
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 190;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
      pdf.save('InventoryIssueReport.pdf');
    });
  };

  const copyToClipboard = () => {
    const text = inventoryData.map(data => 
      `${data.item}, ${data.itemCategory}, ${data.issueReturn}, ${data.issueTo}, ${data.issuedBy}, ${data.quantity}`
    ).join('\n');
    navigator.clipboard.writeText(text).then(() => {
      alert('Data copied to clipboard');
    });
  };

  const printTable = () => {
    window.print();
  };

  const handleSearch = () => {
    if (isTimeDurationValid) {
      setShowTable(true);
    }
  };

  return (
    <div className="container">
      <h2>Inventory Issue Report</h2>
      <div className="form-controls">
        <label>Time Duration <span className="required">*</span></label>
        <select
          value={timeDuration}
          onChange={(e) => setTimeDuration(e.target.value)}
          className={!isTimeDurationValid ? 'error' : ''}
        >
          <option value="">Select</option>
          <option value="Today">Today</option>
          <option value="This Week">This Week</option>
          <option value="This Month">This Month</option>
          <option value="Custom">Custom</option>
        </select>
        {!isTimeDurationValid && (
          <span className="validation-error">The Time Duration field is required.</span>
        )}
        <button onClick={handleSearch} className="search-button">
          Search
        </button>
      </div>
      {showTable && (
        <>
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
          <table id="inventory-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Item Category</th>
                <th>Issue - Return</th>
                <th>Issue To</th>
                <th>Issued By</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {currentData.length > 0 ? (
                currentData.map((data, index) => (
                  <tr key={index}>
                    <td>{data.item}</td>
                    <td>{data.itemCategory}</td>
                    <td>{data.issueReturn}</td>
                    <td>{data.issueTo}</td>
                    <td>{data.issuedBy}</td>
                    <td>{data.quantity}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="no-data">
                    No data available in table
                    <div className="empty-message">
                      <img src="path_to_image_placeholder" alt="No data" />
                      <p>Add new record or search with different criteria.</p>
                    </div>
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
        </>
      )}
    </div>
  );
};

export default InventoryIssueReport;
