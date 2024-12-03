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
import * as XLSX from "xlsx"; // For Excel and CSV export
import jsPDF from "jspdf"; // For PDF export
import "jspdf-autotable"; // For table support in jsPDF


const FloorList = () => {
  const [floors, setFloors] = useState([
    { name: "demo floor", description: "demo" },
    { name: "4th Floor", description: "The coronary/cardiac care unit (CCU) is a specialized intensive care unit for cardiac issues." },
    { name: "3rd Floor", description: "A palliative or hospice unit is where end-of-life care is provided if you have a life-limiting illness." },
    { name: "2nd Floor", description: "The pediatric intensive care unit (PICU) where children receive critical care." },
    { name: "1st Floor", description: "Neonatal intensive care units (NICUs) which provide care for newborn infants." },
    { name: "Ground Floor", description: "A good choice here would be luxury vinyl tile (LVT), vinyl composition tile (VCT), or rubber." }
  ]);

  const [open, setOpen] = useState(false); // Modal state
  const [newFloor, setNewFloor] = useState({ name: "", description: "" });
  const [searchTerm, setSearchTerm] = useState(""); // Search term state

  const handleAddFloor = () => {
    setNewFloor({ name: "", description: "" });
    setOpen(true); // Open the modal
  };

  const handleClose = () => {
    setOpen(false); // Close the modal
  };

  const handleSave = () => {
    if (newFloor.name && newFloor.description) {
      setFloors([...floors, newFloor]);
      setOpen(false); // Close the modal after saving
    } else {
      alert("Please fill in all required fields.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewFloor((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Filter floors based on search term
  const filteredFloors = floors.filter((floor) =>
    floor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    floor.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Export to Excel functionality
  const handleExportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(floors); // Create worksheet from floors array
    const workbook = XLSX.utils.book_new(); // Create new workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Floors"); // Add worksheet to workbook
    XLSX.writeFile(workbook, "Floors.xlsx"); // Export Excel file
  };

  // Export to CSV functionality
  const handleExportToCSV = () => {
    const worksheet = XLSX.utils.json_to_sheet(floors); // Create worksheet
    const csvData = XLSX.utils.sheet_to_csv(worksheet); // Convert worksheet to CSV
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" }); // Create a Blob object for CSV
    const link = document.createElement("a"); // Create a temporary link element
    link.href = URL.createObjectURL(blob); // Set Blob as URL
    link.download = "Floors.csv"; // Set download file name
    document.body.appendChild(link); // Append link to body
    link.click(); // Programmatically click the link to start the download
    document.body.removeChild(link); // Remove link after download
  };

  // Export to PDF functionality
  const handleExportToPDF = () => {
    const doc = new jsPDF(); // Create a new jsPDF instance
    doc.text("Floor List", 20, 10); // Add title to the PDF
    doc.autoTable({
      head: [["Name", "Description"]], // Define table headers
      body: floors.map((floor) => [floor.name, floor.description]), // Add floor data as table rows
    });
    doc.save("Floors.pdf"); // Save the PDF file
  };

  // Copy to Clipboard functionality
  const handleCopyToClipboard = () => {
    const textToCopy = floors.map((floor) => `${floor.name}, ${floor.description}`).join("\n");
    navigator.clipboard.writeText(textToCopy).then(() => {
      alert("Floor list copied to clipboard!");
    });
  };

  // Print functionality
  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write("<html><head><title>Print Floors</title></head><body>");
    printWindow.document.write(
      "<h2>Floor List</h2><table><thead><tr><th>Name</th><th>Description</th></tr></thead><tbody>"
    );
    floors.forEach((floor) => {
      printWindow.document.write(
        `<tr><td>${floor.name}</td><td>${floor.description}</td></tr>`
      );
    });
    printWindow.document.write("</tbody></table></body></html>");
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Floor List</h2>

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
          onClick={handleAddFloor}
        >
          Add Floor
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
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Description</strong></TableCell>
              <TableCell align="right"><strong>Action</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredFloors.map((floor, index) => (
              <TableRow key={index}>
                <TableCell>{floor.name}</TableCell>
                <TableCell>{floor.description}</TableCell>
                <TableCell align="right">
                  <IconButton
                    color="primary"
                    onClick={() => alert(`Edit floor: ${floor.name}`)}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => setFloors(floors.filter((_, i) => i !== index))}
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add Floor Modal */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Floor</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="name"
            label="Name"
            type="text"
            fullWidth
            value={newFloor.name}
            onChange={handleInputChange}
            required
          />
          <TextField
            margin="dense"
            name="description"
            label="Description"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={newFloor.description}
            onChange={handleInputChange}
            required
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
    </div>
  );
};

export default FloorList;
