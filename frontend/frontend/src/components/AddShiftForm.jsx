import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AddShiftForm() {
  // --- 1. NEW STATE ---
  const [employees, setEmployees] = useState([]); // To hold the full employee list
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(''); // The ID of the selected employee
  
  // These are for the form
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [role, setRole] = useState(''); // This will be auto-filled
  
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  // --- 2. FETCH ALL EMPLOYEES ON PAGE LOAD ---
  useEffect(() => {
    // This fetches your working employee list
    fetch('http://localhost:8080/api/employees')
      .then(response => response.json())
      .then(data => {
        setEmployees(data);
      })
      .catch(error => {
        console.error("Failed to fetch employees:", error);
        setMessage("Failed to load employee list. Cannot add shifts.");
      });
  }, []); // Empty array means run once on load

  // --- 3. NEW FUNCTION ---
  // This runs when you select an employee from the dropdown
  const handleEmployeeChange = (e) => {
    const newEmployeeId = e.target.value;
    setSelectedEmployeeId(newEmployeeId);

    if (newEmployeeId) {
      // Find the employee object from our list
      const selectedEmp = employees.find(emp => emp.id == newEmployeeId);
      if (selectedEmp) {
        // Auto-fill the role!
        setRole(selectedEmp.role);
      }
    } else {
      setRole(''); // Clear the role if no employee is selected
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage(null); 

    const newShift = {
      employeeId: parseInt(selectedEmployeeId, 10), // Send the selected ID
      date: date,
      startTime: startTime,
      endTime: endTime,
      role: role // Send the auto-filled role
    };

    try {
      const response = await fetch('http://localhost:8080/api/shifts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newShift),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to create shift');
      }

      navigate('/shifts'); 

    } catch (error) {
      console.error('Error:', error);
      setMessage(`Failed to create shift: ${error.message}`);
    }
  };

  // --- Styling (no changes) ---
  const formStyle = { margin: '2rem auto', padding: '2rem', maxWidth: '500px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', borderRadius: '8px', backgroundColor: '#fff' };
  const divStyle = { marginBottom: '1rem', display: 'flex', flexDirection: 'column' };
  const labelStyle = { fontWeight: '600', marginBottom: '0.5rem' };
  const inputStyle = { padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem', backgroundColor: '#fff' };
  const readOnlyInputStyle = { ...inputStyle, backgroundColor: '#eee' }; // Style for the disabled role
  const buttonStyle = { padding: '0.75rem 1.5rem', border: 'none', borderRadius: '4px', backgroundColor: '#007bff', color: 'white', fontSize: '1rem', cursor: 'pointer' };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h2>Add New Shift</h2>
      
      {message && <p style={{ color: 'red' }}>{message}</p>}

      {/* --- 4. THIS IS THE NEW DROPDOWN --- */}
      <div style={divStyle}>
        <label style={labelStyle}>Employee:</label>
        <select
          value={selectedEmployeeId}
          onChange={handleEmployeeChange}
          required
          style={inputStyle}
        >
          <option value="">-- Select an Employee --</option>
          {employees.map(emp => (
            // The key is the databaseId, the value is the user-facing id
            <option key={emp.databaseId} value={emp.id}>
              {emp.name} (ID: {emp.id})
            </option>
          ))}
        </select>
      </div>

      {/* --- 5. THIS IS THE AUTO-FILLED ROLE --- */}
      <div style={divStyle}>
        <label style={labelStyle}>Role:</label>
        <input
          type="text"
          value={role}
          required
          style={readOnlyInputStyle}
          readOnly // This makes it a "read-only" field
        />
      </div>

      <div style={divStyle}>
        <label style={labelStyle}>Date:</label>
        <input
          type="date" 
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          style={inputStyle}
        />
      </div>

      <div style={divStyle}>
        <label style={labelStyle}>Start Time:</label>
        <input
          type="time" 
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
          style={inputStyle}
        />
      </div>

      <div style={divStyle}>
        <label style={labelStyle}>End Time:</label>
        <input
          type="time" 
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          required
          style={inputStyle}
        />
      </div>

      <button type="submit" style={buttonStyle}>Submit Shift</button>
    </form>
  );
}

export default AddShiftForm;