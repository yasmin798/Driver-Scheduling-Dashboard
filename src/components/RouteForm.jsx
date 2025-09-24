import React, { useState } from 'react';
import './RouteForm.css';

const RouteForm = ({ onAddRoute, drivers }) => {
  const [formData, setFormData] = useState({
    name: '',
    startLocation: '',
    endLocation: '',
    distance: '',
    estimatedTime: '',
    assignedDriverId: '',
    date: '',
    time: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.startLocation && formData.endLocation) {
      onAddRoute(formData);
      setFormData({
        name: '',
        startLocation: '',
        endLocation: '',
        distance: '',
        estimatedTime: '',
        assignedDriverId: '',
        date: '',
        time: ''
      });
    } else {
      alert('Please fill in all required fields');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="route-form-container">
      <div className="form-card">
        <div className="form-header">
          <h2>Add New Route</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-content">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Route Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="distance">Distance</label>
                <input
                  type="text"
                  id="distance"
                  name="distance"
                  value={formData.distance}
                  onChange={handleChange}
                  placeholder="e.g., 15km"
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="startLocation">Start Location *</label>
                <input
                  type="text"
                  id="startLocation"
                  name="startLocation"
                  value={formData.startLocation}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="endLocation">End Location *</label>
                <input
                  type="text"
                  id="endLocation"
                  name="endLocation"
                  value={formData.endLocation}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="estimatedTime">Estimated Time</label>
                <input
                  type="text"
                  id="estimatedTime"
                  name="estimatedTime"
                  value={formData.estimatedTime}
                  onChange={handleChange}
                  placeholder="e.g., 45 min"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="assignedDriverId">Assign Driver</label>
                <select
                  id="assignedDriverId"
                  name="assignedDriverId"
                  value={formData.assignedDriverId}
                  onChange={handleChange}
                >
                  <option value="">Select a driver</option>
                  {drivers.map(driver => (
                    <option key={driver.id} value={driver.id}>
                      {driver.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="date">Date</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="time">Time</label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          
          <div className="form-footer">
            <button type="submit" className="btn btn-primary add-btn">
              Add Route
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RouteForm;