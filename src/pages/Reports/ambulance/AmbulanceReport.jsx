import React, { useState } from 'react';
import './ambulance.css';
import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';

const AmbulanceCallReport = () => {
  const [timeDuration, setTimeDuration] = useState('');
  const [collectedBy, setCollectedBy] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');

  const handleSearch = () => {
    console.log("Searching with Time Duration:", timeDuration, "Collected By:", collectedBy, "Vehicle Model:", vehicleModel);
  };

  // Dummy data to simulate table data (replace this with real data)
  const tableData = [
    { ambulanceCallNo: 1, patientName: 'John Doe', date: '2023-10-01', contactNo: '1234567890', vehicleNumber: 'AB1234', vehicleModel: 'Model A', driverName: 'Driver 1', address: '123 Street', amount: 500, paidAmount: 300, balanceAmount: 200 },
    { ambulanceCallNo: 2, patientName: 'Jane Smith', date: '2023-10-02', contactNo: '0987654321', vehicleNumber: 'CD5678', vehicleModel: 'Model B', driverName: 'Driver 2', address: '456 Avenue', amount: 1000, paidAmount: 700, balanceAmount: 300 },
    // Add more rows as needed
  ];

  const handleExportCSV = () => {
    const headers = ['Ambulance Call No', 'Patient Name', 'Date', 'Contact No', 'Vehicle Number', 'Vehicle Model', 'Driver Name', 'Address', 'Amount (₹)', 'Paid Amount (₹)', 'Balance Amount (₹)'];
    const rows = tableData.map(row => [row.ambulanceCallNo, row.patientName, row.date, row.contactNo, row.vehicleNumber, row.vehicleModel, row.driverName, row.address, row.amount, row.paidAmount, row.balanceAmount]);

    let csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "ambulance_call_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text("Ambulance Call Report", 20, 10);
    let yPosition = 20;

    // Adding headers
    const headers = ['Ambulance Call No', 'Patient Name', 'Date', 'Contact No', 'Vehicle Number', 'Vehicle Model', 'Driver Name', 'Address', 'Amount (₹)', 'Paid Amount (₹)', 'Balance Amount (₹)'];
    headers.forEach((header, index) => {
      doc.text(header, 10 + index * 20, yPosition);
    });
    yPosition += 10;

    // Adding rows
    tableData.forEach(row => {
      const rowData = [row.ambulanceCallNo, row.patientName, row.date, row.contactNo, row.vehicleNumber, row.vehicleModel, row.driverName, row.address, row.amount.toString(), row.paidAmount.toString(), row.balanceAmount.toString()];
      rowData.forEach((data, index) => {
        doc.text(data, 10 + index * 20, yPosition);
      });
      yPosition += 10;
    });

    doc.save("ambulance_call_report.pdf");
  };

  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(tableData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Ambulance Call Report");
    XLSX.writeFile(workbook, "ambulance_call_report.xlsx");
  };

  const handlePrint = () => {
    window.print();
  };

  const isAnyFieldSelected = timeDuration || collectedBy || vehicleModel;

  return (
    <div className="container">
      <h1 className="">Ambulance Call Report</h1>

      <div className="form-group">
        <div className="input-group">
          <label htmlFor="timeDuration">Time Duration <span className="required">*</span></label>
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
          <label htmlFor="collectedBy">Collected By</label>
          <select
            id="collectedBy"
            className="select"
            value={collectedBy}
            onChange={(e) => setCollectedBy(e.target.value)}
          >
            <option value="">Select</option>
            <option value="Collector 1">Collector 1</option>
            <option value="Collector 2">Collector 2</option>
          </select>
        </div>

        <div className="input-group">
          <label htmlFor="vehicleModel">Vehicle Model</label>
          <select
            id="vehicleModel"
            className="select"
            value={vehicleModel}
            onChange={(e) => setVehicleModel(e.target.value)}
          >
            <option value="">Select</option>
            <option value="Model A">Model A</option>
            <option value="Model B">Model B</option>
          </select>
        </div>

        <button className="search-button" onClick={handleSearch}>Search</button>
      </div>

      {/* Conditionally render import/export buttons */}
      {isAnyFieldSelected && (
        <div className="import-buttons">
          <button className="import-button" onClick={handleExportCSV}>Export to CSV</button>
          <button className="import-button" onClick={handleExportPDF}>Export to PDF</button>
          <button className="import-button" onClick={handleExportExcel}>Export to Excel</button>
          <button className="import-button" onClick={handlePrint}>Print</button>
        </div>
      )}

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Ambulance Call No</th>
              <th>Patient Name</th>
              <th>Date</th>
              <th>Contact No</th>
              <th>Vehicle Number</th>
              <th>Vehicle Model</th>
              <th>Driver Name</th>
              <th>Address</th>
              <th>Amount (₹)</th>
              <th>Paid Amount (₹)</th>
              <th>Balance Amount (₹)</th>
            </tr>
          </thead>
          <tbody>
            {tableData.length > 0 ? (
              tableData.map((row, index) => (
                <tr key={index}>
                  <td>{row.ambulanceCallNo}</td>
                  <td>{row.patientName}</td>
                  <td>{row.date}</td>
                  <td>{row.contactNo}</td>
                  <td>{row.vehicleNumber}</td>
                  <td>{row.vehicleModel}</td>
                  <td>{row.driverName}</td>
                  <td>{row.address}</td>
                  <td>{row.amount.toFixed(2)}</td>
                  <td>{row.paidAmount.toFixed(2)}</td>
                  <td>{row.balanceAmount.toFixed(2)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="11" className="no-data">
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

export default AmbulanceCallReport;


