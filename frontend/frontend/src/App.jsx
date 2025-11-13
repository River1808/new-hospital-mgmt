import { Routes, Route } from "react-router-dom"; 
import Dashboard from "./components/Dashboard.jsx";
import Employee from "./components/Employee.jsx";
// REMOVED: EmployeeForm import
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/employees" element={<Employee />} />
        {/* REMOVED: The route for /employees/new */}
      </Routes>
    </div>
  );
}

export default App;