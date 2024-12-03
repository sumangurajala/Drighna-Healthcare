import React, { useState } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import './dailytransaction.css';


const DailyTransactionReport = () => {
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!dateFrom || !dateTo) {
      setError('Both "Date From" and "Date To" must be selected.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      let response;
      response = await axios.get('http://localhost:3000/api/daily_transactions', {
        params: { dateFrom, dateTo },
      });

      if (response.data && Array.isArray(response.data)) {
        setTransactions(response.data);
      } else {
        setError('No transactions found for the selected date range.');
      }
    } catch (err) {
      setError('Error fetching transactions. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const viewTransactionDetails = (transaction) => {
    setSelectedTransaction(transaction);
  };

  const closeDetailsModal = () => {
    setSelectedTransaction(null);
  };

  const exportToCSV = () => {
    if (transactions.length === 0) {
      alert('No transactions available to export.');
      return;
    }
  
    // Create CSV header from transaction keys
    const header = Object.keys(transactions[0]).join(',');
  
    // Create CSV rows from transaction values
    const rows = transactions
      .map((txn) => Object.values(txn).join(','))
      .join('\n');
  
    // Combine header and rows to form the full CSV content
    const csv = `${header}\n${rows}`;
  
    // Create a Blob with the CSV content and specify its MIME type as CSV
    const blob = new Blob([csv], { type: 'text/csv' });
  
    // Create a link element to download the file
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'transactions.csv'; // Default download file name
    link.click(); // Programmatically click the link to trigger download
  };
  
  
  // Export to Excel
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(transactions);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Transactions');
    XLSX.writeFile(wb, 'transactions.xlsx');
  };

  // Export to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({ html: '#transactions-table' }); // Use your table's ID here
    doc.save('transactions.pdf');
  };

  // Print the page
  const printPage = () => {
    window.print();
  };

  // Copy data to clipboard
  const copyToClipboard = () => {
    const text = transactions.map(txn => `ID: ${txn.id}, Date: ${txn.transaction_date}, Online: ${txn.online}, Offline: ${txn.offline}, Amount: ${txn.amount}, Action: ${txn.action}`).join('\n');
    navigator.clipboard.writeText(text).then(() => {
      alert('Transactions copied to clipboard!');
    }).catch(err => {
      alert('Failed to copy transactions.');
    });
  };

  return (
    <div className="container mt-4">
      <h4>Daily Transaction Report</h4>
      <form onSubmit={handleSubmit} className="p-3 bg-light rounded">
        <div className="row">
          <div className="col-md-3">
            <label className="form-label">
              Date From <span className="text-danger">*</span>
            </label>
            <input
              type="date"
              className="form-control"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              disabled={loading}
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">
              Date To <span className="text-danger">*</span>
            </label>
            <input
              type="date"
              className="form-control"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              disabled={loading}
            />
          </div>
          <div className="col-md-3 d-flex align-items-end">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </div>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}

      {!loading && transactions.length > 0 && (
        <div className="mt-4">
          <h5>Transaction Results</h5>

          {/* Action Buttons */}
          <div className="mb-3">
            {/* Action Buttons */}
  <button onClick={exportToCSV} className="btn btn-success btn-sm me-2">
    Export to CSV
  </button>
  <button onClick={exportToExcel} className="btn btn-warning btn-sm me-2">
    Export to Excel
  </button>
  <button onClick={exportToPDF} className="btn btn-danger btn-sm me-2">
    Export to PDF
  </button>
  <button onClick={printPage} className="btn btn-info btn-sm me-2">
    Print
  </button>
  <button onClick={copyToClipboard} className="btn btn-secondary btn-sm">
    Copy to Clipboard
  </button>
</div>

          <table className="table" id="transactions-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Transaction Date</th>
                <th>Online</th>
                <th>Offline</th>
                <th>Amount</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((txn) => (
                <tr key={txn.id}>
                  <td>{txn.id}</td>
                  <td>{txn.transaction_date}</td>
                  <td>{txn.online}</td>
                  <td>{txn.offline}</td>
                  <td>{txn.amount}</td>
                  <td>
                    <button
                      className="btn btn-info btn-sm"
                      onClick={() => viewTransactionDetails(txn)}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && transactions.length === 0 && !error && (
        <p>No transactions found for the selected date range.</p>
      )}

      {selectedTransaction && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Transaction Details</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeDetailsModal}
                ></button>
              </div>
              <div className="modal-body">
                <p><strong>ID:</strong> {selectedTransaction.id}</p>
                <p><strong>Date:</strong> {selectedTransaction.transaction_date}</p>
                <p><strong>Online:</strong> {selectedTransaction.online}</p>
                <p><strong>Offline:</strong> {selectedTransaction.offline}</p>
                <p><strong>Amount:</strong> {selectedTransaction.amount}</p>
                <p><strong>Action:</strong> {selectedTransaction.action}</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeDetailsModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DailyTransactionReport;



