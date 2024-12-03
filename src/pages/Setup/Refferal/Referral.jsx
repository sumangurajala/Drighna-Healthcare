// import React, { useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faPlus,
//   faCopy,
//   faFileExcel,
//   faFilePdf,
//   faFileCsv,
//   faPrint,
//   faEdit,
//   faTrashAlt,
// } from "@fortawesome/free-solid-svg-icons";
// import {
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   TableContainer,
//   TextField,
//   Button,
//   IconButton,
//   Paper,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
// } from "@mui/material";
// import * as XLSX from "xlsx"; // For Excel and CSV export
// import jsPDF from "jspdf"; // For PDF export
// import "jspdf-autotable"; // For table support in jsPDF
// import { useNavigate } from "react-router-dom"; // Navigation

// const ReferralCommissionList = () => {
//   const navigate = useNavigate(); // Use navigation hook

//   const [commissions, setCommissions] = useState([
//     {
//       category: "OPD Department",
//       modules: [
//         { name: "OPD", commission: "0%" },
//         { name: "IPD", commission: "0%" },
//         { name: "Pharmacy", commission: "0%" },
//         { name: "Pathology", commission: "0%" },
//         { name: "Radiology", commission: "0%" },
//         { name: "Blood Bank", commission: "0%" },
//         { name: "Ambulance", commission: "0%" },
//       ],
//     },
//     {
//       category: "IPD Department",
//       modules: [
//         { name: "OPD", commission: "10%" },
//         { name: "IPD", commission: "20%" },
//         { name: "Pharmacy", commission: "30%" },
//         { name: "Pathology", commission: "40%" },
//         { name: "Radiology", commission: "50%" },
//         { name: "Blood Bank", commission: "30%" },
//         { name: "Ambulance", commission: "40%" },
//       ],
//     },
//     {
//       category: "Clinical Services within the Community",
//       modules: [
//         { name: "OPD", commission: "20%" },
//         { name: "IPD", commission: "20%" },
//         { name: "Pharmacy", commission: "20%" },
//         { name: "Pathology", commission: "20%" },
//       ],
//     },
//   ]);

//   const [searchTerm, setSearchTerm] = useState(""); // Search term state
//   const [open, setOpen] = useState(false); // Modal state
//   const [newCommission, setNewCommission] = useState({
//     category: "",
//     modules: [
//       { name: "OPD", commission: "" },
//       { name: "IPD", commission: "" },
//       { name: "Pharmacy", commission: "" },
//       { name: "Pathology", commission: "" },
//       { name: "Radiology", commission: "" },
//       { name: "Blood Bank", commission: "" },
//       { name: "Ambulance", commission: "" },
//     ],
//   });

//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   // Open and close modal
//   const handleClickOpen = () => {
//     setOpen(true);
//   };
//   const handleClose = () => {
//     setOpen(false);
//   };

//   // Handle input changes in modal form
//   const handleInputChange = (event, index) => {
//     const { name, value } = event.target;
//     if (name === "category") {
//       setNewCommission({ ...newCommission, [name]: value });
//     } else {
//       const updatedModules = [...newCommission.modules];
//       updatedModules[index].commission = value;
//       setNewCommission({ ...newCommission, modules: updatedModules });
//     }
//   };

//   // Add new commission
//   const handleAddCommission = () => {
//     if (!newCommission.category) {
//       alert("Category is required!");
//       return;
//     }
//     setCommissions([...commissions, newCommission]);
//     setNewCommission({
//       category: "",
//       modules: [
//         { name: "OPD", commission: "" },
//         { name: "IPD", commission: "" },
//         { name: "Pharmacy", commission: "" },
//         { name: "Pathology", commission: "" },
//         { name: "Radiology", commission: "" },
//         { name: "Blood Bank", commission: "" },
//         { name: "Ambulance", commission: "" },
//       ],
//     });
//     setOpen(false);
//   };

//   // Export to Excel functionality
//   const handleExportToExcel = () => {
//     const worksheet = XLSX.utils.json_to_sheet(
//       commissions.map((commission) => ({
//         Category: commission.category,
//         Modules: commission.modules
//           .map((module) => `${module.name} - ${module.commission}`)
//           .join(", "),
//       }))
//     );
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Referral Commissions");
//     XLSX.writeFile(workbook, "ReferralCommissions.xlsx");
//   };

//   // Export to CSV functionality
//   const handleExportToCSV = () => {
//     const worksheet = XLSX.utils.json_to_sheet(
//       commissions.map((commission) => ({
//         Category: commission.category,
//         Modules: commission.modules
//           .map((module) => `${module.name} - ${module.commission}`)
//           .join(", "),
//       }))
//     );
//     const csvData = XLSX.utils.sheet_to_csv(worksheet);
//     const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
//     const link = document.createElement("a");
//     link.href = URL.createObjectURL(blob);
//     link.download = "ReferralCommissions.csv";
//     link.click();
//   };

//   // Export to PDF functionality
//   const handleExportToPDF = () => {
//     const doc = new jsPDF();
//     doc.text("Referral Commission List", 20, 10);
//     commissions.forEach((commission, index) => {
//       doc.text(`${commission.category}`, 10, 20 + index * 10);
//       commission.modules.forEach((module, idx) => {
//         doc.text(`${module.name} - ${module.commission}`, 20, 30 + idx * 10);
//       });
//     });
//     doc.save("ReferralCommissions.pdf");
//   };

//   // Copy to Clipboard functionality
//   const handleCopyToClipboard = () => {
//     const textToCopy = commissions
//       .map(
//         (commission) =>
//           `${commission.category}: ` +
//           commission.modules
//             .map((module) => `${module.name} - ${module.commission}`)
//             .join(", ")
//       )
//       .join("\n");
//     navigator.clipboard.writeText(textToCopy).then(() => {
//       alert("Referral commission list copied to clipboard!");
//     });
//   };

//   // Print functionality
//   const handlePrint = () => {
//     const printWindow = window.open("", "_blank");
//     printWindow.document.write("<html><head><title>Print Referral Commissions</title></head><body>");
//     printWindow.document.write("<h2>Referral Commission List</h2><ul>");
//     commissions.forEach((commission) => {
//       printWindow.document.write(`<li><strong>${commission.category}</strong><ul>`);
//       commission.modules.forEach((module) => {
//         printWindow.document.write(`<li>${module.name} - ${module.commission}</li>`);
//       });
//       printWindow.document.write("</ul></li>");
//     });
//     printWindow.document.write("</ul></body></html>");
//     printWindow.document.close();
//     printWindow.print();
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       {/* Navigation Buttons in Row */}
// <div style={{ display: "flex", flexDirection: "row", marginBottom: "20px" }}>
//   <div
//     style={{
//       display: "flex",
//       flexDirection: "row",
//       border: "1px solid #ccc",
//       padding: "10px",
//       borderRadius: "4px",
//     }}
//   >
//     <button
//       className="category-button"
//       onClick={() => navigate("/setup/referral")}
//       style={{ marginRight: "10px" }} // Optional inline margin between buttons
//     >
//       Referral commission
//     </button>
//     <button
//       className="category-button"
//       onClick={() => navigate("/setup/referral/category")}
//     >
//       Referral category
//     </button>
//   </div>
// </div>

    

//       <h2>Referral Commission List</h2>

//       {/* Search and Add Button Row */}
//       <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
//         <TextField
//           label="Search..."
//           variant="outlined"
//           value={searchTerm}
//           onChange={handleSearchChange}
//           size="small"
//           style={{ width: "30%" }}
//         />
//         <Button
//           variant="contained"
//           color="primary"
//           startIcon={<FontAwesomeIcon icon={faPlus} />}
//           onClick={handleClickOpen}
//           className="add-commission-button"
//         >
//           Add Referral Commission
//         </Button>
//       </div>

//       {/* Export Buttons */}
//       <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "10px" }}>
//         <IconButton onClick={handleCopyToClipboard}>
//           <FontAwesomeIcon icon={faCopy} />
//         </IconButton>
//         <IconButton onClick={handleExportToExcel}>
//           <FontAwesomeIcon icon={faFileExcel} />
//         </IconButton>
//         <IconButton onClick={handleExportToCSV}>
//           <FontAwesomeIcon icon={faFileCsv} />
//         </IconButton>
//         <IconButton onClick={handleExportToPDF}>
//           <FontAwesomeIcon icon={faFilePdf} />
//         </IconButton>
//         <IconButton onClick={handlePrint}>
//           <FontAwesomeIcon icon={faPrint} />
//         </IconButton>
//       </div>

//       {/* Table */}
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell><strong>Category</strong></TableCell>
//               <TableCell><strong>Module - Commission</strong></TableCell>
//               <TableCell align="right"><strong>Action</strong></TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {commissions
//               .filter((commission) =>
//                 commission.category.toLowerCase().includes(searchTerm.toLowerCase())
//               )
//               .map((commission, index) => (
//                 <TableRow key={index}>
//                   <TableCell>{commission.category}</TableCell>
//                   <TableCell>
//                     {commission.modules.map((module, idx) => (
//                       <div key={idx}>
//                         {module.name} - {module.commission}
//                       </div>
//                     ))}
//                   </TableCell>
//                   <TableCell align="right">
//                     <IconButton
//                       color="primary"
//                       onClick={() => alert(`Edit commission: ${commission.category}`)}
//                     >
//                       <FontAwesomeIcon icon={faEdit} />
//                     </IconButton>
//                     <IconButton
//                       color="secondary"
//                       onClick={() => setCommissions(commissions.filter((_, i) => i !== index))}
//                     >
//                       <FontAwesomeIcon icon={faTrashAlt} />
//                     </IconButton>
//                   </TableCell>
//                 </TableRow>
//               ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* Modal for Adding Referral Commission */}
//       <Dialog open={open} onClose={handleClose}>
//         <DialogTitle>Add New Referral Commission</DialogTitle>
//         <DialogContent>
//           <TextField
//             margin="dense"
//             label="Category"
//             fullWidth
//             name="category"
//             value={newCommission.category}
//             onChange={handleInputChange}
//           />
//           {newCommission.modules.map((module, index) => (
//             <TextField
//               key={index}
//               margin="dense"
//               label={`${module.name} Commission`}
//               fullWidth
//               name={`module-${index}`}
//               value={module.commission}
//               onChange={(event) => handleInputChange(event, index)}
//             />
//           ))}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose} color="secondary">Cancel</Button>
//           <Button onClick={handleAddCommission} color="primary">Add</Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

// export default ReferralCommissionList;



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

const ReferralCommissionList = () => {
  const [leaveTypes, setLeaveTypes] = useState([
    {
      category: "OPD Department",
      modules: [
        { name: "OPD", commission: "0%" },
        { name: "IPD", commission: "0%" },
        { name: "Pharmacy", commission: "0%" },
        { name: "Pathology", commission: "0%" },
        { name: "Radiology", commission: "0%" },
        { name: "Blood Bank", commission: "0%" },
        { name: "Ambulance", commission: "0%" },
      ],
    },
    {
      category: "IPD Department",
      modules: [
        { name: "OPD", commission: "10%" },
        { name: "IPD", commission: "20%" },
        { name: "Pharmacy", commission: "30%" },
        { name: "Pathology", commission: "40%" },
        { name: "Radiology", commission: "50%" },
        { name: "Blood Bank", commission: "30%" },
        { name: "Ambulance", commission: "40%" },
      ],
    },
    {
      category: "Clinical Services within the Community",
      modules: [
        { name: "OPD", commission: "20%" },
        { name: "IPD", commission: "20%" },
        { name: "Pharmacy", commission: "20%" },
        { name: "Pathology", commission: "20%" },
      ],
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newModules, setNewModules] = useState([
    { name: "OPD", commission: "" },
    { name: "IPD", commission: "" },
    { name: "Pharmacy", commission: "" },
    { name: "Pathology", commission: "" },
    { name: "Radiology", commission: "" },
    { name: "Blood Bank", commission: "" },
    { name: "Ambulance", commission: "" },
  ]);
  const [editMode, setEditMode] = useState(false);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [notificationVisible, setNotificationVisible] = useState(false);
  const navigate = useNavigate();

  const filteredLeaveTypes = leaveTypes.filter((type) =>
    type.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  const handleAddCategory = () => {
    if (newCategory.trim() !== "") {
      setLeaveTypes([
        ...leaveTypes,
        { category: newCategory, modules: newModules },
      ]);
      resetNotification();
    } else {
      alert("Please enter a valid category.");
    }
  };

  const handleDeleteCategory = (index) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      setLeaveTypes(leaveTypes.filter((_, i) => i !== index));
    }
  };

  const openEditCategory = (index) => {
    setCurrentCategoryIndex(index);
    setNewCategory(leaveTypes[index].category);
    setNewModules(leaveTypes[index].modules);
    setEditMode(true);
    setNotificationVisible(true); // Ensure notification is visible when editing
  };

  const handleEditCategory = () => {
    if (newCategory.trim() !== "") {
      const updatedLeaveTypes = [...leaveTypes];
      updatedLeaveTypes[currentCategoryIndex] = {
        category: newCategory,
        modules: newModules,
      };
      setLeaveTypes(updatedLeaveTypes);
      resetNotification();
    } else {
      alert("Please enter a valid category.");
    }
  };

  const resetNotification = () => {
    setNotificationVisible(false); // Close the notification
    setNewCategory(""); // Clear the input fields
    setNewModules([
      { name: "OPD", commission: "" },
      { name: "IPD", commission: "" },
      { name: "Pharmacy", commission: "" },
      { name: "Pathology", commission: "" },
      { name: "Radiology", commission: "" },
      { name: "Blood Bank", commission: "" },
      { name: "Ambulance", commission: "" },
    ]);
    setEditMode(false); // Reset edit mode
  };

  const exportToCopy = () => {
    const textToCopy = leaveTypes
      .map(
        (category) =>
          `${category.category}: ` +
          category.modules.map((module) => `${module.name} - ${module.commission}`).join(", ")
      )
      .join("\n");
    navigator.clipboard.writeText(textToCopy).then(() => {
      alert("Leave types copied to clipboard!");
    });
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      leaveTypes.map((category) => ({
        Category: category.category,
        Modules: category.modules
          .map((module) => `${module.name} - ${module.commission}`)
          .join(", "),
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "LeaveTypes");
    XLSX.writeFile(workbook, "LeaveTypes.xlsx");
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Leave Types List", 20, 10);
    leaveTypes.forEach((category, index) => {
      doc.text(`${index + 1}. ${category.category}`, 20, 20 + 10 * index);
      category.modules.forEach((module, idx) => {
        doc.text(
          `${module.name} - ${module.commission}`,
          30,
          30 + 10 * (index + idx)
        );
      });
    });
    doc.save("LeaveTypes.pdf");
  };

  const exportToCSV = () => {
    const csvContent =
      "Category,Modules\n" +
      leaveTypes
        .map(
          (category) =>
            `${category.category},"${category.modules
              .map((module) => `${module.name} - ${module.commission}`)
              .join(", ")}"`
        )
        .join("\n");
    const encodedUri = encodeURI("data:text/csv;charset=utf-8," + csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "LeaveTypes.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const printLeaveTypes = () => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write("<html><head><title>Print Leave Types</title></head><body>");
    printWindow.document.write("<h2>Leave Types List</h2><ul>");
    leaveTypes.forEach((category) => {
      printWindow.document.write(`<li>${category.category}</li><ul>`);
      category.modules.forEach((module) => {
        printWindow.document.write(`<li>${module.name} - ${module.commission}</li>`);
      });
      printWindow.document.write("</ul>");
    });
    printWindow.document.write("</ul></body></html>");
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="smallcontainer">
      {/* Sidebar */}
      <div className="input-fields-container">
        <button className="category-button" onClick={() => navigate("/setup/referral")}>
          Referral Commission
        </button>
        <button className="category-button" onClick={() => navigate("/setup/referral/category")}>
          Refferal Category
        </button>
      </div>

      {/* Leave Type List Section */}
      <div className="leave-type-list-container">
        <h2>RefferalCommission List</h2>

        {/* Add/Edit Notification Box */}
        {notificationVisible && (
          <div className="notification-box">
            <h4>{editMode ? "Edit Category" : "Add Category"}</h4>
            <input
              type="text"
              placeholder="Enter category"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              required
              style={{ width: "100%", marginBottom: "10px" }}
            />
            {newModules.map((module, index) => (
              <div key={index}>
                <label>{module.name} Commission:</label>
                <input
                  type="text"
                  value={module.commission}
                  onChange={(e) => {
                    const updatedModules = [...newModules];
                    updatedModules[index].commission = e.target.value;
                    setNewModules(updatedModules);
                  }}
                  style={{ width: "100%", marginBottom: "10px" }}
                />
              </div>
            ))}
            <div className="notification-buttons">
              <button onClick={editMode ? handleEditCategory : handleAddCategory} className="modal-btn">
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
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        {/* Add Leave Type Button */}
        <div className="add-leave-type-container" style={{ display: "flex", justifyContent: "flex-end", marginBottom: "20px" }}>
          <button className="add-leave-type-button" onClick={() => setNotificationVisible(true)}>
            <FontAwesomeIcon icon={faPlus} /> Add Category
          </button>
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
              <th>Category</th>
              <th>Modules</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedLeaveTypes.map((category, index) => (
              <tr key={index}>
                <td>{category.category}</td>
                <td>
                  {category.modules.map((module, idx) => (
                    <div key={idx}>
                      {module.name} - {module.commission}
                    </div>
                  ))}
                </td>
                <td>
                  <button className="edit-btn" onClick={() => openEditCategory(index)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDeleteCategory(index)}>Delete</button>
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

export default ReferralCommissionList;


