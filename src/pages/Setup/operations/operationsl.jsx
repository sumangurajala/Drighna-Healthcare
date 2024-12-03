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
//   Typography,
//   Box,
//   Grid,
// } from "@mui/material";
// import * as XLSX from "xlsx";
// import jsPDF from "jspdf";
// import "jspdf-autotable";

// // Dummy data for operations
// const initialData = [
//   { name: "Tooth extraction", category: "Dental" },
//   { name: "Arthroscopic surgery including ACL repair", category: "ENT" },
//   { name: "Bronchoscopy", category: "Thoracic Surgery" },
//   { name: "Cataract Surgery", category: "Ophthalmology" },
//   { name: "Coronary Artery Bypass Grafting (CABG)", category: "Cardiology" },
//   { name: "demo", category: "demo" },
//   { name: "Dilation and curettage", category: "Gynaecology" },
//   { name: "Hydrocele and varicocele excision", category: "Urology" },
//   { name: "Lung Biopsy", category: "Pulmonology" },
//   { name: "Polypectomy", category: "Gastroenterology" },
//   { name: "Retinal Detachment Repair", category: "Ophthalmology" },
//   { name: "Spinal Surgery", category: "Orthopedic" },
// ];

// const OperationList = () => {
//   const [data, setData] = useState(initialData);
//   const [searchTerm, setSearchTerm] = useState("");

//   // Handle search
//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   // Handle deletion
//   const handleDelete = (index) => {
//     const updatedData = data.filter((_, i) => i !== index);
//     setData(updatedData);
//   };

//   // Export to Excel
//   const handleExportToExcel = () => {
//     const worksheet = XLSX.utils.json_to_sheet(
//       data.map((operation) => ({
//         Name: operation.name,
//         Category: operation.category,
//       }))
//     );
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "OperationList");
//     XLSX.writeFile(workbook, "OperationList.xlsx");
//   };

//   // Export to CSV
//   const handleExportToCSV = () => {
//     const worksheet = XLSX.utils.json_to_sheet(
//       data.map((operation) => ({
//         Name: operation.name,
//         Category: operation.category,
//       }))
//     );
//     const csvData = XLSX.utils.sheet_to_csv(worksheet);
//     const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
//     const link = document.createElement("a");
//     link.href = URL.createObjectURL(blob);
//     link.download = "OperationList.csv";
//     link.click();
//   };

//   // Export to PDF
//   const handleExportToPDF = () => {
//     const doc = new jsPDF();
//     doc.text("Operation List", 20, 10);
//     doc.autoTable({
//       head: [["Name", "Category"]],
//       body: data.map((operation) => [operation.name, operation.category]),
//     });
//     doc.save("OperationList.pdf");
//   };

//   // Copy to Clipboard
//   const handleCopyToClipboard = () => {
//     const textToCopy = data
//       .map((operation) => `${operation.name} - ${operation.category}`)
//       .join("\n");
//     navigator.clipboard.writeText(textToCopy).then(() => {
//       alert("Operation list copied to clipboard!");
//     });
//   };

//   // Print functionality
//   const handlePrint = () => {
//     const printWindow = window.open("", "_blank");
//     printWindow.document.write(
//       "<html><head><title>Print Operation List</title></head><body>"
//     );
//     printWindow.document.write("<h2>Operation List</h2><ul>");
//     data.forEach((operation) => {
//       printWindow.document.write(
//         `<li>${operation.name} - ${operation.category}</li>`
//       );
//     });
//     printWindow.document.write("</ul></body></html>");
//     printWindow.document.close();
//     printWindow.print();
//   };

//   // Filtered data based on search
//   const filteredData = data.filter((operation) =>
//     operation.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <Box p={3}>
//       <Typography variant="h5" gutterBottom>
//         Operation List
//       </Typography>

//       <Box display="flex" justifyContent="space-between" mb={2}>
//         <TextField
//           label="Search..."
//           variant="outlined"
//           value={searchTerm}
//           onChange={handleSearchChange}
//           size="small"
//           style={{ width: "30%" }}
//         />
//         <Box>
//           <IconButton onClick={handleCopyToClipboard}>
//             <FontAwesomeIcon icon={faCopy} />
//           </IconButton>
//           <IconButton onClick={handleExportToExcel}>
//             <FontAwesomeIcon icon={faFileExcel} />
//           </IconButton>
//           <IconButton onClick={handleExportToCSV}>
//             <FontAwesomeIcon icon={faFileCsv} />
//           </IconButton>
//           <IconButton onClick={handleExportToPDF}>
//             <FontAwesomeIcon icon={faFilePdf} />
//           </IconButton>
//           <IconButton onClick={handlePrint}>
//             <FontAwesomeIcon icon={faPrint} />
//           </IconButton>
//         </Box>
//       </Box>

//       <Button
//         variant="contained"
//         color="primary"
//         startIcon={<FontAwesomeIcon icon={faPlus} />}
//         sx={{ mb: 2 }}
//       >
//         Add Operation
//       </Button>

//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>
//                 <strong>Name</strong>
//               </TableCell>
//               <TableCell>
//                 <strong>Category</strong>
//               </TableCell>
//               <TableCell align="right">
//                 <strong>Action</strong>
//               </TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {filteredData.map((operation, index) => (
//               <TableRow key={index}>
//                 <TableCell>{operation.name}</TableCell>
//                 <TableCell>{operation.category}</TableCell>
//                 <TableCell align="right">
//                   <IconButton
//                     color="primary"
//                     onClick={() => alert(`Edit operation: ${operation.name}`)}
//                   >
//                     <FontAwesomeIcon icon={faEdit} />
//                   </IconButton>
//                   <IconButton
//                     color="secondary"
//                     onClick={() => handleDelete(index)}
//                   >
//                     <FontAwesomeIcon icon={faTrashAlt} />
//                   </IconButton>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <Typography variant="body2" mt={2}>
//         Records: 1 to {filteredData.length} of {data.length}
//       </Typography>
//     </Box>
//   );
// };

// export default OperationList;
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faCopy,
  faFileExcel,
  faFilePdf,
  faFileCsv,
  faPrint,
  faEdit,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  TextField,
  Button,
  IconButton,
  Paper,
  Typography,
  Box,
  Grid,
  Snackbar,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

// Dummy data for operations
const initialData = [
  { name: "Tooth extraction", category: "Dental" },
  { name: "Arthroscopic surgery including ACL repair", category: "ENT" },
  { name: "Bronchoscopy", category: "Thoracic Surgery" },
  { name: "Cataract Surgery", category: "Ophthalmology" },
  { name: "Coronary Artery Bypass Grafting (CABG)", category: "Cardiology" },
  { name: "demo", category: "demo" },
  { name: "Dilation and curettage", category: "Gynaecology" },
  { name: "Hydrocele and varicocele excision", category: "Urology" },
  { name: "Lung Biopsy", category: "Pulmonology" },
  { name: "Polypectomy", category: "Gastroenterology" },
  { name: "Retinal Detachment Repair", category: "Ophthalmology" },
  { name: "Spinal Surgery", category: "Orthopedic" },
];

const OperationList = () => {
  const [data, setData] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false); // For controlling the snackbar visibility
  const [dialogOpen, setDialogOpen] = useState(false); // For controlling the dialog visibility
  const [newOperation, setNewOperation] = useState(""); // For storing the new operation name

  // Handle search
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Handle opening dialog
  const handleAddOperationClick = () => {
    setDialogOpen(true);
  };

  // Handle closing dialog
  const handleCloseDialog = () => {
    setDialogOpen(false);
    setNewOperation(""); // Reset the input field
  };

  // Handle snackbar close
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  // Handle saving the new operation
  const handleSaveOperation = () => {
    if (newOperation.trim()) {
      setData((prevData) => [...prevData, { name: newOperation, category: "New Category" }]);
      setSnackbarOpen(true);
    }
    handleCloseDialog();
  };

  // Handle deletion
  const handleDelete = (index) => {
    const updatedData = data.filter((_, i) => i !== index);
    setData(updatedData);
  };

  // Export to Excel
  const handleExportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      data.map((operation) => ({
        Name: operation.name,
        Category: operation.category,
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "OperationList");
    XLSX.writeFile(workbook, "OperationList.xlsx");
  };

  // Export to CSV
  const handleExportToCSV = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      data.map((operation) => ({
        Name: operation.name,
        Category: operation.category,
      }))
    );
    const csvData = XLSX.utils.sheet_to_csv(worksheet);
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "OperationList.csv";
    link.click();
  };

  // Export to PDF
  const handleExportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Operation List", 20, 10);
    doc.autoTable({
      head: [["Name", "Category"]],
      body: data.map((operation) => [operation.name, operation.category]),
    });
    doc.save("OperationList.pdf");
  };

  // Copy to Clipboard
  const handleCopyToClipboard = () => {
    const textToCopy = data
      .map((operation) => `${operation.name} - ${operation.category}`)
      .join("\n");
    navigator.clipboard.writeText(textToCopy).then(() => {
      alert("Operation list copied to clipboard!");
    });
  };

  // Print functionality
  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(
      "<html><head><title>Print Operation List</title></head><body>"
    );
    printWindow.document.write("<h2>Operation List</h2><ul>");
    data.forEach((operation) => {
      printWindow.document.write(
        `<li>${operation.name} - ${operation.category}</li>`
      );
    });
    printWindow.document.write("</ul></body></html>");
    printWindow.document.close();
    printWindow.print();
  };

  // Filtered data based on search
  const filteredData = data.filter((operation) =>
    operation.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Operation List
      </Typography>

      <Box display="flex" justifyContent="space-between" mb={2}>
        <TextField
          label="Search..."
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          size="small"
          style={{ width: "30%" }}
        />
        <Box>
          <IconButton onClick={handleCopyToClipboard}>
            <FontAwesomeIcon icon={faCopy} />
          </IconButton>
          <IconButton onClick={handleExportToExcel}>
            <FontAwesomeIcon icon={faFileExcel} />
          </IconButton>
          <IconButton onClick={handleExportToCSV}>
            <FontAwesomeIcon icon={faFileCsv} />
          </IconButton>
          <IconButton onClick={handleExportToPDF}>
            <FontAwesomeIcon icon={faFilePdf} />
          </IconButton>
          <IconButton onClick={handlePrint}>
            <FontAwesomeIcon icon={faPrint} />
          </IconButton>
        </Box>
      </Box>

      <Button
        variant="contained"
        color="primary"
        startIcon={<FontAwesomeIcon icon={faPlus} />}
        sx={{ mb: 2 }}
        onClick={handleAddOperationClick} // Open the dialog when clicked
      >
        Add Operation
      </Button>

      {/* Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Name</strong>
              </TableCell>
              <TableCell>
                <strong>Category</strong>
              </TableCell>
              <TableCell align="right">
                <strong>Action</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((operation, index) => (
              <TableRow key={index}>
                <TableCell>{operation.name}</TableCell>
                <TableCell>{operation.category}</TableCell>
                <TableCell align="right">
                  <IconButton
                    color="primary"
                    onClick={() => alert(`Edit operation: ${operation.name}`)}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => handleDelete(index)}
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="body2" mt={2}>
        Records: 1 to {filteredData.length} of {data.length}
      </Typography>

      {/* Dialog for adding new operation */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Add New Operation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the name of the new operation below:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Operation Name"
            fullWidth
            value={newOperation}
            onChange={(e) => setNewOperation(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSaveOperation} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notification */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="success">
          New operation added!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default OperationList;
