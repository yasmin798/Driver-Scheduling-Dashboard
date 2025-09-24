import React from 'react';
import './RouteList.css';

const RouteList = ({ routes, drivers, onAssignDriver }) => {
  const getDriverName = (driverId) => {
    const driver = drivers.find(d => d.id === driverId);
    return driver ? driver.name : 'Unassigned';
  };

  const handleAssignDriver = (routeId, driverId) => {
    if (driverId) {
      onAssignDriver(routeId, parseInt(driverId));
    }
  };

  return (
    <div className="route-list">
      {routes.map(route => (
        <div key={route.id} className={`route-card ${route.status.toLowerCase()}`}>
          <div className="route-header">
            <h3>{route.name}</h3>
            <span className={`status-badge ${route.status.toLowerCase()}`}>
              {route.status}
            </span>
          </div>
          
          <div className="route-details">
            <p><strong>From:</strong> {route.startLocation}</p>
            <p><strong>To:</strong> {route.endLocation}</p>
            <p><strong>Distance:</strong> {route.distance}</p>
            <p><strong>Time:</strong> {route.estimatedTime}</p>
            {route.date && <p><strong>Date:</strong> {route.date}</p>}
            {route.time && <p><strong>Time:</strong> {route.time}</p>}
          </div>
          
          <div className="route-assignment">
            <p><strong>Driver:</strong> {getDriverName(route.assignedDriverId)}</p>
            {route.status === 'Unassigned' && (
              <select 
                onChange={(e) => handleAssignDriver(route.id, e.target.value)}
                className="driver-select"
              >
                <option value="">Assign driver...</option>
                {drivers.filter(d => d.availability === 'Available').map(driver => (
                  <option key={driver.id} value={driver.id}>
                    {driver.name}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RouteList;