import React, { useState } from "react";
import axios from "axios";

const GetAppointments = () => {
  const [patient_name, setPatientName] = useState("");
  const [appointment_date, setAppointmentDate] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [doctor, setDoctor] = useState("");
  const [source, setSource] = useState("");
  const [fees, setFees] = useState("");
  const [status, setStatus] = useState("");
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

  return (
    <div>
      <h2>Get Appointments</h2>
      <form onSubmit={handleSearch}>
        <div>
          <label>Patient Name</label>
          <input
            type="text"
            value={patient_name}
            onChange={(e) => setPatientName(e.target.value)}
          />
        </div>
        {/* Add other form fields */}
        <button type="submit" disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <table border="1">
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
          {appointments.map((appointment) => (
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
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GetAppointments;
