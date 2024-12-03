import React, { useState, useCallback } from "react";
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
  Grid,
} from "@mui/material";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const itemsPerPage = 5; // Define how many items per page

// Dummy data for the operation category list
const initialData = [
  { id: 1, name: "Clinical Microbiology" },
  { id: 2, name: "Clinical Chemistry Tests" },
  { id: 3, name: "Hematology Tests" },
  { id: 4, name: "Molecular Diagnostics" },
  { id: 5, name: "Reproductive Biology" },
  { id: 6, name: "Electromagnetic Waves" },
  { id: 7, name: "Immun-Serology" },
  { id: 8, name: "Thyroid Function Tests" },
  { id: 9, name: "demo" },
];

const PathologySetup = () => {
  const [data, setData] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [editIndex, setEditIndex] = useState(null); // For editing
  const [currentPage, setCurrentPage] = useState(1); // For pagination
  const navigate = useNavigate(); // For navigation

  // Handle search
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Handle opening and closing of the dialog box
  const handleClickOpen = (index = null) => {
    if (index !== null) {
      setNewCategory(data[index].name);
      setEditIndex(index);
    } else {
      setNewCategory("");
      setEditIndex(null);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Handle saving new or edited category
  const handleSave = () => {
    const trimmedCategory = newCategory.trim();
    if (trimmedCategory) {
      if (editIndex !== null) {
        // Edit existing category
        const updatedData = [...data];
        updatedData[editIndex] = { ...updatedData[editIndex], name: trimmedCategory };
        setData(updatedData);
      } else {
        // Add new category
        const newEntry = { id: data.length + 1, name: trimmedCategory };
        setData((prevData) => [...prevData, newEntry]);
      }
      setNewCategory("");
      handleClose();
    } else {
      alert("Please enter a valid category");
    }
  };

  // Handle deletion
  const handleDelete = (index) => {
    const updatedData = data.filter((_, i) => i !== index);
    setData(updatedData);
  };

  // Export functions
  const handleExportToExcel = useCallback(() => {
    const worksheet = XLSX.utils.json_to_sheet(
      data.map((category) => ({ Category: category.name }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "OperationCategories");
    XLSX.writeFile(workbook, "OperationCategories.xlsx");
  }, [data]);

  const handleExportToCSV = useCallback(() => {
    const worksheet = XLSX.utils.json_to_sheet(
      data.map((category) => ({ Category: category.name }))
    );
    const csvData = XLSX.utils.sheet_to_csv(worksheet);
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "OperationCategories.csv";
    link.click();
  }, [data]);

  const handleExportToPDF = useCallback(() => {
    const doc = new jsPDF();
    doc.text("Operation Category List", 20, 10);
    doc.autoTable({
      head: [["Category"]],
      body: data.map((category) => [category.name]),
    });
    doc.save("OperationCategories.pdf");
  }, [data]);

  const handleCopyToClipboard = useCallback(() => {
    const textToCopy = data.map((category) => category.name).join("\n");
    navigator.clipboard.writeText(textToCopy).then(() => {
      alert("Operation categories copied to clipboard!");
    });
  }, [data]);

  const handlePrint = useCallback(() => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(
      "<html><head><title>Print Operation Categories</title></head><body>"
    );
    printWindow.document.write("<h2>Operation Category List</h2><ul>");
    data.forEach((category) => {
      printWindow.document.write(`<li>${category.name}</li>`);
    });
    printWindow.document.write("</ul></body></html>");
    printWindow.document.close();
    printWindow.print();
  }, [data]);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data
    .filter((category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(
    data.filter((category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase())
    ).length / itemsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <Grid container>
      {/* Sidebar */}
      <Grid
        item
        xs={2}
        sx={{
          backgroundColor: "#f4f6f9",
          padding: 2,
          borderRight: "1px solid #ccc",
          height: "100vh",
        }}
      >
        <Typography variant="h6" align="center" gutterBottom></Typography>
        <Button
          variant="contained"
          fullWidth
          color="primary"
          sx={{ mb: 2 }}
          onClick={() => navigate("/setup/pathology")}
        >
         Pathology Category
        </Button>
        <Button
          variant="contained"
          fullWidth
          color="primary"
          sx={{ mb: 2 }}
          onClick={() => navigate("/setup/unit")}
        >
          Unit
        </Button>
        <Button
          variant="contained"
          fullWidth
          color="primary"
          sx={{ mb: 2 }}
          onClick={() => navigate("/setup/parameterlist")}
        >
         Pathology Parameter
        </Button>
       
       
      </Grid>

      {/* Main Content */}
      <Grid item xs={10} sx={{ p: 4 }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<FontAwesomeIcon icon={faPlus} />}
          onClick={() => handleClickOpen()}
          sx={{ mb: 2 }}
        >
          Add Category
        </Button>

        {/* Dialog for adding or editing category */}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>
            {editIndex !== null ? "Edit Category" : "Add New Category"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter the {editIndex !== null ? "updated" : "new"} category
              name below:
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label="Category"
              fullWidth
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
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

        {/* Search and export functionality */}
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
                  <strong>Name</strong>
                </TableCell>
                <TableCell align="right">
                  <strong>Action</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentItems.map((category, index) => (
                <TableRow key={index}>
                  <TableCell>{category.name}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      color="primary"
                      onClick={() => handleClickOpen(indexOfFirstItem + index)}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </IconButton>
                    <IconButton
                      color="secondary"
                      onClick={() => handleDelete(indexOfFirstItem + index)}
                    >
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <div style={{ margin: "20px 0", display: "flex", justifyContent: "space-between" }}>
          <Button onClick={handlePreviousPage} disabled={currentPage === 1}>
            Previous
          </Button>
          <Typography variant="body2">
            Page {currentPage} of {totalPages}
          </Typography>
          <Button onClick={handleNextPage} disabled={currentPage === totalPages}>
            Next
          </Button>
        </div>

        {/* Records Count */}
        <Typography variant="body2" sx={{ mt: 2 }}>
          Records: {indexOfFirstItem + 1} to{" "}
          {Math.min(indexOfLastItem, data.length)} of {data.length}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default PathologySetup;
