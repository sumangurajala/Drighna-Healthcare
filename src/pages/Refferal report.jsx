import React from 'react';
import './Referral report.css'; // Import the CSS for styling

const ReferralPaymentList = () => {
    return (
        <div className="referral-payment-container">
            <div className="header-section">
                <h2>Referral Payment List</h2>
                <div className="header-buttons">
                    <button className="add-payment-btn">Add Referral Payment</button>
                    <button className="referral-person-btn">Referral Person</button>
                </div>
            </div>
            <div className="search-section">
                <input type="text" placeholder="Search..." className="search-input" />
                <div className="import-buttons">
                    <button className="export-btn">PDF</button>
                    <button className="export-btn">CSV</button>
                    <button className="export-btn">Excel</button>
                    <button className="export-btn">Print</button>
                </div>
            </div>

            <div className="payment-table">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Patient Name</th>
                            <th>Bill No</th>
                            <th>Bill Amount (₹)</th>
                            <th>Commission Percentage (%)</th>
                            <th>Commission Amount (₹)</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><a href="#">Lawerence</a></td>
                            <td>hema (1286)</td>
                            <td>IPDN45</td>
                            <td>336.00</td>
                            <td>25.00</td>
                            <td>84.00</td>
                            <td className="action-buttons">
                                <button className="edit-btn">✏️</button>
                                <button className="delete-btn">🗑️</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="pagination">
                <span>Records: 1 to 1 of 1</span>
                <div className="pagination-controls">
                    <button>&lt;</button>
                    <button>&gt;</button>
                </div>
            </div>
        </div>
    );
};

export default ReferralPaymentList;
