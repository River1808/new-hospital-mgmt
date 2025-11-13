import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddShiftForm() {
  const [employeeId, setEmployeeId] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [role, setRole] = useState('');
  
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage(null); 

    const newShift = {
      employeeId: parseInt(employeeId, 10), // Send as a number
      date: date,             // "YYYY-MM-DD"
      startTime: startTime,   // "HH:MM"
      endTime: endTime,       // "HH:MM"
      role: role
    };

    try {
      // 2. Send it to your backend API
      const response = await fetch('http://localhost:8080/api/shifts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newShift),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to create shift');
      }

      // 3. Go back to the shift list page on success
      navigate('/shifts'); 

    } catch (error) {
      console.error('Error:', error);
      setMessage(`Failed to create shift: ${error.message}`);
    }
  };

  // --- Styling (Same as your EmployeeForm) ---
  const formStyle = { margin: '2rem auto', padding: '2rem', maxWidth: '500px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', borderRadius: '8px', backgroundColor: '#fff' };
  const divStyle = { marginBottom: '1rem', display: 'flex', flexDirection: 'column' };
  const labelStyle = { fontWeight: '600', marginBottom: '0.5rem' };
  const inputStyle = { padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem' };
  const buttonStyle = { padding: '0.75rem 1.5rem', border: 'none', borderRadius: '4px', backgroundColor: '#007bff', color: 'white', fontSize: '1rem', cursor: 'pointer' };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h2>Add New Shift</h2>
      
      {message && <p style={{ color: 'red' }}>{message}</p>}

      <div style={divStyle}>
        <label style={labelStyle}>Employee ID:</label>
        <input
          type="number" // Use "number" type
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          required
          style={inputStyle}
        />
      </div>

      <div style={divStyle}>
        <label style={labelStyle}>Role:</label>
        <input
          type="text"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
          style={inputStyle}
        />
      </div>

      <div style={divStyle}>
        <label style={labelStyle}>Date:</label>
        <input
          type="date" // This gives you the "YYYY-MM-DD" format
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          style={inputStyle}
        />
      </div>

      <div style={divStyle}>
        <label style={labelStyle}>Start Time:</label>
        <input
          type="time" // This gives you the "HH:MM" format
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
          style={inputStyle}
        />
      </div>

      <div style={divStyle}>
        <label style={labelStyle}>End Time:</label>
        <input
          type="time" // This gives you the "HH:MM" format
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