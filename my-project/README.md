Project Overview
This is an Employee Management and Insights web application with authentication, employee CRUD, search, filter, and insights. The backend uses Node.js, Express, MongoDB, and JWT. The frontend uses React with Tailwind CSS.

Features Implemented

- User registration and login with JWT
- Add, view, update, and delete employees
- Search employees by name or department
- Filter by department, experience range, and salary range
- Insights: total employees, department counts, highest paid employee, average salary per department
- Responsive UI for mobile and desktop

Setup Instructions
Backend

1. Open terminal in backend folder
2. Install dependencies: npm install
3. Create .env file with:
   PORT=5000
   MONGO_URL=mongodb://127.0.0.1:27017/employeeDB
   JWT_SECRET=your_secret
4. Start server: npm start

Frontend

1. Open terminal in my-project folder
2. Install dependencies: npm install
3. Start dev server: npm run dev

URLs

- Backend: http://localhost:5000
- Frontend: http://localhost:5173
