import React, { useState } from 'react';
import './patientlogin.css';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const patientData = [
  { id: 1311, name: 'demo', username: 'pat1311', password: '6xo1ep' },
  { id: 1310, name: 'random', username: 'pat1310', password: 'q68tbx' },
  { id: 1309, name: 'demo1', username: 'pat1309', password: '5t1lyv' },
  { id: 1308, name: 'Vikas', username: 'pat1308', password: 'nsqu1h' },
  { id: 1307, name: 'apptest1', username: 'pat1307', password: 'zquzr7' },
  { id: 1306, name: 'sample', username: 'pat1306', password: 'smlk9h' },
  { id: 1305, name: 'Jyoti Shatagar', username: 'pat1305', password: 'mhhvmm' },
  { id: 1304, name: 'demo', username: 'pat1304', password: '5qt2kb' },
  { id: 1303, name: 'rk', username: 'pat1303', password: 'qcn3e3' },
  { id: 1302, name: 'rinki', username: 'pat1302', password: 'hjpbnc' },
  { id: 1301, name: 'rinki', username: 'pat1301', password: 'fs393z' },
  { id: 1300, name: 'Devi', username: 'pat1300', password: 'ykddje' },
  { id: 1299, name: 'jyoti', username: 'pat1299', password: '21t64n' },
  { id: 1298, name: 'Harish', username: 'pat1298', password: '592fbv' },
  { id: 1297, name: 'Narmada', username: 'pat1297', password: '6augdi' },
];

const PatientLoginCredential = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filtered data based on search
  const filteredData = patientData.filter((patient) =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate the displayed data based on pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Pagination handler
  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  // Export to Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(patientData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Patients");
    XLSX.writeFile(workbook, "PatientData.xlsx");
  };

  // Export to CSV
  const exportToCSV = () => {
    const worksheet = XLSX.utils.json_to_sheet(patientData);
    const csvOutput = XLSX.utils.sheet_to_csv(worksheet);
    const blob = new Blob([csvOutput], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "PatientData.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export to PDF
  const exportToPDF = () => {
    const input = document.getElementById("patient-table");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 190;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
      pdf.save("PatientData.pdf");
    });
  };

  // Copy to Clipboard
  const copyToClipboard = () => {
    const text = patientData.map(patient => 
      `${patient.id}, ${patient.name}, ${patient.username}, ${patient.password}`
    ).join('\n');
    navigator.clipboard.writeText(text).then(() => {
      alert('Data copied to clipboard');
    });
  };

  // Print Table
  const printTable = () => {
    window.print();
  };

  return (
    <div className="table-container">
      <h2>Patient Login Credential</h2>
      <div className="controls">
        <input 
          type="text" 
          placeholder="Search by Name..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <div className="button-container">
          <button onClick={copyToClipboard}>Copy</button>
          <button onClick={printTable}>Print</button>
          <button onClick={exportToExcel}>Export to Excel</button>
          <button onClick={exportToCSV}>Export to CSV</button>
          <button onClick={exportToPDF}>Export to PDF</button>
        </div>
      </div>
      <table id="patient-table">
        <thead>
          <tr>
            <th>Patient Id</th>
            <th>Patient Name</th>
            <th>Username</th>
            <th>Password</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((patient) => (
            <tr key={patient.id}>
              <td>{patient.id}</td>
              <td>{patient.name}</td>
              <td>{patient.username}</td>
              <td>{patient.password}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="pagination">
        <button onClick={goToPreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={goToNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default PatientLoginCredential;



