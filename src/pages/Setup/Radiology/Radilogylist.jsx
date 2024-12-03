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
import { useNavigate } from "react-router-dom";

const itemsPerPage = 5;

const initialData = [
  { id: 1, name: "DOPPLER PERIPHERAL BILATERAL (VENOUS)" },
  { id: 2, name: "CT CHEST PLAIN" },
  { id: 3, name: "CT 3D STUDY" },
  { id: 4, name: "M. R. C. P." },
  { id: 5, name: "Head CT Scan" },
  { id: 6, name: "Abdominal CT Scan" },
  { id: 7, name: "CT Angiography (CTA)" },
  { id: 8, name: "Upper Gastrointestinal (UGI) Series" },
  { id: 9, name: "Bone Densitometry" },
  { id: 10, name: "Thyroid Scan" },
  { id: 11, name: "Bone Scan" },
  { id: 12, name: "Oncologic PET Scan" },
  { id: 13, name: "Cardiac PET Scan" },
  { id: 14, name: "X-Ray" },
  { id: 15, name: "CT Scan" },
];

const RadiologySetup = () => {
  const [data, setData] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

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

  const handleSave = () => {
    const trimmedCategory = newCategory.trim();
    if (trimmedCategory) {
      if (editIndex !== null) {
        const updatedData = [...data];
        updatedData[editIndex] = { ...updatedData[editIndex], name: trimmedCategory };
        setData(updatedData);
      } else {
        const newEntry = { id: data.length + 1, name: trimmedCategory };
        setData((prevData) => [...prevData, newEntry]);
      }
      setNewCategory("");
      handleClose();
    } else {
      alert("Please enter a valid category");
    }
  };

  const handleDelete = (index) => {
    const updatedData = data.filter((_, i) => i !== index);
    setData(updatedData);
  };

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
      <Grid item xs={2} sx={{ backgroundColor: "#f4f6f9", padding: 2, borderRight: "1px solid #ccc", height: "100vh" }}>
        <Button variant="contained" fullWidth color="primary" sx={{ mb: 2 }} onClick={() => navigate("/setup/radiology")}>
          Pathology Category
        </Button>
        <Button variant="contained" fullWidth color="primary" sx={{ mb: 2 }} onClick={() => navigate("/setup/radiounit")}>
          Unit
        </Button>
        <Button variant="contained" fullWidth color="primary" sx={{ mb: 2 }} onClick={() => navigate("/setup/radio")}>
          Pathology Parameter
        </Button>
      </Grid>

      <Grid item xs={10} sx={{ p: 4 }}>
        <Button variant="contained" color="primary" startIcon={<FontAwesomeIcon icon={faPlus} />} onClick={() => handleClickOpen()} sx={{ mb: 2 }}>
          Add Category
        </Button>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{editIndex !== null ? "Edit Category" : "Add New Category"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter the {editIndex !== null ? "updated" : "new"} category name below:
            </DialogContentText>
            <TextField autoFocus margin="dense" label="Category" fullWidth value={newCategory} onChange={(e) => setNewCategory(e.target.value)} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">Cancel</Button>
            <Button onClick={handleSave} color="primary">Save</Button>
          </DialogActions>
        </Dialog>

        <div style={{ margin: "20px 0", display: "flex", justifyContent: "space-between" }}>
          <TextField label="Search..." variant="outlined" value={searchTerm} onChange={handleSearchChange} size="small" style={{ width: "30%" }} />
          <div>
            <IconButton onClick={handleCopyToClipboard}><FontAwesomeIcon icon={faCopy} /></IconButton>
            <IconButton onClick={handleExportToExcel}><FontAwesomeIcon icon={faFileExcel} /></IconButton>
            <IconButton onClick={handleExportToCSV}><FontAwesomeIcon icon={faFileCsv} /></IconButton>
            <IconButton onClick={handleExportToPDF}><FontAwesomeIcon icon={faFilePdf} /></IconButton>
            <IconButton onClick={handlePrint}><FontAwesomeIcon icon={faPrint} /></IconButton>
          </div>
        </div>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Name</strong></TableCell>
                <TableCell align="right"><strong>Action</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentItems.map((category, index) => (
                <TableRow key={category.id}>
                  <TableCell>{category.name}</TableCell>
                  <TableCell align="right">
                    <IconButton color="primary" onClick={() => handleClickOpen(indexOfFirstItem + index)}><FontAwesomeIcon icon={faEdit} /></IconButton>
                    <IconButton color="secondary" onClick={() => handleDelete(indexOfFirstItem + index)}><FontAwesomeIcon icon={faTrashAlt} /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <div style={{ margin: "20px 0", display: "flex", justifyContent: "space-between" }}>
          <Button onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</Button>
          <Typography variant="body2">Page {currentPage} of {totalPages}</Typography>
          <Button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</Button>
        </div>

        <Typography variant="body2" sx={{ mt: 2 }}>
          Records: {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, data.length)} of {data.length}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default RadiologySetup;

