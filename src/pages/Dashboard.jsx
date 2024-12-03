// import React from 'react';
// // import IncomeOverview from '../components/IncomeOverview';
// // import EmployeeOverview from '../components/EmployeeOverview';
// // import YearlyIncomeMonthlyOverview from '../components/YearlyIncomeMonthlyOverview';
// // import CalendarComponent from '../components/CalendarComponent';

// const Dashboard = () => {
//   return (
//     <div >
//       {/* <IncomeOverview />
//       <EmployeeOverview />
//       <YearlyIncomeMonthlyOverview />
//       <CalendarComponent /> */}
//       <h1>Dashboard</h1>
//     </div>
//   );
// };

// export default Dashboard;
// Dashboard.jsx


import React, { useState, useRef } from 'react';
import Calendar from 'react-calendar'; // Import the Calendar component
import 'react-calendar/dist/Calendar.css'; // Import the CSS for the calendar
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarCheck } from '@fortawesome/free-solid-svg-icons'; // Import FontAwesome icon
import './Dashboard.css';

const Dashboard = () => {
    const [date, setDate] = useState(new Date()); // State to manage the selected date
    const calendarRef = useRef(null); // Create a reference for the calendar section

    const categories = [
        { name: 'OPD Income', amount: 0 },
        { name: 'IPD Income', amount: 0 },
        { name: 'Pharmacy Income', amount: 0 },
        { name: 'Pathology Income', amount: 0 },
        { name: 'Radiology Income', amount: 0 },
        { name: 'Blood Bank Income', amount: 0 },
        { name: 'Ambulance Income', amount: 0 },
        { name: 'General Income', amount: 0 },
        { name: 'Expenses', amount: 0, highlight: true }
    ];

    // Function to handle date changes in the calendar
    const onDateChange = newDate => {
        setDate(newDate);
    };

    // Scroll to the calendar section when the calendar icon is clicked
    const scrollToCalendar = () => {
        if (calendarRef.current) {
            calendarRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="dashboard">
            <div className="header">
                {/* Calendar Icon */}
                <FontAwesomeIcon
                    icon={faCalendarCheck}
                    className="header-icon"
                    onClick={scrollToCalendar} // Add click event to scroll
                />
            </div>

            <div className="cards-container">
                {categories.map((category, index) => (
                    <div
                        key={index}
                        className={`card ${category.highlight ? 'highlight' : ''}`}
                    >
                        <h3>{category.name}</h3>
                        <p>₹{category.amount.toFixed(2)}</p>
                    </div>
                ))}
            </div>

            <div className="chart-section">
                <h3>Yearly Income & Expense</h3>
                <div className="chart-placeholder">
                    {/* Replace with a real chart component such as Chart.js */}
                    <p>Chart goes here</p>
                </div>
            </div>

            <div className="calendar-section" ref={calendarRef}> {/* Use ref to target calendar */}
                <h3>Calendar</h3>
                <div className="calendar-placeholder">
                    {/* Use the Calendar component from react-calendar */}
                    <Calendar
                        onChange={onDateChange} // Handle date changes
                        value={date} // Set the selected date
                    />
                    <p>Selected Date: {date.toDateString()}</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
