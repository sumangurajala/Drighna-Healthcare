import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ItemStoreModal from './ItemStoreModal';

const ItemStore = () => {
  const [stores, setStores] = useState([]);
  const [form, setForm] = useState({ item_store: '', code: '', description: '' });
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editStoreId, setEditStoreId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchStores();
  }, []);

  // Fetch item stores from API
  const fetchStores = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/item-stores');
      setStores(response.data);
    } catch (error) {
      console.error('Error fetching stores:', error);
      setError('Failed to fetch stores');
    }
  };

  // Add or edit store
  const handleSaveStore = async () => {
    if (!form.item_store) {
      setError('Store Name is required');
      return;
    }
    try {
      if (editMode) {
        await axios.put(`http://localhost:3000/api/item-stores/${editStoreId}`, form);
        alert('Store updated successfully');
      } else {
        await axios.post('http://localhost:3000/api/item-stores/add', form);
        alert('Store added successfully');
      }

      setForm({ item_store: '', code: '', description: '' });
      fetchStores();
      setModalOpen(false);
      setError(null);
      setEditMode(false);
      setEditStoreId(null);
    } catch (error) {
      console.error('Error saving store:', error);
      setError('Failed to save store');
    }
  };

  // Delete store
  const handleDeleteStore = async (id) => {
    if (window.confirm('Are you sure you want to delete this store?')) {
      try {
        await axios.delete(`http://localhost:3000/api/item-stores/${id}`);
        alert('Store deleted successfully');
        fetchStores();
      } catch (error) {
        console.error('Error deleting store:', error);
        setError('Failed to delete store');
      }
    }
  };

  // Edit store (populate modal)
  const handleEditStore = (store) => {
    setForm(store);
    setEditStoreId(store.id);
    setEditMode(true);
    setModalOpen(true);
  };

  // Filter stores based on search term (search by store name or stock code)
  const filteredStores = stores.filter(store =>
    store.item_store.toLowerCase().includes(searchTerm.toLowerCase()) ||
    store.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Prevent non-numeric input for Item Stock Code
  const handleCodeChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) { // Accept only numbers
      setForm({ ...form, code: value });
    }
  };

  return (
    <div>
      <h2 className="centered-heading">Item Store List</h2>
      <div className="search-add-container">
        <input
          type="text"
          placeholder="Search by Store Name or Stock Code..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button
          onClick={() => {
            setModalOpen(true);
            setEditMode(false);
            setForm({ item_store: '', code: '', description: '' });
          }}
          className="add-btn"
        >
          Add Item Store
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      <table>
        <thead>
          <tr>
            <th>Store Name</th>
            <th>Stock Code</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredStores.map((store) => (
            <tr key={store.id}>
              <td>
                <div
                  onMouseEnter={(e) => {
                    const hoverDiv = e.currentTarget.querySelector('.hover-description');
                    hoverDiv.style.display = 'block';
                  }}
                  onMouseLeave={(e) => {
                    const hoverDiv = e.currentTarget.querySelector('.hover-description');
                    hoverDiv.style.display = 'none';
                  }}
                >
                  {store.item_store}
                  <div className="hover-description">{store.description}</div>
                </div>
              </td>
              <td>{store.code}</td>
              <td>
                <button onClick={() => handleEditStore(store)} className="edit-btn">Edit</button>
                <button onClick={() => handleDeleteStore(store.id)} className="delete-btn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for adding/editing a store */}
      <ItemStoreModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveStore}
        form={form}
        setForm={setForm}
        handleCodeChange={handleCodeChange} // Pass this to handle numeric input
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
          padding: 6px 12px;
          background-color: #007bff;
          color: white;
          border: none;
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
        .hover-description {
          display: none;
          position: absolute;
          background-color: #fff;
          padding: 5px;
          border: 1px solid #ddd;
        }
      `}</style>
    </div>
  );
};

export default ItemStore;
