import React from 'react';
import "./Ambulance.css";
import { CSVLink } from 'react-csv';

const Ambulance = () => {
    const data = [
        {
            billNo: 'AMCB121',
            caseId: '1307',
            patientName: 'apptest1',
            vehicleNumber: 'UP-09-PQ-9012',
            vehicleModel: 'Force Trax',
            driverName: 'Shubham',
            driverContact: '',
            patientAddress: '',
            date: '29-10-2024 02:21 PM',
            amount: '163.50',
            paidAmount: '163.50',
            balanceAmount: '0.00'
        },
        {
            billNo: 'AMCB120',
            caseId: '1309',
            patientName: 'demo1',
            vehicleNumber: 'KA-05-DC-5678',
            vehicleModel: 'Force Traveller',
            driverName: 'Satendra',
            driverContact: '7777777777',
            patientAddress: 'demo',
            date: '25-10-2024 11:50 AM',
            amount: '163.50',
            paidAmount: '163.50',
            balanceAmount: '0.00'
        },
        // Add more data entries as needed
    ];

    const handlePrint = () => {
        window.print();
    };

    const handleCopy = () => {
        const formattedData = data.map(item => Object.values(item).join('\t')).join('\n');
        navigator.clipboard.writeText(formattedData);
        alert('Data copied to clipboard');
    };

    const handleExportPDF = () => {
        alert('Exporting as PDF is not yet implemented');
    };

    const handleExportExcel = () => {
        alert('Exporting as Excel is not yet implemented');
    };

    const handleAddAmbulanceCall = () => {
        alert('Add Ambulance Call functionality is triggered');
    };

    return (
        <div className="container">
            <div>
                <h2>Ambulance Call List</h2>
                <div className="buttons">
                    <button className="button" onClick={handleAddAmbulanceCall}>Add Ambulance Call</button>
                    <button className="button">Ambulance List</button>
                    <CSVLink
                        data={data}
                        filename="ambulance_call_list.csv"
                        className="button"
                    >
                        CSV
                    </CSVLink>
                    <button className="button" onClick={handleExportPDF}>PDF</button>
                    <button className="button" onClick={handleExportExcel}>Excel</button>
                    <button className="button" onClick={handlePrint}>Print</button>
                    <button className="button" onClick={handleCopy}>Copy</button>
                </div>
            </div>
            <input type="text" placeholder="Search..." className="search-bar" />

            <table className="call-list-table">
                <thead>
                    <tr>
                        <th>Bill No</th>
                        <th>Case ID</th>
                        <th>Patient Name</th>
                        <th>Vehicle Number</th>
                        <th>Vehicle Model</th>
                        <th>Driver Name</th>
                        <th>Driver Contact No</th>
                        <th>Patient Address</th>
                        <th>Date</th>
                        <th>Amount (₹)</th>
                        <th>Paid Amount (₹)</th>
                        <th>Balance Amount (₹)</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.billNo}</td>
                            <td>{item.caseId}</td>
                            <td>{item.patientName}</td>
                            <td>{item.vehicleNumber}</td>
                            <td>{item.vehicleModel}</td>
                            <td>{item.driverName}</td>
                            <td>{item.driverContact || '-'}</td>
                            <td>{item.patientAddress || '-'}</td>
                            <td>{item.date}</td>
                            <td>{item.amount}</td>
                            <td>{item.paidAmount}</td>
                            <td>{item.balanceAmount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Ambulance;


