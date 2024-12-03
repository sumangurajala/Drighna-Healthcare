import React, { useState } from 'react';
import { FaPlus, FaFileCsv, FaFilePdf, FaPrint, FaCopy, FaFileExcel, FaTrashAlt } from 'react-icons/fa';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const ComponentsList = () => {
  const [data, setData] = useState([
    { name: 'Platelets', bloodGroup: 'B+', bags: '3 (10)', lot: '2', institution: '' },
    { name: 'Cryo', bloodGroup: 'B+', bags: '1 (10)', lot: '1', institution: '' },
    { name: 'Platelets', bloodGroup: 'AB+', bags: '2029 (200 12)', lot: '6', institution: '' },
    { name: 'Red Cells', bloodGroup: 'AB+', bags: '2029 (200 12)', lot: '6', institution: '' },
    { name: 'White Cells & Granulocytes', bloodGroup: 'A+', bags: '2028 (300 12)', lot: '5', institution: '' },
    { name: 'Cryo', bloodGroup: 'A+', bags: '2028 (300 12)', lot: '5', institution: '' },
    { name: 'Plasma', bloodGroup: 'B-', bags: '2027 (300 12)', lot: '4', institution: '' },
    // Additional rows for demonstration
  ]);

  const handleExport = (format) => {
    if (format === 'PDF') {
      const doc = new jsPDF();
      doc.text('Components List', 20, 10);
      doc.autoTable({
        head: [['Name', 'Blood Group', 'Bags', 'Lot', 'Institution']],
        body: data.map(item => [item.name, item.bloodGroup, item.bags, item.lot, item.institution]),
      });
      doc.save('components_list.pdf');
    } else if (format === 'Excel' || format === 'CSV') {
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'ComponentsList');
      XLSX.writeFile(workbook, `components_list.${format === 'Excel' ? 'xlsx' : 'csv'}`);
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
        <h2>Components List</h2>
        <div className="header-buttons">
          <button className="add-components-button">
            Add Components <FaPlus />
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
              <th>Name</th>
              <th>Blood Group</th>
              <th>Bags</th>
              <th>Lot</th>
              <th>Institution</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.bloodGroup}</td>
                <td>{item.bags}</td>
                <td>{item.lot}</td>
                <td>{item.institution}</td>
                <td>
                  <button className="delete-button">
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComponentsList;
