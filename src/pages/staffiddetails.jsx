import React, { useState } from "react";
import axios from "axios";
import "./staffdetails.css"; // Add custom styling if needed

const StaffForm = () => {
  const [formData, setFormData] = useState({
    // Basic Staff Details
    staff_id: "",
    role: "",
    name: "",
    surname: "",
    father_name: "",
    mother_name: "",
    gender: "",
    marital_status: "",
    blood_group: "",
    dob: "",
    date_of_joining: "",
    phone: "",
    emergency_contact: "",
    email: "",
    current_address: "",
    permanent_address: "",
    qualification: "",
    work_experience: "",
    specialization: "",
    note: "",
    pan_number: "",
    national_identification_number: "",
    local_identification_number: "",
    payroll: "",
    epf_no: "",
    basic_salary: "",
    contract_type: "",
    work_shift: "",
    work_location: "",
    leaves: "",

    // Leave Details
    earned_leave: "",
    paternity_leave: "",
    maternity_leave: "",
    sick_leave: "",
    privilege_leave: "",
    casual_leave: "",

    // Bank Details
    account_title: "",
    bank_account_no: "",
    bank_name: "",
    ifsc_code: "",
    bank_branch_name: "",

    // Social Media Links
    facebook_url: "",
    twitter_url: "",
    linkedin_url: "",
    instagram_url: "",

    // File Uploads
    photo: null,
    resume: null,
    joining_letter: null,
    other_documents: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] }); // Ensure files[0] is set
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Initialize FormData
    const submissionData = new FormData();
   console.log('',submissionData)
  
    // Append all formData fields
    for (const key in formData) {
      if (formData[key] instanceof File) {
        submissionData.append(key, formData[key]); // Append file fields
      } else {
        submissionData.append(key, formData[key] || ""); // Append other fields, defaulting to an empty string
      }
    }
  
    // Debug: Log FormData entries
    for (let pair of submissionData.entries()) {
      console.log(`${pair[0]}:`, pair[1]);
    }
  
    try {
      const response = await axios.post(
        "http://localhost:3000/api/staff/staffdetails",
        submissionData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      alert("Data successfully submitted");
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error submitting data:", error.response?.data || error.message);
      alert(`Error: ${error.response?.data?.error || error.message}`);
    }
  };
  
  
  
  
  return (
    <div className="container">
      <h1>Staff Registration Form</h1>
      <form onSubmit={handleSubmit}>
        {/* Basic Staff Details */}
        <h2>Basic Details</h2>
        {[
          { label: "Staff ID", name: "staff_id", required: true },
          { label: "Role", name: "role", type: "select", options: ["Admin", "Staff", "Doctor"], required: true },
          { label: " Name", name: "name", required: true },
          { label: "Sur Name", name: "surname" },
          { label: "Father Name", name: "father_name" },
          { label: "Mother Name", name: "mother_name" },
          { label: "Gender", name: "gender", type: "select", options: ["Male", "Female", "Other"], required: true },
          { label: "Marital Status", name: "marital_status", type: "select", options: ["Single", "Married"] },
          { label: "Blood Group", name: "blood_group", type: "select", options: ["A+", "B+", "O+", "AB+"] },
          { label: "Date of Birth", name: "dob", type: "date", required: true },
          { label: "Date of Joining", name: "date_of_joining", type: "date" },
          { label: "Phone", name: "phone" },
          { label: "Emergency Contact", name: "emergency_contact" },
          { label: "Email", name: "email", type: "email", required: true },
          { label: "Current Address", name: "current_address", type: "textarea" },
          { label: "Permanent Address", name: "permanent_address", type: "textarea" },
          { label: "Qualification", name: "qualification" },
          { label: "Work Experience", name: "work_experience" },
          { label: "Specialization", name: "specialization" },
          { label: "Note", name: "note", type: "textarea" },
          { label: "PAN Number", name: "pan_number" },
          { label: "National Identification Number", name: "national_identification_number" },
          { label: "Local Identification Number", name: "local_identification_number" },
          { label: "Payroll", name: "payroll" },
          { label: "EPF No", name: "epf_no" },
          { label: "Basic Salary", name: "basic_salary", type: "number" },
          { label: "Contract Type", name: "contract_type" },
          { label: "Work Shift", name: "work_shift" },
          { label: "Work Location", name: "work_location" },
        ].map(({ label, name, type = "text", required, options }) => (
          <div className="form-group" key={name}>
            <label>
              {label}: {required && <span style={{ color: "red" }}>*</span>}
            </label>
            {type === "select" ? (
              <select name={name} value={formData[name]} onChange={handleChange} required={required}>
                <option value="">Select {label}</option>
                {options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : type === "textarea" ? (
              <textarea name={name} value={formData[name]} onChange={handleChange} />
            ) : (
              <input type={type} name={name} value={formData[name]} onChange={handleChange} />
            )}
          </div>
        ))}

        {/* Leave Details */}
        <h2>Leave Details</h2>
        {[
          { label: "Earned Leave", name: "earned_leave" },
          { label: "Paternity Leave", name: "paternity_leave" },
          { label: "Maternity Leave", name: "maternity_leave" },
          { label: "Sick Leave", name: "sick_leave" },
          { label: "Privilege Leave", name: "privilege_leave" },
          { label: "Casual Leave", name: "casual_leave" },
        ].map(({ label, name }) => (
          <div className="form-group" key={name}>
            <label>{label} (Number of Leaves):</label>
            <input
              type="number"
              name={name}
              value={formData[name]}
              onChange={handleChange}
              min="0"
            />
          </div>
        ))}

        {/* Bank Details */}
        <h2>Bank Details</h2>
        {[
          { label: "Account Title", name: "account_title" },
          { label: "Bank Account No.", name: "bank_account_no" },
          { label: "Bank Name", name: "bank_name" },
          { label: "IFSC Code", name: "ifsc_code" },
          { label: "Bank Branch Name", name: "bank_branch_name" },
        ].map(({ label, name }) => (
          <div className="form-group" key={name}>
            <label>{label}:</label>
            <input type="text" name={name} value={formData[name]} onChange={handleChange} />
          </div>
        ))}

        {/* Social Media Links */}
        <h2>Social Media Links</h2>
        {[
          { label: "Facebook URL", name: "facebook_url" },
          { label: "Twitter URL", name: "twitter_url" },
          { label: "LinkedIn URL", name: "linkedin_url" },
          { label: "Instagram URL", name: "instagram_url" },
        ].map(({ label, name }) => (
          <div className="form-group" key={name}>
            <label>{label}:</label>
            <input type="url" name={name} value={formData[name]} onChange={handleChange} />
          </div>
        ))}

        {/* File Uploads */}
        <h2>Upload Documents</h2>
        {[
          { label: "Photo", name: "photo" },
          { label: "Resume", name: "resume" },
          { label: "Joining Letter", name: "joining_letter" },
          { label: "Other Documents", name: "other_documents" },
        ].map(({ label, name }) => (
          <div className="form-group" key={name}>
            <label>{label}:</label>
            <input type="file" name={name} onChange={handleFileChange} />
          </div>
        ))}

        {/* Submit Button */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default StaffForm;





