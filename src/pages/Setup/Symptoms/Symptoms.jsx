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

const SymptomsList = () => {
  const [findings, setFindings] = useState([
    { id: 1, finding: "Thirst", category: "Eating or weight problems", description: "Thirst is the feeling of needing to drink something..." },
    { id: 2, finding: "Feeling sad or down", category: "Emotional problems", description: "Personality changes in a way that seems different..." },
    { id: 3, finding: "Cramps and injuries", category: "Muscle or joint problems", description: "Muscle pain: Muscle spasms, cramps, and injuries..." },
    { id: 4, finding: "Atopic dermatitis (Eczema)", category: "Skin problems", description: "Atopic dermatitis usually develops in early childhood..." },
    { id: 5, finding: "Bladder leakage", category: "Bladder problems", description: "Urinary incontinence—the loss of bladder control..." },
    { id: 6, finding: "Constant or severe abdominal pain", category: "Stomach problems", description: "Diseases that affect the digestive system can also cause chronic abdominal pain..." },
    { id: 7, finding: "Asthma", category: "Lung problems", description: "Asthma is a condition in which your airways narrow and swell and may produce extra mucus..." }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [newFinding, setNewFinding] = useState({ finding: "", category: "", description: "" });
  const [currentFindingIndex, setCurrentFindingIndex] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [notificationVisible, setNotificationVisible] = useState(false);

  const navigate = useNavigate();

  const filteredFindings = findings.filter((f) =>
    f.finding.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedFindings = filteredFindings.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(filteredFindings.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleItemsPerPageChange = (event) => {
    const value = event.target.value;
    setItemsPerPage(value === "All" ? filteredFindings.length : Number(value));
    setCurrentPage(1);
  };

  const handleAddFinding = () => {
    if (newFinding.finding && newFinding.category && newFinding.description) {
      setFindings([...findings, newFinding]);
      resetNotification();
    } else {
      alert("Please enter valid finding details.");
    }
  };

  const handleEditFinding = () => {
    if (newFinding.finding && newFinding.category && newFinding.description) {
      const updatedFindings = [...findings];
      updatedFindings[currentFindingIndex] = newFinding;
      setFindings(updatedFindings);
      resetNotification();
    } else {
      alert("Please enter valid finding details.");
    }
  };

  const handleDeleteFinding = (index) => {
    if (window.confirm("Are you sure you want to delete this finding?")) {
      setFindings(findings.filter((_, i) => i !== index));
    }
  };

  const openEditNotification = (index) => {
    setCurrentFindingIndex(index);
    setNewFinding(findings[index]);
    setEditMode(true);
    setNotificationVisible(true);
  };

  const resetNotification = () => {
    setNewFinding({ finding: "", category: "", description: "" });
    setEditMode(false);
    setNotificationVisible(false);
  };

  // Export Functions
  const exportToCopy = () => {
    const textToCopy = findings
      .map((finding) => `${finding.finding} - ${finding.category} - ${finding.description}`)
      .join("\n");
    navigator.clipboard.writeText(textToCopy).then(() => {
      alert("Findings copied to clipboard!");
    });
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(findings);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Findings");
    XLSX.writeFile(workbook, "Findings.xlsx");
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Findings List", 20, 10);
    doc.autoTable({
      head: [["Finding", "Category", "Description"]],
      body: findings.map((f) => [f.finding, f.category, f.description]),
    });
    doc.save("Findings.pdf");
  };

  const exportToCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      findings.map((f) => `${f.finding},${f.category},${f.description}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "Findings.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const printFindings = () => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write("<html><head><title>Print Findings</title></head><body>");
    printWindow.document.write("<h2>Findings List</h2><ul>");
    findings.forEach((f) => {
      printWindow.document.write(`<li>${f.finding} - ${f.category} - ${f.description}</li>`);
    });
    printWindow.document.write("</ul></body></html>");
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="smallcontainer">
      <div className="input-fields-container">
        <button className="category-button" onClick={() => navigate("/setup/symptoms")}>Symptoms Head</button>
        <button className="category-button" onClick={() => navigate("/setup/symptomslist")}>Symptoms TYPE</button>
      </div>

      <div className="leave-type-list-container">
        <h2>Findings List</h2>

        {notificationVisible && (
          <div className="notification-box">
            <h4>{editMode ? "Edit Finding" : "Add Finding"}</h4>
            <input
              type="text"
              placeholder="Enter finding"
              value={newFinding.finding}
              onChange={(e) => setNewFinding({ ...newFinding, finding: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Enter category"
              value={newFinding.category}
              onChange={(e) => setNewFinding({ ...newFinding, category: e.target.value })}
              required
            />
            <textarea
              placeholder="Enter description"
              value={newFinding.description}
              onChange={(e) => setNewFinding({ ...newFinding, description: e.target.value })}
              required
            />
            <div className="notification-buttons">
              <button onClick={editMode ? handleEditFinding : handleAddFinding}>Save</button>
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

        <div className="add-leave-type-container">
          <button
            className="add-LeaveTypes-button"
            onClick={() => {
              resetNotification();
              setNotificationVisible(true);
            }}
          >
            <FontAwesomeIcon icon={faPlus} /> Add Finding
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
          <button onClick={printFindings}>
            <FontAwesomeIcon icon={faPrint} /> Print
          </button>
        </div>

        <div className="items-per-page-dropdown">
          <label htmlFor="itemsPerPage">Show:</label>
          <select id="itemsPerPage" onChange={handleItemsPerPageChange} value={itemsPerPage}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={100}>100</option>
          </select>
        </div>

        <table>
          <thead>
            <tr>
              <th>SymptomsHead</th>
              <th>SymptomsType</th>
              <th>SymptomsDescription</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedFindings.map((finding, index) => (
              <tr key={index}>
                <td>{finding.finding}</td>
                <td>{finding.category}</td>
                <td>{finding.description}</td>
                <td>
                  <button className="edit-btn" onClick={() => openEditNotification(startIndex + index)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDeleteFinding(startIndex + index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination-controls">
          <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
          <span>{` Page ${currentPage} of ${totalPages} `}</span>
          <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default SymptomsList;
