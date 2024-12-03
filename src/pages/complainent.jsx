import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { CSVLink } from 'react-csv';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useReactToPrint } from 'react-to-print';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import './complainent.css'; // Ensure this file exists for styling

const CallLogModal = ({ 
  shownotification, 
  isEditing, 
  formData, 
  handleChange, 
  handleSubmit, 
  closeModal 
}) => {
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    shownotification && (
      <div className="modal-overlay">
        <div className="modal-content">
          <button className="close-button" onClick={closeModal}>
            &times;
          </button>
          <h3>{isEditing ? 'Edit Call Log' : 'Add Call Log'}</h3>
          <form onSubmit={handleSubmit} className="form-container">
            <h2>Add Complaint</h2>

            <div className="form-group">
              <label>Complain Type</label>
              <select
                name="complainType"
                value={formData.complainType}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="Service Issue">Service Issue</option>
                <option value="Billing">Billing</option>
                <option value="Technical Support">Technical Support</option>
              </select>
            </div>

            <div className="form-group">
              <label>Source</label>
              <select
                name="source"
                value={formData.source}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="Email">Email</option>
                <option value="Phone">Phone</option>
                <option value="Walk-In">Walk-In</option>
              </select>
            </div>

            <div className="form-group">
              <label>Complain By</label>
              <input
                type="text"
                name="complainBy"
                value={formData.complainBy}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Action Taken</label>
              <input
                type="text"
                name="actionTaken"
                value={formData.actionTaken}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Assigned</label>
              <input
                type="text"
                name="assigned"
                value={formData.assigned}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Note</label>
              <textarea
                name="note"
                value={formData.note}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Attach Document</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
              {uploadedImage && (
                <img
                  src={uploadedImage}
                  alt="Preview"
                  style={{ maxWidth: '200px', marginTop: '10px' }}
                />
              )}
            </div>

            <button type="submit" className="submit-btn">Save</button>
          </form>
        </div>
      </div>
    )
  );
};

const ComplaintsList = () => {
  const [complaints, setComplaints] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [shownotification, setShowNotification] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    complainType: '',
    source: '',
    complainBy: '',
    phone: '',
    date: '',
    description: '',
    actionTaken: '',
    assigned: '',
    note: ''
  });

  const componentRef = useRef();

  useEffect(() => {
    fetchComplaints();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [searchQuery, complaints]);

  const fetchComplaints = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/complaints');
      setComplaints(response.data);
      setFilteredComplaints(response.data);
    } catch (error) {
      console.error('Error fetching complaints:', error);
    }
  };

  const handleAddComplaint = () => {
    setFormData({
      complainType: '',
      source: '',
      complainBy: '',
      phone: '',
      date: '',
      description: '',
      actionTaken: '',
      assigned: '',
      note: ''
    });

    setIsEditing(false);
    setShowNotification(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const newComplaint = { ...formData, date: new Date().toISOString() };
    console.log('Submitting Complaint:', newComplaint); // Log the data being sent
  
    try {
      const response = await axios.post('http://localhost:3000/api/complaints', newComplaint);
      console.log('Complaint added:', response.data);
      fetchComplaints(); // Refresh complaints list
      setShowNotification(false);
    } catch (error) {
      console.error('Error adding complaint:', error.response?.data || error.message);
      alert('Failed to add complaint. Check console for details.');
    }
  };
  
  

  const closeModal = () => setShowNotification(false);

  const handleSearch = () => {
    const query = searchQuery.toLowerCase();
    const filtered = complaints.filter((complaint) =>
      Object.values(complaint).some((value) =>
        String(value).toLowerCase().includes(query)
      )
    );
    setFilteredComplaints(filtered);
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'Complaints List',
    onAfterPrint: () => alert('Print complete!')
  });

  const handlePdfExport = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['Complain #', 'Complain Type', 'Source', 'Name', 'Phone', 'Date']],
      body: filteredComplaints.map((complaint) => [
        complaint.id,
        complaint.complain_type,
        complaint.source,
        complaint.name,
        complaint.phone,
        complaint.date,
      ]),
    });
    doc.save('complaints.pdf');
  };

  const handleExcelExport = () => {
    const ws = XLSX.utils.json_to_sheet(filteredComplaints);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Complaints');
    XLSX.writeFile(wb, 'complaints.xlsx');
  };

  const handleCopy = () => {
    const textToCopy = filteredComplaints
      .map((complaint) =>
        `${complaint.id}\t${complaint.complain_type}\t${complaint.source}\t${complaint.name}\t${complaint.phone}\t${complaint.date}`
      )
      .join('\n');

    navigator.clipboard.writeText(textToCopy).then(() => {
      alert('Copied to clipboard');
    });
  };

  return (
    <div className="container">
      <h2>Complaint List</h2>
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="actions">
        <button onClick={handlePrint}>Print</button>
        <button onClick={handlePdfExport}>PDF</button>
        <CSVLink data={filteredComplaints} filename="complaints.csv">
          <button>CSV</button>
        </CSVLink>
        <button onClick={handleExcelExport}>Excel</button>
        <CopyToClipboard text={filteredComplaints.map(item => JSON.stringify(item)).join("\n")}>
          <button onClick={handleCopy}>Copy to Clipboard</button>
        </CopyToClipboard>
      </div>

      <button onClick={handleAddComplaint}>Add New Complaint</button>

      <div ref={componentRef}>
        <table>
          <thead>
            <tr>
              <th>Complain #</th>
              <th>Complain Type</th>
              <th>Source</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredComplaints.map((complaint) => (
              <tr key={complaint.id}>
                <td>{complaint.id}</td>
                <td>{complaint.complain_type}</td>
                <td>{complaint.source}</td>
                <td>{complaint.name}</td>
                <td>{complaint.phone}</td>
                <td>{complaint.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CallLogModal
        shownotification={shownotification}
        isEditing={isEditing}
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        closeModal={closeModal}
      />
    </div>
  );
};

export default ComplaintsList;

