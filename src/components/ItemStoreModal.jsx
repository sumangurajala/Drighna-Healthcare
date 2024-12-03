import React from 'react';
import Modal from 'react-modal';

const ItemStoreModal = ({ isOpen, onClose, form, setForm, onSave }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
      className="modal"
      overlayClassName="overlay"
    >
      <h2>Add Item Store</h2>
      <div className="form-group">
        <label>Item Store Name *</label>
        <input
          type="text"
          value={form.item_store}
          onChange={(e) => setForm({ ...form, item_store: e.target.value })}
          className="modal-input"
        />
      </div>
      <div className="form-group">
        <label>Item Stock Code</label>
        <input
          type="text"
          value={form.code}
          onChange={(e) => setForm({ ...form, code: e.target.value })}
          className="modal-input"
        />
      </div>
      <div className="form-group">
        <label>Description</label>
        <input
          type="text"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="modal-input"
        />
      </div>
      <div className="modal-actions">
        <button onClick={onSave} className="save-btn">Save</button>
        <button onClick={onClose} className="cancel-btn">Cancel</button>
      </div>

      <style jsx>{`
        .modal {
          background-color: white;
          padding: 20px;
          border-radius: 10px;
          width: 400px;
          margin: auto;
        }
        .overlay {
          background: rgba(0, 0, 0, 0.5);
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        h2 {
          margin-bottom: 20px;
          text-align: center;
          color: #333;
        }
        .form-group {
          margin-bottom: 15px;
        }
        label {
          display: block;
          margin-bottom: 5px;
          font-weight: bold;
          color: #333;
        }
        .modal-input {
          width: 100%;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }
        .modal-actions {
          display: flex;
          justify-content: space-between;
          margin-top: 20px;
        }
        .save-btn, .cancel-btn {
          padding: 10px 20px;
          background-color: #007bff;
          color: white;
          border: none;
          cursor: pointer;
          border-radius: 5px;
        }
        .save-btn:hover {
          background-color: #0056b3;
        }
        .cancel-btn {
          background-color: #6c757d;
        }
        .cancel-btn:hover {
          background-color: #5a6268;
        }
      `}</style>
    </Modal>
  );
};

export default ItemStoreModal;
