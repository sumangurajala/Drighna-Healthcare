import React, { useState } from 'react';
import { CSVLink } from 'react-csv';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import printJS from 'print-js';


const Pathology = () => {
    const initialData = [
        { billNo: 'PATB76', caseId: '29-10-2024 02:20 PM', patientName: 'apptest1 (1307)', referenceDoctor: 'Dr. Smith', amount: '452.00', paidAmount: '452.00', balanceAmount: '0.00' },
        { billNo: 'PATB75', caseId: '25-10-2024 11:49 AM', patientName: 'demo1 (1309)', referenceDoctor: 'Dr. John', amount: '452.00', paidAmount: '452.00', balanceAmount: '0.00' },
        // Add more data as needed
    ];

    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState(initialData);

    const handleSearch = (event) => {
        const term = event.target.value;
        setSearchTerm(term);
        if (term !== '') {
            const filtered = initialData.filter(item =>
                Object.values(item).some(value => value.toString().toLowerCase().includes(term.toLowerCase()))
            );
            setFilteredData(filtered);
        } else {
            setFilteredData(initialData);
        }
    };

    const exportPDF = () => {
        const doc = new jsPDF();
        doc.text('Pathology Bill', 14, 10);
        doc.autoTable({
            head: [['Bill No', 'Case ID', 'Reporting Date', 'Patient Name', 'Reference Doctor', 'Amount (₹)', 'Paid Amount (₹)', 'Balance Amount (₹)']],
            body: filteredData.map(item => [item.billNo, item.caseId, item.caseId, item.patientName, item.referenceDoctor, item.amount, item.paidAmount, item.balanceAmount]),
        });
        doc.save('pathology_bill.pdf');
    };

    const handlePrint = () => {
        printJS({
            printable: filteredData,
            properties: ['billNo', 'caseId', 'caseId', 'patientName', 'referenceDoctor', 'amount', 'paidAmount', 'balanceAmount'],
            type: 'json',
            header: 'Pathology Bill'
        });
    };

    const handleCopy = () => {
        const textToCopy = filteredData.map(item => `${item.billNo}\t${item.caseId}\t${item.patientName}\t${item.referenceDoctor}\t${item.amount}\t${item.paidAmount}\t${item.balanceAmount}`).join('\n');
        navigator.clipboard.writeText(textToCopy).then(() => {
            alert('Table data copied to clipboard');
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    };

    return (
        <div className="pathology-bill-container">
            <div className="header-section">
                <h2>Pathology Bill</h2>
                <div className="header-buttons">
                    <button className="generate-bill-btn">Generate Bill</button>
                    <button className="pathology-test-btn">Pathology Test</button>
                </div>
            </div>
            <div className="search-section">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="search-input"
                />
                <div className="records-info">
                    <label htmlFor="recordsPerPage">100</label>
                    <select id="recordsPerPage" className="records-select">
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="100" selected>100</option>
                    </select>
                </div>
                <div className="import-buttons">
                    <button className="export-btn" onClick={exportPDF}>PDF</button>
                    <button className="export-btn" onClick={handleCopy}>Copy</button>
                    <button className="export-btn" onClick={handlePrint}>Print</button>
                    <CSVLink
                        data={filteredData}
                        headers={[
                            { label: 'Bill No', key: 'billNo' },
                            { label: 'Case ID', key: 'caseId' },
                            { label: 'Reporting Date', key: 'caseId' },
                            { label: 'Patient Name', key: 'patientName' },
                            { label: 'Reference Doctor', key: 'referenceDoctor' },
                            { label: 'Amount (₹)', key: 'amount' },
                            { label: 'Paid Amount (₹)', key: 'paidAmount' },
                            { label: 'Balance Amount (₹)', key: 'balanceAmount' }
                        ]}
                        filename="pathology_bill.csv"
                        className="csv-link"
                    >
                        <button className="export-btn">CSV</button>
                    </CSVLink>
                    <button className="export-btn" onClick={() => alert('Excel export requires an additional library (xlsx).')}>Excel</button>
                </div>
            </div>

            <div className="bill-table">
                <table>
                    <thead>
                        <tr>
                            <th>Bill No</th>
                            <th>Case ID</th>
                            <th>Reporting Date</th>
                            <th>Patient Name</th>
                            <th>Reference Doctor</th>
                            <th>Amount (₹)</th>
                            <th>Paid Amount (₹)</th>
                            <th>Balance Amount (₹)</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((item, index) => (
                            <tr key={index}>
                                <td>{item.billNo}</td>
                                <td>{item.caseId}</td>
                                <td>{item.caseId}</td>
                                <td>{item.patientName}</td>
                                <td>{item.referenceDoctor}</td>
                                <td>{item.amount}</td>
                                <td>{item.paidAmount}</td>
                                <td>{item.balanceAmount}</td>
                                <td className="action-buttons">
                                    <button className="details-btn">💳</button>
                                    <button className="edit-btn">✏️</button>
                                    <button className="delete-btn">🗑️</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="pagination">
                <span>Records: 1 to {filteredData.length} of {initialData.length}</span>
                <div className="pagination-controls">
                    <button>&lt;</button>
                    <button>&gt;</button>
                </div>
            </div>
        </div>
    );
};

export default Pathology;
