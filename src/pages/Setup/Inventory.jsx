import React, { useState } from 'react';
import ItemCategory from '../../components/ItemCategory';
import ItemStore from '../../components/ItemStore';
import ItemSupplier from '../../components/ItemSupplier';

const Inventory = () => {
  const [selectedComponent, setSelectedComponent] = useState('ItemCategory');

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'ItemCategory':
        return <ItemCategory />;
      case 'ItemStore':
        return <ItemStore />;
      case 'ItemSupplier':
        return <ItemSupplier />;
      default:
        return <ItemCategory />;
    }
  };

  return (
    <div className="inventory-container">
      <div className="inventory-sidebar">
        <ul>
          <li onClick={() => setSelectedComponent('ItemCategory')}>Item Category</li>
          <li onClick={() => setSelectedComponent('ItemStore')}>Item Store</li>
          <li onClick={() => setSelectedComponent('ItemSupplier')}>Item Supplier</li>
        </ul>
      </div>
      <div className="inventory-content">{renderComponent()}</div>
      <style jsx>{`
        .inventory-container {
          display: flex;
          height: 100vh;
        }
        .inventory-sidebar {
          width: 150px;
          background-color: white;
          padding: 10px;
          color: white;
          margin-left: -20px;
        }
        .inventory-sidebar ul {
          list-style-type: none;
          padding: 0;
        }
        .inventory-sidebar li {
          padding: 10px;
          border-radius:10px;
          cursor: pointer;
          color: #fff;
          margin-bottom: 10px;
          background:#007bff;
        }
        .inventory-sidebar li:hover {
          background-color: #0056b3;
        }
        .inventory-content {
          flex-grow: 1;
          padding: 10px;
          background-color: #f8f9fa;
        }
      `}</style>
    </div>
  );
};

export default Inventory;
