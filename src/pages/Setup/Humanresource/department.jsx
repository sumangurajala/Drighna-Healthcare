// // export default DepartmentList;

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
// import "./department.css";

// const DepartmentList = () => {
//   const [departments, setDepartments] = useState([
//     "Human Resources",
//     "IT",
//     "Finance",
//     "Marketing",
//     "Operations",
//     "Sales",
//     "Customer Support",
//     "Legal",
//     "Administration",
//     "Engineering",
//     "Product Development",
//     "Research & Development",
//     "Admin",
//     "Blood Bank",
//     "BURN CARE",
//     "Cardiology",
//     "Emergency",
//     "Finance",
//     "Gynecology",
//     "ICU",
//     "IPD",
//     "NICU",
//     "Nursing Department",
//     "OPD",
//     "Operation Theatre",
//     "Pathology",
//     "Pharmacy",
//     "Radiology",
//     "Reception",
//   ]);

//   const [searchTerm, setSearchTerm] = useState("");
//   const [newDepartment, setNewDepartment] = useState("");
//   const [editDepartmentIndex, setEditDepartmentIndex] = useState(null); // Index of the department being edited
//   const [editMode, setEditMode] = useState(false); // State to track if in edit mode
//   const [currentPage, setCurrentPage] = useState(1);
//   const [showAllDepartments, setShowAllDepartments] = useState(false);
//   const itemsPerPage = 5;
//   const [expandedRows, setExpandedRows] = useState(new Set());
//   const [notificationVisible, setNotificationVisible] = useState(false); // State for notification visibility

//   const filteredDepartments = departments.filter((dept) =>
//     dept.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const startIndex = (currentPage - 1) * itemsPerPage; // Define startIndex
//   const totalPages = Math.ceil(filteredDepartments.length / itemsPerPage); // Define totalPages

//   const handleAddDepartment = () => {
//     if (newDepartment.trim() !== "" && !departments.includes(newDepartment)) {
//       setDepartments([...departments, newDepartment]);
//       setNewDepartment("");
//       setNotificationVisible(false); // Close the notification after adding
//     } else {
//       alert("Please enter a valid department name or avoid duplicates.");
//     }
//   };

//   const handleEditDepartment = () => {
//     if (editDepartmentIndex !== null && newDepartment.trim() !== "" && !departments.includes(newDepartment)) {
//       const updatedDepartments = [...departments];
//       updatedDepartments[editDepartmentIndex] = newDepartment.trim();
//       setDepartments(updatedDepartments);
//       setNewDepartment(""); // Clear the input
//       setEditMode(false); // Exit edit mode
//       setNotificationVisible(false); // Close the notification after editing
//     } else {
//       alert("Please enter a valid department name or avoid duplicates.");
//     }
//   };

//   const handleDeleteDepartment = (index) => {
//     const confirmDelete = window.confirm("Are you sure you want to delete this department?");
//     if (confirmDelete) {
//       setDepartments(departments.filter((_, i) => i !== index));
//       setExpandedRows((prevRows) => {
//         const newRows = new Set(prevRows);
//         newRows.delete(index);
//         return newRows;
//       });
//     }
//   };

//   const handleShowAllDepartments = () => {
//     setShowAllDepartments(!showAllDepartments);
//     setCurrentPage(1); // Reset to the first page
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
//     if (expandedRows.size === filteredDepartments.length) {
//       setExpandedRows(new Set()); // Collapse all
//     } else {
//       setExpandedRows(new Set(filteredDepartments.map((_, index) => index))); // Expand all
//     }
//   };

//   const handlePrevPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   const handleNextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   return (
//     <div className="department-list-container">
//       <h2>Department List</h2>

//       {/* Notification Box for Adding/Editing Department */}
//       {notificationVisible && (
//         <div className="notification-box">
//           <h4>{editMode ? "Edit Department" : "Add New Department"}</h4>
//           <input
//             type="text"
//             placeholder="Enter department name"
//             value={newDepartment}
//             onChange={(e) => setNewDepartment(e.target.value)}
//             required
//             style={{ width: "100%", marginBottom: "10px" }}
//           />
//           <div className="notification-buttons">
//             <button onClick={editMode ? handleEditDepartment : handleAddDepartment} className="modal-btn">Save</button>
//             <button onClick={() => {
//               setNotificationVisible(false);
//               setEditMode(false);
//               setNewDepartment(""); // Clear input
//             }} className="modal-btn">Cancel</button>
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

//       {/* Add Department Button */}
//       <div className="add-department-container">
//         <button className="add-department-button" onClick={() => {
//           setNotificationVisible(true);
//           setEditMode(false); // Ensure we are in add mode
//           setNewDepartment(""); // Clear input
//         }}>
//           <FontAwesomeIcon icon={faPlus} /> Add Department
//         </button>
//       </div>

//       {/* Show All Departments Button */}
//       <div className="show-all-container">
//         <button onClick={handleShowAllDepartments}>
//           {showAllDepartments ? "Show Paginated" : "Show All"} {showAllDepartments ? '▲' : '▼'}
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

//       {/* Department List Table */}
//       <div className="department-list">
//         <table>
//           <thead>
//             <tr>
//               <th>
//                 Department 
//                 <button className="expand-all-button" onClick={toggleAllRows}>
//                   {expandedRows.size === filteredDepartments.length ? '▲' : '▼'}
//                 </button>
//               </th>
//               <th>
//                 Action  
//                 <button className="expand-all-button" onClick={toggleAllRows}>
//                   {expandedRows.size === filteredDepartments.length ? '▲' : '▼'}
//                 </button>
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {(showAllDepartments ? filteredDepartments : filteredDepartments.slice(startIndex, startIndex + itemsPerPage)).map((dept, index) => (
//               <tr key={index} onClick={() => toggleRow(index)} style={{ cursor: "pointer" }}>
//                 <td>{dept}</td>
//                 <td>
//                   <button className="edit-btn" onClick={() => {
//                     setEditMode(true); // Switch to edit mode
//                     setEditDepartmentIndex(showAllDepartments ? index : startIndex + index);
//                     setNewDepartment(dept); // Set the current department name for editing
//                     setNotificationVisible(true); // Show the notification
//                   }}>✏️ Edit</button>
//                   <button className="delete-btn" onClick={() => handleDeleteDepartment(showAllDepartments ? index : startIndex + index)}>🗑️ Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         <div className="footer">
//           <p>
//             Records: {filteredDepartments.length} of {filteredDepartments.length}
//           </p>
//         </div>

//         {/* Pagination */}
//         {!showAllDepartments && (
//           <div className="pagination">
//             <button onClick={handlePrevPage} disabled={currentPage === 1}>
//               Prev
//             </button>
//             <button onClick={handleNextPage} disabled={currentPage === totalPages}>
//               Next
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DepartmentList;


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
import "./department.css";

const DepartmentList = () => {
  const [departments, setDepartments] = useState([
    "Human Resources",
    "IT",
    "Finance",
    "Marketing",
    "Operations",
    "Sales",
    "Customer Support",
    "Legal",
    "Administration",
    "Engineering",
    "Product Development",
    "Research & Development",
    "Admin",
    "Blood Bank",
    "BURN CARE",
    "Cardiology",
    "Emergency",
    "Finance",
    "Gynecology",
    "ICU",
    "IPD",
    "NICU",
    "Nursing Department",
    "OPD",
    "Operation Theatre",
    "Pathology",
    "Pharmacy",
    "Radiology",
    "Reception",
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

  const filteredDepartments = departments.filter((dept) =>
    dept.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const totalPages = Math.ceil(filteredDepartments.length / itemsPerPage);

  const handleAddDepartment = () => {
    if (newDepartment.trim() !== "" && !departments.includes(newDepartment)) {
      setDepartments([...departments, newDepartment]);
      setNewDepartment("");
      setNotificationVisible(false);
    } else {
      alert("Please enter a valid department name or avoid duplicates.");
    }
  };

  const handleEditDepartment = () => {
    if (editDepartmentIndex !== null && newDepartment.trim() !== "" && !departments.includes(newDepartment)) {
      const updatedDepartments = [...departments];
      updatedDepartments[editDepartmentIndex] = newDepartment.trim();
      setDepartments(updatedDepartments);
      setNewDepartment("");
      setEditMode(false);
      setNotificationVisible(false);
    } else {
      alert("Please enter a valid department name or avoid duplicates.");
    }
  };

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
    const ws = XLSX.utils.json_to_sheet(filteredDepartments.map(dept => ({ Department: dept })));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Departments");
    XLSX.writeFile(wb, "departments.xlsx");
  };

  // Function to export to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Department List", 10, 10);
    filteredDepartments.forEach((dept, index) => {
      doc.text(`${index + 1}. ${dept}`, 10, 20 + index * 10);
    });
    doc.save("departments.pdf");
  };

  // Function to export to CSV
  const exportToCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      filteredDepartments.map(dept => dept).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "departments.csv");
    document.body.appendChild(link);
    link.click();
  };

  // Function to copy to clipboard
  const exportToCopy = () => {
    navigator.clipboard.writeText(filteredDepartments.join(", "))
      .then(() => alert("Copied to clipboard!"))
      .catch(err => alert("Failed to copy: ", err));
  };

  // Function to print the department list
  const printLeaveTypes = () => {
    const printContent = filteredDepartments.map(dept => `<p>${dept}</p>`).join("");
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
      <h2>Department List</h2>

      {notificationVisible && (
        <div className="notification-box">
          <h4>{editMode ? "Edit Department" : "Add New Department"}</h4>
          <input
            type="text"
            placeholder="Enter department name"
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
          <FontAwesomeIcon icon={faPlus} /> Add Department
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
              <th>
                Department 
                <button className="expand-all-button" onClick={toggleAllRows}>
                  {expandedRows.size === filteredDepartments.length ? '▲' : '▼'}
                </button>
              </th>
              <th>
                Action  
                <button className="expand-all-button" onClick={toggleAllRows}>
                  {expandedRows.size === filteredDepartments.length ? '▲' : '▼'}
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {(showAllDepartments ? filteredDepartments : filteredDepartments.slice(startIndex, startIndex + itemsPerPage)).map((dept, index) => (
              <tr key={index} onClick={() => toggleRow(index)} style={{ cursor: "pointer" }}>
                <td>{dept}</td>
                <td>
                  <button className="edit-btn" onClick={() => {
                    setEditMode(true);
                    setEditDepartmentIndex(showAllDepartments ? index : startIndex + index);
                    setNewDepartment(dept);
                    setNotificationVisible(true);
                  }}>✏️ Edit</button>
                  <button className="delete-btn" onClick={() => handleDeleteDepartment(showAllDepartments ? index : startIndex + index)}>🗑️ Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="footer">
          <p>
            Records: {filteredDepartments.length} of {filteredDepartments.length}
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

export default DepartmentList;
