// // export default DesignationList;
// import React, { useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCopy, faFileExcel, faFilePdf, faFileCsv, faPrint, faPlus } from "@fortawesome/free-solid-svg-icons";
// import './designation.css';

// const DesignationList = () => {
//   const [designations, setDesignations] = useState([
//     "Accountant",
//     "Admin",
//     "Cleaner",
//     "Dietitian",
//     "Doctor",
//     "Driver",
//     "IT Admin",
//     "Nurse",
//     "Pathologist",
//     "Pharmacist",
//     "Radiologist",
//     "Receptionist",
//     "Technical Head"
//   ]);

//   const [searchTerm, setSearchTerm] = useState("");
//   const [newDesignation, setNewDesignation] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(5);
//   const [expandedRows, setExpandedRows] = useState(new Set());
//   const [notificationVisible, setNotificationVisible] = useState(false);
//   const [editMode, setEditMode] = useState(false);
//   const [editDesignationIndex, setEditDesignationIndex] = useState(null);

//   // Filter designations based on search term
//   const filteredDesignations = designations.filter(designation =>
//     designation.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // Add a new designation
//   const handleAddDesignation = () => {
//     if (newDesignation.trim() !== "" && !designations.includes(newDesignation)) {
//       setDesignations([...designations, newDesignation]);
//       setNewDesignation("");
//       setNotificationVisible(false);
//     } else {
//       alert("Please enter a valid designation or avoid duplicates.");
//     }
//   };

//   // Edit an existing designation
//   const handleEditDesignation = () => {
//     if (editDesignationIndex !== null && newDesignation.trim() !== "" && !designations.includes(newDesignation)) {
//       const updatedDesignations = [...designations];
//       updatedDesignations[editDesignationIndex] = newDesignation.trim();
//       setDesignations(updatedDesignations);
//       setNewDesignation("");
//       setNotificationVisible(false);
//       setEditMode(false);
//       setEditDesignationIndex(null);
//     } else {
//       alert("Please enter a valid designation or avoid duplicates.");
//     }
//   };

//   // Pagination logic
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const paginatedDesignations = filteredDesignations.slice(startIndex, startIndex + itemsPerPage);
//   const totalPages = Math.ceil(filteredDesignations.length / itemsPerPage);

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

//   const toggleRow = (index) => {
//     setExpandedRows((prevRows) => {
//       const newRows = new Set(prevRows);
//       if (newRows.has(index)) {
//         newRows.delete(index);
//       } else {
//         newRows.add(index);
//       }
//       return newRows;
//     });
//   };

//   const toggleAllRows = () => {
//     if (expandedRows.size === paginatedDesignations.length) {
//       setExpandedRows(new Set());
//     } else {
//       setExpandedRows(new Set(paginatedDesignations.map((_, index) => index)));
//     }
//   };

//   // Change items per page
//   const handleItemsPerPageChange = (count) => {
//     setItemsPerPage(count);
//     setCurrentPage(1);
//   };

//   const handleDeleteDesignation = (index) => {
//     const confirmDelete = window.confirm("Are you sure you want to delete this designation?");
//     if (confirmDelete) {
//       setDesignations(designations.filter((_, i) => i !== index));
//     }
//   };

//   return (
//     <div>
//       <div className="designation-list-container">
//         <h2>Designation List</h2>

//         {/* Notification Box for Adding/Editing Designation */}
//         {notificationVisible && (
//           <div className="notification-box">
//             <h4>{editMode ? "Edit Designation" : "Add New Designation"}</h4>
//             <input
//               type="text"
//               placeholder="Enter designation name"
//               value={newDesignation}
//               onChange={(e) => setNewDesignation(e.target.value)}
//               required
//               style={{ width: "100%", marginBottom: "10px" }}
//             />
//             <div className="notification-buttons">
//               <button onClick={editMode ? handleEditDesignation : handleAddDesignation} className="modal-btn">
//                 {editMode ? "Update" : "Save"}
//               </button>
//               <button onClick={() => {
//                 setNotificationVisible(false);
//                 setEditMode(false);
//                 setNewDesignation(""); // Clear input
//               }} className="modal-btn">Cancel</button>
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

//         {/* Add Designation Button */}
//         <div className="add-designation-container" style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", marginBottom: "20px" }}>
//           <button className="add-designation-button" onClick={() => {
//             setNotificationVisible(true);
//             setEditMode(false); // Ensure we are in add mode
//             setNewDesignation(""); // Clear input
//           }}>
//             <FontAwesomeIcon icon={faPlus} /> Add Designation
//           </button>
//         </div>

//         {/* Items Count Selector */}
//         <div className="items-count-selector" style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", marginBottom: "20px" }}>
//           <button
//             onClick={() => handleItemsPerPageChange(filteredDesignations.length)}
//             className={`items-count-button ${itemsPerPage === filteredDesignations.length ? 'active' : ''}`}
//             style={{ marginLeft: '10px' }}
//           >
//             All
//           </button>
//         </div>

//         {/* Export Buttons */}
//         <div className="export-buttons">
//           <button onClick={() => console.log("Export to Copy")}>
//             <FontAwesomeIcon icon={faCopy} />
//           </button>
//           <button onClick={() => console.log("Export to Excel")}>
//             <FontAwesomeIcon icon={faFileExcel} />
//           </button>
//           <button onClick={() => console.log("Export to PDF")}>
//             <FontAwesomeIcon icon={faFilePdf} />
//           </button>
//           <button onClick={() => console.log("Export to CSV")}>
//             <FontAwesomeIcon icon={faFileCsv} />
//           </button>
//           <button onClick={() => console.log("Print")}>
//             <FontAwesomeIcon icon={faPrint} />
//           </button>
//         </div>

//         {/* Designation List Table */}
//         <div className="designation-list">
//           <table>
//             <thead>
//               <tr>
//                 <th>
//                   Designation
//                   <button className="expand-all-button" onClick={toggleAllRows}>
//                     {expandedRows.size === paginatedDesignations.length ? '▲' : '▼'}
//                   </button>
//                 </th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {paginatedDesignations.map((designation, index) => (
//                 <React.Fragment key={index}>
//                   <tr onClick={() => toggleRow(index)} style={{ cursor: 'pointer' }}>
//                     <td>{designation}</td>
//                     <td>
//                       <button className="edit-btn" onClick={() => {
//                         setNotificationVisible(true);
//                         setEditMode(true);
//                         setEditDesignationIndex(startIndex + index);
//                         setNewDesignation(designation); // Set the current designation for editing
//                       }}>✏️ Edit</button>
//                       <button className="delete-btn" onClick={() => handleDeleteDesignation(startIndex + index)}>🗑️ Delete</button>
//                     </td>
//                   </tr>
//                 </React.Fragment>
//               ))}
//             </tbody>
//           </table>

//           <div className="footer">
//             <p>Records: {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredDesignations.length)} of {filteredDesignations.length}</p>
//           </div>

//           {/* Pagination */}
//           <div className="pagination">
//             <button onClick={handlePrevPage} disabled={currentPage === 1}>
//               Prev
//             </button>
//             <button onClick={handleNextPage} disabled={currentPage === totalPages}>
//               Next
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DesignationList;

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faFileExcel, faFilePdf, faFileCsv, faPrint, faPlus } from "@fortawesome/free-solid-svg-icons";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import './designation.css';

const DesignationList = () => {
  const [designations, setDesignations] = useState([
    "Accountant",
    "Admin",
    "Cleaner",
    "Dietitian",
    "Doctor",
    "Driver",
    "IT Admin",
    "Nurse",
    "Pathologist",
    "Pharmacist",
    "Radiologist",
    "Receptionist",
    "Technical Head"
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [newDesignation, setNewDesignation] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [expandedRows, setExpandedRows] = useState(new Set());
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editDesignationIndex, setEditDesignationIndex] = useState(null);

  const filteredDesignations = designations.filter(designation =>
    designation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Add a new designation
  const handleAddDesignation = () => {
    if (newDesignation.trim() !== "" && !designations.includes(newDesignation)) {
      setDesignations([...designations, newDesignation]);
      setNewDesignation("");
      setNotificationVisible(false);
    } else {
      alert("Please enter a valid designation or avoid duplicates.");
    }
  };

  // Edit an existing designation
  const handleEditDesignation = () => {
    if (editDesignationIndex !== null && newDesignation.trim() !== "" && !designations.includes(newDesignation)) {
      const updatedDesignations = [...designations];
      updatedDesignations[editDesignationIndex] = newDesignation.trim();
      setDesignations(updatedDesignations);
      setNewDesignation("");
      setNotificationVisible(false);
      setEditMode(false);
      setEditDesignationIndex(null);
    } else {
      alert("Please enter a valid designation or avoid duplicates.");
    }
  };

  // Pagination logic
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedDesignations = filteredDesignations.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(filteredDesignations.length / itemsPerPage);

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
    if (expandedRows.size === paginatedDesignations.length) {
      setExpandedRows(new Set());
    } else {
      setExpandedRows(new Set(paginatedDesignations.map((_, index) => index)));
    }
  };

  // Change items per page
  const handleItemsPerPageChange = (count) => {
    setItemsPerPage(count);
    setCurrentPage(1);
  };

  const handleDeleteDesignation = (index) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this designation?");
    if (confirmDelete) {
      setDesignations(designations.filter((_, i) => i !== index));
    }
  };

  // Export to Excel
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredDesignations.map(designation => ({ Designation: designation })));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Designations");
    XLSX.writeFile(wb, "designations.xlsx");
  };

  // Export to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Designation List", 14, 16);
    filteredDesignations.forEach((designation, index) => {
      doc.text(`${index + 1}. ${designation}`, 14, 20 + (index * 10));
    });
    doc.save("designations.pdf");
  };

  // Export to CSV
  const exportToCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," + filteredDesignations.join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "designations.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Copy to Clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(filteredDesignations.join(", ")).then(() => {
      alert("Copied to clipboard!");
    });
  };

  return (
    <div>
      <div className="designation-list-container">
        <h2>Designation List</h2>

        {/* Notification Box for Adding/Editing Designation */}
        {notificationVisible && (
          <div className="notification-box">
            <h4>{editMode ? "Edit Designation" : "Add New Designation"}</h4>
            <input
              type="text"
              placeholder="Enter designation name"
              value={newDesignation}
              onChange={(e) => setNewDesignation(e.target.value)}
              required
              style={{ width: "100%", marginBottom: "10px" }}
            />
            <div className="notification-buttons">
              <button onClick={editMode ? handleEditDesignation : handleAddDesignation} className="modal-btn">
                {editMode ? "Update" : "Save"}
              </button>
              <button onClick={() => {
                setNotificationVisible(false);
                setEditMode(false);
                setNewDesignation(""); // Clear input
              }} className="modal-btn">Cancel</button>
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

        {/* Add Designation Button */}
        <div className="add-designation-container" style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", marginBottom: "20px" }}>
          <button className="add-designation-button" onClick={() => {
            setNotificationVisible(true);
            setEditMode(false); // Ensure we are in add mode
            setNewDesignation(""); // Clear input
          }}>
            <FontAwesomeIcon icon={faPlus} /> Add Designation
          </button>
        </div>

        {/* Items Count Selector */}
        <div className="items-count-selector" style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", marginBottom: "20px" }}>
          <button
            onClick={() => handleItemsPerPageChange(filteredDesignations.length)}
            className={`items-count-button ${itemsPerPage === filteredDesignations.length ? 'active' : ''}`}
            style={{ marginLeft: '10px' }}
          >
            All
          </button>
        </div>

        {/* Export Buttons */}
        <div className="export-buttons">
          <button onClick={copyToClipboard}>
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
          <button onClick={() => window.print()}>
            <FontAwesomeIcon icon={faPrint} />
          </button>
        </div>

        {/* Designation List Table */}
        <div className="designation-list">
          <table>
            <thead>
              <tr>
                <th>
                  Designation
                  <button className="expand-all-button" onClick={toggleAllRows}>
                    {expandedRows.size === paginatedDesignations.length ? '▲' : '▼'}
                  </button>
                </th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedDesignations.map((designation, index) => (
                <React.Fragment key={index}>
                  <tr onClick={() => toggleRow(index)} style={{ cursor: 'pointer' }}>
                    <td>{designation}</td>
                    <td>
                      <button className="edit-btn" onClick={() => {
                        setNotificationVisible(true);
                        setEditMode(true);
                        setEditDesignationIndex(startIndex + index);
                        setNewDesignation(designation); // Set the current designation for editing
                      }}>✏️ Edit</button>
                      <button className="delete-btn" onClick={() => handleDeleteDesignation(startIndex + index)}>🗑️ Delete</button>
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>

          <div className="footer">
            <p>Records: {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredDesignations.length)} of {filteredDesignations.length}</p>
          </div>

          {/* Pagination */}
          <div className="pagination">
            <button onClick={handlePrevPage} disabled={currentPage === 1}>
              Prev
            </button>
            <button onClick={handleNextPage} disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignationList;
