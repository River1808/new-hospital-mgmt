import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Employee() {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8080/api/employees')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch. Is your Java server running?');
        }
        return response.json();
      })
      .then(data => {
        setEmployees(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        console.error('Error fetching employees:', err);
        setLoading(false);
      });
  }, []); 

  const containerStyle = { padding: '2rem' };
  const listStyle = { listStyleType: 'none', padding: 0 };
  const listItemStyle = { border: '1px solid #ccc', padding: '10px', marginBottom: '5px', borderRadius: '5px' };
  const buttonStyle = { marginBottom: '1rem', padding: '0.5rem 1rem', backgroundColor: '#28a745', color: 'white', textDecoration: 'none', border: 'none', borderRadius: '4px' };

  if (loading) {
    return <div style={containerStyle}>Loading employees...</div>;
  }

  if (error) {
    return <div style={containerStyle}>Error: {error}. Check the Java terminal.</div>;
  }

  return (
    <div style={containerStyle}>
      <h2>Employee List</h2>
      
      <Link to="/employees/new">
        <button style={buttonStyle}>Add New Employee</button>
      </Link>

      {employees.length === 0 ? (
        <p>No employees found.</p>
      ) : (
        <ul style={listStyle}>
          {employees.map((employee) => (
            
            // --- 1. THIS IS THE FIX ---
            // The key is now the databaseId (the unique _id string)
            <li key={employee.databaseId} style={listItemStyle}>
              
              {/* --- 2. THIS IS THE FIX --- */}
              {/* We display the user's "id" (the number) */}
              <strong>{employee.name} (ID: {employee.id})</strong>
              <br />
              Role: {employee.role}
              <br />
              Department: {employee.department}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Employee;