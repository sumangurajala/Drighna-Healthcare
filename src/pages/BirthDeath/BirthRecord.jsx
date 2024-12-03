import React, { useState } from 'react';
import { CSVLink } from 'react-csv';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import printJS from 'print-js';


const BirthRecord = () => {
    const initialData = [
        { refNo: 'BRRN29', caseId: '137', childName: 'D Child', gender: 'Male', birthDate: '29-10-2024 02:21 PM', motherName: 'Lasya (1265)', fatherName: 'Demo F' },
        { refNo: 'BRRN28', caseId: '137', childName: 'demo', gender: 'Male', birthDate: '25-10-2024 12:28 PM', motherName: 'Lasya (1265)', fatherName: 'Demo F' },
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
        doc.text('Birth Record', 14, 10);
        doc.autoTable({
            head: [['Reference No', 'Case ID', 'Child Name', 'Gender', 'Birth Date', 'Mother Name', 'Father Name']],
            body: filteredData.map(item => [item.refNo, item.caseId, item.childName, item.gender, item.birthDate, item.motherName, item.fatherName]),
        });
        doc.save('birth_record.pdf');
    };

    const handlePrint = () => {
        printJS({
            printable: filteredData,
            properties: ['refNo', 'caseId', 'childName', 'gender', 'birthDate', 'motherName', 'fatherName'],
            type: 'json',
            header: 'Birth Record'
        });
    };

    const handleCopy = () => {
        const textToCopy = filteredData.map(item => `${item.refNo}\t${item.caseId}\t${item.childName}\t${item.gender}\t${item.birthDate}\t${item.motherName}\t${item.fatherName}`).join('\n');
        navigator.clipboard.writeText(textToCopy).then(() => {
            alert('Table data copied to clipboard');
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    };

    return (
        <div className="birth-record-container">
            <div className="header-section">
                <h2>Birth Record</h2>
                <button className="add-record-btn">Add Birth Record</button>
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
                            { label: 'Reference No', key: 'refNo' },
                            { label: 'Case ID', key: 'caseId' },
                            { label: 'Child Name', key: 'childName' },
                            { label: 'Gender', key: 'gender' },
                            { label: 'Birth Date', key: 'birthDate' },
                            { label: 'Mother Name', key: 'motherName' },
                            { label: 'Father Name', key: 'fatherName' }
                        ]}
                        filename="birth_record.csv"
                        className="csv-link"
                    >
                        <button className="export-btn">CSV</button>
                    </CSVLink>
                    <button className="export-btn" onClick={() => alert('Excel export requires an additional library (xlsx).')}>Excel</button>
                </div>
            </div>

            <div className="record-table">
                <table>
                    <thead>
                        <tr>
                            <th>Reference No</th>
                            <th>Case ID</th>
                            <th>Child Name</th>
                            <th>Gender</th>
                            <th>Birth Date</th>
                            <th>Mother Name</th>
                            <th>Father Name</th>
                            <th>Report</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((item, index) => (
                            <tr key={index}>
                                <td>{item.refNo}</td>
                                <td>{item.caseId}</td>
                                <td>{item.childName}</td>
                                <td>{item.gender}</td>
                                <td>{item.birthDate}</td>
                                <td>{item.motherName}</td>
                                <td>{item.fatherName}</td>
                                <td className="action-buttons">
                                    <button className="report-btn">📄</button>
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

export default BirthRecord;
