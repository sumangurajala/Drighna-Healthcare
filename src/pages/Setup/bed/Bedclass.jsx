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
import * as XLSX from "xlsx"; // Importing the xlsx library
import jsPDF from "jspdf"; // Importing the jsPDF library
import "./bed.css"; // Ensure you have the required CSS for styling

const BedclassList = () => {
  const [beds, setBeds] = useState([
    {
      name: "NICU-302",
      bedType: "Standard",
      bedGroup: "NICU",
      floor: "3rd Floor",
      status: "Available",
    },
    {
      name: "GF-001",
      bedType: "Standard",
      bedGroup: "VIP Ward",
      floor: "Ground Floor",
      status: "Allotted",
    },
    {
      name: "SF-201",
      bedType: "Standard",
      bedGroup: "ICU",
      floor: "2nd Floor",
      status: "Allotted",
    },
    {
      name: "PP-100",
      bedType: "Standard",
      bedGroup: "VIP Ward",
      floor: "Ground Floor",
      status: "Allotted",
    },
    // Add more initial bed data here...
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [newBed, setNewBed] = useState({
    name: "",
    bedType: "",
    bedGroup: "",
    floor: "",
    status: "",
  });
  const [currentBedIndex, setCurrentBedIndex] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [notificationVisible, setNotificationVisible] = useState(false);

  const filteredBeds = beds.filter(
    (bed) =>
      bed.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bed.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddBed = () => {
    if (newBed.name && !beds.some((bed) => bed.name === newBed.name)) {
      setBeds([...beds, newBed]);
      resetNotification();
    } else {
      alert("Please enter valid bed details or avoid duplicates.");
    }
  };

  const handleEditBed = () => {
    if (newBed.name && !beds.some((bed, index) => bed.name === newBed.name && index !== currentBedIndex)) {
      const updatedBeds = [...beds];
      updatedBeds[currentBedIndex] = newBed;
      setBeds(updatedBeds);
      resetNotification();
    } else {
      alert("Please enter valid bed details or avoid duplicates.");
    }
  };

  const handleDeleteBed = (index) => {
    if (window.confirm("Are you sure you want to delete this bed?")) {
      setBeds(beds.filter((_, i) => i !== index));
    }
  };

  const navigate = useNavigate();

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedBeds = filteredBeds.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(filteredBeds.length / itemsPerPage);

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
    setItemsPerPage(value === "All" ? filteredBeds.length : Number(value));
    setCurrentPage(1);
  };

  const openEditNotification = (index) => {
    setCurrentBedIndex(index);
    setNewBed(beds[index]);
    setEditMode(true);
    setNotificationVisible(true);
  };

  const resetNotification = () => {
    setNewBed({
      name: "",
      bedType: "",
      bedGroup: "",
      floor: "",
      status: "",
    });
    setEditMode(false);
    setNotificationVisible(false);
  };

  // Export Functions
  const exportToCopy = () => {
    const textToCopy = beds.map((bed) => `${bed.name}, ${bed.bedType}, ${bed.bedGroup}, ${bed.floor}, ${bed.status}`).join('\n');
    navigator.clipboard.writeText(textToCopy).then(() => {
      alert("Bed list copied to clipboard!");
    });
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(beds);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Beds");
    XLSX.writeFile(workbook, "Beds.xlsx");
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Bed List", 20, 10);
    beds.forEach((bed, index) => {
      doc.text(`${index + 1}. ${bed.name} - ${bed.status}`, 20, 20 + 10 * index);
    });
    doc.save("Beds.pdf");
  };

  const exportToCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      beds.map((bed) => `${bed.name},${bed.bedType},${bed.bedGroup},${bed.floor},${bed.status}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "Beds.csv");
    document.body.appendChild(link); // Required for Firefox
    link.click();
    document.body.removeChild(link); // Remove link after clicking
  };

  const printBeds = () => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write("<html><head><title>Print Bed List</title></head><body>");
    printWindow.document.write("<h2>Bed List</h2><ul>");
    beds.forEach((bed) => {
      printWindow.document.write(`<li>${bed.name} - ${bed.status}</li>`);
    });
    printWindow.document.write("</ul></body></html>");
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="smallcontainer">
      {/* Sidebar */}
      <div className="input-fields-container">
        <button className="category-button" onClick={() => navigate("/setup/bed")}>Bedclass</button>
        <button className="category-button" onClick={() => navigate("/setup/bedclass")}>Bed</button>
        <button className="category-button" onClick={() => navigate("/setup/bedclasstype")}>Bed Type</button>
        <button className="category-button" onClick={() => navigate("/setup/bedgroup")}>Bed Group</button>
        <button className="category-button" onClick={() => navigate("/setup/floor")}>Floor</button>
      </div>

      {/* Bed List Section */}
      <div className="bed-list-container">
        <h2>Bed List</h2>

        {/* Notification Box for Adding/Editing Bed */}
        {notificationVisible && (
          <div className="notification-box">
            <h4>{editMode ? "Edit Bed" : "Add Bed"}</h4>
            <input
              type="text"
              placeholder="Enter bed name"
              value={newBed.name}
              onChange={(e) => setNewBed({ ...newBed, name: e.target.value })}
              required
              style={{ width: "100%", marginBottom: "10px" }}
            />
            <input
              type="text"
              placeholder="Enter bed type"
              value={newBed.bedType}
              onChange={(e) => setNewBed({ ...newBed, bedType: e.target.value })}
              required
              style={{ width: "100%", marginBottom: "10px" }}
            />
            <input
              type="text"
              placeholder="Enter bed group"
              value={newBed.bedGroup}
              onChange={(e) => setNewBed({ ...newBed, bedGroup: e.target.value })}
              required
              style={{ width: "100%", marginBottom: "10px" }}
            />
            <input
              type="text"
              placeholder="Enter floor"
              value={newBed.floor}
              onChange={(e) => setNewBed({ ...newBed, floor: e.target.value })}
              required
              style={{ width: "100%", marginBottom: "10px" }}
            />
            <input
              type="text"
              placeholder="Enter status"
              value={newBed.status}
              onChange={(e) => setNewBed({ ...newBed, status: e.target.value })}
              required
              style={{ width: "100%", marginBottom: "10px" }}
            />
            <div className="notification-buttons">
              <button
                onClick={editMode ? handleEditBed : handleAddBed}
                className="modal-btn"
              >
                Save
              </button>
              <button onClick={resetNotification} className="modal-btn">
                Close
              </button>
            </div>
          </div>
        )}

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by bed name or status..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        {/* Add Bed Button */}
        <div className="add-bed-container" style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", marginBottom: "20px" }}>
          <button onClick={exportToCopy} className="export-btn"><FontAwesomeIcon icon={faCopy}/>Copy
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
          <button onClick={printBeds} className="export-btn">
            <FontAwesomeIcon icon={faPrint} /> Print
          </button>
    

        
        </div>

        {/* Dropdown for Items Per Page */}
        <div className="items-per-page-dropdown" style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", marginBottom: "20px" }}>
          <label htmlFor="itemsPerPage" style={{ marginRight: "10px" }}>Show:</label>
          <select id="itemsPerPage" onChange={handleItemsPerPageChange} value={itemsPerPage}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={100}>100</option>
            <option value="All">All</option>
          </select>
        </div>

        {/* Bed Table */}
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Bed Type</th>
              <th>Bed Group</th>
              <th>Floor</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedBeds.map((bed, index) => (
              <tr key={index}>
                <td>{bed.name}</td>
                <td>{bed.bedType}</td>
                <td>{bed.bedGroup}</td>
                <td>{bed.floor}</td>
                <td>{bed.status}</td>
                <td>
                  <button className="edit-btn" onClick={() => openEditNotification(startIndex + index)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDeleteBed(startIndex + index)}>Delete</button>
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

export default BedclassList;

