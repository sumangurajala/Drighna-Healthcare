import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import CSS for the calendar
import { useNavigate } from 'react-router-dom';

// Optional: you can add styles for the page here

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date()); // Store selected date
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const [eventTitle, setEventTitle] = useState(""); // Event title state
  const [eventDescription, setEventDescription] = useState(""); // Event description state
  const [notificationContent, setNotificationContent] = useState(null); // Content for the notification
  const navigate = useNavigate();

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setShowModal(true); // Show modal when a date is selected

    // Set notification content based on the selected date (here you can define your own content)
    setNotificationContent({
      title: "New Event Scheduled",
      message: `Event for the selected date (${date.toDateString()}) is ready. Please check the details.`,
    });
  };

  const handleCloseModal = () => {
    setShowModal(false); // Close modal
  };

  const handleSubmitEvent = () => {
    // Handle event submission here
    console.log('New Event:', { title: eventTitle, description: eventDescription, date: selectedDate });
    setShowModal(false); // Close the modal after submitting
    setEventTitle(""); // Reset input fields
    setEventDescription("");
  };

  return (
    <div className="calendar-page">
      <button onClick={() => navigate(-1)} className="back-button">
        Back to Dashboard
      </button>
      <h2 className="calendar-title">Select a Date</h2>
      <div className="calendar-container">
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
        />
      </div>
      <p className="selected-date">
        Selected Date: {selectedDate.toDateString()}
      </p>

      {/* Notification Alert Box */}
      {notificationContent && (
        <div className="notification-alert">
          <div className="notification-alert-content">
            <h3>{notificationContent.title}</h3>
            <p>{notificationContent.message}</p>
            <button className="close-alert" onClick={() => setNotificationContent(null)}>Close</button>
          </div>
        </div>
      )}

      {/* Modal for Adding New Event */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Add New Event</h3>
            <form onSubmit={(e) => { e.preventDefault(); handleSubmitEvent(); }}>
              <label>
                Event Title:
                <input 
                  type="text" 
                  value={eventTitle} 
                  onChange={(e) => setEventTitle(e.target.value)} 
                  required 
                />
              </label>
              <label>
                Description:
                <textarea
                  value={eventDescription}
                  onChange={(e) => setEventDescription(e.target.value)}
                  required
                ></textarea>
              </label>
              <button type="submit" className="submit-button">Add Event</button>
            </form>
            <button className="close-button" onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarPage;
