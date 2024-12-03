import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ItemSupplierModal from './ItemSupplierModal';

const ItemSupplier = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [form, setForm] = useState({
    item_supplier: '',
    phone: '',
    email: '',
    address: '',
    contact_person_name: '',
    contact_person_phone: '',
    contact_person_email: '',
    description: ''
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editSupplierId, setEditSupplierId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchSuppliers();
  }, []);

  // Fetch suppliers from API
  const fetchSuppliers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/item-suppliers');
      setSuppliers(response.data);
    } catch (error) {
      console.error('Error fetching suppliers:', error);
      setError('Failed to fetch suppliers');
    }
  };

  // Add or update supplier
  const handleSaveSupplier = () => {
    if (!form.item_supplier) {
      alert('Supplier Name is required');
      return;
    }
    if (editMode) {
      // Update existing supplier
      axios.put(`http://localhost:3000/api/item-suppliers/${editSupplierId}`, form)
        .then(() => {
          alert('Supplier updated successfully');
          fetchSuppliers(); // Refresh the list
          setModalOpen(false); // Close modal
        })
        .catch(error => {
          console.error('Error updating supplier:', error);
          alert('Failed to update supplier');
        });
    } else {
      // Add new supplier
      axios.post('http://localhost:3000/api/item-suppliers/add', form)
        .then(() => {
          alert('Supplier added successfully');
          fetchSuppliers(); // Refresh the list
          setModalOpen(false); // Close modal
        })
        .catch(error => {
          console.error('Error adding supplier:', error);
          alert('Failed to add supplier');
        });
    }
  };

  // Delete supplier
  const handleDeleteSupplier = async (id) => {
    if (window.confirm('Are you sure you want to delete this supplier?')) {
      try {
        await axios.delete(`http://localhost:3000/api/item-suppliers/${id}`);
        alert('Supplier deleted successfully');
        fetchSuppliers();
      } catch (error) {
        console.error('Error deleting supplier:', error);
        setError('Failed to delete supplier');
      }
    }
  };

  // Edit supplier (populate modal)
  const handleEditSupplier = (supplier) => {
    setForm(supplier);
    setEditSupplierId(supplier.id);
    setEditMode(true);
    setModalOpen(true);
  };

  // Filter suppliers based on any field (search term)
  const filteredSuppliers = suppliers.filter(supplier => {
    return (
      supplier.item_supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.contact_person_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.contact_person_phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.contact_person_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div>
      <h2 className="centered-heading">Item Supplier List</h2>
      <div className="search-add-container">
        <input
          type="text"
          placeholder="Search by any detail..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button
          onClick={() => {
            setModalOpen(true);
            setEditMode(false);
            setForm({
              item_supplier: '',
              phone: '',
              email: '',
              address: '',
              contact_person_name: '',
              contact_person_phone: '',
              contact_person_email: '',
              description: ''
            });
          }}
          className="add-btn"
        >
          Add Item Supplier
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      <table>
        <thead>
          <tr>
            <th>Supplier</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Address</th>
            <th>Contact Person</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredSuppliers.map((supplier) => (
            <tr key={supplier.id}>
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
                  {supplier.item_supplier}
                  <div className="hover-description">{supplier.description}</div>
                </div>
              </td>
              <td>{supplier.phone}</td>
              <td>{supplier.email}</td>
              <td>{supplier.address}</td>
              <td>{supplier.contact_person_name}</td>
              <td>{supplier.description}</td>
              <td>
                <button onClick={() => handleEditSupplier(supplier)} className="edit-btn">Edit</button>
                <button onClick={() => handleDeleteSupplier(supplier.id)} className="delete-btn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for adding/editing a supplier */}
      <ItemSupplierModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveSupplier}
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

export default ItemSupplier;
