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

// Dummy data for the appointment priority list
const initialData = [
  { priority: "Normal" },
  { priority: "Urgent" },
  { priority: "Very Urgent" },
  { priority: "Low" },
  { priority: "Critical" },
  { priority: "Medium" },
  { priority: "Very Low" },
];

const AppointmentPriorityList = () => {
  const [data, setData] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false); // Dialog state
  const [newPriority, setNewPriority] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 3; // Number of records per page

  // Calculate indices for pagination
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = data
    .filter((item) =>
      item.priority.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(indexOfFirstRecord, indexOfLastRecord);

  const totalPages = Math.ceil(
    data.filter((item) =>
      item.priority.toLowerCase().includes(searchTerm.toLowerCase())
    ).length / recordsPerPage
  );

  // Handle search
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to page 1 on new search
  };

  // Handle opening and closing of the dialog box
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Handle saving new priority
  const handleSave = () => {
    if (newPriority) {
      setData((prevData) => [...prevData, { priority: newPriority }]);
      setNewPriority("");
      handleClose(); // Close the dialog after saving
    } else {
      alert("Please enter a priority");
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
        Priority: item.priority,
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "AppointmentPriorities");
    XLSX.writeFile(workbook, "AppointmentPriorities.xlsx");
  };

  // Export to CSV
  const handleExportToCSV = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      data.map((item) => ({
        Priority: item.priority,
      }))
    );
    const csvData = XLSX.utils.sheet_to_csv(worksheet);
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "AppointmentPriorities.csv";
    link.click();
  };

  // Export to PDF
  const handleExportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Appointment Priority List", 20, 10);
    doc.autoTable({
      head: [["Priority"]],
      body: data.map((item) => [item.priority]),
    });
    doc.save("AppointmentPriorities.pdf");
  };

  // Copy to Clipboard
  const handleCopyToClipboard = () => {
    const textToCopy = data.map((item) => item.priority).join("\n");
    navigator.clipboard.writeText(textToCopy).then(() => {
      alert("Appointment priorities copied to clipboard!");
    });
  };

  // Print functionality
  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(
      "<html><head><title>Print Appointment Priorities</title></head><body>"
    );
    printWindow.document.write("<h2>Appointment Priority List</h2><ul>");
    data.forEach((item) => {
      printWindow.document.write(`<li>${item.priority}</li>`);
    });
    printWindow.document.write("</ul></body></html>");
    printWindow.document.close();
    printWindow.print();
  };

  // Pagination controls
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
        <Typography variant="h5">Appointment Priority List</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<FontAwesomeIcon icon={faPlus} />}
          onClick={handleClickOpen} // Open the dialog box
        >
          Add Priority
        </Button>
      </div>

      {/* Dialog for adding new priority */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Priority</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the new appointment priority below:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Priority"
            fullWidth
            value={newPriority}
            onChange={(e) => setNewPriority(e.target.value)}
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
                <strong>Priority</strong>
              </TableCell>
              <TableCell align="right">
                <strong>Action</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentRecords.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.priority}</TableCell>
                <TableCell align="right">
                  <IconButton
                    color="primary"
                    onClick={() =>
                      alert(`Edit priority: ${item.priority}`)
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
          Records: {indexOfFirstRecord + 1} to{" "}
          {Math.min(indexOfLastRecord, data.length)} of {data.length}
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

export default AppointmentPriorityList;

