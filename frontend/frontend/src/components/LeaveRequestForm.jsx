import React, { useState } from 'react';

function PublicLeaveRequest() {
  const [employeeId, setEmployeeId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage(null);
    setError(null);

    // 1. Create the new request object
    const newRequest = {
      employeeId: parseInt(employeeId, 10),
      startDate,
      endDate,
      reason
      // The 'status' will be set to "Pending" by your backend
    };

    try {
      // 2. Send it to your backend API
      const response = await fetch('http://localhost:8080/api/leaverequests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRequest),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to submit request');
      }

      // 3. Show a success message and clear the form
      setMessage('Leave request submitted successfully! A manager will review it.');
      setEmployeeId('');
      setStartDate('');
      setEndDate('');
      setReason('');

    } catch (err) {
      console.error('Error:', err);
      setError(`Failed to submit request: ${err.message}`);
    }
  };

  // --- Styling ---
  const formStyle = { margin: '2rem auto', padding: '2rem', maxWidth: '500px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', borderRadius: '8px', backgroundColor: '#fff' };
  const divStyle = { marginBottom: '1rem', display: 'flex', flexDirection: 'column' };
  const labelStyle = { fontWeight: '600', marginBottom: '0.5rem' };
  const inputStyle = { padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem' };
  const buttonStyle = { padding: '0.75rem 1.5rem', border: 'none', borderRadius: '4px', backgroundColor: '#007bff', color: 'white', fontSize: '1rem', cursor: 'pointer' };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h2>Submit Leave Request</h2>
      <p>Please fill out your request. A manager will review it.</p>
      
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div style={divStyle}>
        <label style={labelStyle}>Employee ID:</label>
        <input
          type="number"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          required
          style={inputStyle}
        />
      </div>

      <div style={divStyle}>
        <label style={labelStyle}>Reason:</label>
        <input
          type="text"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          required
          style={inputStyle}
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
  );
}

export default PublicLeaveRequest;