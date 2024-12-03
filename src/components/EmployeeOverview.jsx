import React from 'react';
import './EmployeeOverview.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const employees = [
  { role: 'Accountant', count: 1 },
  { role: 'Doctor', count: 6 },
  { role: 'Pharmacist', count: 2 },
  { role: 'Pathologist', count: 2 },
  { role: 'Radiologist', count: 2 },
  { role: 'Super Admin', count: 1 },
  { role: 'Receptionist', count: 1 },
  { role: 'Nurse', count: 2 },
];

const EmployeeOverview = () => {
  return (
    <div className="employee-overview">
      <div className="employee-wrapper">
        <h2 className="employee-title">Employee Overview</h2>
        <div className="employee-grid">
          {employees.map((employee, index) => (
            <div key={index} className={`employee-card ${index === employees.length - 1 ? 'last-card' : ''}`}>
              <div className="icon-container">
                <FontAwesomeIcon icon={faUser} className="role-icon" />
                <div className="count-badge">{employee.count}</div>
              </div>
              <div className="employee-info">
                <span className="employee-role">{employee.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmployeeOverview;
