# Driver Scheduling Dashboard

A React-based frontend app for managing drivers and routes, with assignment tracking.

## Features Implemented
- **Driver Form:** Add new drivers with name (required, min 2 characters), email (required, valid format), phone (optional, 10-15 digits validation), and license (required, min 6 characters). Form includes real-time validation, error messages, character counters, and loading state on submit.
- **Route Form:** Add new routes with name (required), start location (required), end location (required), distance (optional), estimated time (optional), assigned driver (optional from available drivers), date (optional), and time (optional).
- **Dashboard:** Displays list of routes with assignment status (assigned/unassigned) including details like locations, distance, time, and driver name; list of drivers with details like email, phone, license, and availability status; statistics panel (total drivers/routes, assigned routes, completion rate); tabbed views (overview and calendar); search/filter functionality (by name/search term, status, assigned driver).
- **Data Handling:** Uses local state (React hooks) with mock JSON for initial drivers and routes (resets on refresh).
- **Bonus Features:** Calendar-style view to visualize driver availability and route schedules by day and time, with color-coded events; search/filter functionality for routes and drivers; toast notifications component (though not actively used in main app flow); responsive design with animations and gradient styling.

## Assumptions Made
- No backend—data stored in local state/mock JSON (resets on refresh).
- Driver availability is boolean/simple string status (e.g., "Available", "On Route") and not based on real-time calculations or conflicts.
- Routes can be assigned to one driver; assignment updates status to "Assigned" without checking driver availability conflicts.
- UI uses basic CSS with gradients and animations; no external styling libraries (e.g., Tailwind) beyond React defaults.
- Dates and times are simple strings or date/time inputs; no advanced date handling (e.g., timezones, conflicts).
- Mock data initializes 3 drivers and 3 routes; real-world use would require persistence.
- App is a single-page application with client-side tab navigation; no server-side rendering assumed.

## Setup Instructions
1. Clone the repo: `git clone https://github.com/yasmin798/Driver-Scheduling-Dashboard.git`
2. Install dependencies: `cd driver-scheduling-dashboard && npm install`
3. Run locally: `npm start` (opens at http://localhost:3000)
4. Build for production: `npm run build`

## Deployment
- **Live URL:** [Vercel URL, e.g., https://driver-scheduling-dashboard-ceagnf5dq.vercel.app/]
- **GitHub Repo:** [GitHub URL, e.g., https://github.com/yasmin798/Driver-Scheduling-Dashboard]

Built with React and Vite.