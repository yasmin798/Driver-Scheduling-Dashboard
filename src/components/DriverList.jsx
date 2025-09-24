import React from 'react';
import './DriverList.css';

const DriverList = ({ drivers }) => {
  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'available':
        return 'status-available';
      case 'on route':
        return 'status-on-route';
      case 'break':
        return 'status-break';
      default:
        return 'status-available';
    }
  };

  return (
    <div className="driver-list">
      {drivers.map(driver => (
        <div key={driver.id} className="driver-card">
          <div className="driver-header">
            <div 
              className="driver-avatar"
              style={{ backgroundColor: driver.color }}
            >
              {driver.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="driver-info">
              <h3>{driver.name}</h3>
              <p className="driver-license">{driver.license}</p>
            </div>
            <span 
              className={`status-badge ${getStatusClass(driver.availability)}`}
            >
              {driver.availability}
            </span>
          </div>
          
          <div className="driver-details">
            <p><strong>Email:</strong> {driver.email}</p>
            <p><strong>Phone:</strong> {driver.phone}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DriverList;