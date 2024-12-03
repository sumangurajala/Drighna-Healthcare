import React, { useState, useCallback } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, TextField, Button, IconButton, Grid, Tooltip, Pagination
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrashAlt, faFileExcel, faFilePdf, faFileWord, faPrint, faCopy } from '@fortawesome/free-solid-svg-icons';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const UnitListl = () => {
  const [units, setUnits] = useState([
    'MRI',
    'Mammography',
    'HVL',
    'KHz',
    'dGy×cm2',
    'Teslas',
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  const filteredUnits = units.filter(unit =>
    unit.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedUnits = filteredUnits.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handleAddUnit = () => {
    const newUnit = prompt('Enter new Unit:');
    if (newUnit) {
      setUnits([...units, newUnit]);
    }
  };

  const handleDeleteUnit = (index) => {
    const updatedUnits = units.filter((_, i) => i !== index);
    setUnits(updatedUnits);
  };

  const handleEditUnit = (index) => {
    const editedUnit = prompt('Edit Unit', units[index]);
    if (editedUnit) {
      const updatedUnits = [...units];
      updatedUnits[index] = editedUnit;
      setUnits(updatedUnits);
    }
  };

  // Export to PDF
  const handleExportToPDF = useCallback(() => {
    const doc = new jsPDF();
    doc.text('Unit List', 20, 10);
    doc.autoTable({
      head: [['Unit']],
      body: units.map(unit => [unit]),
    });
    doc.save('Units.pdf');
  }, [units]);

  // Copy to Clipboard
  const handleCopyToClipboard = useCallback(() => {
    const textToCopy = units.join('\n');
    navigator.clipboard.writeText(textToCopy).then(() => {
      alert('Unit list copied to clipboard!');
    });
  }, [units]);

  // Export to CSV
  const handleExportToCSV = useCallback(() => {
    const worksheet = XLSX.utils.json_to_sheet(units.map(unit => ({ Unit: unit })));
    const csvData = XLSX.utils.sheet_to_csv(worksheet);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'Units.csv';
    link.click();
  }, [units]);

  // Print
  const handlePrint = useCallback(() => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head><title>Print Unit List</title></head>
        <body>
          <h2>Unit List</h2>
          <ul>${units.map(unit => `<li>${unit}</li>`).join('')}</ul>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  }, [units]);

  return (
    <Grid container spacing={3} style={{ padding: '20px' }}>
      <Grid item xs={12}>
        <h2>Unit List</h2>

        {/* Export and Print Options */}
        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <Tooltip title="Export to Excel">
            <IconButton color="primary" aria-label="Export to Excel" onClick={handleExportToCSV}>
              <FontAwesomeIcon icon={faFileExcel} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Export to PDF">
            <IconButton color="secondary" aria-label="Export to PDF" onClick={handleExportToPDF}>
              <FontAwesomeIcon icon={faFilePdf} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Copy to Clipboard">
            <IconButton color="default" aria-label="Copy to Clipboard" onClick={handleCopyToClipboard}>
              <FontAwesomeIcon icon={faCopy} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Print">
            <IconButton color="default" aria-label="Print" onClick={handlePrint}>
              <FontAwesomeIcon icon={faPrint} />
            </IconButton>
          </Tooltip>
        </div>

        {/* Search and Add Button */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
          <TextField
            label="Search..."
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddUnit}
            startIcon={<FontAwesomeIcon icon={faPlus} />}
          >
            Add Unit
          </Button>
        </div>

        {/* Unit Table */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Unit Name</strong></TableCell>
                <TableCell align="right"><strong>Action</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedUnits.map((unit, index) => (
                <TableRow key={index}>
                  <TableCell>{unit}</TableCell>
                  <TableCell align="right">
                    <Tooltip title="Edit">
                      <IconButton
                        color="primary"
                        aria-label={`Edit ${unit}`}
                        onClick={() => handleEditUnit(index)}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        color="secondary"
                        aria-label={`Delete ${unit}`}
                        onClick={() => handleDeleteUnit(index)}
                      >
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <Pagination
          count={Math.ceil(filteredUnits.length / rowsPerPage)}
          page={page}
          onChange={(e, value) => setPage(value)}
          style={{ marginTop: '10px', display: 'flex', justifyContent: 'center' }}
        />
      </Grid>
    </Grid>
  );
};

export default UnitListl;
