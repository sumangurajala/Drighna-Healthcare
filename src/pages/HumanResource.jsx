// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './Humanresource.css';
// import { useNavigate } from 'react-router-dom';

// const HumanResource = () => {
//   const [staffData, setStaffData] = useState([]);
//   const [roleFilter, setRoleFilter] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   const fetchStaffData = async () => {
//     setIsLoading(true);
//     try {
//       const response = await axios.get(`http://localhost:3000/api/staffdetails/staffdetails?role=${encodeURIComponent(roleFilter)}`);
//       setStaffData(response.data);
//     } catch (error) {
//       console.error('Error fetching staff details:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };
  

//   // Fetch data when role filter changes
//   useEffect(() => {
//     if (roleFilter) {
//       fetchStaffData();
//     }
//   }, [roleFilter]);

//   const navigate = useNavigate();

//   return (
//     <div className="staff-directory-container">
//       <div className="staff-directory-header">
//         <h2>Staff Directory</h2>
//         <div className="header-buttons">
//           <button className="button" onClick={() =>navigate('/staffid') }>
//             Add Staff
//           </button>
//           <button className="button" onClick={() => alert('Staff Attendance feature coming soon!')}>
//             Staff Attendance
//           </button>
//           <button className="button" onClick={() => alert('Payroll feature coming soon!')}>
//             Payroll
//           </button>
//           <button className="button" onClick={() => alert('Leaves feature coming soon!')}>
//             Leaves
//           </button>
//         </div>
//       </div>

//       <div className="staff-directory-actions">
//         <select
//           className="role-select"
//           value={roleFilter}
//           onChange={(e) => setRoleFilter(e.target.value)}
//         >
//           <option value="">Select Role</option>
//           <option value="Admin">Admin</option>
//           <option value="Accountant">Accountant</option>
//           <option value="Doctor">Doctor</option>
//           <option value="pharmacist">Pharmacist</option>
//           <option value="Pathologist">Pathologist</option>
//           <option value="Radiologist">Radiologist</option>
//           <option value="Nurse">Nurse</option>
//           <option value="Theatre Staff">Theatre Staff</option>
//         </select>
//         <button className="search-button" onClick={fetchStaffData}>
//          search
//         </button>
//       </div>

//       {isLoading ? (
//         <p>Loading...</p>
//       ) : staffData.length > 0 ? (
//         <div className="staff-display">
//           {staffData.map((staff) => (
//             <div key={staff.id} className="staff-card">
//               <div className="staff-details">
//                 <h3>
//                   {staff.first_name} {staff.last_name}
//                 </h3>
//                 <p>ID: {staff.staff_id}</p>
//                 <p>Role: {staff.role}</p>
//                 {staff.department && <p>Department: {staff.department}</p>}
//                 {staff.specialist && <p>Specialist: {staff.specialist}</p>}
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p>No staff found for the selected role.</p>
//       )}
//     </div>
//   );
// };

// export default HumanResource;


// import React, { useState } from 'react';
// import axios from 'axios';
// import './Humanresource.css';
// import { useNavigate } from 'react-router-dom';

// const HumanResource = () => {
//   const [roleFilter, setRoleFilter] = useState(''); // Selected role
//   const [staffData, setStaffData] = useState([]); // Staff details
//   const [isLoading, setIsLoading] = useState(false); // Loading state
//   const [error, setError] = useState(''); // Error state
//   const [showData, setShowData] = useState(false); // Control data display
//   const [selectedStaff, setSelectedStaff] = useState(null); // Selected staff for viewing/editing details
//   const [isEditing, setIsEditing] = useState(false); // Toggle edit mode

//   const navigate = useNavigate();

//   // Fetch staff data based on the selected role
//   const fetchStaffData = async () => {
//     if (!roleFilter) {
//       setError('Please select a role to search.');
//       return;
//     }

//     setIsLoading(true);
//     setError('');
//     try {
//       const response = await axios.get(`http://localhost:3000/api/staff/${roleFilter.toLowerCase()}`);
//       setStaffData(response.data); // Update staff data state
//       setShowData(true); // Show the data section
//     } catch (err) {
//       console.error('Error fetching staff details:', err);
//       setError('Failed to fetch staff details. Please try again later.');
//     } finally {
//       setIsLoading(false); // Hide loading indicator
//     }
//   };

//   // Handle Save after Editing
//   const handleSave = async () => {
//     try {
//       await axios.put(`http://localhost:3000/api/staff/${selectedStaff.staff_id}`, selectedStaff);
//       alert('Staff details updated successfully');
//       setIsEditing(false); // Exit edit mode
//       fetchStaffData(); // Refresh staff list
//     } catch (err) {
//       console.error('Error updating staff details:', err);
//       alert('Failed to update staff details. Please try again later.');
//     }
//   };

//   // Handle Delete
//   const handleDelete = async (staffId) => {
//     const confirmDelete = window.confirm(
//       `Are you sure you want to delete staff with ID: ${staffId}?`
//     );
//     if (confirmDelete) {
//       try {
//         await axios.delete(`http://localhost:3000/api/staff/${staffId}`);
//         alert('Staff deleted successfully');
//         fetchStaffData(); // Refresh the staff list
//       } catch (err) {
//         console.error('Error deleting staff:', err);
//         alert('Failed to delete staff. Please try again later.');
//       }
//     }
//   };

//   return (
//     <div className="staff-directory-container">
//       <div className="staff-directory-header">
//         <h2>Staff Directory</h2>
//         <div className="header-buttons">
//           <button className="button" onClick={() => navigate('/staffid')}>
//             Add Staff
//           </button>
//           <button className="button" onClick={() => navigate('/Attendencepage')}>
//             Staff Attendance
//           </button>
//           <button className="button" onClick={() => navigate('/payrollpage')}>
//             Payroll
//           </button>
//           <button className="button" onClick={() => navigate('/leavespage')}>
//             Leaves
//           </button>
//         </div>
//       </div>

//       <div className="staff-directory-actions">
//         <label htmlFor="role-select" className="role-label">
//           Filter by Role:
//         </label>
//         <select
//           id="role-select"
//           className="role-select"
//           value={roleFilter}
//           onChange={(e) => setRoleFilter(e.target.value)}
//         >
//           <option value="">Select Role</option>
//           <option value="Admin">Admin</option>
//           <option value="Accountant">Accountant</option>
//           <option value="Doctor">Doctor</option>
//           <option value="Pharmacist">Pharmacist</option>
//           <option value="Pathologist">Pathologist</option>
//           <option value="Radiologist">Radiologist</option>
//           <option value="Nurse">Nurse</option>
//           <option value="Theatrestaff">Theatrestaff</option>
//         </select>
//         <button className="search-button" onClick={fetchStaffData}>
//           Search
//         </button>
//       </div>

//       {isLoading ? (
//         <p className="loading-text">Loading...</p>
//       ) : error ? (
//         <p className="error-text">{error}</p>
//       ) : showData ? (
//         selectedStaff ? (
//           <div className="staff-details-view">
//             {isEditing ? (
//               <>
//                 <h3>Edit Staff Details</h3>
//                 {Object.entries(selectedStaff).map(([key, value]) => (
//                   <div key={key} className="edit-field">
//                     <label htmlFor={key}>{key.replace(/_/g, ' ')}:</label>
//                     <input
//                       id={key}
//                       type="text"
//                       value={value || ''}
//                       onChange={(e) =>
//                         setSelectedStaff((prev) => ({ ...prev, [key]: e.target.value }))
//                       }
//                       disabled={key === 'staff_id'} // Disable editing for ID
//                     />
//                   </div>
//                 ))}
//                 <button className="button" onClick={handleSave}>
//                   Save
//                 </button>
//                 <button className="button" onClick={() => setIsEditing(false)}>
//                   Cancel
//                 </button>
//               </>
//             ) : (
//               <>
//                 <h3>
//                   {selectedStaff.first_name} {selectedStaff.last_name}
//                 </h3>
//                 <table>
//                   <tbody>
//                     {Object.entries(selectedStaff).map(([key, value]) => (
//                       <tr key={key}>
//                         <td>
//                           <strong>{key.replace(/_/g, ' ')}:</strong>
//                         </td>
//                         <td>{value || 'N/A'}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//                 <button className="button" onClick={() => setIsEditing(true)}>
//                   Edit
//                 </button>
//                 <button
//                   className="button delete-button"
//                   onClick={() => handleDelete(selectedStaff.staff_id)}
//                 >
//                   Delete
//                 </button>
//                 <button className="button" onClick={() => setSelectedStaff(null)}>
//                   Back
//                 </button>
//               </>
//             )}
//           </div>
//         ) : (
//           <div className="staff-display">
//             {staffData.map((staff, index) => (
//               <div key={index} className="staff-card">
//                 <div className="staff-image-placeholder">No Image Available</div>
//                 <div className="staff-details">
//                   <h3>
//                     {staff.first_name} {staff.last_name}
//                   </h3>
//                   <p>ID: {staff.staff_id}</p>
//                   <p>Role: {staff.role}</p>
//                   <button
//                     className="view-button"
//                     onClick={() => setSelectedStaff(staff)}
//                   >
//                     View
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )
//       ) : null}
//     </div>
//   );
// };

// export default HumanResource;

import React, { useState } from 'react';
import axios from 'axios';
import './Humanresource.css';
import { useNavigate } from 'react-router-dom';

const HumanResource = () => {
  const [specializationFilter, setspecializationFilter] = useState('');
  const [staffData, setStaffData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showData, setShowData] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showListView, setShowListView] = useState(false);

  const navigate = useNavigate();

  // Fetch staff data based on the selected role
  const fetchStaffData = async () => {
    if (!specializationFilter || typeof specializationFilter !== 'string' || specializationFilter.trim() === '') {
      setError('Please select a valid role to search.');
      return;
    }
  
    setIsLoading(true);
    setError('');
    try {
      const response = await axios.get(`http://localhost:3000/api/staffrole/${specializationFilter}`);
      setStaffData(response.data);
      setShowData(true);
    } catch (err) {
      console.error('Error fetching staff details:', err);
      setError('Failed to fetch staff details. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };
  
  

  // Delete a staff member
  const handleDelete = async (staffId) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete staff with ID: ${staffId}?`);
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:3000/api/staff/${staffId}`);
        alert('Staff deleted successfully');
        fetchStaffData();
      } catch (err) {
        console.error('Error deleting staff:', err);
        alert('Failed to delete staff. Please try again later.');
      }
    }
  };
  const handleSave = async () => {
    if (!selectedStaff) {
      setError('No staff selected to save.');
      return;
    }

    setIsLoading(true);
    try {
      // Make API request to save the updated staff details
      await axios.put(`http://localhost:3000/api/staff/${selectedStaff.staff_id}`, selectedStaff);

      alert('Staff details updated successfully');
      setIsEditing(false); // Exit editing mode
      fetchStaffData(); // Fetch updated staff data
    } catch (err) {
      console.error('Error saving staff details:', err);
      setError('Failed to save staff details. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="staff-directory-container">
      <div className="staff-directory-header">
        <h2>Staff Directory</h2>
        <div className="header-buttons">
          <button className="button" onClick={() => navigate('/staffid')}>Add Staff</button>
          <button className="button" onClick={() => navigate('/Attendencepage')}>Staff Attendance</button>
          <button className="button" onClick={() => navigate('/payrollpage')}>Payroll</button>
          <button className="button" onClick={() => navigate('/leavespage')}>Leaves</button>
          <button className="button toggle-list-view" onClick={() => setShowListView((prev) => !prev)}>
            {showListView ? 'Hide List View' : 'Show List View'}
          </button>
        </div>
      </div>

      <div className="staff-directory-actions">
        <label htmlFor="role-select" className="role-label">Filter by Role:</label>
        <select
          id="role-select"
          className="role-select"
          value={specializationFilter}
          onChange={(e) => setspecializationFilter(e.target.value)}
        >
          <option value="">Select Role</option>
          <option value="Admin">Admin</option>
          <option value="Accountant">Accountant</option>
          <option value="Doctor">Doctor</option>
          <option value="Pharmacist">Pharmacist</option>
          <option value="Pathologist">Pathologist</option>
          <option value="Radiologist">Radiologist</option>
          <option value="Nurse">Nurse</option>
          <option value="Theatrestaff">Theatrestaff</option>
        </select>
        <button className="search-button" onClick={fetchStaffData}>Search</button>
      </div>

      {isLoading ? (
        <p className="loading-text">Loading...</p>
      ) : error ? (
        <p className="error-text">{error}</p>
      ) : showListView ? (
        <div className="staff-list-view">
          <h3>Staff List</h3>
          <table className="staff-table">
            <thead>
              <tr>
                {staffData.length > 0 &&
                  Object.keys(staffData[0]).map((key) => <th key={key}>{key.replace(/_/g, ' ')}</th>)}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {staffData.map((staff, index) => (
                <tr key={index}>
                  {Object.values(staff).map((value, i) => <td key={i}>{value || 'N/A'}</td>)}
                  <td>
                    <button
                      className="action-button edit-button"
                      onClick={() => {
                        setSelectedStaff(staff);
                        setIsEditing(true);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="action-button delete-button"
                      onClick={() => handleDelete(staff.staff_id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : showData ? (
        selectedStaff ? (
          <div className="staff-details-view">
            {isEditing ? (
              <>
                <h3>Edit Staff Details</h3>
                {Object.entries(selectedStaff).map(([key, value]) => (
                  <div key={key} className="edit-field">
                    <label htmlFor={key}>{key.replace(/_/g, ' ')}:</label>
                    <input
                      id={key}
                      type="text"
                      value={value || ''}
                      onChange={(e) =>
                        setSelectedStaff((prev) => ({ ...prev, [key]: e.target.value })) }
                      disabled={key === 'staff_id'}
                    />
                  </div>
                ))}
                <button className="button" onClick={handleSave}>Save</button>
                <button className="button" onClick={() => setIsEditing(false)}>Cancel</button>
              </>
            ) : (
              <>
                <h3>
                  {selectedStaff.first_name} {selectedStaff.last_name}
                </h3>
                <table>
                  <tbody>
                    {Object.entries(selectedStaff).map(([key, value]) => (
                      <tr key={key}>
                        <td><strong>{key.replace(/_/g, ' ')}:</strong></td>
                        <td>{value || 'N/A'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button className="button" onClick={() => setIsEditing(true)}>Edit</button>
                <button className="button delete-button" onClick={() => handleDelete(selectedStaff.staff_id)}>
                  Delete
                </button>
                <button className="button" onClick={() => setSelectedStaff(null)}>Back</button>
              </>
            )}
          </div>
        ) : (
          <div className="staff-display">
            {staffData.map((staff, index) => (
              <div key={index} className="staff-card">
                <div className="staff-image-placeholder">No Image Available</div>
                <div className="staff-details">
                  <h3>
                    {staff.first_name} {staff.last_name}
                  </h3>
                  <p>ID: {staff.staff_id}</p>
                  <p>Role: {staff.specialization}</p>
                  <button
                    className="view-button"
                    onClick={() => setSelectedStaff(staff)}
                  >
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        )
      ) : null}
    </div>
  );
};

export default HumanResource;
