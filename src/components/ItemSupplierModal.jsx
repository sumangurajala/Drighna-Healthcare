import React from 'react';
import Modal from 'react-modal';

const ItemSupplierModal = ({ isOpen, onClose, form, setForm, onSave }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
      className="modal"
      overlayClassName="overlay"
    >
      <h2>Add Item Supplier</h2>
      <div className="form-group">
        <label>Supplier Name *</label>
        <input
          type="text"
          value={form.item_supplier}
          onChange={(e) => setForm({ ...form, item_supplier: e.target.value })}
          className="modal-input"
        />
      </div>

      <div className="form-group">
        <label>Phone</label>
        <input
          type="text"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="modal-input"
        />
      </div>

      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="modal-input"
        />
      </div>

      <div className="form-group">
        <label>Address</label>
        <input
          type="text"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
          className="modal-input"
        />
      </div>

      <div className="form-group">
        <label>Contact Person Name</label>
        <input
          type="text"
          value={form.contact_person_name}
          onChange={(e) => setForm({ ...form, contact_person_name: e.target.value })}
          className="modal-input"
        />
      </div>

      <div className="form-group">
        <label>Contact Person Phone</label>
        <input
          type="text"
          value={form.contact_person_phone}
          onChange={(e) => setForm({ ...form, contact_person_phone: e.target.value })}
          className="modal-input"
        />
      </div>

      <div className="form-group">
        <label>Contact Person Email</label>
        <input
          type="email"
          value={form.contact_person_email}
          onChange={(e) => setForm({ ...form, contact_person_email: e.target.value })}
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
          width: 600px;
          max-height: 80vh;
          overflow-y: auto;
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

export default ItemSupplierModal;
