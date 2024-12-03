import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const events = [];

const CalendarComponent = () => {
  return (
    <div className="calendar-container">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        views={['month', 'week', 'day']}
        defaultView="week"
        min={new Date(2024, 6, 21, 0, 0, 0)}
        max={new Date(2024, 6, 21, 23, 59, 59)}
        step={60}
        timeslots={1}
      />
    </div>
  );
};

export default CalendarComponent;
