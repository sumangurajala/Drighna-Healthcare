import React, { useState } from 'react';
import './inventory.css';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const InventoryStockReport = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Sample data for the inventory report
  const inventoryData = [
    { name: 'Uniform (Patient-Staff)', category: 'Uniforms', supplier: 'Quick Service', store: 'Vardaan', totalQuantity: 12, totalIssued: 0, availableQuantity: 12 },
    { name: 'Bed Sheet', category: 'Bed Sheets', supplier: 'Quick Service', store: 'Vinay Pharmacy', totalQuantity: 200, totalIssued: 200, availableQuantity: 0 },
    { name: 'Pharmacist Equipment', category: 'Equipments', supplier: 'Quick Service', store: 'Vinay Pharmacy', totalQuantity: 400, totalIssued: 2, availableQuantity: 398 },
    { name: 'Personal Protective Equipment Kit', category: 'Equipments', supplier: 'VK Supplier', store: 'Vardaan', totalQuantity: 502, totalIssued: 0, availableQuantity: 502 },
    { name: 'Syringe Pump', category: 'Equipments', supplier: 'VK Supplier', store: 'Vardaan', totalQuantity: 100, totalIssued: 0, availableQuantity: 100 },
    { name: 'Medical Equipment', category: 'Equipments', supplier: 'VK Supplier', store: 'Vinay Pharmacy', totalQuantity: 200, totalIssued: 0, availableQuantity: 200 },
    { name: 'Dressing Cotton', category: 'Bed Sheets', supplier: 'VK Supplier', store: 'SK Pharma', totalQuantity: 250, totalIssued: 0, availableQuantity: 250 },
    { name: 'Surgical Lights', category: 'Equipments', supplier: 'Quick Service', store: 'Vinay Pharmacy', totalQuantity: 202, totalIssued: 0, availableQuantity: 202 },
  ];

  // Filter data based on search term
  const filteredData = inventoryData.filter(
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
    const worksheet = XLSX.utils.json_to_sheet(inventoryData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'InventoryStockReport');
    XLSX.writeFile(workbook, 'InventoryStockReport.xlsx');
  };

  const exportToCSV = () => {
    const worksheet = XLSX.utils.json_to_sheet(inventoryData);
    const csvOutput = XLSX.utils.sheet_to_csv(worksheet);
    const blob = new Blob([csvOutput], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'InventoryStockReport.csv');
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
      pdf.save('InventoryStockReport.pdf');
    });
  };

  const copyToClipboard = () => {
    const text = inventoryData.map(data => 
      `${data.name}, ${data.category}, ${data.supplier}, ${data.store}, ${data.totalQuantity}, ${data.totalIssued}, ${data.availableQuantity}`
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
      <h2>Inventory Stock Report</h2>
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
            <th>Name</th>
            <th>Category</th>
            <th>Supplier</th>
            <th>Store</th>
            <th>Total Quantity</th>
            <th>Total Issued</th>
            <th>Available Quantity</th>
          </tr>
        </thead>
        <tbody>
          {currentData.length > 0 ? (
            currentData.map((data, index) => (
              <tr key={index}>
                <td>{data.name}</td>
                <td>{data.category}</td>
                <td>{data.supplier}</td>
                <td>{data.store}</td>
                <td>{data.totalQuantity}</td>
                <td>{data.totalIssued}</td>
                <td>{data.availableQuantity}</td>
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

export default InventoryStockReport;
