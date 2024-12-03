// import React, { useState, useEffect } from 'react';
// import './donar.css';
// import { FaPlus, FaFileExcel, FaFilePdf, FaPrint, FaCopy } from 'react-icons/fa';
// import * as XLSX from 'xlsx';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';
// import axios from 'axios';

// const BloodDonorDetails = () => {
//   const [donors, setDonors] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [newDonor, setNewDonor] = useState({
//     name: '', dob: '', bloodGroup: '', gender: '', contact: '', fatherName: '', address: ''
//   });
//   const [notification, setNotification] = useState({ visible: false, message: '', type: '' });
//   const [showNotification, setShowNotification] = useState(false);


//   useEffect(() => {
//     axios.get('http://localhost:3000/api/donar')
//       .then(response => setDonors(response.data))
//       .catch(error => console.error('Error fetching donors:', error));
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewDonor((prevDonor) => ({ ...prevDonor, [name]: value }));
//   };

//   const handleAddDonor = () => {
//     if (newDonor.name && newDonor.dob && newDonor.bloodGroup && newDonor.gender) {
//       axios.post('http://localhost:3000/api/donar', newDonor)
//         .then(response => {
//           setDonors([...donors, response.data]);
//           setNewDonor({ name: '', dob: '', bloodGroup: '', gender: '', contact: '', fatherName: '', address: '' });
//           setShowForm(false);
//           showAlert('Donor added successfully!', 'success');
//         })
//         .catch(error => showAlert('Error adding donor.', 'error'));
//     } else {
//       showAlert('Please fill in all required fields.', 'error');
//     }
//   };
 
//   const showAlert = (message, type) => {
//     setNotification({ visible: true, message, type });
//     setTimeout(() => setNotification({ visible: false, message: '', type: '' }), 3000);
//   };

//   // Export to Excel or CSV
//   const handleExport = (type) => {
//     const fileName = 'donor_details';
//     const worksheet = XLSX.utils.json_to_sheet(donors);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, 'Donors');

//     if (type === 'Excel') XLSX.writeFile(workbook, `${fileName}.xlsx`);
//     else if (type === 'CSV') XLSX.writeFile(workbook, `${fileName}.csv`);
//   };

//   // Export to PDF
//   const handleExportPDF = () => {
//     const doc = new jsPDF();
//     doc.text('Donor Details', 20, 10);
//     doc.autoTable({
//       head: [['Donor Name', 'Date Of Birth', 'Blood Group', 'Gender', 'Contact No', 'Father Name', 'Address']],
//       body: donors.map(donor => [
//         donor.name, donor.dob, donor.bloodGroup, donor.gender, donor.contact, donor.fatherName, donor.address,
//       ]),
//     });
//     doc.save('donor_details.pdf');
//   };

//   // Copy to Clipboard
//   const handleCopyToClipboard = () => {
//     const textToCopy = donors
//       .map(donor => `${donor.name}, ${donor.dob}, ${donor.bloodGroup}, ${donor.gender}, ${donor.contact}, ${donor.fatherName}, ${donor.address}`)
//       .join('\n');
    
//     navigator.clipboard.writeText(textToCopy)
//       .then(() => showAlert('Copied to clipboard!', 'success'))
//       .catch(err => showAlert('Failed to copy to clipboard', 'error'));
//   };

//   // Print the Table
//   const handlePrint = () => {
//     window.print();
//   };

//   const handleCloseNotification = () => {
//     setShowNotification(false);
//   };

//   // Define handleSave function to show the notification (can be used for saving logic if needed)
//   const handleSave = () => {
//     setShowNotification(true);
//   };

//   return (
//     <div className="donor-details-container">
//       <div className="header-section">
//         <h2>Donor Details</h2>
//         <div className="action-buttons">
//           <button className="add-donor-button" onClick={() => setShowNotification(true)}>
//             Add Blood Donor <FaPlus />
//           </button>
//           <button className="action-button" onClick={() => handleExport('Excel')}><FaFileExcel /> Export Excel</button>
//           <button className="action-button" onClick={() => handleExport('CSV')}><FaFileExcel /> Export CSV</button>
//           <button className="action-button" onClick={handleExportPDF}><FaFilePdf /> Export PDF</button>
//           <button className="action-button" onClick={handleCopyToClipboard}><FaCopy /> Copy</button>
//           <button className="action-button" onClick={handlePrint}><FaPrint /> Print</button>
//         </div>
//       </div>

//       {/* Notification Box */}
//       {notification.visible && (
//         <div className={`notification-box ${notification.type}`}>
//           {notification.message}
//         </div>
//       )}

//       {/* Donor Table */}
//       <div className="table-section">
//         <table className="donor-table">
//           <thead>
//             <tr>
//               <th>Donor Name</th>
//               <th>Date Of Birth</th>
//               <th>Blood Group</th>
//               <th>Gender</th>
//               <th>Contact No</th>
//               <th>Father Name</th>
//               <th>Address</th>
//             </tr>
//           </thead>
//           <tbody>
//             {donors.map((donor, index) => (
//               <tr key={index}>
//                 <td>{donor.name}</td>
//                 <td>{donor.dob}</td>
//                 <td>{donor.bloodGroup}</td>
//                 <td>{donor.gender}</td>
//                 <td>{donor.contact}</td>
//                 <td>{donor.fatherName}</td>
//                 <td>{donor.address}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Add Donor Form Modal */}
//       {showForm && (
//         <div className="modal">
//           <div className="modal-content">
//             <h3>Add Donor Details</h3>
//             <div className="form-row">
//               <input name="name" placeholder="Donor Name *" value={newDonor.name} onChange={handleInputChange} required />
//               <input name="dob" placeholder="Date Of Birth *" value={newDonor.dob} onChange={handleInputChange} required />
//               <select name="bloodGroup" value={newDonor.bloodGroup} onChange={handleInputChange} required>
//                 <option value="">Select Blood Group *</option>
//                 <option value="A+">A+</option>
//                 <option value="A-">A-</option>
//                 <option value="B+">B+</option>
//                 <option value="B-">B-</option>
//                 <option value="O+">O+</option>
//                 <option value="O-">O-</option>
//                 <option value="AB+">AB+</option>
//                 <option value="AB-">AB-</option>
//               </select>
//               <select name="gender" value={newDonor.gender} onChange={handleInputChange} required>
//                 <option value="">Select Gender *</option>
//                 <option value="Male">Male</option>
//                 <option value="Female">Female</option>
//                 <option value="Other">Other</option>
//               </select>
//             </div>
//             <div className="form-row">
//               <input name="fatherName" placeholder="Father Name" value={newDonor.fatherName} onChange={handleInputChange} />
//               <input name="contact" placeholder="Contact No" value={newDonor.contact} onChange={handleInputChange} />
//               <input name="address" placeholder="Address" value={newDonor.address} onChange={handleInputChange} />
//             </div>
//             <div className="form-actions">
//               <button onClick={handleAddDonor}>Save</button>
            
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BloodDonorDetails;


// import React, { useState, useEffect } from 'react';
// import './donar.css';
// import { FaPlus, FaFileExcel, FaFilePdf, FaPrint, FaCopy } from 'react-icons/fa';
// import * as XLSX from 'xlsx';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';
// import axios from 'axios';

// const BloodDonorDetails = () => {
//   const [donors, setDonors] = useState([]);

//   const [newDonor, setNewDonor] = useState({
//     name: '', dob: '', bloodGroup: '', gender: '', contact: '', fatherName: '', address: ''
//   });
//   const [notification, setNotification] = useState({ visible: false, message: '', type: '' });
//   const [showNotification, setShowNotification] = useState(false);

//   // Fetch donors from API on component mount
//   useEffect(() => {
//     axios.get('http://localhost:3000/api/donar')
//       .then(response => setDonors(response.data))
//       .catch(error => console.error('Error fetching donors:', error));
//   }, []);

//   // Handle input change in the form
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewDonor((prevDonor) => ({ ...prevDonor, [name]: value }));
//   };

//   // Add a new donor and show notification
//   const handleAddDonor = () => {
//     if (newDonor.name && newDonor.dob && newDonor.bloodGroup && newDonor.gender) {
//       axios.post('http://localhost:3000/api/donar', newDonor)
//         .then(response => {
//           setDonors([...donors, response.data]);
//           setNewDonor({ name: '', dob: '', bloodGroup: '', gender: '', contact: '', fatherName: '', address: '' });
//           setShowForm(false);
//           showAlert('Donor added successfully!', 'success');
//         })
//         .catch(error => showAlert('Error adding donor.', 'error'));
//     } else {
//       showAlert('Please fill in all required fields.', 'error');
//     }
//   };

//   // Show notification with message and type (success or error)
//   const showAlert = (message, type) => {
//     setNotification({ visible: true, message, type });
//     setTimeout(() => setNotification({ visible: false, message: '', type: '' }), 3000);
//   };

//   // Function to close the notification
//   const handleCloseNotification = () => {
//     setShowNotification(false);
//   };

//   // Function to show the notification
//   const handleSave = () => {
//     setShowNotification(true);
//   };

//   // Export donor data to Excel or CSV
//   const handleExport = (type) => {
//     const fileName = 'donor_details';
//     const worksheet = XLSX.utils.json_to_sheet(donors);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, 'Donors');

//     if (type === 'Excel') XLSX.writeFile(workbook, `${fileName}.xlsx`);
//     else if (type === 'CSV') XLSX.writeFile(workbook, `${fileName}.csv`);
//   };

//   // Export donor data to PDF
//   const handleExportPDF = () => {
//     const doc = new jsPDF();
//     doc.text('Donor Details', 20, 10);
//     doc.autoTable({
//       head: [['Donor Name', 'Date Of Birth', 'Blood Group', 'Gender', 'Contact No', 'Father Name', 'Address']],
//       body: donors.map(donor => [
//         donor.name, donor.dob, donor.bloodGroup, donor.gender, donor.contact, donor.fatherName, donor.address,
//       ]),
//     });
//     doc.save('donor_details.pdf');
//   };

//   // Copy donor data to clipboard
//   const handleCopyToClipboard = () => {
//     const textToCopy = donors
//       .map(donor => `${donor.name}, ${donor.dob}, ${donor.bloodGroup}, ${donor.gender}, ${donor.contact}, ${donor.fatherName}, ${donor.address}`)
//       .join('\n');
    
//     navigator.clipboard.writeText(textToCopy)
//       .then(() => showAlert('Copied to clipboard!', 'success'))
//       .catch(err => showAlert('Failed to copy to clipboard', 'error'));
//   };

//   // Print the table
//   const handlePrint = () => {
//     window.print();
//   };

//   return (
//     <div className="donor-details-container">
//       <div className="header-section">
//         <h2>Donor Details</h2>
//         <div className="action-buttons">
//           <button className="add-donor-button" onClick={() => setShowNotification(true)}>
//             Add Blood Donor <FaPlus />
//           </button>
//           <button className="action-button" onClick={() => handleExport('Excel')}><FaFileExcel /> Export Excel</button>
//           <button className="action-button" onClick={() => handleExport('CSV')}><FaFileExcel /> Export CSV</button>
//           <button className="action-button" onClick={handleExportPDF}><FaFilePdf /> Export PDF</button>
//           <button className="action-button" onClick={handleCopyToClipboard}><FaCopy /> Copy</button>
//           <button className="action-button" onClick={handlePrint}><FaPrint /> Print</button>
//         </div>
//       </div>

//       {/* Notification Box */}
//       {notification.visible && (
//         <div className={`notification-box ${notification.type}`}>
//           {notification.message}
//           <button onClick={handleCloseNotification}>Close</button>
//         </div>
//       )}

//       {/* Donor Table */}
//       <div className="table-section">
//         <table className="donor-table">
//           <thead>
//             <tr>
//               <th>Donor Name</th>
//               <th>Date Of Birth</th>
//               <th>Blood Group</th>
//               <th>Gender</th>
//               <th>Contact No</th>
//               <th>Father Name</th>
//               <th>Address</th>
//             </tr>
//           </thead>
//           <tbody>
//             {donors.map((donor, index) => (
//               <tr key={index}>
//                 <td>{donor.name}</td>
//                 <td>{donor.dob}</td>
//                 <td>{donor.bloodGroup}</td>
//                 <td>{donor.gender}</td>
//                 <td>{donor.contact}</td>
//                 <td>{donor.fatherName}</td>
//                 <td>{donor.address}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Add Donor Form Modal */}
//       {showNotification && (
//         <div className="modal">
//           <div className="modal-content">
//             <h3>Add Donor Details</h3>
//             <div className="form-row">
//               <input name="name" placeholder="Donor Name *" value={newDonor.name} onChange={handleInputChange} required />
//               <input name="dob" placeholder="Date Of Birth *" value={newDonor.dob} onChange={handleInputChange} required />
//               <select name="bloodGroup" value={newDonor.bloodGroup} onChange={handleInputChange} required>
//                 <option value="">Select Blood Group *</option>
//                 <option value="A+">A+</option>
//                 <option value="A-">A-</option>
//                 <option value="B+">B+</option>
//                 <option value="B-">B-</option>
//                 <option value="O+">O+</option>
//                 <option value="O-">O-</option>
//                 <option value="AB+">AB+</option>
//                 <option value="AB-">AB-</option>
//               </select>
//               <select name="gender" value={newDonor.gender} onChange={handleInputChange} required>
//                 <option value="">Select Gender *</option>
//                 <option value="Male">Male</option>
//                 <option value="Female">Female</option>
//                 <option value="Other">Other</option>
//               </select>
//             </div>
//             <div className="form-row">
//               <input name="fatherName" placeholder="Father Name" value={newDonor.fatherName} onChange={handleInputChange} />
//               <input name="contact" placeholder="Contact No" value={newDonor.contact} onChange={handleInputChange} />
//               <input name="address" placeholder="Address" value={newDonor.address} onChange={handleInputChange} />
//             </div>
//             <div className="form-actions">
//               <button onClick={handleSave}>Save</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BloodDonorDetails;

// import React, { useState, useEffect } from 'react';
// import { FaPlus, FaFileCsv, FaFilePdf, FaPrint, FaCopy, FaFileExcel, FaSave, FaFileImport } from 'react-icons/fa';
// import './donar.css';
// import * as XLSX from 'xlsx';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';
// import axios from 'axios';

// const BloodDonarDetails = () => {
//   const [donors, setDonors] = useState([]);
//   const [newDonor, setNewDonor] = useState({
//     name: '', dob: '', bloodGroup: '', gender: '', contact: '', fatherName: '', address: ''
//   });
//   const [notification, setNotification] = useState({ visible: false, message: '', type: '' });
//   const [showNotification, setShowNotification] = useState(false);

//   // Fetch donors from API on component mount
//   useEffect(() => {
//     axios.get('http://localhost:3000/api/donar')
//       .then(response => setDonors(response.data))
//       .catch(error => console.error('Error fetching donors:', error));
//   }, []);

//   const showAlert = (message, type) => {
//     setNotification({ visible: true, message, type });
//     setTimeout(() => setNotification({ visible: false, message: '', type: '' }), 3000);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewDonor((prevDonor) => ({ ...prevDonor, [name]: value }));
//   };

//   const handleAddDonor = () => {
//     if (newDonor.name && newDonor.dob && newDonor.bloodGroup && newDonor.gender) {
//       axios.post('http://localhost:3000/api/donar', newDonor)
//         .then(response => {
//           setDonors([...donors, response.data]);
//           setNewDonor({ name: '', dob: '', bloodGroup: '', gender: '', contact: '', fatherName: '', address: '' });
//           setShowNotification(false);
//           showAlert('Donor added successfully!', 'success');
//         })
//         .catch(error => showAlert('Error adding donor.', 'error'));
//     } else {
//       showAlert('Please fill in all required fields.', 'error');
//     }
//   };

//   const handleCloseNotification = () => {
//     setShowNotification(false);
//   };

//   const handleSave = () => {
//     handleAddDonor();
//   };

  

//   // Handle Importing File (Excel or CSV)
//   const handleImport = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         const data = new Uint8Array(e.target.result);
//         const workbook = XLSX.read(data, { type: 'array' });
//         const sheetName = workbook.SheetNames[0];
//         const worksheet = workbook.Sheets[sheetName];
//         const importedData = XLSX.utils.sheet_to_json(worksheet);
        
//         setDonors((prevDonors) => [...prevDonors, ...importedData]);
//         showAlert('Data imported successfully!', 'success');
//       };
//       reader.readAsArrayBuffer(file);
//     }
//   };

   
//   const handleExport = (type) => {
//     const fileName = 'donor_details';
//     const worksheet = XLSX.utils.json_to_sheet(donors);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, 'Donors');

//     if (type === 'Excel') XLSX.writeFile(workbook, `${fileName}.xlsx`);
//     else if (type === 'CSV') XLSX.writeFile(workbook, `${fileName}.csv`);
//   };

//   // Export donor data to PDF
//   const handleExportPDF = () => {
//     const doc = new jsPDF();
//     doc.text('Donor Details', 20, 10);
//     doc.autoTable({
//       head: [['Donor Name', 'Date Of Birth', 'Blood Group', 'Gender', 'Contact No', 'Father Name', 'Address']],
//       body: donors.map(donor => [
//         donor.name, donor.dob, donor.bloodGroup, donor.gender, donor.contact, donor.fatherName, donor.address,
//       ]),
//     });
//     doc.save('donor_details.pdf');
//   };

//   // Copy donor data to clipboard
//   const handleCopyToClipboard = () => {
//     const textToCopy = donors
//       .map(donor => `${donor.name}, ${donor.dob}, ${donor.bloodGroup}, ${donor.gender}, ${donor.contact}, ${donor.fatherName}, ${donor.address}`)
//       .join('\n');
    
//     navigator.clipboard.writeText(textToCopy)
//       .then(() => showAlert('Copied to clipboard!', 'success'))
//       .catch(err => showAlert('Failed to copy to clipboard', 'error'));
//   };

//   // Print the table
//   const handlePrint = () => {
//     window.print();
//   };
//   return (
//     <div className="container">
//       <div>
//         <h2>Blood Donor Details</h2>
//         <div className="right-aligned">
//           <button className="issue-blood-button" onClick={() => setShowNotification(true)}>
//             Add Blood Donar <FaPlus />
//           </button>
//         </div>
//       </div>

//       {/* Import and Export Buttons */}
//       <div className="port-buttons">
//         {/* Import Button */}
        
      

//         {/* Export Buttons */}
//         <button className="action-button" onClick={() => handleExport('Excel')}><FaFileExcel /> Export Excel</button>
//            <button className="action-button" onClick={() => handleExport('CSV')}><FaFileExcel /> Export CSV</button>
//            <button className="action-button" onClick={handleExportPDF}><FaFilePdf /> Export PDF</button>
//            <button className="action-button" onClick={handleCopyToClipboard}><FaCopy /> Copy</button>
//            <button className="action-button" onClick={handlePrint}><FaPrint /> Print</button>
//       </div>

//       {/* Alert Notification Box */}
//       {showNotification && (
//         <div className="notification-box">
//           <button className="close-notification" onClick={handleCloseNotification}>X</button>
//           <h3>Enter Blood Issue Details</h3>
//           <div className="form-row">
//             <input name="name" placeholder="Donor Name *" value={newDonor.name} onChange={handleInputChange} required />
//             <input name="dob" placeholder="Date Of Birth *" value={newDonor.dob} onChange={handleInputChange} required />
//             <select name="bloodGroup" value={newDonor.bloodGroup} onChange={handleInputChange} required>
//               <option value="">Select Blood Group *</option>
//               <option value="A+">A+</option>
//               <option value="A-">A-</option>
//               <option value="B+">B+</option>
//               <option value="B-">B-</option>
//               <option value="O+">O+</option>
//               <option value="O-">O-</option>
//               <option value="AB+">AB+</option>
//               <option value="AB-">AB-</option>
//             </select>
//             <select name="gender" value={newDonor.gender} onChange={handleInputChange} required>
//               <option value="">Select Gender *</option>
//               <option value="Male">Male</option>
//               <option value="Female">Female</option>
//               <option value="Other">Other</option>
//             </select>
//           </div>
//           <div className="form-row">
//             <input name="fatherName" placeholder="Father Name" value={newDonor.fatherName} onChange={handleInputChange} />
//             <input name="contact" placeholder="Contact No" value={newDonor.contact} onChange={handleInputChange} />
//             <input name="address" placeholder="Address" value={newDonor.address} onChange={handleInputChange} />
//           </div>
//           <div className="form-actions">
//             <button onClick={handleSave}><FaSave /> Save</button>
//           </div>
//         </div>
//       )}

//       {/* Donor Table */}
//       <div className="table-section">
//         <table className="donor-table">
//           <thead>
//             <tr>
//               <th>Donor Name</th>
//               <th>Date Of Birth</th>
//               <th>Blood Group</th>
//               <th>Gender</th>
//               <th>Contact No</th>
//               <th>Father Name</th>
//               <th>Address</th>
//             </tr>
//           </thead>
//           <tbody>
//             {donors.map((donor, index) => (
//               <tr key={index}>
//                 <td>{donor.name}</td>
//                 <td>{donor.dob}</td>
//                 <td>{donor.bloodGroup}</td>
//                 <td>{donor.gender}</td>
//                 <td>{donor.contact}</td>
//                 <td>{donor.fatherName}</td>
//                 <td>{donor.address}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default BloodDonarDetails;

// import React, { useState, useEffect } from 'react';
// import { FaPlus, FaFileCsv, FaFilePdf, FaPrint, FaCopy, FaFileExcel, FaSave, FaFileImport, FaBars } from 'react-icons/fa';
// import './donar.css';
// import * as XLSX from 'xlsx';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';
// import axios from 'axios';

// const BloodDonarDetails = () => {
//   const [donors, setDonors] = useState([]);
//   const [newDonor, setNewDonor] = useState({
//     name: '', dob: '', bloodGroup: '', gender: '', contact: '', fatherName: '', address: ''
//   });
//   const [notification, setNotification] = useState({ visible: false, message: '', type: '' });
//   const [showNotification, setShowNotification] = useState(false);

//   // Fetch donors from API on component mount
//   useEffect(() => {
//     axios.get('http://localhost:3000/api/donar')
//       .then(response => setDonors(response.data))
//       .catch(error => console.error('Error fetching donors:', error));
//   }, []);

//   const showAlert = (message, type) => {
//     setNotification({ visible: true, message, type });
//     setTimeout(() => setNotification({ visible: false, message: '', type: '' }), 3000);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewDonor((prevDonor) => ({ ...prevDonor, [name]: value }));
//   };

//   const handleAddDonor = () => {
//     if (newDonor.name && newDonor.dob && newDonor.bloodGroup && newDonor.gender) {
//       axios.post('http://localhost:3000/api/donar', newDonor)
//         .then(response => {
//           setDonors([...donors, response.data]);
//           setNewDonor({ name: '', dob: '', bloodGroup: '', gender: '', contact: '', fatherName: '', address: '' });
//           setShowNotification(false);
//           showAlert('Donor added successfully!', 'success');
//         })
//         .catch(error => showAlert('Error adding donor.', 'error'));
//     } else {
//       showAlert('Please fill in all required fields.', 'error');
//     }
//   };

//   const handleCloseNotification = () => {
//     setShowNotification(false);
//   };

//   const handleSave = () => {
//     handleAddDonor();
//   };

//   const handleExport = (type) => {
//     const fileName = 'donor_details';
//     const worksheet = XLSX.utils.json_to_sheet(donors);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, 'Donors');

//     if (type === 'Excel') XLSX.writeFile(workbook, `${fileName}.xlsx`);
//     else if (type === 'CSV') XLSX.writeFile(workbook, `${fileName}.csv`);
//   };

//   const handleExportPDF = () => {
//     const doc = new jsPDF();
//     doc.text('Donor Details', 20, 10);
//     doc.autoTable({
//       head: [['Donor Name', 'Date Of Birth', 'Blood Group', 'Gender', 'Contact No', 'Father Name', 'Address']],
//       body: donors.map(donor => [
//         donor.name, donor.dob, donor.bloodGroup, donor.gender, donor.contact, donor.fatherName, donor.address,
//       ]),
//     });
//     doc.save('donor_details.pdf');
//   };

//   const handleCopyToClipboard = () => {
//     const textToCopy = donors
//       .map(donor => `${donor.name}, ${donor.dob}, ${donor.bloodGroup}, ${donor.gender}, ${donor.contact}, ${donor.fatherName}, ${donor.address}`)
//       .join('\n');
    
//     navigator.clipboard.writeText(textToCopy)
//       .then(() => showAlert('Copied to clipboard!', 'success'))
//       .catch(err => showAlert('Failed to copy to clipboard', 'error'));
//   };

//   const handlePrint = () => {
//     window.print();
//   };

//   return (
//     <div className="container">
//       <div>
//         <h2>Blood Donor Details</h2>
//         <div className="right-aligned">
//           <button className="issue-blood-button" onClick={() => setShowNotification(true)}>
//             Add Blood Donor <FaPlus />
//           </button>
//         </div>
//       </div>

//       {/* Import and Export Buttons */}
//       <div className="port-buttons">
//         <button className="action-button" onClick={() => handleExport('Excel')}><FaFileExcel /> Export Excel</button>
//         <button className="action-button" onClick={() => handleExport('CSV')}><FaFileCsv /> Export CSV</button>
//         <button className="action-button" onClick={handleExportPDF}><FaFilePdf /> Export PDF</button>
//         <button className="action-button" onClick={handleCopyToClipboard}><FaCopy /> Copy</button>
//         <button className="action-button" onClick={handlePrint}><FaPrint /> Print</button>
//       </div>

//       {/* Alert Notification Box */}
//       {showNotification && (
//         <div className="notification-box">
//           <button className="close-notification" onClick={handleCloseNotification}>X</button>
//           <h3>Enter Blood Donor Details</h3>
//           <div className="form-row">
//             <input name="name" placeholder="Donor Name *" value={newDonor.name} onChange={handleInputChange} required />
//             <input name="dob" placeholder="Date Of Birth *" value={newDonor.dob} onChange={handleInputChange} required />
//             <select name="bloodGroup" value={newDonor.bloodGroup} onChange={handleInputChange} required>
//               <option value="">Select Blood Group *</option>
//               <option value="A+">A+</option>
//               <option value="A-">A-</option>
//               <option value="B+">B+</option>
//               <option value="B-">B-</option>
//               <option value="O+">O+</option>
//               <option value="O-">O-</option>
//               <option value="AB+">AB+</option>
//               <option value="AB-">AB-</option>
//             </select>
//             <select name="gender" value={newDonor.gender} onChange={handleInputChange} required>
//               <option value="">Select Gender *</option>
//               <option value="Male">Male</option>
//               <option value="Female">Female</option>
//               <option value="Other">Other</option>
//             </select>
//           </div>
//           <div className="form-row">
//             <input name="fatherName" placeholder="Father Name" value={newDonor.fatherName} onChange={handleInputChange} />
//             <input name="contact" placeholder="Contact No" value={newDonor.contact} onChange={handleInputChange} />
//             <input name="address" placeholder="Address" value={newDonor.address} onChange={handleInputChange} />
//           </div>
//           <div className="form-actions">
//             <button onClick={handleSave}><FaSave /> Save</button>
//           </div>
//         </div>
//       )}
//         <div className="notification-body">
//         <div className="form-row">
//           <input name="donateDate" placeholder="Donate Date *" value={bagDetails.donateDate} onChange={handleChange} required />
//           <input name="bag" placeholder="Bag *" value={bagDetails.bag} onChange={handleChange} required />
//           <input name="volume" placeholder="Volume" value={bagDetails.volume} onChange={handleChange} />
//           <select name="unitType" value={bagDetails.unitType} onChange={handleChange}>
//             <option value="">Select Unit Type</option>
//             <option value="ml">ml</option>
//             <option value="units">units</option>
//           </select>
//         </div>
//         <div className="form-row">
//           <input name="lot" placeholder="Lot" value={bagDetails.lot} onChange={handleChange} />
//           <select name="chargeCategory" value={bagDetails.chargeCategory} onChange={handleChange} required>
//             <option value="">Charge Category *</option>
//             <option value="A">Category A</option>
//             <option value="B">Category B</option>
//           </select>
//           <select name="chargeName" value={bagDetails.chargeName} onChange={handleChange} required>
//             <option value="">Charge Name *</option>
//             <option value="Type1">Type 1</option>
//             <option value="Type2">Type 2</option>
//           </select>
//           <input name="standardCharge" placeholder="Standard Charge (₹) *" value={bagDetails.standardCharge} onChange={handleChange} required />
//         </div>
//         <div className="summary-section">
//           <div className="summary-item">
//             <label>Total (₹)</label>
//             <p>{bagDetails.total}</p>
//           </div>
//           <div className="summary-item">
//             <label>Discount (₹)</label>
//             <input type="number" name="discount" placeholder="%" value={bagDetails.discount} onChange={handleChange} />
//           </div>
//           <div className="summary-item">
//             <label>Tax (₹)</label>
//             <input type="number" name="tax" placeholder="%" value={bagDetails.tax} onChange={handleChange} />
//           </div>
//           <div className="summary-item">
//             <label>Net Amount (₹)</label>
//             <p>{bagDetails.netAmount}</p>
//           </div>
//           <div className="summary-item">
//             <label>Payment Mode</label>
//             <select name="paymentMode" value={bagDetails.paymentMode} onChange={handleChange}>
//               <option value="Cash">Cash</option>
//               <option value="Card">Card</option>
//             </select>
//           </div>
//           <div className="summary-item">
//             <label>Payment Amount (₹) *</label>
//             <input type="number" name="paymentAmount" value={bagDetails.paymentAmount} onChange={handleChange} required />
//           </div>
//         </div>
//       </div>

//       <div className="notification-footer">
//         <button className="save-button" onClick={handleSave}>
//           <FaSave /> Save
//         </button>
//       </div>
 


//       {/* Donor Table */}
//       <div className="table-section">
//         <table className="donor-table">
//           <thead>
//             <tr>
//               <th>Donor Name</th>
//               <th>Date Of Birth</th>
//               <th>Blood Group</th>
//               <th>Gender</th>
//               <th>Contact No</th>
//               <th>Father Name</th>
//               <th>Address</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {donors.map((donor, index) => (
//               <tr key={index}>
//                 <td>{donor.name}</td>
//                 <td>{donor.dob}</td>
//                 <td>{donor.bloodGroup}</td>
//                 <td>{donor.gender}</td>
//                 <td>{donor.contact}</td>
//                 <td>{donor.fatherName}</td>
//                 <td>{donor.address}</td>
//                 <td>
//                   <button className="action-button">
//                     <FaPlus /> Bag Stock Details
//                   </button>
//                   <button className="action-button">
//                     <FaBars /> Donor Blood Details
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default BloodDonarDetails;

import React, { useState, useEffect } from 'react';
import { FaPlus, FaFileCsv, FaFilePdf, FaPrint, FaCopy, FaFileExcel, FaSave, FaBars } from 'react-icons/fa';
import './donar.css';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import axios from 'axios';

const BloodDonorDetails = () => {
  const [donors, setDonors] = useState([]);
  const [newDonor, setNewDonor] = useState({
    name: '', dob: '', bloodGroup: '', gender: '', contact: '', fatherName: '', address: ''
  });
  const [bagDetails, setBagDetails] = useState({
    donateDate: '', bag: '', volume: '', unitType: '', lot: '', chargeCategory: '',
    chargeName: '', standardCharge: '', institution: '', note: '', total: 0, discount: 0,
    tax: 0, netAmount: 0, paymentMode: 'Cash', paymentAmount: 0,
  });
  const [notification, setNotification] = useState({ visible: false, message: '', type: '' });
  const [showNotification, setShowNotification] = useState(false);
  const [notificationType, setNotificationType] = useState('');

  // Fetch donors from API on component mount
  useEffect(() => {
    axios.get('http://localhost:3000/api/donar')
      .then(response => setDonors(response.data))
      .catch(error => console.error('Error fetching donors:', error));
  }, []);

  const showAlert = (message, type) => {
    setNotification({ visible: true, message, type });
    setTimeout(() => setNotification({ visible: false, message: '', type: '' }), 3000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDonor((prevDonor) => ({ ...prevDonor, [name]: value }));
  };

  const handleBagInputChange = (e) => {
    const { name, value } = e.target;
    setBagDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleAddDonor = () => {
    if (newDonor.name && newDonor.dob && newDonor.bloodGroup && newDonor.gender) {
      axios.post('http://localhost:3000/api/donar', newDonor)
        .then(response => {
          setDonors([...donors, response.data]);
          setNewDonor({ name: '', dob: '', bloodGroup: '', gender: '', contact: '', fatherName: '', address: '' });
          setShowNotification(false);
          showAlert('Donor added successfully!', 'success');
        })
        .catch(error => showAlert('Error adding donor.', 'error'));
    } else {
      showAlert('Please fill in all required fields.', 'error');
    }
  };

  const handleCloseNotification = () => {
    setShowNotification(false);
  };

  const handleSave = () => {
    if (notificationType === 'donor') {
      handleAddDonor();
    } else {
      // Save logic for Bag Stock Details
      showAlert('Bag stock details saved!', 'success');
      setShowNotification(false);
    }
  };

  const fetchBagStockDetails = (donorId) => {
    axios.get(`http://localhost:3000/api/geting/${donorId}`)
      .then(response => {
        setBagDetails(response.data); // Set fetched bag details
        setShowNotification(true);    // Show notification box
      })
      .catch(error => alert('Error fetching bag stock details.'));
  };

  const handleExport = (type) => {
    const fileName = 'donor_details';
    const worksheet = XLSX.utils.json_to_sheet(donors);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Donors');

    if (type === 'Excel') XLSX.writeFile(workbook, `${fileName}.xlsx`);
    else if (type === 'CSV') XLSX.writeFile(workbook, `${fileName}.csv`);
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text('Donor Details', 20, 10);
    doc.autoTable({
      head: [['Donor Name', 'Date Of Birth', 'Blood Group', 'Gender', 'Contact No', 'Father Name', 'Address']],
      body: donors.map(donor => [
        donor.name, donor.dob, donor.bloodGroup, donor.gender, donor.contact, donor.fatherName, donor.address,
      ]),
    });
    doc.save('donor_details.pdf');
  };

  const handleCopyToClipboard = () => {
    const textToCopy = donors
      .map(donor => `${donor.name}, ${donor.dob}, ${donor.bloodGroup}, ${donor.gender}, ${donor.contact}, ${donor.fatherName}, ${donor.address}`)
      .join('\n');
    
    navigator.clipboard.writeText(textToCopy)
      .then(() => showAlert('Copied to clipboard!', 'success'))
      .catch(err => showAlert('Failed to copy to clipboard', 'error'));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="container">
      <div>
        <h2>Blood Donor Details</h2>
        <div className="right-aligned">
          <button className="issue-blood-button" onClick={() => { setShowNotification(true); setNotificationType('donor'); }}>
            Add Blood Donor <FaPlus />
          </button>
        </div>
      </div>

      {/* Import and Export Buttons */}
      <div className="port-buttons">
        <button className="action-button" onClick={() => handleExport('Excel')}><FaFileExcel /> Export Excel</button>
        <button className="action-button" onClick={() => handleExport('CSV')}><FaFileCsv /> Export CSV</button>
        <button className="action-button" onClick={handleExportPDF}><FaFilePdf /> Export PDF</button>
        <button className="action-button" onClick={handleCopyToClipboard}><FaCopy /> Copy</button>
        <button className="action-button" onClick={handlePrint}><FaPrint /> Print</button>
      </div>

      {/* Notification Box */}
      {showNotification && (
        <div className="notification-box">
          <button className="close-notification" onClick={handleCloseNotification}>X</button>
          <h3>{notificationType === 'donor' ? 'Enter Blood Donor Details' : 'Enter Bag Stock Details'}</h3>

         
              <div className="form-row">
                <input name="name" placeholder="Donor Name *" value={newDonor.name} onChange={handleInputChange} required />
                <input name="dob" placeholder="Date Of Birth *" value={newDonor.dob} onChange={handleInputChange} required />
                <select name="bloodGroup" value={newDonor.bloodGroup} onChange={handleInputChange} required>
                  <option value="">Select Blood Group *</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
                <select name="gender" value={newDonor.gender} onChange={handleInputChange} required>
                  <option value="">Select Gender *</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="form-row">
                <input name="fatherName" placeholder="Father Name" value={newDonor.fatherName} onChange={handleInputChange} />
                <input name="contact" placeholder="Contact No" value={newDonor.contact} onChange={handleInputChange} />
                <input name="address" placeholder="Address" value={newDonor.address} onChange={handleInputChange} />
              </div>
          <div className="form-actions">
            <button onClick={handleSave}><FaSave /> Save</button>
          </div>
        </div>
      )}

      {/* Donor Table */}
      <div className="table-section">
        <table className="donor-table">
          <thead>
            <tr>
              <th>Donor Name</th>
              <th>Date Of Birth</th>
              <th>Blood Group</th>
              <th>Gender</th>
              <th>Contact No</th>
              <th>Father Name</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {donors.map((donor, index) => (
              <tr key={index}>
                <td>{donor.name}</td>
                <td>{donor.dob}</td>
                <td>{donor.bloodGroup}</td>
                <td>{donor.gender}</td>
                <td>{donor.contact}</td>
                <td>{donor.fatherName}</td>
                <td>{donor.address}</td>
                <td>
                  <button className="action-button" onClick={() => { setShowNotification(true); fetchBagStockDetails('bag'); }}>
                    <FaPlus /> Bag Stock Details
                  </button>
                  <button className="action-button" onClick={() => { setShowNotification(true); setNotificationType('donor'); }}>
                    <FaBars /> Donor Blood Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BloodDonorDetails;
