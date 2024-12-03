import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddItemModal from './AddItemModal';

const ItemCategory = () => {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ item_category: '', description: '' });
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  // Fetch categories from API
  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/item-categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setError('Failed to fetch categories');
    }
  };

  // Add or edit category
  const handleSaveCategory = async () => {
    if (!form.item_category) {
      setError('Category Name is required');
      return;
    }
    try {
      if (editMode) {
        await axios.put(`http://localhost:3000/api/item-categories/${editCategoryId}`, form);
        alert('Category updated successfully');
      } else {
        await axios.post('http://localhost:3000/api/item-categories/add', form);
        alert('Category added successfully');
      }

      setForm({ item_category: '', description: '' });
      fetchCategories();
      setModalOpen(false);
      setError(null);
      setEditMode(false);
      setEditCategoryId(null);
    } catch (error) {
      console.error('Error adding/updating category:', error);
      setError('Failed to save category');
    }
  };

  // Delete category
  const handleDeleteCategory = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await axios.delete(`http://localhost:3000/api/item-categories/${id}`);
        alert('Category deleted successfully');
        fetchCategories();
      } catch (error) {
        console.error('Error deleting category:', error);
        setError('Failed to delete category');
      }
    }
  };

  // Edit category (populate modal)
  const handleEditCategory = (category) => {
    setForm(category);
    setEditCategoryId(category.id);
    setEditMode(true);
    setModalOpen(true);
  };

  // Filter categories based on search term
  const filteredCategories = categories.filter(category =>
    category.item_category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2 className="centered-heading">Item Category List</h2>
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
            setForm({ item_category: '', description: '' });
          }}
          className="add-btn"
        >
          Add Item Category
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredCategories.map((category) => (
            <tr key={category.id}>
              <td>
                <div
                  onMouseEnter={() => setForm({ description: category.description })}
                  onMouseLeave={() => setForm({ description: '' })}
                >
                  {category.item_category}
                </div>
                <div className="hover-description">{category.description}</div>
              </td>
              <td>
                <button onClick={() => handleEditCategory(category)} className="edit-btn">Edit</button>
                <button onClick={() => handleDeleteCategory(category.id)} className="delete-btn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for adding/editing a category */}
      <AddItemModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveCategory}
        fields={[
          { name: 'item_category', label: 'Category Name', required: true },
          { name: 'description', label: 'Description' },
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
          padding:5px; /* Reduced padding */
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
        .hover-description {
          display: none;
          position: absolute;
          background-color: #fff;
          padding: 5px;
          border: 1px solid #ddd;
        }
        td:hover .hover-description {
          display: block;
        }
      `}</style>
    </div>
  );
};

export default ItemCategory;
