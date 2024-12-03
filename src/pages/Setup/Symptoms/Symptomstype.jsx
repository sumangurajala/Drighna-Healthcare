import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCopy,
  faFileExcel,
  faFilePdf,
  faFileCsv,
  faPrint,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "./Symptom.css";

const SymptomsTypeList = () => {
  const [symptoms, setSymptoms] = useState([
    { id: 1, type: "Eating or weight problems", category: "Physical", description: "Issues with eating or weight" },
    { id: 2, type: "Emotional problems", category: "Mental", description: "Stress, depression, anxiety" },
    { id: 3, type: "Muscle or joint problems", category: "Physical", description: "Pain in muscles or joints" },
    { id: 4, type: "Skin problems", category: "Dermatological", description: "Rashes, acne, other skin issues" },
    { id: 5, type: "Bladder problems", category: "Physical", description: "Urinary issues" },
    { id: 6, type: "Stomach problems", category: "Gastrointestinal", description: "Digestive problems" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [newSymptom, setNewSymptom] = useState({ type: "", category: "", description: "" });
  const [currentSymptomIndex, setCurrentSymptomIndex] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [notificationVisible, setNotificationVisible] = useState(false);

  const navigate = useNavigate();

  const filteredSymptoms = symptoms.filter((s) =>
    s.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedSymptoms = filteredSymptoms.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(filteredSymptoms.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleItemsPerPageChange = (event) => {
    const value = event.target.value;
    setItemsPerPage(value === "All" ? filteredSymptoms.length : Number(value));
    setCurrentPage(1);
  };

  const handleAddSymptom = () => {
    if (newSymptom.type && newSymptom.category && newSymptom.description) {
      setSymptoms([...symptoms, newSymptom]);
      resetNotification();
    } else {
      alert("Please enter valid symptom details.");
    }
  };

  const handleEditSymptom = () => {
    if (newSymptom.type && newSymptom.category && newSymptom.description) {
      const updatedSymptoms = [...symptoms];
      updatedSymptoms[currentSymptomIndex] = newSymptom;
      setSymptoms(updatedSymptoms);
      resetNotification();
    } else {
      alert("Please enter valid symptom details.");
    }
  };

  const handleDeleteSymptom = (index) => {
    if (window.confirm("Are you sure you want to delete this symptom?")) {
      setSymptoms(symptoms.filter((_, i) => i !== index));
    }
  };

  const openEditNotification = (index) => {
    setCurrentSymptomIndex(index);
    setNewSymptom(symptoms[index]);
    setEditMode(true);
    setNotificationVisible(true);
  };

  const resetNotification = () => {
    setNewSymptom({ type: "", category: "", description: "" });
    setEditMode(false);
    setNotificationVisible(false);
  };

  // Export Functions
  const exportToCopy = () => {
    const textToCopy = symptoms
      .map((symptom) => `${symptom.type} - ${symptom.category} - ${symptom.description}`)
      .join("\n");
    navigator.clipboard.writeText(textToCopy).then(() => {
      alert("Symptoms copied to clipboard!");
    });
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(symptoms);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Symptoms");
    XLSX.writeFile(workbook, "Symptoms.xlsx");
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Symptoms List", 20, 10);
    doc.autoTable({
      head: [["Symptom Type", "Category", "Description"]],
      body: symptoms.map((s) => [s.type, s.category, s.description]),
    });
    doc.save("Symptoms.pdf");
  };

  const exportToCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      symptoms.map((s) => `${s.type},${s.category},${s.description}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "Symptoms.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const printSymptoms = () => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write("<html><head><title>Print Symptoms</title></head><body>");
    printWindow.document.write("<h2>Symptoms List</h2><ul>");
    symptoms.forEach((s) => {
      printWindow.document.write(`<li>${s.type} - ${s.category} - ${s.description}</li>`);
    });
    printWindow.document.write("</ul></body></html>");
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="smallcontainer">
      <div className="symptoms-list-container">
        <h2>Symptoms List</h2>

        {notificationVisible && (
          <div className="notification-box">
            <h4>{editMode ? "Edit Symptom" : "Add Symptom"}</h4>
            <input
              type="text"
              placeholder="Enter symptom type"
              value={newSymptom.type}
              onChange={(e) => setNewSymptom({ ...newSymptom, type: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Enter category"
              value={newSymptom.category}
              onChange={(e) => setNewSymptom({ ...newSymptom, category: e.target.value })}
              required
            />
            <textarea
              placeholder="Enter description"
              value={newSymptom.description}
              onChange={(e) => setNewSymptom({ ...newSymptom, description: e.target.value })}
              required
            />
            <div className="notification-buttons">
              <button onClick={editMode ? handleEditSymptom : handleAddSymptom}>Save</button>
              <button onClick={resetNotification}>Close</button>
            </div>
          </div>
        )}

        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

<div className="add-symptom-container">
  <button
    className="add-symptom-button"
    onClick={() => {
      resetNotification();
      setNotificationVisible(true);
    }}
  >
    <FontAwesomeIcon icon={faPlus} /> Add Symptom
  </button>
</div>


        <div className="export-buttons-container">
          <button onClick={exportToCopy}>
            <FontAwesomeIcon icon={faCopy} /> Copy
          </button>
          <button onClick={exportToExcel}>
            <FontAwesomeIcon icon={faFileExcel} /> Excel
          </button>
          <button onClick={exportToPDF}>
            <FontAwesomeIcon icon={faFilePdf} /> PDF
          </button>
          <button onClick={exportToCSV}>
            <FontAwesomeIcon icon={faFileCsv} /> CSV
          </button>
          <button onClick={printSymptoms}>
            <FontAwesomeIcon icon={faPrint} /> Print
          </button>
        </div>
        <div className="items-per-page-container">
          <label>Items per page: </label>
          <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="All">All</option>
          </select>
        </div>

        <table className="symptoms-table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Category</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedSymptoms.map((symptom, index) => (
              <tr key={index}>
                <td>{symptom.type}</td>
                <td>{symptom.category}</td>
                <td>{symptom.description}</td>
                <td>
                  <button onClick={() => openEditNotification(index)}>Edit</button>
                  <button onClick={() => handleDeleteSymptom(index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination-container">
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button onClick={handleNextPage} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>

    
      </div>
    </div>
  );
};

export default SymptomsTypeList;
