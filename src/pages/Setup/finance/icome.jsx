import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  IconButton,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tooltip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  Edit,
  Delete,
  Add,
  FileCopy,
  SaveAlt,
  PictureAsPdf,
  TableView,
  Print,
  Close as CloseIcon,
} from '@mui/icons-material';
import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';

const expenseData = [
  { id: 1, name: 'Building rent', description: '' },
  { id: 2, name: 'Equipments', description: '' },
  { id: 3, name: 'Electricity Bill', description: '' },
  { id: 4, name: 'Telephone Bill', description: '' },
  { id: 5, name: 'Power Generator Fuel Charge', description: '' },
  { id: 6, name: 'Tea Expense', description: '' },
  { id: 7, name: 'Demo', description: '' },
  // Add more entries if needed for testing pagination
];

const pageSize = 5;

const ExpenseHeadList = () => {
  const [search, setSearch] = useState('');
  const [data, setData] = useState(expenseData);
  const [page, setPage] = useState(0);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [newExpenseHead, setNewExpenseHead] = useState({ name: '', description: '' });
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleAddExpenseHead = () => {
    setOpenAddDialog(true);
  };

  const handleDialogClose = () => {
    setOpenAddDialog(false);
    setNewExpenseHead({ name: '', description: '' });
  };

  const handleSaveExpenseHead = () => {
    if (newExpenseHead.name.trim() === '') {
      setNotification({ open: true, message: 'Expense Head name is required!', severity: 'error' });
    } else {
      setData([...data, { id: data.length + 1, ...newExpenseHead }]);
      setNotification({ open: true, message: 'Expense Head added successfully!', severity: 'success' });
      handleDialogClose();
    }
  };

  const handleCloseNotification = () => {
    setNotification({ open: false, message: '', severity: 'info' });
  };

  const handleEdit = (id) => {
    console.log(`Edit Expense Head ${id}`);
  };

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
    setNotification({ open: true, message: 'Expense Head deleted!', severity: 'info' });
  };

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedData = filteredData.slice(page * pageSize, (page + 1) * pageSize);

  const handleFirstPage = () => setPage(0);
  const handlePreviousPage = () => setPage((prev) => Math.max(prev - 1, 0));
  const handleNextPage = () => setPage((prev) => Math.min(prev + 1, Math.ceil(filteredData.length / pageSize) - 1));
  const handleLastPage = () => setPage(Math.ceil(filteredData.length / pageSize) - 1);

  return (
    <Box sx={{ maxWidth: 900, margin: 'auto', p: 2 }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Typography variant="h5">Expense Head List</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={handleAddExpenseHead}
        >
          Add Expense Head
        </Button>
      </Box>

      {/* Search Field and Export Buttons Row */}
      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <TextField
          placeholder="Search..."
          variant="outlined"
          size="small"
          fullWidth
          value={search}
          onChange={handleSearchChange}
          sx={{ mr: 2 }}
        />

        {/* Export Buttons */}
        <Box display="flex" gap={1}>
          <Tooltip title="Copy">
            <IconButton onClick={() => console.log("Copy to Clipboard")}>
              <FileCopy />
            </IconButton>
          </Tooltip>
          <Tooltip title="Excel">
            <IconButton onClick={() => console.log("Export to Excel")}>
              <SaveAlt />
            </IconButton>
          </Tooltip>
          <Tooltip title="PDF">
            <IconButton onClick={() => console.log("Export to PDF")}>
              <PictureAsPdf />
            </IconButton>
          </Tooltip>
          <Tooltip title="CSV">
            <IconButton onClick={() => console.log("Export to CSV")}>
              <TableView />
            </IconButton>
          </Tooltip>
          <Tooltip title="Print">
            <IconButton onClick={() => window.print()}>
              <Print />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><Typography variant="subtitle1" fontWeight="bold">Expense Head</Typography></TableCell>
              <TableCell align="right"><Typography variant="subtitle1" fontWeight="bold">Action</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <Typography variant="body2" color="primary" sx={{ cursor: 'pointer' }}>
                    {item.name}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Tooltip title="Edit">
                    <IconButton color="primary" onClick={() => handleEdit(item.id)}>
                      <Edit />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton color="error" onClick={() => handleDelete(item.id)}>
                      <Delete />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination Controls */}
      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
        <Typography variant="body2">
          Records: {page * pageSize + 1} to {Math.min((page + 1) * pageSize, filteredData.length)} of {filteredData.length}
        </Typography>
        
        <Box>
          <Button onClick={handleFirstPage} disabled={page === 0}>
            First
          </Button>
          <Button onClick={handlePreviousPage} disabled={page === 0}>
            Previous
          </Button>
          <Button onClick={handleNextPage} disabled={page >= Math.ceil(filteredData.length / pageSize) - 1}>
            Next
          </Button>
          <Button onClick={handleLastPage} disabled={page >= Math.ceil(filteredData.length / pageSize) - 1}>
            Last
          </Button>
        </Box>
      </Box>

      {/* Add Expense Head Dialog */}
      <Dialog open={openAddDialog} onClose={handleDialogClose}>
        <DialogTitle>
          Add Expense Head
          <IconButton
            aria-label="close"
            onClick={handleDialogClose}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Expense Head"
            fullWidth
            margin="normal"
            required
            value={newExpenseHead.name}
            onChange={(e) => setNewExpenseHead({ ...newExpenseHead, name: e.target.value })}
          />
          <TextField
            label="Description"
            fullWidth
            margin="normal"
            multiline
            rows={3}
            value={newExpenseHead.description}
            onChange={(e) => setNewExpenseHead({ ...newExpenseHead, description: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleSaveExpenseHead}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* Notification Snackbar */}
      <Snackbar
        open={notification.open}
        autoHideDuration={3000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseNotification} severity={notification.severity} sx={{ width: '100%' }}>
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ExpenseHeadList;




