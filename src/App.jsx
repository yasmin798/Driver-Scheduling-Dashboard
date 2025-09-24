import React, { useState } from 'react';
import DriverForm from './components/DriverForm';
import RouteForm from './components/RouteForm';
import Dashboard from './components/Dashboard';
import { initialDrivers, initialRoutes } from './data/mockData';
import './styles/App.css';

function App() {
  const [drivers, setDrivers] = useState(initialDrivers);
  const [routes, setRoutes] = useState(initialRoutes);
  const [activeTab, setActiveTab] = useState('dashboard');

  const addDriver = (driver) => {
    const newDriver = {
      ...driver,
      id: Date.now(),
      availability: 'Available',
      color: `#${Math.floor(Math.random()*16777215).toString(16)}`
    };
    setDrivers([...drivers, newDriver]);
  };

  const addRoute = (route) => {
    const newRoute = {
      ...route,
      id: Date.now(),
      status: route.assignedDriverId ? 'Assigned' : 'Unassigned'
    };
    setRoutes([...routes, newRoute]);
  };

  const assignDriver = (routeId, driverId) => {
    setRoutes(routes.map(route => 
      route.id === routeId 
        ? { ...route, assignedDriverId: driverId, status: 'Assigned' }
        : route
    ));
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>RouteFlow Manager</h1>
        <nav className="nav-tabs">
          <button 
            className={`tab-button ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            Dashboard
          </button>
          <button 
            className={`tab-button ${activeTab === 'driver' ? 'active' : ''}`}
            onClick={() => setActiveTab('driver')}
          >
            Add Driver
          </button>
          <button 
            className={`tab-button ${activeTab === 'route' ? 'active' : ''}`}
            onClick={() => setActiveTab('route')}
          >
            Add Route
          </button>
        </nav>
      </header>
      
      <main className="main-content">
        {activeTab === 'dashboard' && (
          <Dashboard 
            drivers={drivers} 
            routes={routes} 
            onAssignDriver={assignDriver}
          />
        )}
        {activeTab === 'driver' && (
          <DriverForm onAddDriver={addDriver} />
        )}
        {activeTab === 'route' && (
          <RouteForm onAddRoute={addRoute} drivers={drivers} />
        )}
      </main>
    </div>
  );
}

export default App;