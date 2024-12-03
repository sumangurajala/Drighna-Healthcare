import React, { useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";


const AppointmentReport = () => {
  const [patient_name, setPatientName] = useState("");
  const [appointment_date, setAppointmentDate] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [doctor, setDoctor] = useState("");
  const [source, setSource] = useState("");
  const [fees, setFees] = useState("");
  const [status, setStatus] = useState("");
  const [timeDuration, setTimeDuration] = useState("");
  const [shift, setShift] = useState("");
  const [appointmentPriority, setAppointmentPriority] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.get("http://localhost:3000/api/reportappoinments", {
        params: {
          patient_name,
          appointment_date,
          phone,
          gender,
          doctor,
          source,
          fees,
          status,
        },
      });

      if (response.data.length > 0) {
        setAppointments(response.data);
      } else {
        setError("No appointments found for the selected filters.");
      }
    } catch (err) {
      setError("Error fetching appointments.");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
  
    try {
      console.log("Data being sent:", {
        timeDuration,
        doctor,
        shift,
        appointmentPriority,
        source,
      }); // Debug log for sent data
  
      const response = await axios.post("http://localhost:3000/api/postappoinments/create", {
        timeDuration,
        doctor,
        shift,
        appointmentPriority,
        source,
      });
  
      if (response.status === 201) {
        alert("Appointment saved successfully!");
        console.log("Response from server:", response.data); // Debug log for response
      } else {
        setError("Failed to save appointment. Please try again.");
        console.error("Error status:", response.status); // Log error response
      }
    } catch (err) {
      setError("Error saving appointment.");
      console.error("Error details:", err);
    } finally {
      setLoading(false);
    }
  };

// Function to handle printing
const printPage = () => {
  window.print();
};


  const importToCSV = () => {
    const headers = ["Patient Name", "Date", "Phone", "Gender", "Doctor", "Source", "Fees", "Status"];
    const rows = appointments.map((appointment) => [
      appointment.patient_name,
      new Date(appointment.appointment_date).toLocaleDateString(),
      appointment.phone,
      appointment.gender,
      appointment.doctor,
      appointment.source,
      appointment.fees,
      appointment.status,
    ]);
  
    const csvContent = [headers, ...rows].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
  
    const link = document.createElement("a");
    link.href = url;
    link.download = "appointments.csv";
    link.click();
  };
  
  const importToExcel = () => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(
      appointments.map((appointment) => ({
        "Patient Name": appointment.patient_name,
        "Date": new Date(appointment.appointment_date).toLocaleDateString(),
        "Phone": appointment.phone,
        "Gender": appointment.gender,
        "Doctor": appointment.doctor,
        "Source": appointment.source,
        "Fees": appointment.fees,
        "Status": appointment.status,
      }))
    );
  
    XLSX.utils.book_append_sheet(workbook, worksheet, "Appointments");
    XLSX.writeFile(workbook, "appointments.xlsx");
  };
  

  const importToPDF = () => {
    const doc = new jsPDF();
    const headers = ["Patient Name", "Date", "Phone", "Gender", "Doctor", "Source", "Fees", "Status"];
    const rows = appointments.map((appointment) => [
      appointment.patient_name,
      new Date(appointment.appointment_date).toLocaleDateString(),
      appointment.phone,
      appointment.gender,
      appointment.doctor,
      appointment.source,
      appointment.fees,
      appointment.status,
    ]);
  
    doc.autoTable({
      head: [headers],
      body: rows,
    });
  
    doc.save("appointments.pdf");
  };

  const copyToClipboard = () => {
    const headers = ["Patient Name", "Date", "Phone", "Gender", "Doctor", "Source", "Fees", "Status"];
    const rows = appointments.map((appointment) => [
      appointment.patient_name,
      new Date(appointment.appointment_date).toLocaleDateString(),
      appointment.phone,
      appointment.gender,
      appointment.doctor,
      appointment.source,
      appointment.fees,
      appointment.status,
    ]);
  
    const tableContent = [headers, ...rows].map((row) => row.join("\t")).join("\n");
  
    navigator.clipboard.writeText(tableContent).then(() => {
      alert("Copied to clipboard!");
    });
  };
  
  
  return (
    <div className="report-container">

<div className="button-container">
  <button onClick={importToCSV} className="btn btn-success btn-sm me-2">
    Export to CSV
  </button>
  <button onClick={importToExcel} className="btn btn-warning btn-sm me-2">
    Export to Excel
  </button>
  <button onClick={importToPDF} className="btn btn-danger btn-sm me-2">
    Export to PDF
  </button>
  <button onClick={printPage} className="btn btn-info btn-sm me-2">
    Print
  </button>
  <button onClick={copyToClipboard} className="btn btn-secondary btn-sm">
    Copy to Clipboard
  </button>
</div>

      {/* Form for GET filters */}
      <form onSubmit={handleSave} className="form-container">
        <div className="form-row">
          <div className="form-group">
            <label>Time Duration</label>
            <input
              type="text"
              value={timeDuration}
              onChange={(e) => setTimeDuration(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Shift</label>
            <input
              type="text"
              value={shift}
              onChange={(e) => setShift(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Appointment Priority</label>
            <input
              type="text"
              value={appointmentPriority}
              onChange={(e) => setAppointmentPriority(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Doctor</label>
            <input
              type="text"
              value={doctor}
              onChange={(e) => setDoctor(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Source</label>
            <select value={source} onChange={(e) => setSource(e.target.value)}>
              <option value="">Select</option>
              <option value="Referral">Referral</option>
              <option value="Walk-In">Walk-In</option>
              <option value="Online">Online</option>
            </select>
          </div>
        </div>
        <button type="submit" className="search-button" disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {/* Save Button */}
      <button
  onClick={handleSearch}
  className="save-button"
  disabled={loading}// Disable button while saving
>
  {loading ? "Saving..." : "Save"}
</button>


      {error && <p className="error">{error}</p>}

      {/* Table Display */}
      <div className="table-container">
        <table className="report-table">
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Date</th>
              <th>Phone</th>
              <th>Gender</th>
              <th>Doctor</th>
              <th>Source</th>
              <th>Fees</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length > 0 ? (
              appointments.map((appointment) => (
                <tr key={appointment.id}>
                  <td>{appointment.patient_name || "N/A"}</td>
                  <td>{new Date(appointment.appointment_date).toLocaleDateString() || "N/A"}</td>
                  <td>{appointment.phone || "N/A"}</td>
                  <td>{appointment.gender || "N/A"}</td>
                  <td>{appointment.doctor || "N/A"}</td>
                  <td>{appointment.source || "N/A"}</td>
                  <td>{appointment.fees || "N/A"}</td>
                  <td>{appointment.status || "N/A"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="no-data">
                  No data available in table
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppointmentReport;
