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

// Dummy data for the source list
const initialData = [
  {
    source: "Front Office",
    description:
      "Visitor centers used to provide fairly basic information about the place, corporation or event they are celebrating, acting more as the entry way to a place. The role of the visitor center has been rapidly evolving over the past 10 years.",
  },
  {
    source: "From visitors",
    description:
      "Visitor centers used to provide fairly basic information about the place, corporation or event they are celebrating.",
  },
  {
    source: "Online Advertising",
    description:
      "Online advertising, also known as online marketing, Internet advertising, digital advertising or web advertising, is a form of marketing and advertising which uses the Internet to deliver promotional marketing messages to consumers.",
  },
  {
    source: "Social Media",
    description:
      "Social media platforms are used for customer feedback and inquiries.",
  },
  {
    source: "Email Marketing",
    description: "Email campaigns are used to gather feedback from customers.",
  },
  {
    source: "Telephone Survey",
    description: "Telephone calls are made to gather customer feedback.",
  },
];

const SourceList = () => {
  const [data, setData] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false); // Dialog state
  const [newSource, setNewSource] = useState("");
  const [newDescription, setNewDescription] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 3; // Show 3 records per page

  // Handle search
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to page 1 when searching
  };

  // Calculate pagination data
  const filteredData = data.filter(
    (item) =>
      item.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / recordsPerPage);
  const currentRecords = filteredData.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  // Handle opening and closing of the dialog box
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Handle saving new source and description
  const handleSave = () => {
    if (newSource && newDescription) {
      setData((prevData) => [
        ...prevData,
        { source: newSource, description: newDescription },
      ]);
      setNewSource("");
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
        Source: item.source,
        Description: item.description,
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "SourceList");
    XLSX.writeFile(workbook, "SourceList.xlsx");
  };

  // Export to CSV
  const handleExportToCSV = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      data.map((item) => ({
        Source: item.source,
        Description: item.description,
      }))
    );
    const csvData = XLSX.utils.sheet_to_csv(worksheet);
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "SourceList.csv";
    link.click();
  };

  // Export to PDF
  const handleExportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Source List", 20, 10);
    doc.autoTable({
      head: [["Source", "Description"]],
      body: data.map((item) => [item.source, item.description]),
    });
    doc.save("SourceList.pdf");
  };

  // Copy to Clipboard
  const handleCopyToClipboard = () => {
    const textToCopy = data
      .map((item) => `${item.source}: ${item.description}`)
      .join("\n");
    navigator.clipboard.writeText(textToCopy).then(() => {
      alert("Source list copied to clipboard!");
    });
  };

  // Print functionality
  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(
      "<html><head><title>Print Source List</title></head><body>"
    );
    printWindow.document.write("<h2>Source List</h2><ul>");
    data.forEach((item) => {
      printWindow.document.write(
        `<li><strong>${item.source}:</strong> ${item.description}</li>`
      );
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
        <Typography variant="h5">Source List</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<FontAwesomeIcon icon={faPlus} />}
          onClick={handleClickOpen} // Open the dialog box
        >
          Add Source
        </Button>
      </div>

      {/* Dialog for adding new source */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Source</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the new source and its description below:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Source"
            fullWidth
            value={newSource}
            onChange={(e) => setNewSource(e.target.value)}
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
                <strong>Source</strong>
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
                <TableCell>{item.source}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell align="right">
                  <IconButton
                    color="primary"
                    onClick={() => alert(`Edit source: ${item.source}`)}
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
      <div
        style={{
          marginTop: "10px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
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

export default SourceList;
