import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Leavespage.css';
import { useNavigate } from 'react-router-dom';

const LeavesPage = () => {
  const [specializationFilter, setspecializationFilter] = useState(''); // Selected role
  const [leavesData, setLeavesData] = useState([]); // Leaves data
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [searchQuery, setSearchQuery] = useState(''); // Search term
  const [filteredLeaves, setFilteredLeaves] = useState([]); // Filtered leaves

  // Fetch leave data based on the selected role
  const fetchLeavesData = async () => {
    if (!specializationFilter) return;

    setIsLoading(true);
    try {
      const response = await axios.get(`http://localhost:3000/api/staffrole/${specializationFilter.toLowerCase()}`);
      setLeavesData(response.data); // Update leaves data
    } catch (error) {
      console.error('Error fetching leaves data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const navigate = useNavigate();

  // Logic to filter the leaves data based on the search query
  const handleSearch = () => {
    if (!searchQuery) {
      setFilteredLeaves(leavesData); // If no search term, show all data
    } else {
      const results = leavesData.filter((leave) =>
        leave.staff && leave.staff.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredLeaves(results);
    }
  };

  // UseEffect to fetch data when the role filter changes
  useEffect(() => {
    if (specializationFilter) {
      fetchLeavesData();
    }
  }, [specializationFilter]);

  // Trigger search when the search button is clicked
  useEffect(() => {
    setFilteredLeaves(leavesData); // Initialize with all data when the component mounts
  }, [leavesData]);

  return (
    <div className="leaves-container">
      <h2>My Leaves</h2>
      <div className="leaves-header">
        <div className="filter-container">
          <label htmlFor="role">Role:</label>
          <select
            id="role"
            value={specializationFilter}
            onChange={(e) => setspecializationFilter(e.target.value)}
          >
            <option value="">Select</option>
            <option value="Admin">Admin</option>
            <option value="Doctor">Doctor</option>
            <option value="Nurse">Nurse</option>
            <option value="Accountant">Accountant</option>
            <option value="Pathologist">Pathologist</option>
            <option value="Radiologist">Radiologist</option>
          </select>
        </div>
        <div className="buttons-container">
          <button className="add-leave-button" onClick={() => alert('Add Leave clicked')}>
            + Apply Leave
          </button>
          <button className="approve-leave-button" onClick={() => navigate('/Approveleavepage')}>
            Approve Leave Request
          </button>
        </div>
      </div>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch} className="search-button">
          Search
        </button>
      </div>
      <div className="leaves-table-container">
        {isLoading ? (
          <p>Loading...</p>
        ) : filteredLeaves.length > 0 ? (
          <table className="leaves-table">
            <thead>
              <tr>
                <th>Staff</th>
                <th>Leave Type</th>
                <th>Leave Date</th>
                <th>Days</th>
                <th>Apply Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeaves.map((leave, index) => (
                <tr key={index}>
                  <td>{leave.staff}</td>
                  <td>{leave.leaveType}</td>
                  <td>{leave.leaveDate}</td>
                  <td>{leave.days}</td>
                  <td>{leave.applyDate}</td>
                  <td>
                    <span
                      className={`status ${
                        leave.status === 'Approved'
                          ? 'approved'
                          : leave.status === 'Disapproved'
                          ? 'disapproved'
                          : 'pending'
                      }`}
                    >
                      {leave.status}
                    </span>
                  </td>
                  <td>
                    <button className="action-button">...</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No leaves found for the selected role.</p>
        )}
      </div>
    </div>
  );
};

export default LeavesPage;
