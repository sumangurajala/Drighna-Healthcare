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

// Initial dummy data
const initialDosages = [
  { category: "Syrup", dosage: "1 mg/dL" },
  { category: "Syrup", dosage: "10 mg/dL" },
  { category: "Capsule", dosage: "1 MG" },
  { category: "Capsule", dosage: "demo MG" },
  { category: "Cream", dosage: "1 mg/dL" },
  { category: "Injection", dosage: "0.5 mg/dL" },
  { category: "Injection", dosage: "1 mg/dL" },
  { category: "Injection", dosage: "23 Hour" },
  { category: "Drops", dosage: "1 Day" },
  { category: "Tablet", dosage: "1/2 Day" },
  { category: "Tablet", dosage: "1 Day" },
];

const itemsPerPage = 5; // Define how many items per page

const MedicineDosageList = () => {
  const [data, setData] = useState(initialDosages);
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [newDosage, setNewDosage] = useState("");
  const [editIndex, setEditIndex] = useState(null); // For editing
  const [currentPage, setCurrentPage] = useState(1); // Pagination state

  // Handle search
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Handle opening and closing of the dialog box
  const handleClickOpen = (index = null) => {
    if (index !== null) {
      const { category, dosage } = data[index];
      setNewCategory(category);
      setNewDosage(dosage);
      setEditIndex(index);
    } else {
      setNewCategory("");
      setNewDosage("");
      setEditIndex(null);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Handle saving new or edited dosage
  const handleSave = () => {
    if (newCategory.trim() && newDosage.trim()) {
      const newEntry = { category: newCategory.trim(), dosage: newDosage.trim() };
      if (editIndex !== null) {
        // Editing existing entry
        const updatedData = [...data];
        updatedData[editIndex] = newEntry;
        setData(updatedData);
      } else {
        // Adding new entry
        setData((prevData) => [...prevData, newEntry]);
      }
      handleClose();
    } else {
      alert("Please enter valid category and dosage");
    }
  };

  // Handle deletion
  const handleDelete = (index) => {
    const updatedData = data.filter((_, i) => i !== index);
    setData(updatedData);
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const filteredData = data.filter(
    (entry) =>
      entry.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.dosage.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

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

  // Export functions
  const handleExportToExcel = useCallback(() => {
    const worksheet = XLSX.utils.json_to_sheet(
      data.map((entry) => ({ Category: entry.category, Dosage: entry.dosage }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "MedicineDosages");
    XLSX.writeFile(workbook, "MedicineDosages.xlsx");
  }, [data]);

  const handleExportToCSV = useCallback(() => {
    const worksheet = XLSX.utils.json_to_sheet(
      data.map((entry) => ({ Category: entry.category, Dosage: entry.dosage }))
    );
    const csvData = XLSX.utils.sheet_to_csv(worksheet);
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "MedicineDosages.csv";
    link.click();
  }, [data]);

  const handleExportToPDF = useCallback(() => {
    const doc = new jsPDF();
    doc.text("Medicine Dosage List", 20, 10);
    doc.autoTable({
      head: [["Category", "Dosage"]],
      body: data.map((entry) => [entry.category, entry.dosage]),
    });
    doc.save("MedicineDosages.pdf");
  }, [data]);

  const handleCopyToClipboard = useCallback(() => {
    const textToCopy = data.map((entry) => `${entry.category}: ${entry.dosage}`).join("\n");
    navigator.clipboard.writeText(textToCopy).then(() => {
      alert("Medicine dosages copied to clipboard!");
    });
  }, [data]);

  const handlePrint = useCallback(() => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(
      "<html><head><title>Print Medicine Dosages</title></head><body>"
    );
    printWindow.document.write("<h2>Medicine Dosage List</h2><ul>");
    data.forEach((entry) => {
      printWindow.document.write(`<li>${entry.category}: ${entry.dosage}</li>`);
    });
    printWindow.document.write("</ul></body></html>");
    printWindow.document.close();
    printWindow.print();
  }, [data]);

  return (
    <Grid container>
      {/* Main Content */}
      <Grid item xs={12} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Medicine Dosage List
        </Typography>

        <Button
          variant="contained"
          color="primary"
          startIcon={<FontAwesomeIcon icon={faPlus} />}
          onClick={() => handleClickOpen()}
          sx={{ mb: 2 }}
        >
          Add Medicine Dosage
        </Button>

        {/* Dialog for adding or editing dosage */}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{editIndex !== null ? "Edit Dosage" : "Add New Dosage"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter the {editIndex !== null ? "updated" : "new"} dosage information below.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label="Category"
              fullWidth
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Dosage"
              fullWidth
              value={newDosage}
              onChange={(e) => setNewDosage(e.target.value)}
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
                  <strong>Category Name</strong>
                </TableCell>
                <TableCell>
                  <strong>Dosage</strong>
                </TableCell>
                <TableCell align="right">
                  <strong>Action</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentItems.map((entry, index) => (
                <TableRow key={index}>
                  <TableCell>{entry.category}</TableCell>
                  <TableCell>{entry.dosage}</TableCell>
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

        {/* Pagination Controls */}
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
          {Math.min(indexOfLastItem, filteredData.length)} of {filteredData.length}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default MedicineDosageList;
