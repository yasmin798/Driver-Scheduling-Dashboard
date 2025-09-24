export const initialDrivers = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@email.com",
    phone: "+1-555-0101",
    license: "DL123456",
    availability: "Available",
    color: "#3498db"
  },
  {
    id: 2,
    name: "Maria Garcia",
    email: "maria.garcia@email.com",
    phone: "+1-555-0102",
    license: "DL123457",
    availability: "Available",
    color: "#e74c3c"
  },
  {
    id: 3,
    name: "David Johnson",
    email: "david.johnson@email.com",
    phone: "+1-555-0103",
    license: "DL123458",
    availability: "On Route",
    color: "#2ecc71"
  }
];

export const initialRoutes = [
  {
    id: 1,
    name: "Downtown Express",
    startLocation: "Central Station",
    endLocation: "Financial District",
    distance: "15km",
    estimatedTime: "45 min",
    assignedDriverId: 1,
    status: "Assigned",
    date: "2024-01-15",
    time: "08:00"
  },
  {
    id: 2,
    name: "Airport Shuttle",
    startLocation: "City Center",
    endLocation: "International Airport",
    distance: "25km",
    estimatedTime: "1h 15min",
    assignedDriverId: null,
    status: "Unassigned",
    date: "2024-01-15",
    time: "10:30"
  },
  {
    id: 3,
    name: "Northside Route",
    startLocation: "Main Terminal",
    endLocation: "North Suburbs",
    distance: "20km",
    estimatedTime: "55 min",
    assignedDriverId: 3,
    status: "Assigned",
    date: "2024-01-15",
    time: "14:00"
  }
];