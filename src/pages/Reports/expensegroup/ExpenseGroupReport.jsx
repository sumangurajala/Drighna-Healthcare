import React, { useState } from 'react';
import './expense.css';
import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';

const ExpenseGroupReport = () => {
  const [timeDuration, setTimeDuration] = useState('');
  const [expenseHead, setExpenseHead] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    console.log("Searching with Time Duration:", timeDuration, "and Expense Head:", expenseHead);
  };

  // Dummy data to simulate table data (replace this with real data)
  const tableData = [
    { expenseHead: 'Electricity Bill', expenseId: 2, name: 'Hospital', date: '17-02-2024', invoiceNumber: '001', amount: 1500.00 },
    { expenseHead: 'Electricity Bill', expenseId: 4, name: 'electric bill', date: '17-10-2024', invoiceNumber: '001001EB', amount: 10000.00 },
    { expenseHead: 'Electricity Bill', expenseId: 11, name: 'electric bill', date: '24-10-2024', invoiceNumber: '001002EB', amount: 10000.00 },
    { expenseHead: 'Electricity Bill', expenseId: 13, name: 'electric bill', date: '29-10-2024', invoiceNumber: '001002EB', amount: 10000.00 },
    { expenseHead: 'Equipements', expenseId: 3, name: 'Hospital', date: '19-02-2024', invoiceNumber: '1001', amount: 1000.00 },
    { expenseHead: 'Building rent', expenseId: 12, name: 'rent', date: '25-10-2024', invoiceNumber: '01', amount: 10000.00 },
  ];

  // Filtered data based on the search term
  const filteredData = tableData.filter(
    item =>
      item.expenseHead.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate the subtotal of the filtered data
  const subtotal = filteredData.reduce((sum, item) => sum + item.amount, 0);

  const handleExportCSV = () => {
    const headers = ['Expense Head', 'Expense Id', 'Name', 'Date', 'Invoice Number', 'Amount (₹)'];
    const rows = filteredData.map(row => [row.expenseHead, row.expenseId, row.name, row.date, row.invoiceNumber, row.amount]);

    let csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "expense_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text("Expense Report", 20, 10);
    let yPosition = 20;

    // Adding headers
    const headers = ['Expense Head', 'Expense Id', 'Name', 'Date', 'Invoice Number', 'Amount (₹)'];
    headers.forEach((header, index) => {
      doc.text(header, 20 + index * 30, yPosition);
    });
    yPosition += 10;

    // Adding rows
    filteredData.forEach(row => {
      const rowData = [row.expenseHead, row.expenseId, row.name, row.date, row.invoiceNumber, row.amount.toString()];
      rowData.forEach((data, index) => {
        doc.text(data, 20 + index * 30, yPosition);
      });
      yPosition += 10;
    });

    // Adding subtotal
    doc.text(`Subtotal: ₹${subtotal.toFixed(2)}`, 20, yPosition + 10);

    doc.save("expense_report.pdf");
  };

  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Expense Report");
    XLSX.writeFile(workbook, "expense_report.xlsx");
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="container">
      <h1>Expense Group Report</h1>

      <div className="form-group">
        <div className="input-group">
          <label htmlFor="timeDuration">Time Duration</label>
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
          <label htmlFor="expenseHead">Search Expense Head</label>
          <select
            id="expenseHead"
            className="select"
            value={expenseHead}
            onChange={(e) => setExpenseHead(e.target.value)}
          >
            <option value="">Select</option>
            <option value="Electricity Bill">Electricity Bill</option>
            <option value="Equipements">Equipements</option>
            <option value="Building rent">Building rent</option>
          </select>
        </div>

        <button className="search-button" onClick={handleSearch}>Search</button>
      </div>

      <input
        type="text"
        className="search-input"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="import-buttons">
        <button className="import-button" onClick={handleExportCSV}>Export to CSV</button>
        <button className="import-button" onClick={handleExportPDF}>Export to PDF</button>
        <button className="import-button" onClick={handleExportExcel}>Export to Excel</button>
        <button className="import-button" onClick={handlePrint}>Print</button>
      </div>

      <div className="table-container">
        <h2 className="table-header">Expense Report</h2>
        <table>
          <thead>
            <tr>
              <th>Expense Head</th>
              <th>Expense Id</th>
              <th>Name</th>
              <th>Date</th>
              <th>Invoice Number</th>
              <th>Amount (₹)</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((row, index) => (
                <tr key={index}>
                  <td>{row.expenseHead}</td>
                  <td>{row.expenseId}</td>
                  <td>{row.name}</td>
                  <td>{row.date}</td>
                  <td>{row.invoiceNumber}</td>
                  <td>{row.amount.toFixed(2)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="no-data">
                  No data available in table
                </td>
              </tr>
            )}
            {filteredData.length > 0 && (
              <tr className="subtotal-row">
                <td colSpan="5" className="subtotal-label">Subtotal</td>
                <td className="subtotal-amount">₹{subtotal.toFixed(2)}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpenseGroupReport;


