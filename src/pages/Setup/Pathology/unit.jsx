import React, { useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  Button,
  IconButton,
  TableContainer,
  Paper,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCopy,
  faFileExcel,
  faFilePdf,
  faFileCsv,
  faPrint,
  faEdit,
  faTrashAlt,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

const UnitList = () => {
  const [units, setUnits] = useState([
    "Micrometer (oi)",
    "mmol/L",
    "Dalton (Da)",
    "Nanometer",
    "million/mm3",
    "Cells / cubic millimeter",
    "U/L",
    "Non Reaktif/Negatif",
    "IU/L",
    "IU/mL",
    "mcg",
    "mcg/dL",
    "mcg/L",
    "mg/dL",
    "cells/µL",
    // Add more units if needed
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // For pagination
  const itemsPerPage = 5; // Number of items per page

  // Export to Excel function
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      units.map((unit) => ({ Unit: unit }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Units");
    XLSX.writeFile(workbook, "Units.xlsx");
  };

  // Export to PDF function
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Unit List", 20, 10);
    doc.autoTable({
      head: [["Unit Name"]],
      body: units.map((unit) => [unit]),
    });
    doc.save("Units.pdf");
  };

  // Export to CSV function
  const exportToCSV = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      units.map((unit) => ({ Unit: unit }))
    );
    const csv = XLSX.utils.sheet_to_csv(worksheet);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Units.csv";
    link.click();
  };

  // Print function
  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write("<h1>Unit List</h1><ul>");
    units.forEach((unit) => {
      printWindow.document.write(`<li>${unit}</li>`);
    });
    printWindow.document.write("</ul>");
    printWindow.document.close();
    printWindow.print();
  };

  // Copy to clipboard function
  const copyToClipboard = () => {
    navigator.clipboard.writeText(units.join("\n"));
    alert("Units copied to clipboard");
  };

  // Edit and delete logic
  const handleEdit = (index) => {
    const newUnit = prompt("Edit Unit", units[index]);
    if (newUnit) {
      const updatedUnits = [...units];
      updatedUnits[index] = newUnit;
      setUnits(updatedUnits);
    }
  };

  const handleDelete = (index) => {
    const updatedUnits = units.filter((_, i) => i !== index);
    setUnits(updatedUnits);
  };

  // Add new unit logic
  const handleAddUnit = () => {
    const newUnit = prompt("Add new unit");
    if (newUnit) {
      setUnits([...units, newUnit]);
    }
  };

  // Search logic
  const filteredUnits = units.filter((unit) =>
    unit.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUnits = filteredUnits.slice(indexOfFirstItem, indexOfLastItem);

  const handleNext = () => {
    if (indexOfLastItem < filteredUnits.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Unit List</h2>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <TextField
          label="Search..."
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          size="small"
        />
        <Button
          variant="contained"
          color="primary"
          startIcon={<FontAwesomeIcon icon={faPlus} />}
          onClick={handleAddUnit}
        >
          Add Unit
        </Button>
      </div>

      <div style={{ margin: "10px 0", display: "flex", justifyContent: "flex-end" }}>
        <IconButton onClick={copyToClipboard}>
          <FontAwesomeIcon icon={faCopy} />
        </IconButton>
        <IconButton onClick={exportToExcel}>
          <FontAwesomeIcon icon={faFileExcel} />
        </IconButton>
        <IconButton onClick={exportToCSV}>
          <FontAwesomeIcon icon={faFileCsv} />
        </IconButton>
        <IconButton onClick={exportToPDF}>
          <FontAwesomeIcon icon={faFilePdf} />
        </IconButton>
        <IconButton onClick={handlePrint}>
          <FontAwesomeIcon icon={faPrint} />
        </IconButton>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Unit Name</strong>
              </TableCell>
              <TableCell align="right">
                <strong>Action</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentUnits.map((unit, index) => (
              <TableRow key={index}>
                <TableCell>{unit}</TableCell>
                <TableCell align="right">
                  <IconButton color="primary" onClick={() => handleEdit(index)}>
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

      <div style={{ marginTop: "10px", display: "flex", justifyContent: "space-between" }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={handlePrevious}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleNext}
          disabled={indexOfLastItem >= filteredUnits.length}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default UnitList;
