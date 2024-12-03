import React, { useState } from 'react';
import { FaPlus, FaFileCsv, FaFilePdf, FaPrint, FaCopy, FaFileExcel, FaSave } from 'react-icons/fa';
import './bloodissuedetails.css';

const BloodIssueDetails = () => {
  const [data, setData] = useState([
    { billNo: 'BLBB33', caseId: '1267', issueDate: '04-06-2024 01:19 PM', receivedTo: 'Swapna', bloodGroup: 'AB+', gender: 'Female', donorName: 'Jasmani', bags: '1005', netAmount: '149.50', paidAmount: '149.50', balanceAmount: '0.00' },
    { billNo: 'BLBB32', caseId: '1261', issueDate: '12-03-2024 01:14 PM', receivedTo: 'Rajiv', bloodGroup: 'O-', gender: 'Male', donorName: 'Sakhi Singh', bags: '2006', netAmount: '149.50', paidAmount: '149.50', balanceAmount: '0.00' },
    // Add more data as needed
  ]);

  // Define showNotification state
  const [showNotification, setShowNotification] = useState(false);

  const handleExport = (format) => {
    alert(`Exporting data as ${format}`);
    // Add actual export logic here for CSV, PDF, Print, etc.
  };

  // Define handleCloseNotification function to hide the notification
  const handleCloseNotification = () => {
    setShowNotification(false);
  };

  // Define handleSave function to show the notification (can be used for saving logic if needed)
  const handleSave = () => {
    setShowNotification(true);
  };

  return (
    <div className="container">
      <div>
        <h2>Blood Issue Details</h2>
        <div className="actions">
          {/* Issue Blood button to open notification box */}
          <button className="issue-blood-button" onClick={() => setShowNotification(true)}>
            Issue Blood <FaPlus />
          </button>
        </div>
      </div>

      {/* Export Buttons aligned to the right */}
      <div className="port-buttons">
        <button onClick={() => handleExport('PDF')}><FaFilePdf /> PDF</button>
        <button onClick={() => handleExport('CSV')}><FaFileCsv /> CSV</button>
        <button onClick={() => handleExport('Print')}><FaPrint /> Print</button>
        <button onClick={() => handleExport('Copy')}><FaCopy /> Copy</button>
        <button onClick={() => handleExport('Excel')}><FaFileExcel /> Excel</button>
      </div>

      {/* Alert Notification Box */}
      {showNotification && (
        <div className="notification-box">
          <button className="close-notification" onClick={handleCloseNotification}>X</button>
          <h3>Enter Blood Issue Details</h3>
          <div className="form">
            <div className="form-row">
              <label>Issue Date *</label>
              <input type="text" placeholder="Issue Date" required />
              <label>Hospital Doctor</label>
              <select><option>Select</option></select>
              <label>Reference Name *</label>
              <input type="text" required />
              <label>Technician</label>
              <input type="text" />
            </div>

            <div className="form-row">
              <label>Blood Group</label>
              <select><option>Select</option></select>
              <label>Bag *</label>
              <select required><option>Select</option></select>
              <label>Charge Category *</label>
              <select required><option>Select</option></select>
              <label>Charge Name *</label>
              <select required><option>Select</option></select>
            </div>

            <div className="form-row">
              <label>Standard Charge (₹)</label>
              <input type="text" />
            </div>

            <div className="form-row">
              <label>Note</label>
              <textarea rows="3" />
            </div>

            <div className="summary">
              <div className="summary-item">
                <label>Total (₹)</label>
                <p>0</p>
              </div>
              <div className="summary-item">
                <label>Discount (₹)</label>
                <input type="text" placeholder="0%" />
              </div>
              <div className="summary-item">
                <label>Tax (₹)</label>
                <input type="text" placeholder="0%" />
              </div>
              <div className="summary-item">
                <label>Net Amount (₹)</label>
                <p>0</p>
              </div>
              <div className="summary-item">
                <label>Payment Mode</label>
                <select>
                  <option>Cash</option>
                  <option>Card</option>
                </select>
              </div>
              <div className="summary-item">
                <label>Payment Amount (₹) *</label>
                <input type="text" required />
              </div>
            </div>

            <div className="form-actions">
              <button onClick={handleSave}><FaPrint /> Save & Print</button>
              <button onClick={handleSave}><FaSave /> Save</button>
            </div>
          </div>
        </div>
      )}

      {/* Data Table */}
      <table className="data-table">
        <thead>
          <tr>
            <th>Bill No</th>
            <th>Case ID</th>
            <th>Issue Date</th>
            <th>Received To</th>
            <th>Blood Group</th>
            <th>Gender</th>
            <th>Donor Name</th>
            <th>Bags</th>
            <th>Net Amount (₹)</th>
            <th>Paid Amount (₹)</th>
            <th>Balance Amount (₹)</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row.billNo}</td>
              <td>{row.caseId}</td>
              <td>{row.issueDate}</td>
              <td>{row.receivedTo}</td>
              <td>{row.bloodGroup}</td>
              <td>{row.gender}</td>
              <td>{row.donorName}</td>
              <td>{row.bags}</td>
              <td>{row.netAmount}</td>
              <td>{row.paidAmount}</td>
              <td>{row.balanceAmount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BloodIssueDetails;

