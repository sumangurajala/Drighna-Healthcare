// import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";

// const TransactionReport = () => {
//   const [timeDuration, setTimeDuration] = useState("");
//   const [collectedBy, setCollectedBy] = useState("");
//   const [selectHead, setSelectHead] = useState("All");

//   const handleSearch = (e) => {
//     e.preventDefault();
//     console.log("Searching with:", { timeDuration, collectedBy, selectHead });
//     // Add logic to fetch report data based on selected criteria
//   };

//   return (
//     <div className="container mt-4">
//       <h4>Transaction Report</h4>
//       <form onSubmit={handleSearch} className="p-3 bg-light rounded">
//         <div className="row mb-3">
//           <div className="col-md-4">
//             <label className="form-label">Time Duration <span className="text-danger">*</span></label>
//             <select
//               className="form-select"
//               value={timeDuration}
//               onChange={(e) => setTimeDuration(e.target.value)}
//               required
//             >
//               <option value="">Select</option>
//               <option value="Today">Today</option>
//               <option value="Last Week">Last Week</option>
//               <option value="Last Month">Last Month</option>
//             </select>
//           </div>

//           <div className="col-md-4">
//             <label className="form-label">Collected By</label>
//             <select
//               className="form-select"
//               value={collectedBy}
//               onChange={(e) => setCollectedBy(e.target.value)}
//             >
//               <option value="">Select</option>
//               <option value="Employee A">Employee A</option>
//               <option value="Employee B">Employee B</option>
//             </select>
//           </div>

//           <div className="col-md-4">
//             <label className="form-label">Select Head</label>
//             <select
//               className="form-select"
//               value={selectHead}
//               onChange={(e) => setSelectHead(e.target.value)}
//             >
//               <option value="All">All</option>
//               <option value="Head A">Head A</option>
//               <option value="Head B">Head B</option>
//             </select>
//           </div>
//         </div>

//         <button type="submit" className="btn btn-primary">
//           <i className="fas fa-search"></i> Search
//         </button>
//       </form>

//       <div className="table-responsive mt-4">
//         <table className="table table-bordered">
//           <thead>
//             <tr>
//               <th>Transaction ID</th>
//               <th>Date</th>
//               <th>Patient Name</th>
//               <th>Reference</th>
//               <th>Category</th>
//               <th>Collected By</th>
//               <th>Payment Type</th>
//               <th>Payment Mode</th>
//               <th>Amount (₹)</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td colSpan="9" className="text-center text-muted">
//               <div className="d-flex flex-column align-items-center">
//     <img src="" alt="" style={{ width: "50px" }} />
//     <span>No data available in table</span>
// </div>

//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>

//       <p className="text-center text-muted mt-3">
//         <i className="fas fa-arrow-left"></i> Add new record or search with different criteria.
//       </p>
//     </div>
//   );
// };

// export default TransactionReport;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";

// const TransactionReport = () => {
//   const [timeDuration, setTimeDuration] = useState("");
//   const [collectedBy, setCollectedBy] = useState("");
//   const [selectHead, setSelectHead] = useState("All");
//   const [transactions, setTransactions] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Fetch transactions based on criteria
//   const fetchTransactions = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get("http://localhost:3000/api/alltransactions"); // Ensure this matches the backend route
//       setTransactions(response.data);
//     } catch (error) {
//       console.error("Error fetching transactions:", error);
//       setError("Error fetching transactions. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };
  

//   const handleSearch = (e) => {
//     e.preventDefault();
//     fetchTransactions();
//   };

//   return (
//     <div className="container mt-4">
//       <h4>Transaction Report</h4>
//       <form onSubmit={handleSearch} className="p-3 bg-light rounded">
//         <div className="row mb-3">
//           <div className="col-md-4">
//             <label className="form-label">
//               Time Duration <span className="text-danger">*</span>
//             </label>
//             <select
//               className="form-select"
//               value={timeDuration}
//               onChange={(e) => setTimeDuration(e.target.value)}
//               required
//             >
//               <option value="">Select</option>
//               <option value="Today">Today</option>
//               <option value="Last Week">Last Week</option>
//               <option value="Last Month">Last Month</option>
//             </select>
//           </div>

//           <div className="col-md-4">
//             <label className="form-label">Collected By</label>
//             <select
//               className="form-select"
//               value={collectedBy}
//               onChange={(e) => setCollectedBy(e.target.value)}
//             >
//               <option value="">Select</option>
//               <option value="Employee A">Employee A</option>
//               <option value="Employee B">Employee B</option>
//             </select>
//           </div>

//           <div className="col-md-4">
//             <label className="form-label">Select Head</label>
//             <select
//               className="form-select"
//               value={selectHead}
//               onChange={(e) => setSelectHead(e.target.value)}
//             >
//               <option value="All">All</option>
//               <option value="Head A">Head A</option>
//               <option value="Head B">Head B</option>
//             </select>
//           </div>
//         </div>

//         <button type="submit" className="btn btn-primary">
//           <i className="fas fa-search"></i> Search
//         </button>
//       </form>

//        {/* Conditionally render export buttons if all fields are filled */}
//        {allFieldsFilled && (
//         <div className="export-buttons">
//           <button className="export-btn">Excel</button>
//           <button className="export-btn">PDF</button>
//           <button className="export-btn">CSV</button>
//           <button className="export-btn">Print</button>
//         </div>
//       )}

//       {loading && <p>Loading...</p>}
//       {error && <p className="text-danger">{error}</p>}

//       <div className="table-responsive mt-4">
//         <table className="table table-bordered">
//           <thead>
//             <tr>
//               <th>Transaction ID</th>
//               <th>Date</th>
//               <th>Patient Name</th>
//               <th>Reference</th>
//               <th>Category</th>
//               <th>Collected By</th>
//               <th>Payment Type</th>
//               <th>Payment Mode</th>
//               <th>Amount (₹)</th>
//             </tr>
//           </thead>
//           <tbody>
//             {transactions.length > 0 ? (
//               transactions.map((txn) => (
//                 <tr key={txn._id}>
//                   <td>{txn._id}</td>
//                   <td>{txn.date}</td>
//                   <td>{txn.patient_name}</td>
//                   <td>{txn.reference}</td>
//                   <td>{txn.category}</td>
//                   <td>{txn.collected_by}</td>
//                   <td>{txn.payment_type}</td>
//                   <td>{txn.payment_mode}</td>
//                   <td>{txn.amount}</td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="9" className="text-center text-muted">
//                   <div className="d-flex flex-column align-items-center">
//                     <img src="" alt="" style={{ width: "50px" }} />
//                     <span>No data available in table</span>
//                   </div>
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       <p className="text-center text-muted mt-3">
//         <i className="fas fa-arrow-left"></i> Add new record or search with
//         different criteria.
//       </p>
//     </div>
//   );
// };

// export default TransactionReport;

import React, { useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable"; // For autoTable plugin
import * as XLSX from "xlsx"; // For Excel export

const TransactionReport = () => {
  const [timeDuration, setTimeDuration] = useState("");
  const [collectedBy, setCollectedBy] = useState("");
  const [selectHead, setSelectHead] = useState("All");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const allFieldsFilled = timeDuration && collectedBy && selectHead;

  // Fetch transactions based on criteria
  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/api/alltransactions");
      setTransactions(response.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setError("Error fetching transactions. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchTransactions();
  };

  // Export to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    const tableData = transactions.map((txn) => [
      txn._id,
      txn.date,
      txn.patient_name,
      txn.reference,
      txn.category,
      txn.collected_by,
      txn.payment_type,
      txn.payment_mode,
      txn.amount,
    ]);

    doc.text("Transaction Report", 10, 10);
    doc.autoTable({
      head: [["Transaction ID", "Date", "Patient Name", "Reference", "Category", "Collected By", "Payment Type", "Payment Mode", "Amount"]],
      body: tableData,
    });
    doc.save("transactions.pdf");
  };

  // Export to Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(transactions);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");
    XLSX.writeFile(workbook, "transactions.xlsx");
  };

  // Copy to Clipboard
  const copyToClipboard = () => {
    const textData = transactions.map(
      (txn) =>
        `${txn._id}\t${txn.date}\t${txn.patient_name}\t${txn.reference}\t${txn.category}\t${txn.collected_by}\t${txn.payment_type}\t${txn.payment_mode}\t${txn.amount}`
    ).join("\n");
    navigator.clipboard.writeText(textData).then(() => {
      alert("Data copied to clipboard!");
    });
  };

  // Export to CSV
  const exportToCSV = () => {
    const csvData = transactions.map((txn) =>
      [
        txn._id,
        txn.date,
        txn.patient_name,
        txn.reference,
        txn.category,
        txn.collected_by,
        txn.payment_type,
        txn.payment_mode,
        txn.amount,
      ].join(",")
    );
    const csvContent = [
      "Transaction ID,Date,Patient Name,Reference,Category,Collected By,Payment Type,Payment Mode,Amount",
      ...csvData,
    ].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "transactions.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Print Table
  const printTable = () => {
    const newWindow = window.open();
    const printContent = `
      <html>
        <head>
          <title>Transaction Report</title>
        </head>
        <body>
          <table border="1" style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Date</th>
                <th>Patient Name</th>
                <th>Reference</th>
                <th>Category</th>
                <th>Collected By</th>
                <th>Payment Type</th>
                <th>Payment Mode</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              ${transactions
                .map(
                  (txn) =>
                    `<tr>
                      <td>${txn._id}</td>
                      <td>${txn.date}</td>
                      <td>${txn.patient_name}</td>
                      <td>${txn.reference}</td>
                      <td>${txn.category}</td>
                      <td>${txn.collected_by}</td>
                      <td>${txn.payment_type}</td>
                      <td>${txn.payment_mode}</td>
                      <td>${txn.amount}</td>
                    </tr>`
                )
                .join("")}
            </tbody>
          </table>
        </body>
      </html>
    `;
    newWindow.document.write(printContent);
    newWindow.document.close();
    newWindow.print();
  };

  return (
    <div style={{ margin: "20px" }}>
      <h4>Transaction Report</h4>
      <form onSubmit={handleSearch} style={{ padding: "15px", marginBottom: "20px" }}>
        <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
          <select value={timeDuration} onChange={(e) => setTimeDuration(e.target.value)}>
            <option value="">Select Time Duration</option>
            <option value="Today">Today</option>
            <option value="Last Week">Last Week</option>
            <option value="Last Month">Last Month</option>
          </select>
          <select value={collectedBy} onChange={(e) => setCollectedBy(e.target.value)}>
            <option value="">Collected By</option>
            <option value="Employee A">Employee A</option>
            <option value="Employee B">Employee B</option>
          </select>
          <select value={selectHead} onChange={(e) => setSelectHead(e.target.value)}>
            <option value="All">All</option>
            <option value="Head A">OPD</option>
            <option value="Head B">Pharmacy Bill</option>
            <option value='Head c'>Radilogy</option>
          </select>
        </div>
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {allFieldsFilled && transactions.length > 0 && (
        <div style={{ marginBottom: "20px" }}>
          <button onClick={exportToExcel} className="export-btn">Excel</button>
          <button onClick={exportToPDF} className="export-btn">PDF</button>
          <button onClick={exportToCSV} className="export-btn">CSV</button>
          <button onClick={printTable} className="export-btn">Print</button>
          <button onClick={copyToClipboard} className="export-btn">Copy</button>
        </div>
      )}

      <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Date</th>
            <th>Patient Name</th>
            <th>Reference</th>
            <th>Category</th>
            <th>Collected By</th>
            <th>Payment Type</th>
            <th>Payment Mode</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((txn) => (
            <tr key={txn._id}>
              <td>{txn._id}</td>
              <td>{txn.date}</td>
              <td>{txn.patient_name}</td>
              <td>{txn.reference}</td>
              <td>{txn.category}</td>
              <td>{txn.collected_by}</td>
              <td>{txn.payment_type}</td>
              <td>{txn.payment_mode}</td>
              <td>{txn.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionReport;

