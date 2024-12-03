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
import "./findings.css";

const FindingsList = () => {
  const [findings, setFindings] = useState([
    {
      finding: "Unauthorized Access",
      category: "Security",
      description: "Access to restricted areas by unauthorized personnel.",
    },
    {
      finding: "Outdated Software",
      category: "IT Infrastructure",
      description: "Some systems are running software that is no longer supported.",
    },
    {
      finding: "Missing Fire Alarms",
      category: "Safety",
      description: "Certain areas of the building lack fire alarms.",
    },
    {
      finding: "Poor Lighting",
      category: "Safety",
      description: "The lighting in the parking lot is insufficient for visibility at night.",
    },
    {
      finding: "Data Loss Incident",
      category: "Data Management",
      description: "A recent incident resulted in the loss of customer data due to lack of backup.",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [newFinding, setNewFinding] = useState({ finding: "", category: "", description: "" });
  const [currentFindingIndex, setCurrentFindingIndex] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [notificationVisible, setNotificationVisible] = useState(false);

  const navigate = useNavigate();

  // Filter findings based on the search term
  const filteredFindings = findings.filter(
    (type) =>
      type.finding.toLowerCase().includes(searchTerm.toLowerCase()) ||
      type.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      type.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddFinding = () => {
    if (newFinding.finding.trim() !== "" && newFinding.category.trim() !== "" && newFinding.description.trim() !== "") {
      setFindings([...findings, newFinding]);
      resetNotification();
    } else {
      alert("Please enter valid finding details.");
    }
  };

  const handleEditFinding = () => {
    if (newFinding.finding.trim() !== "" && newFinding.category.trim() !== "" && newFinding.description.trim() !== "") {
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

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedFindings = filteredFindings.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(filteredFindings.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleItemsPerPageChange = (event) => {
    const value = event.target.value;
    setItemsPerPage(value === "All" ? filteredFindings.length : Number(value));
    setCurrentPage(1);
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
      {/* Sidebar */}
      <div className="input-fields-container">
        <button className="category-button" onClick={() => navigate("/setup/findings")}>Findings</button>
        <button className="category-button" onClick={() => navigate("/setup/Category")}>Category</button>
      </div>

      {/* Findings List Section */}
      <div className="leave-type-list-container">
        <h2>Findings List</h2>

        {/* Notification Box for Adding/Editing Finding */}
        {notificationVisible && (
          <div className="notification-box">
            <h4>{editMode ? "Edit Finding" : "Add Finding"}</h4>
            <input
              type="text"
              placeholder="Enter finding"
              value={newFinding.finding}
              onChange={(e) => setNewFinding({ ...newFinding, finding: e.target.value })}
              required
              style={{ width: "100%", marginBottom: "10px" }}
            />
            <input
              type="text"
              placeholder="Enter category"
              value={newFinding.category}
              onChange={(e) => setNewFinding({ ...newFinding, category: e.target.value })}
              required
              style={{ width: "100%", marginBottom: "10px" }}
            />
            <textarea
              placeholder="Enter description"
              value={newFinding.description}
              onChange={(e) => setNewFinding({ ...newFinding, description: e.target.value })}
              required
              style={{ width: "100%", marginBottom: "10px" }}
            />
            <div className="notification-buttons">
              <button
                onClick={editMode ? handleEditFinding : handleAddFinding}
                className="modal-btn"
              >
                Save
              </button>
              <button
                onClick={resetNotification}
                className="modal-btn"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Search Input */}
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


        {/* Add Finding Button */}
        <div className="add-leave-type-container" style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", marginBottom: "20px" }}>
          
          <button onClick={exportToCopy} className="export-btn">
            <FontAwesomeIcon icon={faCopy} /> Copy
          </button>
          <button onClick={exportToExcel} className="export-btn">
            <FontAwesomeIcon icon={faFileExcel} /> Excel
          </button>
          <button onClick={exportToPDF} className="export-btn">
            <FontAwesomeIcon icon={faFilePdf} /> PDF
          </button>
          <button onClick={exportToCSV} className="export-btn">
            <FontAwesomeIcon icon={faFileCsv} /> CSV
          </button>
          <button onClick={printFindings} className="export-btn">
            <FontAwesomeIcon icon={faPrint} /> Print
          </button>
        </div>

      
        {/* Dropdown for Items Per Page */}
        <div className="items-per-page-dropdown" style={{ display: "flex", justifyContent: "flex-end", marginBottom: "20px" }}>
          <label htmlFor="itemsPerPage" style={{ marginRight: "10px" }}>Show:</label>
          <select id="itemsPerPage" onChange={handleItemsPerPageChange} value={itemsPerPage}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={100}>100</option>
          </select>
        </div>

        {/* Findings Table */}
        <table>
          <thead>
            <tr>
              <th>Finding</th>
              <th>Category</th>
              <th>Description</th>
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

        {/* Pagination Controls */}
        <div className="pagination-controls">
          <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
          <span>{` Page ${currentPage} of ${totalPages} `}</span>
          <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default FindingsList;


