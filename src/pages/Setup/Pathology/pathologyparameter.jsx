import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, TextField, Button, IconButton, Tooltip, Typography, Grid
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const PathologyParameterList = () => {
  const [parameters, setParameters] = useState([
    {
      name: 'Red Blood Cell (RBC)',
      range: '4.1 to 5.1 million/mm3',
      unit: 'million/mm3',
      description: 'RBC blood test',
    },
    {
      name: 'Liver Function Test',
      range: '7 to 55 units per liter',
      unit: 'U/L',
      description: 'Liver function tests (LFTs or LFs), also referred to as a hepatic panel...',
    },
    {
      name: 'TSH (Thyroid Stimulating Hormone)',
      range: '0.5 to 3.0',
      unit: 'U/L',
      description: 'A TSH level > 20 milli-International Units/L...',
    },
    {
      name: 'White Blood Cell count (WBC)',
      range: '4 to 5 million/mm3',
      unit: 'million/mm3',
      description: 'Measures the number of white blood cells (leukocytes) in blood.',
    },
    {
      name: 'Lipid Profile',
      range: '<150 mmol/L',
      unit: 'mmol/L',
      description: 'Includes total cholesterol, LDL, HDL, and triglycerides.',
    },
    // Add more data as needed
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);  // You can adjust the number of items per page

  // Handle adding new parameter
  const handleAddParameter = () => {
    const name = prompt("Enter Parameter Name:");
    const range = prompt("Enter Reference Range:");
    const unit = prompt("Enter Unit:");
    const description = prompt("Enter Description:");
    if (name && range && unit && description) {
      setParameters([...parameters, { name, range, unit, description }]);
    }
  };

  // Handle editing a parameter
  const handleEditParameter = (index) => {
    const editedParameter = prompt("Edit Parameter Name", parameters[index].name);
    const editedRange = prompt("Edit Reference Range", parameters[index].range);
    const editedUnit = prompt("Edit Unit", parameters[index].unit);
    const editedDescription = prompt("Edit Description", parameters[index].description);

    if (editedParameter && editedRange && editedUnit && editedDescription) {
      const updatedParameters = [...parameters];
      updatedParameters[index] = {
        name: editedParameter,
        range: editedRange,
        unit: editedUnit,
        description: editedDescription,
      };
      setParameters(updatedParameters);
    }
  };

  // Handle deleting a parameter
  const handleDeleteParameter = (index) => {
    const updatedParameters = parameters.filter((_, i) => i !== index);
    setParameters(updatedParameters);
  };

  // Filter parameters based on search term
  const filteredParameters = parameters.filter((param) =>
    param.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredParameters.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredParameters.length / itemsPerPage);

  // Handle previous page
  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  // Handle next page
  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Pathology Parameter List</h2>
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
          onClick={handleAddParameter}
          startIcon={<FontAwesomeIcon icon={faPlus} />}
        >
          Add Pathology Parameter
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
            {currentItems.map((param, index) => (
              <TableRow key={index}>
                <TableCell>{param.name}</TableCell>
                <TableCell>{param.range}</TableCell>
                <TableCell>{param.unit}</TableCell>
                <TableCell>{param.description}</TableCell>
                <TableCell align="right">
                  <Tooltip title="Edit">
                    <IconButton color="primary" onClick={() => handleEditParameter(index)}>
                      <FontAwesomeIcon icon={faEdit} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton color="secondary" onClick={() => handleDeleteParameter(index)}>
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination Controls */}
      <Grid container justifyContent="space-between" alignItems="center" style={{ marginTop: '20px' }}>
        <Button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </Button>
        <Typography variant="body2">
          Page {currentPage} of {totalPages}
        </Typography>
        <Button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </Button>
      </Grid>

      {/* Records Count */}
      <Typography variant="body2" style={{ marginTop: '20px' }}>
        Records: {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredParameters.length)} of {filteredParameters.length}
      </Typography>
    </div>
  );
};

export default PathologyParameterList;
