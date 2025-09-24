import React, { useState, useMemo } from 'react';
import DriverList from './DriverList';
import RouteList from './RouteList';
import CalendarView from './CalendarView';
import './Dashboard.css';

const Dashboard = ({ drivers, routes, onAssignDriver }) => {
  const [view, setView] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [driverFilter, setDriverFilter] = useState('all');

  // Statistics calculations
  const stats = useMemo(() => ({
    totalDrivers: drivers.length,
    totalRoutes: routes.length,
    assignedRoutes: routes.filter(route => route.status === 'Assigned').length,
    availableDrivers: drivers.filter(driver => driver.availability === 'Available').length,
    completionRate: routes.length > 0 ? Math.round((routes.filter(route => route.status === 'Assigned').length / routes.length) * 100) : 0
  }), [drivers, routes]);

  // Enhanced filtering
  const filteredDrivers = useMemo(() => {
    return drivers.filter(driver => {
      const matchesSearch = driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           driver.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           driver.license.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || 
                           driver.availability.toLowerCase() === statusFilter.toLowerCase();
      
      return matchesSearch && matchesStatus;
    });
  }, [drivers, searchTerm, statusFilter]);

  const filteredRoutes = useMemo(() => {
    return routes.filter(route => {
      const matchesSearch = route.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           route.startLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           route.endLocation.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || 
                           route.status.toLowerCase() === statusFilter.toLowerCase();
      
      const matchesDriver = driverFilter === 'all' || 
                           route.assignedDriverId?.toString() === driverFilter;
      
      return matchesSearch && matchesStatus && matchesDriver;
    });
  }, [routes, searchTerm, statusFilter, driverFilter]);

  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setDriverFilter('all');
  };

  const hasActiveFilters = searchTerm || statusFilter !== 'all' || driverFilter !== 'all';

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="view-controls">
          <button 
            className={`view-btn ${view === 'overview' ? 'active' : ''}`}
            onClick={() => setView('overview')}
          >
            📊 Overview
          </button>
          <button 
            className={`view-btn ${view === 'calendar' ? 'active' : ''}`}
            onClick={() => setView('calendar')}
          >
            📅 Calendar
          </button>
        </div>
        
        <div className="search-filters">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search drivers, routes, locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="filter-group">
            <select 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Status</option>
              <option value="available">Available</option>
              <option value="assigned">Assigned</option>
              <option value="unassigned">Unassigned</option>
              <option value="on route">On Route</option>
            </select>
            
            <select 
              value={driverFilter} 
              onChange={(e) => setDriverFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Drivers</option>
              {drivers.map(driver => (
                <option key={driver.id} value={driver.id}>
                  {driver.name}
                </option>
              ))}
            </select>
            
            {hasActiveFilters && (
              <button onClick={clearFilters} className="clear-filters-btn">
                Clear Filters
              </button>
            )}
          </div>
        </div>
      </div>

      {view === 'overview' ? (
        <>
          {/* Enhanced Statistics Cards */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">👥</div>
              <div className="stat-number">{stats.totalDrivers}</div>
              <div className="stat-label">Total Drivers</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🛣️</div>
              <div className="stat-number">{stats.totalRoutes}</div>
              <div className="stat-label">Total Routes</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">✅</div>
              <div className="stat-number">{stats.assignedRoutes}</div>
              <div className="stat-label">Assigned Routes</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">📊</div>
              <div className="stat-number">{stats.completionRate}%</div>
              <div className="stat-label">Completion Rate</div>
            </div>
          </div>

          {/* Filter Summary */}
          {hasActiveFilters && (
            <div className="filter-summary">
              Showing {filteredRoutes.length} routes and {filteredDrivers.length} drivers 
              {searchTerm && ` matching "${searchTerm}"`}
              {statusFilter !== 'all' && ` with status "${statusFilter}"`}
            </div>
          )}

          <div className="overview-grid">
            <div className="overview-section">
              <div className="section-header">
                <h2>Routes ({filteredRoutes.length})</h2>
                <span className="section-subtitle">
                  {routes.length - filteredRoutes.length} hidden by filters
                </span>
              </div>
              <RouteList 
                routes={filteredRoutes} 
                drivers={drivers}
                onAssignDriver={onAssignDriver}
              />
            </div>
            
            <div className="overview-section">
              <div className="section-header">
                <h2>Drivers ({filteredDrivers.length})</h2>
                <span className="section-subtitle">
                  {drivers.length - filteredDrivers.length} hidden by filters
                </span>
              </div>
              <DriverList drivers={filteredDrivers} />
            </div>
          </div>
        </>
      ) : (
        <CalendarView drivers={drivers} routes={routes} />
      )}
    </div>
  );
};

export default Dashboard;