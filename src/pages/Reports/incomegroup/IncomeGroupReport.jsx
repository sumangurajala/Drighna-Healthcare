import React, { useState } from 'react';
import './incomegroup.css';
import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';

const IncomeGroupReport = () => {
  const [timeDuration, setTimeDuration] = useState('');
  const [incomeHead, setIncomeHead] = useState('');

  const handleSearch = () => {
    console.log("Searching with Time Duration:", timeDuration, "and Income Head:", incomeHead);
  };

  // Dummy data to simulate table data (replace this with real data)
  const tableData = [
    { incomeHead: 'Income Head 1', incomeId: 'ID001', name: 'John Doe', date: '2023-10-01', invoiceNumber: 'INV123', amount: '500' },
    { incomeHead: 'Income Head 2', incomeId: 'ID002', name: 'Jane Smith', date: '2023-10-02', invoiceNumber: 'INV124', amount: '750' },
  ];

  const handleExportCSV = () => {
    const headers = ['Income Head', 'Income Id', 'Name', 'Date', 'Invoice Number', 'Amount (₹)'];
    const rows = tableData.map(row => [row.incomeHead, row.incomeId, row.name, row.date, row.invoiceNumber, row.amount]);

    let csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "income_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text("Income Group Report", 20, 10);
    let yPosition = 20;

    // Adding headers
    const headers = ['Income Head', 'Income Id', 'Name', 'Date', 'Invoice Number', 'Amount (₹)'];
    headers.forEach((header, index) => {
      doc.text(header, 20 + index * 30, yPosition);
    });
    yPosition += 10;

    // Adding rows
    tableData.forEach(row => {
      const rowData = [row.incomeHead, row.incomeId, row.name, row.date, row.invoiceNumber, row.amount];
      rowData.forEach((data, index) => {
        doc.text(data.toString(), 20 + index * 30, yPosition);
      });
      yPosition += 10;
    });

    doc.save("income_report.pdf");
  };

  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(tableData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Income Report");
    XLSX.writeFile(workbook, "income_report.xlsx");
  };

  const handlePrint = () => {
    window.print();
  };

  const areFieldsFilled = timeDuration && incomeHead;

  return (
    <div className="container">
      <h1 className="header">Income Group Report</h1>

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
          <label htmlFor="incomeHead">Search Income Head</label>
          <select
            id="incomeHead"
            className="select"
            value={incomeHead}
            onChange={(e) => setIncomeHead(e.target.value)}
          >
            <option value="">Select</option>
            <option value="Income Head 1">Income Head 1</option>
            <option value="Income Head 2">Income Head 2</option>
          </select>
        </div>

        <button className="search-button" onClick={handleSearch}>Search</button>
      </div>

      {areFieldsFilled && (
        <div className="import-buttons">
          <button className="import-button" onClick={handleExportCSV}>CSV</button>
          <button className="import-button" onClick={handleExportPDF}>PDF</button>
          <button className="import-button" onClick={handleExportExcel}>Excel</button>
          <button className="import-button" onClick={handlePrint}>Print</button>
        </div>
      )}

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Income Head</th>
              <th>Income Id</th>
              <th>Name</th>
              <th>Date</th>
              <th>Invoice Number</th>
              <th>Amount (₹)</th>
            </tr>
          </thead>
          <tbody>
            {tableData.length > 0 ? (
              tableData.map((row, index) => (
                <tr key={index}>
                  <td>{row.incomeHead}</td>
                  <td>{row.incomeId}</td>
                  <td>{row.name}</td>
                  <td>{row.date}</td>
                  <td>{row.invoiceNumber}</td>
                  <td>{row.amount}</td>
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
        <div className="add-record">
          <p>📁 Add new record or search with different criteria.</p>
        </div>
      </div>
    </div>
  );
};

export default IncomeGroupReport;


