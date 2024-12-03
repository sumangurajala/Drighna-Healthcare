import React, { useState } from "react";
import axios from "axios";

const PostAppointments = () => {
  const [timeDuration, setTimeDuration] = useState("");
  const [shift, setShift] = useState("");
  const [appointmentPriority, setAppointmentPriority] = useState("");
  const [source, setSource] = useState("");
  const [doctor, setDoctor] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearchs = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:3000/api/postappoinments/create", {
        timeDuration,
        doctor,
        shift,
        appointmentPriority,
        source,
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
      <h2>Post Appointments</h2>
      <form onSubmit={handleSearchs}>
        <div>
          <label>Time Duration</label>
          <input
            type="text"
            value={timeDuration}
            onChange={(e) => setTimeDuration(e.target.value)}
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
            <th>Time Duration</th>
            <th>Shift</th>
            <th>Priority</th>
            <th>Doctor</th>
            <th>Source</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id}>
              <td>{appointment.timeDuration || "N/A"}</td>
              <td>{appointment.shift || "N/A"}</td>
              <td>{appointment.appointmentPriority || "N/A"}</td>
              <td>{appointment.doctor || "N/A"}</td>
              <td>{appointment.source || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PostAppointments;
