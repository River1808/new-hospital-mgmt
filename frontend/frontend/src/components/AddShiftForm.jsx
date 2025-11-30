import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AddShiftForm() {
  const [employees, setEmployees] = useState([]); // To hold the full employee list
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(''); // The ID of the selected employee

  // These are for the form
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [role, setRole] = useState(''); // This will be auto-filled

  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8080/api/employees')
      .then(response => response.json())
      .then(data => {
        setEmployees(data);
      })
      .catch(error => {
        console.error("Failed to fetch employees:", error);
        setMessage("Failed to load employee list. Cannot add shifts.");
      });
  }, []); 

  const handleEmployeeChange = (e) => {
    const newEmployeeId = e.target.value;
    setSelectedEmployeeId(newEmployeeId);

    if (newEmployeeId) {
      const selectedEmp = employees.find(emp => emp.id == newEmployeeId);
      if (selectedEmp) {
        setRole(selectedEmp.role);
      }
    } else {
      setRole(''); 
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage(null);

    const newShift = {
      employeeId: parseInt(selectedEmployeeId, 10), 
      date: date,
      startTime: startTime,
      endTime: endTime,
      role: role 
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

  // --- STYLING ---
  const backgroundImageUrl = '/background1.jpg';

  const formStyle = { 
    margin: 'auto', 
    padding: '2rem', 
    maxWidth: '500px', 
    boxShadow: '0 8px 32px rgba(0,0,0,0.1)', 
    borderRadius: '12px', 
    width: '100%',
    backgroundColor: 'white',
    backdropFilter: 'blur(5px)'
  };

  const divStyle = { marginBottom: '1rem', display: 'flex', flexDirection: 'column' };
  const labelStyle = { fontWeight: '600', marginBottom: '0.5rem', color: '#325833' };
  const inputStyle = { padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem', backgroundColor: '#fff' };
  const readOnlyInputStyle = { ...inputStyle, backgroundColor: '#f3f4f6', color: '#555', cursor: 'not-allowed' }; 
  const buttonStyle = { padding: '0.75rem 1.5rem', border: 'none', borderRadius: '4px', backgroundColor: '#325822', color: 'white', fontSize: '1rem', cursor: 'pointer', fontWeight: 'bold', marginTop: '1rem' };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      width: '100%',
      backgroundImage: `url(${backgroundImageUrl})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed'
    }}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#1d351f' }}>Add New Shift</h2>

        {message && (
          <div style={{ padding: '10px', backgroundColor: '#ffebee', color: '#c62828', borderRadius: '4px', marginBottom: '1rem' }}>
            {message}
          </div>
        )}

        <div style={divStyle}>
          <label style={labelStyle}>Employee</label>
          <select
            value={selectedEmployeeId}
            onChange={handleEmployeeChange}
            required
            style={inputStyle}
          >
            <option value="">-- Select an Employee --</option>
            {employees.map(emp => (
              <option key={emp.databaseId} value={emp.id}>
                {emp.name} (ID: {emp.id})
              </option>
            ))}
          </select>
        </div>

        <div style={divStyle}>
          <label style={labelStyle}>Role</label>
          <input
            type="text"
            value={role}
            required
            style={readOnlyInputStyle}
            readOnly 
            placeholder="Auto-filled"
          />
        </div>

        <div style={divStyle}>
          <label style={labelStyle}>Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            style={inputStyle}
          />
        </div>

        <div style={divStyle}>
          <label style={labelStyle}>Start Time</label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
            style={inputStyle}
          />
        </div>

        <div style={divStyle}>
          <label style={labelStyle}>End Time</label>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
            style={inputStyle}
          />
        </div>

        <div style={{ textAlign: 'center' }}>
          <button type="submit" style={buttonStyle}>Submit Shift</button>
        </div>

      </form>
    </div>
  );
}

export default AddShiftForm;