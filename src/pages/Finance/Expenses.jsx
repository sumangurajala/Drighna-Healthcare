import React from 'react';
import { CSVLink } from 'react-csv';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import printJS from 'print-js';


const Expenses = () => {
    const data = [
        { name: 'electric bill', invoiceNumber: '001002EB', date: '29-10-2024', description: 'the message you want to type', expenseHead: 'Electricity Bill', amount: '10000.00' },
        { name: 'rent', invoiceNumber: '01', date: '25-10-2024', description: 'the message you want to type', expenseHead: 'Building rent', amount: '10000.00' },
        // Add more data as needed
    ];

    const exportPDF = () => {
        const doc = new jsPDF();
        doc.text('Expense List', 14, 10);
        doc.autoTable({
            head: [['Name', 'Invoice Number', 'Date', 'Description', 'Expense Head', 'Amount (₹)']],
            body: data.map(item => [item.name, item.invoiceNumber, item.date, item.description, item.expenseHead, item.amount]),
        });
        doc.save('expense_list.pdf');
    };

    const handlePrint = () => {
        printJS({
            printable: data,
            properties: ['name', 'invoiceNumber', 'date', 'description', 'expenseHead', 'amount'],
            type: 'json',
            header: 'Expense List'
        });
    };

    const handleCopy = () => {
        const textToCopy = data.map(item => `${item.name}\t${item.invoiceNumber}\t${item.date}\t${item.description}\t${item.expenseHead}\t${item.amount}`).join('\n');
        navigator.clipboard.writeText(textToCopy).then(() => {
            alert('Table data copied to clipboard');
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    };

    return (
        <div className="expense-list-container">
            <div className="header-section">
                <h2>Expense List</h2>
                <button className="add-expense-btn">Add Expense</button>
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
                            { label: 'Name', key: 'name' },
                            { label: 'Invoice Number', key: 'invoiceNumber' },
                            { label: 'Date', key: 'date' },
                            { label: 'Description', key: 'description' },
                            { label: 'Expense Head', key: 'expenseHead' },
                            { label: 'Amount (₹)', key: 'amount' }
                        ]}
                        filename="expense_list.csv"
                        className="csv-link"
                    >
                        <button className="export-btn">CSV</button>
                    </CSVLink>
                    <button className="export-btn" onClick={() => alert('Excel export requires an additional library (xlsx).')}>Excel</button>
                </div>
            </div>

            <div className="expense-table">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Invoice Number</th>
                            <th>Date</th>
                            <th>Description</th>
                            <th>Expense Head</th>
                            <th>Amount (₹)</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td><a href="#">{item.name}</a></td>
                                <td>{item.invoiceNumber}</td>
                                <td>{item.date}</td>
                                <td>{item.description}</td>
                                <td>{item.expenseHead}</td>
                                <td>{item.amount}</td>
                                <td className="action-buttons">
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

export default Expenses;
