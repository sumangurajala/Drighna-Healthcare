import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Payroll.css'; // Custom CSS file for styling
import { useNavigate } from 'react-router-dom';

const Payroll = () => {
  const [specializationFilter, setspecializationFilter] = useState(''); // Selected role
  const [monthFilter, setMonthFilter] = useState(''); // Selected month
  const [yearFilter, setYearFilter] = useState(''); // Selected year
  const [staffData, setStaffData] = useState([]); // Staff data for payroll
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [error, setError] = useState(''); // Error message for API failures
  const [search, setSearch] = useState(''); // Search term for filtering
  const [payrollStatus, setPayrollStatus] = useState(''); // Payroll status message
  const [showNotification, setShowNotification] = useState(false); // Visibility of notification box
  const [notificationContent, setNotificationContent] = useState(''); // Content of the notification
  const navigate = useNavigate();

  const imageUrl = "https://your-image-url.com/image.jpg"; // Replace with the actual URL of your image

  // Fetch payroll data based on the selected role, month, and year
  const fetchPayrollData = async () => {
    if (!specializationFilter || !monthFilter || !yearFilter) {
      alert('Please select role, month, and year to search.');
      return;
    }

    setIsLoading(true);
    setError(''); // Clear any previous error messages
    try {
      const response = await axios.get(
        `http://localhost:3000/api/staffrole/${specializationFilter}`
      );
      console.log('Payroll API Response:', response.data); // Debugging
      if (response.data && response.data.length > 0) {
        setStaffData(response.data);
      } else {
        setStaffData([]);
        setError('No data found for the selected criteria.');
      }
    } catch (err) {
      console.error('Error fetching payroll data:', err);
      setError('Failed to fetch payroll data. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  // Generate payroll for a specific staff member
  const generatePayroll = async (staffId, staffName) => {
    setPayrollStatus(''); // Clear any previous status messages
    setShowNotification(true); // Show notification box
    setNotificationContent(`Generating payroll for ${staffName}...`); // Set notification content

    try {
      const response = await axios.post(`http://localhost:3000/api/Payroll/salary`, {
        staffId,
        month: monthFilter,
        year: yearFilter,
      });

      if (response.status === 200) {
        const payrollDetails = response.data; // Assuming the response contains salary, bonus, deductions, etc.
        const totalPay = payrollDetails.salary + payrollDetails.bonus - payrollDetails.deductions;

        // Include image and payroll details in the notification
        setNotificationContent(
          <div>
            <img src={imageUrl} alt="Payroll Image" style={{ width: '100px', marginBottom: '10px' }} />
            <p>
              Payroll for {staffName} has been generated!
              <br />
              Salary: ${payrollDetails.salary}
              <br />
              Bonus: ${payrollDetails.bonus}
              <br />
              Deductions: ${payrollDetails.deductions}
              <br />
              Total Pay: ${totalPay}
            </p>
          </div>
        );
      } else {
        setNotificationContent('Failed to generate payroll. Please try again.');
      }
    } catch (err) {
      console.error('Error generating payroll:', err);
      setNotificationContent('Failed to generate payroll. Please try again later.');
    } finally {
      setTimeout(() => {
        setShowNotification(false);
      }, 5000); // Hide notification after 5 seconds
    }
  };

  // Filter staff data based on the search term
  const filteredStaff = staffData.filter((staff) =>
    staff.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="payroll-container">
      {/* Notification box */}
      {showNotification && (
        <div className="notification-box">
          {notificationContent}
        </div>
      )}

      <h2>Payroll</h2>

      {/* Filters */}
      <div className="payroll-filters">
        <div className="filter-item">
          <label htmlFor="role">Role:</label>
          <select
            id="role"
            value={specializationFilter}
            onChange={(e) => setspecializationFilter(e.target.value)}
          >
            <option value="">Select Role</option>
            <option value="Admin">Admin</option>
            <option value="Doctor">Doctor</option>
            <option value="Nurse">Nurse</option>
            <option value="Accountant">Accountant</option>
            <option value="Pathologist">Pathologist</option>
            <option value="Radiologist">Radiologist</option>
          </select>
        </div>
        
        <div className="filter-item">
          <label htmlFor="month">Month:</label>
          <select
            id="month"
            value={monthFilter}
            onChange={(e) => setMonthFilter(e.target.value)}
          >
            <option value="">Select Month</option>
            <option value="01">January</option>
            <option value="02">February</option>
            <option value="03">March</option>
            <option value="04">April</option>
            <option value="05">May</option>
            <option value="06">June</option>
            <option value="07">July</option>
            <option value="08">August</option>
            <option value="09">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
        </div>

        <div className="filter-item">
          <label htmlFor="year">Year:</label>
          <select
            id="year"
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
          >
            <option value="">Select Year</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
          </select>
        </div>

        <button className="search-button" onClick={fetchPayrollData}>
          Search
        </button>
      </div>

      {/* Search bar */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search staff by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Payroll status or table */}
      <div className="payroll-status">
        {payrollStatus && <p className="status-message">{payrollStatus}</p>}
      </div>

      {/* Table or error messages */}
      <div className="payroll-table-container">
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="error-text">{error}</p>
        ) : staffData.length > 0 ? (
          <table className="payroll-table">
            <thead>
              <tr>
                <th>Staff ID</th>
                <th>Name</th>
                <th>Role</th>
                <th>Department</th>
                <th>Designation</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredStaff.map((staff) => (
                <tr key={staff.id}>
                  <td>{staff.id || 'N/A'}</td>
                  <td>{staff.name || 'N/A'} {staff.surname}</td>
                  <td>{staff.specialization || 'N/A'}</td>
                  <td>{staff.department || 'N/A'}</td>
                  <td>{staff.designation || 'N/A'}</td>
                  <td>{staff.phone || 'N/A'}</td>
                  <td>
                    <button onClick={() => generatePayroll(staff.id, staff.name)}>
                      Generate Payroll
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No staff data available.</p>
        )}
      </div>
    </div>
  );
};

export default Payroll;

