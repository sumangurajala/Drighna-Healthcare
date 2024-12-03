import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Paper,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  Alert,
  Tooltip,
} from '@mui/material';
import {
  Edit,
  Delete,
  AddCircle,
  Print,
  SaveAlt,
  PictureAsPdf,
  TableView,
  ArrowBack,
  ArrowForward,
  FirstPage,
  LastPage,
  FileCopy,
  Close as CloseIcon,
} from '@mui/icons-material';
import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';
import { useNavigate } from 'react-router-dom';

const incomeData = [
  { id: 1, name: 'Hospital charges', description: 'Charges related to hospital services' },
  { id: 2, name: 'Special campaign', description: 'Income from special fundraising campaigns' },
  { id: 3, name: 'Canteen Rent', description: 'Monthly rent from the canteen' },
  { id: 4, name: 'Vehicle Stand Charges', description: 'Income from vehicle parking' },
  { id: 5, name: 'Demo', description: 'Demo income head for testing' },
  { id: 6, name: 'OPD Income', description: 'Income from outpatient services' },
];

const pageSize = 5;

const IncomeHeadList = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [data, setData] = useState(incomeData);
  const [page, setPage] = useState(0);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [newIncomeHead, setNewIncomeHead] = useState({ name: '', description: '' });
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });

  // Handle Search Input
  const handleSearchChange = (e) => setSearch(e.target.value);

  // Handle Dialog Open and Close
  const handleOpenAddIncomeHead = () => setOpenAddDialog(true);
  const handleCloseAddIncomeHead = () => {
    setOpenAddDialog(false);
    setNewIncomeHead({ name: '', description: '' });
  };

  // Add New Income Head
  const handleAddIncomeHead = () => {
    if (newIncomeHead.name) {
      setData([...data, { id: data.length + 1, ...newIncomeHead }]);
      setNotification({ open: true, message: 'Income Head added successfully!', severity: 'success' });
      handleCloseAddIncomeHead();
    } else {
      setNotification({ open: true, message: 'Income Head name is required!', severity: 'error' });
    }
  };

  // Handle Notification Close
  const handleCloseNotification = () => setNotification({ open: false, message: '', severity: 'info' });

  // Edit and Delete Handlers
  const handleEdit = (id) => console.log(`Edit Income Head ${id}`);
  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
    setNotification({ open: true, message: 'Income Head deleted!', severity: 'info' });
  };

  // Export Functions
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text('Income Head List', 20, 10);
    data.forEach((item, index) => {
      doc.text(`${index + 1}. ${item.name} - ${item.description}`, 20, 20 + index * 10);
    });
    doc.save('income_head_list.pdf');
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Income Heads');
    XLSX.writeFile(workbook, 'income_head_list.xlsx');
  };

  const exportToCSV = () => {
    const csvContent = `data:text/csv;charset=utf-8,${data.map((e) => `${e.name},${e.description}`).join('\n')}`;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'income_head_list.csv');
    document.body.appendChild(link);
    link.click();
  };

  const filteredData = data.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));
  const paginatedData = filteredData.slice(page * pageSize, (page + 1) * pageSize);

  return (
    <Box display="flex">
      {/* Sidebar */}
      <Box sx={{ width: 200, backgroundColor: '#f5f5f5', p: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Finance Setup</Typography>
        <Divider />
        <Box sx={{ mt: 2 }}>
          <Button fullWidth variant="text" color="primary" onClick={() => navigate('/setup/finance')}>Income</Button>
          <Button fullWidth variant="text" color="primary" onClick={() => navigate('/setup/expensedfinance')}>Expense</Button>
        </Box>
      </Box>

      {/* Main Content */}
      <Box sx={{ flex: 1, p: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5">Income Head List</Typography>
          <Box display="flex" gap={1}>
            <Tooltip title="Copy">
              <IconButton onClick={() => navigator.clipboard.writeText(data.map((item) => item.name).join('\n'))}>
                <FileCopy />
              </IconButton>
            </Tooltip>
            <Tooltip title="Excel">
              <IconButton onClick={exportToExcel}>
                <SaveAlt />
              </IconButton>
            </Tooltip>
            <Tooltip title="PDF">
              <IconButton onClick={exportToPDF}>
                <PictureAsPdf />
              </IconButton>
            </Tooltip>
            <Tooltip title="CSV">
              <IconButton onClick={exportToCSV}>
                <TableView />
              </IconButton>
            </Tooltip>
            <Tooltip title="Print">
              <IconButton onClick={() => window.print()}>
                <Print />
              </IconButton>
            </Tooltip>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddCircle />}
              onClick={handleOpenAddIncomeHead}
            >
              Add Income Head
            </Button>
          </Box>
        </Box>

        <TextField
          placeholder="Search..."
          variant="outlined"
          size="small"
          fullWidth
          sx={{ my: 2 }}
          value={search}
          onChange={handleSearchChange}
        />

        {/* Income Head Table */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Income Head</TableCell>
                <TableCell>Description</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell align="right">
                    <IconButton color="primary" onClick={() => handleEdit(item.id)}>
                      <Edit />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(item.id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
          <Typography variant="body2">
            Records: {page * pageSize + 1} to {Math.min((page + 1) * pageSize, filteredData.length)} of {filteredData.length}
          </Typography>
          <Box>
            <IconButton onClick={() => setPage(0)} disabled={page === 0}>
              <FirstPage />
            </IconButton>
            <IconButton onClick={() => setPage((prev) => Math.max(prev - 1, 0))} disabled={page === 0}>
              <ArrowBack />
            </IconButton>
            <IconButton onClick={() => setPage((prev) => Math.min(prev + 1, Math.ceil(filteredData.length / pageSize) - 1))} disabled={page >= Math.ceil(filteredData.length / pageSize) - 1}>
              <ArrowForward />
            </IconButton>
            <IconButton onClick={() => setPage(Math.ceil(filteredData.length / pageSize) - 1)} disabled={page >= Math.ceil(filteredData.length / pageSize) - 1}>
              <LastPage />
            </IconButton>
          </Box>
        </Box>

        {/* Add Income Head Dialog */}
        <Dialog open={openAddDialog} onClose={handleCloseAddIncomeHead}>
          <DialogTitle>
            Add Income Head
            <IconButton
              aria-label="close"
              onClick={handleCloseAddIncomeHead}
              style={{ position: 'absolute', right: 8, top: 8, color: '#000' }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <TextField
              label="Income Head"
              fullWidth
              margin="normal"
              required
              value={newIncomeHead.name}
              onChange={(e) => setNewIncomeHead({ ...newIncomeHead, name: e.target.value })}
            />
            <TextField
              label="Description"
              fullWidth
              margin="normal"
              multiline
              rows={3}
              value={newIncomeHead.description}
              onChange={(e) => setNewIncomeHead({ ...newIncomeHead, description: e.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAddIncomeHead}>Cancel</Button>
            <Button variant="contained" color="primary" onClick={handleAddIncomeHead}>Save</Button>
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
    </Box>
  );
};

export default IncomeHeadList;




