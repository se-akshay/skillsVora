# React Frontend Setup

## Installation

Make sure you're in the `my-project` folder:

```bash
cd my-project
npm install
```

## Running Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Build for Production

```bash
npm run build
```

## API Configuration

Make sure your backend is running on `http://localhost:3000`

The frontend is configured to connect to:

- Login/Register: `POST http://localhost:3000/api/auth/register` and `http://localhost:3000/api/auth/login`
- Employees: `http://localhost:3000/api/employee`

## Features

- ✅ Login/Register
- ✅ View All Employees
- ✅ Add New Employee
- ✅ Edit Employee
- ✅ Delete Employee
- ✅ Search Employees
- ✅ Filter Employees
- ✅ View Insights

## Component Structure

```
src/
├── components/
│   ├── Login.jsx              - Authentication
│   ├── Dashboard.jsx          - Main layout
│   ├── Navbar.jsx             - Top navigation
│   ├── Sidebar.jsx            - Side navigation
│   ├── ViewEmployees.jsx      - View all employees
│   ├── AddEmployee.jsx        - Add new employee
│   ├── EditEmployeeModal.jsx  - Edit employee
│   ├── SearchEmployee.jsx     - Search functionality
│   ├── FilterEmployee.jsx     - Filter functionality
│   └── Insights.jsx           - Data insights
└── App.jsx                    - Main app component
```

All components use Tailwind CSS for styling.
