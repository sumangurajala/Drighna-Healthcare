// import React, { useState, useEffect } from 'react';
// import './TPA.css';
// import '@fortawesome/fontawesome-free/css/all.min.css';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';
// import * as XLSX from 'xlsx';

// const Tpa = () => {
//     const [searchTerm, setSearchTerm] = useState('');
//     const [tpaData, setTpaData] = useState([]);
//     const [isEditing, setIsEditing] = useState(false);
//     const [isAdding, setIsAdding] = useState(false);
//     const [editIndex, setEditIndex] = useState(null);
//     const [showNotification, setShowNotification] = useState(false);
//     const [editFormData, setEditFormData] = useState({
//         name: '', code: '', phone: '', address: '', contactName: '', contactPhone: '',
//     });
//     const [newTpa, setNewTpa] = useState({
//         name: '', code: '', phone: '', address: '', contactName: '', contactPhone: '',
//     });

//     // Fetch TPA data from the backend API on component mount
//     useEffect(() => {
//         fetchTpaData();
//     }, []);

//     // Fetch all TPA entries
//     const fetchTpaData = async () => {
//         try {
//             const response = await fetch('http://localhost:3000/api/tpa');
//             const data = await response.json();
//             setTpaData(Array.isArray(data) ? data : []); // Ensure tpaData is an array
//         } catch (error) {
//             console.error('Error fetching TPA data:', error);
//             setTpaData([]); // Set to empty array on error
//         }
//     };

//     const handleSearch = (e) => setSearchTerm(e.target.value);

//     // Delete a TPA entry by ID
//     const handleDelete = async (id) => {
//         const confirmDelete = window.confirm('Are you sure you want to delete this TPA?');
//         if (confirmDelete) {
//             try {
//                 await fetch(`http://localhost:3000/api/tpa/${id}`, { method: 'DELETE' });
//                 setTpaData(tpaData.filter((tpa) => tpa.id !== id));
//             } catch (error) {
//                 console.error('Error deleting TPA entry:', error);
//             }
//         }
//     };

//     // Open edit form and load selected TPA data
//     const handleEdit = (index) => {
//         setIsEditing(true);
//         setEditIndex(index);
//         setEditFormData({ ...tpaData[index] });
//     };

//     const handleEditChange = (e) => {
//         const { name, value } = e.target;
//         setEditFormData((prevData) => ({ ...prevData, [name]: value }));
//     };

//     // Save edited TPA entry
//     const handleEditSave = async () => {
//         if (editIndex !== null) {
//             const editedTpa = { ...editFormData };
//             try {
//                 await fetch(`http://localhost:3000/api/tpa/${editedTpa.id}`, {
//                     method: 'PUT',
//                     headers: { 'Content-Type': 'application/json' },
//                     body: JSON.stringify(editedTpa),
//                 });
//                 setTpaData(tpaData.map((tpa, index) => (index === editIndex ? editedTpa : tpa)));
//                 setIsEditing(false);
//                 setEditIndex(null);
//             } catch (error) {
//                 console.error('Error updating TPA entry:', error);
//             }
//         }
//     };

//     const handleCancelEdit = () => {
//         setIsEditing(false);
//         setEditIndex(null);
//     };

//     // Print functionality
//     const handlePrint = () => window.print();

//     // Export to PDF functionality
//     const handleExportPDF = () => {
//         const doc = new jsPDF();
//         doc.text('TPA Management', 20, 10);
//         doc.autoTable({
//             head: [['Name', 'Code', 'Phone', 'Address', 'Contact Person Name', 'Contact Person Phone']],
//             body: tpaData.map((tpa) => [tpa.name, tpa.code, tpa.phone, tpa.address, tpa.contactName, tpa.contactPhone]),
//         });
//         doc.save('TPA_Management.pdf');
//     };

//     // Export to Excel functionality
//     const handleExportExcel = () => {
//         const worksheet = XLSX.utils.json_to_sheet(tpaData);
//         const workbook = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(workbook, worksheet, 'TPA Data');
//         XLSX.writeFile(workbook, 'TPA_Management.xlsx');
//     };

//     // Copy to clipboard functionality
//     const handleCopy = () => {
//         const formattedData = tpaData
//             .map((tpa) => `${tpa.name}, ${tpa.code}, ${tpa.phone}, ${tpa.address}, ${tpa.contactName}, ${tpa.contactPhone}`)
//             .join('\n');
//         navigator.clipboard.writeText(formattedData);
//         alert('Data copied to clipboard');
//     };

//     // Export CSV functionality
//     const handleExportCSV = () => {
//         const csvData = tpaData.map((tpa) => ({
//             Name: tpa.name,
//             Code: tpa.code,
//             Phone: tpa.phone,
//             Address: tpa.address,
//             ContactPersonName: tpa.contactName,
//             ContactPersonPhone: tpa.contactPhone,
//         }));
        
//         const csvLink = document.createElement("a");
//         csvLink.href = `data:text/csv;charset=utf-8,${encodeURI(
//             "Name,Code,Phone,Address,Contact Person Name,Contact Person Phone\n" +
//             csvData.map(tpa => `${tpa.Name},${tpa.Code},${tpa.Phone},${tpa.Address},${tpa.ContactPersonName},${tpa.ContactPersonPhone}`).join("\n")
//         )}`;
//         csvLink.target = "_blank";
//         csvLink.download = "TPA_Management.csv";
//         csvLink.click();
//     };

//     const handleNewTpaChange = (e) => {
//         const { name, value } = e.target;
//         setNewTpa((prevData) => ({ ...prevData, [name]: value }));
//     };

//     // Open form to add new TPA entry
//     const handleAddTpa = () => {
//         setIsAdding(true);
//         setNewTpa({ name: '', code: '', phone: '', address: '', contactName: '', contactPhone: '' });
//     };

//     // Save new TPA entry
//     const handleSaveNewTpa = async () => {
//         try {
//             const response = await fetch('http://localhost:3000/api/tpa', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(newTpa),
//             });
//             const addedTpa = await response.json();
//             setTpaData([...tpaData, addedTpa]);
//             setIsAdding(false);
//         } catch (error) {
//             console.error('Error adding new TPA entry:', error);
//         }
//     };

//     const handleCancelAdd = () => setIsAdding(false);

//     // Filter data based on search term
//     const filteredTpaData = Array.isArray(tpaData)
//         ? tpaData.filter((tpa) =>
//             tpa.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             tpa.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             tpa.phone.includes(searchTerm) ||
//             tpa.contactName.toLowerCase().includes(searchTerm.toLowerCase())
//           )
//         : [];

//     return (
//         <div className="tpa-management-container">
//             <div>
//                 <h2>TPA Management</h2>
//                 <div className="import-buttons">
//                     <button className="export-button" onClick={handleExportCSV}>
//                         <i className="fas fa-file-csv"></i> CSV
//                     </button>
//                     <button className="export-button" onClick={handleExportPDF}>
//                         <i className="fas fa-file-pdf"></i> PDF
//                     </button>
//                     <button className="export-button" onClick={handleExportExcel}>
//                         <i className="fas fa-file-excel"></i> Excel
//                     </button>
//                     <button className="export-button" onClick={handlePrint}>
//                         <i className="fas fa-print"></i> Print
//                     </button>
//                     <button className="export-button" onClick={handleCopy}>
//                         <i className="fas fa-copy"></i> Copy
//                     </button>
//                     <button className="add-tpa-button" onClick={handleAddTpa}>
//                         <i className="fas fa-plus"></i> Add TPA
//                     </button>
//                 </div>
//             </div>
//             <input
//                 type="text"
//                 placeholder="Search..."
//                 value={searchTerm}
//                 onChange={handleSearch}
//                 className="search-input"
//             />
//             <table className="tpa-table">
//                 <thead>
//                     <tr>
//                         <th>Name</th>
//                         <th>Code</th>
//                         <th>Phone</th>
//                         <th>Address</th>
//                         <th>Contact Person Name</th>
//                         <th>Contact Person Phone</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {filteredTpaData.map((tpa, index) => (
//                         <tr key={tpa.id}>
//                             <td>{tpa.name}</td>
//                             <td>{tpa.code}</td>
//                             <td>{tpa.phone}</td>
//                             <td>{tpa.address}</td>
//                             <td>{tpa.contactName}</td>
//                             <td>{tpa.contactPhone}</td>
//                             <td className="actions">
//                                 <button className="icon-button edit-button" onClick={() => handleEdit(index)}>
//                                     <i className="fas fa-pencil-alt"></i> Edit
//                                 </button>
//                                 <button className="icon-button delete-button" onClick={() => handleDelete(tpa.id)}>
//                                     <i className="fas fa-trash"></i> Delete
//                                 </button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>

//             {isEditing && (
//                 <div className="modal">
//                     <h3>Edit TPA</h3>
//                     <input type="text" name="name" value={editFormData.name} onChange={handleEditChange} placeholder="Name" />
//                     <input type="text" name="code" value={editFormData.code} onChange={handleEditChange} placeholder="Code" />
//                     <input type="text" name="phone" value={editFormData.phone} onChange={handleEditChange} placeholder="Phone" />
//                     <input type="text" name="address" value={editFormData.address} onChange={handleEditChange} placeholder="Address" />
//                     <input type="text" name="contactName" value={editFormData.contactName} onChange={handleEditChange} placeholder="Contact Person Name" />
//                     <input type="text" name="contactPhone" value={editFormData.contactPhone} onChange={handleEditChange} placeholder="Contact Person Phone" />
//                     <button className="button" onClick={handleEditSave}>Save</button>
//                     <button className="button cancel-button" onClick={handleCancelEdit}>Cancel</button>
//                 </div>
//             )}

//             {isAdding && (
//                 <div className="modal">
//                     <h3>Add New TPA</h3>
//                     <input type="text" name="name" value={newTpa.name} onChange={handleNewTpaChange} placeholder="Name" />
//                     <input type="text" name="code" value={newTpa.code} onChange={handleNewTpaChange} placeholder="Code" />
//                     <input type="text" name="phone" value={newTpa.phone} onChange={handleNewTpaChange} placeholder="Phone" />
//                     <input type="text" name="address" value={newTpa.address} onChange={handleNewTpaChange} placeholder="Address" />
//                     <input type="text" name="contactName" value={newTpa.contactName} onChange={handleNewTpaChange} placeholder="Contact Person Name" />
//                     <input type="text" name="contactPhone" value={newTpa.contactPhone} onChange={handleNewTpaChange} placeholder="Contact Person Phone" />
//                     <button className="button" onClick={handleSaveNewTpa}>Save</button>
//                     <button className="button cancel-button" onClick={handleCancelAdd}>Cancel</button>
//                 </div>
//             )}
//         </div>
//     );
// };

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPlus, FaFilePdf, FaFileExcel, FaCopy, FaPrint, FaDownload, FaTrashAlt } from 'react-icons/fa';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import './download.css';

const Tpa = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [tpaData, setTpaData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [notificationVisible, setNotificationVisible] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');

    const [formData, setFormData] = useState({
        name: '', code: '', phone: '', address: '', contactName: '', contactPhone: '',
    });

    useEffect(() => {
        fetchTpaData();
    }, []);

    const fetchTpaData = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/tpa');
            setTpaData(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error('Error fetching TPA data:', error);
            setTpaData([]); // Set to empty array on error
        }
    };

    const handleSearch = (e) => setSearchTerm(e.target.value);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this TPA?');
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:3000/api/tpa/${id}`);
                setTpaData(tpaData.filter((tpa) => tpa.id !== id));
                showNotification('TPA deleted successfully!');
            } catch (error) {
                console.error('Error deleting TPA entry:', error);
                showNotification('Error deleting TPA!');
            }
        }
    };

    // Open modal to add a new TPA
    const openAddModal = () => {
        setIsEditing(false);
        setFormData({ name: '', code: '', phone: '', address: '', contactName: '', contactPhone: '' });
        setIsModalOpen(true);
    };

    // Open modal to edit an existing TPA
    const handleEdit = (index) => {
        setIsEditing(true);
        setEditIndex(index);
        setFormData(tpaData[index]);
        setIsModalOpen(true);
    };

    // Close the modal
    const closeModal = () => {
        setIsModalOpen(false);
        setEditIndex(null);
    };

    // Show notification
    const showNotification = (message) => {
        setNotificationMessage(message);
        setNotificationVisible(true);
        setTimeout(() => setNotificationVisible(false), 3000);
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };
    const handleSave = async () => {
        console.log('Form Data:', formData); // Check the data being sent
    
        // Map formData to the backend structure
        const dataToSend = {
            organisation_name: formData.name, // 'name' maps to 'organisation_name'
            code: formData.code,              // 'code' maps to 'code'
            contact_no: formData.phone,       // 'phone' maps to 'contact_no'
            address: formData.address,        // 'address' maps to 'address'
            contact_person_name: formData.contactName, // 'contactName' maps to 'contact_person_name'
        };
    
        if (isEditing) {
            try {
                const response = await axios.put(`http://localhost:3000/api/tpa/${tpaData[editIndex].id}`, dataToSend);
                console.log('Response from server:', response); // Log successful response
                const updatedTpaData = [...tpaData];
                updatedTpaData[editIndex] = response.data;
                setTpaData(updatedTpaData);
                showNotification('TPA updated successfully!');
            } catch (error) {
                console.error('Error updating TPA entry:', error);
                console.error('Error details:', error.response ? error.response.data : error.message); // Log detailed error
                showNotification('Error updating TPA!');
            }
        } else {
            try {
                console.log("Sending data to the server:", dataToSend); // Log the mapped data
    
                const response = await axios.post('http://localhost:3000/api/tpa/add', dataToSend);
                console.log('Response from server:', response); // Log successful response
                setTpaData([...tpaData, response.data]);
                showNotification('TPA added successfully!');
            } catch (error) {
                console.error('Error adding new TPA entry:', error);
                if (error.response) {
                    console.error('Error response:', error.response);
                    console.error('Error details:', error.response.data);
                } else {
                    console.error('Error message:', error.message);
                }
                showNotification('Error adding TPA!');
            }
        }
    
        setIsModalOpen(false);
    };
    
    

    // Export to PDF functionality
    const handleExportPDF = () => {
        const doc = new jsPDF();
        doc.text('TPA Management', 20, 10);
        autoTable(doc, {
            head: [['Name', 'Code', 'Phone', 'Address', 'Contact Person Name', 'Contact Person Phone']],
            body: tpaData.map((tpa) => [
                tpa.name || '',
                tpa.code || '',
                tpa.phone || '',
                tpa.address || '',
                tpa.contactName || '',
                tpa.contactPhone || ''
            ]),
        });
        doc.save('TPA_Management.pdf');
    };

    // Export to Excel functionality
    const handleExportExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(tpaData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'TPA Data');
        XLSX.writeFile(workbook, 'TPA_Management.xlsx');
    };

    // Copy to clipboard functionality
    const handleCopy = () => {
        const formattedData = tpaData
            .map((tpa) => `${tpa.name || ''}, ${tpa.code || ''}, ${tpa.phone || ''}, ${tpa.address || ''}, ${tpa.contactName || ''}, ${tpa.contactPhone || ''}`)
            .join('\n');
        navigator.clipboard.writeText(formattedData);
        alert('Data copied to clipboard');
    };

    // Print functionality
    const handlePrint = () => window.print();

    // Export CSV functionality
    const handleExportCSV = () => {
        const csvData = tpaData.map((tpa) => ({
            Name: tpa.name || '',
            Code: tpa.code || '',
            Phone: tpa.phone || '',
            Address: tpa.address || '',
            ContactPersonName: tpa.contactName || '',
            ContactPersonPhone: tpa.contactPhone || '',
        }));

        const csvLink = document.createElement("a");
        csvLink.href = `data:text/csv;charset=utf-8,${encodeURI(
            "Name,Code,Phone,Address,Contact Person Name,Contact Person Phone\n" +
            csvData.map(tpa => `${tpa.Name},${tpa.Code},${tpa.Phone},${tpa.Address},${tpa.ContactPersonName},${tpa.ContactPersonPhone}`).join("\n")
        )}`;
        csvLink.target = "_blank";
        csvLink.download = "TPA_Management.csv";
        csvLink.click();
    };

    // Filtering TPA data with safe default values to prevent undefined errors
    const filteredTpaData = Array.isArray(tpaData)
        ? tpaData.filter((tpa) =>
            (tpa.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
            (tpa.code || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
            (tpa.phone || "").includes(searchTerm) ||
            (tpa.contactName || "").toLowerCase().includes(searchTerm.toLowerCase())
          )
        : [];

    return (
        <div className="tpa-management-container">
            <div>
                <h2>TPA Management</h2>
                <div className="import-buttons">
                    <button className="export-button" onClick={handleExportCSV}>
                        <FaDownload /> CSV
                    </button>
                    <button className="export-button" onClick={handleExportPDF}>
                        <FaFilePdf /> PDF
                    </button>
                    <button className="export-button" onClick={handleExportExcel}>
                        <FaFileExcel /> Excel
                    </button>
                    <button className="export-button" onClick={handlePrint}>
                        <FaPrint /> Print
                    </button>
                    <button className="export-button" onClick={handleCopy}>
                        <FaCopy /> Copy
                    </button>
                    <button className="add-tpa-button" onClick={openAddModal}>
                        <FaPlus /> Add TPA
                    </button>
                </div>
            </div>

            {/* Notification Box */}
            {notificationVisible && (
                <div className="notification-box">
                    <img
                        src="https://via.placeholder.com/150" // Add image URL or path here
                        alt="Notification Icon"
                        className="notification-image"
                    />
                    <h4>{notificationMessage}</h4>
                </div>
            )}

            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearch}
                className="search-input"
            />

            <table className="tpa-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Code</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Contact Person Name</th>
                        <th>Contact Person Phone</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredTpaData.map((tpa, index) => (
                        <tr key={tpa.id}>
                            <td>{tpa.name}</td>
                            <td>{tpa.code}</td>
                            <td>{tpa.phone}</td>
                            <td>{tpa.address}</td>
                            <td>{tpa.contactName}</td>
                            <td>{tpa.contactPhone}</td>
                            <td className="actions">
                                <button className="icon-button edit-button" onClick={() => handleEdit(index)}>
                                    <FaPlus /> Edit
                                </button>
                                <button className="icon-button delete-button" onClick={() => handleDelete(tpa.id)}>
                                    <FaTrashAlt /> Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal for Adding or Editing TPA */}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="close-button" onClick={closeModal}>&times;</button>
                        <h3>{isEditing ? 'Edit TPA' : 'Add TPA'}</h3>
                        <form>
                            <div className="form-group">
                                <label>Name <span>*</span></label>
                                <input type="text" name="name" value={formData.name} onChange={handleFormChange} required />
                            </div>
                            <div className="form-group">
                                <label>Code <span>*</span></label>
                                <input type="text" name="code" value={formData.code} onChange={handleFormChange} required />
                            </div>
                            <div className="form-group">
                                <label>Contact No <span>*</span></label>
                                <input type="text" name="phone" value={formData.phone} onChange={handleFormChange} required />
                            </div>
                            <div className="form-group">
                                <label>Address</label>
                                <input type="text" name="address" value={formData.address} onChange={handleFormChange} />
                            </div>
                            <div className="form-group">
                                <label>Contact Person Name</label>
                                <input type="text" name="contactName" value={formData.contactName} onChange={handleFormChange} />
                            </div>
                            <div className="form-group">
                                <label>Contact Person Phone</label>
                                <input type="text" name="contactPhone" value={formData.contactPhone} onChange={handleFormChange} />
                            </div>
                            <button type="button" className="save-button" onClick={handleSave}>
                                Save
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Tpa;



