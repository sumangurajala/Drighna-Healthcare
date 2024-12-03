import React, { useState } from 'react';
import {
  Button,
  Snackbar,
  Alert,
  Pagination,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  IconButton
} from '@mui/material';
import { CSVLink } from 'react-csv';
import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import CloseIcon from '@mui/icons-material/Close';

const ProductList = () => {
  const [products, setProducts] = useState([
    { name: 'test blood bank', type: 'Blood Group' },
    { name: 'plate', type: 'Blood Group' },
    { name: 'uy', type: 'Component' },
    { name: 'AB+', type: 'Blood Group' },
    { name: 'A+', type: 'Blood Group' },
    { name: 'B-', type: 'Blood Group' },
    { name: 'B+', type: 'Blood Group' },
    { name: 'O-', type: 'Blood Group' },
    { name: 'O+', type: 'Blood Group' },
    { name: 'Platelets', type: 'Component' },
    { name: 'Plasma', type: 'Component' },
    { name: 'White Cells & Granulocytes', type: 'Component' },
    { name: 'Red Cells', type: 'Component' },
    { name: 'Cryo', type: 'Component' },
  ]);

  const [notification, setNotification] = useState({ open: false, message: '', severity: 'info' });
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;
  const [openAddProduct, setOpenAddProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', type: '' });
  const [searchTerm, setSearchTerm] = useState('');

  const handleOpenAddProduct = () => {
    setOpenAddProduct(true);
  };

  const handleCloseAddProduct = () => {
    setOpenAddProduct(false);
    setNewProduct({ name: '', type: '' });
  };

  const handleAddProduct = () => {
    setProducts([...products, newProduct]);
    setNotification({ open: true, message: 'Product added successfully!', severity: 'success' });
    handleCloseAddProduct();
  };

  const handleCloseNotification = () => {
    setNotification({ open: false, message: '', severity: 'info' });
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text('Product List', 20, 10);
    products.forEach((product, index) => {
      doc.text(`${index + 1}. ${product.name} - ${product.type}`, 20, 20 + index * 10);
    });
    doc.save('product_list.pdf');
    setNotification({ open: true, message: 'Exported to PDF!', severity: 'success' });
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(products);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Products');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(data, 'product_list.xlsx');
    setNotification({ open: true, message: 'Exported to Excel!', severity: 'success' });
  };

  const printTable = () => {
    const printContents = document.getElementById('product-table').outerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    setNotification({ open: true, message: 'Table printed!', severity: 'success' });
  };

  const copyToClipboard = () => {
    const textToCopy = products.map(p => `${p.name}, ${p.type}`).join('\n');
    navigator.clipboard.writeText(textToCopy);
    setNotification({ open: true, message: 'Copied to clipboard!', severity: 'success' });
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm) || product.type.toLowerCase().includes(searchTerm)
  );

  const displayedProducts = filteredProducts.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <div style={{ display: 'flex', padding: '20px', maxWidth: '1200px', margin: 'auto' }}>
      {/* Sidebar with Export Buttons */}
      <div style={{ width: '200px', marginRight: '20px' }}>
        <Button
          variant="contained"
          fullWidth
          color="primary"
          
          sx={{ mb: 2 }} onClick={() => navigate("/setup/blood-bank")}
        >
          Pathology Parameter
        </Button>
      </div>

      {/* Main Content with Notification and Product Table */}
      <div style={{ flex: 1 }}>
        <h2>Product List</h2>

        {/* Notification Box */}
        <Snackbar open={notification.open} autoHideDuration={3000} onClose={handleCloseNotification}>
          <Alert onClose={handleCloseNotification} severity={notification.severity} sx={{ width: '100%' }}>
            {notification.message}
          </Alert>
        </Snackbar>

        {/* Search and Add Product Button */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <TextField
            label="Search"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={handleSearchChange}
            style={{ flexGrow: 1, marginRight: '10px' }}
          />
          <Button variant="contained" color="primary" onClick={handleOpenAddProduct}>
            + Add Product
          </Button>
        </div>

        {/* Export Buttons Aligned Right */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
          <Button variant="outlined" color="primary" onClick={exportToPDF} style={{ marginRight: '5px' }}>
            Export to PDF
          </Button>
          <CSVLink data={products} filename="product_list.csv" style={{ textDecoration: 'none' }}>
            <Button variant="outlined" color="primary" style={{ marginRight: '5px' }}>
              Export to CSV
            </Button>
          </CSVLink>
          <Button variant="outlined" color="primary" onClick={exportToExcel} style={{ marginRight: '5px' }}>
            Export to Excel
          </Button>
          <Button variant="outlined" color="primary" onClick={printTable} style={{ marginRight: '5px' }}>
            Print
          </Button>
          <Button variant="outlined" color="primary" onClick={copyToClipboard}>
            Copy
          </Button>
        </div>

        {/* Add Product Dialog */}
        <Dialog open={openAddProduct} onClose={handleCloseAddProduct}>
          <DialogTitle>
            Add Product
            <IconButton
              aria-label="close"
              onClick={handleCloseAddProduct}
              style={{ position: 'absolute', right: 8, top: 8, color: '#000' }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <TextField
              label="Type"
              select
              fullWidth
              margin="normal"
              value={newProduct.type}
              onChange={(e) => setNewProduct({ ...newProduct, type: e.target.value })}
              required
            >
              <MenuItem value="Blood Group">Blood Group</MenuItem>
              <MenuItem value="Component">Component</MenuItem>
            </TextField>
            <TextField
              label="Name"
              fullWidth
              margin="normal"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              required
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAddProduct}>Cancel</Button>
            <Button variant="contained" color="primary" onClick={handleAddProduct}>Save</Button>
          </DialogActions>
        </Dialog>

        {/* Product Table */}
        <table id="product-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: '8px' }}>Name</th>
              <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: '8px' }}>Type</th>
              <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: '8px' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {displayedProducts.map((product, index) => (
              <tr key={index}>
                <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>{product.name}</td>
                <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>{product.type}</td>
                <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>
                  <Button size="small" variant="outlined" color="primary" style={{ marginRight: '5px' }}>Edit</Button>
                  <Button size="small" variant="outlined" color="secondary">Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <Pagination
          count={Math.ceil(filteredProducts.length / itemsPerPage)}
          page={page}
          onChange={handlePageChange}
          color="primary"
          style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}
        />
      </div>
    </div>
  );
};

export default ProductList;


