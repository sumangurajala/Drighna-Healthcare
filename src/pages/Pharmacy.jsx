import React from 'react';
import { CSVLink } from 'react-csv';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import printJS from 'print-js';


const Pharmacy = () => {
    const data = [
        { billNo: 'PHAB77', caseId: '29-10-2024 02:20 PM', patientName: 'apptest1 (1307)', doctorName: '', pharmacySetting: 'Test', discount: '0.00 (0.00%)', amount: '176.00', paidAmount: '176.00', balanceAmount: '0.00' },
        { billNo: 'PHAB76', caseId: '25-10-2024 11:48 AM', patientName: 'demo1 (1309)', doctorName: '', pharmacySetting: 'Test', discount: '0.00 (0.00%)', amount: '286.00', paidAmount: '286.00', balanceAmount: '0.00' },
        // Add more data as needed
    ];

    const exportPDF = () => {
        const doc = new jsPDF();
        doc.text('Pharmacy Bill', 14, 10);
        doc.autoTable({
            head: [['Bill No', 'Case ID', 'Date', 'Patient Name', 'Doctor Name', 'Pharmacy Setting', 'Discount (₹)', 'Amount (₹)', 'Paid Amount (₹)', 'Balance Amount (₹)']],
            body: data.map(item => [item.billNo, item.caseId, item.caseId, item.patientName, item.doctorName, item.pharmacySetting, item.discount, item.amount, item.paidAmount, item.balanceAmount]),
        });
        doc.save('pharmacy_bill.pdf');
    };

    const handlePrint = () => {
        printJS({
            printable: data,
            properties: ['billNo', 'caseId', 'caseId', 'patientName', 'doctorName', 'pharmacySetting', 'discount', 'amount', 'paidAmount', 'balanceAmount'],
            type: 'json',
            header: 'Pharmacy Bill'
        });
    };

    const handleCopy = () => {
        const textToCopy = data.map(item => `${item.billNo}\t${item.caseId}\t${item.patientName}\t${item.doctorName}\t${item.pharmacySetting}\t${item.discount}\t${item.amount}\t${item.paidAmount}\t${item.balanceAmount}`).join('\n');
        navigator.clipboard.writeText(textToCopy).then(() => {
            alert('Table data copied to clipboard');
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    };

    return (
        <div className="pharmacy-bill-container">
            <div className="header-section">
                <h2>Pharmacy Bill</h2>
                <div className="header-buttons">
                    <button className="generate-bill-btn">Generate Bill</button>
                    <button className="medicines-btn">Medicines</button>
                </div>
            </div>
            <div className="search-section">
                <input type="text" placeholder="Search..." className="search-input" />
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
                        data={data}
                        headers={[
                            { label: 'Bill No', key: 'billNo' },
                            { label: 'Case ID', key: 'caseId' },
                            { label: 'Date', key: 'caseId' },
                            { label: 'Patient Name', key: 'patientName' },
                            { label: 'Doctor Name', key: 'doctorName' },
                            { label: 'Pharmacy Setting', key: 'pharmacySetting' },
                            { label: 'Discount (₹)', key: 'discount' },
                            { label: 'Amount (₹)', key: 'amount' },
                            { label: 'Paid Amount (₹)', key: 'paidAmount' },
                            { label: 'Balance Amount (₹)', key: 'balanceAmount' }
                        ]}
                        filename="pharmacy_bill.csv"
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
                            <th>Date</th>
                            <th>Patient Name</th>
                            <th>Doctor Name</th>
                            <th>Pharmacy Setting</th>
                            <th>Discount (₹)</th>
                            <th>Amount (₹)</th>
                            <th>Paid Amount (₹)</th>
                            <th>Balance Amount (₹)</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td>{item.billNo}</td>
                                <td>{item.caseId}</td>
                                <td>{item.caseId}</td>
                                <td>{item.patientName}</td>
                                <td>{item.doctorName}</td>
                                <td>{item.pharmacySetting}</td>
                                <td>{item.discount}</td>
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
                <span>Records: 1 to {data.length} of {data.length}</span>
                <div className="pagination-controls">
                    <button>&lt;</button>
                    <button>&gt;</button>
                </div>
            </div>
        </div>
    );
};

export default Pharmacy;
