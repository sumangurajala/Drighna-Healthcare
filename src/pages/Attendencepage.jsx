import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Attendence.css';

const AttendancePage = () => {
  const [specializationFilter, setspecializationFilter] = useState('');
  const [staffData, setStaffData] = useState([]);
  const [attendanceData, setAttendanceData] = useState({});
  const [attendanceDate, setAttendanceDate] = useState(new Date().toISOString().split('T')[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAttendanceChecked, setIsAttendanceChecked] = useState(false); // State for Mark Attendance checkbox

  // Fetch staff data
  const fetchStaffData = async () => {
    if (!specializationFilter) {
      alert('Please select a role to search.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.get(`http://localhost:3000/api/staffrole/${specializationFilter}`);
      setStaffData(response.data);
      const initialAttendance = response.data.reduce((acc, staff) => {
        acc[staff.id] = { status: 'Present', note: '', isHoliday: false };
        return acc;
      }, {});
      setAttendanceData(initialAttendance);
    } catch (error) {
      console.error('Error fetching staff data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAttendanceChange = (staffId, status) => {
    setAttendanceData((prev) => ({
      ...prev,
      [staffId]: {
        ...prev[staffId],
        status,
      },
    }));
  };

  const handleHolidayChange = (staffId, isHoliday) => {
    setAttendanceData((prev) => ({
      ...prev,
      [staffId]: {
        ...prev[staffId],
        isHoliday,
      },
    }));
  };

  const handleNoteChange = (staffId, note) => {
    setAttendanceData((prev) => ({
      ...prev,
      [staffId]: {
        ...prev[staffId],
        note,
      },
    }));
  };

  const updateAttendance = async () => {
    try {
      const payload = {
        date: attendanceDate,
        attendance: Object.keys(attendanceData).map((id) => ({
          staffId: id,
          attendanceTypeId: mapAttendanceStatusToTypeId(attendanceData[id].status),
          remark: attendanceData[id].note,
          isHoliday: attendanceData[id].isHoliday, // Include holiday status
          isActive: 1, // Assuming active by default
        })),
      };

      await axios.post('http://localhost:3000/api/attendance/attendence', payload);
      alert('Attendance updated successfully!');
    } catch (error) {
      console.error('Error updating attendance:', error);
      alert('Failed to update attendance.');
    }
  };

  const mapAttendanceStatusToTypeId = (status) => {
    const statusMap = {
      'Present': 1,
      'Absent': 2,
      'Late': 3,
      'Half day': 4,
    };
    return statusMap[status] || 1; // Default to Present if status is undefined
  };

  const handleAttendanceCheckboxChange = (e) => {
    setIsAttendanceChecked(e.target.checked);
  };

  const handleHolidayCheckboxChange = async (staffId, e) => {
    const isChecked = e.target.checked
  
    // Update state immediately based on the checkbox change
    setAttendanceData((prev) => ({
      ...prev,
      [staffId]: {
        ...prev[staffId],
        isHoliday: isChecked,
      },
    }))
  
    try {
      const response = await fetch(`/api/holidays/attendance-types`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: attendanceDate,  // The selected date
          isHoliday: isChecked,  // Whether the day is marked as holiday
        }),
      })
  
      if (response.ok) {
        const result = await response.json()
        console.log(result.message)  // Log success message from backend
      } else {
        const errorMessage = await response.text()  // Get raw response text in case of error
        console.error('Error:', errorMessage)  // Log error message
      }
    } catch (error) {
      console.error('Error marking holiday:', error.message)  // Handle network or unexpected errors
    }
  }
  
  
  

  useEffect(() => {
    fetchStaffData();
  }, [specializationFilter]);

  return (
    <div className="attendance-container">
      <h2>Staff Attendance</h2>
      <div className="attendance-header">
        <div className="role-select-container">
          <label htmlFor="role">Role:</label>
          <select
            id="role"
            value={specializationFilter}
            onChange={(e) => setspecializationFilter(e.target.value)}
          >
            <option value="">Select</option>
            <option value="Doctor">Doctor</option>
            <option value="Admin">Admin</option>
            <option value="Nurse">Nurse</option>
            <option value="Accountant">Accountant</option>
            <option value="Pathologist">Pathologist</option>
            <option value="Radiologist">Radiologist</option>
          </select>
        </div>
        <div className="date-container">
          <label htmlFor="date">Attendance Date:</label>
          <input
            type="date"
            id="date"
            value={attendanceDate}
            onChange={(e) => setAttendanceDate(e.target.value)}
          />
        </div>
        <button className="search-button" onClick={fetchStaffData}>
          Search
        </button>
      </div>

      <div className="attendance-table-container">
        {isLoading ? (
          <p>Loading...</p>
        ) : staffData.length > 0 ? (
          <table className="attendance-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Staff ID</th>
                <th>Name</th>
                <th>Role</th>
                <th>Staff Attendance</th>
                <th>Mark Holiday</th>
                <th>Note</th>
              </tr>
            </thead>
            <tbody>
              {staffData.map((staff, index) => (
                <tr key={staff.id}>
                  <td>{index + 1}</td>
                  <td>{staff.id}</td>
                  <td>{staff.name} {staff.surname}</td>
                  <td>{staff.specialization}</td>
                  <td>
                    <div className="attendance-options">
                      {['Present', 'Late', 'Absent', 'Half day'].map((status) => (
                        <label key={status}>
                          <input
                            type="radio"
                            name={`attendance-${staff.id}`}
                            value={status}
                            checked={attendanceData[staff.id]?.status === status}
                            onChange={() => handleAttendanceChange(staff.id, status)}
                          />
                          {status}
                        </label>
                      ))}
                    </div>
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={attendanceData[staff.id]?.isHoliday}
                      onChange={(e) => handleHolidayCheckboxChange(staff.id, e)}
                    />
                    <label>Holiday</label>
                  </td>
                  <td>
                    <input
                      type="text"
                      value={attendanceData[staff.id]?.note || ''}
                      onChange={(e) => handleNoteChange(staff.id, e.target.value)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No staff found for the selected role.</p>
        )}
      </div>

      <div className="attendance-actions">
        {/* Checkbox for Mark Attendance */}
        <div className="mark-attendance-checkbox">
          <input
            type="checkbox"
            id="markAttendance"
            checked={isAttendanceChecked}
            onChange={handleAttendanceCheckboxChange}
          />
          <label htmlFor="markAttendance">Mark Attendance</label>
        </div>

        {/* Separate Save button */}
        <button
          className="save-attendance-button"
          onClick={updateAttendance}
          disabled={!isAttendanceChecked} // Disable Save button if checkbox is not ticked
        >
          Save Attendance
        </button>
      </div>
    </div>
  );
};

export default AttendancePage;




