import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Employee() {
  const [employees, setEmployees] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/employees');
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setEmployees(data); // Save the employee data in state
      } catch (err) {
        setError(err.message);
        console.error('Error fetching employees:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []); 

  if (loading) {
    return <div>Loading employees...</div>;
  }

  if (error) {
    return <div>Error: {error}. Is your Java server running?</div>;
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Employee List</h2>
      
      {/* Link to go to the "Add Employee" form */}
      <Link to="/employees/new">
        <button style={{ marginBottom: '1rem' }}>Add New Employee</button>
      </Link>

      {/* Check if there are employees to show */}
      {employees.length === 0 ? (
        <p>No employees found. Add one!</p>
      ) : (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {/* Map over the employees in state and display them */}
          {employees.map(employee => (
            <li key={employee.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '5px', borderRadius: '5px' }}>
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