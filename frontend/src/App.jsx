import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Employee from './components/Employee';
import EmployeeForm from './components/EmployeeForm';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Route 1: The main dashboard */}
        <Route path="/" element={<Dashboard />} />
        
        {/* Route 2: The employee list page */}
        <Route path="/employees" element={<Employee />} />
        
        {/* Route 3: The "Add New Employee" form page */}
        <Route path="/employees/new" element={<EmployeeForm />} />
      </Routes>
    </Router>
  );
}

export default App;