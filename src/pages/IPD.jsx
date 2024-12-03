// import React, { useState } from "react";
// import {
//   Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button,
//   Paper, Tooltip, Grid, Typography, Toolbar, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem, Select, Box,
// } from "@mui/material";
// import { Add, Print, SaveAlt, ContentCopy, FileDownload, PictureAsPdf } from "@mui/icons-material";
// import { jsPDF } from "jspdf";
// import * as XLSX from "xlsx";

// const initialPatientsData = [
//   { ipdNo: "IPDN51", caseId: 137, name: "Lasya (1265)", gender: "Female", phone: "9653467893", consultant: "Chethan Kumbar (01)", bed: "GF-003-VIP Ward-Ground Floor", creditLimit: "1000000.00" },
//   { ipdNo: "IPDN49", caseId: 139, name: "Jyoti (1299)", gender: "Female", phone: "6575712345", consultant: "Amit Singh (011)", bed: "PP-100-VIP Ward-Ground Floor", creditLimit: "1000000.00" },
//   // Add more data as needed
// ];

// const IPD = () => {
//   const [patientsData] = useState(initialPatientsData);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [openNotification, setOpenNotification] = useState(false);
//   const [newPatient, setNewPatient] = useState({
//     height: "", weight: "", bp: "", pulse: "", temperature: "", respiration: "", symptomsType: "",
//     symptomsTitle: "", symptomsDescription: "", note: "", admissionDate: "", caseDetail: "", casualty: "No", oldPatient: "No",
//     tpa: "", creditLimit: "1000000", reference: "", consultantDoctor: "", bedGroup: "", bedNumber: "",
//     name: "", guardianName: "", gender: "", dob: "", age: { year: "", month: "", day: "" }, bloodGroup: "", maritalStatus: "",
//     phone: "", email: "", address: "", remarks: "", allergies: "", tpaId: "", tpaValidity: "", nationalId: ""
//   });

//   const handleAddPatientClick = () => setOpenDialog(true);
//   const handleOpenNotification = () => setOpenNotification(true);
//   const handleCloseDialog = () => setOpenDialog(false);
//   const handleCloseNotification = () => setOpenNotification(false);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewPatient((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleSavePatient = () => {
//     console.log("New patient data saved:", newPatient);
//     setOpenDialog(false);
//   };

//   return (
//     <div style={{ padding: 20 }}>
//       <Typography variant="h4" gutterBottom>IPD Patient</Typography>
//       <Toolbar style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
//         <Button variant="contained" color="primary" startIcon={<Add />} onClick={handleAddPatientClick}>New Patient</Button>
//         <button className="button" onClick={() => handleButtonClick('Add Staff')}>Add Staff</button>
//         <Grid container justifyContent="flex-end" spacing={1}>
//           <Grid item><Tooltip title="Export CSV"><Button variant="contained" color="primary" startIcon={<SaveAlt />}>CSV</Button></Tooltip></Grid>
//           <Grid item><Tooltip title="Export Excel"><Button variant="contained" color="success" startIcon={<FileDownload />}>Excel</Button></Tooltip></Grid>
//           <Grid item><Tooltip title="Export PDF"><Button variant="contained" color="secondary" startIcon={<PictureAsPdf />}>PDF</Button></Tooltip></Grid>
//           <Grid item><Tooltip title="Copy to Clipboard"><Button variant="contained" color="default" startIcon={<ContentCopy />}>Copy</Button></Tooltip></Grid>
//           <Grid item><Tooltip title="Print"><Button variant="contained" color="secondary" startIcon={<Print />}>Print</Button></Tooltip></Grid>
//         </Grid>
//       </Toolbar>

//       {/* New Patient Dialog */}
//       <Dialog open={openDialog} onClose={handleCloseDialog}>
//         <DialogTitle>New Patient Form</DialogTitle>
//         <DialogContent>
//           <Grid container spacing={2}>
//             <Grid item xs={3}><TextField label="Height" name="height" value={newPatient.height} onChange={handleInputChange} fullWidth /></Grid>
//             <Grid item xs={3}><TextField label="Weight" name="weight" value={newPatient.weight} onChange={handleInputChange} fullWidth /></Grid>
//             <Grid item xs={3}><TextField label="BP" name="bp" value={newPatient.bp} onChange={handleInputChange} fullWidth /></Grid>
//             <Grid item xs={3}><TextField label="Pulse" name="pulse" value={newPatient.pulse} onChange={handleInputChange} fullWidth /></Grid>
//             <Grid item xs={3}><TextField label="Temperature" name="temperature" value={newPatient.temperature} onChange={handleInputChange} fullWidth /></Grid>
//             <Grid item xs={3}><TextField label="Respiration" name="respiration" value={newPatient.respiration} onChange={handleInputChange} fullWidth /></Grid>
//             <Grid item xs={6}>
//               <Select label="Symptoms Type" name="symptomsType" value={newPatient.symptomsType} onChange={handleInputChange} fullWidth>
//                 <MenuItem value="">Select</MenuItem>
//                 <MenuItem value="Type 1">Type 1</MenuItem>
//                 <MenuItem value="Type 2">Type 2</MenuItem>
//                 <MenuItem value="Type 3">Type 3</MenuItem>
//               </Select>
//             </Grid>
//             <Grid item xs={6}><TextField label="Symptoms Title" name="symptomsTitle" value={newPatient.symptomsTitle} onChange={handleInputChange} fullWidth /></Grid>
//             <Grid item xs={12}><TextField label="Symptoms Description" name="symptomsDescription" value={newPatient.symptomsDescription} onChange={handleInputChange} fullWidth multiline rows={2} /></Grid>
//             <Grid item xs={12}><TextField label="Note" name="note" value={newPatient.note} onChange={handleInputChange} fullWidth multiline rows={3} /></Grid>
//             <Grid item xs={6}><TextField label="Admission Date" type="date" name="admissionDate" value={newPatient.admissionDate} onChange={handleInputChange} fullWidth InputLabelProps={{ shrink: true }} required /></Grid>
//             <Grid item xs={6}><TextField label="Case" name="caseDetail" value={newPatient.caseDetail} onChange={handleInputChange} fullWidth /></Grid>
//             <Grid item xs={6}>
//               <Select label="Casualty" name="casualty" value={newPatient.casualty} onChange={handleInputChange} fullWidth>
//                 <MenuItem value="No">No</MenuItem>
//                 <MenuItem value="Yes">Yes</MenuItem>
//               </Select>
//             </Grid>
//             <Grid item xs={6}>
//               <Select label="Old Patient" name="oldPatient" value={newPatient.oldPatient} onChange={handleInputChange} fullWidth>
//                 <MenuItem value="No">No</MenuItem>
//                 <MenuItem value="Yes">Yes</MenuItem>
//               </Select>
//             </Grid>
//             <Grid item xs={6}><TextField label="TPA" name="tpa" value={newPatient.tpa} onChange={handleInputChange} fullWidth /></Grid>
//             <Grid item xs={6}><TextField label="Credit Limit (₹)" name="creditLimit" value={newPatient.creditLimit} onChange={handleInputChange} fullWidth disabled /></Grid>
//             <Grid item xs={6}><TextField label="Reference" name="reference" value={newPatient.reference} onChange={handleInputChange} fullWidth /></Grid>
//             <Grid item xs={6}>
//               <Select label="Consultant Doctor" name="consultantDoctor" value={newPatient.consultantDoctor} onChange={handleInputChange} fullWidth required>
//                 <MenuItem value="">Select</MenuItem>
//                 <MenuItem value="Dr. Smith">Dr. Smith</MenuItem>
//                 <MenuItem value="Dr. Johnson">Dr. Johnson</MenuItem>
//                 <MenuItem value="Dr. Lee">Dr. Lee</MenuItem>
//               </Select>
//             </Grid>
//             <Grid item xs={6}>
//               <Select label="Bed Group" name="bedGroup" value={newPatient.bedGroup} onChange={handleInputChange} fullWidth>
//                 <MenuItem value="">Select</MenuItem>
//                 <MenuItem value="General Ward">General Ward</MenuItem>
//                 <MenuItem value="Private Room">Private Room</MenuItem>
//                 <MenuItem value="ICU">ICU</MenuItem>
//               </Select>
//             </Grid>
//             <Grid item xs={6}>
//               <Select label="Bed Number" name="bedNumber" value={newPatient.bedNumber} onChange={handleInputChange} fullWidth required>
//                 <MenuItem value="">Select</MenuItem>
//                 <MenuItem value="Bed 1">Bed 1</MenuItem>
//                 <MenuItem value="Bed 2">Bed 2</MenuItem>
//                 <MenuItem value="Bed 3">Bed 3</MenuItem>
//               </Select>
//             </Grid>
//           </Grid>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleSavePatient} color="primary" variant="contained">Save</Button>
//           <Button onClick={handleOpenNotification} color="primary" variant="contained">New Patient Notification</Button>
//           <Button onClick={handleCloseDialog} color="secondary">Cancel</Button>
//         </DialogActions>
//       </Dialog>

//       {/* Notification Dialog */}
//       <Dialog open={openNotification} onClose={handleCloseNotification}>
//         <DialogTitle>Notification</DialogTitle>
//         <DialogContent>
//           <Grid container spacing={2}>
//             <Grid item xs={6}><TextField label="Name" name="name" value={newPatient.name} onChange={handleInputChange} fullWidth required /></Grid>
//             <Grid item xs={6}><TextField label="Guardian Name" name="guardianName" value={newPatient.guardianName} onChange={handleInputChange} fullWidth /></Grid>
//             <Grid item xs={3}>
//               <Select label="Gender" name="gender" value={newPatient.gender} onChange={handleInputChange} fullWidth>
//                 <MenuItem value="">Select</MenuItem>
//                 <MenuItem value="Male">Male</MenuItem>
//                 <MenuItem value="Female">Female</MenuItem>
//                 <MenuItem value="Other">Other</MenuItem>
//               </Select>
//             </Grid>
//             <Grid item xs={3}><TextField label="Date Of Birth" name="dob" type="date" value={newPatient.dob} onChange={handleInputChange} fullWidth InputLabelProps={{ shrink: true }} /></Grid>
//             <Grid item xs={6}>
//               <Box display="flex" justifyContent="space-between">
//                 <TextField label="Age (Year)" name="year" value={newPatient.age.year} onChange={handleInputChange} style={{ width: "30%" }} />
//                 <TextField label="Age (Month)" name="month" value={newPatient.age.month} onChange={handleInputChange} style={{ width: "30%" }} />
//                 <TextField label="Age (Day)" name="day" value={newPatient.age.day} onChange={handleInputChange} style={{ width: "30%" }} />
//               </Box>
//             </Grid>
//             <Grid item xs={3}>
//               <Select label="Blood Group" name="bloodGroup" value={newPatient.bloodGroup} onChange={handleInputChange} fullWidth>
//                 <MenuItem value="">Select</MenuItem>
//                 <MenuItem value="A+">A+</MenuItem>
//                 <MenuItem value="A-">A-</MenuItem>
//                 <MenuItem value="B+">B+</MenuItem>
//                 <MenuItem value="B-">B-</MenuItem>
//                 <MenuItem value="AB+">AB+</MenuItem>
//                 <MenuItem value="AB-">AB-</MenuItem>
//                 <MenuItem value="O+">O+</MenuItem>
//                 <MenuItem value="O-">O-</MenuItem>
//               </Select>
//             </Grid>
//             <Grid item xs={3}>
//               <Select label="Marital Status" name="maritalStatus" value={newPatient.maritalStatus} onChange={handleInputChange} fullWidth>
//                 <MenuItem value="">Select</MenuItem>
//                 <MenuItem value="Single">Single</MenuItem>
//                 <MenuItem value="Married">Married</MenuItem>
//                 <MenuItem value="Divorced">Divorced</MenuItem>
//                 <MenuItem value="Widowed">Widowed</MenuItem>
//               </Select>
//             </Grid>
//             <Grid item xs={6}>
//               <Typography variant="body1">Patient Photo</Typography>
//               <Button variant="outlined" component="label" fullWidth>
//                 Drop a file here or click
//                 <input type="file" hidden />
//               </Button>
//             </Grid>
//             <Grid item xs={3}><TextField label="Phone" name="phone" value={newPatient.phone} onChange={handleInputChange} fullWidth /></Grid>
//             <Grid item xs={3}><TextField label="Email" name="email" value={newPatient.email} onChange={handleInputChange} fullWidth /></Grid>
//             <Grid item xs={6}><TextField label="Address" name="address" value={newPatient.address} onChange={handleInputChange} fullWidth /></Grid>
//             <Grid item xs={6}><TextField label="Remarks" name="remarks" value={newPatient.remarks} onChange={handleInputChange} fullWidth multiline rows={2} /></Grid>
//             <Grid item xs={6}><TextField label="Any Known Allergies" name="allergies" value={newPatient.allergies} onChange={handleInputChange} fullWidth multiline rows={2} /></Grid>
//             <Grid item xs={4}><TextField label="TPA ID" name="tpaId" value={newPatient.tpaId} onChange={handleInputChange} fullWidth /></Grid>
//             <Grid item xs={4}><TextField label="TPA Validity" name="tpaValidity" value={newPatient.tpaValidity} onChange={handleInputChange} fullWidth /></Grid>
//             <Grid item xs={4}><TextField label="National Identification Number" name="nationalId" value={newPatient.nationalId} onChange={handleInputChange} fullWidth /></Grid>
//           </Grid>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseNotification} color="primary">Close</Button>
//         </DialogActions>
//       </Dialog>

//       <TableContainer component={Paper} id="ipd-table">
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>IPD No</TableCell>
//               <TableCell>Case ID</TableCell>
//               <TableCell>Name</TableCell>
//               <TableCell>Gender</TableCell>
//               <TableCell>Phone</TableCell>
//               <TableCell>Consultant</TableCell>
//               <TableCell>Bed</TableCell>
//               <TableCell>Credit Limit (₹)</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {patientsData.map((patient, index) => (
//               <TableRow key={index}>
//                 <TableCell>{patient.ipdNo}</TableCell>
//                 <TableCell>{patient.caseId}</TableCell>
//                 <TableCell>{patient.name}</TableCell>
//                 <TableCell>{patient.gender}</TableCell>
//                 <TableCell>{patient.phone}</TableCell>
//                 <TableCell>{patient.consultant}</TableCell>
//                 <TableCell>{patient.bed}</TableCell>
//                 <TableCell>{patient.creditLimit}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </div>
//   );
// };

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button,
  Paper, Tooltip, Grid, Typography, Toolbar, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem, Select, Box,
} from '@mui/material';
import { Add, Print, SaveAlt, ContentCopy, FileDownload, PictureAsPdf } from '@mui/icons-material';

const IPD = () => {
  const [patientsData, setPatientsData] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state to handle async
  const [error, setError] = useState(null); // Error state to handle any API errors
  const [openDialog, setOpenDialog] = useState(false);
  const [newPatient, setNewPatient] = useState({
    ipdNo: '', caseId: '', name: '', gender: '', phone: '', consultant: '', bed: '', creditLimit: ''
  });

  // Fetch patients data from the backend using useEffect
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/patients');
        setPatientsData(response.data); // Set the fetched data to state
        setLoading(false); // Stop loading once data is fetched
      } catch (err) {
        setError('Error fetching data');
        setLoading(false); // Stop loading if there is an error
      }
    };

    fetchPatients();
  }, []); // Empty dependency array to run only once when the component mounts

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPatient((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission to add a new patient
  const handleSavePatient = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/patients', newPatient);
      setPatientsData([...patientsData, response.data]); // Add the new patient to the table
      setOpenDialog(false); // Close the dialog
      setNewPatient({ ipdNo: '', caseId: '', name: '', gender: '', phone: '', consultant: '', bed: '', creditLimit: '' }); // Reset form
    } catch (error) {
      console.error('Error saving new patient:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading message until the data is fetched
  }

  if (error) {
    return <div>{error}</div>; // Show error message if there is an error fetching data
  }

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h4" gutterBottom>IPD Patient</Typography>
      <Toolbar style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
        <Button variant="contained" color="primary" startIcon={<Add />} onClick={() => setOpenDialog(true)}>New Patient</Button>
        <Grid container justifyContent="flex-end" spacing={1}>
          <Grid item><Tooltip title="Export CSV"><Button variant="contained" color="primary" startIcon={<SaveAlt />}>CSV</Button></Tooltip></Grid>
          <Grid item><Tooltip title="Export Excel"><Button variant="contained" color="success" startIcon={<FileDownload />}>Excel</Button></Tooltip></Grid>
          <Grid item><Tooltip title="Export PDF"><Button variant="contained" color="secondary" startIcon={<PictureAsPdf />}>PDF</Button></Tooltip></Grid>
          <Grid item><Tooltip title="Copy to Clipboard"><Button variant="contained" color="default" startIcon={<ContentCopy />}>Copy</Button></Tooltip></Grid>
          <Grid item><Tooltip title="Print"><Button variant="contained" color="secondary" startIcon={<Print />}>Print</Button></Tooltip></Grid>
        </Grid>
      </Toolbar>

      {/* New Patient Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>New Patient Form</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={6}><TextField label="IPD No" name="ipdNo" value={newPatient.ipdNo} onChange={handleInputChange} fullWidth /></Grid>
            <Grid item xs={6}><TextField label="Case ID" name="caseId" value={newPatient.caseId} onChange={handleInputChange} fullWidth /></Grid>
            <Grid item xs={6}><TextField label="Name" name="name" value={newPatient.name} onChange={handleInputChange} fullWidth /></Grid>
            <Grid item xs={6}><TextField label="Gender" name="gender" value={newPatient.gender} onChange={handleInputChange} fullWidth /></Grid>
            <Grid item xs={6}><TextField label="Phone" name="phone" value={newPatient.phone} onChange={handleInputChange} fullWidth /></Grid>
            <Grid item xs={6}><TextField label="Consultant" name="consultant" value={newPatient.consultant} onChange={handleInputChange} fullWidth /></Grid>
            <Grid item xs={6}><TextField label="Bed" name="bed" value={newPatient.bed} onChange={handleInputChange} fullWidth /></Grid>
            <Grid item xs={6}><TextField label="Credit Limit" name="creditLimit" value={newPatient.creditLimit} onChange={handleInputChange} fullWidth /></Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSavePatient} color="primary" variant="contained">Save</Button>
          <Button onClick={() => setOpenDialog(false)} color="secondary">Cancel</Button>
        </DialogActions>
      </Dialog>

      {/* Patient Data Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>IPD No</TableCell>
              <TableCell>Case ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Consultant</TableCell>
              <TableCell>Bed</TableCell>
              <TableCell>Credit Limit (₹)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patientsData.map((patient, index) => (
              <TableRow key={index}>
                <TableCell>{patient.ipdNo}</TableCell>
                <TableCell>{patient.caseId}</TableCell>
                <TableCell>{patient.name}</TableCell>
                <TableCell>{patient.gender}</TableCell>
                <TableCell>{patient.phone}</TableCell>
                <TableCell>{patient.consultant}</TableCell>
                <TableCell>{patient.bed}</TableCell>
                <TableCell>{patient.creditLimit}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default IPD;
