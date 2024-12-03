// import React, { useState } from 'react';
// import './bloodbank.css';
// import { FaPlus } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';

// const BloodBankStatus = () => {
//   const bloodTypes = ['O+', 'O-', 'B+', 'B-', 'A+', 'AB+', 'plate', 'test blood bank'];

//   // Initial blood data
//   const initialBloodData = {
//     'O+': [
//       { bags: '2010 (300 ml)', lot: 6, institution: '', action: 'Issue' },
//       { bags: '6 (300 ml)', lot: 2, institution: 'Drighna Healthcare', action: 'Issue' },
//     ],
//   };

//   const initialComponentData = {
//     'O+': [
//       { bags: '2026 (200 ml)', lot: 1, components: 'White Cells & Granulocytes', action: 'Issue' },
//     ],
//   };

//   const [bloodData, setBloodData] = useState(initialBloodData);
//   const [componentData, setComponentData] = useState(initialComponentData);
//   const [selectedBloodType, setSelectedBloodType] = useState(null);
//   const [showNotification, setShowNotification] = useState(false);
//   const [showIssueNotification, setShowIssueNotification] = useState(false);
//   const [selectedRow, setSelectedRow] = useState(null);
//   const [formData, setFormData] = useState({
//     donor: '',
//     donateDate: '',
//     bag: '',
//     volume: '',
//     lot: '',
//     chargeCategory: '',
//     chargeName: '',
//     standardCharge: '',
//     institution: '',
//     note: '',
//   });
//   const [issueFormData, setIssueFormData] = useState({
//     issueDate: '',
//     doctor: '',
//     reference: '',
//     technician: '',
//     note: '',
//   });
//   const [calculatedCharge, setCalculatedCharge] = useState(0);
//   const [tax, setTax] = useState(0);
//   const [netAmount, setNetAmount] = useState(0);

//   const handleAddClick = () => {
//     setShowNotification(true);
//   };

//   const handleIssueClick = (row) => {
//     setSelectedRow(row);
//     setShowIssueNotification(true);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleIssueInputChange = (e) => {
//     const { name, value } = e.target;
//     setIssueFormData({ ...issueFormData, [name]: value });
//   };

//   const handleCloseNotification = () => {
//     setShowNotification(false);
//   };

//   const handleCloseIssueNotification = () => {
//     setShowIssueNotification(false);
//   };

//   const handleCalculate = () => {
//     const baseCharge = parseFloat(formData.standardCharge) || 0;
//     const calculatedTax = baseCharge * 0.15; // Example tax rate of 15%
//     setTax(calculatedTax);
//     setNetAmount(baseCharge + calculatedTax);
//     setCalculatedCharge(baseCharge);
//   };

//   const handleSave = (e) => {
//     e.preventDefault();
//     if (selectedBloodType && formData.bag) {
//       const newEntry = {
//         bags: `${formData.bag} (${formData.volume || '300 ml'})`,
//         lot: formData.lot,
//         institution: formData.institution,
//         action: 'Issue',
//       };

//       setBloodData((prevData) => ({
//         ...prevData,
//         [selectedBloodType]: [...(prevData[selectedBloodType] || []), newEntry],
//       }));

//       setShowNotification(false);
//       resetForm();
//     }
//   };

//   const handleIssueSave = (e) => {
//     e.preventDefault();
//     // Handle saving of issued blood details
//     setShowIssueNotification(false);
//     setIssueFormData({
//       issueDate: '',
//       doctor: '',
//       reference: '',
//       technician: '',
//       note: '',
//     });
//   };

//   const [showNewPatientNotification, setShowNewPatientNotification] = useState(false);

//   const handleNewPatientClick = () => {
//     setShowNewPatientNotification(true);
//   };
  
//   const handleCloseNewPatientNotification = () => {
//     setShowNewPatientNotification(false);
//   };
  

//   const resetForm = () => {
//     setFormData({
//       donor: '',
//       donateDate: '',
//       bag: '',
//       volume: '',
//       lot: '',
//       chargeCategory: '',
//       chargeName: '',
//       standardCharge: '',
//       institution: '',
//       note: '',
//     });
//     setCalculatedCharge(0);
//     setTax(0);
//     setNetAmount(0);
//   };
//   const navigate = useNavigate();
//   return (
//     <div className="blood-bank-status">
//       <h2>Blood Bank Status</h2>

//       {/* Add the new navigation buttons here */}
//       <div className="input-fields-container">
//               <div className="input-field">
//                 <button className="category-button" onClick={() => navigate('/blood-bankdestails')}>Donar Details</button><br />
//              </div>
//               <div className="input-field">
//                 <button className="category-button" onClick={()=>navigate('')}>Blood Issue Details</button><br />
//               </div>
//               <div className="input-field">
//                <button className="category-button" onClick={()=>navigate('')}>Component Issue</button><br />
//              </div>
             
//             </div>

//       {showNotification && (
//         <div className="notification-box">
//           <button className="close-notification" onClick={handleCloseNotification}>X</button>
//           <div className="form-container">
//             <form onSubmit={handleSave}>
//               <div className="form-group">
//                 <label>Blood Donor *</label>
//                 <select name="donor" value={formData.donor} onChange={handleInputChange} required>
//                   <option value="">Select</option>
//                   <option value="Donor 1">Donor 1</option>
//                   <option value="Donor 2">Donor 2</option>
//                 </select>
//               </div>
//               <div className="form-group">
//                 <label>Donate Date *</label>
//                 <input type="datetime-local" name="donateDate" value={formData.donateDate} onChange={handleInputChange} required />
//               </div>
//               <div className="form-group">
//                 <label>Bag *</label>
//                 <input type="text" name="bag" value={formData.bag} placeholder="Enter bag number" onChange={handleInputChange} required />
//               </div>
//               <div className="form-group">
//                 <label>Volume</label>
//                 <input type="text" name="volume" value={formData.volume} placeholder="Enter volume" onChange={handleInputChange} />
//               </div>
//               <div className="form-group">
//                 <label>Lot</label>
//                 <input type="text" name="lot" value={formData.lot} placeholder="Enter lot number" onChange={handleInputChange} />
//               </div>
//               <div className="form-group">
//                 <label>Charge Category *</label>
//                 <select name="chargeCategory" value={formData.chargeCategory} onChange={handleInputChange} required>
//                   <option value="">Select</option>
//                   <option value="Blood sugar test">Blood sugar test</option>
//                   <option value="Category 2">Category 2</option>
//                 </select>
//               </div>
//               <div className="form-group">
//                 <label>Charge Name *</label>
//                 <select name="chargeName" value={formData.chargeName} onChange={handleInputChange} required>
//                   <option value="">Select</option>
//                   <option value="Blood Sugar test">Blood Sugar test</option>
//                   <option value="Charge 2">Charge 2</option>
//                 </select>
//               </div>
//               <div className="form-group">
//                 <label>Standard Charge (₹) *</label>
//                 <input type="number" name="standardCharge" value={formData.standardCharge} placeholder="Enter standard charge" onChange={handleInputChange} required />
//               </div>
//               <div className="form-group">
//                 <label>Institution</label>
//                 <input type="text" name="institution" value={formData.institution} placeholder="Enter institution name" onChange={handleInputChange} />
//               </div>
//               <div className="form-group">
//                 <label>Note</label>
//                 <textarea name="note" value={formData.note} placeholder="Enter additional notes" onChange={handleInputChange}></textarea>
//               </div>
//               <div className="form-footer">
//                 <button type="button" className="calculate-button" onClick={handleCalculate}>Calculate</button>
//                 <button type="submit" className="save-button">Save</button>
//               </div>
//               <div className="charge-summary">
//                 <p>Total (₹): {calculatedCharge.toFixed(2)}</p>
//                 <p>Tax (₹): {tax.toFixed(2)}</p>
//                 <p>Net Amount (₹): {netAmount.toFixed(2)}</p>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

// {/* {showIssueNotification && (
//   <div className="notification-box">
//     <button className="close-notification" onClick={handleCloseIssueNotification}>X</button>
//     <div className="form-container">
//       <div className="form-header">
//         <button type="button" className="new-patient-button" onClick={handleCloseNewPatientNotification}>+ New Patient</button>

      
     
//         <input type="text" name="caseId" placeholder="Case ID" className="case-id-input" onChange={handleIssueInputChange} />
//       </div>
//       <form onSubmit={handleIssueSave}>
//         <div className="form-row">
//           <div className="form-group">
//             <label>Issue Date *</label>
//             <input type="datetime-local" name="issueDate" value={issueFormData.issueDate} onChange={handleIssueInputChange} required />
//           </div>
//           <div className="form-group">
//             <label>Hospital Doctor</label>
//             <select name="doctor" value={issueFormData.doctor} onChange={handleIssueInputChange}>
//               <option>Select</option>
//               <option>Doctor 1</option>
//               <option>Doctor 2</option>
//             </select>
//           </div>
//           <div className="form-group">
//             <label>Reference Name *</label>
//             <input type="text" name="reference" value={issueFormData.reference} placeholder="Enter reference" onChange={handleIssueInputChange} required />
//           </div>
//           <div className="form-group">
//             <label>Technician</label>
//             <input type="text" name="technician" value={issueFormData.technician} placeholder="Enter technician's name" onChange={handleIssueInputChange} />
//           </div>
//         </div>
//         <div className="form-row">
//           <div className="form-group">
//             <label>Blood Group</label>
//             <select name="bloodGroup" value={selectedBloodType || ''} disabled>
//               <option>{selectedBloodType}</option>
//             </select>
//           </div>
//           <div className="form-group">
//             <label>Bag *</label>
//             <select name="bag" onChange={handleIssueInputChange} required>
//               <option>Select Bag</option>
//               <option>2010 (300 ml)</option>
//               <option>6 (300 ml)</option>
//             </select>
//           </div>
//           <div className="form-group">
//             <label>Charge Category *</label>
//             <select name="chargeCategory" onChange={handleIssueInputChange} required>
//               <option>Select</option>
//               <option>Category 1</option>
//               <option>Category 2</option>
//             </select>
//           </div>
//           <div className="form-group">
//             <label>Charge Name *</label>
//             <select name="chargeName" onChange={handleIssueInputChange} required>
//               <option>Select</option>
//               <option>Charge 1</option>
//               <option>Charge 2</option>
//             </select>
//           </div>
//         </div>
//         <div className="form-group">
//           <label>Standard Charge (₹)</label>
//           <input type="number" name="standardCharge" placeholder="Enter standard charge" onChange={handleIssueInputChange} />
//         </div>
//         <div className="form-group">
//           <label>Note</label>
//           <textarea name="note" value={issueFormData.note} placeholder="Enter any notes" onChange={handleIssueInputChange}></textarea>
//         </div>
//         <div className="form-summary">
//           <div className="summary-group">
//             <label>Total (₹):</label>
//             <p>{calculatedCharge.toFixed(2)}</p>
//           </div>
//           <div className="summary-group">
//             <label>Discount (₹):</label>
//             <input type="number" placeholder="0" />
//             <span>%</span>
//           </div>
//           <div className="summary-group">
//             <label>Tax (₹):</label>
//             <p>{tax.toFixed(2)}</p>
//             <span>%</span>
//           </div>
//           <div className="summary-group">
//             <label>Net Amount (₹):</label>
//             <p>{netAmount.toFixed(2)}</p>
//           </div>
//           <div className="summary-group">
//             <label>Payment Mode</label>
//             <select name="paymentMode" onChange={handleIssueInputChange}>
//               <option>Cash</option>
//               <option>Card</option>
//               <option>Online</option>
//             </select>
//           </div>
//           <div className="summary-group">
//             <label>Payment Amount (₹) *</label>
//             <input type="number" name="paymentAmount" placeholder="Enter payment amount" onChange={handleIssueInputChange} required />
//           </div>
//         </div>
//         <div className="form-footer">
//           <button type="submit" className="save-button">Save & Print</button>
//           <button type="submit" className="save-button">Save</button>
//         </div>
//       </form>
//     </div>
//   </div>
// )} */}


// {showIssueNotification && (
//         <div className="notification-box">
//           <button className="close-notification" onClick={handleCloseIssueNotification}>X</button>
//           <div className="form-container">
//             <div className="form-header">
//               {/* Adding a button that uses handleNewPatientClick */}
//               <button type="button" className="new-patient-button" onClick={handleNewPatientClick}>
//                 + New Patient
//               </button>
//               {/* Existing input for case ID */}
//               <input type="text" name="caseId" placeholder="Case ID" className="case-id-input" onChange={() => {}} />
//             </div>
//             <form onSubmit={handleIssueSave}>
//         <div className="form-row">
//           <div className="form-group">
//             <label>Issue Date *</label>
//             <input type="datetime-local" name="issueDate" value={issueFormData.issueDate} onChange={handleIssueInputChange} required />
//           </div>
//           <div className="form-group">
//             <label>Hospital Doctor</label>
//             <select name="doctor" value={issueFormData.doctor} onChange={handleIssueInputChange}>
//               <option>Select</option>
//               <option>Doctor 1</option>
//               <option>Doctor 2</option>
//             </select>
//           </div>
//           <div className="form-group">
//             <label>Reference Name *</label>
//             <input type="text" name="reference" value={issueFormData.reference} placeholder="Enter reference" onChange={handleIssueInputChange} required />
//           </div>
//           <div className="form-group">
//             <label>Technician</label>
//             <input type="text" name="technician" value={issueFormData.technician} placeholder="Enter technician's name" onChange={handleIssueInputChange} />
//           </div>
//         </div>
//         <div className="form-row">
//           <div className="form-group">
//             <label>Blood Group</label>
//             <select name="bloodGroup" value={selectedBloodType || ''} disabled>
//               <option>{selectedBloodType}</option>
//             </select>
//           </div>
//           <div className="form-group">
//             <label>Bag *</label>
//             <select name="bag" onChange={handleIssueInputChange} required>
//               <option>Select Bag</option>
//               <option>2010 (300 ml)</option>
//               <option>6 (300 ml)</option>
//             </select>
//           </div>
//           <div className="form-group">
//             <label>Charge Category *</label>
//             <select name="chargeCategory" onChange={handleIssueInputChange} required>
//               <option>Select</option>
//               <option>Category 1</option>
//               <option>Category 2</option>
//             </select>
//           </div>
//           <div className="form-group">
//             <label>Charge Name *</label>
//             <select name="chargeName" onChange={handleIssueInputChange} required>
//               <option>Select</option>
//               <option>Charge 1</option>
//               <option>Charge 2</option>
//             </select>
//           </div>
//         </div>
//         <div className="form-group">
//           <label>Standard Charge (₹)</label>
//           <input type="number" name="standardCharge" placeholder="Enter standard charge" onChange={handleIssueInputChange} />
//         </div>
//         <div className="form-group">
//           <label>Note</label>
//           <textarea name="note" value={issueFormData.note} placeholder="Enter any notes" onChange={handleIssueInputChange}></textarea>
//         </div>
//         <div className="form-summary">
//           <div className="summary-group">
//             <label>Total (₹):</label>
//             <p>{calculatedCharge.toFixed(2)}</p>
//           </div>
//           <div className="summary-group">
//             <label>Discount (₹):</label>
//             <input type="number" placeholder="0" />
//             <span>%</span>
//           </div>
//           <div className="summary-group">
//             <label>Tax (₹):</label>
//             <p>{tax.toFixed(2)}</p>
//             <span>%</span>
//           </div>
//           <div className="summary-group">
//             <label>Net Amount (₹):</label>
//             <p>{netAmount.toFixed(2)}</p>
//           </div>
//           <div className="summary-group">
//             <label>Payment Mode</label>
//             <select name="paymentMode" onChange={handleIssueInputChange}>
//               <option>Cash</option>
//               <option>Card</option>
//               <option>Online</option>
//             </select>
//           </div>
//           <div className="summary-group">
//             <label>Payment Amount (₹) *</label>
//             <input type="number" name="paymentAmount" placeholder="Enter payment amount" onChange={handleIssueInputChange} required />
//           </div>
//         </div>
//         <div className="form-footer">
//           <button type="submit" className="save-button">Save & Print</button>
//           <button type="submit" className="save-button">Save</button>
//         </div>
//       </form>
//           </div>
//         </div>
//       )}

//       {showNewPatientNotification && (
//         <div className="notification-box">
//           <button className="close-notification" onClick={handleCloseNewPatientNotification}>X</button>
//           <div className="form-container">
//             <h3>Add Patient</h3>
//             <form>
//             <div className="form-row">
//                 <div className="form-group">
//                   <label>Name *</label>
//                   <input type="text" name="name" placeholder="Enter patient name" required />
//                 </div>
//                 <div className="form-group">
//                   <label>Guardian Name</label>
//                   <input type="text" name="guardianName" placeholder="Enter guardian name" />
//                 </div>
//               </div>
//               <div className="form-row">
//                 <div className="form-group">
//                   <label>Gender</label>
//                   <select name="gender">
//                     <option>Select</option>
//                     <option>Male</option>
//                     <option>Female</option>
//                     <option>Other</option>
//                   </select>
//                 </div>
//                 <div className="form-group">
//                   <label>Date Of Birth</label>
//                   <input type="date" name="dob" />
//                 </div>
//                 <div className="form-group">
//                   <label>Age (yy-mm-dd) *</label>
//                   <div className="age-inputs">
//                     <input type="number" placeholder="Year" />
//                     <input type="number" placeholder="Month" />
//                     <input type="number" placeholder="Day" />
//                   </div>
//                 </div>
//                 <div className="form-group">
//                   <label>Blood Group</label>
//                   <select name="bloodGroup">
//                     <option>Select</option>
//                     <option>O+</option>
//                     <option>O-</option>
//                     <option>A+</option>
//                     <option>A-</option>
//                     <option>B+</option>
//                     <option>B-</option>
//                     <option>AB+</option>
//                     <option>AB-</option>
//                   </select>
//                 </div>
//                 <div className="form-group">
//                   <label>Marital Status</label>
//                   <select name="maritalStatus">
//                     <option>Select</option>
//                     <option>Single</option>
//                     <option>Married</option>
//                   </select>
//                 </div>
//                 <div className="form-group">
//                   <label>Patient Photo</label>
//                   <input type="file" name="patientPhoto" />
//                 </div>
//               </div>
//               <div className="form-row">
//                 <div className="form-group">
//                   <label>Phone</label>
//                   <input type="text" name="phone" />
//                 </div>
//                 <div className="form-group">
//                   <label>Email</label>
//                   <input type="email" name="email" />
//                 </div>
//                 <div className="form-group">
//                   <label>Address</label>
//                   <input type="text" name="address" />
//                 </div>
//               </div>
//               <div className="form-row">
//                 <div className="form-group">
//                   <label>Remarks</label>
//                   <textarea name="remarks"></textarea>
//                 </div>
//                 <div className="form-group">
//                   <label>Any Known Allergies</label>
//                   <textarea name="allergies"></textarea>
//                 </div>
//               </div>
//               <div className="form-row">
//                 <div className="form-group">
//                   <label>TPA ID</label>
//                   <input type="text" name="tpaId" />
//                 </div>
//                 <div className="form-group">
//                   <label>TPA Validity</label>
//                   <input type="date" name="tpaValidity" />
//                 </div>
//                 <div className="form-group">
//                   <label>National Identification Number</label>
//                   <input type="text" name="nationalId" />
//                 </div>
//               </div>
//               <div className="form-footer">
//                 <button type="submit" className="save-button">Save</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       <div className="main-container">
//         <div className="sidebar">
//           {bloodTypes.map((type) => (
//             <button
//               key={type}
//               className={`blood-type-button ${selectedBloodType === type ? 'active' : ''}`}
//               onClick={() => setSelectedBloodType(type)}
//             >
//               {type}
//             </button>
//           ))}
//         </div>

//         {selectedBloodType && (
//           <div className="content">
//             <div className="table-section">
//               <div className="table-header">
//                 <h3>Blood - {selectedBloodType}</h3>
//                 <span>{bloodData[selectedBloodType]?.length || 0} Bags</span>
//                 <button className="add-button" onClick={handleAddClick}>
//                   <FaPlus /> Add Entry
//                 </button>
//               </div>
//               <table className="data-table">
//                 <thead>
//                   <tr>
//                     <th>Bags</th>
//                     <th>Lot</th>
//                     <th>Institution</th>
//                     <th>Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {(bloodData[selectedBloodType] || []).map((row, index) => (
//                     <tr key={index}>
//                       <td>{row.bags}</td>
//                       <td>{row.lot}</td>
//                       <td>{row.institution}</td>
//                       <td>
//                         <button className="issue-button" onClick={() => handleIssueClick(row)}>
//                           {row.action}
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             <div className="table-section">
//               <div className="table-header">
//                 <h3>Components - {selectedBloodType}</h3>
//                 <span>{componentData[selectedBloodType]?.length || 0} Bags</span>
//                 <button className="add-button" onClick={handleAddClick}>
//                   <FaPlus /> Add Entry
//                 </button>
//               </div>
//               <table className="data-table">
//                 <thead>
//                   <tr>
//                     <th>Bags</th>
//                     <th>Lot</th>
//                     <th>Components</th>
//                     <th>Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {(componentData[selectedBloodType] || []).map((row, index) => (
//                     <tr key={index}>
//                       <td>{row.bags}</td>
//                       <td>{row.lot}</td>
//                       <td>{row.components}</td>
//                       <td>
//                         <button className="issue-button" onClick={() => handleIssueClick(row)}>
//                           {row.action}
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BloodBankStatus;




// import React, { useState, useEffect } from 'react';
// import './bloodbank.css';
// import { FaPlus } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const BloodBankStatus = () => {
//   const bloodTypes = ['O+', 'O-', 'B+', 'B-', 'A+', 'AB+', 'plate', 'test blood bank'];

//   // Initial blood data
//   const initialBloodData = {
//     'O+': [
//       { bags: '2010 (300 ml)', lot: 6, institution: '', action: 'Issue' },
//       { bags: '6 (300 ml)', lot: 2, institution: 'Drighna Healthcare', action: 'Issue' },
//     ],
//   };

//   const initialComponentData = {
//     'O+': [
//       { bags: '2026 (200 ml)', lot: 1, components: 'White Cells & Granulocytes', action: 'Issue' },
//     ],
//   };

//   const [bloodData, setBloodData] = useState(initialBloodData);
//   const [componentData, setComponentData] = useState(initialComponentData);
//   const [selectedBloodType, setSelectedBloodType] = useState(null);
//   const [showNotification, setShowNotification] = useState(false);
//   const [showIssueNotification, setShowIssueNotification] = useState(false);
//   const [selectedRow, setSelectedRow] = useState(null);
//   const [formData, setFormData] = useState({
//     donor: '',
//     donateDate: '',
//     bag: '',
//     volume: '',
//     lot: '',
//     chargeCategory: '',
//     chargeName: '',
//     standardCharge: '',
//     institution: '',
//     note: '',
//   });
//   const [issueFormData, setIssueFormData] = useState({
//     issueDate: '',
//     doctor: '',
//     reference: '',
//     technician: '',
//     note: '',
//   });
//   const [calculatedCharge, setCalculatedCharge] = useState(0);
//   const [tax, setTax] = useState(0);
//   const [netAmount, setNetAmount] = useState(0);
//   const [showNewPatientNotification, setShowNewPatientNotification] = useState(false);

//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchBloodProducts = async () => {
//       try {
//         const response = await axios.get('http://localhost:3000/api/blood-bank-products');
//         setBloodData(response.data); // Assuming data format matches initialBloodData structure
//       } catch (error) {
//         console.error('Error fetching blood products:', error);
//       }
//     };
//     fetchBloodProducts();
//   }, []);

//   const handleAddClick = () => {
//     setShowNotification(true);
//   };

//   const handleIssueClick = (row) => {
//     setSelectedRow(row);
//     setShowIssueNotification(true);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleIssueInputChange = (e) => {
//     const { name, value } = e.target;
//     setIssueFormData({ ...issueFormData, [name]: value });
//   };

//   const handleCloseNotification = () => {
//     setShowNotification(false);
//   };

//   const handleCloseIssueNotification = () => {
//     setShowIssueNotification(false);
//   };

//   const handleNewPatientClick = () => {
//     setShowNewPatientNotification(true);
//   };

//   const handleCloseNewPatientNotification = () => {
//     setShowNewPatientNotification(false);
//   };

//   const handleCalculate = () => {
//     const baseCharge = parseFloat(formData.standardCharge) || 0;
//     const calculatedTax = baseCharge * 0.15; // Example tax rate of 15%
//     setTax(calculatedTax);
//     setNetAmount(baseCharge + calculatedTax);
//     setCalculatedCharge(baseCharge);
//   };

//   const handleSave = (e) => {
//     e.preventDefault();
//     if (selectedBloodType && formData.bag) {
//       const newEntry = {
//         bags: `${formData.bag} (${formData.volume || '300 ml'})`,
//         lot: formData.lot,
//         institution: formData.institution,
//         action: 'Issue',
//       };

//       setBloodData((prevData) => ({
//         ...prevData,
//         [selectedBloodType]: [...(prevData[selectedBloodType] || []), newEntry],
//       }));

//       setShowNotification(false);
//       resetForm();
//     }
//   };

//   const handleIssueSave = (e) => {
//     e.preventDefault();
//     // Handle saving of issued blood details
//     setShowIssueNotification(false);
//     setIssueFormData({
//       issueDate: '',
//       doctor: '',
//       reference: '',
//       technician: '',
//       note: '',
//     });
//   };

//   const resetForm = () => {
//     setFormData({
//       donor: '',
//       donateDate: '',
//       bag: '',
//       volume: '',
//       lot: '',
//       chargeCategory: '',
//       chargeName: '',
//       standardCharge: '',
//       institution: '',
//       note: '',
//     });
//     setCalculatedCharge(0);
//     setTax(0);
//     setNetAmount(0);
//   };

//   return (
//     <div className="blood-bank-status">
//       <h2>Blood Bank Status</h2>

//       <div className="input-fields-container">
//         <div className="input-field">
//           <button className="category-button" onClick={() => navigate('/blood-bank-details')}>Donor Details</button><br />
//         </div>
//         <div className="input-field">
//           <button className="category-button" onClick={() => navigate('/blood-issue-details')}>Blood Issue Details</button><br />
//         </div>
//         <div className="input-field">
//           <button className="category-button" onClick={() => navigate('/component-issue')}>Component Issue</button><br />
//         </div>
//       </div>

//       {showNotification && (
//         <div className="notification-box">
//           <button className="close-notification" onClick={handleCloseNotification}>X</button>
//           <div className="form-container">
//             <form onSubmit={handleSave}>
//               <div className="form-group">
//                 <label>Blood Donor *</label>
//                 <select name="donor" value={formData.donor} onChange={handleInputChange} required>
//                   <option value="">Select</option>
//                   <option value="Donor 1">Donor 1</option>
//                   <option value="Donor 2">Donor 2</option>
//                 </select>
//               </div>
//               <div className="form-group">
//                 <label>Donate Date *</label>
//                 <input type="datetime-local" name="donateDate" value={formData.donateDate} onChange={handleInputChange} required />
//               </div>
//               <div className="form-group">
//                 <label>Bag *</label>
//                 <input type="text" name="bag" value={formData.bag} placeholder="Enter bag number" onChange={handleInputChange} required />
//               </div>
//               <div className="form-group">
//                 <label>Volume</label>
//                 <input type="text" name="volume" value={formData.volume} placeholder="Enter volume" onChange={handleInputChange} />
//               </div>
//               <div className="form-group">
//                 <label>Lot</label>
//                 <input type="text" name="lot" value={formData.lot} placeholder="Enter lot number" onChange={handleInputChange} />
//               </div>
//               <div className="form-group">
//                 <label>Charge Category *</label>
//                 <select name="chargeCategory" value={formData.chargeCategory} onChange={handleInputChange} required>
//                   <option value="">Select</option>
//                   <option value="Blood sugar test">Blood sugar test</option>
//                   <option value="Category 2">Category 2</option>
//                 </select>
//               </div>
//               <div className="form-group">
//                 <label>Charge Name *</label>
//                 <select name="chargeName" value={formData.chargeName} onChange={handleInputChange} required>
//                   <option value="">Select</option>
//                   <option value="Blood Sugar test">Blood Sugar test</option>
//                   <option value="Charge 2">Charge 2</option>
//                 </select>
//               </div>
//               <div className="form-group">
//                 <label>Standard Charge (₹) *</label>
//                 <input type="number" name="standardCharge" value={formData.standardCharge} placeholder="Enter standard charge" onChange={handleInputChange} required />
//               </div>
//               <div className="form-group">
//                 <label>Institution</label>
//                 <input type="text" name="institution" value={formData.institution} placeholder="Enter institution name" onChange={handleInputChange} />
//               </div>
//               <div className="form-group">
//                 <label>Note</label>
//                 <textarea name="note" value={formData.note} placeholder="Enter additional notes" onChange={handleInputChange}></textarea>
//               </div>
//               <div className="form-footer">
//                 <button type="button" className="calculate-button" onClick={handleCalculate}>Calculate</button>
//                 <button type="submit" className="save-button">Save</button>
//               </div>
//               <div className="charge-summary">
//                 <p>Total (₹): {calculatedCharge.toFixed(2)}</p>
//                 <p>Tax (₹): {tax.toFixed(2)}</p>
//                 <p>Net Amount (₹): {netAmount.toFixed(2)}</p>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {showIssueNotification && (
//         <div className="notification-box">
//           <button className="close-notification" onClick={handleCloseIssueNotification}>X</button>
//           <div className="form-container">
//             <div className="form-header">
//               <button type="button" className="new-patient-button" onClick={handleNewPatientClick}>
//                 + New Patient
//               </button>
//               <input type="text" name="caseId" placeholder="Case ID" className="case-id-input" onChange={() => {}} />
//             </div>
//             <form onSubmit={handleIssueSave}>
//               <div className="form-row">
//                 <div className="form-group">
//                   <label>Issue Date *</label>
//                   <input type="datetime-local" name="issueDate" value={issueFormData.issueDate} onChange={handleIssueInputChange} required />
//                 </div>
//                 <div className="form-group">
//                   <label>Hospital Doctor</label>
//                   <select name="doctor" value={issueFormData.doctor} onChange={handleIssueInputChange}>
//                     <option>Select</option>
//                     <option>Doctor 1</option>
//                     <option>Doctor 2</option>
//                   </select>
//                 </div>
//                 <div className="form-group">
//                   <label>Reference Name *</label>
//                   <input type="text" name="reference" value={issueFormData.reference} placeholder="Enter reference" onChange={handleIssueInputChange} required />
//                 </div>
//                 <div className="form-group">
//                   <label>Technician</label>
//                   <input type="text" name="technician" value={issueFormData.technician} placeholder="Enter technician's name" onChange={handleIssueInputChange} />
//                 </div>
//               </div>
//               <div className="form-row">
//                 <div className="form-group">
//                   <label>Blood Group</label>
//                   <select name="bloodGroup" value={selectedBloodType || ''} disabled>
//                     <option>{selectedBloodType}</option>
//                   </select>
//                 </div>
//                 <div className="form-group">
//                   <label>Bag *</label>
//                   <select name="bag" onChange={handleIssueInputChange} required>
//                     <option>Select Bag</option>
//                     <option>2010 (300 ml)</option>
//                     <option>6 (300 ml)</option>
//                   </select>
//                 </div>
//                 <div className="form-group">
//                   <label>Charge Category *</label>
//                   <select name="chargeCategory" onChange={handleIssueInputChange} required>
//                     <option>Select</option>
//                     <option>Category 1</option>
//                     <option>Category 2</option>
//                   </select>
//                 </div>
//                 <div className="form-group">
//                   <label>Charge Name *</label>
//                   <select name="chargeName" onChange={handleIssueInputChange} required>
//                     <option>Select</option>
//                     <option>Charge 1</option>
//                     <option>Charge 2</option>
//                   </select>
//                 </div>
//               </div>
//               <div className="form-group">
//                 <label>Standard Charge (₹)</label>
//                 <input type="number" name="standardCharge" placeholder="Enter standard charge" onChange={handleIssueInputChange} />
//               </div>
//               <div className="form-group">
//                 <label>Note</label>
//                 <textarea name="note" value={issueFormData.note} placeholder="Enter any notes" onChange={handleIssueInputChange}></textarea>
//               </div>
//               <div className="form-summary">
//                 <div className="summary-group">
//                   <label>Total (₹):</label>
//                   <p>{calculatedCharge.toFixed(2)}</p>
//                 </div>
//                 <div className="summary-group">
//                   <label>Discount (₹):</label>
//                   <input type="number" placeholder="0" />
//                   <span>%</span>
//                 </div>
//                 <div className="summary-group">
//                   <label>Tax (₹):</label>
//                   <p>{tax.toFixed(2)}</p>
//                   <span>%</span>
//                 </div>
//                 <div className="summary-group">
//                   <label>Net Amount (₹):</label>
//                   <p>{netAmount.toFixed(2)}</p>
//                 </div>
//                 <div className="summary-group">
//                   <label>Payment Mode</label>
//                   <select name="paymentMode" onChange={handleIssueInputChange}>
//                     <option>Cash</option>
//                     <option>Card</option>
//                     <option>Online</option>
//                   </select>
//                 </div>
//                 <div className="summary-group">
//                   <label>Payment Amount (₹) *</label>
//                   <input type="number" name="paymentAmount" placeholder="Enter payment amount" onChange={handleIssueInputChange} required />
//                 </div>
//               </div>
//               <div className="form-footer">
//                 <button type="submit" className="save-button">Save & Print</button>
//                 <button type="submit" className="save-button">Save</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {showNewPatientNotification && (
//         <div className="notification-box">
//           <button className="close-notification" onClick={handleCloseNewPatientNotification}>X</button>
//           <div className="form-container">
//             <h3>Add Patient</h3>
//             <form>
//               <div className="form-row">
//                 <div className="form-group">
//                   <label>Name *</label>
//                   <input type="text" name="name" placeholder="Enter patient name" required />
//                 </div>
//                 <div className="form-group">
//                   <label>Guardian Name</label>
//                   <input type="text" name="guardianName" placeholder="Enter guardian name" />
//                 </div>
//               </div>
//               <div className="form-row">
//                 <div className="form-group">
//                   <label>Gender</label>
//                   <select name="gender">
//                     <option>Select</option>
//                     <option>Male</option>
//                     <option>Female</option>
//                     <option>Other</option>
//                   </select>
//                 </div>
//                 <div className="form-group">
//                   <label>Date Of Birth</label>
//                   <input type="date" name="dob" />
//                 </div>
//                 <div className="form-group">
//                   <label>Age (yy-mm-dd) *</label>
//                   <div className="age-inputs">
//                     <input type="number" placeholder="Year" />
//                     <input type="number" placeholder="Month" />
//                     <input type="number" placeholder="Day" />
//                   </div>
//                 </div>
//                 <div className="form-group">
//                   <label>Blood Group</label>
//                   <select name="bloodGroup">
//                     <option>Select</option>
//                     <option>O+</option>
//                     <option>O-</option>
//                     <option>A+</option>
//                     <option>A-</option>
//                     <option>B+</option>
//                     <option>B-</option>
//                     <option>AB+</option>
//                     <option>AB-</option>
//                   </select>
//                 </div>
//                 <div className="form-group">
//                   <label>Marital Status</label>
//                   <select name="maritalStatus">
//                     <option>Select</option>
//                     <option>Single</option>
//                     <option>Married</option>
//                   </select>
//                 </div>
//                 <div className="form-group">
//                   <label>Patient Photo</label>
//                   <input type="file" name="patientPhoto" />
//                 </div>
//               </div>
//               <div className="form-row">
//                 <div className="form-group">
//                   <label>Phone</label>
//                   <input type="text" name="phone" />
//                 </div>
//                 <div className="form-group">
//                   <label>Email</label>
//                   <input type="email" name="email" />
//                 </div>
//                 <div className="form-group">
//                   <label>Address</label>
//                   <input type="text" name="address" />
//                 </div>
//               </div>
//               <div className="form-row">
//                 <div className="form-group">
//                   <label>Remarks</label>
//                   <textarea name="remarks"></textarea>
//                 </div>
//                 <div className="form-group">
//                   <label>Any Known Allergies</label>
//                   <textarea name="allergies"></textarea>
//                 </div>
//               </div>
//               <div className="form-row">
//                 <div className="form-group">
//                   <label>TPA ID</label>
//                   <input type="text" name="tpaId" />
//                 </div>
//                 <div className="form-group">
//                   <label>TPA Validity</label>
//                   <input type="date" name="tpaValidity" />
//                 </div>
//                 <div className="form-group">
//                   <label>National Identification Number</label>
//                   <input type="text" name="nationalId" />
//                 </div>
//               </div>
//               <div className="form-footer">
//                 <button type="submit" className="save-button">Save</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       <div className="main-container">
//         <div className="sidebar">
//           {bloodTypes.map((type) => (
//             <button
//               key={type}
//               className={`blood-type-button ${selectedBloodType === type ? 'active' : ''}`}
//               onClick={() => setSelectedBloodType(type)}
//             >
//               {type}
//             </button>
//           ))}
//         </div>

//         {selectedBloodType && (
//           <div className="content">
//             <div className="table-section">
//               <div className="table-header">
//                 <h3>Blood - {selectedBloodType}</h3>
//                 <span>{bloodData[selectedBloodType]?.length || 0} Bags</span>
//                 <button className="add-button" onClick={handleAddClick}>
//                   <FaPlus /> Add Entry
//                 </button>
//               </div>
//               <table className="data-table">
//                 <thead>
//                   <tr>
//                     <th>Bags</th>
//                     <th>Lot</th>
//                     <th>Institution</th>
//                     <th>Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {(bloodData[selectedBloodType] || []).map((row, index) => (
//                     <tr key={index}>
//                       <td>{row.bags}</td>
//                       <td>{row.lot}</td>
//                       <td>{row.institution}</td>
//                       <td>
//                         <button className="issue-button" onClick={() => handleIssueClick(row)}>
//                           {row.action}
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             <div className="table-section">
//               <div className="table-header">
//                 <h3>Components - {selectedBloodType}</h3>
//                 <span>{componentData[selectedBloodType]?.length || 0} Bags</span>
//                 <button className="add-button" onClick={handleAddClick}>
//                   <FaPlus /> Add Entry
//                 </button>
//               </div>
//               <table className="data-table">
//                 <thead>
//                   <tr>
//                     <th>Bags</th>
//                     <th>Lot</th>
//                     <th>Components</th>
//                     <th>Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {(componentData[selectedBloodType] || []).map((row, index) => (
//                     <tr key={index}>
//                       <td>{row.bags}</td>
//                       <td>{row.lot}</td>
//                       <td>{row.components}</td>
//                       <td>
//                         <button className="issue-button" onClick={() => handleIssueClick(row)}>
//                           {row.action}
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BloodBankStatus;






// import React, { useState, useEffect } from 'react';
// import './bloodbank.css';
// import { FaPlus } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const BloodBankStatus = () => {
//   const bloodTypes = ['O+', 'O-', 'B+', 'B-', 'A+', 'AB+', 'plate', 'test blood bank'];

//   // Initial blood data
//   const initialBloodData = {
//     'O+': [
//       { bags: '2010 (300 ml)', lot: 6, institution: '', action: 'Issue' },
//       { bags: '6 (300 ml)', lot: 2, institution: 'Drighna Healthcare', action: 'Issue' },
//     ],
//   };

//   const initialComponentData = {
//     'O+': [
//       { bags: '2026 (200 ml)', lot: 1, components: 'White Cells & Granulocytes', action: 'Issue' },
//     ],
//   };

//   const [bloodData, setBloodData] = useState([]);
//   const [componentData, setComponentData] = useState(initialComponentData);
//   const [selectedBloodType, setSelectedBloodType] = useState(null);
//   const [showNotification, setShowNotification] = useState(false);
//   const [showIssueNotification, setShowIssueNotification] = useState(false);
//   const [selectedRow, setSelectedRow] = useState(null);
//   const [formData, setFormData] = useState({
//     donor: '',
//     donateDate: '',
//     bag: '',
//     volume: '',
//     lot: '',
//     chargeCategory: '',
//     chargeName: '',
//     standardCharge: '',
//     institution: '',
//     note: '',
//   });
//   const [issueFormData, setIssueFormData] = useState({
//     issueDate: '',
//     doctor: '',
//     reference: '',
//     technician: '',
//     note: '',
//   });
//   const [calculatedCharge, setCalculatedCharge] = useState(0);
//   const [tax, setTax] = useState(0);
//   const [netAmount, setNetAmount] = useState(0);
//   const [showNewPatientNotification, setShowNewPatientNotification] = useState(false);
//   const [newProduct, setNewProduct] = useState({ name: '', is_blood_group: false });

//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchBloodData = async () => {
//       try {
//         const response = await axios.get('http://localhost:3000/api/blood-bank-products');
//         setBloodData(response.data);
//       } catch (error) {
//         console.error('Error fetching blood products:', error);
//       }
//     };

//     fetchBloodData();
//   }, []);

//   const handleAddProduct = async () => {
//     try {
//       const response = await axios.post('http://localhost:3000/api/blood-bank-products', newProduct);
//       setBloodData([...bloodData, response.data]);
//       setNewProduct({ name: '', is_blood_group: false });
//     } catch (error) {
//       console.error('Error adding new blood product:', error);
//     }
//   };

//   const handleAddClick = () => {
//     setShowNotification(true);
//   };

//   const handleIssueClick = (row) => {
//     setSelectedRow(row);
//     setShowIssueNotification(true);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleIssueInputChange = (e) => {
//     const { name, value } = e.target;
//     setIssueFormData({ ...issueFormData, [name]: value });
//   };

//   const handleCloseNotification = () => {
//     setShowNotification(false);
//   };

//   const handleCloseIssueNotification = () => {
//     setShowIssueNotification(false);
//   };

//   const handleNewPatientClick = () => {
//     setShowNewPatientNotification(true);
//   };

//   const handleCloseNewPatientNotification = () => {
//     setShowNewPatientNotification(false);
//   };

//   const handleCalculate = () => {
//     const baseCharge = parseFloat(formData.standardCharge) || 0;
//     const calculatedTax = baseCharge * 0.15; // Example tax rate of 15%
//     setTax(calculatedTax);
//     setNetAmount(baseCharge + calculatedTax);
//     setCalculatedCharge(baseCharge);
//   };

//   const handleSave = (e) => {
//     e.preventDefault();
//     if (selectedBloodType && formData.bag) {
//       const newEntry = {
//         bags: `${formData.bag} (${formData.volume || '300 ml'})`,
//         lot: formData.lot,
//         institution: formData.institution,
//         action: 'Issue',
//       };

//       setBloodData((prevData) => ({
//         ...prevData,
//         [selectedBloodType]: [...(prevData[selectedBloodType] || []), newEntry],
//       }));

//       setShowNotification(false);
//       resetForm();
//     }
//   };

//   const handleIssueSave = (e) => {
//     e.preventDefault();
//     setShowIssueNotification(false);
//     setIssueFormData({
//       issueDate: '',
//       doctor: '',
//       reference: '',
//       technician: '',
//       note: '',
//     });
//   };

//   const resetForm = () => {
//     setFormData({
//       donor: '',
//       donateDate: '',
//       bag: '',
//       volume: '',
//       lot: '',
//       chargeCategory: '',
//       chargeName: '',
//       standardCharge: '',
//       institution: '',
//       note: '',
//     });
//     setCalculatedCharge(0);
//     setTax(0);
//     setNetAmount(0);
//   };

//   return (
//     <div className="blood-bank-status">
//       <h2>Blood Bank Status</h2>
//       <input
//         type="text"
//         placeholder="Product Name"
//         value={newProduct.name}
//         onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
//       />
//       <label>
//         Is Blood Group:
//         <input
//           type="checkbox"
//           checked={newProduct.is_blood_group}
//           onChange={(e) => setNewProduct({ ...newProduct, is_blood_group: e.target.checked })}
//         />
//       </label>
//       <button onClick={handleAddProduct}>Add Product</button>

//       <div className="input-fields-container">
//         <div className="input-field">
//           <button className="category-button" onClick={() => navigate('/blood-bank-details')}>Donor Details</button><br />
//         </div>
//         <div className="input-field">
//           <button className="category-button" onClick={() => navigate('/blood-issue-details')}>Blood Issue Details</button><br />
//         </div>
//         <div className="input-field">
//           <button className="category-button" onClick={() => navigate('/component-issue')}>Component Issue</button><br />
//         </div>
//       </div>
//  onChange={(e)=> setNewProduct({
//       showNotification && (
//         <div className="notification-box">
//           <button className="close-notification" onClick={handleCloseNotification}>X</button>
//           <div className="form-container">
//           <form onSubmit={handleSave}>
//               <div className="form-group">
//                 <label>Blood Donor *</label>
//                 <select name="donor" value={formData.donor} onChange={handleInputChange} required>
//                   <option value="">Select</option>
//                   <option value="Donor 1">Donor 1</option>
//                   <option value="Donor 2">Donor 2</option>
//                 </select>
//               </div>
//               <div className="form-group">
//                 <label>Donate Date *</label>
//                 <input type="datetime-local" name="donateDate" value={formData.donateDate} onChange={handleInputChange} required />
//               </div>
//               <div className="form-group">
//                 <label>Bag *</label>
//                 <input type="text" name="bag" value={formData.bag} placeholder="Enter bag number" onChange={handleInputChange} required />
//               </div>
//               <div className="form-group">
//                 <label>Volume</label>
//                 <input type="text" name="volume" value={formData.volume} placeholder="Enter volume" onChange={handleInputChange} />
//               </div>
//               <div className="form-group">
//                 <label>Lot</label>
//                 <input type="text" name="lot" value={formData.lot} placeholder="Enter lot number" onChange={handleInputChange} />
//               </div>
//               <div className="form-group">
//                 <label>Charge Category *</label>
//                 <select name="chargeCategory" value={formData.chargeCategory} onChange={handleInputChange} required>
//                   <option value="">Select</option>
//                   <option value="Blood sugar test">Blood sugar test</option>
//                   <option value="Category 2">Category 2</option>
//                 </select>
//               </div>
//               <div className="form-group">
//                 <label>Charge Name *</label>
//                 <select name="chargeName" value={formData.chargeName} onChange={handleInputChange} required>
//                   <option value="">Select</option>
//                   <option value="Blood Sugar test">Blood Sugar test</option>
//                   <option value="Charge 2">Charge 2</option>
//                 </select>
//               </div>
//               <div className="form-group">
//                 <label>Standard Charge (₹) *</label>
//                 <input type="number" name="standardCharge" value={formData.standardCharge} placeholder="Enter standard charge" onChange={handleInputChange} required />
//               </div>
//               <div className="form-group">
//                 <label>Institution</label>
//                 <input type="text" name="institution" value={formData.institution} placeholder="Enter institution name" onChange={handleInputChange} />
//               </div>
//               <div className="form-group">
//                 <label>Note</label>
//                 <textarea name="note" value={formData.note} placeholder="Enter additional notes" onChange={handleInputChange}></textarea>
//               </div>
//               <div className="form-footer">
//                 <button type="button" className="calculate-button" onClick={handleCalculate}>Calculate</button>
//                 <button type="submit" className="save-button">Save</button>
//               </div>
//               <div className="charge-summary">
//                 <p>Total (₹): {calculatedCharge.toFixed(2)}</p>
//                 <p>Tax (₹): {tax.toFixed(2)}</p>
//                 <p>Net Amount (₹): {netAmount.toFixed(2)}</p>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {showIssueNotification && (
//         <div className="notification-box">
//           <button className="close-notification" onClick={handleCloseIssueNotification}>X</button>
//           <div className="form-container">
//             <div className="form-header">
//               <button type="button" className="new-patient-button" onClick={handleNewPatientClick}>
//                 + New Patient
//               </button>
//               <input type="text" name="caseId" placeholder="Case ID" className="case-id-input" onChange={() => {}} />
//             </div>
//             <form onSubmit={handleIssueSave}>
//               <div className="form-row">
//                 <div className="form-group">
//                   <label>Issue Date *</label>
//                   <input type="datetime-local" name="issueDate" value={issueFormData.issueDate} onChange={handleIssueInputChange} required />
//                 </div>
//                 <div className="form-group">
//                   <label>Hospital Doctor</label>
//                   <select name="doctor" value={issueFormData.doctor} onChange={handleIssueInputChange}>
//                     <option>Select</option>
//                     <option>Doctor 1</option>
//                     <option>Doctor 2</option>
//                   </select>
//                 </div>
//                 <div className="form-group">
//                   <label>Reference Name *</label>
//                   <input type="text" name="reference" value={issueFormData.reference} placeholder="Enter reference" onChange={handleIssueInputChange} required />
//                 </div>
//                 <div className="form-group">
//                   <label>Technician</label>
//                   <input type="text" name="technician" value={issueFormData.technician} placeholder="Enter technician's name" onChange={handleIssueInputChange} />
//                 </div>
//               </div>
//               <div className="form-row">
//                 <div className="form-group">
//                   <label>Blood Group</label>
//                   <select name="bloodGroup" value={selectedBloodType || ''} disabled>
//                     <option>{selectedBloodType}</option>
//                   </select>
//                 </div>
//                 <div className="form-group">
//                   <label>Bag *</label>
//                   <select name="bag" onChange={handleIssueInputChange} required>
//                     <option>Select Bag</option>
//                     <option>2010 (300 ml)</option>
//                     <option>6 (300 ml)</option>
//                   </select>
//                 </div>
//                 <div className="form-group">
//                   <label>Charge Category *</label>
//                   <select name="chargeCategory" onChange={handleIssueInputChange} required>
//                     <option>Select</option>
//                     <option>Category 1</option>
//                     <option>Category 2</option>
//                   </select>
//                 </div>
//                 <div className="form-group">
//                   <label>Charge Name *</label>
//                   <select name="chargeName" onChange={handleIssueInputChange} required>
//                     <option>Select</option>
//                     <option>Charge 1</option>
//                     <option>Charge 2</option>
//                   </select>
//                 </div>
//               </div>
//               <div className="form-group">
//                 <label>Standard Charge (₹)</label>
//                 <input type="number" name="standardCharge" placeholder="Enter standard charge" onChange={handleIssueInputChange} />
//               </div>
//               <div className="form-group">
//                 <label>Note</label>
//                 <textarea name="note" value={issueFormData.note} placeholder="Enter any notes" onChange={handleIssueInputChange}></textarea>
//               </div>
//               <div className="form-summary">
//                 <div className="summary-group">
//                   <label>Total (₹):</label>
//                   <p>{calculatedCharge.toFixed(2)}</p>
//                 </div>
//                 <div className="summary-group">
//                   <label>Discount (₹):</label>
//                   <input type="number" placeholder="0" />
//                   <span>%</span>
//                 </div>
//                 <div className="summary-group">
//                   <label>Tax (₹):</label>
//                   <p>{tax.toFixed(2)}</p>
//                   <span>%</span>
//                 </div>
//                 <div className="summary-group">
//                   <label>Net Amount (₹):</label>
//                   <p>{netAmount.toFixed(2)}</p>
//                 </div>
//                 <div className="summary-group">
//                   <label>Payment Mode</label>
//                   <select name="paymentMode" onChange={handleIssueInputChange}>
//                     <option>Cash</option>
//                     <option>Card</option>
//                     <option>Online</option>
//                   </select>
//                 </div>
//                 <div className="summary-group">
//                   <label>Payment Amount (₹) *</label>
//                   <input type="number" name="paymentAmount" placeholder="Enter payment amount" onChange={handleIssueInputChange} required />
//                 </div>
//               </div>
//               <div className="form-footer">
//                 <button type="submit" className="save-button">Save & Print</button>
//                 <button type="submit" className="save-button">Save</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {showNewPatientNotification && (
//         <div className="notification-box">
//           <button className="close-notification" onClick={handleCloseNewPatientNotification}>X</button>
//           <div className="form-container">
//             <h3>Add Patient</h3>
//             <form>
//               <div className="form-row">
//                 <div className="form-group">
//                   <label>Name *</label>
//                   <input type="text" name="name" placeholder="Enter patient name" required />
//                 </div>
//                 <div className="form-group">
//                   <label>Guardian Name</label>
//                   <input type="text" name="guardianName" placeholder="Enter guardian name" />
//                 </div>
//               </div>
//               <div className="form-row">
//                 <div className="form-group">
//                   <label>Gender</label>
//                   <select name="gender">
//                     <option>Select</option>
//                     <option>Male</option>
//                     <option>Female</option>
//                     <option>Other</option>
//                   </select>
//                 </div>
//                 <div className="form-group">
//                   <label>Date Of Birth</label>
//                   <input type="date" name="dob" />
//                 </div>
//                 <div className="form-group">
//                   <label>Age (yy-mm-dd) *</label>
//                   <div className="age-inputs">
//                     <input type="number" placeholder="Year" />
//                     <input type="number" placeholder="Month" />
//                     <input type="number" placeholder="Day" />
//                   </div>
//                 </div>
//                 <div className="form-group">
//                   <label>Blood Group</label>
//                   <select name="bloodGroup">
//                     <option>Select</option>
//                     <option>O+</option>
//                     <option>O-</option>
//                     <option>A+</option>
//                     <option>A-</option>
//                     <option>B+</option>
//                     <option>B-</option>
//                     <option>AB+</option>
//                     <option>AB-</option>
//                   </select>
//                 </div>
//                 <div className="form-group">
//                   <label>Marital Status</label>
//                   <select name="maritalStatus">
//                     <option>Select</option>
//                     <option>Single</option>
//                     <option>Married</option>
//                   </select>
//                 </div>
//                 <div className="form-group">
//                   <label>Patient Photo</label>
//                   <input type="file" name="patientPhoto" />
//                 </div>
//               </div>
//               <div className="form-row">
//                 <div className="form-group">
//                   <label>Phone</label>
//                   <input type="text" name="phone" />
//                 </div>
//                 <div className="form-group">
//                   <label>Email</label>
//                   <input type="email" name="email" />
//                 </div>
//                 <div className="form-group">
//                   <label>Address</label>
//                   <input type="text" name="address" />
//                 </div>
//               </div>
//               <div className="form-row">
//                 <div className="form-group">
//                   <label>Remarks</label>
//                   <textarea name="remarks"></textarea>
//                 </div>
//                 <div className="form-group">
//                   <label>Any Known Allergies</label>
//                   <textarea name="allergies"></textarea>
//                 </div>
//               </div>
//               <div className="form-row">
//                 <div className="form-group">
//                   <label>TPA ID</label>
//                   <input type="text" name="tpaId" />
//                 </div>
//                 <div className="form-group">
//                   <label>TPA Validity</label>
//                   <input type="date" name="tpaValidity" />
//                 </div>
//                 <div className="form-group">
//                   <label>National Identification Number</label>
//                   <input type="text" name="nationalId" />
//                 </div>
//               </div>
//               <div className="form-footer">
//                 <button type="submit" className="save-button">Save</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       <div className="main-container">
//         <div className="sidebar">
//           {bloodTypes.map((type) => (
//             <button
//               key={type}
//               className={`blood-type-button ${selectedBloodType === type ? 'active' : ''}`}
//               onClick={() => setSelectedBloodType(type)}
//             >
//               {type}
//             </button>
//           ))}
//         </div>

//         {selectedBloodType && (
//           <div className="content">
//             <div className="table-section">
//               <div className="table-header">
//                 <h3>Blood - {selectedBloodType}</h3>
//                 <span>{bloodData[selectedBloodType]?.length || 0} Bags</span>
//                 <button className="add-button" onClick={handleAddClick}>
//                   <FaPlus /> Add Entry
//                 </button>
//               </div>
//               <table className="data-table">
//                 <thead>
//                   <tr>
//                     <th>Bags</th>
//                     <th>Lot</th>
//                     <th>Institution</th>
//                     <th>Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {(bloodData[selectedBloodType] || []).map((row, index) => (
//                     <tr key={index}>
//                       <td>{row.bags}</td>
//                       <td>{row.lot}</td>
//                       <td>{row.institution}</td>
//                       <td>
//                         <button className="issue-button" onClick={() => handleIssueClick(row)}>
//                           {row.action}
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             <div className="table-section">
//               <div className="table-header">
//                 <h3>Components - {selectedBloodType}</h3>
//                 <span>{componentData[selectedBloodType]?.length || 0} Bags</span>
//                 <button className="add-button" onClick={handleAddClick}>
//                   <FaPlus /> Add Entry
//                 </button>
//               </div>
//               <table className="data-table">
//                 <thead>
//                   <tr>
//                     <th>Bags</th>
//                     <th>Lot</th>
//                     <th>Components</th>
//                     <th>Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {(componentData[selectedBloodType] || []).map((row, index) => (
//                     <tr key={index}>
//                       <td>{row.bags}</td>
//                       <td>{row.lot}</td>
//                       <td>{row.components}</td>
//                       <td>
//                         <button className="issue-button" onClick={() => handleIssueClick(row)}>
//                           {row.action}
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BloodBankStatus;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { FaPlus } from 'react-icons/fa';
// import './bloodbank.css';

// const BloodBankStatus = () => {
//   const bloodTypes = ['O+', 'O-', 'B+', 'B-', 'A+', 'AB+', 'plate', 'test blood bank'];
//   const [bloodData, setBloodData] = useState([]);
//   const [showNotification, setShowNotification] = useState(false);
//   const [showIssueNotification, setShowIssueNotification] = useState(false);
//   const [formData, setFormData] = useState({
//     donor: '',
//     donateDate: '',
//     bag: '',
//     volume: '',
//     lot: '',
//     chargeCategory: '',
//     chargeName: '',
//     standardCharge: '',
//     institution: '',
//     note: '',
//   });
//   const [issueFormData, setIssueFormData] = useState({
//     issueDate: '',
//     doctor: '',
//     reference: '',
//     technician: '',
//     bloodGroup: '',
//     bag: '',
//     chargeCategory: '',
//     chargeName: '',
//     standardCharge: '',
//     note: '',
//     paymentMode: '',
//     paymentAmount: ''
//   });
//   const [calculatedCharge, setCalculatedCharge] = useState(0);
//   const [tax, setTax] = useState(0);
//   const [netAmount, setNetAmount] = useState(0);
//   const [selectedBloodType, setSelectedBloodType] = useState(null);
//   const [componentData, setComponentData] = useState({});

//   useEffect(() => {
//         const fetchBloodData = async () => {
//           try {
//             const response = await axios.get('http://localhost:3000/api/blood-bank-products');
//             console.log("Fetched Blood Data:", response.data);
//             setBloodData(response.data);
//           } catch (error) {
//             console.error('Error fetching blood products:', error);
//           }
//         };
    
//         fetchBloodData();
//       }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleIssueInputChange = (e) => {
//     const { name, value } = e.target;
//     setIssueFormData({ ...issueFormData, [name]: value });
//   };

//   const handleCalculate = () => {
//     const baseCharge = parseFloat(formData.standardCharge) || 0;
//     const calculatedTax = baseCharge * 0.15; // Example tax rate of 15%
//     setTax(calculatedTax);
//     setNetAmount(baseCharge + calculatedTax);
//     setCalculatedCharge(baseCharge);
//   };

//   const handleSave = async (e) => {
//     e.preventDefault();
//     try {
//       const newProductData = {
//         name: formData.donor,
//         donateDate: formData.donateDate,
//         bag: formData.bag,
//         volume: formData.volume,
//         lot: formData.lot,
//         chargeCategory: formData.chargeCategory,
//         chargeName: formData.chargeName,
//         standardCharge: formData.standardCharge,
//         institution: formData.institution,
//         note: formData.note,
//       };

//       const response = await axios.post('http://localhost:3000/api/blood-bank-products', newProductData);
//       setBloodData([...bloodData, response.data]);
//       setFormData({
//         donor: '',
//         donateDate: '',
//         bag: '',
//         volume: '',
//         lot: '',
//         chargeCategory: '',
//         chargeName: '',
//         standardCharge: '',
//         institution: '',
//         note: '',
//       });
//       setShowNotification(false);
//     } catch (error) {
//       console.error('Error saving blood product data:', error);
//     }
//   };

//   const handleIssueSave = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:3000/api/blood-issue', issueFormData);
//       console.log('Saved issue data:', response.data);
//       setShowIssueNotification(false);
//       setIssueFormData({
//         issueDate: '',
//         doctor: '',
//         reference: '',
//         technician: '',
//         bloodGroup: '',
//         bag: '',
//         chargeCategory: '',
//         chargeName: '',
//         standardCharge: '',
//         note: '',
//         paymentMode: '',
//         paymentAmount: ''
//       });
//     } catch (error) {
//       console.error('Error saving issue data:', error);
//     }
//   };

//   const handleCloseNotification = () => {
//     setShowNotification(false);
//   };

//   const handleCloseIssueNotification = () => {
//     setShowIssueNotification(false);
//   };

//   const handleAddClick = () => {
//     setShowNotification(true);
//   };

//   const handleNewPatientClick = () => {
//     console.log('Navigate to add new patient');
//   };

//   return (
//     <div className="blood-bank-status">
//       <h2>Blood Bank Status</h2>
//       <div className="input-fields-container">
//         <button className="category-button" onClick={() => console.log('Navigate to /blood-bank-details')}>Donor Details</button>
//         <button className="category-button" onClick={() => console.log('Navigate to /blood-issue-details')}>Blood Issue Details</button>
//         <button className="category-button" onClick={() => console.log('Navigate to /component-issue')}>Component Issue</button>
//       </div>

//       {/* <button onClick={handleAddClick}>Add Entry</button>
//       <button onClick={() => setShowIssueNotification(true)}>Add Issue Entry</button> */}

//       {showNotification && (
//         <div className="notification-box">
//           <button className="close-notification" onClick={handleCloseNotification}>X</button>
//           <div className="form-container">
//             <form onSubmit={handleSave}>
//               <div className="form-group">
//                 <label>Blood Donor *</label>
//                 <select name="donor" value={formData.donor} onChange={handleInputChange} required>
//                   <option value="">Select</option>
//                   <option value="Donor 1">Donor 1</option>
//                   <option value="Donor 2">Donor 2</option>
//                 </select>
//               </div>
//               <div className="form-group">
//                 <label>Donate Date *</label>
//                 <input type="datetime-local" name="donateDate" value={formData.donateDate} onChange={handleInputChange} required />
//               </div>
//               <div className="form-group">
//                 <label>Bag *</label>
//                 <input type="text" name="bag" value={formData.bag} placeholder="Enter bag number" onChange={handleInputChange} required />
//               </div>
//               <div className="form-group">
//                 <label>Volume</label>
//                 <input type="text" name="volume" value={formData.volume} placeholder="Enter volume" onChange={handleInputChange} />
//               </div>
//               <div className="form-group">
//                 <label>Lot</label>
//                 <input type="text" name="lot" value={formData.lot} placeholder="Enter lot number" onChange={handleInputChange} />
//               </div>
//               <div className="form-group">
//                 <label>Charge Category *</label>
//                 <select name="chargeCategory" value={formData.chargeCategory} onChange={handleInputChange} required>
//                   <option value="">Select</option>
//                   <option value="Blood sugar test">Blood sugar test</option>
//                   <option value="Category 2">Category 2</option>
//                 </select>
//               </div>
//               <div className="form-group">
//                 <label>Charge Name *</label>
//                 <select name="chargeName" value={formData.chargeName} onChange={handleInputChange} required>
//                   <option value="">Select</option>
//                   <option value="Blood Sugar test">Blood Sugar test</option>
//                   <option value="Charge 2">Charge 2</option>
//                 </select>
//               </div>
//               <div className="form-group">
//                 <label>Standard Charge (₹) *</label>
//                 <input type="number" name="standardCharge" value={formData.standardCharge} placeholder="Enter standard charge" onChange={handleInputChange} required />
//               </div>
//               <div className="form-group">
//                 <label>Institution</label>
//                 <input type="text" name="institution" value={formData.institution} placeholder="Enter institution name" onChange={handleInputChange} />
//               </div>
//               <div className="form-group">
//                 <label>Note</label>
//                 <textarea name="note" value={formData.note} placeholder="Enter additional notes" onChange={handleInputChange}></textarea>
//               </div>
//               <div className="form-footer">
//                 <button type="button" className="calculate-button" onClick={handleCalculate}>Calculate</button>
//                 <button type="submit" className="save-button">Save</button>
//               </div>
//               <div className="charge-summary">
//                 <p>Total (₹): {calculatedCharge.toFixed(2)}</p>
//                 <p>Tax (₹): {tax.toFixed(2)}</p>
//                 <p>Net Amount (₹): {netAmount.toFixed(2)}</p>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {showIssueNotification && (
//         <div className="notification-box">
//           <button className="close-notification" onClick={handleCloseIssueNotification}>X</button>
//           <div className="form-container">
//             <div className="form-header">
//               <button type="button" className="new-patient-button" onClick={handleNewPatientClick}>
//                 + New Patient
//               </button>
//               <input type="text" name="caseId" placeholder="Case ID" className="case-id-input" onChange={() => {}} />
//             </div>
//             <form onSubmit={handleIssueSave}>
//               <div className="form-row">
//                 <div className="form-group">
//                   <label>Issue Date *</label>
//                   <input type="datetime-local" name="issueDate" value={issueFormData.issueDate} onChange={handleIssueInputChange} required />
//                 </div>
//                 <div className="form-group">
//                   <label>Hospital Doctor</label>
//                   <select name="doctor" value={issueFormData.doctor} onChange={handleIssueInputChange}>
//                     <option>Select</option>
//                     <option>Doctor 1</option>
//                     <option>Doctor 2</option>
//                   </select>
//                 </div>
//                 <div className="form-group">
//                   <label>Reference Name *</label>
//                   <input type="text" name="reference" value={issueFormData.reference} placeholder="Enter reference" onChange={handleIssueInputChange} required />
//                 </div>
//                 <div className="form-group">
//                   <label>Technician</label>
//                   <input type="text" name="technician" value={issueFormData.technician} placeholder="Enter technician's name" onChange={handleIssueInputChange} />
//                 </div>
//               </div>
//               <div className="form-row">
//                 <div className="form-group">
//                   <label>Blood Group</label>
//                   <select name="bloodGroup" value={issueFormData.bloodGroup} onChange={handleIssueInputChange}>
//                     <option>Select</option>
//                     <option>O+</option>
//                     <option>A+</option>
//                     {/* Add other blood groups as needed */}
//                   </select>
//                 </div>
//                 <div className="form-group">
//                   <label>Bag *</label>
//                   <select name="bag" value={issueFormData.bag} onChange={handleIssueInputChange} required>
//                     <option>Select Bag</option>
//                     <option>2010 (300 ml)</option>
//                     <option>6 (300 ml)</option>
//                   </select>
//                 </div>
//                 <div className="form-group">
//                   <label>Charge Category *</label>
//                   <select name="chargeCategory" value={issueFormData.chargeCategory} onChange={handleIssueInputChange} required>
//                     <option>Select</option>
//                     <option>Category 1</option>
//                     <option>Category 2</option>
//                   </select>
//                 </div>
//                 <div className="form-group">
//                   <label>Charge Name *</label>
//                   <select name="chargeName" value={issueFormData.chargeName} onChange={handleIssueInputChange} required>
//                     <option>Select</option>
//                     <option>Charge 1</option>
//                     <option>Charge 2</option>
//                   </select>
//                 </div>
//               </div>
//               <div className="form-group">
//                 <label>Standard Charge (₹)</label>
//                 <input type="number" name="standardCharge" value={issueFormData.standardCharge} placeholder="Enter standard charge" onChange={handleIssueInputChange} />
//               </div>
//               <div className="form-group">
//                 <label>Note</label>
//                 <textarea name="note" value={issueFormData.note} placeholder="Enter any notes" onChange={handleIssueInputChange}></textarea>
//               </div>
//               <div className="form-summary">
//                 <div className="summary-group">
//                   <label>Total (₹):</label>
//                   <p>{calculatedCharge.toFixed(2)}</p>
//                 </div>
//                 <div className="summary-group">
//                   <label>Discount (₹):</label>
//                   <input type="number" placeholder="0" />
//                   <span>%</span>
//                 </div>
//                 <div className="summary-group">
//                   <label>Tax (₹):</label>
//                   <p>{tax.toFixed(2)}</p>
//                   <span>%</span>
//                 </div>
//                 <div className="summary-group">
//                   <label>Net Amount (₹):</label>
//                   <p>{netAmount.toFixed(2)}</p>
//                 </div>
//                 <div className="summary-group">
//                   <label>Payment Mode</label>
//                   <select name="paymentMode" value={issueFormData.paymentMode} onChange={handleIssueInputChange}>
//                     <option>Cash</option>
//                     <option>Card</option>
//                     <option>Online</option>
//                   </select>
//                 </div>
//                 <div className="summary-group">
//                   <label>Payment Amount (₹) *</label>
//                   <input type="number" name="paymentAmount" value={issueFormData.paymentAmount} placeholder="Enter payment amount" onChange={handleIssueInputChange} required />
//                 </div>
//               </div>
//               <div className="form-footer">
//                 <button type="submit" className="save-button">Save & Print</button>
//                 <button type="submit" className="save-button">Save</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       <div className="main-container">
//         <div className="sidebar">
//           {bloodTypes.map((type) => (
//             <button
//               key={type}
//               className={`blood-type-button ${selectedBloodType === type ? 'active' : ''}`}
//               onClick={() => setSelectedBloodType(type)}
//             >
//               {type}
//             </button>
//           ))}
//         </div>

//         {/* {selectedBloodType && (
//         <div className="content">
//           <div className="table-section">
//             <div className="table-header">
//               <h3>Blood - {selectedBloodType}</h3>
//               <span>{bloodData.filter(item => item.type === selectedBloodType).length} Bags</span>
//               <button className="add-button" onClick={handleAddClick}>
//                 <FaPlus /> Add Entry
//               </button>
//             </div>
//             <table className="data-table">
//               <thead>
//                 <tr>
//                   <th>Bags</th>
//                   <th>Lot</th>
//                   <th>Institution</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {bloodData
//                   .filter(item => item.type === selectedBloodType)
//                   .map((row, index) => (
//                     <tr key={index}>
//                       <td>{row.bag}</td>
//                       <td>{row.lot}</td>
//                       <td>{row.institution}</td>
//                       <td>
//                         <button className="issue-button" onClick={() => console.log('Issue action for', row)}>
//                           Issue
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//               </tbody>
//             </table>
//           </div>
//       */}
            
// //       {/* Table displaying all blood data */}
// //       <div className="table-section">
// //         <div className="table-header">
// //           <h3>All Blood Products</h3>
// //           <span>{bloodData.length} Total Entries</span>
// //         </div>
        
// //         <table className="data-table">
// //           <thead>
// //             <tr>
// //               <th>ID</th>
// //               <th>Name</th>
// //               <th>Is Blood Group</th>
// //               <th>Created At</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {bloodData.map((row, index) => (
//               <tr key={index}>
//                 <td>{row.id}</td>
//                 <td>{row.name || 'N/A'}</td>
//                 <td>{row.is_blood_group ? 'Yes' : 'No'}</td>
//                 <td>{row.created_at ? new Date(row.created_at).toLocaleString() : 'N/A'}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
     
    

//             <div className="table-section">
//               <div className="table-header">
//                 <h3>Components - {selectedBloodType}</h3>
//                 <span>{componentData[selectedBloodType]?.length || 0} Bags</span>
//                 <button className="add-button" onClick={handleAddClick}>
//                   <FaPlus /> Add Entry
//                 </button>
//               </div>
//               <table className="data-table">
//                 <thead>
//                   <tr>
//                     <th>Bags</th>
//                     <th>Lot</th>
//                     <th>Components</th>
//                     <th>Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {(componentData[selectedBloodType] || []).map((row, index) => (
//                     <tr key={index}>
//                       <td>{row.bags}</td>
//                       <td>{row.lot}</td>
//                       <td>{row.components}</td>
//                       <td>
                      
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BloodBankStatus;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './bloodbank.css';

// const BloodBankStatus = () => {
//   const [bloodData, setBloodData] = useState([]);

//   useEffect(() => {
//     const fetchBloodData = async () => {
//       try {
//         const response = await axios.get('http://localhost:3000/api/blood-bank-products');
//         console.log("Fetched Blood Data:", response.data);
//         setBloodData(response.data);
//       } catch (error) {
//         console.error('Error fetching blood products:', error);
//       }
//     };

//     fetchBloodData();
//   }, []);

//   return (
//     <div className="blood-bank-status">
//       <h2>All Blood Bank Products</h2>
      
//       {/* Table displaying all blood data */}
//       <div className="table-section">
//         <div className="table-header">
//           <h3>All Blood Products</h3>
//           <span>{bloodData.length} Total Entries</span>
//         </div>
        
//         <table className="data-table">
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Name</th>
//               <th>Is Blood Group</th>
//               <th>Created At</th>
//             </tr>
//           </thead>
//           <tbody>
//             {bloodData.map((row, index) => (
//               <tr key={index}>
//                 <td>{row.id}</td>
//                 <td>{row.name || 'N/A'}</td>
//                 <td>{row.is_blood_group ? 'Yes' : 'No'}</td>
//                 <td>{row.created_at ? new Date(row.created_at).toLocaleString() : 'N/A'}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default BloodBankStatus;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPlus } from 'react-icons/fa';
import './bloodbank.css';
import { useNavigate } from 'react-router-dom';

const BloodBankStatus = () => {
  const bloodTypes = ['O+', 'O-', 'B+', 'B-', 'A+', 'AB+', 'plate', 'test blood bank'];
  const [bloodData, setBloodData] = useState([]);
  const [componentData, setComponentData] = useState({});
  const [showNotification, setShowNotification] = useState(false);
  const [showNewPatientNotification, setShowNewPatientNotification] = useState(false);
  const [showIssueNotification, setShowIssueNotification] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    donor: '',
    donateDate: '',
    bag: '',
    volume: '',
    lot: '',
    chargeCategory: '',
    chargeName: '',
    standardCharge: '',
    institution: '',
    note: '',
  });
  const [componentFormData, setComponentFormData] = useState({
    bloodType: '',
    bags: '',
    lot: '',
    components: ''
  });
  const [issueFormData, setIssueFormData] = useState({
    issueDate: '',
    doctor: '',
    reference: '',
    technician: '',
    bloodGroup: '',
    bag: '',
    chargeCategory: '',
    chargeName: '',
    standardCharge: '',
    note: '',
    paymentMode: '',
    paymentAmount: ''
  });
  const [patientData, setPatientData] = useState({
    name: '',
    guardianName: '',
    gender: '',
    dob: '',
    ageYear: '',
    ageMonth: '',
    ageDay: '',
    bloodGroup: '',
    maritalStatus: '',
    phone: '',
    email: '',
   
  });
  const [calculatedCharge, setCalculatedCharge] = useState(0);
  const [tax, setTax] = useState(0);
  const [netAmount, setNetAmount] = useState(0);
  const [selectedBloodType, setSelectedBloodType] = useState(null);


  useEffect(() => {
    const fetchBloodData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/blood-bank-products');
        console.log("Fetched Blood Data:", response.data);
        setBloodData(response.data);
      } catch (error) {
        console.error('Error fetching blood products:', error);
      }
    };
    fetchBloodData();
  }, []);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSaves = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/blood-issue', issueFormData);
      console.log('Saved issue data:', response.data);
      // Optionally update UI to show confirmation of successful save
      setShowIssueNotification(false); // Hide notification box after saving
      resetFormData();
    } catch (error) {
      console.error('Error saving issue data:', error);
    }
  };
  
  const handleSaveAndPrint = async () => {
    try {
      await handleSaves(); // Save data to backend
      window.print(); // Trigger print dialog after saving
    } catch (error) {
      console.error('Error saving and printing issue data:', error);
    }
  };


  const handleCalculate = () => {
    const baseCharge = parseFloat(formData.standardCharge) || 0;
    const calculatedTax = baseCharge * 0.15;
    setTax(calculatedTax);
    setNetAmount(baseCharge + calculatedTax);
    setCalculatedCharge(baseCharge);
  };

  const handleSave = async (e) => {
        e.preventDefault();
        try {
          const newProductData = {
            name: formData.donor,
            donateDate: formData.donateDate,
            bag: formData.bag,
            volume: formData.volume,
            lot: formData.lot,
            chargeCategory: formData.chargeCategory,
            chargeName: formData.chargeName,
            standardCharge: formData.standardCharge,
            institution: formData.institution,
            note: formData.note,
          };
    
          const response = await axios.post('http://localhost:3000/api/blood-bank-products', newProductData);
          setBloodData([...bloodData, response.data]);
          setFormData({
            donor: '',
            donateDate: '',
            bag: '',
            volume: '',
            lot: '',
            chargeCategory: '',
            chargeName: '',
            standardCharge: '',
            institution: '',
            note: '',
          });
          setShowNotification(false);
        } catch (error) {
          console.error('Error saving blood product data:', error);
        }
      };
    
      // const handleIssueSave = async (e) => {
      //   e.preventDefault();
      //   try {
      //     const response = await axios.post('http://localhost:3000/api/blood-issue', issueFormData);
      //     console.log('Saved issue data:', response.data);
      //     setShowIssueNotification(false);
      //     setIssueFormData({
      //       issueDate: '',
      //       doctor: '',
      //       reference: '',
      //       technician: '',
      //       bloodGroup: '',
      //       bag: '',
      //       chargeCategory: '',
      //       chargeName: '',
      //       standardCharge: '',
      //       note: '',
      //       paymentMode: '',
      //       paymentAmount: ''
      //     });
      //   } catch (error) {
      //     console.error('Error saving issue data:', error);
      //   }
      // };
        
      const handleIssueClick = (row) => {
        setIssueFormData({
          ...issueFormData,
          bag: row.bag || row.name || '', // Set the bag/name from row data
          bloodGroup: row.bloodGroup || '',
          standardCharge: row.standardCharge || '',
        });
        setShowIssueNotification(true); // Show the issue notification box
      };
    
      const handleIssueInputChange = (e) => {
        const { name, value } = e.target;
        setIssueFormData({ ...issueFormData, [name]: value });
      };
    
      const handleIssueSave = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post('http://localhost:3000/api/blood-issue', issueFormData);
          console.log('Saved issue data:', response.data);
          setShowIssueNotification(false);
          setIssueFormData({
            issueDate: '',
            doctor: '',
            reference: '',
            technician: '',
            bloodGroup: '',
            bag: '',
            chargeCategory: '',
            chargeName: '',
            standardCharge: '',
            note: '',
            paymentMode: '',
            paymentAmount: ''
          });
        } catch (error) {
          console.error('Error saving issue data:', error);
        }
      };
      const handleComponentInputChange = (e) => {
        const { name, value } = e.target;
        setComponentFormData({ ...componentFormData, [name]: value });
      };
    
      const handleSaveComponent = async (e) => {
        e.preventDefault();
        try {
          const newComponentData = {
            bloodType: selectedBloodType,
            bags: componentFormData.bags,
            lot: componentFormData.lot,
            components: componentFormData.components,
          };
    
          const response = await axios.post('http://localhost:3000/api/component-products', newComponentData);
          setComponentData((prevData) => ({
            ...prevData,
            [selectedBloodType]: [...(prevData[selectedBloodType] || []), response.data],
          }));
          setComponentFormData({ bloodType: '', bags: '', lot: '', components: '' });
          setShowComponentNotification(false);
        } catch (error) {
          console.error('Error saving component data:', error);
        }
      };



  // Function to close the notification form

  const handleNewPatientClick = () => {
    setShowNewPatientNotification(true);
  };

  // Function to close the Add Patient notification box
  const handleCloseNewPatientNotification = () => {
    setShowNewPatientNotification(false);
  };
  

  
  const handleSavePatient = async (e) => {
    e.preventDefault();
  
    const simplifiedData = {
      patient_name: patientData.name,
      guardianName: patientData.guardianName,
      gender: patientData.gender,
      dob: patientData.dob,
      age: patientData.ageYear,
      month: patientData.ageMonth || 0,
      day: patientData.ageDay || 0,
      blood_group: patientData.bloodGroup,
      mobileno: patientData.phone,
      email: patientData.email,
     
     
    };
  console.log(simplifiedData);
    try {
      const response = await axios.post('http://localhost:3000/api/patients', simplifiedData, {
        headers: { 'Content-Type': 'application/json' },
      });
      console.log('Patient saved successfully:', response.data);
      alert('Patient saved successfully');
  
      setPatientData({
        name: '',
        guardianName: '',
        gender: '',
        dob: '',
        ageYear: '',
        ageMonth: '',
        ageDay: '',
        bloodGroup: '',
        phone: '',
        email: ''
     
       
       
      });
      setShowNewPatientNotification(false);
    } catch (error) {
      console.error('Error saving patient:', error.response?.data || error.message);
      alert('Error saving patient. Please try again.');
    }
  };
  
  

  const handlesInputChange = (e) => {
    const { name, value } = e.target;
    setPatientData({
      ...patientData,
      [name]: value,
    });
  };
  const handleAddClick = () => setShowNotification(true);
  const handleCloseNotification = () => setShowNotification(false);
  const handleCloseIssueNotification = () => setShowIssueNotification(false);


  return (
    <div className="blood-bank-status">
      <h2>Blood Bank Status</h2>
      <div className="input-fields-container">
        <button className="category-button" onClick={()=>navigate('/blood-bankdestails')}>Donor Details</button>
        <button className="category-button" onClick={() =>navigate('/blood-bankissuedeatils')}>Blood Issue Details</button>
        <button className="category-button" onClick={() => navigate('/Component-issuedeatils')}>Component Issue</button>
      </div>

      {showNotification && (
        <div className="notification-box">
          <button className="close-notification" onClick={handleCloseNotification}>X</button>
          <div className="form-container">
            <form onSubmit={handleSave}>
              <div className="form-group">
                <label>Blood Donor *</label>
                <select name="donor" value={formData.donor} onChange={handleInputChange} required>
                  <option value="">Select</option>
                  <option value="Donor 1">Donor 1</option>
                  <option value="Donor 2">Donor 2</option>
                </select>
              </div>
              <div className="form-group">
                <label>Donate Date *</label>
                <input type="datetime-local" name="donateDate" value={formData.donateDate} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Bag *</label>
                <input type="text" name="bag" value={formData.bag} placeholder="Enter bag number" onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Volume</label>
                <input type="text" name="volume" value={formData.volume} placeholder="Enter volume" onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label>Lot</label>
                <input type="text" name="lot" value={formData.lot} placeholder="Enter lot number" onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label>Charge Category *</label>
                <select name="chargeCategory" value={formData.chargeCategory} onChange={handleInputChange} required>
                  <option value="">Select</option>
                  <option value="Blood sugar test">Blood sugar test</option>
                  <option value="Category 2">Category 2</option>
                </select>
              </div>
              <div className="form-group">
                <label>Charge Name *</label>
                <select name="chargeName" value={formData.chargeName} onChange={handleInputChange} required>
                  <option value="">Select</option>
                  <option value="Blood Sugar test">Blood Sugar test</option>
                  <option value="Charge 2">Charge 2</option>
                </select>
              </div>
              <div className="form-group">
                <label>Standard Charge (₹) *</label>
                <input type="number" name="standardCharge" value={formData.standardCharge} placeholder="Enter standard charge" onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Institution</label>
                <input type="text" name="institution" value={formData.institution} placeholder="Enter institution name" onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label>Note</label>
                <textarea name="note" value={formData.note} placeholder="Enter additional notes" onChange={handleInputChange}></textarea>
              </div>
              <div className="form-footer">
                <button type="button" className="calculate-button" onClick={handleCalculate}>Calculate</button>
                <button type="submit" className="save-button">Save</button>
              </div>
              <div className="charge-summary">
                <p>Total (₹): {calculatedCharge.toFixed(2)}</p>
                <p>Tax (₹): {tax.toFixed(2)}</p>
                <p>Net Amount (₹): {netAmount.toFixed(2)}</p>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Issue Notification Form */}
      {showIssueNotification && (
        <div className="notification-box">
          <button className="close-notification" onClick={handleCloseIssueNotification}>X</button>
          <div className="form-container">
            <div className="form-header">
              <button type="button" className="new-patient-button" onClick={handleNewPatientClick}>
                + New Patient
              </button>
              <input type="text" name="caseId" placeholder="Case ID" className="case-id-input" onChange={() => {}} />
            </div>
            <form onSubmit={handleIssueSave}>
              <div className="form-row">
                <div className="form-group">
                  <label>Issue Date *</label>
                  <input type="datetime-local" name="issueDate" value={issueFormData.issueDate} onChange={handleIssueInputChange} required />
                </div>
                <div className="form-group">
                  <label>Hospital Doctor</label>
                  <select name="doctor" value={issueFormData.doctor} onChange={handleIssueInputChange}>
                    <option>Select</option>
                    <option>Doctor 1</option>
                    <option>Doctor 2</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Reference Name *</label>
                  <input type="text" name="reference" value={issueFormData.reference} placeholder="Enter reference" onChange={handleIssueInputChange} required />
                </div>
                <div className="form-group">
                  <label>Technician</label>
                  <input type="text" name="technician" value={issueFormData.technician} placeholder="Enter technician's name" onChange={handleIssueInputChange} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Blood Group</label>
                  <select name="bloodGroup" value={issueFormData.bloodGroup} onChange={handleIssueInputChange}>
                    <option>Select</option>
                    <option>O+</option>
                    <option>A+</option>
                    {/* Add other blood groups as needed */}
                  </select>
                </div>
                <div className="form-group">
                  <label>Bag *</label>
                  <select name="bag" value={issueFormData.bag} onChange={handleIssueInputChange} required>
                    <option>Select Bag</option>
                    <option>2010 (300 ml)</option>
                    <option>6 (300 ml)</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Charge Category *</label>
                  <select name="chargeCategory" value={issueFormData.chargeCategory} onChange={handleIssueInputChange} required>
                    <option>Select</option>
                    <option>Category 1</option>
                    <option>Category 2</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Charge Name *</label>
                  <select name="chargeName" value={issueFormData.chargeName} onChange={handleIssueInputChange} required>
                    <option>Select</option>
                    <option>Charge 1</option>
                    <option>Charge 2</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Standard Charge (₹)</label>
                <input type="number" name="standardCharge" value={issueFormData.standardCharge} placeholder="Enter standard charge" onChange={handleIssueInputChange} />
              </div>
              <div className="form-group">
                <label>Note</label>
                <textarea name="note" value={issueFormData.note} placeholder="Enter any notes" onChange={handleIssueInputChange}></textarea>
              </div>
              <div className="form-footer">
              <button type="button" className="save-button" onClick={handleSaveAndPrint}>Save & Print</button>
              <button type="button" className="save-button" onClick={handleSave}>Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* {showIssueNotification && (
        <div className="notification-box">
          <button className="close-notification" onClick={handleCloseIssueNotification}>X</button>
          <div className="form-container">
            <div className="form-header">
              <button type="button" className="new-patient-button" onClick={handleNewPatientClick}>
                + New Patient
              </button>
              <input type="text" name="caseId" placeholder="Case ID" className="case-id-input" onChange={() => {}} />
            </div>
            <form onSubmit={handleIssueSave}>
              <div className="form-row">
                <div className="form-group">
                  <label>Issue Date *</label>
                  <input type="datetime-local" name="issueDate" value={issueFormData.issueDate} onChange={handleIssueInputChange} required />
                </div>
                <div className="form-group">
                  <label>Hospital Doctor</label>
                  <select name="doctor" value={issueFormData.doctor} onChange={handleIssueInputChange}>
                    <option>Select</option>
                    <option>Doctor 1</option>
                    <option>Doctor 2</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Reference Name *</label>
                  <input type="text" name="reference" value={issueFormData.reference} placeholder="Enter reference" onChange={handleIssueInputChange} required />
                </div>
                <div className="form-group">
                  <label>Technician</label>
                  <input type="text" name="technician" value={issueFormData.technician} placeholder="Enter technician's name" onChange={handleIssueInputChange} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Blood Group</label>
                  <select name="bloodGroup" value={issueFormData.bloodGroup} onChange={handleIssueInputChange}>
                    <option>Select</option>
                    <option>O+</option>
                    <option>A+</option>
                    {/* Add other blood groups as needed */}
                  {/* </select>
                </div>
                <div className="form-group">
                  <label>Bag *</label>
                  <select name="bag" value={issueFormData.bag} onChange={handleIssueInputChange} required>
                    <option>Select Bag</option>
                    <option>2010 (300 ml)</option>
                    <option>6 (300 ml)</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Charge Category *</label>
                  <select name="chargeCategory" value={issueFormData.chargeCategory} onChange={handleIssueInputChange} required>
                    <option>Select</option>
                    <option>Category 1</option>
                    <option>Category 2</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Charge Name *</label>
                  <select name="chargeName" value={issueFormData.chargeName} onChange={handleIssueInputChange} required>
                    <option>Select</option>
                    <option>Charge 1</option>
                    <option>Charge 2</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Standard Charge (₹)</label>
                <input type="number" name="standardCharge" value={issueFormData.standardCharge} placeholder="Enter standard charge" onChange={handleIssueInputChange} />
              </div>
              <div className="form-group">
                <label>Note</label>
                <textarea name="note" value={issueFormData.note} placeholder="Enter any notes" onChange={handleIssueInputChange}></textarea>
              </div>
              <div className="form-summary">
                <div className="summary-group">
                  <label>Total (₹):</label>
                  <p>{calculatedCharge.toFixed(2)}</p>
                </div>
                <div className="summary-group">
                  <label>Discount (₹):</label>
                  <input type="number" placeholder="0" />
                  <span>%</span>
                </div>
                <div className="summary-group">
                  <label>Tax (₹):</label>
                  <p>{tax.toFixed(2)}</p>
                  <span>%</span>
                </div>
                <div className="summary-group">
                  <label>Net Amount (₹):</label>
                  <p>{netAmount.toFixed(2)}</p>
                </div>
                <div className="summary-group">
                  <label>Payment Mode</label>
                  <select name="paymentMode" value={issueFormData.paymentMode} onChange={handleIssueInputChange}>
                    <option>Cash</option>
                    <option>Card</option>
                    <option>Online</option>
                  </select>
                </div>
                <div className="summary-group">
                  <label>Payment Amount (₹) *</label>
                  <input type="number" name="paymentAmount" value={issueFormData.paymentAmount} placeholder="Enter payment amount" onChange={handleIssueInputChange} required />
                </div>
              </div>
              <div className="form-footer">
                <button type="submit" className="save-button">Save & Print</button>
                <button type="submit" className="save-button">Save</button>
              </div>
            </form>
          </div>
        </div>
      )} */} 
        {showNotification && (
        <div className="notification-box">
          <button className="close-notification" onClick={handleCloseNotification}>X</button>
          <div className="form-container">
            <form onSubmit={handleSave}>
              <div className="form-group">
                <label>component </label>
                <select name="donor" value={formData.donor} onChange={handleInputChange} required>
                  <option value="">Select</option>
                  <option value="Donor 1">Donor 1</option>
                  <option value="Donor 2">Donor 2</option>
                </select>
              </div>
              <div className="form-group">
                <label>Donate Date *</label>
                <input type="datetime-local" name="donateDate" value={formData.donateDate} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Bag *</label>
                <input type="text" name="bag" value={formData.bag} placeholder="Enter bag number" onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Volume</label>
                <input type="text" name="volume" value={formData.volume} placeholder="Enter volume" onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label>Lot</label>
                <input type="text" name="lot" value={formData.lot} placeholder="Enter lot number" onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label>Charge Category *</label>
                <select name="chargeCategory" value={formData.chargeCategory} onChange={handleInputChange} required>
                  <option value="">Select</option>
                  <option value="Blood sugar test">Blood sugar test</option>
                  <option value="Category 2">Category 2</option>
                </select>
              </div>
              <div className="form-group">
                <label>Charge Name *</label>
                <select name="chargeName" value={formData.chargeName} onChange={handleInputChange} required>
                  <option value="">Select</option>
                  <option value="Blood Sugar test">Blood Sugar test</option>
                  <option value="Charge 2">Charge 2</option>
                </select>
              </div>
              <div className="form-group">
                <label>Standard Charge (₹) *</label>
                <input type="number" name="standardCharge" value={formData.standardCharge} placeholder="Enter standard charge" onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Institution</label>
                <input type="text" name="institution" value={formData.institution} placeholder="Enter institution name" onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label>Note</label>
                <textarea name="note" value={formData.note} placeholder="Enter additional notes" onChange={handleInputChange}></textarea>
              </div>
              <div className="form-footer">
                <button type="button" className="calculate-button" onClick={handleCalculate}>Calculate</button>
                <button type="submit" className="save-button">Save</button>
              </div>
              <div className="charge-summary">
                <p>Total (₹): {calculatedCharge.toFixed(2)}</p>
                <p>Tax (₹): {tax.toFixed(2)}</p>
                <p>Net Amount (₹): {netAmount.toFixed(2)}</p>
              </div>
            </form>
          </div>
        </div>
      )}
     
     {showNewPatientNotification && (
        <div className="notification-box">
          <button className="close-notification" onClick={handleCloseNewPatientNotification}>X</button>
          <div className="form-container">
            <h3>Add Patient</h3>
            <form onSubmit={handleSavePatient}>
              <div className="form-row">
                <div className="form-group">
                  <label>Name *</label>
                  <input type="text" name="name" value={patientData.name} onChange={handlesInputChange} required />
                </div>
                <div className="form-group">
                  <label>Guardian Name</label>
                  <input type="text" name="guardianName" value={patientData.guardianName} onChange={handlesInputChange} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Gender</label>
                  <select name="gender" value={patientData.gender} onChange={handlesInputChange}>
                    <option>Select</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Date Of Birth</label>
                  <input type="date" name="dob" value={patientData.dob} onChange={handlesInputChange} />
                </div>
                <div className="form-group">
                  <label>Age (yy-mm-dd) *</label>
                  <div className="age-inputs">
                    <input type="number" placeholder="Year" name="ageYear" value={patientData.ageYear} onChange={handlesInputChange} />
                    <input type="number" placeholder="Month" name="ageMonth" value={patientData.ageMonth} onChange={handlesInputChange} />
                    <input type="number" placeholder="Day" name="ageDay" value={patientData.ageDay} onChange={handlesInputChange} />
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input type="text" name="phone" value={patientData.phone} onChange={handlesInputChange} />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" name="email" value={patientData.email} onChange={handlesInputChange} />
              </div>
              <div className="form-footer">
                <button type="submit" className="save-button">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Sidebar for selecting blood type */}
      <div className="main-container">
        <div className="sidebar">
          {bloodTypes.map((type) => (
            <button
              key={type}
              className={`blood-type-button ${selectedBloodType === type ? 'active' : ''}`}
              onClick={() => setSelectedBloodType(type)}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Display all blood data */}
        <div className="content">
          <div className="table-section">
            <div className="table-header">
            <h3>Blood - {selectedBloodType}</h3>
              <span>{bloodData.length} Total Entries</span>
              <button className="add-button" onClick={handleAddClick}>
                 <FaPlus /> Add Entry
               </button>
            </div>
            <table className="data-table">
              <thead>
                <tr>
                <th>Bags</th>
                   <th>Lot</th>
                   <th>Institution</th>
                  <th>Action</th>
                </tr>
               
              </thead>
              <tbody>
                {bloodData.map((row, index) => (
                  <tr key={index}>
                
                    <td>{row.name || 'N/A'}</td>
                    <td>{row.is_blood_group ? 'Yes' : 'No'}</td>
                    <td>{row.created_at ? new Date(row.created_at).toLocaleString() : 'N/A'}</td>
                    <td>
                       <button className="issue-button" onClick={() =>  handleIssueClick(row)}>
                    Issue
                           
                        </button>
                      </td>
                  </tr>
                  
                ))}
              </tbody>
            </table>
          </div>

          {/* Display components data if selected blood type exists */}
          {selectedBloodType && (
            <div className="table-section">
              <div className="table-header">
                <h3>Components - {selectedBloodType}</h3>
                <span>{componentData[selectedBloodType]?.length || 0} Bags</span>
                <button className="add-button" onClick={handleAddClick}>
                  <FaPlus /> Add Entry
                </button>
              </div>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Bags</th>
                    <th>Lot</th>
                    <th>Components</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                {bloodData.map((row, index) => (
                    <tr key={index}>
                  <td>{row.name || 'N/A'}</td>
                    <td>{row.is_blood_group ? 'Yes' : 'No'}</td>
                    <td>{row.created_at ? new Date(row.created_at).toLocaleString() : 'N/A'}</td>
                    <td>
                       <button className="issue-button" onClick={() =>  handleIssueClick(row)}>
                    Issue
                           
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BloodBankStatus;



