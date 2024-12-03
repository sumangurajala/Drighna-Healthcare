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

// Initial supplier data
const initialSuppliers = [
  {
    supplierName: "SGS Pharmacy",
    supplierContact: "7864251478",
    contactPerson: "Nitin Viraj",
    contactPhone: "7864251478",
    drugLicense: "RTD-74586",
    address: "Kudlu Gate",
  },
  {
    supplierName: "Anant Pharmacy",
    supplierContact: "9856478521",
    contactPerson: "Anant Singh",
    contactPhone: "9856478521",
    drugLicense: "SFR-96-HJNFV",
    address: "Majestic",
  },
  {
    supplierName: "VKS Pharmacy",
    supplierContact: "7546985214",
    contactPerson: "Vinay Shrivastava",
    contactPhone: "7546985214",
    drugLicense: "DFDR555-000",
    address: "Koramangala",
  },
  {
    supplierName: "demo",
    supplierContact: "demo",
    contactPerson: "demo",
    contactPhone: "demo",
    drugLicense: "demo",
    address: "demo",
  },
];

const SupplierList = () => {
  const [suppliers, setSuppliers] = useState(initialSuppliers);
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null); // Track editing index
  const [newSupplier, setNewSupplier] = useState({
    supplierName: "",
    supplierContact: "",
    contactPerson: "",
    contactPhone: "",
    drugLicense: "",
    address: "",
  });
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const suppliersPerPage = 2; // Define how many suppliers per page

  // Handle opening the dialog for adding/editing
  const handleClickOpen = (supplier = null, index = null) => {
    if (supplier) {
      setNewSupplier(supplier);
      setEditIndex(index);
    } else {
      setNewSupplier({
        supplierName: "",
        supplierContact: "",
        contactPerson: "",
        contactPhone: "",
        drugLicense: "",
        address: "",
      });
      setEditIndex(null);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Handle saving new or edited supplier
  const handleSave = () => {
    if (Object.values(newSupplier).every((field) => field.trim())) {
      if (editIndex !== null) {
        const updatedSuppliers = suppliers.map((supplier, i) =>
          i === editIndex ? newSupplier : supplier
        );
        setSuppliers(updatedSuppliers);
      } else {
        setSuppliers((prevSuppliers) => [...prevSuppliers, newSupplier]);
      }
      handleClose();
    } else {
      alert("Please fill out all fields.");
    }
  };

  // Handle deletion
  const handleDelete = (index) => {
    const updatedSuppliers = suppliers.filter((_, i) => i !== index);
    setSuppliers(updatedSuppliers);
  };

  // Pagination handlers
  const handleNextPage = () => {
    if (currentPage < Math.ceil(suppliers.length / suppliersPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Export to Excel
  const handleExportToExcel = useCallback(() => {
    const worksheet = XLSX.utils.json_to_sheet(suppliers);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Suppliers");
    XLSX.writeFile(workbook, "Suppliers.xlsx");
  }, [suppliers]);

  // Export to CSV
  const handleExportToCSV = useCallback(() => {
    const worksheet = XLSX.utils.json_to_sheet(suppliers);
    const csvData = XLSX.utils.sheet_to_csv(worksheet);
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Suppliers.csv";
    link.click();
  }, [suppliers]);

  // Export to PDF
  const handleExportToPDF = useCallback(() => {
    const doc = new jsPDF();
    doc.text("Supplier List", 20, 10);
    doc.autoTable({
      head: [["Supplier Name", "Supplier Contact", "Contact Person", "Contact Phone", "Drug License", "Address"]],
      body: suppliers.map((supplier) => [
        supplier.supplierName,
        supplier.supplierContact,
        supplier.contactPerson,
        supplier.contactPhone,
        supplier.drugLicense,
        supplier.address,
      ]),
    });
    doc.save("Suppliers.pdf");
  }, [suppliers]);

  // Copy to Clipboard
  const handleCopyToClipboard = useCallback(() => {
    const textToCopy = suppliers.map((supplier) => Object.values(supplier).join(", ")).join("\n");
    navigator.clipboard.writeText(textToCopy).then(() => {
      alert("Suppliers copied to clipboard!");
    });
  }, [suppliers]);

  // Handle search functionality
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Pagination logic
  const indexOfLastSupplier = currentPage * suppliersPerPage;
  const indexOfFirstSupplier = indexOfLastSupplier - suppliersPerPage;
  const currentSuppliers = suppliers.slice(indexOfFirstSupplier, indexOfLastSupplier);

  return (
    <Grid container>
      <Grid item xs={12} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Supplier List
        </Typography>

        {/* Add Supplier Button */}
        <Button
          variant="contained"
          color="primary"
          startIcon={<FontAwesomeIcon icon={faPlus} />}
          onClick={() => handleClickOpen()}
          sx={{ mb: 2 }}
        >
          Add Supplier
        </Button>

        {/* Search and export functionality */}
        <div style={{ margin: "20px 0", display: "flex", justifyContent: "space-between" }}>
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
            <IconButton onClick={() => window.print()}>
              <FontAwesomeIcon icon={faPrint} />
            </IconButton>
          </div>
        </div>

        {/* Table displaying supplier data */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Supplier Name</strong></TableCell>
                <TableCell><strong>Supplier Contact</strong></TableCell>
                <TableCell><strong>Contact Person Name</strong></TableCell>
                <TableCell><strong>Contact Person Phone</strong></TableCell>
                <TableCell><strong>Drug License Number</strong></TableCell>
                <TableCell><strong>Address</strong></TableCell>
                <TableCell><strong>Action</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentSuppliers
                .filter((supplier) =>
                  Object.values(supplier).some((value) =>
                    value.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                )
                .map((supplier, index) => (
                  <TableRow key={index}>
                    <TableCell>{supplier.supplierName}</TableCell>
                    <TableCell>{supplier.supplierContact}</TableCell>
                    <TableCell>{supplier.contactPerson}</TableCell>
                    <TableCell>{supplier.contactPhone}</TableCell>
                    <TableCell>{supplier.drugLicense}</TableCell>
                    <TableCell>{supplier.address}</TableCell>
                    <TableCell>
                      <IconButton color="primary" onClick={() => handleClickOpen(supplier, indexOfFirstSupplier + index)}>
                        <FontAwesomeIcon icon={faEdit} />
                      </IconButton>
                      <IconButton color="secondary" onClick={() => handleDelete(indexOfFirstSupplier + index)}>
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
            Page {currentPage} of {Math.ceil(suppliers.length / suppliersPerPage)}
          </Typography>
          <Button onClick={handleNextPage} disabled={currentPage >= Math.ceil(suppliers.length / suppliersPerPage)}>
            Next
          </Button>
        </div>

        {/* Records Count */}
        <Typography variant="body2" sx={{ mt: 2 }}>
          Records: {suppliers.length}
        </Typography>

        {/* Dialog for adding or editing a supplier */}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{editIndex !== null ? "Edit Supplier" : "Add New Supplier"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please fill in the details for the supplier below.
            </DialogContentText>
            <TextField
              margin="dense"
              label="Supplier Name"
              fullWidth
              value={newSupplier.supplierName}
              onChange={(e) => setNewSupplier({ ...newSupplier, supplierName: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Supplier Contact"
              fullWidth
              value={newSupplier.supplierContact}
              onChange={(e) => setNewSupplier({ ...newSupplier, supplierContact: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Contact Person Name"
              fullWidth
              value={newSupplier.contactPerson}
              onChange={(e) => setNewSupplier({ ...newSupplier, contactPerson: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Contact Person Phone"
              fullWidth
              value={newSupplier.contactPhone}
              onChange={(e) => setNewSupplier({ ...newSupplier, contactPhone: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Drug License Number"
              fullWidth
              value={newSupplier.drugLicense}
              onChange={(e) => setNewSupplier({ ...newSupplier, drugLicense: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Address"
              fullWidth
              value={newSupplier.address}
              onChange={(e) => setNewSupplier({ ...newSupplier, address: e.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleSave} color="primary">
              {editIndex !== null ? "Save Changes" : "Save"}
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </Grid>
  );
};

export default SupplierList;

