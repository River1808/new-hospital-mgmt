import { Routes, Route } from "react-router-dom"; 
import Dashboard from "./components/Dashboard.jsx";
import Employee from "./components/Employee.jsx";
// import EmployeeForm from "./components/EmployeeForm.jsx";
import AllShifts from "./components/AllShifts.jsx"; 
import AddShiftForm from "./components/AddShiftForm.jsx";
import AllLeaveRequests from "./components/AllLeaveRequests.jsx"; // <-- 1. IMPORT
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/employees" element={<Employee />} />
        {/* <Route path="/employees/new" element={<EmployeeForm />} /> */}
        
        <Route path="/shifts" element={<AllShifts />} /> 
        <Route path="/shifts/new" element={<AddShiftForm />} />

        <Route path="/leaverequests" element={<AllLeaveRequests />} /> 
      </Routes>
    </div>
  );
}

export default App;

