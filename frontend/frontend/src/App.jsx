// REMOVED: import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom'; // <-- Changed this line

// ADDED .jsx to all component imports
import Dashboard from './components/Dashboard.jsx';
import Employee from './components/Employee.jsx';
import EmployeeForm from './components/EmployeeForm.jsx';
import './App.css';

function App() {
  return (
    // REMOVED: <Router> from here
    <div className="App">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/employees" element={<Employee />} />
        <Route path="/employees/new" element={<EmployeeForm />} />
      </Routes>
    </div>
    // REMOVED: </Router> from here
  );
}

export default App;