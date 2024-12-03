import React, { useState } from 'react';
import './expense.css';
import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';

const ExpenseReport = () => {
  const [timeDuration, setTimeDuration] = useState('');

  const handleSearch = () => {
    console.log("Searching with Time Duration:", timeDuration);
  };

  // Dummy data to simulate table data (replace this with real data)
  const tableData = [
    { name: 'John Doe', invoiceNumber: 'INV001', expenseHead: 'Office Supplies', date: '2023-10-01', amount: '200' },
    { name: 'Jane Smith', invoiceNumber: 'INV002', expenseHead: 'Travel', date: '2023-10-02', amount: '450' },
    // Add more rows as needed
  ];

  const handleExportCSV = () => {
    const headers = ['Name', 'Invoice Number', 'Expense Head', 'Date', 'Amount (₹)'];
    const rows = tableData.map(row => [row.name, row.invoiceNumber, row.expenseHead, row.date, row.amount]);

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
    const headers = ['Name', 'Invoice Number', 'Expense Head', 'Date', 'Amount (₹)'];
    headers.forEach((header, index) => {
      doc.text(header, 20 + index * 30, yPosition);
    });
    yPosition += 10;

    // Adding rows
    tableData.forEach(row => {
      const rowData = [row.name, row.invoiceNumber, row.expenseHead, row.date, row.amount];
      rowData.forEach((data, index) => {
        doc.text(data.toString(), 20 + index * 30, yPosition);
      });
      yPosition += 10;
    });

    doc.save("expense_report.pdf");
  };

  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(tableData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Expense Report");
    XLSX.writeFile(workbook, "expense_report.xlsx");
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="container">
      <h1>Expense Report</h1>

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
        
        <button className="search-button" onClick={handleSearch}>Search</button>
      </div>

      <div className="import-buttons">
        <button className="import-button" onClick={handleExportCSV}>Export to CSV</button>
        <button className="import-button" onClick={handleExportPDF}>Export to PDF</button>
        <button className="import-button" onClick={handleExportExcel}>Export to Excel</button>
        <button className="import-button" onClick={handlePrint}>Print</button>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Invoice Number</th>
              <th>Expense Head</th>
              <th>Date</th>
              <th>Amount (₹)</th>
            </tr>
          </thead>
          <tbody>
            {tableData.length > 0 ? (
              tableData.map((row, index) => (
                <tr key={index}>
                  <td>{row.name}</td>
                  <td>{row.invoiceNumber}</td>
                  <td>{row.expenseHead}</td>
                  <td>{row.date}</td>
                  <td>{row.amount}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="no-data">
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

export default ExpenseReport;

