import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPlus, FaFilePdf, FaFileExcel, FaCopy, FaPrint, FaDownload, FaTrashAlt } from 'react-icons/fa';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import './download.css';

const ContentList = () => {
  const [contentList, setContentList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    date: '',
    file: null,
    description: '',
  });
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  // Fetch content data from backend on component mount
  useEffect(() => {
    axios.get('http://localhost:3000/api/content')
      .then(response => setContentList(response.data))
      .catch(error => console.error('Error fetching content:', error));
  }, []);

  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' });
    }, 3000);
  };

  const openModal = () => {
    setIsModalOpen(true);
    setFormData({ title: '', type: '', date: '', file: null, description: '' });
    showNotification("Opening content upload form", "info");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({ title: '', type: '', date: '', file: null, description: '' });
    showNotification("Content form closed", "info");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleSave = () => {
    const newContent = {
      title: formData.title,
      type: formData.type.toLowerCase(),
      date: formData.date,
      description: formData.description,
    };
    axios.post('http://localhost:3000/api/content', newContent)
      .then(response => {
        setContentList([...contentList, response.data]);
        showNotification('Content added successfully!', 'success');
        closeModal();
      })
      .catch(error => showNotification('Error adding content.', 'error'));
  };

  const handleDelete = (id) => {
    // Confirm deletion with the user
    const confirmDelete = window.confirm("Are you sure you want to delete this item?");
    if (!confirmDelete) return;

    // Make a backup of the current contentList for rollback
    const previousContentList = [...contentList];
  
    // Optimistically update the UI
    setContentList((prevContentList) => prevContentList.filter((item) => item.id !== id));
  
    axios
      .delete(`http://localhost:5000/api/content/${id}`)
      .then(() => {
        showNotification('Content deleted successfully!', 'success');
      })
      .catch((error) => {
        console.error('Error deleting content:', error);
        // Roll back UI update if the delete request fails
        setContentList(previousContentList);
        showNotification('Error deleting content.', 'error');
      });
};

  

  const simulateDownload = (item) => {
    const blob = new Blob([`Title: ${item.title}\nType: ${item.type}\nDate: ${item.date}\nDescription: ${item.description}`], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${item.title}.${item.type}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text('Content List', 14, 10);
    autoTable(doc, {
      head: [['Content Title', 'Type', 'Date', 'Description']],
      body: contentList.map(row => [row.title, row.type.toUpperCase(), row.date, row.description]),
    });
    doc.save('content_list.pdf');
  };

  const downloadCSV = (data) => {
    if (!data || data.length === 0) {
        console.error("No data available for download.");
        return;
    }

    // Prepare CSV headers (assuming each item has the same structure)
    const headers = Object.keys(data[0]).join(",") + "\n";

    // Convert data to CSV rows
    const rows = data
        .map(item => Object.values(item).map(value => `"${value}"`).join(","))
        .join("\n");

    const csvContent = headers + rows;

    // Create a blob from the CSV string
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

    // Create a download link and trigger it
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "content.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(contentList);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Content List');
    XLSX.writeFile(workbook, 'content_list.xlsx');
  };

  const copyToClipboard = () => {
    const textToCopy = contentList.map(row => Object.values(row).join("\t")).join("\n");
    navigator.clipboard.writeText(textToCopy)
      .then(() => showNotification("Copied to clipboard", "success"))
      .catch(err => showNotification('Could not copy text.', 'error'));
  };

  const printContent = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write('<html><head><title>Print Content List</title></head><body>');
    printWindow.document.write('<h2>Content List</h2>');
    printWindow.document.write('<table border="1" style="width:100%; border-collapse:collapse;"><thead><tr>');
    printWindow.document.write('<th>Content Title</th><th>Type</th><th>Date</th><th>Description</th>');
    printWindow.document.write('</tr></thead><tbody>');
    contentList.forEach(item => {
      printWindow.document.write(`<tr><td>${item.title}</td><td>${item.type.toUpperCase()}</td><td>${item.date}</td><td>${item.description}</td></tr>`);
    });
    printWindow.document.write('</tbody></table></body></html>');
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="content-list">
      <div>
        <h2>Content List</h2>
        <button className="plus-button" onClick={openModal}>
          <FaPlus /> Add Content
        </button>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Upload Content</h2>
              <button className="close-button" onClick={closeModal}>X</button>
            </div>
            <form>
              <div className="form-row">
                <div className="form-group">
                  <label>Content Title *</label>
                  <input type="text" name="title" value={formData.title} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Content Type *</label>
                  <input type="text" name="type" value={formData.type} onChange={handleChange} required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Upload Date</label>
                  <input type="date" name="date" value={formData.date} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Content File *</label>
                  <input type="file" name="file" onChange={handleFileChange} required />
                </div>
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea name="description" value={formData.description} onChange={handleChange}></textarea>
              </div>
              <button type="button" className="save-button" onClick={handleSave}>Save</button>
            </form>
          </div>
        </div>
      )}

      {notification.show && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
          <button className="close-notification" onClick={() => setNotification({ show: false, message: '', type: '' })}>X</button>
        </div>
      )}

      <div className="table-controls">
        <input type="text" placeholder="Search..." className="search-bar" />
        <select className="records-dropdown">
          <option value="100">100</option>
        </select>
        <div className="export-icons">
          <button className="action-button" title="Copy" onClick={copyToClipboard}><FaCopy /></button>
          <button className="action-button" title="Export as PDF" onClick={downloadPDF}><FaFilePdf /></button>
          <button className="action-button" title="Export as Excel" onClick={downloadExcel}><FaFileExcel /></button>
          <button className="action-button" title="Print" onClick={printContent}><FaPrint /></button>
          <button className="action-button csv-button" title="Export as CSV" onClick={() => downloadCSV(contentList)}>CSV</button>
</div>
      </div>
      
      <table className="content-table">
        <thead>
          <tr>
            <th>Content Title</th>
            <th>Type</th>
            <th>Date</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {contentList.map((item) => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>{item.type.toUpperCase()}</td>
              <td>{item.date}</td>
              <td>{item.description}</td>
              <td>
                <button className="action-button"  title="Download" onClick={() => simulateDownload(item)}>
                  <FaDownload />
                </button>
                <button 
  className="action-button" 
  title="Delete" 
  onClick={() => handleDelete(item.id)}
  style={{ backgroundColor: '#e74c3c', color: '#fff' }} // Optional styles
>
  <FaTrashAlt />
</button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="footer">
        <span>Records: 1 to {contentList.length} of {contentList.length}</span>
      </div>
    </div>
  );
};

export default ContentList;






