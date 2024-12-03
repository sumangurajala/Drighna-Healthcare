import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome, faFileInvoiceDollar, faCalendar, faProcedures, faClinicMedical, faCapsules,
  faFlask, faXRay, faTint, faAmbulance, faConciergeBell, faUsers, faClipboard, faCog,
  faEnvelope, faFileContract, faDownload, faCertificate, faDesktop, faVideo, faChartBar,
  faChevronDown, faChevronRight, faCogs, faBed, faFileAlt, faHospital, faStethoscope,
  faVial, faSyringe, faBrain, faMicroscope, faUserMd, faAddressBook, faUserTie, faClipboardList,
  faMoneyCheck, faReceipt, faIdBadge, faComments, faFile // Add faFile here
} from '@fortawesome/free-solid-svg-icons';
import Text from './Text';
import './Sidebar.css';

const sidebarItems = [
  { to: '/', icon: faHome, label: 'Dashboard' },
  { to: '/billing', icon: faFileInvoiceDollar, label: 'Billing' },
  { to: '/appointment', icon: faCalendar, label: 'Appointment' },
  { to: '/opd-out-patient', icon: faProcedures, label: 'OPD - Out Patient' },
  { to: '/ipd-in-patient', icon: faClinicMedical, label: 'IPD - In Patient' },
  { to: '/pharmacy', icon: faCapsules, label: 'Pharmacy' },
  { to: '/pathology', icon: faFlask, label: 'Pathology' },
  { to: '/radiology', icon: faXRay, label: 'Radiology' },
  { to: '/blood-bank', icon: faTint, label: 'Blood Bank' },
  { to: '/ambulance', icon: faAmbulance, label: 'Ambulance' },
  { to: '/front-office', icon: faConciergeBell, label: 'Front Office' },
  { 
    to: '#', 
    icon: faClipboard, 
    label: 'Birth & Death Record',
    children: [
      { to: '/birth-death-record/birth', icon: faFile, label: 'Birth Record' },
      { to: '/birth-death-record/death', icon: faFile, label: 'Death Record' },
    ]
  },
  { to: '/human-resource', icon: faUsers, label: 'Human Resource' },
  { to: 'refferal-centre', icon: faEnvelope, label: 'Referral' },
  { to: '/tpa-management', icon: faFileContract, label: 'TPA Management' },
  { 
    to: '#',
    icon: faMoneyCheck,
    label: 'Finance',
    children: [
      { to: '/finance/income', icon: faReceipt, label: 'Income' },
      { to: '/finance/expenses', icon: faFileInvoiceDollar, label: 'Expenses' },
    ]
  },
  { to: '/messaging', icon: faEnvelope, label: 'Messaging' },
  { to: '/inventory', icon: faClipboard, label: 'Inventory' },
  {to:'/download-centre', icon: faDownload, label: 'Download Centre' },
  { 
    to: '#', 
    icon: faCertificate, 
    label: 'Certificate',
    children: [
      { to :'./certificate/certificate', icon: faCertificate, label:'Certificate' },
      { to: '/certificate/patient-id-card', icon: faIdBadge, label: 'Patient ID Card' },
      { to: '/certificate/staff-id-card', icon: faIdBadge, label: 'Staff ID Card' },
    ]
  },
  { to: '/front-cms', icon: faDesktop, label: 'Front CMS' },
  { 
    to: '#', 
    icon: faVideo, 
    label: 'Live Consultation',
    children: [
      { to: '/live-consultation/consultation', icon: faComments, label: 'Live Consultation' },
      { to: '/live-consultation/meeting', icon: faComments, label: 'Live Meeting' },
    ]
  },
  { 
    to: '#',
    icon: faChartBar,
    label: 'Reports',
    children: [
      { to: '/reports/daily-transaction', icon: faFileAlt, label: 'Daily Transaction Report' },
      { to: '/reports/all-transaction', icon: faFileAlt, label: 'All Transaction Report' },
      { to: 'reports/appointment-report', icon: faFileAlt, label: 'Appointment Report' },
      { to: 'reports/opd-report', icon: faFileAlt, label: 'OPD Report' },
      { to: 'reports/ipd-report', icon: faFileAlt, label: 'IPD Report' },
      { to: 'reports/opd-balance-report', icon: faFileAlt, label: 'OPD Balance Report' },
      { to: 'reports/ipd-balance-report', icon: faFileAlt, label: 'IPD Balance Report' },
      { to: '/reports/opd-discharged-patient', icon: faFileAlt, label: 'OPD Discharged Patient' },
      { to: '/reports/ipd-discharged-patient', icon: faFileAlt, label: 'IPD Discharged Patient' },
      { to: 'reports/pharmacy-bill-report', icon: faFileAlt, label: 'Pharmacy Bill Report' },
      { to: 'reports/expiry-medicine-report', icon: faFileAlt, label: 'Expiry Medicine Report' },
      { to: 'reports/pathology-patient-report', icon: faFileAlt, label: 'Pathology Patient Report' },
      { to: 'reports/radiology-patient-report', icon: faFileAlt, label: 'Radiology Patient Report' },
      { to: 'reports/ot-report', icon: faFileAlt, label: 'OT Report' },
      { to: 'reports/blood-issue-report', icon: faFileAlt, label: 'Blood Issue Report' },
      { to: 'reports/component-issue-report', icon: faFileAlt, label: 'Component Issue Report' },
      { to: 'reports/blood-donor-report', icon: faFileAlt, label: 'Blood Donor Report' },
      { to: 'reports/live-consultation-report', icon: faFileAlt, label: 'Live Consultation Report' },
      { to: 'reports/live-meeting-report', icon: faFileAlt, label: 'Live Meeting Report' },
      { to: 'reports/tpa-report', icon: faFileAlt, label: 'TPA Report' },
      { to: 'reports/income-report', icon: faFileAlt, label: 'Income Report' },
      { to: 'reports/income-group-report', icon: faFileAlt, label: 'Income Group Report' },
      { to: 'reports/expense-report', icon: faFileAlt, label: 'Expense Report' },
      { to: 'reports/expense-group-report', icon: faFileAlt, label: 'Expense Group Report' },
      { to: 'reports/ambulance-report', icon: faFileAlt, label: 'Ambulance Report' },
      { to: 'reports/birth-report', icon: faFileAlt, label: 'Birth Report' },
      { to: 'reports/death-report', icon: faFileAlt, label: 'Death Report' },
      { to: 'reports/payroll-month-report', icon: faFileAlt, label: 'Payroll Month Report' },
      { to: 'reports/payroll-report', icon: faFileAlt, label: 'Payroll Report' },
      { to: 'reports/staff-attendance-report', icon: faFileAlt, label: 'Staff Attendance Report' },
      { to: 'reports/user-log', icon: faFileAlt, label: 'User Log' },
      { to: 'reports/patient-login-credential', icon: faFileAlt, label: 'Patient Login Credential' },
      { to: 'reports/email-sms-log', icon: faFileAlt, label: 'Email / SMS Log' },
      { to: 'reports/inventory-stock-report', icon: faFileAlt, label: 'Inventory Stock Report' },
      { to: 'reports/inventory-item-report', icon: faFileAlt, label: 'Inventory Item Report' },
      { to: 'reports/inventory-issue-report', icon: faFileAlt, label: 'Inventory Issue Report' },
      { to: 'reports/audit-trail-report', icon: faFileAlt, label: 'Audit Trail Report' },
      { to: 'reports/patient-visit-report', icon: faFileAlt, label: 'Patient Visit Report' },
      { to: 'reports/patient-bill-report', icon: faFileAlt, label: 'Patient Bill Report' },
      { to: 'reports/referral-report', icon: faFileAlt, label: 'Referral Report' },
    ]
  },
  { 
    to: '#', 
    icon: faCog, 
    label: 'Setup',
    children: [
      { to: '/setup/settings', icon: faCogs, label: 'Settings' },
      { to: '/setup/patient', icon: faUserMd, label: 'Patient' },
      { to: '/setup/hospital-charges', icon: faFileAlt, label: 'Hospital Charges' },
      { to: '/setup/bed', icon: faBed, label: 'Bed' },
      { to: '/setup/print-header-footer', icon: faFileAlt, label: 'Print Header Footer' },
      { to: '/setup/front-office', icon: faConciergeBell, label: 'Front Office' },
      { to: '/setup/operations', icon: faStethoscope, label: 'Operations' },
      { to: '/setup/pharmacy', icon: faCapsules, label: 'Pharmacy' },
      { to: '/setup/pathology', icon: faVial, label: 'Pathology' },
      { to: '/setup/radiology', icon: faXRay, label: 'Radiology' },
      { to: '/setup/blood-bank', icon: faTint, label: 'Blood Bank' },
      { to: '/setup/symptoms', icon: faBrain, label: 'Symptoms' },
      { to: '/setup/findings', icon: faMicroscope, label: 'Findings' },
      { to: '/setup/zoom-setting', icon: faVideo, label: 'Zoom Setting' },
      { to: '/setup/finance', icon: faFileInvoiceDollar, label: 'Finance' },
      { to: '/setup/human-resource', icon: faUserTie, label: 'Human Resource' },
      { to: '/setup/referral', icon: faAddressBook, label: 'Referral' },
      { to: '/setup/appointment', icon: faCalendar, label: 'Appointment' },
      { to: '/setup/inventory', icon: faClipboardList, label: 'Inventory' },
      { to: '/setup/custom-fields', icon: faSyringe, label: 'Custom Fields' },
    ]
  },
];

const Sidebar = () => {
  const isOpen = useSelector((state) => state.sidebar.isOpen);
  const [expandedItems, setExpandedItems] = useState({}); // State to track expanded sections

  const handleToggle = (itemLabel) => {
    setExpandedItems((prev) => ({
      ...prev,
      [itemLabel]: !prev[itemLabel], // Toggle the expanded state
    }));
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <nav>
        <ul>
          {sidebarItems.map((item, index) => (
            <li key={index}>
              {/* Check if item has children to add toggle functionality */}
              {item.children ? (
                <div onClick={() => handleToggle(item.label)} className="sidebar-item">
                  <FontAwesomeIcon icon={item.icon} className="sidebar-icon" />
                  <Text size="14px" weight="400" color="#fff">{item.label}</Text>
                  <FontAwesomeIcon
                    icon={expandedItems[item.label] ? faChevronDown : faChevronRight}
                    className="toggle-icon"
                  />
                </div>
              ) : (
                <NavLink
                  to={item.to}
                  className={({ isActive }) => (isActive ? 'active' : '')} // Apply 'active' class
                >
                  <FontAwesomeIcon icon={item.icon} className="sidebar-icon" />
                  <Text size="14px" weight="400" color="#fff">{item.label}</Text>
                </NavLink>
              )}
              {/* Render sub-menu if item has children and is expanded */}
              {item.children && expandedItems[item.label] && (
                <ul className="submenu">
                  {item.children.map((child, childIndex) => (
                    <li key={childIndex}>
                      <NavLink
                        to={child.to}
                        className={({ isActive }) => (isActive ? 'active' : '')} // Apply 'active' class to submodule
                      >
                        <FontAwesomeIcon icon={child.icon} className="sidebar-icon submodule-icon" /> {/* Smaller icon size */}
                        <Text size="12px" weight="400" color="#f0f0f0">{child.label}</Text> {/* Smaller text size */}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
