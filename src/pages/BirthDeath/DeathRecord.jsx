import React, { useState } from 'react';
import { CSVLink } from 'react-csv';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import printJS from 'print-js';


const DeathRecord = () => {
    const initialData = [
        { refNo: 'DRRN28', caseId: '137', patientName: 'Lasya (1265)', guardianName: 'Boman', gender: 'Female', deathDate: '29-10-2024 02:21 PM' },
        { refNo: 'DRRN27', caseId: '137', patientName: 'Lasya (1265)', guardianName: 'Boman', gender: 'Female', deathDate: '25-10-2024 01:18 PM' },
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
        doc.text('Death Record', 14, 10);
        doc.autoTable({
            head: [['Reference No', 'Case ID', 'Patient Name', 'Guardian Name', 'Gender', 'Death Date']],
            body: filteredData.map(item => [item.refNo, item.caseId, item.patientName, item.guardianName, item.gender, item.deathDate]),
        });
        doc.save('death_record.pdf');
    };

    const handlePrint = () => {
        printJS({
            printable: filteredData,
            properties: ['refNo', 'caseId', 'patientName', 'guardianName', 'gender', 'deathDate'],
            type: 'json',
            header: 'Death Record'
        });
    };

    const handleCopy = () => {
        const textToCopy = filteredData.map(item => `${item.refNo}\t${item.caseId}\t${item.patientName}\t${item.guardianName}\t${item.gender}\t${item.deathDate}`).join('\n');
        navigator.clipboard.writeText(textToCopy).then(() => {
            alert('Table data copied to clipboard');
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    };

    return (
        <div className="death-record-container">
            <div className="header-section">
                <h2>Death Record</h2>
                <button className="add-record-btn">Add Death Record</button>
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
                            { label: 'Patient Name', key: 'patientName' },
                            { label: 'Guardian Name', key: 'guardianName' },
                            { label: 'Gender', key: 'gender' },
                            { label: 'Death Date', key: 'deathDate' }
                        ]}
                        filename="death_record.csv"
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
                            <th>Patient Name</th>
                            <th>Guardian Name</th>
                            <th>Gender</th>
                            <th>Death Date</th>
                            <th>Report</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((item, index) => (
                            <tr key={index}>
                                <td>{item.refNo}</td>
                                <td>{item.caseId}</td>
                                <td>{item.patientName}</td>
                                <td>{item.guardianName}</td>
                                <td>{item.gender}</td>
                                <td>{item.deathDate}</td>
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

export default DeathRecord;

