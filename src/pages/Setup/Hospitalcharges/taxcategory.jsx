import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { CopyToClipboard } from "react-copy-to-clipboard";
import axios from "axios"; // Import axios for HTTP requests
import "./taxcategory.css"; // Import custom styles

const TaxCategoryList = () => {
  const [taxCategories, setTaxCategories] = useState([]);
  const [newTaxCategory, setNewTaxCategory] = useState({ name: "", percentage: "" });
  const [notification, setNotification] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editMode, setEditMode] = useState(false); // Manage edit mode
  const [editingTaxCategory, setEditingTaxCategory] = useState(null); // T
  // Fetch tax categories from the backend
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/tax-categories") // Replace with your backend URL
      .then((response) => {
        setTaxCategories(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the tax categories:", error);
        setNotification("Error fetching tax categories.");
      });
  }, []);

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Percentage(%)",
      selector: (row) => {
        // Ensure 'percentage' is a valid number before calling .toFixed
        const percentage = row.percentage ? parseFloat(row.percentage) : 0;
        return percentage.toFixed(2); // This will now be safe to use
      },
      sortable: true,
    },
    {
      name: "Action",
      cell: (row, index) => (
        <>
          <button onClick={() => handleEdit(index)} style={{ marginRight: "5px" }}>
            Edit
          </button>
          <button onClick={() => handleDelete(row.id)} style={{ marginLeft: "5px" }}>
            Delete
          </button>
        </>
      ),
    },
  ];

  const handleSave = () => {
    if (newTaxCategory.name && newTaxCategory.percentage) {
      // Make an API request to save the new tax category
      axios
        .post("http://localhost:3000/api/tax-categories/add", newTaxCategory)
        .then((response) => {
          // Check if the response is successful and has the expected data structure
          if (response.data) {
            setTaxCategories([...taxCategories, response.data]); // Add new category to state
            setNotification(`Tax category "${newTaxCategory.name}" with percentage "${newTaxCategory.percentage}" added successfully!`);
            setNewTaxCategory({ name: "", percentage: "" }); // Reset input fields
            setTimeout(() => setNotification(""), 3000);
          } else {
            // If the response does not contain the expected data
            setNotification("Error: Invalid data returned from the server.");
            console.error("Invalid response data:", response);
          }
        })
        .catch((error) => {
          // Enhanced error logging to help debug the issue
          setNotification("Error adding tax category.");
          console.error("Error adding tax category:", error.response || error); // Log the complete error response for debugging
          if (error.response) {
            // If there's a response error from the server, show the message
            setNotification(`Error: ${error.response.data.message || error.message}`);
          }
        });
    } else {
      setNotification("Please provide valid name and percentage.");
      setTimeout(() => setNotification(""), 3000);
    }
  };
  
  // Handle editing a tax category
  const handleEdit = (taxCategory) => {
    setEditingTaxCategory(taxCategory);
    setNewTaxCategory({
      name: taxCategory.name,
      percentage: `${taxCategory.percentage}%`, // Append '%' when editing
    });
    setEditMode(true);
    setShowAddForm(true);
  };


  // Handle deleting a tax category
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this tax category?")) {
      axios
        .delete(`http://localhost:3000/api/tax-categories/${id}`)
        .then(() => {
          setTaxCategories(taxCategories.filter((category) => category.id !== id));
          setNotification("Tax category deleted successfully!");
        })
        .catch((error) => {
          setNotification("Error deleting tax category.");
          console.error("Error:", error);
        });
    }
  };

  // Handle export to CSV
  const handleExportCSV = () => {
    const headers = ["Name", "Percentage"];
    const csvRows = taxCategories.map((row) => [row.name, row.percentage]);

    const csvString = [headers, ...csvRows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "tax-categories.csv");
  };

  // Handle export to Excel
  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(taxCategories);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Tax Categories");
    XLSX.writeFile(workbook, "tax-categories.xlsx");
  };

  // Handle export to PDF
  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text("Tax Category List", 14, 10);
    const tableColumn = ["Name", "Percentage"];
    const tableRows = taxCategories.map((row) => [row.name, row.percentage]);

    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.save("tax-categories.pdf");
  };

  // Handle print
  const handlePrint = () => {
    window.print();
  };

  // Handle copy
  const handleCopy = () => {
    const copyText = taxCategories.map(row => `${row.name}: ${row.percentage}`).join("\n");
    return copyText;
  };

  // Reset form and state
  const resetForm = () => {
    setNewTaxCategory({ name: "", percentage: "" });
    setShowAddForm(false);
    setEditMode(false);
    setEditingTaxCategory(null);
  };
  const handlePercentageChange = (e) => {
    let value = e.target.value;
    if (value && value[value.length - 1] !== "%") {
      value += "%"; // Append '%' if not already there
    }
    setNewTaxCategory({ ...newTaxCategory, percentage: value });
  };

  return (
    <div style={{ padding: "20px", position: "relative" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Tax Category List</h2>
        <button
          style={{
            backgroundColor: "",
            color: "white",
            padding: "10px",
            border: "none",
            cursor: "pointer",
          }}
          onClick={() => setShowAddForm(!showAddForm)} // Toggle form visibility
        >
          {showAddForm ? "Close" : editMode ? "Edit Tax Category" : "Add Tax Category ➕"}
        </button>
      </div>

      {/* Notification bar */}
      {notification && <div className="notification-bar">{notification}</div>}

      {/* Show Add/Edit Form */}
      {showAddForm && (
        <div style={{ marginTop: "20px" }}>
          <input
            type="text"
            placeholder="Name"
            value={newTaxCategory.name}
            onChange={(e) => setNewTaxCategory({ ...newTaxCategory, name: e.target.value })}
            style={{ marginRight: "10px", padding: "5px", borderRadius: "5px", border: "1px solid #ccc" }}
          />
            <input
            type="text"
            placeholder="Percentage"
            value={newTaxCategory.percentage}
            onChange={handlePercentageChange} // Use the new change handler
            style={{ padding: "5px", borderRadius: "5px", border: "1px solid #ccc" }}
          />
          <button
            onClick={handleSave}
            style={{
              marginLeft: "10px",
              backgroundColor: "#4CAF50",
              color: "white",
              padding: "5px 10px",
              border: "none",
              cursor: "pointer",
              borderRadius: "5px",
            }}
          >
            Save
          </button>
        </div>
      )}

      {/* Export buttons */}
      <div style={{ marginTop: "20px", display: "flex", justifyContent: "flex-end", gap: "10px" }}>
        <CopyToClipboard text={handleCopy()}>
          <button onClick={() => alert("Copied!")}>Copy</button>
        </CopyToClipboard>
        <button onClick={handleExportCSV}>CSV</button>
        <button onClick={handleExportExcel}>Excel</button>
        <button onClick={handleExportPDF}>PDF</button>
        <button onClick={handlePrint}>Print</button>
      </div>

      {/* DataTable */}
      <DataTable
        columns={columns}
        data={taxCategories}
        pagination
        highlightOnHover
        striped
      />
    </div>
  );
};

export default TaxCategoryList;
