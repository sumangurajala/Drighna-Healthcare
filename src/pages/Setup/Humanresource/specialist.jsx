// // export default SpecialistList;

// import React, { useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCopy, faFileExcel, faFilePdf, faFileCsv, faPrint, faPlus } from "@fortawesome/free-solid-svg-icons";
// import './specialist.css';

// const SpecialistList = () => {
//   const [specialists, setSpecialists] = useState([
//     "Pediatrician",
//     "Ophthalmologists",
//     "Neuroradiology",
//     "Nephrologist",
//     "Gastroenterologists",
//     "ENT",
//     "Endocrinologists",
//     "Dermatologists",
//     "Dermatologist",
//     "Cardiologists",
//     "Anesthesiologist"
//   ]);

//   const [searchTerm, setSearchTerm] = useState("");
//   const [newSpecialist, setNewSpecialist] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(5);
//   const [expandedRows, setExpandedRows] = useState(new Set());
//   const [notificationVisible, setNotificationVisible] = useState(false); // State for adding new specialist
//   const [editMode, setEditMode] = useState(false); // State for edit mode
//   const [currentSpecialistIndex, setCurrentSpecialistIndex] = useState(null); // Index of the specialist being edited

//   const filteredSpecialists = specialists.filter(specialist =>
//     specialist.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleAddSpecialist = () => {
//     if (newSpecialist.trim() !== "" && !specialists.includes(newSpecialist)) {
//       setSpecialists([...specialists, newSpecialist]);
//       setNewSpecialist("");
//       setNotificationVisible(false); // Close notification after adding
//     } else {
//       alert("Please enter a valid specialist name or avoid duplicates.");
//     }
//   };

//   const handleEditSpecialist = () => {
//     if (newSpecialist.trim() !== "" && !specialists.includes(newSpecialist)) {
//       const updatedSpecialists = [...specialists];
//       updatedSpecialists[currentSpecialistIndex] = newSpecialist;
//       setSpecialists(updatedSpecialists);
//       setNewSpecialist("");
//       setEditMode(false);
//       setNotificationVisible(false); // Close notification after editing
//     } else {
//       alert("Please enter a valid specialist name or avoid duplicates.");
//     }
//   };

//   const handleDeleteSpecialist = (index) => {
//     if (window.confirm("Are you sure you want to delete this specialist?")) {
//       setSpecialists(specialists.filter((_, i) => i !== index));
//     }
//   };

//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const paginatedSpecialists = filteredSpecialists.slice(startIndex, startIndex + itemsPerPage);
//   const totalPages = Math.ceil(filteredSpecialists.length / itemsPerPage);

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
//         newRows.delete(index); // Collapse the row
//       } else {
//         newRows.add(index); // Expand the row
//       }
//       return newRows;
//     });
//   };

//   const toggleAllRows = () => {
//     if (expandedRows.size === filteredSpecialists.length) {
//       setExpandedRows(new Set()); // Collapse all
//     } else {
//       setExpandedRows(new Set(filteredSpecialists.map((_, index) => index))); // Expand all
//     }
//   };

//   const handleItemsPerPageChange = (count) => {
//     setItemsPerPage(count);
//     setCurrentPage(1); // Reset to the first page
//   };

//   const openEditNotification = (index) => {
//     setCurrentSpecialistIndex(index);
//     setNewSpecialist(specialists[index]); // Set the name of the selected specialist
//     setEditMode(true);
//     setNotificationVisible(true); // Show the notification for editing
//   };

//   return (
//     <div className="specialist-list-container">
//       <h2>Specialist List</h2>

//       {/* Notification Box for Adding/Editing Specialist */}
//       {notificationVisible && (
//         <div className="notification-box">
//           <h4>{editMode ? "Edit Specialist" : "Add New Specialist"}</h4>
//           <input
//             type="text"
//             placeholder="Enter specialist name"
//             value={newSpecialist}
//             onChange={(e) => setNewSpecialist(e.target.value)}
//             required
//             style={{ width: "100%", marginBottom: "10px" }}
//           />
//           <div className="notification-buttons">
//             <button onClick={editMode ? handleEditSpecialist : handleAddSpecialist} className="modal-btn">Save</button>
//             <button onClick={() => setNotificationVisible(false)} className="modal-btn">Cancel</button>
//           </div>
//         </div>
//       )}

//       {/* Search Input */}
//       <input
//         type="text"
//         placeholder="Search..."
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         className="search-input"
//       />

//       {/* Add Specialist Button */}
//       <div className="add-specialist-container">
//         <button className="add-specialist-button" onClick={() => {
//           setEditMode(false);
//           setNewSpecialist("");
//           setNotificationVisible(true);
//         }}>
//           <FontAwesomeIcon icon={faPlus} /> Add Specialist
//         </button>
//       </div>

//       {/* Items Count Selector */}
//       <div className="items-count-selector" style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", marginBottom: "20px" }}>
//         <button 
//           onClick={() => handleItemsPerPageChange(filteredSpecialists.length)} 
//           className={`items-count-button ${itemsPerPage === filteredSpecialists.length ? 'active' : ''}`}
//           style={{ marginLeft: '10px' }} 
//         >
//           All
//         </button>
//       </div>

//       {/* Export Buttons */}
//       <div className="export-buttons">
//         <button onClick={() => console.log("Export to Copy")}>
//           <FontAwesomeIcon icon={faCopy} />
//         </button>
//         <button onClick={() => console.log("Export to Excel")}>
//           <FontAwesomeIcon icon={faFileExcel} />
//         </button>
//         <button onClick={() => console.log("Export to PDF")}>
//           <FontAwesomeIcon icon={faFilePdf} />
//         </button>
//         <button onClick={() => console.log("Export to CSV")}>
//           <FontAwesomeIcon icon={faFileCsv} />
//         </button>
//         <button onClick={() => console.log("Print")}>
//           <FontAwesomeIcon icon={faPrint} />
//         </button>
//       </div>

//       {/* Specialist List Table */}
//       <div className="specialist-list">
//         <table>
//           <thead>
//             <tr>
//               <th>
//                 Specialist
//                 <button className="expand-all-button" onClick={toggleAllRows}>
//                   {expandedRows.size === filteredSpecialists.length ? '▲' : '▼'}
//                 </button>
//               </th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {paginatedSpecialists.map((specialist, index) => (
//               <React.Fragment key={index}>
//                 <tr onClick={() => toggleRow(index)} style={{ cursor: 'pointer' }}>
//                   <td>{specialist}</td>
//                   <td>
//                     <button className="edit-btn" onClick={() => openEditNotification(index)}>✏️</button>
//                     <button className="delete-btn" onClick={() => handleDeleteSpecialist(index)}>🗑️</button>
//                   </td>
//                 </tr>
//                 {expandedRows.has(index) && (
//                   <tr>
//                     <td colSpan="2" style={{ backgroundColor: '#f9f9f9' }}>
//                       {/* Add any expanded row content here */}
//                     </td>
//                   </tr>
//                 )}
//               </React.Fragment>
//             ))}
//           </tbody>
//         </table>

//         <div className="footer">
//           <p>Records: {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredSpecialists.length)} of {filteredSpecialists.length}</p>
//         </div>

//         {/* Pagination */}
//         <div className="pagination">
//           <button onClick={handlePrevPage} disabled={currentPage === 1}>
//             Prev
//           </button>
//           <button onClick={handleNextPage} disabled={currentPage === totalPages}>
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SpecialistList;
// // export default SpecialistList;


import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faFileExcel, faFilePdf, faFileCsv, faPrint, faPlus } from "@fortawesome/free-solid-svg-icons";
import * as XLSX from "xlsx"; // For Excel export
import jsPDF from "jspdf"; // For PDF export
import './specialist.css';

const SpecialistList = () => {
  const [specialists, setSpecialists] = useState([
    "Pediatrician",
    "Ophthalmologists",
    "Neuroradiology",
    "Nephrologist",
    "Gastroenterologists",
    "ENT",
    "Endocrinologists",
    "Dermatologists",
    "Dermatologist",
    "Cardiologists",
    "Anesthesiologist"
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [newSpecialist, setNewSpecialist] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [expandedRows, setExpandedRows] = useState(new Set());
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentSpecialistIndex, setCurrentSpecialistIndex] = useState(null);

  const filteredSpecialists = specialists.filter(specialist =>
    specialist.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddSpecialist = () => {
    if (newSpecialist.trim() !== "" && !specialists.includes(newSpecialist)) {
      setSpecialists([...specialists, newSpecialist]);
      setNewSpecialist("");
      setNotificationVisible(false);
    } else {
      alert("Please enter a valid specialist name or avoid duplicates.");
    }
  };

  const handleEditSpecialist = () => {
    if (newSpecialist.trim() !== "" && !specialists.includes(newSpecialist)) {
      const updatedSpecialists = [...specialists];
      updatedSpecialists[currentSpecialistIndex] = newSpecialist;
      setSpecialists(updatedSpecialists);
      setNewSpecialist("");
      setEditMode(false);
      setNotificationVisible(false);
    } else {
      alert("Please enter a valid specialist name or avoid duplicates.");
    }
  };

  const handleDeleteSpecialist = (index) => {
    if (window.confirm("Are you sure you want to delete this specialist?")) {
      setSpecialists(specialists.filter((_, i) => i !== index));
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedSpecialists = filteredSpecialists.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(filteredSpecialists.length / itemsPerPage);

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
    if (expandedRows.size === filteredSpecialists.length) {
      setExpandedRows(new Set());
    } else {
      setExpandedRows(new Set(filteredSpecialists.map((_, index) => index)));
    }
  };

  const handleItemsPerPageChange = (count) => {
    setItemsPerPage(count);
    setCurrentPage(1);
  };

  const openEditNotification = (index) => {
    setCurrentSpecialistIndex(index);
    setNewSpecialist(specialists[index]);
    setEditMode(true);
    setNotificationVisible(true);
  };

  // New Functions for Exporting
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(specialists.map(specialist => ({ Specialist: specialist })));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Specialists");
    XLSX.writeFile(wb, "specialists.xlsx");
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Specialist List", 14, 16);
    const text = filteredSpecialists.join("\n");
    doc.text(text, 14, 30);
    doc.save("specialists.pdf");
  };

  const exportToCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," + specialists.join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "specialists.csv");
    document.body.appendChild(link);
    link.click();
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(filteredSpecialists.join(", "))
      .then(() => {
        alert("Specialists copied to clipboard!");
      })
      .catch(err => {
        console.error("Failed to copy: ", err);
      });
  };

  const printSpecialists = () => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Specialists</title>
          <style>
            body { font-family: Arial, sans-serif; }
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #000; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
          </style>
        </head>
        <body>
          <h2>Specialist List</h2>
          <table>
            <tr><th>Specialist</th></tr>
            ${filteredSpecialists.map(specialist => `<tr><td>${specialist}</td></tr>`).join("")}
          </table>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="specialist-list-container">
      <h2>Specialist List</h2>

      {notificationVisible && (
        <div className="notification-box">
          <h4>{editMode ? "Edit Specialist" : "Add New Specialist"}</h4>
          <input
            type="text"
            placeholder="Enter specialist name"
            value={newSpecialist}
            onChange={(e) => setNewSpecialist(e.target.value)}
            required
            style={{ width: "100%", marginBottom: "10px" }}
          />
          <div className="notification-buttons">
            <button onClick={editMode ? handleEditSpecialist : handleAddSpecialist} className="modal-btn">Save</button>
            <button onClick={() => setNotificationVisible(false)} className="modal-btn">Cancel</button>
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

      <div className="add-specialist-container">
        <button className="add-specialist-button" onClick={() => {
          setEditMode(false);
          setNewSpecialist("");
          setNotificationVisible(true);
        }}>
          <FontAwesomeIcon icon={faPlus} /> Add Specialist
        </button>
      </div>

      <div className="items-count-selector" style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", marginBottom: "20px" }}>
        <button
          onClick={() => handleItemsPerPageChange(filteredSpecialists.length)}
          className={`items-count-button ${itemsPerPage === filteredSpecialists.length ? 'active' : ''}`}
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
        <button onClick={printSpecialists}>
          <FontAwesomeIcon icon={faPrint} />
        </button>
      </div>

      <div className="specialist-list">
        <table>
          <thead>
            <tr>
              <th>
                Specialist
                <button className="expand-all-button" onClick={toggleAllRows}>
                  {expandedRows.size === filteredSpecialists.length ? '▲' : '▼'}
                </button>
              </th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedSpecialists.map((specialist, index) => (
              <React.Fragment key={index}>
                <tr onClick={() => toggleRow(index)} style={{ cursor: 'pointer' }}>
                  <td>{specialist}</td>
                  <td>
                    <button className="edit-btn" onClick={() => openEditNotification(index)}>✏️</button>
                    <button className="delete-btn" onClick={() => handleDeleteSpecialist(index)}>🗑️</button>
                  </td>
                </tr>
                {expandedRows.has(index) && (
                  <tr>
                    <td colSpan="2" style={{ backgroundColor: '#f9f9f9' }}>
                      {/* Add any expanded row content here */}
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>

        <div className="footer">
          <p>Records: {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredSpecialists.length)} of {filteredSpecialists.length}</p>
        </div>

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
  );
};

export default SpecialistList;
