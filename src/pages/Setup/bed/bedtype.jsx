import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCopy,
  faFileExcel,
  faFilePdf,
  faFileCsv,
  faPrint,
  faPlus,
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
  Pagination,
} from "@mui/material";
import * as XLSX from "xlsx"; // For Excel and CSV export
import jsPDF from "jspdf"; // For PDF export
import "jspdf-autotable"; // For table support in jsPDF
import "./bed.css";

const BedTypeList = () => {
  const [bedTypes, setBedTypes] = useState([
    { name: "Standard" },
    { name: "VIP" },
    { name: "NORMAL" },
    { name: "demo" },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  // Filter bed types based on search term
  const filteredBedTypes = bedTypes.filter((bedType) =>
    bedType.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedBedTypes = filteredBedTypes.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  const totalPages = Math.ceil(filteredBedTypes.length / itemsPerPage);

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  // Handle adding a new bed type
  const handleAddBedType = () => {
    const newBedType = prompt("Enter new bed type:");
    if (newBedType && !bedTypes.some((bedType) => bedType.name === newBedType)) {
      setBedTypes([...bedTypes, { name: newBedType }]);
    } else {
      alert("Please enter a unique bed type.");
    }
  };

  // Handle deleting a bed type
  const handleDeleteBedType = (index) => {
    if (window.confirm("Are you sure you want to delete this bed type?")) {
      setBedTypes(bedTypes.filter((_, i) => i !== index));
    }
  };

  // Handle pagination
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // Copy to Clipboard functionality
  const handleCopyToClipboard = () => {
    const textToCopy = bedTypes.map((bedType) => bedType.name).join("\n");
    navigator.clipboard.writeText(textToCopy).then(() => {
      alert("Bed Type list copied to clipboard!");
    });
  };

  // Export to Excel functionality
  const handleExportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(bedTypes);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Bed Types");
    XLSX.writeFile(workbook, "BedTypes.xlsx");
  };

  // Export to CSV functionality
  const handleExportToCSV = () => {
    const worksheet = XLSX.utils.json_to_sheet(bedTypes);
    const csvData = XLSX.utils.sheet_to_csv(worksheet);
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.setAttribute("href", URL.createObjectURL(blob));
    link.setAttribute("download", "BedTypes.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export to PDF functionality
  const handleExportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Bed Type List", 20, 10);
    doc.autoTable({
      head: [["Bed Type"]],
      body: bedTypes.map((bedType) => [bedType.name]),
    });
    doc.save("BedTypes.pdf");
  };

  // Print functionality
  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write("<html><head><title>Print Bed Types</title></head><body>");
    printWindow.document.write("<h2>Bed Type List</h2><ul>");
    bedTypes.forEach((bedType) => {
      printWindow.document.write(`<li>${bedType.name}</li>`);
    });
    printWindow.document.write("</ul></body></html>");
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Bed Type List</h2>

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
        <div>
          <Button
            variant="contained"
            color="primary"
            startIcon={<FontAwesomeIcon icon={faPlus} />}
            onClick={handleAddBedType}
          >
            Add Bed Type
          </Button>
        </div>
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
              <TableCell><strong>Purpose</strong></TableCell>
              <TableCell align="right"><strong>Action</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedBedTypes.map((bedType, index) => (
              <TableRow key={index}>
                <TableCell>{bedType.name}</TableCell>
                <TableCell align="right">
                  <IconButton
                    color="primary"
                    onClick={() => alert(`Edit bed type: ${bedType.name}`)}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => handleDeleteBedType(index)}
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
      <div style={{ marginTop: "10px", display: "flex", justifyContent: "space-between" }}>
        <p>{`Records: ${startIndex + 1} to ${Math.min(
          startIndex + itemsPerPage,
          filteredBedTypes.length
        )} of ${filteredBedTypes.length}`}</p>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          variant="outlined"
          shape="rounded"
          color="primary"
        />
      </div>
    </div>
  );
};

export default BedTypeList;
