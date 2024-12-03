import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import printJS from 'print-js';
import axios from 'axios';
import './PhoneCallLog.css';

const PhoneCallLog = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [callLogData, setCallLogData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [shownotification, setShowNotification] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        phone: '',
        date: '',
        description: '',
        nextFollowUpDate: '',
        callDuration: '',
        callType: '',
        note: '',
    });
    const [uploadedImage, setUploadedImage] = useState(null);

    // Fetch call logs
    useEffect(() => {
        const fetchCallLogs = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/calllogs');
                setCallLogData(response.data);
                setFilteredData(response.data);
            } catch (error) {
                console.error('Error fetching call log data:', error);
                alert('Failed to fetch call logs. Please check your server and route.');
            }
        };
        fetchCallLogs();
    }, []);

    // Format date to a readable format
    const formatDate = (date) => {
        const newDate = new Date(date);
        return `${newDate.getDate()}/${newDate.getMonth() + 1}/${newDate.getFullYear()} ${newDate.getHours()}:${newDate.getMinutes()}`;
    };

    // Handle search
    const handleSearch = (event) => {
        const term = event.target.value;
        setSearchTerm(term);
        if (term) {
            const filtered = callLogData.filter((item) =>
                Object.values(item).some((value) =>
                    value && value.toString().toLowerCase().includes(term.toLowerCase())
                )
            );
            setFilteredData(filtered);
        } else {
            setFilteredData(callLogData);
        }
    };

    // Open modal
    const openModal = (isEdit = false, data = null) => {
        setIsEditing(isEdit);
        setFormData(
            data || {
                id: '',
                name: '',
                phone: '',
                date: '',
                description: '',
                nextFollowUpDate: '',
                callDuration: '',
                callType: '',
                note: '',
            }
        );
        setShowNotification(true);
    };

    // Close modal
    const closeModal = () => {
        setShowNotification(false);
    };

    // Handle form changes
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      


        if (isEditing) {
            // Update existing call log
            await axios.put(`http://localhost:3000/api/calllogs/${formData.id}`, formDataToSend);
            alert('Call log updated successfully!');
        } else {
            // Add new call log
            await axios.post('http://localhost:3000/api/addcalllogs', formData); // Update endpoint if needed
            alert('Call log added successfully!');
        }

        setShowNotification(false);

        // Fetch updated call logs
        const response = await axios.get('http://localhost:3000/api/calllogs');
        setCallLogData(response.data);
        setFilteredData(response.data);
    } catch (error) {
        console.error('Error saving call log:', error);
        if (error.response) {
            alert(`Failed to save call log. Status: ${error.response.status}, Message: ${error.response.data}`);
        } else if (error.request) {
            alert('No response received from server.');
        } else {
            alert('Error in request setup.');
        }
    }
};

    // Handle delete
    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this record?')) {
            try {
                await axios.delete(`http://localhost:3000/api/calllogs/${id}`);
                alert('Call log deleted successfully!');
                const response = await axios.get('http://localhost:3000/api/calllogs');
                setCallLogData(response.data);
                setFilteredData(response.data);
            } catch (error) {
                console.error('Error deleting call log:', error);
                alert('Failed to delete call log.');
            }
        }
    };

    // Handle file upload
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setUploadedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // Export to PDF
    const exportPDF = () => {
        const doc = new jsPDF();
        doc.text('Phone Call Log List', 14, 10);
        doc.autoTable({
            head: [['Name', 'Phone', 'Date', 'Next Follow Up Date', 'Call Type']],
            body: filteredData.map((item) => [
                item.name,
                item.phone,
                formatDate(item.date),
                formatDate(item.next_follow_up_date),
                item.call_type,
            ]),
        });
        doc.save('phone_call_log_list.pdf');
    };

    // Print
    const handlePrint = () => {
        printJS({
            printable: filteredData,
            properties: ['name', 'phone', 'date', 'next_follow_up_date', 'call_type'],
            type: 'json',
            header: 'Phone Call Log List',
        });
    };

    // Copy to clipboard
    const handleCopy = () => {
        const textToCopy = filteredData
            .map(
                (item) =>
                    `${item.name}\t${item.phone}\t${formatDate(item.date)}\t${formatDate(item.next_follow_up_date)}\t${item.call_type}`
            )
            .join('\n');
        navigator.clipboard
            .writeText(textToCopy)
            .then(() => alert('Table data copied to clipboard'))
            .catch((err) => console.error('Failed to copy text: ', err));
    };

    // Export CSV
    const exportCSV = () => {
        const headers = ['Name', 'Phone', 'Date', 'Next Follow Up Date', 'Call Type'];
        const rows = filteredData.map((item) => [
            item.name,
            item.phone,
            formatDate(item.date),
            formatDate(item.next_follow_up_date),
            item.call_type,
        ]);

        let csvContent = 'data:text/csv;charset=utf-8,';
        csvContent += headers.join(',') + '\n';
        rows.forEach((rowArray) => {
            csvContent += rowArray.join(',') + '\n';
        });

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', 'phone_call_log_list.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="call-log-container">
            <div className="header-section">
                <h2>Phone Call Log List</h2>
                <button className="add-call-log-btn" onClick={() => openModal(false)}>Add Call Log +</button>
            </div>

            <div className="search-section">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="search-input"
                />
                <div className="export-buttons">
                    <button onClick={exportPDF}>PDF</button>
                    <button onClick={handleCopy}>Copy</button>
                    <button onClick={handlePrint}>Print</button>
                    <button onClick={exportCSV}>CSV</button>
                    <button onClick={() => alert('Excel export requires an additional library (e.g., xlsx).')}>Excel</button>
                </div>
            </div>

            {shownotification && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="close-button" onClick={closeModal}>&times;</button>
                        <h3>{isEditing ? 'Edit Call Log' : 'Add Call Log'}</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
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
                                    type="datetime-local"
                                    name="date"
                                    value={formData.date ? formData.date : ''}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <input
                                    type="text"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Next Follow Up Date</label>
                                <input
                                    type="datetime-local"
                                    name="nextFollowUpDate"
                                    value={formData.nextFollowUpDate || ''}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Call Duration</label>
                                <input
                                    type="text"
                                    name="callDuration"
                                    value={formData.callDuration}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Call Type</label>
                                <input
                                    type="text"
                                    name="callType"
                                    value={formData.callType}
                                    onChange={handleChange}
                                    required
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
                                <label>Upload Image</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                />
                                {uploadedImage && (
                                    <img src={uploadedImage} alt="Uploaded" style={{ maxWidth: '200px' }} />
                                )}
                            </div>
                            <button type="submit">{isEditing ? 'Save Changes' : 'Add Log'}</button>
                        </form>
                    </div>
                </div>
            )}

            <div className="call-log-table">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Date</th>
                            <th>Next Follow Up Date</th>
                            <th>Call Type</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((callLog) => (
                            <tr key={callLog.id}>
                                <td>{callLog.name}</td>
                                <td>{callLog.phone}</td>
                                <td>{formatDate(callLog.date)}</td>
                                <td>{formatDate(callLog.next_follow_up_date)}</td>
                                <td>{callLog.call_type}</td>
                                <td>
                                    <button onClick={() => openModal(true, callLog)}>Edit</button>
                                    <button onClick={() => handleDelete(callLog.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PhoneCallLog;
