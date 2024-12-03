import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './userlog.css';

const UserLog = () => {
    const [timeDuration, setTimeDuration] = useState('');
    const [userRole, setUserRole] = useState('');
    const [userData, setUserData] = useState([
        { username: 'John Doe', role: 'Patient', ip: '192.168.1.1', loginTime: '2023-11-05 10:00', userAgent: 'Chrome' },
        { username: 'Jane Smith', role: 'Admin', ip: '192.168.1.2', loginTime: '2023-11-05 10:05', userAgent: 'Firefox' },
        { username: 'Dr. Brown', role: 'Doctor', ip: '192.168.1.3', loginTime: '2023-11-05 10:10', userAgent: 'Safari' },
    ]);

    // Function to check if both fields are filled
    const areFieldsFilled = timeDuration && userRole;

    const handleCopy = () => {
        const tableText = userData.map(user => 
            `${user.username}\t${user.role}\t${user.ip}\t${user.loginTime}\t${user.userAgent}`
        ).join('\n');
        
        navigator.clipboard.writeText(tableText).then(() => {
            alert('Table data copied to clipboard!');
        });
    };

    const handleCSV = () => {
        const csvContent = "data:text/csv;charset=utf-8," + 
            ["Username,Role,IP Address,Login Time,User Agent", ...userData.map(user => 
            `${user.username}, ${user.role}, ${user.ip}, ${user.loginTime}, ${user.userAgent}`
        )].join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "user_log.csv");
        document.body.appendChild(link); 
        link.click();
        document.body.removeChild(link);
    };

    const handlePDF = () => {
        const doc = new jsPDF();
        doc.text("User Log Report", 10, 10);
        doc.autoTable({
            head: [['Username', 'Role', 'IP Address', 'Login Time', 'User Agent']],
            body: userData.map(user => [
                user.username, user.role, user.ip, user.loginTime, user.userAgent
            ])
        });
        doc.save("user_log_report.pdf");
    };

    const handleExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(userData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "User Log");
        XLSX.writeFile(workbook, "user_log_report.xlsx");
    };

    const handlePrint = () => {
        window.print();
    };

    const handleDeleteAll = () => {
        setUserData([]); // Clear the userData array
        alert('All data has been deleted');
    };

    return (
        <div className="user-log-container">
            <h2>User Log</h2>
            <div className="filters">
                <label>
                    Time Duration <span>*</span>
                    <select value={timeDuration} onChange={(e) => setTimeDuration(e.target.value)}>
                        <option value="">Select Duration</option>
                        <option value="Today">Today</option>
                        <option value="This Week">This Week</option>
                        <option value="This Month">This Month</option>
                    </select>
                </label>

                <label>
                    User Role
                    <select value={userRole} onChange={(e) => setUserRole(e.target.value)}>
                        <option value="">Select Role</option>
                        <option value="Admin">Admin</option>
                        <option value="Patient">Patient</option>
                        <option value="Doctor">Doctor</option>
                    </select>
                </label>

                <button className="search-button">Search</button>
                <button className="delete-button" onClick={handleDeleteAll}>Delete All</button>
            </div>

            {/* Conditionally render the table and buttons if both fields are filled */}
            {areFieldsFilled && userData.length > 0 ? (
                <>
                    <div className="import-buttons">
                        <button className="import-button" onClick={handleCopy}>Copy</button>
                        <button className="import-button" onClick={handleCSV}>CSV</button>
                        <button className="import-button" onClick={handlePDF}>PDF</button>
                        <button className="import-button" onClick={handleExcel}>Excel</button>
                        <button className="import-button" onClick={handlePrint}>Print</button>
                    </div>

                    <table className="user-log-table">
                        <thead>
                            <tr>
                                <th>Users</th>
                                <th>Role</th>
                                <th>IP Address</th>
                                <th>Login Time</th>
                                <th>User Agent</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userData.map((user, index) => (
                                <tr key={index}>
                                    <td>{user.username}</td>
                                    <td>{user.role}</td>
                                    <td>{user.ip}</td>
                                    <td>{user.loginTime}</td>
                                    <td>{user.userAgent}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            ) : (
                <div className="no-data">
                    <p>No data available in table</p>
                    <img src="/path/to/no-data-image.png" alt="No data available" />
                    <p>Add new record or search with different criteria.</p>
                </div>
            )}
        </div>
    );
};

export default UserLog;
