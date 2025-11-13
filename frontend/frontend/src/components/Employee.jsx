import React, { useState, useEffect } from 'react';
// REMOVED: Link from react-router-dom

function Employee() {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // This fetch URL is still correct
    fetch('http://localhost:8080/api/employees')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch. Is your Java server running?');
        }
        return response.json();
      })
      .then(data => {
        setEmployees(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError(error.message);
      });
  }, []); // The empty array [] means "run this only once"

  const containerStyle = {
    fontFamily: 'Arial, sans-serif',
    margin: '2rem',
    padding: '2rem',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
  };

  const listStyle = {
    listStyleType: 'none',
    padding: 0,
  };

  const listItemStyle = {
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    padding: '1rem',
    marginBottom: '1rem',
    borderRadius: '4px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  };

  if (error) {
    return <div style={containerStyle}><h2>Error: {error}</h2></div>;
  }

  if (employees.length === 0) {
    return <div style={containerStyle}><h2>Loading... or No Employees Found.</h2></div>;
  }

  return (
    <div style={containerStyle}>
      <h2 style={{ borderBottom: '2px solid #007bff', paddingBottom: '0.5rem' }}>Employee List</h2>
      
      {/* --- REMOVED THE "ADD NEW EMPLOYEE" BUTTON --- */}

      <ul style={listStyle}>
        {employees.map(employee => (
          <li key={employee.id || employee._id} style={listItemStyle}>
            <strong>Name: {employee.name || 'N/A'}</strong>
            <div>ID: {employee.id}</div>
            <div>Department: {employee.department || 'N/A'}</div>
            <div>Role: {employee.role || 'N/A'}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Employee;