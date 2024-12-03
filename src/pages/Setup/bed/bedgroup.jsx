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
  MenuItem,
} from "@mui/material";
import * as XLSX from "xlsx"; // For Excel and CSV export
import jsPDF from "jspdf"; // For PDF export
import "jspdf-autotable"; // For table support in jsPDF
import "./bed.css";

const BedGroupList = () => {
  const [bedGroups, setBedGroups] = useState([
    { name: "VIP Ward", floor: "Ground Floor", color: "#ff0000", description: "A palliative or hospice unit." },
    { name: "Private Ward", floor: "3rd Floor", color: "#00ff00", description: "Operating room for surgeries." },
    { name: "General Ward", floor: "1st Floor", color: "#0000ff", description: "Ward for recovery from surgeries." },
    { name: "ICU", floor: "2nd Floor", color: "#ffff00", description: "Intensive Care Unit for critical patients." },
  ]);

  const [open, setOpen] = useState(false); // Modal state
  const [newBedGroup, setNewBedGroup] = useState({
    name: "",
    floor: "",
    color: "#000000", // Default color
    description: "",
  });
  const [searchTerm, setSearchTerm] = useState(""); // Search term state

  const floors = ["Ground Floor", "1st Floor", "2nd Floor", "3rd Floor", "4th Floor"]; // Floors for the select dropdown

  const handleAddBedGroup = () => {
    setNewBedGroup({
      name: "",
      floor: "",
      color: "#000000", // Default color when opening the modal
      description: "",
    });
    setOpen(true); // Open the modal
  };

  const handleClose = () => {
    setOpen(false); // Close the modal
  };

  const handleSave = () => {
    if (newBedGroup.name && newBedGroup.floor && newBedGroup.description) {
      setBedGroups([...bedGroups, newBedGroup]);
      setOpen(false); // Close the modal after saving
    } else {
      alert("Please fill in all required fields.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBedGroup((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Filter bed groups based on search term
  const filteredBedGroups = bedGroups.filter((bedGroup) =>
    bedGroup.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Export to Excel functionality
  const handleExportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(bedGroups); // Create worksheet from bedGroups array
    const workbook = XLSX.utils.book_new(); // Create new workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Bed Groups"); // Add worksheet to workbook
    XLSX.writeFile(workbook, "BedGroups.xlsx"); // Export Excel file
  };

  // Export to CSV functionality
  const handleExportToCSV = () => {
    const worksheet = XLSX.utils.json_to_sheet(bedGroups); // Create worksheet
    const csvData = XLSX.utils.sheet_to_csv(worksheet); // Convert worksheet to CSV
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" }); // Create a Blob object for CSV
    const link = document.createElement("a"); // Create a temporary link element
    link.href = URL.createObjectURL(blob); // Set Blob as URL
    link.download = "BedGroups.csv"; // Set download file name
    document.body.appendChild(link); // Append link to body
    link.click(); // Programmatically click the link to start the download
    document.body.removeChild(link); // Remove link after download
  };

  // Export to PDF functionality
  const handleExportToPDF = () => {
    const doc = new jsPDF(); // Create a new jsPDF instance
    doc.text("Bed Group List", 20, 10); // Add title to the PDF
    doc.autoTable({
      head: [["Name", "Floor", "Description"]], // Define table headers
      body: bedGroups.map((bedGroup) => [bedGroup.name, bedGroup.floor, bedGroup.description]), // Add bed group data as table rows
    });
    doc.save("BedGroups.pdf"); // Save the PDF file
  };

  // Copy to Clipboard functionality
  const handleCopyToClipboard = () => {
    const textToCopy = bedGroups
      .map((bedGroup) => `${bedGroup.name}, ${bedGroup.floor}, ${bedGroup.description}`)
      .join("\n");
    navigator.clipboard.writeText(textToCopy).then(() => {
      alert("Bed Group list copied to clipboard!");
    });
  };

  // Print functionality
  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write("<html><head><title>Print Bed Groups</title></head><body>");
    printWindow.document.write(
      "<h2>Bed Group List</h2><table><thead><tr><th>Name</th><th>Floor</th><th>Description</th></tr></thead><tbody>"
    );
    bedGroups.forEach((bedGroup) => {
      printWindow.document.write(
        `<tr><td>${bedGroup.name}</td><td>${bedGroup.floor}</td><td>${bedGroup.description}</td></tr>`
      );
    });
    printWindow.document.write("</tbody></table></body></html>");
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Bed Group List</h2>

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
          onClick={handleAddBedGroup}
        >
          Add Bed Group
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
              <TableCell><strong>Floor</strong></TableCell>
              <TableCell><strong>Description</strong></TableCell>
              <TableCell align="right"><strong>Action</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredBedGroups.map((bedGroup, index) => (
              <TableRow key={index}>
                <TableCell>{bedGroup.name}</TableCell>
                <TableCell>{bedGroup.floor}</TableCell>
                <TableCell>{bedGroup.description}</TableCell>
                <TableCell align="right">
                  <IconButton
                    color="primary"
                    onClick={() => alert(`Edit bed group: ${bedGroup.name}`)}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => setBedGroups(bedGroups.filter((_, i) => i !== index))}
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add Bed Group Modal */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Bed Group</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="name"
            label="Name"
            type="text"
            fullWidth
            value={newBedGroup.name}
            onChange={handleInputChange}
            required
          />
          <TextField
            margin="dense"
            name="floor"
            label="Floor"
            select
            fullWidth
            value={newBedGroup.floor}
            onChange={handleInputChange}
            required
          >
            {floors.map((floor) => (
              <MenuItem key={floor} value={floor}>
                {floor}
              </MenuItem>
            ))}
          </TextField>
          
          {/* Color Picker */}
          <div style={{ margin: "10px 0" }}>
            <label>Color:</label>
            <input
              type="color"
              name="color"
              value={newBedGroup.color}
              onChange={handleInputChange}
              style={{ width: "100%", padding: "5px", marginTop: "5px" }}
            />
          </div>

          <TextField
            margin="dense"
            name="description"
            label="Description"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={newBedGroup.description}
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

export default BedGroupList;





