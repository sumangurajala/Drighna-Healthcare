import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import printJS from 'print-js';
import axios from 'axios';
import './FrontOffice.css';
import { useNavigate } from 'react-router-dom';

const FrontOffice = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [visitorData, setVisitorData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        purpose: '',
        name: '',
        phone: '',
        idCard: '',
        visitTo: '',
        ipdOpdStaff: '',
        relatedTo: '',
        numberOfPerson: '',
        date: new Date().toISOString().split('T')[0],
        inTime: '',
        outTime: '',
        note: '',
    });

    // Fetch visitors from the backend
    useEffect(() => {
        const fetchVisitors = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/visitors');
                setVisitorData(response.data);
                setFilteredData(response.data);
            } catch (error) {
                console.error("Error fetching visitor data:", error);
            }
        };
        fetchVisitors();
    }, []);

    const handleSearch = (event) => {
        const term = event.target.value;
        setSearchTerm(term);
        if (term !== '') {
            const filtered = visitorData.filter(item =>
                Object.values(item).some(value => value.toString().toLowerCase().includes(term.toLowerCase()))
            );
            setFilteredData(filtered);
        } else {
            setFilteredData(visitorData);
        }
    };

    const exportPDF = () => {
        const doc = new jsPDF();
        doc.text('Visitor List', 14, 10);
        doc.autoTable({
            head: [['Purpose', 'Name', 'Visit To', 'IPD/OPD/Staff', 'Phone', 'Date', 'In Time', 'Out Time']],
            body: filteredData.map(item => [item.purpose, item.name, item.visitTo, item.ipdOpdStaff, item.phone, item.date, item.inTime, item.outTime]),
        });
        doc.save('visitor_list.pdf');
    };

    const handlePrint = () => {
        printJS({
            printable: filteredData,
            properties: ['purpose', 'name', 'visitTo', 'ipdOpdStaff', 'phone', 'date', 'inTime', 'outTime'],
            type: 'json',
            header: 'Visitor List'
        });
    };

    const handleCopy = () => {
        const textToCopy = filteredData.map(item => `${item.purpose}\t${item.name}\t${item.visitTo}\t${item.ipdOpdStaff}\t${item.phone}\t${item.date}\t${item.inTime}\t${item.outTime}`).join('\n');
        navigator.clipboard.writeText(textToCopy).then(() => {
            alert('Table data copied to clipboard');
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    };

    const exportCSV = () => {
        const headers = ['Purpose', 'Name', 'Visit To', 'IPD/OPD/Staff', 'Phone', 'Date', 'In Time', 'Out Time'];
        const rows = filteredData.map(item => [
            item.purpose,
            item.name,
            item.visitTo,
            item.ipdOpdStaff,
            item.phone,
            item.date,
            item.inTime,
            item.outTime,
        ]);

        let csvContent = 'data:text/csv;charset=utf-8,' + headers.join(',') + '\n';
        rows.forEach(row => {
            csvContent += row.join(',') + '\n';
        });

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', 'visitor_list.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editIndex !== null) {
            // Edit existing entry
            const updatedData = [...visitorData];
            updatedData[editIndex] = formData;
            setVisitorData(updatedData);
            setFilteredData(updatedData);
            setEditIndex(null); // Reset edit index
        } else {
            // Add new entry
            setVisitorData([...visitorData, formData]);
            setFilteredData([...visitorData, formData]);
        }

        setFormData({
            purpose: '',
            name: '',
            phone: '',
            idCard: '',
            visitTo: '',
            ipdOpdStaff: '',
            relatedTo: '',
            numberOfPerson: '',
            date: new Date().toISOString().split('T')[0],
            inTime: '',
            outTime: '',
            note: '',
        });
        setShowForm(false); // Close form
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000);
    };

    const handleEdit = (index) => {
        setEditIndex(index);
        setFormData(visitorData[index]);
        setShowForm(true);
    };

    const handleDelete = (index) => {
        const updatedData = visitorData.filter((_, i) => i !== index);
        setVisitorData(updatedData);
        setFilteredData(updatedData);
    };

    const handleShowInfo = (index) => {
        const visitor = visitorData[index];
        alert(`Visitor Details:\n\n${Object.entries(visitor).map(([key, value]) => `${key}: ${value}`).join('\n')}`);
    };

    return (
        <div className="visitor-list-container">
            {showNotification && (
                <div className="notification-alert">
                    <p>Visitor {editIndex !== null ? 'updated' : 'added'} successfully!</p>
                </div>
            )}

            <div className="header-section">
                <h2>Visitor List</h2>
                <div className="header-buttons">
                    <button className="add-visitor-btn" onClick={() => setShowForm(!showForm)}>
                        {showForm ? 'Close Form' : 'Add Visitor'}
                    </button>
                    <button className="category-button" onClick={() => navigate("/phone-calllog")}>phonecalllog</button>
                    <button className='category-button' onClick={()=> navigate('/')}>Postal</button>
                    <button className='category-button' onClick={()=> navigate('/Complainents')}>Complain</button>
                </div>
            </div>

            {showForm && (
                <div className="add-visitor-form">
                    <h3>{editIndex !== null ? 'Edit Visitor' : 'Add Visitor'}</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Purpose *</label>
                            <select name="purpose" value={formData.purpose} onChange={handleChange} required>
                                <option value="">Select</option>
                                <option value="Inquiry">Inquiry</option>
                                <option value="Visit">Visit</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Name *</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Phone</label>
                            <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>ID Card</label>
                            <input type="text" name="idCard" value={formData.idCard} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Visit To</label>
                            <input type="text" name="visitTo" value={formData.visitTo} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>IPD/OPD/Staff</label>
                            <input type="text" name="ipdOpdStaff" value={formData.ipdOpdStaff} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Related To</label>
                            <input type="text" name="relatedTo" value={formData.relatedTo} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Number Of Person</label>
                            <input type="number" name="numberOfPerson" value={formData.numberOfPerson} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Date</label>
                            <input type="date" name="date" value={formData.date} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>In Time</label>
                            <input type="time" name="inTime" value={formData.inTime} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Out Time</label>
                            <input type="time" name="outTime" value={formData.outTime} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Note</label>
                            <textarea name="note" value={formData.note} onChange={handleChange} />
                        </div>
                        <button type="submit" className="save-btn">{editIndex !== null ? 'Update' : 'Save'}</button>
                    </form>
                </div>
            )}

            <div className="search-section">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="search-input"
                />
                <div className="import-buttons">
                    <button onClick={exportPDF}>PDF</button>
                    <button onClick={handleCopy}>Copy</button>
                    <button onClick={handlePrint}>Print</button>
                    <button onClick={exportCSV}>CSV</button>
                </div>
            </div>

            <div className="visitor-table">
                <table>
                    <thead>
                        <tr>
                            <th>Purpose</th>
                            <th>Name</th>
                            <th>Visit To</th>
                            <th>IPD/OPD/Staff</th>
                            <th>Phone</th>
                            <th>Date</th>
                            <th>In Time</th>
                            <th>Out Time</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((item, index) => (
                            <tr key={index}>
                                <td>{item.purpose}</td>
                                <td>{item.name}</td>
                                <td>{item.visitTo}</td>
                                <td>{item.ipdOpdStaff}</td>
                                <td>{item.phone}</td>
                                <td>{item.date}</td>
                                <td>{item.inTime}</td>
                                <td>{item.outTime}</td>
                                <td className="action-buttons">
                                    <button onClick={() => handleShowInfo(index)}>Show</button>
                                    <button onClick={() => handleEdit(index)}>Edit</button>
                                    <button onClick={() => handleDelete(index)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FrontOffice;
