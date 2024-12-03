import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './BillingDashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarCheck, faProcedures, faFlask, faXRay, faTint, faTintSlash } from '@fortawesome/free-solid-svg-icons';

const BillingDashboard = () => {
  const modules = [
    { name: 'Appointment', icon: faCalendarCheck, path: '/appointment', className: 'module-card-appointment' },
    { name: 'OPD', icon: faProcedures, path: '/opd-out-patient', className: 'module-card-opd' },
    { name: 'Pathology', icon: faFlask, path: '/pathology', className: 'module-card-pathology' },
    { name: 'Radiology', icon: faXRay, path: '/radiology', className: 'module-card-radiology' },
    { name: 'Blood Issue', icon: faTint, path: '/blood-bank', className: 'module-card-blood-issue' },
    { name: 'Blood Component Issue', icon: faTintSlash, path: '/blood-component-issue', className: 'module-card-blood-component' },
  ];

  return (
    <div className="billing-dashboard">
      {/* Left Section: Single Module Billing */}
      <div className="modules-section">
        <h3 className="section-title">Single Module Billing</h3>
        <div className="modules-grid">
          {modules.map((module, index) => (
            <Link to={module.path} key={index} className="module-card-link">
              <div className={`module-card ${module.className}`}>
                <div className="icon-background">
                  <FontAwesomeIcon icon={module.icon} className="module-icon" />
                </div>
                <span>{module.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Right Section: OPD/IPD Billing Through Case ID */}
      <div className="billing-case-id">
        <h3 className="section-title">OPD/IPD Billing Through Case Id</h3>
        <label htmlFor="caseId">Case ID *</label>
        <input type="text" id="caseId" placeholder="Enter Case ID" />
        <button>Search</button>
      </div>
    </div>
  );
};

export default BillingDashboard;
