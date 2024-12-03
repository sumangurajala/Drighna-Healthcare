import React from 'react';

const AddItemModal = ({ isOpen, onClose, onSave, fields, form, setForm }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay-custom">
      <div className="modal-content-custom">
        <h3 className="modal-title-custom">Add Item</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave();
          }}
        >
          {fields.map((field) => (
            <div key={field.name} className="form-group-custom">
              <label>{field.label}</label>
              <input
                type={field.type || 'text'}
                value={form[field.name]}
                onChange={(e) =>
                  setForm({ ...form, [field.name]: e.target.value })
                }
                required={field.required}
                className="input-field-custom"
              />
            </div>
          ))}
          <div className="button-group-custom">
            <button type="submit" className="save-button-custom">Save</button>
            <button type="button" className="cancel-button-custom" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
      <style jsx>{`
        .modal-overlay-custom {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .modal-content-custom {
          background: white;
          padding: 30px;
          border-radius: 8px;
          width: 450px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .modal-title-custom {
          font-size: 1.5rem;
          margin-bottom: 15px;
          color: #333;
        }
        .form-group-custom {
          margin-bottom: 15px;
        }
        .input-field-custom {
          width: 100%;
          padding: 10px;
          border-radius: 4px;
          border: 1px solid #ccc;
        }
        .button-group-custom {
          display: flex;
          justify-content: space-between;
          margin-top: 20px;
        }
        .save-button-custom, .cancel-button-custom {
          padding: 10px 20px;
          border-radius: 4px;
          border: none;
          cursor: pointer;
        }
        .save-button-custom {
          background-color: #007bff;
          color: white;
        }
        .cancel-button-custom {
          background-color: #6c757d;
          color: white;
        }
      `}</style>
    </div>
  );
};

export default AddItemModal;
