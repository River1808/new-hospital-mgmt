import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function LeaveRequestForm() {
  const [employees, setEmployees] = useState([]);
  const [employeeId, setEmployeeId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');

  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/employees');
        if (!response.ok) {
            throw new Error("Could not fetch employee list");
        }
        const data = await response.json();
        setEmployees(data);
      } catch (err) {
        console.error("Error loading employees:", err);
        setError("Failed to load employee list. Please try again later.");
      }
    };

    fetchEmployees();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage(null);
    setError(null);

    if (!employeeId) {
        setError("Please select an employee.");
        return;
    }

    // 1. Create the new request object
    const newRequest = {
      employeeId: parseInt(employeeId, 10),
      startDate,
      endDate,
      reason
    };

    try {
      const response = await fetch('http://localhost:8080/api/leaverequests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRequest),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to submit request');
      }

      setMessage('Leave request submitted successfully!');

      setEmployeeId('');
      setStartDate('');
      setEndDate('');
      setReason('');

    } catch (err) {
      console.error('Error:', err);
      setError(`Failed to submit request: ${err.message}`);
    }
  };


  const pageStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 'calc(100vh - 60px)',
    backgroundImage: `url("/hospital-bg.jpg")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    padding: "2rem"
  };

  const formStyle = {
    padding: '2rem',
    maxWidth: '500px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
    borderRadius: '10px',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    width: '100%'
  };

  const divStyle = { marginBottom: '1rem', display: 'flex', flexDirection: 'column' };
  const labelStyle = { fontWeight: '600', marginBottom: '0.5rem', color: '#325833' };
  const inputStyle = { padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem', outline: 'none', backgroundColor: 'white' };
  const buttonStyle = { padding: '0.75rem 1.5rem', border: 'none', borderRadius: '4px', backgroundColor: '#325833', color: 'white', fontSize: '1rem', cursor: 'pointer', width: '100%', marginTop: '1rem' };

  return (
    <div style={pageStyle}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <h2 style={{textAlign: 'center', marginBottom: '1rem', color: '#1D351F'}}>Submit Leave Request</h2>
        <p style={{textAlign: 'left', marginBottom: '1rem', color: '#555'}}>Please fill out your request details below.</p>

        {message && <div style={{ textAlign: 'center', padding: '10px', backgroundColor: '#d4edda', color: '#155724', borderRadius: '4px', marginBottom: '1rem' }}>{message}</div>}
        {error && <div style={{ textAlign: 'center', padding: '10px', backgroundColor: '#f8d7da', color: '#721c24', borderRadius: '4px', marginBottom: '1rem' }}>{error}</div>}
        <div style={divStyle}>
          <label style={labelStyle}>Employee:</label>
          <select
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            required
            style={inputStyle}
          >
            <option value="">-- Select Your Name --</option>
            {employees.map(emp => {
                const empId = emp.employeeId || emp.id;
                return (
                    <option key={emp.databaseId || emp._id || empId} value={empId}>
                        {emp.name} (ID: {empId}) - {emp.role}
                    </option>
                );
            })}
          </select>
        </div>

        <div style={divStyle}>
          <label style={labelStyle}>Reason:</label>
          <input
            type="text"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
            style={inputStyle}
            placeholder="e.g., Family Vacation"
          />
        </div>

        <div style={divStyle}>
          <label style={labelStyle}>Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
            style={inputStyle}
          />
        </div>

        <div style={divStyle}>
          <label style={labelStyle}>End Date:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
            style={inputStyle}
          />
        </div>

        <button type="submit" style={buttonStyle}>Submit Request</button>
      </form>
    </div>
  );
}

export default LeaveRequestForm;