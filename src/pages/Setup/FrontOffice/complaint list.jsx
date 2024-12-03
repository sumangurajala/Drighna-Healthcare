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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

// Dummy data for the complain type list
const initialData = [
  {
    complainType: "Food quality",
    description:
      "A reference to a set of rules that were followed when the resource was constructed, and which must be understood when processing the content. Often, this is a reference to an implementation guide that defines the special rules along with other profiles etc.",
  },
  {
    complainType: "Hospital services",
    description: "",
  },
  {
    complainType: "Billing Discrepancies",
    description: "",
  },
  {
    complainType: "Long Wait Times",
    description: "",
  },
  {
    complainType: "Service Delay",
    description: "",
  },
  {
    complainType: "Doctor Availability",
    description: "",
  },
];

const ComplaintTypeList = () => {
  const [data, setData] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false); // Dialog state
  const [newComplainType, setNewComplainType] = useState("");
  const [newDescription, setNewDescription] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 3;

  // Filtered and paginated data
  const filteredData = data.filter(
    (item) =>
      item.complainType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const totalPages = Math.ceil(filteredData.length / recordsPerPage);
  const currentRecords = filteredData.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  // Handle search
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  // Handle opening and closing of the dialog box
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Handle saving new complain type and description
  const handleSave = () => {
    if (newComplainType && newDescription) {
      setData((prevData) => [
        ...prevData,
        { complainType: newComplainType, description: newDescription },
      ]);
      setNewComplainType("");
      setNewDescription("");
      handleClose(); // Close the dialog after saving
    } else {
      alert("Please fill out both fields");
    }
  };

  // Handle deletion
  const handleDelete = (index) => {
    const updatedData = data.filter((_, i) => i !== index);
    setData(updatedData);
  };

  // Export to Excel
  const handleExportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      data.map((item) => ({
        "Complain Type": item.complainType,
        Description: item.description,
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "ComplaintTypes");
    XLSX.writeFile(workbook, "ComplaintTypes.xlsx");
  };

  // Export to CSV
  const handleExportToCSV = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      data.map((item) => ({
        "Complain Type": item.complainType,
        Description: item.description,
      }))
    );
    const csvData = XLSX.utils.sheet_to_csv(worksheet);
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "ComplaintTypes.csv";
    link.click();
  };

  // Export to PDF
  const handleExportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Complaint Types", 20, 10);
    doc.autoTable({
      head: [["Complain Type", "Description"]],
      body: data.map((item) => [item.complainType, item.description]),
    });
    doc.save("ComplaintTypes.pdf");
  };

  // Copy to Clipboard
  const handleCopyToClipboard = () => {
    const textToCopy = data
      .map((item) => `${item.complainType}: ${item.description}`)
      .join("\n");
    navigator.clipboard.writeText(textToCopy).then(() => {
      alert("Complaint types copied to clipboard!");
    });
  };

  // Print functionality
  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(
      "<html><head><title>Print Complaint Types</title></head><body>"
    );
    printWindow.document.write("<h2>Complaint Type List</h2><ul>");
    data.forEach((item) => {
      printWindow.document.write(
        `<li><strong>${item.complainType}:</strong> ${item.description}</li>`
      );
    });
    printWindow.document.write("</ul></body></html>");
    printWindow.document.close();
    printWindow.print();
  };

  // Pagination handlers
  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h5">Complaint Type List</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<FontAwesomeIcon icon={faPlus} />}
          onClick={handleClickOpen} // Open the dialog box
        >
          Add Complaint Type
        </Button>
      </div>

      {/* Dialog for adding new complaint type */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Complaint Type</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the new complaint type and its description below:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Complain Type"
            fullWidth
            value={newComplainType}
            onChange={(e) => setNewComplainType(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            multiline
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Search Field */}
      <div
        style={{
          margin: "20px 0",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <TextField
          label="Search..."
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          size="small"
          style={{ width: "30%" }}
        />
        <div>
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
        </div>
      </div>

      {/* Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Complain Type</strong>
              </TableCell>
              <TableCell>
                <strong>Description</strong>
              </TableCell>
              <TableCell align="right">
                <strong>Action</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentRecords.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.complainType}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell align="right">
                  <IconButton
                    color="primary"
                    onClick={() =>
                      alert(`Edit complain type: ${item.complainType}`)
                    }
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

      {/* Pagination Controls */}
      <div style={{ marginTop: "10px", display: "flex", justifyContent: "space-between" }}>
        <div>
          Records: {(currentPage - 1) * recordsPerPage + 1} to{" "}
          {Math.min(currentPage * recordsPerPage, filteredData.length)} of{" "}
          {filteredData.length}
        </div>
        <div>
          <Button
            variant="contained"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            style={{ marginRight: "10px" }}
          >
            Previous
          </Button>
          <Button
            variant="contained"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ComplaintTypeList;

