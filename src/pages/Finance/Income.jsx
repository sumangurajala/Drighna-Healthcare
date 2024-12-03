import React from 'react';


const Income = () => {
    return (
        <div className="income-list-container">
            <div className="header-section">
                <h2>Income List</h2>
                <button className="add-income-btn">Add Income</button>
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
                <div className="export-buttons">
                    <button className="export-btn">PDF</button>
                    <button className="export-btn">CSV</button>
                    <button className="export-btn">Excel</button>
                    <button className="export-btn">Print</button>
                </div>
            </div>

            <div className="income-table">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Invoice Number</th>
                            <th>Date</th>
                            <th>Description</th>
                            <th>Income Head</th>
                            <th>Amount (₹)</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><a href="#">hospital crg 2</a></td>
                            <td>001002EB</td>
                            <td>29-10-2024</td>
                            <td>the message you want to type</td>
                            <td>Hospital charges</td>
                            <td>10000.00</td>
                            <td className="action-buttons">
                                <button className="edit-btn">✏️</button>
                                <button className="delete-btn">🗑️</button>
                            </td>
                        </tr>
                        {/* Repeat similar rows as needed */}
                    </tbody>
                </table>
            </div>
            <div className="pagination">
                <span>Records: 1 to 9 of 9</span>
                <div className="pagination-controls">
                    <button>&lt;</button>
                    <button>&gt;</button>
                </div>
            </div>
        </div>
    );
};

export default Income;

