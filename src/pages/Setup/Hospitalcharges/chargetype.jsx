import React, { useState, useEffect } from 'react';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const ChargeTypeList = () => {
  const [chargeTypes, setChargeTypes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newChargeType, setNewChargeType] = useState({
    type: '',
    appointment: false,
    opd: false,
    ipd: false,
    pathology: false,
    radiology: false,
    bloodBank: false,
    ambulance: false
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [notification, setNotification] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);

  // Fetch data from backend
  useEffect(() => {
    fetchChargeTypes();
  }, []);

  const fetchChargeTypes = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/charge-types/charge-types');
      const data = await response.json();
      setChargeTypes(data);
    } catch (error) {
      console.error("Error fetching charge types:", error);
    }
  };

  const filteredChargeTypes = chargeTypes.filter((charge) =>
    charge.type && charge.type.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleAddChargeType = async () => {
    // Ensure the charge type name is provided
    if (newChargeType.type.trim() === '') {
      setNotification('Charge type name is required!');
      return;
    }
  
    // Prepare the charge type data for the POST request
    const newChargeData = {
      charge_type: newChargeType.type,
      is_default: newChargeType.is_default,  // is_default from frontend
      is_active: newChargeType.is_active     // is_active from frontend
    };
  
    try {
      // Send POST request to backend to add the charge type
      const response = await fetch('http://localhost:3000/api/charge-types/charge-types', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newChargeData),
      });
  
      const result = await response.json();
  
      // Check for successful response
      if (response.status === 201 && result.id) {
        // If successful, add the new charge type to the list
        setChargeTypes([...chargeTypes, result]);
        setNotification("New charge type added successfully!");
      } else {
        // If the backend returns an error message
        setNotification(result.message || "Error adding charge type");
      }
    } catch (error) {
      // Log and display error message in case of failure
      console.error("Error adding charge type:", error);
      setNotification(`Error adding charge type: ${error.message}`);
    }
  
    // Reset form fields
    setNewChargeType({
      type: '',
      is_default: false,
      is_active: true,
    });
  
    setTimeout(() => {
      setNotification("");
      setShowAddForm(false);
    }, 3000);
  };
  
  const handleEdit = (index) => {
    const chargeTypeToEdit = chargeTypes[index];
    setNewChargeType(chargeTypeToEdit);
    setEditIndex(index);
    setIsEditing(true);
    setShowAddForm(true);
  };

  const handleDelete = async (index) => {
    const chargeTypeToDelete = chargeTypes[index];
    const updatedChargeTypes = chargeTypes.filter((_, i) => i !== index);
    setChargeTypes(updatedChargeTypes);

    // Delete from backend
    try {
      const response = await fetch(`http://localhost:3000/api/charge-types/${chargeTypeToDelete.id}`, {
        method: 'DELETE',
      });
      const result = await response.json();
      if (response.ok) {
        setNotification("Charge type deleted successfully!");
      } else {
        setNotification(result.message || "Error deleting charge type");
      }
    } catch (error) {
      setNotification("Error deleting charge type: " + error.message);
    }

    setTimeout(() => setNotification(""), 3000);
  };

  const handleExportCSV = () => {
    const csvRows = [];
    const headers = ['Charge Type', 'Appointment', 'OPD', 'IPD', 'Pathology', 'Radiology', 'Blood Bank', 'Ambulance'];
    csvRows.push(headers.join(','));

    filteredChargeTypes.forEach((row) => {
      const values = [
        row.type,
        row.appointment ? 'Yes' : 'No',
        row.opd ? 'Yes' : 'No',
        row.ipd ? 'Yes' : 'No',
        row.pathology ? 'Yes' : 'No',
        row.radiology ? 'Yes' : 'No',
        row.bloodBank ? 'Yes' : 'No',
        row.ambulance ? 'Yes' : 'No',
      ];
      csvRows.push(values.join(','));
    });

    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'charge-types.csv');
  };

  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredChargeTypes.map((row) => ({
      'Charge Type': row.type,
      'Appointment': row.appointment ? 'Yes' : 'No',
      'OPD': row.opd ? 'Yes' : 'No',
      'IPD': row.ipd ? 'Yes' : 'No',
      'Pathology': row.pathology ? 'Yes' : 'No',
      'Radiology': row.radiology ? 'Yes' : 'No',
      'Blood Bank': row.bloodBank ? 'Yes' : 'No',
      'Ambulance': row.ambulance ? 'Yes' : 'No',
    })));

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Charge Types');
    XLSX.writeFile(workbook, 'charge-types.xlsx');
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    const tableColumn = ['Charge Type', 'Appointment', 'OPD', 'IPD', 'Pathology', 'Radiology', 'Blood Bank', 'Ambulance'];
    const tableRows = [];

    filteredChargeTypes.forEach((row) => {
      const rowData = [
        row.type,
        row.appointment ? 'Yes' : 'No',
        row.opd ? 'Yes' : 'No',
        row.ipd ? 'Yes' : 'No',
        row.pathology ? 'Yes' : 'No',
        row.radiology ? 'Yes' : 'No',
        row.bloodBank ? 'Yes' : 'No',
        row.ambulance ? 'Yes' : 'No',
      ];
      tableRows.push(rowData);
    });

    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.text('Charge Types List', 14, 15);
    doc.save('charge-types.pdf');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopy = () => {
    const copyText = filteredChargeTypes
      .map((row) => `${row.type}: ${row.appointment ? 'Yes' : 'No'}, ${row.opd ? 'Yes' : 'No'}, ${row.ipd ? 'Yes' : 'No'}, ${row.pathology ? 'Yes' : 'No'}, ${row.radiology ? 'Yes' : 'No'}, ${row.bloodBank ? 'Yes' : 'No'}, ${row.ambulance ? 'Yes' : 'No'}`)
      .join('\n');
    return copyText;
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Charge Type List</h2>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ padding: '5px', fontSize: '14px', marginRight: '10px' }}
        />
      </div>

      {notification && <p style={{ color: 'green' }}>{notification}</p>}
      {copySuccess && <p style={{ color: 'green' }}>Copied to clipboard!</p>}

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px', gap: '10px' }}>
        <CopyToClipboard text={handleCopy()} onCopy={() => setCopySuccess(true)}>
          <button>Copy to Clipboard</button>
        </CopyToClipboard>
        <button onClick={handleExportCSV}>Export CSV</button>
        <button onClick={handleExportExcel}>Export Excel</button>
        <button onClick={handleExportPDF}>Export PDF</button>
        <button onClick={handlePrint}>Print</button>
        <button onClick={() => setShowAddForm(true)}>Add Charge Type</button>
      </div>

      {showAddForm && (
        <div style={{ marginBottom: '20px' }}>
          <h3>{isEditing ? 'Edit Charge Type' : 'Add Charge Type'}</h3>
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder="Charge Type"
              value={newChargeType.type}
              onChange={(e) => setNewChargeType({ ...newChargeType, type: e.target.value })}
              required
              style={{ padding: '5px', fontSize: '14px', marginRight: '10px' }}
            />
            <label>
              <input
                type="checkbox"
                checked={newChargeType.appointment}
                onChange={() => setNewChargeType({ ...newChargeType, appointment: !newChargeType.appointment })}
              />
              Appointment
            </label>
            {/* Add other fields here like OPD, IPD, etc. */}
            <button type="button" onClick={handleAddChargeType}>Save</button>
          </form>
        </div>
      )}

      <table border="1" width="100%" style={{ marginBottom: '20px' }}>
        <thead>
          <tr>
            <th>Charge Type</th>
            <th>Appointment</th>
            <th>OPD</th>
            <th>IPD</th>
            <th>Pathology</th>
            <th>Radiology</th>
            <th>Blood Bank</th>
            <th>Ambulance</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredChargeTypes.map((charge, index) => (
            <tr key={index}>
              <td>{charge.type}</td>
              <td>{charge.appointment ? 'Yes' : 'No'}</td>
              <td>{charge.opd ? 'Yes' : 'No'}</td>
              <td>{charge.ipd ? 'Yes' : 'No'}</td>
              <td>{charge.pathology ? 'Yes' : 'No'}</td>
              <td>{charge.radiology ? 'Yes' : 'No'}</td>
              <td>{charge.bloodBank ? 'Yes' : 'No'}</td>
              <td>{charge.ambulance ? 'Yes' : 'No'}</td>
              <td>
                <button onClick={() => handleEdit(index)}>Edit</button>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ChargeTypeList;



