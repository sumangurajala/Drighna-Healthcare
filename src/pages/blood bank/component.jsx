import React, { useState } from 'react';
import { FaPlus, FaFileCsv, FaFilePdf, FaPrint, FaCopy, FaFileExcel } from 'react-icons/fa';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './component.css';
import { useNavigate } from 'react-router-dom';

const ComponentsIssueDetails = () => {
  const [data, setData] = useState([
    { billNo: 'BLBB38', caseId: '1269', issueDate: '15-04-2024 03:20 PM', receivedTo: 'Sowmya', bloodGroup: 'A+', component: 'White Cells & Granulocytes', gender: 'Female', donorName: 'Senthil', bags: '2028 (300 12)', netAmount: '149.50', paidAmount: '149.50', balanceAmount: '0.00' },
    { billNo: 'BLBB37', caseId: '1268', issueDate: '02-04-2024 03:20 PM', receivedTo: 'Kamini', bloodGroup: 'B-', component: 'Plasma', gender: 'Female', donorName: 'Arun', bags: '2027 (300 12)', netAmount: '149.50', paidAmount: '149.50', balanceAmount: '0.00' },
    { billNo: 'BLBB36', caseId: '1267', issueDate: '13-03-2024 03:18 PM', receivedTo: 'Swapna', bloodGroup: 'B+', component: 'Cryo', gender: 'Female', donorName: 'Ravi', bags: '1 (10)', netAmount: '149.50', paidAmount: '149.50', balanceAmount: '0.00' },
    { billNo: 'BLBB35', caseId: '1265', issueDate: '17-04-2024 03:17 PM', receivedTo: 'Lasya', bloodGroup: 'O-', component: 'Red Cells', gender: 'Female', donorName: 'Neha', bags: '2024 (200 12)', netAmount: '149.50', paidAmount: '149.50', balanceAmount: '0.00' },
    { billNo: 'BLBB34', caseId: '1250', issueDate: '13-06-2024 03:13 PM', receivedTo: 'Suraj', bloodGroup: 'O+', component: 'Red Cells', gender: 'Male', donorName: 'Apurwa', bags: '2026 (200 12)', netAmount: '149.50', paidAmount: '149.50', balanceAmount: '0.00' },
  ]);

  const navigate = useNavigate();

  // Export functions
  const handleExport = (format) => {
    if (format === 'PDF') {
      const doc = new jsPDF();
      doc.text('Components Issue Details', 20, 10);
      doc.autoTable({
        head: [['Bill No', 'Case ID', 'Issue Date', 'Received To', 'Blood Group', 'Component', 'Gender', 'Donor Name', 'Bags', 'Net Amount (₹)', 'Paid Amount (₹)', 'Balance Amount (₹)']],
        body: data.map(item => [item.billNo, item.caseId, item.issueDate, item.receivedTo, item.bloodGroup, item.component, item.gender, item.donorName, item.bags, item.netAmount, item.paidAmount, item.balanceAmount])
      });
      doc.save('components_issue_details.pdf');
    } else if (format === 'Excel' || format === 'CSV') {
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'ComponentsIssueDetails');
      XLSX.writeFile(workbook, `components_issue_details.${format === 'Excel' ? 'xlsx' : 'csv'}`);
    } else if (format === 'Copy') {
      const textToCopy = data.map(item => Object.values(item).join('\t')).join('\n');
      navigator.clipboard.writeText(textToCopy).then(() => alert('Data copied to clipboard!'));
    } else if (format === 'Print') {
      window.print();
    }
  };

  return (
    <div className="container">
      <div>
        <h2>Components Issue Details</h2>
        <div className="header-buttons">
          <button className="issue-component-button">
            Issue Component <FaPlus />
          </button>
          <button className="components-button" onClick={()=>navigate('/Component-deatils')}>
            Components
          </button>
        </div>
      </div>

      {/* Export Buttons aligned to the right */}
      <div className="import-buttons">
        <button onClick={() => handleExport('PDF')}><FaFilePdf /> PDF</button>
        <button onClick={() => handleExport('CSV')}><FaFileCsv /> CSV</button>
        <button onClick={() => handleExport('Print')}><FaPrint /> Print</button>
        <button onClick={() => handleExport('Copy')}><FaCopy /> Copy</button>
        <button onClick={() => handleExport('Excel')}><FaFileExcel /> Excel</button>
      </div>

      {/* Data Table */}
      <div className="table-section">
        <table className="data-table">
          <thead>
            <tr>
              <th>Bill No</th>
              <th>Case ID</th>
              <th>Issue Date</th>
              <th>Received To</th>
              <th>Blood Group</th>
              <th>Component</th>
              <th>Gender</th>
              <th>Donor Name</th>
              <th>Bags</th>
              <th>Net Amount (₹)</th>
              <th>Paid Amount (₹)</th>
              <th>Balance Amount (₹)</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.billNo}</td>
                <td>{item.caseId}</td>
                <td>{item.issueDate}</td>
                <td>{item.receivedTo}</td>
                <td>{item.bloodGroup}</td>
                <td>{item.component}</td>
                <td>{item.gender}</td>
                <td>{item.donorName}</td>
                <td>{item.bags}</td>
                <td>{item.netAmount}</td>
                <td>{item.paidAmount}</td>
                <td>{item.balanceAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComponentsIssueDetails;
