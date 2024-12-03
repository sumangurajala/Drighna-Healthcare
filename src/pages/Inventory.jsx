import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Main Inventory Component
const Inventoryx = () => {
  const [selectedComponent, setSelectedComponent] = useState('ItemCategory');
  const [itemCategories, setItemCategories] = useState([]);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCategory, setNewCategory] = useState({ item_category: '', description: '' });

  // Fetch item categories from the backend
  const fetchItemCategories = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/item-categories');
      setItemCategories(response.data);
    } catch (error) {
      console.error('Error fetching item categories:', error);
    }
  };

  // Add a new item category to the backend
  const addItemCategory = async () => {
    try {
      await axios.post('http://localhost:3000/api/item-categories/add', newCategory);
      setNewCategory({ item_category: '', description: '' });
      setShowAddCategory(false);
      fetchItemCategories(); // Refresh the list
    } catch (error) {
      console.error('Error adding item category:', error);
    }
  };

  // Delete an item category from the backend
  const deleteItemCategory = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/item-categories/${id}`);
      fetchItemCategories(); // Refresh the list
    } catch (error) {
      console.error('Error deleting item category:', error);
    }
  };

  useEffect(() => {
    fetchItemCategories();
  }, []);

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'ItemCategory':
        return (
          <div>
            <h2>Item Category List</h2>
            <button onClick={() => setShowAddCategory(true)} style={{ marginBottom: '10px' }}>
              Add Item Category
            </button>
            <table>
              <thead>
                <tr>
                  <th>Item Category</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {itemCategories.map((category) => (
                  <tr key={category.id}>
                    <td>{category.item_category}</td>
                    <td>{category.description}</td>
                    <td>
                      <button onClick={() => deleteItemCategory(category.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {showAddCategory && (
              <div className="modal">
                <div className="modal-content">
                  <h3>Add Item Category</h3>
                  <input
                    type="text"
                    placeholder="Item Category"
                    value={newCategory.item_category}
                    onChange={(e) => setNewCategory({ ...newCategory, item_category: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="Description"
                    value={newCategory.description}
                    onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                  />
                  <button onClick={addItemCategory}>Save</button>
                  <button onClick={() => setShowAddCategory(false)}>Cancel</button>
                </div>
              </div>
            )}
          </div>
        );
      case 'ItemStore':
        return <div>Item Store Component - (To be implemented similarly)</div>;
      case 'ItemSupplier':
        return <div>Item Supplier Component - (To be implemented similarly)</div>;
      default:
        return <div>Item Category Component</div>;
    }
  };

  return (
    <div className="inventory-container">
      <div className="sidebar">
        <ul>
          <li onClick={() => setSelectedComponent('ItemCategory')}>Item Category</li>
          <li onClick={() => setSelectedComponent('ItemStore')}>Item Store</li>
          <li onClick={() => setSelectedComponent('ItemSupplier')}>Item Supplier</li>
        </ul>
      </div>
      <div className="content">{renderComponent()}</div>
      <style jsx>{`
        .inventory-container {
          display: flex;
        }
        .sidebar {
          width: 20%;
          background-color: #f8f9fa;
          padding: 20px;
        }
        .sidebar ul {
          list-style-type: none;
          padding: 0;
        }
        .sidebar li {
          padding: 10px;
          cursor: pointer;
        }
        .sidebar li:hover {
          background-color: #007bff;
          color: white;
        }
        .content {
          width: 80%;
          padding: 20px;
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
        input {
          margin: 5px;
          padding: 10px;
          border: 1px solid #ccc;
        }
        button {
          padding: 10px 20px;
          background-color: #007bff;
          color: white;
          border: none;
          cursor: pointer;
          margin: 5px;
        }
        button:hover {
          background-color: #0056b3;
        }
        .modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .modal-content {
          background-color: white;
          padding: 20px;
          border-radius: 5px;
        }
      `}</style>
    </div>
  );
};

export default Inventoryx;
