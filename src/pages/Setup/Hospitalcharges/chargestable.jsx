// import React, { useState } from 'react';
// import './chargestable.css'; // Import the CSS file for styling
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCopy, faFileExcel, faFilePdf, faFileCsv, faPrint, faPlus } from '@fortawesome/free-solid-svg-icons';
// // import ChargeCategoryList from './chargecategory';

// import { useNavigate } from 'react-router-dom';


// const ChargesTable = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(10); // Default to 10 items per page
//   const [expandedRows, setExpandedRows] = useState(new Set());
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false); // For dropdown open/close
//   const [selectedOption, setSelectedOption] = useState(100); // Dropdown selection
//   const navigate = useNavigate();
//   // Toggle dropdown
//   const toggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };

//   // Handle dropdown option click
//   const handleOptionClick = (option) => {
//     setSelectedOption(option);
//     setItemsPerPage(option === 'All' ? chargesData.length : option); // Show all items or limit to selected option
//     setIsDropdownOpen(false);
//     setCurrentPage(1); // Reset to the first page
//   };

//   // Toggle the expanded state for all rows
//   const toggleAllRows = () => {
//     if (expandedRows.size === currentItems.length) {
//       setExpandedRows(new Set()); // Collapse all
//     } else {
//       setExpandedRows(new Set(currentItems.map((_, index) => index))); // Expand all
//     }
//   };

//   // Toggle the expanded state for individual row
//   const toggleRow = (index) => {
//     const newExpandedRows = new Set(expandedRows);
//     if (newExpandedRows.has(index)) {
//       newExpandedRows.delete(index);
//     } else {
//       newExpandedRows.add(index);
//     }
//     setExpandedRows(newExpandedRows);
//   };

//   // Handle search input change
//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   const chargesData = [
//     { name: "Admission", category: "Admission and Discharge", type: "IPD", unit: "Day", tax: 12.00, charge: 150.00, editIcon: "✏️", showIcon: "👁️" },
//     { name: "Appointment Charges", category: "Appointment Charges", type: "Appointment", unit: "Day", tax: 15.00, charge: 150.00, editIcon: "✏️", showIcon: "👁️" },
//     { name: "Blood Sugar test", category: "Blood sugar test", type: "Blood Bank", unit: "mg/dL", tax: 15.00, charge: 110.00, editIcon: "✏️", showIcon: "👁️" },
//     { name: "Eye Check", category: "Eye check", type: "Procedures", unit: "Day", tax: 18.00, charge: 400.00, editIcon: "✏️", showIcon: "👁️" },
//     { name: "ICU", category: "Intensive Care Units", type: "IPD", unit: "Day", tax: 12.00, charge: 4000.00, editIcon: "✏️", showIcon: "👁️" },
//     { name: "Insurance charges", category: "OPD Insurance", type: "OPD", unit: "g/dL", tax: 11.00, charge: 100.00, editIcon: "✏️", showIcon: "👁️" },
//     { name: "Laundry", category: "Laundry", type: "IPD", unit: "Day", tax: 12.00, charge: 100.00, editIcon: "✏️", showIcon: "👁️" },
//     { name: "Maternity Patient Admission", category: "Maternity patient admissions", type: "IPD", unit: "Day", tax: 12.00, charge: 1000.00, editIcon: "✏️", showIcon: "👁️" },
//     { name: "OPD Consultation fees", category: "OPD Consultation Fees", type: "OPD", unit: "Per Visit", tax: 11.00, charge: 500.00, editIcon: "✏️", showIcon: "👁️" },
//     { name: "OPD service", category: "OPD Service", type: "OPD", unit: "Day", tax: 11.00, charge: 200.00, editIcon: "✏️", showIcon: "👁️" },
//     { name: "Operations Services", category: "Operation Services", type: "Operations", unit: "g/dL", tax: 9.00, charge: 150.00, editIcon: "✏️", showIcon: "👁️" },
//     { name: "Other Charges", category: "Other Charges", type: "Others", unit: "g/dL", tax: 15.00, charge: 130.00, editIcon: "✏️", showIcon: "👁️" },
//     { name: "Oxygen Cylinder", category: "Oxygen cylinder", type: "Supplier", unit: "Day", tax: 14.00, charge: 1500.00, editIcon: "✏️", showIcon: "👁️" },
//     { name: "Pathology", category: "Surgical pathology", type: "Pathology", unit: "g/dL", tax: 13.00, charge: 400.00, editIcon: "✏️", showIcon: "👁️" },
//     { name: "Pathology Charges", category: "Histopathology", type: "Pathology", unit: "g/dL", tax: 13.00, charge: 200.00, editIcon: "✏️", showIcon: "👁️" },
//     { name: "Private Ambulance", category: "Private Ambulance", type: "Ambulance", unit: "Day", tax: 11.00, charge: 1000.00, editIcon: "✏️", showIcon: "👁️" },
//     { name: "Radiology Charges", category: "CAD-AI Research Laboratory", type: "Radiology", unit: "g/dL", tax: 16.00, charge: 200.00, editIcon: "✏️", showIcon: "👁️" },
//     { name: "Service Charge", category: "Operation Services", type: "Operations", unit: "g/dL", tax: 9.00, charge: 170.00, editIcon: "✏️", showIcon: "👁️" },
//     { name: "Stay Charge", category: "Admission and Discharge", type: "IPD", unit: "Hour", tax: 12.00, charge: 500.00, editIcon: "✏️", showIcon: "👁️" },
//     { name: "X-Ray", category: "X-Ray", type: "Investigations", unit: "g/dL", tax: 15.00, charge: 300.00, editIcon: "✏️", showIcon: "👁️" },
//     { name: "Blood Sugar test", category: "Blood sugar test", type: "Blood Bank", unit: "mg/dL", tax: 15.00, charge: 110.00, editIcon: "✏️", showIcon: "👁️" },
//     { name: "OPD service", category: "OPD Service", type: "OPD", unit: "Day", tax: 11.00, charge: 200.00, editIcon: "✏️", showIcon: "👁️" },
//     { name: "OPD Consultation fees", category: "OPD Consultation Fees", type: "OPD", unit: "Per Visit", tax: 11.00, charge: 500.00, editIcon: "✏️", showIcon: "👁️" },
//     { name: "Admission", category: "Admission and Discharge", type: "IPD", unit: "Day", tax: 12.00, charge: 150.00, editIcon: "✏️", showIcon: "👁️" },
//     { name: "Laundry", category: "Laundry", type: "IPD", unit: "Day", tax: 12.00, charge: 100.00, editIcon: "✏️", showIcon: "👁️" },
//     { name: "Insurance charges", category: "OPD Insurance", type: "OPD", unit: "g/dL", tax: 11.00, charge: 100.00, editIcon: "✏️", showIcon: "👁️" },
//     { name: "Appointment Charges", category: "Appointment Charges", type: "Appointment", unit: "Day", tax: 15.00, charge: 150.00, editIcon: "✏️", showIcon: "👁️" },
//     { name: "Service Charge", category: "Operation Services", type: "Operations", unit: "g/dL", tax: 9.00, charge: 170.00, editIcon: "✏️", showIcon: "👁️" },
//     { name: "Oxygen Cylinder", category: "Oxygen cylinder", type: "Supplier", unit: "Day", tax: 14.00, charge: 1500.00, editIcon: "✏️", showIcon: "👁️" },
//     { name: "Maternity Patient Admission", category: "Maternity patient admissions", type: "IPD", unit: "Day", tax: 12.00, charge: 1000.00, editIcon: "✏️", showIcon: "👁️" },
//     { name: "Other Charges", category: "Other Charges", type: "Others", unit: "g/dL", tax: 15.00, charge: 130.00, editIcon: "✏️", showIcon: "👁️" },
//     { name: "Operations Services", category: "Operation Services", type: "Operations", unit: "g/dL", tax: 9.00, charge: 150.00, editIcon: "✏️", showIcon: "👁️" },
//     { name: "Pathology Charges", category: "Histopathology", type: "Pathology", unit: "g/dL", tax: 13.00, charge: 200.00, editIcon: "✏️", showIcon: "👁️" },
//     { name: "Radiology Charges", category: "CAD-AI Research Laboratory", type: "Radiology", unit: "g/dL", tax: 16.00, charge: 200.00, editIcon: "✏️", showIcon: "👁️" },
//     { name: "Private Ambulance", category: "Private Ambulance", type: "Ambulance", unit: "Day", tax: 11.00, charge: 1000.00, editIcon: "✏️", showIcon: "👁️" },
//     { name: "Eye Check", category: "Eye check", type: "Procedures", unit: "Day", tax: 18.00, charge: 400.00, editIcon: "✏️", showIcon: "👁️" },
//     { name: "X-Ray", category: "X-Ray", type: "Investigations", unit: "g/dL", tax: 15.00, charge: 300.00, editIcon: "✏️", showIcon: "👁️" },
//     { name: "Pathology", category: "Surgical pathology", type: "Pathology", unit: "g/dL", tax: 13.00, charge: 400.00, editIcon: "✏️", showIcon: "👁️" },
//     { name: "ICU", category: "Intensive Care Units", type: "IPD", unit: "Day", tax: 12.00, charge: 4000.00, editIcon: "✏️", showIcon: "👁️" },
//     { name: "Stay Charge", category: "Admission and Discharge", type: "IPD", unit: "Hour", tax: 12.00, charge: 500.00, editIcon: "✏️", showIcon: "👁️" }
// ];

//   // Filtered data based on search term
//   const filteredData = chargesData.filter((charge) =>
//     charge.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     charge.category.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // Pagination logic
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   return (
//     <div className="charges-page-container">
//       {/* Small Container Wrapper */}
//       <div className="smallcontainer">
//         <div className="input-fields-container">
//           <div className="input-field">
//             <button className="category-button" onClick={() => navigate('setup/hospital-charges')}>Charges</button><br />
//           </div>
//           <div className="input-field">
//             <button className="category-button" onClick={'setup/hospital-charges'}>Charge Category</button><br />
//           </div>
//           <div className="input-field">
//             <button className="category-button" onClick={'setup/hospital-charges'}>Charge Type</button><br />
//           </div>
//           <div className="input-field">
//             <button className="category-button" onClick={'setup/hospital-charges'}>Tax Category</button><br />
//           </div>
//           <div className="input-field">
//             <button className="category-button" onClick={'setup/hospital-charges'}>Unit</button><br />
//           </div>
//         </div>
//       </div>

//       {/* Charges Container */}
//       <div className="charges-container">
//         <h2>Charges Details List</h2>
//         {/* Search Input */}
//         <div className="charges-table-container">
//           <div className='add' style={{ marginTop: '20px' }}>
//             <button className="add-charges-button">
//               <FontAwesomeIcon icon={faPlus} /> Add Charges
//             </button>
//           </div>
//           <div className="table-toolbar">
//             <div className="search-bar">
//               <input
//                 type="text"
//                 placeholder="Search charges..."
//                 value={searchTerm}
//                 onChange={handleSearchChange}
//               />
//             </div>
//             <div className="export-icons">
//               <FontAwesomeIcon icon={faCopy} />
//               <FontAwesomeIcon icon={faFileExcel} />
//               <FontAwesomeIcon icon={faFilePdf} />
//               <FontAwesomeIcon icon={faFileCsv} />
//               <FontAwesomeIcon icon={faPrint} />
//             </div>
//           </div>

//           <table className="charges-table">
//             <thead>
//               <tr>
//                 <th>
//                   Name
//                   <button className="expand-all-button" onClick={toggleAllRows}>
//                     {expandedRows.size === currentItems.length ? '▲' : '▼'}
//                   </button>
//                 </th>
//                 <th>Charge Category<button className="expand-all-button" onClick={toggleAllRows}>
//                     {expandedRows.size === currentItems.length ? '▲' : '▼'}
//                   </button></th>
//                 <th>Charge Type<button className="expand-all-button" onClick={toggleAllRows}>
//                     {expandedRows.size === currentItems.length ? '▲' : '▼'}
//                   </button></th>
//                 <th>Unit<button className="expand-all-button" onClick={toggleAllRows}>
//                     {expandedRows.size === currentItems.length ? '▲' : '▼'}
//                   </button></th>
//                 <th>Tax (%)<button className="expand-all-button" onClick={toggleAllRows}>
//                     {expandedRows.size === currentItems.length ? '▲' : '▼'}
//                   </button></th>
//                 <th>Standard Charge (₹)<button className="expand-all-button" onClick={toggleAllRows}>
//                     {expandedRows.size === currentItems.length ? '▲' : '▼'}
//                   </button></th>
//               </tr>
//             </thead>
//             <tbody>
//               {currentItems.map((charge, index) => (
//                 <tr key={index} className={expandedRows.has(index) ? 'expanded' : ''}>
//                   <td>{charge.name}</td>
//                   <td>{charge.category}</td>
//                   <td>{charge.type}</td>
//                   <td>{charge.unit}</td>
//                   <td>{charge.tax}</td>
//                   <td>{charge.charge}</td>
//                   <td className="action-icons">
//                     <button onClick={() => console.log('Edit:', charge)}>✏️</button>
//                     <button onClick={() => console.log('Show details for:', charge)}>👁️</button>
//                     <button onClick={() => console.log('Delete:', charge)}>❌</button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           <div className="pagination">
//             {Array.from({ length: Math.ceil(filteredData.length / itemsPerPage) }, (_, i) => i + 1).map((pageNumber) => (
//               <button key={pageNumber} onClick={() => paginate(pageNumber)} className={pageNumber === currentPage ? 'active' : ''}>
//                 {pageNumber}
//               </button>
//             ))}
//           </div>

//           <div className="items-per-page">
//             <button onClick={toggleDropdown}>Items per page: {selectedOption}</button>
//             {isDropdownOpen && (
//               <ul className="dropdown">
//                 {[10, 20, 50, 100, 'All'].map((option) => (
//                   <li key={option} onClick={() => handleOptionClick(option)}>
//                     {option}
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
  
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom"; // For page navigation
import "./chargestable.css";

const ChargesTable = () => {
  const [charges, setCharges] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newCharge, setNewCharge] = useState({
    name: "",
    category: "",
    type: "",
    unit: "",
    tax: "",
    charge: 0,
    tpaId: "",
    tpaNotes: "",
  });
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [tpas, setTpas] = useState([]);
  const [chargeCategories, setChargeCategories] = useState([]);
  const [taxCategories, setTaxCategories] = useState([]);
  const [units, setUnits] = useState([]);
  const [chargeTypes, setChargeTypes] = useState([]);
  const [editMode, setEditMode] = useState(false); // For edit mode
  const [chargeToEdit, setChargeToEdit] = useState(null); // Store charge being edited
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3000/api/charges")
      .then((response) => setCharges(response.data))
      .catch((error) => console.error("Error fetching charges:", error));

    fetchChargeCategories();
    fetchTpaData();
    fetchTaxCategories();
    fetchUnits();
    fetchChargeTypes(); // Fetch charge types when component is mounted
  }, []);

  // Fetching data functions
  const fetchChargeCategories = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/charge-categories");
      setChargeCategories(response.data);
    } catch (error) {
      console.error("Error fetching charge categories:", error);
    }
  };

  const fetchTpaData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/tpa");
      setTpas(response.data);
    } catch (error) {
      console.error("Error fetching TPA data:", error);
    }
  };

  const fetchTaxCategories = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/tax-categories");
      setTaxCategories(response.data);
    } catch (error) {
      console.error("Error fetching tax categories:", error);
    }
  };

  const fetchUnits = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/charge-units");
      setUnits(response.data);
    } catch (error) {
      console.error("Error fetching units:", error);
    }
  };

  const fetchChargeTypes = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/charge-types");
      setChargeTypes(response.data);
    } catch (error) {
      console.error("Error fetching charge types:", error);
    }
  };

  const handleAddCharge = () => {
    // Validate fields before sending the request
    if (isValidCharge(newCharge)) {
      console.log("Sending new charge:", newCharge); // Log the data before sending
  
      const {
        charge_category_id,
        tax_category_id,
        charge_unit_id,
        name,
        standard_charge,
        date,
        description,
        status
      } = newCharge;
  
      if (editMode) {
        // Update charge
        axios
          .put(`http://localhost:3000/api/charges/${chargeToEdit._id}`, {
            charge_category_id,
            tax_category_id,
            charge_unit_id,
            name,
            standard_charge,
            date,
            description,
            status
          })
          .then((response) => {
            const updatedCharges = charges.map((charge) =>
              charge._id === chargeToEdit._id ? response.data : charge
            );
            setCharges(updatedCharges);
            resetNotification();
            alert("Charge updated successfully!");
          })
          .catch((error) => {
            console.error("Error updating charge:", error.response ? error.response.data : error.message);
            alert("Error updating charge: " + (error.response ? error.response.data.message : error.message));
          });
      } else {
        // Add new charge
        console.log("newCharge>>>>>>>>>>>>>>>>", newCharge);
        axios
          .post("http://localhost:3000/api/charges/charges", {
            charge_category_id,
            tax_category_id,
            charge_unit_id,
            name,
            standard_charge,
            date,
            description,
            status
          }) // Correct endpoint and sending proper request data
          .then((response) => {
            setCharges([...charges, response.data]);
            resetNotification();
            alert("Charge added successfully!");
          })
          .catch((error) => {
            console.error("Error adding charge:", error.response ? error.response.data : error.message);
            alert("Error adding charge: " + (error.response ? error.response.data.message : error.message));
          });
      }
    } else {
      alert("Please ensure all required fields are correctly filled.");
    }
  };
  
  
  
  
  
const handleError = (error) => {
  if (error.response) {
    // Log detailed error
    console.error("API Error:", error.response.status, error.response.data);
    if (error.response.status === 400) {
      alert("Missing required fields. Please ensure all fields are filled correctly.");
    } else {
      alert("An error occurred. Please try again.");
    }
  } else {
    console.error("Error:", error.message);
    alert("An unknown error occurred.");
  }
};

  
  // Check if the charge data is valid
  const isValidCharge = (charge) => {
    return (
      charge.name.trim() !== "" &&
      charge.category !== "" &&
      charge.type !== "" &&
      charge.unit !== "" &&
      charge.tax !== "" &&
      charge.charge > 0
    );
  };
  

  // Reset form state
  const resetNotification = () => {
    setNewCharge({
      name: "",
      category: "",
      type: "",
      unit: "",
      tax: "",
      charge: 0,
      tpaId: "",
      tpaNotes: "",
    });
    setNotificationVisible(false);
    setEditMode(false);
    setChargeToEdit(null);
  };

  // Handle cancel operation
  const handleCancel = () => {
    resetNotification();
  };

  // Handle edit charge
  const handleEditCharge = (charge) => {
    setNewCharge({
      name: charge.name,
      category: charge.category,
      type: charge.type,
      unit: charge.unit,
      tax: charge.tax,
      charge: charge.charge,
      tpaId: charge.tpaId,
      tpaNotes: charge.tpaNotes,
    });
    setChargeToEdit(charge);
    setEditMode(true);
    setNotificationVisible(true);
  };

 // Handle delete charge
 const handleDeleteCharge = (chargeId) => {
  axios
    .delete(`http://localhost:3000/api/charges/${chargeId}`) // Correct URL with dynamic chargeId
    .then(() => {
      setCharges(charges.filter(charge => charge.id !== chargeId));  // Remove the charge from the state
      alert("Charge deleted successfully!");
    })
    .catch((error) => {
      console.error("Error deleting charge:", error.response?.data || error.message);
      alert("Failed to delete charge. Please try again.");
    });
};

  
  return (
    <div className="charges-page-container">
      <div className="smallcontainer">
        <div className="input-fields-container">
          <button className="category-button" onClick={() => navigate("/setup/hospital-charges")}>Charges</button><br />
          <button className="category-button" onClick={() => navigate("/setup/charge-category")}>Charge Category</button><br />
          <button className="category-button" onClick={() => navigate("/setup/chargetype")}>Charge Type</button><br />
          <button className="category-button" onClick={() => navigate("/setup/taxtype")}>Tax Category</button><br />
          <button className="category-button" onClick={() => navigate("/setup/unittype")}>Unit</button><br />
        </div>
      </div>

      <h2>Charges List</h2>
      <input
        type="text"
        placeholder="Search charges..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      <div className="add-charge-container">
        <button
          className="add-charge-button"
          onClick={() => {
            resetNotification();
            setNotificationVisible(true);
          }}
        >
          <FontAwesomeIcon icon={faPlus} /> Add Charge
        </button>
      </div>

      {notificationVisible && (
        <div className="charge-form">
          <div className="form-group">
            <label>Charge Name</label>
            <input
              type="text"
              value={newCharge.name}
              onChange={(e) => setNewCharge({ ...newCharge, name: e.target.value })}
              className="form-control"
              placeholder="Enter charge name"
            />
          </div>

          <div className="form-group">
            <label>Category</label>
            <select
              value={newCharge.category}
              onChange={(e) => setNewCharge({ ...newCharge, category: e.target.value })}
              className="form-control"
            >
              <option value="">Select Category</option>
              {chargeCategories.map((category) => (
                <option key={category._id} value={category._id}>{category.name}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Charge Type</label>
            <select
              value={newCharge.type}
              onChange={(e) => setNewCharge({ ...newCharge, type: e.target.value })}
              className="form-control"
            >
              <option value="">Select Charge Type</option>
              {chargeTypes.map((chargeType) => (
                <option key={chargeType._id} value={chargeType._id}>
                  {chargeType.charge_type}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Unit</label>
            <select
              value={newCharge.unit}
              onChange={(e) => setNewCharge({ ...newCharge, unit: e.target.value })}
              className="form-control"
            >
              <option value="">Select Unit</option>
              {units.map((unit) => (
                <option key={unit._id} value={unit._id}>{unit.unit}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Tax Category</label>
            <select
              value={newCharge.tax}
              onChange={(e) => setNewCharge({ ...newCharge, tax: e.target.value })}
              className="form-control"
            >
              <option value="">Select Tax Category</option>
              {taxCategories.map((tax) => (
                <option key={tax._id} value={tax._id}>{tax.percentage}</option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label>Tax Category</label>
            <select
              value={newCharge.tax}
              onChange={(e) => setNewCharge({ ...newCharge, tax: e.target.value })}
              className="form-control"
            >
              <option value="">Select Tax Category</option>
              {taxCategories.map((tax) => (
                <option key={tax._id} value={tax._id}>{tax.percentage}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Charge Amount</label>
            <input
              type="number"
              value={newCharge.charge}
              onChange={(e) => setNewCharge({ ...newCharge, charge: parseFloat(e.target.value) })}
              className="form-control"
              placeholder="Enter charge amount"
            />
          </div>

          <div className="form-group">
            <label>TPA</label>
            <select
              value={newCharge.tpaId}
              onChange={(e) => setNewCharge({ ...newCharge, tpaId: e.target.value })}
              className="form-control"
            >
              <option value="">Select TPA</option>
              {tpas.map((tpa) => (
                <option key={tpa._id} value={tpa._id}>{tpa.organisation_name}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>TPA Notes</label>
            <textarea
              value={newCharge.tpaNotes}
              onChange={(e) => setNewCharge({ ...newCharge, tpaNotes: e.target.value })}
              className="form-control"
              placeholder="Enter notes"
            ></textarea>
          </div>

          <div className="form-actions">
            <button className="submit-button" onClick={handleAddCharge}>Save Charge</button>
            <button className="cancel-button" onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      )}

      <table className="charges-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Charge Type</th>
            <th>Unit</th>
            <th>Tax</th>
            <th>Charge Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {charges
            .filter((charge) =>
              charge.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((charge) => (
              <tr key={charge._id}>
                <td>{charge.name}</td>
                <td>{charge.category?.name}</td>
                <td>{charge.type?.charge_type}</td>
                <td>{charge.unit?.unit_name}</td>
                <td>{charge.tax?.tax_name}</td>
                <td>{charge.charge}</td>
                <td>
                  <button
                    onClick={() => handleEditCharge(charge)}
                    className="edit-button"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteCharge(charge._id)}
                    className="delete-button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ChargesTable;




