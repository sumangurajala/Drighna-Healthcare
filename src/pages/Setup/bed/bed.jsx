// import React, { useState } from "react";
// import DataTable from "react-data-table-component";
// import DataTableExtensions from "react-data-table-component-extensions";
// import { TextField, Button, Checkbox, IconButton } from "@mui/material";
// import { Edit, Delete,Print } from "@mui/icons-material";
// import "react-data-table-component-extensions/dist/index.css";
// import * as XLSX from 'xlsx';
// import { saveAs } from 'file-saver';

// const initialBeds = [
//   { name: "NICU-302", bedType: "Standard", bedGroup: "NICU - 3rd Floor", used: true },
//   { name: "FF-102", bedType: "NORMAL", bedGroup: "General Ward - 1st Floor", used: true },
//   { name: "FF-103", bedType: "NORMAL", bedGroup: "General Ward - 1st Floor", used: true },
//   { name: "GF-001", bedType: "Standard", bedGroup: "VIP Ward - Ground Floor", used: true },
//   { name: "GF-002", bedType: "VIP", bedGroup: "VIP Ward - Ground Floor", used: false },
// ];

// const BedList = () => {
//   const [beds, setBeds] = useState(initialBeds);
//   const [search, setSearch] = useState("");

//   const handleDelete = (name) => {
//     setBeds(beds.filter((bed) => bed.name !== name));
//   };

//   const handleEdit = (name) => {
//     alert(`Edit bed: ${name}`);
//   };

//   const handleSearchChange = (event) => {
//     setSearch(event.target.value);
//   };

//   const filteredBeds = beds.filter((bed) =>
//     bed.name.toLowerCase().includes(search.toLowerCase())
//   );

//   const columns = [
//     {
//       name: "Name",
//       selector: (row) => row.name,
//       sortable: true,
//     },
//     {
//       name: "Bed Type",
//       selector: (row) => row.bedType,
//       sortable: true,
//     },
//     {
//       name: "Bed Group",
//       selector: (row) => row.bedGroup,
//       sortable: true,
//     },
//     {
//       name: "Used",
//       cell: (row) => <Checkbox checked={row.used} disabled />,
//       sortable: true,
//     },
//     {
//       name: "Actions",
//       cell: (row) => (
//         <div>
//           <IconButton onClick={() => handleEdit(row.name)}>
//             <Edit />
//           </IconButton>
//           <IconButton onClick={() => handleDelete(row.name)}>
//             <Delete />
//           </IconButton>
//         </div>
//       ),
//     },
//   ];

//   // Export to Excel function
//   const exportToExcel = () => {
//     const worksheet = XLSX.utils.json_to_sheet(filteredBeds);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Beds");
//     const excelBuffer = XLSX.write(workbook, {
//       bookType: "xlsx",
//       type: "array",
//     });
//     const data = new Blob([excelBuffer], { type: "application/octet-stream" });
//     saveAs(data, "BedList.xlsx");
//   };

//   // Export to CSV function
//   const exportToCSV = () => {
//     const worksheet = XLSX.utils.json_to_sheet(filteredBeds);
//     const csvData = XLSX.utils.sheet_to_csv(worksheet);
//     const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
//     saveAs(blob, "BedList.csv");
//   };

//   // Copy to Clipboard function
//   const copyToClipboard = () => {
//     const textToCopy = filteredBeds.map(
//       (bed) => `${bed.name}, ${bed.bedType}, ${bed.bedGroup}, ${bed.used ? "Used" : "Not Used"}`
//     ).join("\n");
//     navigator.clipboard.writeText(textToCopy).then(() => {
//       alert("Bed data copied to clipboard!");
//     });
//   };

//   // Print function
//   const printBeds = () => {
//     const printWindow = window.open("", "_blank");
//     printWindow.document.write("<html><head><title>Print Beds</title></head><body>");
//     printWindow.document.write("<h2>Bed List</h2><ul>");
//     filteredBeds.forEach((bed) => {
//       printWindow.document.write(`<li>${bed.name}, ${bed.bedType}, ${bed.bedGroup}, ${bed.used ? "Used" : "Not Used"}</li>`);
//     });
//     printWindow.document.write("</ul></body></html>");
//     printWindow.document.close();
//     printWindow.print();
//   };

//   const tableData = {
//     columns,
//     data: filteredBeds,
//   };

//   return (
//     <div style={{ padding: "16px" }}>
//       <TextField
//         label="Search"
//         value={search}
//         onChange={handleSearchChange}
//         fullWidth
//         style={{ marginBottom: 16 }}
//       />
//       <Button variant="contained" color="primary" style={{ marginBottom: 16 }}>
//         Add Bed
//       </Button>
//       <DataTableExtensions
//         {...tableData}
//         exportHeaders
//         export={false}
//         print={false}
//       >
//         <DataTable
//           columns={columns}
//           data={filteredBeds}
//           pagination
//           highlightOnHover
//           dense
//         />
//       </DataTableExtensions>
//       <div style={{ marginTop: 16 }}>
//         <Button variant="outlined" color="primary" onClick={exportToExcel}>
//           Export to Excel
//         </Button>
//         <Button variant="outlined" color="primary" onClick={exportToCSV} style={{ marginLeft: 8 }}>
//           Export to CSV
//         </Button>
//         <Button variant="outlined" color="primary" onClick={copyToClipboard} style={{ marginLeft: 8 }}>
//           Copy to Clipboard
//         </Button>
//         <Button variant="outlined" color="primary" onClick={printBeds} style={{ marginLeft: 8 }}>
//           Print
//         </Button>
//       </div>
//     </div>
//   );
// };

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
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "./bed.css";

const BedclassList = () => {
  const [beds, setBeds] = useState([
    { name: "NICU-302", bedType: "Standard", bedGroup: "NICU - 3rd Floor", used:""},
    { name: "FF-102", bedType: "NORMAL", bedGroup: "General Ward - 1st Floor", used:"" },
    { name: "FF-103", bedType: "NORMAL", bedGroup: "General Ward - 1st Floor",used:"" },
    { name: "GF-001", bedType: "Standard", bedGroup: "VIP Ward - Ground Floor", used:""},
    { name: "GF-002", bedType: "VIP", bedGroup: "VIP Ward - Ground Floor",used:"" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [newBed, setNewBed] = useState({
    name: "",
    bedType: "",
    bedGroup: "",
    used:'',
  });
  const [currentBedIndex, setCurrentBedIndex] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [notificationVisible, setNotificationVisible] = useState(false);

  // Filter beds based on search term
  const filteredBeds = beds.filter(
    (bed) =>
      bed.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (bed.used ? "used" : "unused").includes(searchTerm.toLowerCase())
  );

  // Handle adding a new bed
  const handleAddBed = () => {
    if (newBed.name && !beds.some((bed) => bed.name === newBed.name)) {
      setBeds([...beds, newBed]);
      resetNotification();
    } else {
      alert("Please enter valid bed details or avoid duplicates.");
    }
  };

  // Handle editing an existing bed
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

  // Handle deleting a bed
  const handleDeleteBed = (index) => {
    if (window.confirm("Are you sure you want to delete this bed?")) {
      setBeds(beds.filter((_, i) => i !== index));
    }
  };

 

  // Pagination handling
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

  // Open the notification for editing
  const openEditNotification = (index) => {
    setCurrentBedIndex(index);
    setNewBed(beds[index]);
    setEditMode(true);
    setNotificationVisible(true);
  };

  // Reset the notification state
  const resetNotification = () => {
    setNewBed({
      name: "",
      bedType: "",
      bedGroup: "",
      floor: "",
      used: false,
    });
    setEditMode(false);
    setNotificationVisible(false);
  };

  // Export Functions
  const exportToCopy = () => {
    const textToCopy = beds
      .map((bed) => `${bed.name}, ${bed.bedType}, ${bed.bedGroup}, ${bed.floor}, ${bed.used}`)
      .join("\n");
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
      doc.text(`${index + 1}. ${bed.name} - ${bed.used ? "Used" : "Not Used"}`, 20, 20 + 10 * index);
    });
    doc.save("Beds.pdf");
  };

  const exportToCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      beds.map((bed) => `${bed.name},${bed.bedType},${bed.bedGroup},${bed.floor},${bed.used}`).join("\n");
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
      printWindow.document.write(`<li>${bed.name} - ${bed.used ? "Used" : "Not Used"}</li>`);
    });
    printWindow.document.write("</ul></body></html>");
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="smallcontainer">
      {/* Bed List Section */}
      <div className="bed-list-container">
        <h2>Bed List</h2>

        {/* Notification Box for Adding/Editing Bed */}
        {notificationVisible && (
          <div className="notification-box">
            <h4>{editMode ? "Edit Bed" : "Add Bed"}</h4>

            {/* Bed Name Input */}
            <input
              type="text"
              placeholder="Enter bed name"
              value={newBed.name}
              onChange={(e) => setNewBed({ ...newBed, name: e.target.value })}
              required
              style={{ width: "100%", marginBottom: "10px" }}
            />

            {/* Bed Type Dropdown */}
            <select
              value={newBed.bedType}
              onChange={(e) => setNewBed({ ...newBed, bedType: e.target.value })}
              required
              style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
            >
              <option value="">Select Bed Type</option> {/* Default Option */}
              <option value="Standard">Standard</option>
              <option value="VIP">VIP</option>
              <option value="NORMAL">NORMAL</option>
              <option value="demo">demo</option>
            </select>

            {/* Bed Group Dropdown */}
            <select
              value={newBed.bedGroup}
              onChange={(e) => setNewBed({ ...newBed, bedGroup: e.target.value })}
              required
              style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
            >
              <option value="">Select Bed Group</option> {/* Default Option */}
              <option value="NICU - 3rd Floor">NICU - 3rd Floor</option>
              <option value="General Ward - 1st Floor">General Ward - 1st Floor</option>
              <option value="VIP Ward - Ground Floor">VIP Ward - Ground Floor</option>
              <option value="demo">demo</option>
            </select>

            {/* Floor Input */}
            <input
              type="text"
              placeholder="Enter floor"
              value={newBed.floor}
              onChange={(e) => setNewBed({ ...newBed, floor: e.target.value })}
              required
              style={{ width: "100%", marginBottom: "10px" }}
            />

            {/* Used Checkbox */}
            <div style={{ marginBottom: "10px" }}>
              <input
                type="checkbox"
                checked={newBed.used}
                onChange={(e) => setNewBed({ ...newBed, used: e.target.checked })}
              />
              <label style={{ marginLeft: "10px" }}>Mark as Used</label>
            </div>

            {/* Save and Close Buttons */}
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

        {/* Export and Add Bed Button */}
        <div
          className="add-bed-container"
          style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}
        >
          <div>
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
            <button onClick={printBeds} className="export-btn">
              <FontAwesomeIcon icon={faPrint} /> Print
            </button>
          </div>
          <button
            onClick={() => setNotificationVisible(true)} // Display notification when clicked
            className="add-bed-btn"
            style={{
              backgroundColor: "#007bff",
              color: "#fff",
              borderRadius: "5px",
              padding: "10px 20px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
            }}
          >
            <FontAwesomeIcon icon={faPlus} style={{ marginRight: "10px" }} />
            Add Bed
          </button>
        </div>

        {/* Dropdown for Items Per Page */}
        <div
          className="items-per-page-dropdown"
          style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", marginBottom: "20px" }}
        >
          <label htmlFor="itemsPerPage" style={{ marginRight: "10px" }}>
            Show:
          </label>
          <select id="itemsPerPage" onChange={handleItemsPerPageChange} value={itemsPerPage}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={100}>100</option>
            <option value="All">All</option>
          </select>
        </div>

        {/* Bed Table */}
      {/* Bed Table */}
<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Bed Type</th>
      <th>Bed Group</th>
      <th>Used</th> {/* Added Used column header */}
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    {paginatedBeds.map((bed, index) => (
      <tr key={index}>
        <td>{bed.name}</td>
        <td>{bed.bedType}</td>
        <td>{bed.bedGroup}</td>
        
        {/* Display checkbox to indicate if bed is used */}
        <td>
          <input
            type="checkbox"
             // This makes the checkbox non-editable
          />
        </td>

        <td>
          <button className="edit-btn" onClick={() => openEditNotification(startIndex + index)}>
            Edit
          </button>
          <button className="delete-btn" onClick={() => handleDeleteBed(startIndex + index)}>
            Delete
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>


        {/* Pagination Controls */}
        <div className="pagination-controls">
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
            Previous
          </button>
          <span>{` Page ${currentPage} of ${totalPages} `}</span>
          <button onClick={handleNextPage} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default BedclassList;

