import React, { useState, useEffect } from "react";
import axios from "axios";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ShiftTable = () => {
  const [shifts, setShifts] = useState([]);
  const [newShift, setNewShift] = useState({ name: "", timeFrom: "", timeTo: "" });
  const [notification, setNotification] = useState({ message: "", type: "" });

  // Fetch shifts from the backend
  useEffect(() => {
    const fetchShifts = async () => {
      const response = await axios.get("http://localhost:3000/api/shfit");
      setShifts(response.data);
    };

    fetchShifts();
  }, []);

  // Handle input changes for new shift
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewShift({ ...newShift, [name]: value });
  };

  const addShift = async () => {
    console.log('New shift data:', newShift); // Log data before sending
  
    // Map frontend fields to backend fields
    const shiftData = {
      name: newShift.name,
      start_time: newShift.timeFrom,  // Map timeFrom to start_time
      end_time: newShift.timeTo,      // Map timeTo to end_time
      date_created: newShift.date_created
    };

    console.log("shiftData*********************",shiftData);
  
    try {
      // Send POST request to the backend with the mapped data
      const response = await axios.post('http://localhost:3000/api/shfit/shifts', shiftData);
      console.log('Shift added:', response.data);
  
      // Add the newly created shift to the state
      setShifts([...shifts, { ...response.data.shift }]);
      setNewShift({ name: '', timeFrom: '', timeTo: '', date_created: '' });
      setNotification({ message: 'Shift added successfully!', type: 'success' });
    } catch (error) {
      // Enhanced error logging
      console.error('Error adding shift:', error);
  
      // If the error has a response (from Axios), log the response data
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
  
        // Set notification with the error message from the server response
        setNotification({
          message: `Error adding shift: ${error.response.data.message || error.message}`,
          type: 'error',
        });
      } else {
        // Handle cases where the response is not available
        console.error('No response from server:', error);
        setNotification({
          message: 'Error adding shift: No response from server.',
          type: 'error',
        });
      }
    }
  };
  
  
  
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>Shift Management</h2>

      {/* Notification Box */}
      {notification.message && (
        <div
          style={{
            backgroundColor: notification.type === "success" ? "green" : "red",
            color: "white",
            padding: "10px",
            marginBottom: "15px",
            borderRadius: "5px",
          }}
        >
          {notification.message}
        </div>
      )}

      <h3>Shifts</h3>
      {/* Shifts Table */}
      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "20px" }}>
        <thead>
          <tr>
            <th>Shift Name</th>
            <th>Time From</th>
            <th>Time To</th>
          </tr>
        </thead>
        <tbody>
          {shifts.map((shift) => (
            <tr key={shift.id}>
              <td>{shift.name}</td>
              <td>{shift.timeFrom}</td>
              <td>{shift.timeTo}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Simple Plus Button to trigger Add Shift Form */}
      <button
        onClick={() => setNotification({ message: "Click to add a new shift.", type: "info" })}
        style={{
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          padding: "10px 20px",
          fontSize: "24px",
          borderRadius: "50%",
          width: "50px",
          height: "50px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          marginBottom: "20px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        +
      </button>

      {/* Add Shift Form */}
      {notification.type === "info" && (
        <div style={{ marginTop: "20px" }}>
          <h3>Add Shift</h3>
          <div style={{ marginBottom: "10px" }}>
            <input
              type="text"
              name="name"
              placeholder="Shift Name"
              value={newShift.name}
              onChange={handleInputChange}
              style={{
                padding: "10px",
                margin: "5px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                width: "100%",
                marginBottom: "10px",
              }}
            />
            <input
              type="time"
              name="timeFrom"
              placeholder="Time From"
              value={newShift.timeFrom}
              onChange={handleInputChange}
              style={{
                padding: "10px",
                margin: "5px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                width: "100%",
                marginBottom: "10px",
              }}
            />
            <input
              type="time"
              name="timeTo"
              placeholder="Time To"
              value={newShift.timeTo}
              onChange={handleInputChange}
              style={{
                padding: "10px",
                margin: "5px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                width: "100%",
                marginBottom: "10px",
              }}
            />
            <button
              onClick={addShift}
              style={{
                backgroundColor: "#4CAF50", // Green color
                color: "white",
                padding: "10px 20px",
                fontSize: "16px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                transition: "background-color 0.3s ease",
              }}
            >
              Add Shift
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShiftTable;



