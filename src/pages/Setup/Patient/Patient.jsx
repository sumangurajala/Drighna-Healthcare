import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faFileImport,
  faList,
  faTrashAlt,
  faFileExcel,
  faFilePdf,
  faFileCsv,
  faPrint,
  faCopy,
  faEdit,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "./patient.css";

const PatientList = () => {
  // Initialize patients with an empty array to avoid filter issues
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Handle search input
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter patients based on search term, handling potential missing properties
  const filteredPatients = patients.filter((patient) => {
    const nameMatch = patient?.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const ageMatch = patient?.age?.toString().includes(searchTerm);
    const phoneMatch = patient?.phone?.includes(searchTerm);
    return nameMatch || ageMatch || phoneMatch;
  });

  // Export to Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(patients);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Patients");
    XLSX.writeFile(workbook, "patients.xlsx");
  };

  // Export to PDF using jsPDF and autoTable
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Patient List", 20, 10);
    doc.autoTable({
      head: [["Patient Name", "Age", "Gender", "Phone", "Guardian", "Address", "Dead"]],
      body: patients.map((patient) => [
        patient.name,
        patient.age,
        patient.gender,
        patient.phone,
        patient.guardian,
        patient.address,
        patient.dead ? "Yes" : "No",
      ]),
    });
    doc.save("patients.pdf");
  };

  // Export to CSV
  const exportToCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["Patient Name,Age,Gender,Phone,Guardian,Address,Dead"].join(",") +
      "\n" +
      patients
        .map((p) => [p.name, p.age, p.gender, p.phone, p.guardian, p.address, p.dead ? "Yes" : "No"].join(","))
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "patients.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Copy to Clipboard
  const copyToClipboard = () => {
    const textToCopy = patients
      .map(
        (patient) =>
          `${patient.name} - ${patient.age} - ${patient.gender} - ${patient.phone} - ${patient.guardian} - ${patient.address} - ${patient.dead ? "Yes" : "No"}`
      )
      .join("\n");

    navigator.clipboard.writeText(textToCopy).then(() => {
      alert("Patient list copied to clipboard!");
    });
  };

  // Print the patient list
  const printPatientList = () => {
    const printContent = patients
      .map(
        (patient) =>
          `${patient.name} - ${patient.age} - ${patient.gender} - ${patient.phone} - ${patient.guardian} - ${patient.address} - ${patient.dead ? "Yes" : "No"}`
      )
      .join("\n");

    const printWindow = window.open("", "_blank");
    printWindow.document.write(`<pre>${printContent}</pre>`);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="patient-list-container">
      <h2>Patient List</h2>

      {/* Action Buttons */}
      <div className="action-buttons">
        <button className="btn add-btn">
          <FontAwesomeIcon icon={faPlus} /> Add New Patient
        </button>
        <button className="btn import-btn">
          <FontAwesomeIcon icon={faFileImport} /> Import Patient
        </button>
        <button className="btn disable-btn">
          <FontAwesomeIcon icon={faList} /> Disabled Patient List
        </button>
        <button className="btn delete-btn">
          <FontAwesomeIcon icon={faTrashAlt} /> Delete Selected
        </button>

        {/* Export Buttons */}
<div className="action-buttons">
  <button className="btn export-btn small-btn excel-btn" onClick={exportToExcel}>
    <FontAwesomeIcon icon={faFileExcel} /> Excel
  </button>
  <button className="btn export-btn small-btn pdf-btn" onClick={exportToPDF}>
    <FontAwesomeIcon icon={faFilePdf} /> PDF
  </button>
  <button className="btn export-btn small-btn csv-btn" onClick={exportToCSV}>
    <FontAwesomeIcon icon={faFileCsv} /> CSV
  </button>
  <button className="btn export-btn small-btn copy-btn" onClick={copyToClipboard}>
    <FontAwesomeIcon icon={faCopy} /> Copy
  </button>
  <button className="btn export-btn small-btn print-btn" onClick={printPatientList}>
    <FontAwesomeIcon icon={faPrint} /> Print
  </button>
</div>
</div>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>

      {/* Patient Table */}
      <table className="patient-table">
        <thead>
          <tr>
            <th>
              <input type="checkbox" />
            </th>
            <th>Patient Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Phone</th>
            <th>Guardian Name</th>
            <th>Address</th>
            <th>Dead</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredPatients.length > 0 ? (
            filteredPatients.map((patient) => (
              <tr key={patient.id}>
                <td>
                  <input type="checkbox" />
                </td>
                <td>{patient.name}</td>
                <td>{patient.age}</td>
                <td>{patient.gender}</td>
                <td>{patient.phone}</td>
                <td>{patient.guardian}</td>
                <td>{patient.address}</td>
                <td>{patient.dead ? "Yes" : "No"}</td>
                <td>
                  <button className="btn action-btn edit-btn">
                    <FontAwesomeIcon icon={faEdit} /> Edit
                  </button>
                  <button className="btn action-btn view-btn">
                    <FontAwesomeIcon icon={faEye} /> View
                  </button>
                  <button className="btn action-btn delete-btn">
                    <FontAwesomeIcon icon={faTrashAlt} /> Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9">No patients found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PatientList;



