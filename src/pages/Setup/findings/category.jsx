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
import * as XLSX from "xlsx"; // Importing the XLSX library
import jsPDF from "jspdf"; // Importing the jsPDF library
import "./category.css";

const FindingCategoryList = () => {
  const [departments, setDepartments] = useState([
    { id: 1, name: "Fever" },
    { id: 2, name: "Typhidot (or Widal Test)" },
    { id: 3, name: "Skin Problem" },
    { id: 4, name: "Bone Density Problems" },
    { id: 5, name: "Hair Problem" },
    { id: 6, name: "Eye Diseases" },
    { id: 7, name: "Nose Diseases" },
    { id: 8, name: "demooo" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [newDepartment, setNewDepartment] = useState("");
  const [editDepartmentIndex, setEditDepartmentIndex] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAllDepartments, setShowAllDepartments] = useState(false);
  const itemsPerPage = 5;
  const [expandedRows, setExpandedRows] = useState(new Set());
  const [notificationVisible, setNotificationVisible] = useState(false);

  // Filtering departments based on search input
  const filteredDepartments = departments.filter((dept) =>
    dept.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const totalPages = Math.ceil(filteredDepartments.length / itemsPerPage);

  // Add new department function
  const handleAddDepartment = () => {
    if (newDepartment.trim() !== "" && !departments.find(dept => dept.name === newDepartment)) {
      setDepartments([...departments, { id: departments.length + 1, name: newDepartment }]);
      setNewDepartment("");
      setNotificationVisible(false);
    } else {
      alert("Please enter a valid department name or avoid duplicates.");
    }
  };

  // Edit department function
  const handleEditDepartment = () => {
    if (editDepartmentIndex !== null && newDepartment.trim() !== "" && !departments.find(dept => dept.name === newDepartment)) {
      const updatedDepartments = [...departments];
      updatedDepartments[editDepartmentIndex].name = newDepartment.trim();
      setDepartments(updatedDepartments);
      setNewDepartment("");
      setEditMode(false);
      setNotificationVisible(false);
    } else {
      alert("Please enter a valid department name or avoid duplicates.");
    }
  };

  // Delete department function
  const handleDeleteDepartment = (index) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this department?");
    if (confirmDelete) {
      setDepartments(departments.filter((_, i) => i !== index));
      setExpandedRows((prevRows) => {
        const newRows = new Set(prevRows);
        newRows.delete(index);
        return newRows;
      });
    }
  };

  // Show all departments or paginated view
  const handleShowAllDepartments = () => {
    setShowAllDepartments(!showAllDepartments);
    setCurrentPage(1);
  };

  const toggleRow = (index) => {
    setExpandedRows((prevRows) => {
      const newRows = new Set(prevRows);
      if (newRows.has(index)) {
        newRows.delete(index);
      } else {
        newRows.add(index);
      }
      return newRows;
    });
  };

  const toggleAllRows = () => {
    if (expandedRows.size === filteredDepartments.length) {
      setExpandedRows(new Set());
    } else {
      setExpandedRows(new Set(filteredDepartments.map((_, index) => index)));
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Function to export to Excel
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredDepartments.map(dept => ({ Department: dept.name })));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Departments");
    XLSX.writeFile(wb, "departments.xlsx");
  };

  // Function to export to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Department List", 10, 10);
    filteredDepartments.forEach((dept, index) => {
      doc.text(`${index + 1}. ${dept.name}`, 10, 20 + index * 10);
    });
    doc.save("departments.pdf");
  };

  // Function to export to CSV
  const exportToCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      filteredDepartments.map(dept => dept.name).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "departments.csv");
    document.body.appendChild(link);
    link.click();
  };

  // Function to copy to clipboard
  const exportToCopy = () => {
    navigator.clipboard.writeText(filteredDepartments.map(dept => dept.name).join(", "))
      .then(() => alert("Copied to clipboard!"))
      .catch(err => alert("Failed to copy: ", err));
  };

  // Function to print the department list
  const printLeaveTypes = () => {
    const printContent = filteredDepartments.map(dept => `<p>${dept.name}</p>`).join("");
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Department List</title>
        </head>
        <body>
          <h2>Department List</h2>
          ${printContent}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="department-list-container">
      <h2>Category</h2>

      {notificationVisible && (
        <div className="notification-box">
          <h4>{editMode ? "Edit Department" : "Add New Department"}</h4>
          <input
            type="text"
            placeholder="Enter Category"
            value={newDepartment}
            onChange={(e) => setNewDepartment(e.target.value)}
            required
            style={{ width: "100%", marginBottom: "10px" }}
          />
          <div className="notification-buttons">
            <button onClick={editMode ? handleEditDepartment : handleAddDepartment} className="modal-btn">Save</button>
            <button onClick={() => {
              setNotificationVisible(false);
              setEditMode(false);
              setNewDepartment("");
            }} className="modal-btn">Cancel</button>
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

      <div className="add-department-container">
        <button className="add-department-button" onClick={() => {
          setNotificationVisible(true);
          setEditMode(false);
          setNewDepartment("");
        }}>
          <FontAwesomeIcon icon={faPlus} /> Add CategoryList
        </button>
      </div>

      <div className="show-all-container">
        <button onClick={handleShowAllDepartments}>
          {showAllDepartments ? "Show Paginated" : "Show All"} {showAllDepartments ? '▲' : '▼'}
        </button>
      </div>

      <div className="export-buttons">
        <button onClick={exportToCopy}>
          <FontAwesomeIcon icon={faCopy} />
        </button>
        <button onClick={exportToExcel}>
          <FontAwesomeIcon icon={faFileExcel} />
        </button>
        <button onClick={exportToPDF}>
          <FontAwesomeIcon icon={faFilePdf} />
        </button>
        <button onClick={exportToCSV}>
          <FontAwesomeIcon icon={faFileCsv} />
        </button>
        <button onClick={printLeaveTypes}>
          <FontAwesomeIcon icon={faPrint} />
        </button>
      </div>

      <div className="department-list">
        <table>
          <thead>
            <tr>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {(showAllDepartments ? filteredDepartments : filteredDepartments.slice(startIndex, startIndex + itemsPerPage)).map((dept, index) => (
              <tr key={index} onClick={() => toggleRow(index)} style={{ cursor: "pointer" }}>
                <td>{dept.name}</td>
                <td>
                  <button className="edit-btn" onClick={() => {
                    setEditMode(true);
                    setEditDepartmentIndex(showAllDepartments ? index : startIndex + index);
                    setNewDepartment(dept.name);
                    setNotificationVisible(true);
                  }}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDeleteDepartment(showAllDepartments ? index : startIndex + index)}> Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="footer">
          <p>
            Records: {filteredDepartments.length} of {departments.length}
          </p>
        </div>

        {!showAllDepartments && (
          <div className="pagination">
            <button onClick={handlePrevPage} disabled={currentPage === 1}>
              Prev
            </button>
            <button onClick={handleNextPage} disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FindingCategoryList;

