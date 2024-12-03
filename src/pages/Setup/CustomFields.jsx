import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const CustomFieldForm = () => {
  const [formData, setFormData] = useState({
    fieldBelongsTo: "",
    fieldType: "",
    fieldName: "",
    grid: "12",
    fieldValues: "",
    validation: false,
    required: false,
    visibility: {
      onTable: false,
      onPrint: false,
      onReport: false,
      onPatientPanel: false,
    },
  });

  const customFields = [
    "Ambulance Call",
    "Appointment",
    "Birth Record",
    "Blood Issue",
    "Component Issue",
    "Death Record",
    "Donor",
    "Expenses",
    "Income",
    "IPD",
    "Consultant Register",
    "IPD Nurse Note",
  ];

  const fieldTypes = [
    "Checkbox",
    "Color Picker",
    "Date Picker",
    "Datetime Picker",
    "Input",
    "Radio",
    "Select",
    "Text Area",
    "Toggle",
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleVisibilityChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      visibility: {
        ...prevData.visibility,
        [name]: checked,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    // Logic to save form data
  };

  return (
    <div className="container">
      <div className="row">
        {/* Form Section */}
        <div className="col-md-6">
          <h4>Add Custom Field</h4>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Field Belongs to</label>
              <select
                name="fieldBelongsTo"
                value={formData.fieldBelongsTo}
                onChange={handleInputChange}
                className="form-control"
                required
              >
                <option value="">Select</option>
                {customFields.map((field, index) => (
                  <option key={index} value={field}>
                    {field}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Field Type</label>
              <select
                name="fieldType"
                value={formData.fieldType}
                onChange={handleInputChange}
                className="form-control"
                required
              >
                <option value="">Select</option>
                {fieldTypes.map((type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Field Name</label>
              <input
                type="text"
                name="fieldName"
                value={formData.fieldName}
                onChange={handleInputChange}
                className="form-control"
                required
              />
            </div>

            <div className="form-group">
              <label>Grid (Max 12)</label>
              <input
                type="number"
                name="grid"
                value={formData.grid}
                onChange={handleInputChange}
                className="form-control"
                min="1"
                max="12"
              />
            </div>

            <div className="form-group">
              <label>Field Values (Separate by comma)</label>
              <textarea
                name="fieldValues"
                value={formData.fieldValues}
                onChange={handleInputChange}
                className="form-control"
              ></textarea>
            </div>

            <div className="form-check">
              <input
                type="checkbox"
                name="validation"
                checked={formData.validation}
                onChange={handleInputChange}
                className="form-check-input"
              />
              <label className="form-check-label">Validation</label>
            </div>

            <div className="form-check">
              <input
                type="checkbox"
                name="required"
                checked={formData.required}
                onChange={handleInputChange}
                className="form-check-input"
              />
              <label className="form-check-label">Required</label>
            </div>

            <h5>Visibility</h5>
            {Object.keys(formData.visibility).map((field) => (
              <div className="form-check" key={field}>
                <input
                  type="checkbox"
                  name={field}
                  checked={formData.visibility[field]}
                  onChange={handleVisibilityChange}
                  className="form-check-input"
                />
                <label className="form-check-label">
                  {field.replace("on", "On ")}
                </label>
              </div>
            ))}

            <button type="submit" className="btn btn-primary mt-3">
              Save
            </button>
          </form>
        </div>

        {/* Custom Field List */}
        <div className="col-md-6">
          <h4>Custom Field List</h4>
          <ul className="list-group">
            {customFields.map((field, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                {field}
                <button className="btn btn-sm btn-outline-secondary">+</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CustomFieldForm;

