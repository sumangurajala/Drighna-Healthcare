
// import React, { useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faCopy,
//   faFileExcel,
//   faFilePdf,
//   faFileCsv,
//   faPrint,
//   faPlus,
// } from "@fortawesome/free-solid-svg-icons";
// import "./Humanresource.css";
// import { useNavigate } from "react-router-dom";

// const LeaveTypeList = () => {
//   const [leaveTypes, setLeaveTypes] = useState([
//     "demo",
//     "Casual Leave",
//     "Privilege Leave",
//     "Sick Leave",
//     "Maternity Leave",
//     "Paternity Leave",
//     "Fever Leave",
//     "Sick Leave",
//     "Privilege Leave",
//     "Paternity Leave",
//     "Maternity Leave",
//     "Fever Leave",
//     "demo",
//   ]);

//   const [searchTerm, setSearchTerm] = useState("");
//   const [newLeaveType, setNewLeaveType] = useState("");
//   const [currentLeaveTypeIndex, setCurrentLeaveTypeIndex] = useState(null); // Track the index of the current leave type being edited
//   const [editMode, setEditMode] = useState(false); // State to determine if we're in edit mode
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(5);
//   const [expandedRows, setExpandedRows] = useState(new Set());
//   const [notificationVisible, setNotificationVisible] = useState(false); // Notification visibility state

//   const filteredLeaveTypes = leaveTypes.filter((type) =>
//     type.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleAddLeaveType = () => {
//     if (newLeaveType.trim() !== "" && !leaveTypes.includes(newLeaveType)) {
//       setLeaveTypes([...leaveTypes, newLeaveType]);
//       setNewLeaveType("");
//       setNotificationVisible(false); // Close the notification
//     } else {
//       alert("Please enter a valid leave type or avoid duplicates.");
//     }
//   };

//   const handleEditLeaveType = () => {
//     if (newLeaveType.trim() !== "" && !leaveTypes.includes(newLeaveType)) {
//       const updatedLeaveTypes = [...leaveTypes];
//       updatedLeaveTypes[currentLeaveTypeIndex] = newLeaveType;
//       setLeaveTypes(updatedLeaveTypes);
//       setNewLeaveType("");
//       setEditMode(false); // Exit edit mode
//       setNotificationVisible(false); // Close the notification
//     } else {
//       alert("Please enter a valid leave type or avoid duplicates.");
//     }
//   };

//   const handleDeleteLeaveType = (index) => {
//     if (window.confirm("Are you sure you want to delete this leave type?")) {
//       setLeaveTypes(leaveTypes.filter((_, i) => i !== index));
//     }
//   };

//   const navigate = useNavigate();

//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const paginatedLeaveTypes = filteredLeaveTypes.slice(
//     startIndex,
//     startIndex + itemsPerPage
//   );
//   const totalPages = Math.ceil(filteredLeaveTypes.length / itemsPerPage);

//   const handleNextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const handlePrevPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   const toggleAllRows = () => {
//     const newExpandedRows = new Set();
//     if (expandedRows.size === paginatedLeaveTypes.length) {
//       setExpandedRows(newExpandedRows);
//     } else {
//       paginatedLeaveTypes.forEach((_, index) => newExpandedRows.add(index));
//       setExpandedRows(newExpandedRows);
//     }
//   };

//   const handleItemsPerPageChange = (event) => {
//     const value = event.target.value;
//     setItemsPerPage(value === "All" ? filteredLeaveTypes.length : Number(value));
//     setCurrentPage(1); // Reset to first page
//   };

//   const openEditNotification = (index) => {
//     setCurrentLeaveTypeIndex(index);
//     setNewLeaveType(leaveTypes[index]); // Set the current leave type to edit
//     setEditMode(true);
//     setNotificationVisible(true); // Show the notification for editing
//   };

//   return (
//     <div className="smallcontainer">
//       {/* Sidebar */}
//       <div className="input-fields-container">
//         <div className="input-field">
//           <button className="category-button" onClick={() => navigate("setup/human-resource")}>
//             Leave Type
//           </button>
//           <br />
//         </div>
//         <div className="input-field">
//           <button
//             className="category-button"
//             onClick={() => navigate("setup/department-list")}
//           >
//             Department
//           </button>
//           <br />
//         </div>
//         <div className="input-field">
//           <button
//             className="category-button"
//             onClick={() => navigate("setup/designation-list")}
//           >
//             Designation
//           </button>
//           <br />
//         </div>
//         <div className="input-field">
//           <button
//             className="category-button"
//             onClick={() => navigate("setup/specialist-list")}
//           >
//             Specialist
//           </button>
//           <br />
//         </div>
//       </div>

//       {/* Leave Type List Section */}
//       <div className="leave-type-list-container">
//         <h2>Charges Details List</h2>

//         {/* Notification Box for Adding/Editing Leave Type */}
//         {notificationVisible && (
//           <div className="notification-box">
//             <h4>{editMode ? "Edit Leave Type" : "Add Leave Type"}</h4>
//             <input
//               type="text"
//               placeholder="Enter leave type"
//               value={newLeaveType}
//               onChange={(e) => setNewLeaveType(e.target.value)}
//               required
//               style={{ width: "100%", marginBottom: "10px" }} // Style for input
//             />
//             <div className="notification-buttons">
//               <button onClick={editMode ? handleEditLeaveType : handleAddLeaveType} className="modal-btn">
//                 Save
//               </button>
//               <button onClick={() => setNotificationVisible(false)} className="modal-btn">
//                 Close
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Search Input */}
//         <input
//           type="text"
//           placeholder="Search..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="search-input"
//         />

//         {/* Add Leave Type Button */}
//         <div
//           className="add-leave-type-container"
//           style={{
//             display: "flex",
//             justifyContent: "flex-end",
//             alignItems: "center",
//             marginBottom: "20px",
//           }}
//         >
//           <button
//             className="add-LeaveTypes-button"
//             onClick={() => {
//               setEditMode(false);
//               setNewLeaveType("");
//               setNotificationVisible(true); // Show notification
//             }} // Reset for adding new leave type
//           >
//             <FontAwesomeIcon icon={faPlus} /> Add Leave Type
//           </button>
//         </div>

//         {/* Export Buttons */}
//         <div
//           className="export-buttons"
//           style={{
//             display: "flex",
//             justifyContent: "flex-end",
//             marginBottom: "20px",
//           }}
//         >
//           <button
//             onClick={() => console.log("Export to Copy")}
//             className="export-btn"
//           >
//             <FontAwesomeIcon icon={faCopy} /> Copy
//           </button>
//           <button
//             onClick={() => console.log("Export to Excel")}
//             className="export-btn"
//           >
//             <FontAwesomeIcon icon={faFileExcel} /> Excel
//           </button>
//           <button
//             onClick={() => console.log("Export to PDF")}
//             className="export-btn"
//           >
//             <FontAwesomeIcon icon={faFilePdf} /> PDF
//           </button>
//           <button
//             onClick={() => console.log("Export to CSV")}
//             className="export-btn"
//           >
//             <FontAwesomeIcon icon={faFileCsv} /> CSV
//           </button>
//           <button
//             onClick={() => console.log("Print")}
//             className="export-btn"
//           >
//             <FontAwesomeIcon icon={faPrint} /> Print
//           </button>
//         </div>

//         {/* Dropdown for Items Per Page */}
//         <div
//           className="items-per-page-dropdown"
//           style={{
//             display: "flex",
//             justifyContent: "flex-end",
//             alignItems: "center",
//             marginBottom: "20px",
//           }}
//         >
//           <label htmlFor="itemsPerPage" style={{ marginRight: "10px" }}>
//             Show:
//           </label>
//           <select
//             id="itemsPerPage"
//             onChange={handleItemsPerPageChange}
//             value={itemsPerPage}
//           >
//             <option value={5}>5</option>
//             <option value={10}>10</option>
//             <option value={25}>25</option>
//             <option value={100}>100</option>
//             <option value="All">All</option>
//           </select>
//         </div>

//         {/* Leave Type List Table */}
//         <div className="leave-list">
//           <table>
//             <thead>
//               <tr>
//                 <th>
//                   Name
//                   <button className="expand-all-button" onClick={toggleAllRows}>
//                     {expandedRows.size === paginatedLeaveTypes.length
//                       ? "▲"
//                       : "▼"}
//                   </button>
//                 </th>
//                 <th>
//                   Action{" "}
//                   <button className="expand-all-button" onClick={toggleAllRows}>
//                     {expandedRows.size === paginatedLeaveTypes.length
//                       ? "▲"
//                       : "▼"}
//                   </button>
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {paginatedLeaveTypes.map((type, index) => (
//                 <tr key={index}>
//                   <td>{type}</td>
//                   <td>
//                     <button className="edit-btn" onClick={() => openEditNotification(startIndex + index)}>
//                       ✏️
//                     </button>
//                     <button
//                       className="delete-btn"
//                       onClick={() => handleDeleteLeaveType(startIndex + index)}
//                     >
//                       🗑️
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           <div className="footer">
//             <p>
//               Records: {startIndex + 1} to{" "}
//               {Math.min(startIndex + itemsPerPage, filteredLeaveTypes.length)} of{" "}
//               {filteredLeaveTypes.length}
//             </p>
//           </div>

//           {/* Pagination */}
//           <div className="pagination">
//             <button onClick={handlePrevPage} disabled={currentPage === 1}>
//               Prev
//             </button>
//             <span>
//               Page {currentPage} of {totalPages}
//             </span>
//             <button onClick={handleNextPage} disabled={currentPage === totalPages}>
//               Next
//             </button>
//           </div>
//         </div>
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
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx"; // Importing the xlsx library
import jsPDF from "jspdf"; // Importing the jsPDF library
import "./Humanresource.css"; // Ensure you have the required CSS for styling

const LeaveTypeList = () => {
  const [leaveTypes, setLeaveTypes] = useState([
    "demo",
    "Casual Leave",
    "Privilege Leave",
    "Sick Leave",
    "Maternity Leave",
    "Paternity Leave",
    "Fever Leave",
    "Sick Leave",
    "Privilege Leave",
    "Paternity Leave",
    "Maternity Leave",
    "Fever Leave",
    "demo",
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [newLeaveType, setNewLeaveType] = useState("");
  const [currentLeaveTypeIndex, setCurrentLeaveTypeIndex] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [notificationVisible, setNotificationVisible] = useState(false);

  const filteredLeaveTypes = leaveTypes.filter((type) =>
    type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddLeaveType = () => {
    if (newLeaveType.trim() !== "" && !leaveTypes.includes(newLeaveType)) {
      setLeaveTypes([...leaveTypes, newLeaveType]);
      resetNotification();
    } else {
      alert("Please enter a valid leave type or avoid duplicates.");
    }
  };

  const handleEditLeaveType = () => {
    if (newLeaveType.trim() !== "" && !leaveTypes.includes(newLeaveType)) {
      const updatedLeaveTypes = [...leaveTypes];
      updatedLeaveTypes[currentLeaveTypeIndex] = newLeaveType;
      setLeaveTypes(updatedLeaveTypes);
      resetNotification();
    } else {
      alert("Please enter a valid leave type or avoid duplicates.");
    }
  };

  const handleDeleteLeaveType = (index) => {
    if (window.confirm("Are you sure you want to delete this leave type?")) {
      setLeaveTypes(leaveTypes.filter((_, i) => i !== index));
    }
  };

  const navigate = useNavigate();

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedLeaveTypes = filteredLeaveTypes.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  const totalPages = Math.ceil(filteredLeaveTypes.length / itemsPerPage);

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
    setItemsPerPage(value === "All" ? filteredLeaveTypes.length : Number(value));
    setCurrentPage(1);
  };

  const openEditNotification = (index) => {
    setCurrentLeaveTypeIndex(index);
    setNewLeaveType(leaveTypes[index]);
    setEditMode(true);
    setNotificationVisible(true);
  };

  const resetNotification = () => {
    setNewLeaveType("");
    setEditMode(false);
    setNotificationVisible(false);
  };

  // Export Functions
  const exportToCopy = () => {
    const textToCopy = leaveTypes.join('\n');
    navigator.clipboard.writeText(textToCopy).then(() => {
      alert("Leave types copied to clipboard!");
    });
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(leaveTypes.map(type => ({ LeaveType: type })));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "LeaveTypes");
    XLSX.writeFile(workbook, "LeaveTypes.xlsx");
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Leave Types List", 20, 10);
    leaveTypes.forEach((type, index) => {
      doc.text(`${index + 1}. ${type}`, 20, 20 + (10 * index));
    });
    doc.save("LeaveTypes.pdf");
  };

  const exportToCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," + leaveTypes.join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "LeaveTypes.csv");
    document.body.appendChild(link); // Required for Firefox
    link.click();
    document.body.removeChild(link); // Remove link after clicking
  };

  const printLeaveTypes = () => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write("<html><head><title>Print Leave Types</title></head><body>");
    printWindow.document.write("<h2>Leave Types List</h2><ul>");
    leaveTypes.forEach(type => {
      printWindow.document.write(`<li>${type}</li>`);
    });
    printWindow.document.write("</ul></body></html>");
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="smallcontainer">
      {/* Sidebar */}
      <div className="input-fields-container">
        <button className="category-button" onClick={() => navigate("/setup/human-resource")}>Leave Type</button>
        <button className="category-button" onClick={() => navigate("/setup/department")}>Department</button>
        <button className="category-button" onClick={() => navigate("/setup/designatio")}>Designation</button>
        <button className="category-button" onClick={() => navigate("/setup/specialist")}>Specialist</button>
      </div>

      {/* Leave Type List Section */}
      <div className="leave-type-list-container">
        <h2>Leave Type List</h2>

        {/* Notification Box for Adding/Editing Leave Type */}
        {notificationVisible && (
          <div className="notification-box">
            <h4>{editMode ? "Edit Leave Type" : "Add Leave Type"}</h4>
            <input
              type="text"
              placeholder="Enter leave type"
              value={newLeaveType}
              onChange={(e) => setNewLeaveType(e.target.value)}
              required
              style={{ width: "100%", marginBottom: "10px" }}
            />
            <div className="notification-buttons">
              <button
                onClick={editMode ? handleEditLeaveType : handleAddLeaveType}
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

        {/* Add Leave Type Button */}
        <div className="add-leave-type-container" style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", marginBottom: "20px" }}>
          <button
            className="add-LeaveTypes-button"
            onClick={() => {
              resetNotification();
              setNotificationVisible(true);
            }}
          >
            <FontAwesomeIcon icon={faPlus} /> Add Leave Type
          </button>
        </div>

        {/* Export Buttons */}
        <div className="export-buttons" style={{ display: "flex", justifyContent: "flex-end", marginBottom: "20px" }}>
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
          <button onClick={printLeaveTypes} className="export-btn">
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

        {/* Leave Type Table */}
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedLeaveTypes.map((type, index) => (
              <tr key={index}>
                <td>{type}</td>
                <td>
                  <button className="edit-btn" onClick={() => openEditNotification(startIndex + index)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDeleteLeaveType(startIndex + index)}>Delete</button>
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

export default LeaveTypeList;
