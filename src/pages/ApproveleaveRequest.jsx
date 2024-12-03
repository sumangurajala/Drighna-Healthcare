import React, { useState, useEffect } from 'react';
import axios from 'axios';


const ApproveLeaveRequest = () => {
  const [role, setRole] = useState(''); // Selected role
  const [leavesData, setLeavesData] = useState([]); // Leaves data
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [search, setSearch] = useState(''); // Search term

  // Fetch leave requests based on the selected role
  const fetchLeavesData = async () => {
    if (!role) return;

    setIsLoading(true);
    try {
      const response = await axios.get(`http://localhost:3000/api/leaveRequests?role=${role}`);
      setLeavesData(response.data); // Update leaves data
    } catch (error) {
      console.error('Error fetching leave requests:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Approve leave request
  const handleApprove = async (id) => {
    try {
      await axios.put(`http://localhost:3000/api/leaveRequests/${id}`, { status: 'Approved' });
      alert('Leave approved successfully!');
      fetchLeavesData(); // Refresh leave data
    } catch (error) {
      console.error('Error approving leave:', error);
      alert('Failed to approve leave.');
    }
  };

  // Disapprove leave request
  const handleDisapprove = async (id) => {
    try {
      await axios.put(`http://localhost:3000/api/leaveRequests/${id}`, { status: 'Disapproved' });
      alert('Leave disapproved successfully!');
      fetchLeavesData(); // Refresh leave data
    } catch (error) {
      console.error('Error disapproving leave:', error);
      alert('Failed to disapprove leave.');
    }
  };

  // Filter leaves based on the search input
  const filteredLeaves = leavesData.filter((leave) =>
    leave.staff.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    if (role) {
      fetchLeavesData();
    }
  }, [role]);

  return (
    <div className="approve-leave-container">
      <h2>Approve Leave Request</h2>
      <div className="leave-header">
        <div className="filter-container">
          <label htmlFor="role">Role:</label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
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
        <button className="add-leave-request" onClick={() => alert('Add Leave Request clicked')}>
          + Add Leave Request
        </button>
      </div>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="leave-table-container">
        {isLoading ? (
          <p>Loading...</p>
        ) : filteredLeaves.length > 0 ? (
          <table className="leave-table">
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
              {filteredLeaves.map((leave) => (
                <tr key={leave.id}>
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
                    <div className="action-buttons">
                      <button
                        className="approve-button"
                        onClick={() => handleApprove(leave.id)}
                      >
                        Approve
                      </button>
                      <button
                        className="disapprove-button"
                        onClick={() => handleDisapprove(leave.id)}
                      >
                        Disapprove
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No leave requests found for the selected role.</p>
        )}
      </div>
    </div>
  );
};

export default ApproveLeaveRequest;
