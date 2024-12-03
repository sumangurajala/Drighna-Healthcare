import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DoctorShift = () => {
  const [shifts, setShifts] = useState([]);

  useEffect(() => {
    // Fetch doctor shifts from the API
    axios.get('/api/doctor-shifts')
      .then(response => {
        if (Array.isArray(response.data)) {
          setShifts(response.data);
        } else {
          setShifts([]);  // Fallback to empty array if the response is not an array
        }
      })
      .catch(error => {
        console.error("There was an error fetching the doctor shifts!", error);
        setShifts([]);  // Fallback to empty array on error
      });
  }, []);

  return (
    <div>
      <h3>Doctor Shifts</h3>
      <table>
        <thead>
          <tr>
            <th>Shift Name</th>
            <th>Start Time</th>
            <th>End Time</th>
          </tr>
        </thead>
        <tbody>
          {/* Ensure shifts is defined and is an array before mapping */}
          {shifts && Array.isArray(shifts) && shifts.length > 0 ? (
            shifts.map((shift) => (
              <tr key={shift.id}>
                <td>{shift.name}</td>
                <td>{shift.start_time}</td>
                <td>{shift.end_time}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No shifts available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DoctorShift;
