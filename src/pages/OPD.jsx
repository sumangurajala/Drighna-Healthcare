// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button,
//   Paper, Tooltip, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton,
//   Select, MenuItem
// } from "@mui/material";
// import { Add, Search, Delete, SaveAlt, PictureAsPdf, CloudUpload } from "@mui/icons-material";
// import { jsPDF } from "jspdf";
// import * as XLSX from "xlsx";
// import { useDropzone } from 'react-dropzone';

// const OPD = () => {
//   const [patientsData, setPatientsData] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filteredPatients, setFilteredPatients] = useState([]);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [newPatient, setNewPatient] = useState({
//     name: "",
//     guardianName: "",
//     gender: "",
//     phone: "",
//     consultant: "",
//     lastVisit: "",
//     totalRecheckup: "",
//   });

//   useEffect(() => {
//     fetchPatients();
//   }, []);

//   const fetchPatients = async () => {
//     try {
//       const response = await axios.get("http://localhost:3000/api/opd");
//       if (Array.isArray(response.data)) {
//         setPatientsData(response.data);
//         setFilteredPatients(response.data);
//       } else {
//         console.error("Expected an array but got:", response.data);
//       }
//     } catch (error) {
//       console.error("Error fetching patients:", error);
//     }
//   };

//   const handleOpenDialog = () => setOpenDialog(true);
//   const handleCloseDialog = () => setOpenDialog(false);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewPatient({ ...newPatient, [name]: value });
//   };

//   const addNewPatient = async () => {
//     try {
//       const response = await axios.post("http://localhost:3000/api/opd", newPatient);
//       setPatientsData([...patientsData, response.data]);
//       setFilteredPatients([...patientsData, response.data]);
//       setNewPatient({
//         name: "",
//         guardianName: "",
//         gender: "",
//         phone: "",
//         consultant: "",
//         lastVisit: "",
//         totalRecheckup: "",
//       });
//       handleCloseDialog();
//     } catch (error) {
//       console.error("Error adding patient:", error);
//     }
//   };

//   const deletePatient = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/patients/${id}`);
//       const updatedPatients = patientsData.filter((patient) => patient.patientId !== id);
//       setPatientsData(updatedPatients);
//       setFilteredPatients(updatedPatients);
//     } catch (error) {
//       console.error("Error deleting patient:", error);
//     }
//   };

//   const handleSearch = () => {
//     const filtered = patientsData.filter((patient) =>
//       patient.name.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//     setFilteredPatients(filtered);
//   };

//   const exportToCSV = () => {
//     const worksheet = XLSX.utils.json_to_sheet(filteredPatients);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Patients");
//     XLSX.writeFile(workbook, "OPD_Patients.csv");
//   };

//   const exportToPDF = () => {
//     const doc = new jsPDF();
//     doc.text("OPD Patients", 10, 10);
//     let rowY = 20;
//     filteredPatients.forEach((patient, index) => {
//       doc.text(`${index + 1}. ${patient.name} - ${patient.patientId}`, 10, rowY);
//       rowY += 10;
//     });
//     doc.save("OPD_Patients.pdf");
//   };

//   const onDrop = (acceptedFiles) => {
//     acceptedFiles.forEach((file) => {
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         const data = new Uint8Array(event.target.result);
//         const workbook = XLSX.read(data, { type: "array" });
//         const firstSheetName = workbook.SheetNames[0];
//         const worksheet = workbook.Sheets[firstSheetName];
//         const jsonData = XLSX.utils.sheet_to_json(worksheet);
//         setPatientsData(jsonData);
//         setFilteredPatients(jsonData);
//       };
//       reader.readAsArrayBuffer(file);
//     });
//   };

//   const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: '.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel' });

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>OPD Patient</h2>

//       {/* Search Bar */}
//       <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
//         <TextField
//           variant="outlined"
//           size="small"
//           placeholder="Search by Name"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           style={{ marginRight: "10px" }}
//         />
//         <IconButton color="primary" onClick={handleSearch}>
//           <Search />
//         </IconButton>
//       </div>

//       {/* Action Buttons */}
//       <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
//         <Button variant="contained" color="primary" onClick={handleOpenDialog} startIcon={<Add />}>
//           Add Patient
//         </Button>
//         <Button variant="contained" color="secondary" onClick={exportToCSV} startIcon={<SaveAlt />}>
//           Export CSV
//         </Button>
//         <Button variant="contained" color="secondary" onClick={exportToPDF} startIcon={<PictureAsPdf />}>
//           Export PDF
//         </Button>
//         <Button {...getRootProps()} variant="contained" color="secondary" startIcon={<CloudUpload />}>
//           <input {...getInputProps()} />
//           Import CSV
//         </Button>
//       </div>

//       {/* Table */}
//       <TableContainer component={Paper}>
//         <Table aria-label="OPD Patient Table">
//           <TableHead>
//             <TableRow>
//               <TableCell>Name</TableCell>
//               <TableCell>Patient Id</TableCell>
//               <TableCell>Guardian Name</TableCell>
//               <TableCell>Gender</TableCell>
//               <TableCell>Phone</TableCell>
//               <TableCell>Consultant</TableCell>
//               <TableCell>Last Visit</TableCell>
//               <TableCell>Total Recheckup</TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {Array.isArray(filteredPatients) && filteredPatients.map((patient) => (
//               <TableRow key={patient.patientId}>
//                 <TableCell>{patient.name}</TableCell>
//                 <TableCell>{patient.patientId}</TableCell>
//                 <TableCell>{patient.guardianName}</TableCell>
//                 <TableCell>{patient.gender}</TableCell>
//                 <TableCell>{patient.phone}</TableCell>
//                 <TableCell>{patient.consultant}</TableCell>
//                 <TableCell>{patient.lastVisit}</TableCell>
//                 <TableCell>{patient.totalRecheckup}</TableCell>
//                 <TableCell>
//                   <IconButton color="secondary" onClick={() => deletePatient(patient.patientId)}>
//                     <Delete />
//                   </IconButton>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* Add Patient Dialog */}
//       <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
//         <DialogTitle>Add Patient</DialogTitle>
//         <DialogContent>
//           <Grid container spacing={2}>
//             <Grid item xs={6}>
//               <TextField label="Name" name="name" value={newPatient.name} onChange={handleInputChange} fullWidth />
//             </Grid>
//             <Grid item xs={6}>
//               <TextField label="Guardian Name" name="guardianName" value={newPatient.guardianName} onChange={handleInputChange} fullWidth />
//             </Grid>
//             <Grid item xs={6}>
//               <TextField label="Gender" name="gender" value={newPatient.gender} onChange={handleInputChange} fullWidth />
//             </Grid>
//             <Grid item xs={6}>
//               <TextField label="Phone" name="phone" value={newPatient.phone} onChange={handleInputChange} fullWidth />
//             </Grid>
//             <Grid item xs={6}>
//               <TextField label="Consultant" name="consultant" value={newPatient.consultant} onChange={handleInputChange} fullWidth />
//             </Grid>
//             <Grid item xs={6}>
//               <TextField label="Last Visit" name="lastVisit" value={newPatient.lastVisit} onChange={handleInputChange} fullWidth />
//             </Grid>
//             <Grid item xs={6}>
//               <TextField label="Total Recheckup" name="totalRecheckup" value={newPatient.totalRecheckup} onChange={handleInputChange} fullWidth />
//             </Grid>
//             {/* Add other fields as necessary */}
//           </Grid>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseDialog} color="secondary">Cancel</Button>
//           <Button onClick={addNewPatient} color="primary">Save</Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

// export default OPD;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button, TextField, Grid, Dialog, DialogActions, DialogContent,
  DialogTitle, Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, IconButton, Tooltip
} from '@mui/material';
import { Add, Search, Delete, SaveAlt, CloudUpload, PictureAsPdf } from '@mui/icons-material';
import { utils, writeFile } from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const OPD = () => {
  const [patientsData, setPatientsData] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogs, setOpenDialogs] = useState(false);
  const [newPatient, setNewPatient] = useState({
    height: '',
    weight: '',
    bp: '',
    pulse: '',
    temperature: '',
    respiration: '',
    symptomsType: '',
    symptomsTitle: '',
    symptomsDescription: '',
    note: '',
    knownAllergies: '',
    dose: '',
    appointmentDate: '',
    case: '',
    casualty: '',
    oldPatient: '',
    tpa: '',
    reference: '',
    chargeCategory: '',
    charge: '',
    tax: '',
    standardCharge: '',
    appliedCharge: '',
    amount: '',
    paymentMode: ''
  });
  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewPatient(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/opd');
        setPatientsData(response.data);
        setFilteredPatients(response.data);
      } catch (error) {
        console.error('Error fetching patients:', error);
        alert('Error fetching patients');
      }
    };

    fetchPatients();
  }, []);

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const handleSavePatient = async () => {
    const {
      height, weight, bp, pulse, temperature, respiration,
      symptomsType, symptomsTitle, symptomsDescription, note,
      knownAllergies, dose, appointmentDate, case: caseField,
      casualty, oldPatient, tpa, reference, chargeCategory,
      charge, tax, standardCharge, appliedCharge, amount, paymentMode
    } = newPatient;
  
    const requiredFields = [
      height, weight, bp, pulse, temperature, respiration,
      symptomsType, symptomsTitle, symptomsDescription, note,
      knownAllergies, dose, appointmentDate, caseField, casualty, oldPatient, tpa, reference,
      standardCharge, appliedCharge, chargeCategory, charge, amount, tax, paymentMode
    ];
  
    const isEmpty = requiredFields.some(field => !field);  // Check for any empty field
    if (isEmpty) {
      alert('Please fill in all the required fields.');
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:3000/api/addopd', newPatient);
  
      console.log('Patient medical details saved successfully:', response.data);
  
      const updatedPatients = [...patientsData, response.data];
      setPatientsData(updatedPatients);
      setFilteredPatients(updatedPatients);
  
      // Reset form state
      setNewPatient({
        height: '', weight: '', bp: '', pulse: '', temperature: '', respiration: '',
        symptomsType: '', symptomsTitle: '', symptomsDescription: '', note: '', knownAllergies: '',
        dose: '', appointmentDate: '', case: '', casualty: '', oldPatient: '', tpa: '', reference: '',
        chargeCategory: '', charge: '', tax: '', standardCharge: '', appliedCharge: '', amount: '',
        paymentMode: ''
      });
  
      // Close the dialog
      setOpenDialog(false);
    } catch (error) {
      console.error('Error saving medical details:', error.response ? error.response.data : error.message);
      alert(`Error saving medical details: ${error.response ? error.response.data.message : error.message}`);
    }
  };

  const handlesOpenDialog = () => setOpenDialogs(true);
  const handlesCloseDialog = () => setOpenDialog(false);

  const handlesSavePatient = async () => {
    const {
      name, guardianName, gender, dateOfBirth, age, bloodGroup,
      maritalStatus, patientPhoto, phone, email, address, remarks,
      anyKnownAllergies, tpaID, tpaValidity, nationalIdentificationNumber, height, weight, bp,
      pulse, temperature, respiration, symptomsType, symptomsTitle,
      symptomsDescription, note, dose, appointmentDate, case: caseField,
      casualty, oldPatient, tpa, reference, consultantDoctor, chargeCategory,
      charge, tax, standardCharge, appliedCharge, amount, paymentMode
    } = newPatient;
  
    const requiredFields = [
      name, guardianName, gender, dateOfBirth, age, bloodGroup,
      maritalStatus,phone, email, address, remarks, anyKnownAllergies,
      tpaID, tpaValidity, nationalIdentificationNumber, height, weight, bp,
      pulse, temperature, respiration, symptomsType, symptomsTitle,
      symptomsDescription, note, dose, appointmentDate, caseField, casualty,
      oldPatient, tpa, reference, consultantDoctor, chargeCategory, charge,
      tax, standardCharge, appliedCharge, amount, paymentMode
    ];
  
    const isEmpty = requiredFields.some(field => !field);
    if (isEmpty) {
      alert('Please fill in all the required fields.');
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:3000/api/addnewopd', newPatient);
  
      console.log('Patient medical details saved successfully:', response.data);
  
      const updatedPatients = [...patientsData, response.data];
      setPatientsData(updatedPatients);
      setFilteredPatients(updatedPatients);
  
      // Reset form state
      setNewPatient({
        name: '', guardianName: '', gender: '', dateOfBirth: '', age: '', bloodGroup: '',
        maritalStatus: '', patientPhoto: null, phone: '', email: '', address: '', remarks: '',
        anyKnownAllergies: '', tpaID: '', tpaValidity: '', nationalIdentificationNumber: '',
        height: '', weight: '', bp: '', pulse: '', temperature: '', respiration: '',
        symptomsType: '', symptomsTitle: '', symptomsDescription: '', note: '', dose: '',
        appointmentDate: '', case: '', casualty: '', oldPatient: '', tpa: '', reference: '',
        consultantDoctor: '', chargeCategory: '', charge: '', tax: '', standardCharge: '',
        appliedCharge: '', amount: '', paymentMode: ''
      });
  
      // Close the dialog
      setOpenDialogs(false);
    } catch (error) {
      console.error('Error saving medical details:', error.response ? error.response.data : error.message);
      alert(`Error saving medical details: ${error.response ? error.response.data.message : error.message}`);
    }
  };
  
  const handlePatient = async () => {
    try {
      // Use GET request to retrieve patient data
      const response = await axios.get('http://localhost:3000/api/opd');
      
      console.log('Patient data retrieved successfully:', response.data);
  
      // Assuming you're setting patient data in the state
      const updatedPatients = response.data;  // The data returned from the backend
      setPatientsData(updatedPatients);  // Update the patient list in your state
      setFilteredPatients(updatedPatients);  // Update the filtered patient list as well
  
      // Reset form or any other logic if necessary
      setNewPatient({
        name: '', guardianName: '', gender: '', phone: '', consultant: '', lastVisit: '', totalRecheckup: ''
      });
  
      // Close the dialog if applicable
      setOpenDialog(false);
    } catch (error) {
      console.error('Error retrieving patient data:', error.response ? error.response.data : error.message);
      alert(`Error retrieving patient data: ${error.response ? error.response.data.message : error.message}`);
    }
  };
  
  const deletePatient = async (id) => {
    try {
      
      setPatientsData(patientsData.filter(patient => patient.id !== id));
      setFilteredPatients(filteredPatients.filter(patient => patient.id !== id));
      alert('Patient deleted successfully');
    } catch (error) {
      console.error('Error deleting patient:', error);
      alert('Error deleting patient');
    }
  };

  const exportToCSV = () => {
    const ws = utils.json_to_sheet(filteredPatients);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Patients');
    writeFile(wb, 'patients_data.csv');
  };

  const handlePrint = () => {
    window.print();
  };
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['Name', 'Guardian Name', 'Phone', 'Consultant', 'Last Visit', 'Total Recheckup']],
      body: filteredPatients.map(patient => [
        patient.name,
        patient.guardianName,
        patient.phone,
        patient.consultant,
        patient.lastVisit,
        patient.totalRecheckup
      ])
    });
    doc.save('patients_data.pdf');
  };

    
    

  

  const handleSearch = () => {
    const filtered = patientsData.filter((patient) =>
      patient.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPatients(filtered);
  };

  
 




  return (
    <div style={{ padding: '20px' }}>
      <h2>OPD Patient Management</h2>

      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search by Name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <IconButton color="primary" onClick={handleSearch}>
          <Search />
        </IconButton>
      </div>
{}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenDialog}
          startIcon={<Add />}
        >
          Add Patient
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={exportToCSV}
          startIcon={<SaveAlt />}
        >
          Export CSV
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={exportToPDF}
          startIcon={<PictureAsPdf />}
        >
          Export PDF
        </Button>
        <Button  variant="contained"
          color="secondary" onClick={handlePrint}>Print</Button>;
           

</div>
      <TableContainer component={Paper} style={{ marginTop: '20px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Guardian Name</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Consultant</TableCell>
              <TableCell>Last Visit</TableCell>
              <TableCell>Total Recheckup</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPatients.map((patient) => (
              <TableRow key={patient.id}>
                <TableCell>{patient.name}</TableCell>
                <TableCell>{patient.guardianName}</TableCell>
                <TableCell>{patient.gender}</TableCell>
                <TableCell>{patient.phone}</TableCell>
                <TableCell>{patient.consultant}</TableCell>
                <TableCell>{patient.lastVisit}</TableCell>
                <TableCell>{patient.totalRecheckup}</TableCell>
                <TableCell>
                  <Tooltip title="Delete">
                    <IconButton onClick={() => deletePatient(patient.id)} color="secondary">
                      <Delete />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

     
      <Dialog open={openDialogs} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>Add New Patient</DialogTitle>
        <DialogContent>
          <form className="form">
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="Name"
                  name="name"
                  variant="outlined"
                  fullWidth
                  value={newPatient.name}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Guardian Name"
                  name="guardianName"
                  variant="outlined"
                  fullWidth
                  value={newPatient.guardianName}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Gender"
                  name="gender"
                  variant="outlined"
                  fullWidth
                  select
                  SelectProps={{ native: true }}
                  value={newPatient.gender}
                  onChange={handleInputChange}
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Date of Birth"
                  name="dateOfBirth"
                  type="date"
                  variant="outlined"
                  fullWidth
                  value={newPatient.dateOfBirth}
                  onChange={handleInputChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Age (yy-mm-dd)"
                  name="age"
                  variant="outlined"
                  fullWidth
                  value={newPatient.age}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Blood Group"
                  name="bloodGroup"
                  variant="outlined"
                  fullWidth
                  select
                  SelectProps={{ native: true }}
                  value={newPatient.bloodGroup}
                  onChange={handleInputChange}
                >
                  <option value="">Select</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Marital Status"
                  name="maritalStatus"
                  variant="outlined"
                  fullWidth
                  select
                  SelectProps={{ native: true }}
                  value={newPatient.maritalStatus}
                  onChange={handleInputChange}
                >
                  <option value="">Select</option>
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                  <option value="Widowed">Widowed</option>
                  <option value="Divorced">Divorced</option>
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Phone"
                  name="phone"
                  variant="outlined"
                  fullWidth
                  value={newPatient.phone}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Email"
                  name="email"
                  variant="outlined"
                  fullWidth
                  value={newPatient.email}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Address"
                  name="address"
                  variant="outlined"
                  fullWidth
                  value={newPatient.address}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Remarks"
                  name="remarks"
                  variant="outlined"
                  fullWidth
                  value={newPatient.remarks}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Any Known Allergies"
                  name="anyKnownAllergies"
                  variant="outlined"
                  fullWidth
                  value={newPatient.anyKnownAllergies}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="TPA ID"
                  name="tpaID"
                  variant="outlined"
                  fullWidth
                  value={newPatient.tpaID}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="TPA Validity"
                  name="tpaValidity"
                  type="date"
                  variant="outlined"
                  fullWidth
                  value={newPatient.tpaValidity}
                  onChange={handleInputChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="National Identification Number"
                  name="nationalIdentificationNumber"
                  variant="outlined"
                  fullWidth
                  value={newPatient.nationalIdentificationNumber}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Height (cm)"
                  name="height"
                  variant="outlined"
                  fullWidth
                  value={newPatient.height}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Weight (kg)"
                  name="weight"
                  variant="outlined"
                  fullWidth
                  value={newPatient.weight}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="BP"
                  name="bp"
                  variant="outlined"
                  fullWidth
                  value={newPatient.bp}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Pulse"
                  name="pulse"
                  variant="outlined"
                  fullWidth
                  value={newPatient.pulse}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Temperature"
                  name="temperature"
                  variant="outlined"
                  fullWidth
                  value={newPatient.temperature}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Respiration"
                  name="respiration"
                  variant="outlined"
                  fullWidth
                  value={newPatient.respiration}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Symptoms Type"
                  name="symptomsType"
                  variant="outlined"
                  fullWidth
                  value={newPatient.symptomsType}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Symptoms Title"
                  name="symptomsTitle"
                  variant="outlined"
                  fullWidth
                  value={newPatient.symptomsTitle}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Symptoms Description"
                  name="symptomsDescription"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={3}
                  value={newPatient.symptomsDescription}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Note"
                  name="note"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={3}
                  value={newPatient.note}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Dose"
                  name="dose"
                  variant="outlined"
                  fullWidth
                  value={newPatient.dose}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Appointment Date"
                  name="appointmentDate"
                  type="date"
                  variant="outlined"
                  fullWidth
                  value={newPatient.appointmentDate}
                  onChange={handleInputChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Case"
                  name="case"
                  variant="outlined"
                  fullWidth
                  value={newPatient.case}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Casualty"
                  name="casualty"
                  variant="outlined"
                  fullWidth
                  select
                  SelectProps={{ native: true }}
                  value={newPatient.casualty}
                  onChange={handleInputChange}
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Old Patient"
                  name="oldPatient"
                  variant="outlined"
                  fullWidth
                  select
                  SelectProps={{ native: true }}
                  value={newPatient.oldPatient}
                  onChange={handleInputChange}
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="TPA"
                  name="tpa"
                  variant="outlined"
                  fullWidth
                  value={newPatient.tpa}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Reference"
                  name="reference"
                  variant="outlined"
                  fullWidth
                  value={newPatient.reference}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Consultant Doctor"
                  name="consultantDoctor"
                  variant="outlined"
                  fullWidth
                  value={newPatient.consultantDoctor}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Charge Category"
                  name="chargeCategory"
                  variant="outlined"
                  fullWidth
                  value={newPatient.chargeCategory}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Charge"
                  name="charge"
                  variant="outlined"
                  fullWidth
                  value={newPatient.charge}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Tax"
                  name="tax"
                  variant="outlined"
                  fullWidth
                  value={newPatient.tax}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Standard Charge"
                  name="standardCharge"
                  variant="outlined"
                  fullWidth
                  value={newPatient.standardCharge}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Applied Charge"
                  name="appliedCharge"
                  variant="outlined"
                  fullWidth
                  value={newPatient.appliedCharge}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Amount"
                  name="amount"
                  variant="outlined"
                  fullWidth
                  value={newPatient.amount}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Payment Mode"
                  name="paymentMode"
                  variant="outlined"
                  fullWidth
                  value={newPatient.paymentMode}
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">Cancel</Button>
          <Button onClick={handlesSavePatient} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    



      
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>Add New Patient</DialogTitle>
        <Button
          variant="contained"
          color="primary"
          onClick={handlesOpenDialog }
          startIcon={<Add />}
        >
          Add Patient
        </Button>
        <DialogContent>
        <form className="form">
  <Grid container spacing={2}>
    {/* Existing fields from your original code */}
    
    <Grid item xs={6}>
      <TextField
        label="Height"
        name="height"
        variant="outlined"
        fullWidth
        value={newPatient.height}
        onChange={handleInputChange}
      />
    </Grid>
    <Grid item xs={6}>
      <TextField
        label="Weight"
        name="weight"
        variant="outlined"
        fullWidth
        value={newPatient.weight}
        onChange={handleInputChange}
      />
    </Grid>
    <Grid item xs={6}>
      <TextField
        label="BP"
        name="bp"
        variant="outlined"
        fullWidth
        value={newPatient.bp}
        onChange={handleInputChange}
      />
    </Grid>
    <Grid item xs={6}>
      <TextField
        label="Pulse"
        name="pulse"
        variant="outlined"
        fullWidth
        value={newPatient.pulse}
        onChange={handleInputChange}
      />
    </Grid>
    <Grid item xs={6}>
      <TextField
        label="Temperature"
        name="temperature"
        variant="outlined"
        fullWidth
        value={newPatient.temperature}
        onChange={handleInputChange}
      />
    </Grid>
    <Grid item xs={6}>
      <TextField
        label="Respiration"
        name="respiration"
        variant="outlined"
        fullWidth
        value={newPatient.respiration}
        onChange={handleInputChange}
      />
    </Grid>
    <Grid item xs={6}>
      <TextField
        label="Symptoms Type"
        name="symptomsType"
        variant="outlined"
        fullWidth
        value={newPatient.symptomsType}
        onChange={handleInputChange}
      />
    </Grid>
    <Grid item xs={6}>
      <TextField
        label="Symptoms Title"
        name="symptomsTitle"
        variant="outlined"
        fullWidth
        value={newPatient.symptomsTitle}
        onChange={handleInputChange}
      />
    </Grid>
    <Grid item xs={12}>
      <TextField
        label="Symptoms Description"
        name="symptomsDescription"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        value={newPatient.symptomsDescription}
        onChange={handleInputChange}
      />
    </Grid>
    <Grid item xs={12}>
      <TextField
        label="Note"
        name="note"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        value={newPatient.note}
        onChange={handleInputChange}
      />
    </Grid>
    <Grid item xs={6}>
      <TextField
        label="Any Known Allergies"
        name="knownAllergies"
        variant="outlined"
        fullWidth
        value={newPatient.knownAllergies}
        onChange={handleInputChange}
      />
    </Grid>
    <Grid item xs={6}>
      <TextField
        label="Dose"
        name="dose"
        variant="outlined"
        fullWidth
        value={newPatient.dose}
        onChange={handleInputChange}
      />
    </Grid>
    <Grid item xs={6}>
      <TextField
        label="Appointment Date"
        name="appointmentDate"
        type="date"
        variant="outlined"
        fullWidth
        value={newPatient.appointmentDate}
        onChange={handleInputChange}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </Grid>
    <Grid item xs={6}>
      <TextField
        label="Case"
        name="case"
        variant="outlined"
        fullWidth
        value={newPatient.case}
        onChange={handleInputChange}
      />
    </Grid>
    <Grid item xs={6}>
      <TextField
        label="Casualty"
        name="casualty"
        variant="outlined"
        fullWidth
        select
        SelectProps={{ native: true }}
        value={newPatient.casualty}
        onChange={handleInputChange}
      >
        <option value="">Select</option>
        <option value="No">No</option>
        <option value="Yes">Yes</option>
      </TextField>
    </Grid>
    <Grid item xs={6}>
      <TextField
        label="Old Patient"
        name="oldPatient"
        variant="outlined"
        fullWidth
        select
        SelectProps={{ native: true }}
        value={newPatient.oldPatient}
        onChange={handleInputChange}
      >
        <option value="">Select</option>
        <option value="No">No</option>
        <option value="Yes">Yes</option>
      </TextField>
    </Grid>
    <Grid item xs={6}>
      <TextField
        label="TPA"
        name="tpa"
        variant="outlined"
        fullWidth
        value={newPatient.tpa}
        onChange={handleInputChange}
      />
    </Grid>
    <Grid item xs={6}>
      <TextField
        label="Reference"
        name="reference"
        variant="outlined"
        fullWidth
        value={newPatient.reference}
        onChange={handleInputChange}
      />
    </Grid>
    <Grid item xs={6}>
      <TextField
        label="Consultant Doctor"
        name="consultantDoctor"
        variant="outlined"
        fullWidth
        value={newPatient.consultantDoctor}
        onChange={handleInputChange}
      />
    </Grid>
    <Grid item xs={6}>
      <TextField
        label="Charge Category"
        name="chargeCategory"
        variant="outlined"
        fullWidth
        value={newPatient.chargeCategory}
        onChange={handleInputChange}
      />
    </Grid>
    <Grid item xs={6}>
      <TextField
        label="Charge"
        name="charge"
        variant="outlined"
        fullWidth
        value={newPatient.charge}
        onChange={handleInputChange}
      />
    </Grid>
    <Grid item xs={6}>
      <TextField
        label="Tax"
        name="tax"
        variant="outlined"
        fullWidth
        value={newPatient.tax}
        onChange={handleInputChange}
      />
    </Grid>
    <Grid item xs={6}>
      <TextField
        label="Standard Charge (₹)"
        name="standardCharge"
        variant="outlined"
        fullWidth
        value={newPatient.standardCharge}
        onChange={handleInputChange}
      />
    </Grid>
    <Grid item xs={6}>
      <TextField
        label="Applied Charge (₹)"
        name="appliedCharge"
        variant="outlined"
        fullWidth
        value={newPatient.appliedCharge}
        onChange={handleInputChange}
      />
    </Grid>
    <Grid item xs={6}>
      <TextField
        label="Amount (₹)"
        name="amount"
        variant="outlined"
        fullWidth
        value={newPatient.amount}
        onChange={handleInputChange}
      />
    </Grid>
    <Grid item xs={6}>
      <TextField
        label="Payment Mode"
        name="paymentMode"
        variant="outlined"
        fullWidth
        select
        SelectProps={{ native: true }}
        value={newPatient.paymentMode}
        onChange={handleInputChange}
      >
        <option value="">Select</option>
        <option value="Cash">Cash</option>
        <option value="Card">Card</option>
        <option value="Online">Online</option>
      </TextField>
    </Grid>
  </Grid>
</form>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">Cancel</Button>
          <Button onClick={handleSavePatient} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </div>

    
  );
};



export default OPD;


