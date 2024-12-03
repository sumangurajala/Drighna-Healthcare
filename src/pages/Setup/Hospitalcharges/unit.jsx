// import React, { useState } from "react";
// import DataTable from "react-data-table-component";
// import { saveAs } from "file-saver";
// import * as XLSX from "xlsx";
// import jsPDF from "jspdf";
// import "jspdf-autotable";
// import { CopyToClipboard } from "react-copy-to-clipboard";
// import "./unit.css"; // Custom CSS for styling

// const UnitTypeList = () => {
//   const [unitTypes, setUnitTypes] = useState([
//     { name: "ml" },
//     { name: "bpm" },
//     { name: "cells/µL" },
//     { name: "rpm" },
//     { name: "mg/dL" },
//     { name: "Litter" },
//     { name: "MM" },
//     { name: "Day" },
//     { name: "Hour" },
//     { name: "Per Visit" },
//     { name: "g/dL" },
//     { name: "MG" },
//   ]);

//   const [newUnitType, setNewUnitType] = useState("");
//   const [notifications, setNotifications] = useState([]);

//   const columns = [
//     {
//       name: "Unit Type",
//       selector: (row) => row.name,
//       sortable: true,
//     },
//     {
//       name: "Action",
//       cell: (row, index) => (
//         <div className="action-buttons">
//           <button
//             onClick={() => handleEdit(index)}
//             className="edit-btn"
//             aria-label={`Edit ${unitTypes[index].name}`}
//           >
//             ✏️
//           </button>
//           <button
//             onClick={() => handleDelete(index)}
//             className="delete-btn"
//             aria-label={`Delete ${unitTypes[index].name}`}
//           >
//             🗑️
//           </button>
//         </div>
//       ),
//     },
//   ];

//   const handleEdit = (index) => {
//     alert(`Edit action for ${unitTypes[index].name}`);
//   };

//   const handleDelete = (index) => {
//     const updatedUnitTypes = unitTypes.filter((_, i) => i !== index);
//     addNotification(`Unit type "${unitTypes[index].name}" deleted successfully!`);
//     setUnitTypes(updatedUnitTypes);
//   };

//   const handleAddUnitType = () => {
//     if (newUnitType.trim()) {
//       if (unitTypes.some((unit) => unit.name.toLowerCase() === newUnitType.toLowerCase())) {
//         addNotification(`Unit type "${newUnitType}" already exists.`, "error");
//       } else {
//         setUnitTypes([...unitTypes, { name: newUnitType }]);
//         addNotification(`Unit type "${newUnitType}" added successfully!`);
//         setNewUnitType(""); // Clear the input field
//       }
//     } else {
//       addNotification("Please enter a valid unit type.", "error");
//     }
//   };

//   const addNotification = (message, type = "success") => {
//     setNotifications((prev) => [...prev, { message, type }]);
//     setTimeout(() => {
//       setNotifications((prev) => prev.slice(1));
//     }, 3000);
//   };

//   const handleExportCSV = () => {
//     try {
//       const csvString = ["Unit Type", ...unitTypes.map((unit) => unit.name)].join("\n");
//       const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
//       saveAs(blob, "unit-types.csv");
//       addNotification("CSV exported successfully!");
//     } catch (error) {
//       addNotification("Error exporting CSV.", "error");
//     }
//   };

//   const handleExportExcel = () => {
//     try {
//       const worksheet = XLSX.utils.json_to_sheet(unitTypes);
//       const workbook = XLSX.utils.book_new();
//       XLSX.utils.book_append_sheet(workbook, worksheet, "Unit Types");
//       XLSX.writeFile(workbook, "unit-types.xlsx");
//       addNotification("Excel exported successfully!");
//     } catch (error) {
//       addNotification("Error exporting Excel.", "error");
//     }
//   };

//   const handleExportPDF = () => {
//     try {
//       const doc = new jsPDF();
//       doc.text("Unit Type List", 14, 10);
//       const tableColumn = ["Unit Type"];
//       const tableRows = unitTypes.map((row) => [row.name]);

//       doc.autoTable(tableColumn, tableRows, { startY: 20 });
//       doc.save("unit-types.pdf");
//       addNotification("PDF exported successfully!");
//     } catch (error) {
//       addNotification("Error exporting PDF.", "error");
//     }
//   };

//   const handlePrint = () => {
//     window.print();
//   };

//   const handleCopy = () => {
//     const copyText = unitTypes.map((unit) => unit.name).join("\n");
//     return copyText;
//   };

//   return (
//     <div className="unit-type-container">
//       <div className="header">
//         <h2>Unit Type List</h2>
//         <button
//           className="add-unit-btn"
//           onClick={handleAddUnitType}
//         >
//           Add Unit Type ➕
//         </button>
//       </div>

//       {/* Notification box */}
//       {notifications.map((note, index) => (
//         <div
//           key={index}
//           className={`notification-box ${note.type === "error" ? "error" : "success"}`}
//         >
//           {note.message}
//         </div>
//       ))}

//       {/* Input field for adding new unit */}
//       <div className="add-unit-form">
//         <input
//           type="text"
//           placeholder="Enter new unit type"
//           value={newUnitType}
//           onChange={(e) => setNewUnitType(e.target.value)}
//           className="input-field"
//           aria-label="Enter new unit type"
//         />
//       </div>

//       {/* Export and Copy buttons */}
//       <div className="export-buttons">
//         <CopyToClipboard text={handleCopy()}>
//           <button onClick={() => addNotification("Copied to clipboard!")}>Copy</button>
//         </CopyToClipboard>
//         <button onClick={handleExportCSV}>CSV</button>
//         <button onClick={handleExportExcel}>Excel</button>
//         <button onClick={handleExportPDF}>PDF</button>
//         <button onClick={handlePrint}>Print</button>
//       </div>

//       {/* DataTable */}
//       <DataTable
//         columns={columns}
//         data={unitTypes}
//         pagination
//         highlightOnHover
//         striped
//         className="data-table"
//       />
//     </div>
//   );
// };

// export default UnitTypeList;


import React, { useState, useEffect } from "react";
import axios from "axios";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "./taxcategory.css";

const UnitTypeList = () => {
  const [unitType, setUnitType] = useState("");  // Single unit type, initially empty string
  const [notification, setNotification] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUnitType = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/charge-units");
  
        // Check if the response is an array and contains data
        if (Array.isArray(response.data) && response.data.length > 0) {
          setUnitType(response.data[0].unit_type || ""); // Ensure unit_type exists before setting state
        } else {
          setUnitType(""); // Fallback in case no unit type exists
        }
      } catch (error) {
        setNotification("Error fetching unit type.");
        console.error("Error fetching unit type:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchUnitType();
  }, []);
  

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/charge-units/${unitType.id}`);
      setUnitType("");  // Clear the unit type after deletion
      setNotification("Unit type deleted successfully!");
      setTimeout(() => setNotification(""), 3000);
    } catch (error) {
      setNotification("Error deleting unit type.");
      console.error("Error deleting unit type:", error);
    }
  };

  const handleExportCSV = () => {
    const csvString = `Unit Type\n${unitType}`;
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "unit-type.csv");
  };

  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet([{ unit_type: unitType }]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Unit Type");
    XLSX.writeFile(workbook, "unit-type.xlsx");
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text("Unit Type", 14, 10);
    const tableColumn = ["Unit Type"];
    const tableRows = [[unitType]];

    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.save("unit-type.pdf");
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopy = () => {
    return unitType;
  };

  const handleSave = async () => {
    // Check if the unit type is not empty and is a string
    if (typeof unitType !== 'string' || !unitType.trim()) {
      setNotification("Unit type cannot be empty.");
      return;
    }
  
    try {
      const payload = {
        unit: unitType,        // Assuming unit field is required and should contain the unitType
        is_active: true,       // Assuming the is_active field is required and defaulting to true
        unit_type: unitType    // unit_type field as before
      };
  
      // Send POST request to the backend API to add the unit type
      const response = await axios.post("http://localhost:3000/api/charge-units/add", payload);  // Ensure this matches your route
  
      setNotification(`Unit type "${unitType}" added successfully!`);
      setUnitType(""); // Clear the input field
    } catch (error) {
      console.error("Error adding unit type:", error.response?.data || error.message);
      setNotification("Error adding unit type.");
    }
  };
  
  
  
  
  return (
    <div style={{ padding: "20px", position: "relative" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Unit Type</h2>
        <button
          className="add-btn"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? "Close" : "Add Unit Type ➕"}
        </button>
      </div>

      {notification && <div className={`notification-bar ${notification.includes("Error") ? "error" : "success"}`}>{notification}</div>}

      {showAddForm && (
        <div style={{ marginTop: "20px" }}>
          <input
  type="text"
  placeholder="Enter unit type"
  value={unitType || ""} // Ensure unitType is never undefined
  onChange={(e) => setUnitType(e.target.value)}
  className="input-field"
/>

          <button
            onClick={handleSave}
            disabled={!unitType.trim()}
            className={`save-btn ${!unitType.trim() ? "disabled" : ""}`}
          >
            Save
          </button>
        </div>
      )}

      <div style={{ marginTop: "20px", display: "flex", justifyContent: "flex-end", gap: "10px" }}>
        <CopyToClipboard text={handleCopy()}>
          <button onClick={() => alert("Copied!")} className="copy-btn">Copy</button>
        </CopyToClipboard>
        <button onClick={handleExportCSV} className="export-btn">CSV</button>
        <button onClick={handleExportExcel} className="export-btn">Excel</button>
        <button onClick={handleExportPDF} className="export-btn">PDF</button>
        <button onClick={handlePrint} className="export-btn">Print</button>
        <button onClick={handleDelete} className="delete-btn">Delete</button>
      </div>

      {loading ? <div>Loading...</div> : (
        <div>{unitType ? <p>{unitType}</p> : <p>No unit type available</p>}</div>
      )}
    </div>
  );
};

export default UnitTypeList;
