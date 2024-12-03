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
  MenuItem,
  Select,
  FormControl,
} from "@mui/material";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

// Initial dummy data
const initialDurations = [
  { name: "demo" },
  { name: "1 Day" },
  { name: "2 Months" },
  { name: "5 Days" },
  { name: "3 Days" },
  { name: "1 Week" },
  { name: "2 Weeks" },
  { name: "1 Month" },
];

const DosageDurationList = () => {
  const [data, setData] = useState(initialDurations);
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [newDuration, setNewDuration] = useState("");
  const [editIndex, setEditIndex] = useState(null); // For editing
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const [itemsPerPage, setItemsPerPage] = useState(5); // Items per page

  // Handle search
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Handle opening and closing of the dialog box
  const handleClickOpen = (index = null) => {
    if (index !== null) {
      setNewDuration(data[index].name);
      setEditIndex(index);
    } else {
      setNewDuration("");
      setEditIndex(null);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Handle saving new or edited dosage duration
  const handleSave = () => {
    if (newDuration.trim()) {
      if (editIndex !== null) {
        // Editing existing entry
        const updatedData = [...data];
        updatedData[editIndex].name = newDuration.trim();
        setData(updatedData);
      } else {
        // Adding new entry
        setData((prevData) => [...prevData, { name: newDuration.trim() }]);
      }
      handleClose();
    } else {
      alert("Please enter a valid duration");
    }
  };

  // Handle deletion
  const handleDelete = (index) => {
    const updatedData = data.filter((_, i) => i !== index);
    setData(updatedData);
  };

  // Handle pagination controls
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const filteredData = data.filter((entry) =>
    entry.name.toLowerCase().includes(searchTerm.toLowerCase())
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

  // Handle number of items per page change
  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  // Export functions
  const handleExportToExcel = useCallback(() => {
    const worksheet = XLSX.utils.json_to_sheet(
      data.map((entry) => ({ Name: entry.name }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "DosageDurations");
    XLSX.writeFile(workbook, "DosageDurations.xlsx");
  }, [data]);

  const handleExportToCSV = useCallback(() => {
    const worksheet = XLSX.utils.json_to_sheet(
      data.map((entry) => ({ Name: entry.name }))
    );
    const csvData = XLSX.utils.sheet_to_csv(worksheet);
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "DosageDurations.csv";
    link.click();
  }, [data]);

  const handleExportToPDF = useCallback(() => {
    const doc = new jsPDF();
    doc.text("Dosage Duration List", 20, 10);
    doc.autoTable({
      head: [["Name"]],
      body: data.map((entry) => [entry.name]),
    });
    doc.save("DosageDurations.pdf");
  }, [data]);

  const handleCopyToClipboard = useCallback(() => {
    const textToCopy = data.map((entry) => `${entry.name}`).join("\n");
    navigator.clipboard.writeText(textToCopy).then(() => {
      alert("Dosage durations copied to clipboard!");
    });
  }, [data]);

  const handlePrint = useCallback(() => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(
      "<html><head><title>Print Dosage Durations</title></head><body>"
    );
    printWindow.document.write("<h2>Dosage Duration List</h2><ul>");
    data.forEach((entry) => {
      printWindow.document.write(`<li>${entry.name}</li>`);
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
          Dosage Duration List
        </Typography>

        <Button
          variant="contained"
          color="primary"
          startIcon={<FontAwesomeIcon icon={faPlus} />}
          onClick={() => handleClickOpen()}
          sx={{ mb: 2 }}
        >
          Add Dosage Duration
        </Button>

        {/* Dialog for adding or editing dosage duration */}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{editIndex !== null ? "Edit Duration" : "Add New Duration"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter the {editIndex !== null ? "updated" : "new"} duration information below.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label="Name"
              fullWidth
              value={newDuration}
              onChange={(e) => setNewDuration(e.target.value)}
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

        {/* Items per page and table */}
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
          <FormControl size="small" sx={{ minWidth: 80 }}>
            <Select
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
            >
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={25}>25</MenuItem>
              <MenuItem value={50}>50</MenuItem>
              <MenuItem value={100}>100</MenuItem>
            </Select>
          </FormControl>
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
              {currentItems.map((entry, index) => (
                <TableRow key={index}>
                  <TableCell>{entry.name}</TableCell>
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
        <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-between" }}>
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

export default DosageDurationList;
