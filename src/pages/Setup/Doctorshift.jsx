import React, { useEffect, useState } from "react";
import axios from "axios";
import { CSVLink } from "react-csv";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import { CopyToClipboard } from "react-copy-to-clipboard";

const DoctorShiftTable = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [shifts, setShifts] = useState([]); // State for shift data

  // Fetch doctors from the backend
  const fetchDoctors = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/staffrole/doctor");
      const doctorsWithShifts = response.data.map((doctor) => ({
        ...doctor,
        shifts: doctor.shifts || {}, // Default shifts object if not available
      }));
      setDoctors(doctorsWithShifts); // Update the state with the fetched data
    } catch (error) {
      console.error("Error fetching doctors:", error);
      alert("Error fetching doctor details. Please try again later.");
    } finally {
      setLoading(false); // Set loading to false when data is fetched
    }
  };

  // Fetch shift headings from the backend
  const fetchShifts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/shfit");
      setShifts(response.data); // Assuming the response is an array of shift objects
    } catch (error) {
      console.error("Error fetching shifts:", error);
      alert("Error fetching shift details. Please try again later.");
    }
  };

  // Fetch doctors and shifts on component mount
  useEffect(() => {
    fetchDoctors();
    fetchShifts();
  }, []);

  // Update doctor shift
  const updateDoctorShift = async (id, updatedShifts) => {
    try {
      await axios.put(`http://localhost:3000/api/doctor-shift`, { shifts: updatedShifts });
    } catch (error) {
      console.error("Error updating doctor shifts:", error);
      alert("Error updating doctor shifts. Please try again later.");
    }
  };

  // Handle checkbox change to update shifts
  const handleCheckboxChange = (index, shift) => {
    const updatedDoctors = [...doctors];
    const currentShifts = updatedDoctors[index].shifts;

    // Deselect all shifts first
    const updatedShifts = Object.keys(currentShifts).reduce((acc, shiftName) => {
      acc[shiftName] = false; // Deselect each shift
      return acc;
    }, {});

    // Select the clicked shift
    updatedShifts[shift] = true; // Set the clicked shift to true

    // Update the state with the new shifts and persist the data
    updatedDoctors[index].shifts = updatedShifts;
    setDoctors(updatedDoctors);
    updateDoctorShift(updatedDoctors[index]._id, updatedShifts);
  };

  // Export to Excel
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(doctors);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Doctors");
    XLSX.writeFile(wb, "Doctors_Shifts.xlsx");
  };

  // Export to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({ html: "#doctorShiftTable" });
    doc.save("Doctors_Shifts.pdf");
  };

  if (loading) {
    return <div>Loading doctors...</div>; // Loading state while fetching data
  }

  // Function to format the data for copying
  const formatCopyData = () => {
    return JSON.stringify(doctors, null, 2); // Formatting JSON data with indentation
  };

  // Filter doctors based on search term
  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.surname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h2>Doctor Shift</h2>

      {/* Search Bar */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by Doctor Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update search term
          className="search-bar"
        />
      </div>

      {/* Buttons for Export and Print */}
      <div className="button-container">
        <button onClick={exportToExcel} className="export-btn">
          Export to Excel
        </button>
        <button onClick={exportToPDF} className="export-btn">
          Export to PDF
        </button>
        <CSVLink data={doctors} filename={"Doctors_Shifts.csv"}>
          <button className="export-btn">Export to CSV</button>
        </CSVLink>

        {/* Copy button using react-copy-to-clipboard */}
        <CopyToClipboard text={formatCopyData()}>
          <button className="export-btn">Copy Data</button>
        </CopyToClipboard>

        <button onClick={() => window.print()} className="export-btn">
          Print
        </button>
      </div>

      <table id="doctorShiftTable" className="doctor-table">
        <thead>
          <tr>
            <th>Doctor Name</th>
            {shifts.map((shift) => (
              <th key={shift.name}>{shift.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredDoctors.map((doctor, index) => (
            <tr key={doctor._id}>
              <td>
                {doctor.name} {doctor.surname}
              </td>
              {shifts.map((shift) => (
                <td key={shift.id}>
                  <input
                    type="checkbox"
                    checked={doctor.shifts?.[shift.name] || false} // Use shift.name to access the shift
                    onChange={() => handleCheckboxChange(index, shift.name)} // Toggle shift on checkbox click
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DoctorShiftTable;





