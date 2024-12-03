import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddShiftModal from './AddShiftModal'; // Modal component for adding/editing shifts

const Shift = () => {
  const [shifts, setShifts] = useState([]);
  const [form, setForm] = useState({ name: '', timeFrom: '', timeTo: '' });
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editShiftId, setEditShiftId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchShifts();
  }, []);

  // Fetch shifts from API
  const fetchShifts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/global-shifts');
      setShifts(response.data);
    } catch (error) {
      console.error('Error fetching shifts:', error);
      setError('Failed to fetch shifts');
    }
  };

  // Add or edit shift
  const handleSaveShift = async () => {
    if (!form.name || !form.timeFrom || !form.timeTo) {
      setError('All fields are required');
      return;
    }

    try {
      if (editMode) {
        await axios.put(`http://localhost:3000/api/global-shifts/${editShiftId}`, form);
        alert('Shift updated successfully');
      } else {
        await axios.post('http://localhost:3000/api/global-shifts', form);
        alert('Shift added successfully');
      }

      setForm({ name: '', timeFrom: '', timeTo: '' });
      fetchShifts();
      setModalOpen(false);
      setError(null);
      setEditMode(false);
      setEditShiftId(null);
    } catch (error) {
      console.error('Error adding/updating shift:', error);
      setError('Failed to save shift');
    }
  };

  // Delete shift
  const handleDeleteShift = async (id) => {
    if (window.confirm('Are you sure you want to delete this shift?')) {
      try {
        await axios.delete(`http://localhost:3000/api/global-shifts/${id}`);
        alert('Shift deleted successfully');
        fetchShifts();
      } catch (error) {
        console.error('Error deleting shift:', error);
        setError('Failed to delete shift');
      }
    }
  };

  // Edit shift (populate modal)
  const handleEditShift = (shift) => {
    setForm(shift);
    setEditShiftId(shift.id);
    setEditMode(true);
    setModalOpen(true);
  };

  // Filter shifts based on search term
  const filteredShifts = shifts.filter((shift) =>
    shift.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2 className="centered-heading">Shift List</h2>
      <div className="search-add-container">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button
          onClick={() => {
            setModalOpen(true);
            setEditMode(false);
            setForm({ name: '', timeFrom: '', timeTo: '' });
          }}
          className="add-btn"
        >
          Add Shift
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      <table>
        <thead>
          <tr>
            <th>Shift Name</th>
            <th>Time From</th>
            <th>Time To</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredShifts.map((shift) => (
            <tr key={shift.id}>
              <td>{shift.name}</td>
              <td>{shift.start_time}</td>
              <td>{shift.end_time}</td>
              <td>
                <button onClick={() => handleEditShift(shift)} className="edit-btn">Edit</button>
                <button onClick={() => handleDeleteShift(shift.id)} className="delete-btn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for adding/editing a shift */}
      <AddShiftModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveShift}
        fields={[
          { name: 'name', label: 'Shift Name', required: true },
          { name: 'timeFrom', label: 'Time From', type: 'time', required: true },
          { name: 'timeTo', label: 'Time To', type: 'time', required: true }
        ]}
        form={form}
        setForm={setForm}
      />

      <style jsx>{`
        .centered-heading {
          text-align: center;
          color: #007bff;
        }
        .search-add-container {
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
        }
        .search-input {
          width: 50%;
          padding: 8px;
          border-radius: 4px;
          border: 1px solid #ccc;
        }
        .add-btn {
          padding: 5px;
          background-color: #007bff;
          color: white;
          border: none;
          font-weight: bold;
          border-radius: 4px;
          cursor: pointer;
        }
        .add-btn:hover {
          background-color: #0056b3;
        }
        .error-message {
          color: red;
          margin-bottom: 10px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }
        th, td {
          border: 1px solid #ddd;
          padding: 8px;
        }
        th {
          background-color: #f2f2f2;
        }
        .edit-btn {
          margin-right: 10px;
          padding: 5px 10px;
          background-color: #4CAF50;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        .edit-btn:hover {
          background-color: #45a049;
        }
        .delete-btn {
          padding: 5px 10px;
          background-color: red;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        .delete-btn:hover {
          background-color: darkred;
        }
      `}</style>
    </div>
  );
};

export default Shift;
