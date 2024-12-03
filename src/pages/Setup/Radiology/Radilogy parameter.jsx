// import React, { useState } from 'react';
// import { FaEdit, FaTrash, FaPlus, FaFileExcel, FaFilePdf, FaFileCsv, FaCopy, FaPrint } from 'react-icons/fa';
// import { saveAs } from 'file-saver';
// import * as XLSX from 'xlsx';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';

// const RadiologyParameterList = () => {
//   const [parameters, setParameters] = useState([
//     { name: 'MRI Cardiac with Contrast', range: '1-5', unit: '', description: 'MRI Cardiac with Contrast' },
//     { name: 'Fluoroscopy', range: '30 mGy/min', unit: 'dGy×cm2', description: 'Fluoroscopy is a study of moving body structures--similar to an X-ray "movie"...' },
//     { name: 'Magnetic resonance imaging (MRI)', range: '0.2 and 7 T', unit: 'Teslas', description: 'Magnetic resonance imaging (MRI) is a medical imaging technique...' },
//     { name: 'Ultrasound', range: '<7mm', unit: 'KHz', description: 'Ultrasound is sound waves with frequencies higher than the upper audible limit...' },
//     { name: 'demo', range: 'demo', unit: 'MRI', description: 'demo' },
//   ]);

//   const [newParameter, setNewParameter] = useState({ name: '', range: '', unit: '', description: '' });

//   const addParameter = () => {
//     setParameters([...parameters, newParameter]);
//     setNewParameter({ name: '', range: '', unit: '', description: '' });
//   };

//   // Export to CSV
//   const exportToCsv = () => {
//     const csvContent = parameters.map(param => [param.name, param.range, param.unit, param.description].join(',')).join('\n');
//     const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
//     saveAs(blob, 'RadiologyParameters.csv');
//   };

//   // Export to Excel
//   const exportToExcel = () => {
//     const worksheet = XLSX.utils.json_to_sheet(parameters);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, 'Parameters');
//     XLSX.writeFile(workbook, 'RadiologyParameters.xlsx');
//   };

//   // Export to PDF
//   const exportToPdf = () => {
//     const doc = new jsPDF();
//     doc.text("Radiology Parameter List", 10, 10);
//     doc.autoTable({
//       head: [['Parameter Name', 'Reference Range', 'Unit', 'Description']],
//       body: parameters.map(param => [param.name, param.range, param.unit, param.description])
//     });
//     doc.save('RadiologyParameters.pdf');
//   };

//   // Copy to Clipboard
//   const copyToClipboard = () => {
//     const textToCopy = parameters.map(param => `${param.name}\t${param.range}\t${param.unit}\t${param.description}`).join('\n');
//     navigator.clipboard.writeText(textToCopy).then(() => alert("Copied to clipboard!"));
//   };

//   // Print
//   const printTable = () => {
//     const printContents = document.querySelector(".radiology-parameter-list").innerHTML;
//     const originalContents = document.body.innerHTML;
//     document.body.innerHTML = printContents;
//     window.print();
//     document.body.innerHTML = originalContents;
//     window.location.reload();
//   };

//   return (
//     <div className="radiology-parameter-list">
//       <h2>Radiology Parameter List</h2>
//       <div className="search-add-container">
//         <input type="text" placeholder="Search..." className="search-input" />
//         <button className="add-button" onClick={addParameter}><FaPlus /> Add Radiology Parameter</button>
//       </div>
      
//       <table>
//         <thead>
//           <tr>
//             <th>Parameter Name</th>
//             <th>Reference Range</th>
//             <th>Unit</th>
//             <th>Description</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {parameters.map((param, index) => (
//             <tr key={index}>
//               <td>{param.name}</td>
//               <td>{param.range}</td>
//               <td>{param.unit}</td>
//               <td>{param.description}</td>
//               <td>
//                 <button className="action-button edit"><FaEdit /></button>
//                 <button className="action-button delete"><FaTrash /></button>
//               </td>
//             </tr>
//           ))}
//           <tr>
//             <td><input type="text" placeholder="Name" value={newParameter.name} onChange={(e) => setNewParameter({ ...newParameter, name: e.target.value })} /></td>
//             <td><input type="text" placeholder="Range" value={newParameter.range} onChange={(e) => setNewParameter({ ...newParameter, range: e.target.value })} /></td>
//             <td><input type="text" placeholder="Unit" value={newParameter.unit} onChange={(e) => setNewParameter({ ...newParameter, unit: e.target.value })} /></td>
//             <td><input type="text" placeholder="Description" value={newParameter.description} onChange={(e) => setNewParameter({ ...newParameter, description: e.target.value })} /></td>
//             <td><button className="action-button add" onClick={addParameter}><FaPlus /></button></td>
//           </tr>
//         </tbody>
//       </table>
//       <p>Records: {parameters.length}</p>

//       {/* Export and action buttons positioned below the table */}
//       <div className="export-buttons">
//         <button className="export-button" onClick={exportToExcel}><FaFileExcel /> Excel</button>
//         <button className="export-button" onClick={exportToPdf}><FaFilePdf /> PDF</button>
//         <button className="export-button" onClick={exportToCsv}><FaFileCsv /> CSV</button>
//         <button className="export-button" onClick={copyToClipboard}><FaCopy /> Copy</button>
//         <button className="export-button" onClick={printTable}><FaPrint /> Print</button>
//       </div>
//     </div>
//   );
// };

// export default RadiologyParameterList;


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

const RadiologyParameterList = () => {
  const [units, setUnits] = useState([
    { name: 'MRI Cardiac with Contrast', range: '1-5', unit: '', description: 'MRI Cardiac with Contrast' },
    { name: 'Fluoroscopy', range: '30 mGy/min', unit: 'dGy×cm2', description: 'Fluoroscopy is a study of moving body structures--similar to an X-ray "movie"...' },
    { name: 'Magnetic resonance imaging (MRI)', range: '0.2 and 7 T', unit: 'Teslas', description: 'Magnetic resonance imaging (MRI) is a medical imaging technique...' },
    { name: 'Ultrasound', range: '<7mm', unit: 'KHz', description: 'Ultrasound is sound waves with frequencies higher than the upper audible limit...' },
    { name: 'demo', range: 'demo', unit: 'MRI', description: 'demo' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  const filteredUnits = units.filter(unit =>
    unit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    unit.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedUnits = filteredUnits.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handleAddUnit = () => {
    const newName = prompt('Enter new Parameter Name:');
    const newRange = prompt('Enter Reference Range:');
    const newUnit = prompt('Enter Unit:');
    const newDescription = prompt('Enter Description:');
    if (newName && newRange && newUnit && newDescription) {
      const newUnitObject = { name: newName, range: newRange, unit: newUnit, description: newDescription };
      setUnits([...units, newUnitObject]);
    }
  };

  const handleDeleteUnit = (index) => {
    const updatedUnits = units.filter((_, i) => i !== index);
    setUnits(updatedUnits);
  };

  const handleEditUnit = (index) => {
    const unit = units[index];
    const editedName = prompt('Edit Parameter Name', unit.name);
    const editedRange = prompt('Edit Reference Range', unit.range);
    const editedUnit = prompt('Edit Unit', unit.unit);
    const editedDescription = prompt('Edit Description', unit.description);
    if (editedName && editedRange && editedUnit && editedDescription) {
      const updatedUnits = [...units];
      updatedUnits[index] = { name: editedName, range: editedRange, unit: editedUnit, description: editedDescription };
      setUnits(updatedUnits);
    }
  };

  const handleExportToPDF = useCallback(() => {
    const doc = new jsPDF();
    doc.text('Radiology Parameter List', 20, 10);
    doc.autoTable({
      head: [['Parameter Name', 'Reference Range', 'Unit', 'Description']],
      body: units.map(unit => [unit.name, unit.range, unit.unit, unit.description]),
    });
    doc.save('Radiology_Parameters.pdf');
  }, [units]);

  const handleCopyToClipboard = useCallback(() => {
    const textToCopy = units.map(unit => `${unit.name} - ${unit.range} - ${unit.unit} - ${unit.description}`).join('\n');
    navigator.clipboard.writeText(textToCopy).then(() => {
      alert('Unit list copied to clipboard!');
    });
  }, [units]);

  const handleExportToCSV = useCallback(() => {
    const worksheet = XLSX.utils.json_to_sheet(units);
    const csvData = XLSX.utils.sheet_to_csv(worksheet);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'Radiology_Parameters.csv';
    link.click();
  }, [units]);

  const handlePrint = useCallback(() => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head><title>Print Radiology Parameters</title></head>
        <body>
          <h2>Radiology Parameter List</h2>
          <table>
            <tr><th>Name</th><th>Range</th><th>Unit</th><th>Description</th></tr>
            ${units.map(unit => `<tr><td>${unit.name}</td><td>${unit.range}</td><td>${unit.unit}</td><td>${unit.description}</td></tr>`).join('')}
          </table>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  }, [units]);

  return (
    <Grid container spacing={3} style={{ padding: '20px' }}>
      <Grid item xs={12}>
        <h2>Radiology Parameter List</h2>

        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <Tooltip title="Export to Excel">
            <IconButton color="primary" onClick={handleExportToCSV}>
              <FontAwesomeIcon icon={faFileExcel} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Export to PDF">
            <IconButton color="secondary" onClick={handleExportToPDF}>
              <FontAwesomeIcon icon={faFilePdf} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Copy to Clipboard">
            <IconButton color="default" onClick={handleCopyToClipboard}>
              <FontAwesomeIcon icon={faCopy} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Print">
            <IconButton color="default" onClick={handlePrint}>
              <FontAwesomeIcon icon={faPrint} />
            </IconButton>
          </Tooltip>
        </div>

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
            Add Parameter
          </Button>
        </div>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Parameter Name</strong></TableCell>
                <TableCell><strong>Reference Range</strong></TableCell>
                <TableCell><strong>Unit</strong></TableCell>
                <TableCell><strong>Description</strong></TableCell>
                <TableCell align="right"><strong>Action</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedUnits.map((unit, index) => (
                <TableRow key={index}>
                  <TableCell>{unit.name}</TableCell>
                  <TableCell>{unit.range}</TableCell>
                  <TableCell>{unit.unit}</TableCell>
                  <TableCell>{unit.description}</TableCell>
                  <TableCell align="right">
                    <Tooltip title="Edit">
                      <IconButton color="primary" onClick={() => handleEditUnit(index)}>
                        <FontAwesomeIcon icon={faEdit} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton color="secondary" onClick={() => handleDeleteUnit(index)}>
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

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

export default RadiologyParameterList;
