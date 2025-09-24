import React from 'react';
import './CalendarView.css';

const CalendarView = ({ drivers, routes }) => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const hours = Array.from({ length: 12 }, (_, i) => i + 7);

  const getRouteForTime = (dayIndex, hour) => {
    return routes.filter(route => {
      if (!route.date) return false;
      const routeDate = new Date(route.date);
      const routeHour = parseInt(route.time?.split(':')[0] || '0');
      return routeDate.getDay() === (dayIndex === 0 ? 7 : dayIndex) && routeHour === hour;
    });
  };

  return (
    <div className="calendar-view">
      <h2>Weekly Schedule</h2>
      <div className="calendar-grid">
        <div className="time-column">
          <div className="time-header">Time</div>
          {hours.map(hour => (
            <div key={hour} className="time-slot">
              {hour > 12 ? hour - 12 : hour}:00 {hour >= 12 ? 'PM' : 'AM'}
            </div>
          ))}
        </div>
        
        {days.map((day, dayIndex) => (
          <div key={day} className="day-column">
            <div className="day-header">{day}</div>
            {hours.map(hour => {
              const routesForSlot = getRouteForTime(dayIndex, hour);
              return (
                <div key={hour} className="time-slot">
                  {routesForSlot.map(route => (
                    <div 
                      key={route.id} 
                      className="calendar-event"
                      style={{ 
                        backgroundColor: drivers.find(d => d.id === route.assignedDriverId)?.color || '#95a5a6'
                      }}
                    >
                      <strong>{route.name}</strong>
                      <br />
                      {drivers.find(d => d.id === route.assignedDriverId)?.name || 'Unassigned'}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarView;