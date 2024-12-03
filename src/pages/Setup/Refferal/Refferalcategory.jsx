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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

const ReferralCategoryList = () => {
  const [categories, setCategories] = useState([
    "District Hospital (DH)",
    "OPD Department",
    "IPD Department",
    "Clinical Services within the Community",
    "Valuing the Benefit of Clinical Services",
    "demo",
  ]);

  const [searchTerm, setSearchTerm] = useState(""); // Search term state
  const [open, setOpen] = useState(false); // Modal state
  const [newCategory, setNewCategory] = useState(""); // New category state

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Export to Excel functionality
  const handleExportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      categories.map((category) => ({
        Category: category,
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Categories");
    XLSX.writeFile(workbook, "ReferralCategories.xlsx");
  };

  // Export to CSV functionality
  const handleExportToCSV = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      categories.map((category) => ({
        Category: category,
      }))
    );
    const csvData = XLSX.utils.sheet_to_csv(worksheet);
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "ReferralCategories.csv";
    link.click();
  };

  // Export to PDF functionality
  const handleExportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Referral Categories", 20, 10);
    doc.autoTable({
      head: [["Category"]],
      body: categories.map((category) => [category]),
    });
    doc.save("ReferralCategories.pdf");
  };

  // Copy to Clipboard functionality
  const handleCopyToClipboard = () => {
    const textToCopy = categories.join("\n");
    navigator.clipboard.writeText(textToCopy).then(() => {
      alert("Referral categories copied to clipboard!");
    });
  };

  // Print functionality
  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write("<html><head><title>Print Categories</title></head><body>");
    printWindow.document.write("<h2>Referral Category List</h2><ul>");
    categories.forEach((category) => {
      printWindow.document.write(`<li>${category}</li>`);
    });
    printWindow.document.write("</ul></body></html>");
    printWindow.document.close();
    printWindow.print();
  };

  // Delete category functionality
  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      const updatedCategories = categories.filter((_, i) => i !== index);
      setCategories(updatedCategories);
    }
  };

  // Add new category functionality
  const handleAddCategory = () => {
    if (newCategory.trim() === "") {
      alert("Please enter a valid category name");
      return;
    }
    setCategories([...categories, newCategory]);
    setNewCategory("");
    setOpen(false); // Close modal
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* Navigation Buttons
      <div className="input-fields-container" style={{ marginBottom: "20px" }}>
        <button
          className="category-button"
          style={{
            marginRight: "10px",
            padding: "10px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
          onClick={() => alert("Navigate to Leave Type")}
        >
          Leave Type
        </button>
        <button
          className="category-button"
          style={{
            padding: "10px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
          onClick={() => alert("Navigate to Department")}
        >
          Department
        </button>
      </div> */}

      <h2>Referral Category List</h2>

      {/* Search and Add Button Row */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
        <TextField
          label="Search..."
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          size="small"
          style={{ width: "30%" }}
        />
        <Button
          variant="contained"
          color="primary"
          startIcon={<FontAwesomeIcon icon={faPlus} />}
          onClick={() => setOpen(true)} // Open modal
        >
          Add Referral Category
        </Button>
      </div>

      {/* Export Buttons */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "10px" }}>
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

      {/* Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Category</strong></TableCell>
              <TableCell align="right"><strong>Action</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories
              .filter((category) =>
                category.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((category, index) => (
                <TableRow key={index}>
                  <TableCell>{category}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      color="primary"
                      onClick={() => alert(`Edit category: ${category}`)}
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

      <div>Records: 1 to {categories.length} of {categories.length}</div>

      {/* Modal for Adding Referral Category */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add New Referral Category</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Category Name"
            fullWidth
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">Cancel</Button>
          <Button onClick={handleAddCategory} color="primary">Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ReferralCategoryList;


