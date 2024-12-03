import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStethoscope, faProcedures, faCapsules, faFlask, faXRay, faTint, faAmbulance, faWallet, faReceipt } from '@fortawesome/free-solid-svg-icons';
import './IncomeOverview.css';

const incomeData = [
    { icon: faStethoscope, title: 'OPD Income', amount: '₹517.00' },
    { icon: faProcedures, title: 'IPD Income', amount: '₹0.00' },
    { icon: faCapsules, title: 'Pharmacy Income', amount: '₹0.00' },
    { icon: faFlask, title: 'Pathology Income', amount: '₹0.00' },
    { icon: faXRay, title: 'Radiology Income', amount: '₹0.00' },
    { icon: faTint, title: 'Blood Bank Income', amount: '₹0.00' },
    { icon: faAmbulance, title: 'Ambulance Income', amount: '₹0.00' },
    { icon: faWallet, title: 'General Income', amount: '₹0.00' },
    { icon: faReceipt, title: 'Expenses', amount: '₹0.00' }
];

const IncomeOverview = () => {
    return (
        <div className="income-overview">
            {incomeData.map((data, index) => (
                <div key={index} className="income-card">
                    <div className="icon-container">
                        <FontAwesomeIcon icon={data.icon} />
                    </div>
                    <div className="income-info">
                        <span className="income-title">{data.title}</span>
                        <span className="income-amount">{data.amount}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default IncomeOverview;
