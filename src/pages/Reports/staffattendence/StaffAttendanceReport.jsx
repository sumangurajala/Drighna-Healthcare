import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './staffattendence.css';

const AttendanceReport = () => {
    const [role, setRole] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');

    const staffData = [
        { name: 'admin', P: 0, L: 0, A: 0, F: 0, H: 0 },
        { name: 'Sam Suriya', P: 0, L: 0, A: 0, F: 0, H: 0 },
        { name: 'ravi', P: 0, L: 0, A: 0, F: 0, H: 0 },
    ];

    const areAllFieldsFilled = role && month && year;

    // Copy to Clipboard
    const handleCopy = () => {
        const tableText = staffData.map(staff => 
            `${staff.name}\t${staff.P}\t${staff.L}\t${staff.A}\t${staff.F}\t${staff.H}`
        ).join('\n');
        
        navigator.clipboard.writeText(tableText).then(() => {
            alert('Table data copied to clipboard!');
        });
    };

    // Export as CSV
    const handleCSV = () => {
        const csvContent = "data:text/csv;charset=utf-8," + 
            ["Staff, P, L, A, F, H", ...staffData.map(staff => 
            `${staff.name}, ${staff.P}, ${staff.L}, ${staff.A}, ${staff.F}, ${staff.H}`
        )].join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "staff_attendance.csv");
        document.body.appendChild(link); 
        link.click();
        document.body.removeChild(link);
    };

    // Export as PDF
    const handlePDF = () => {
        const doc = new jsPDF();
        doc.text("Staff Attendance Report", 10, 10);
        doc.autoTable({
            head: [['Staff', '%', 'P', 'L', 'A', 'F', 'H']],
            body: staffData.map(staff => [
                staff.name, "-", staff.P, staff.L, staff.A, staff.F, staff.H
            ])
        });
        doc.save("staff_attendance_report.pdf");
    };

    // Export as Excel
    const handleExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(staffData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Staff Attendance");
        XLSX.writeFile(workbook, "staff_attendance_report.xlsx");
    };

    // Print the report
    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="container">
            <h2>Staff Attendance Report</h2>
            <div className="filters">
                <label>
                    Role
                    <select value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="">Select Role</option>
                        <option value="Admin">Admin</option>
                        <option value="Manager">Manager</option>
                        <option value="Staff">Staff</option>
                    </select>
                </label>
                
                <label>
                    Month <span>*</span>
                    <select value={month} onChange={(e) => setMonth(e.target.value)}>
                        <option value="">Select Month</option>
                        <option value="January">January</option>
                        <option value="February">February</option>
                        <option value="March">March</option>
                        {/* Add other months as options */}
                    </select>
                </label>
                
                <label>
                    Year
                    <select value={year} onChange={(e) => setYear(e.target.value)}>
                        <option value="">Select Year</option>
                        <option value="2024">2024</option>
                        <option value="2023">2023</option>
                        {/* Add other years as options */}
                    </select>
                </label>

                <button className="search-button">Search</button>
            </div>

            {areAllFieldsFilled && (
                <>
                    <div className="import-buttons">
                        <button className="import-button" onClick={handleCopy}>Copy</button>
                        <button className="import-button" onClick={handleCSV}>CSV</button>
                        <button className="import-button" onClick={handlePDF}>PDF</button>
                        <button className="import-button" onClick={handleExcel}>Excel</button>
                        <button className="import-button" onClick={handlePrint}>Print</button>
                    </div>

                    <table className="attendance-table">
                        <thead>
                            <tr>
                                <th>Staff / Date</th>
                                <th>%</th>
                                <th>P</th>
                                <th>L</th>
                                <th>A</th>
                                <th>F</th>
                                <th>H</th>
                                {[...Array(28)].map((_, i) => (
                                    <th key={i}>{String(i + 1).padStart(2, '0')}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {staffData.map((staff, index) => (
                                <tr key={index}>
                                    <td>{staff.name}</td>
                                    <td>-</td>
                                    <td>{staff.P}</td>
                                    <td>{staff.L}</td>
                                    <td>{staff.A}</td>
                                    <td>{staff.F}</td>
                                    <td>{staff.H}</td>
                                    {[...Array(28)].map((_, i) => (
                                        <td key={i}>0</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
};

export default AttendanceReport;
