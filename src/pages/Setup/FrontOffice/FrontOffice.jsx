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
import { useNavigate } from "react-router-dom";

// Dummy data for the purpose list
const initialData = [
  {
    purpose: "Visit",
    description:
      "Visitor centers used to provide fairly basic information about the place, corporation or event they are celebrating, acting more as the entryway to a place. The role of the visitor center has been rapidly evolving over the past 10 years.",
  },
  {
    purpose: "Inquiry",
    description:
      "Inquiry is an approach to learning that involves a process of exploring the natural or material world, and that leads to asking questions, making discoveries, and testing those discoveries in the search for new understanding.",
  },
  {
    purpose: "Seminar",
    description:
      "A seminar may be defined as a gathering of people for the purpose of discussing a stated topic. Such gatherings are usually interactive sessions where participants engage in discussions about the delineated topic.",
  },
  {
    purpose: "Demo",
    description: "Demo",
  },
];

const FrontOfficel = () => {
  const [data, setData] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 2; // Number of records per page

  const [open, setOpen] = useState(false); // State to handle dialog visibility
  const [newPurpose, setNewPurpose] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const navigate = useNavigate();

  // Calculate the indices for pagination
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = data
    .filter(
      (item) =>
        item.purpose.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(indexOfFirstRecord, indexOfLastRecord);

  const totalPages = Math.ceil(data.length / recordsPerPage);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to page 1 on new search
  };

  // Pagination handlers
  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  // Handle opening and closing of the dialog box
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Handle saving new purpose and description
  const handleSave = () => {
    if (newPurpose && newDescription) {
      setData((prevData) => [
        ...prevData,
        { purpose: newPurpose, description: newDescription },
      ]);
      setNewPurpose("");
      setNewDescription("");
      handleClose(); // Close the dialog after saving
    } else {
      alert("Please fill out both fields");
    }
  };

  // Export to Excel
  const handleExportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      data.map((item) => ({
        Purpose: item.purpose,
        Description: item.description,
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "ReferralCategories");
    XLSX.writeFile(workbook, "ReferralCategories.xlsx");
  };

  // Export to CSV
  const handleExportToCSV = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      data.map((item) => ({
        Purpose: item.purpose,
        Description: item.description,
      }))
    );
    const csvData = XLSX.utils.sheet_to_csv(worksheet);
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "ReferralCategories.csv";
    link.click();
  };

  // Export to PDF
  const handleExportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Referral Categories", 20, 10);
    doc.autoTable({
      head: [["Purpose", "Description"]],
      body: data.map((item) => [item.purpose, item.description]),
    });
    doc.save("ReferralCategories.pdf");
  };

  // Copy to Clipboard
  const handleCopyToClipboard = () => {
    const textToCopy = data
      .map((item) => `${item.purpose}: ${item.description}`)
      .join("\n");
    navigator.clipboard.writeText(textToCopy).then(() => {
      alert("Referral categories copied to clipboard!");
    });
  };

  // Print functionality
  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(
      "<html><head><title>Print Categories</title></head><body>"
    );
    printWindow.document.write("<h2>Referral Category List</h2><ul>");
    data.forEach((item) => {
      printWindow.document.write(
        `<li><strong>${item.purpose}:</strong> ${item.description}</li>`
      );
    });
    printWindow.document.write("</ul></body></html>");
    printWindow.document.close();
    printWindow.print();
  };

  // Delete category functionality
  const handleDelete = (index) => {
    const updatedData = data.filter((_, i) => i !== index);
    setData(updatedData);
  };

  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar */}
      <div style={{ width: "20%", padding: "20px", backgroundColor: "#f4f6f9" }}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginBottom: "20px" }}
          onClick={() => navigate("/setup/front-office")}>Purpose</Button>
        
        <Button
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginBottom: "20px" }}
          onClick={() => navigate("/setup/complaint")}
        >
          Complain Type
        </Button>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginBottom: "20px" }}
          onClick={() => navigate("/setup/sourcelist")}
        >
          Source
        </Button>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => navigate("/setup/appoinmentprioritylist")}
        >
          Appointment Priority
        </Button>
      </div>

      {/* Main Content */}
      <div style={{ flexGrow: 1, padding: "20px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h5">Purpose List</Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<FontAwesomeIcon icon={faPlus} />}
            onClick={handleClickOpen} // Open the dialog box
          >
            Add Purpose
          </Button>
        </div>

        {/* Dialog for adding new purpose */}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add New Purpose</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter the new purpose and its description below:
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label="Purpose"
              fullWidth
              value={newPurpose}
              onChange={(e) => setNewPurpose(e.target.value)}
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
                  <strong>Purpose</strong>
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
                  <TableCell>{item.purpose}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      color="primary"
                      onClick={() => alert(`Edit purpose: ${item.purpose}`)}
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
    </div>
  );
};

export default FrontOfficel;

