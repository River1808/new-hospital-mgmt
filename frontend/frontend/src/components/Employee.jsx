import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Employee() {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
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

  // Filter
  const filteredEmp = employees.filter((emp) => {
    const term = searchTerm.toLowerCase();
    return (
      (emp.name || '').toLowerCase().includes(term) ||
      (emp.role || '').toLowerCase().includes(term) ||
      (emp.department || '').toLowerCase().includes(term)
    );
  });

  const containerStyle = { padding: '2rem', margin: '2rem', backgroundColor: 'white', borderRadius: '10px' };

  if (loading) 
    return <div style={containerStyle}>Loading employees...</div>;

  if (error) 
    return <div style={containerStyle}>Error: {error}. Check the Java terminal.</div>;

  return (
    <div style={containerStyle}>
      <h2>EMPLOYEE LIST</h2>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem'}}>
        <input 
            type="text"
            placeholder='Search Employee'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', width: '30%', outline: 'none'}}
        />

        <Link to="/employees/new">
          <button style={{
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            border: 'none',
            backgroundColor: '#06ad14ff',
            color: '#fff',
            cursor: 'pointer',
            marginRight: '0.5rem'
          }}
          >Add Employee</button>
        </Link>
      </div>

      {employees.length === 0 ? (
        <p>No employees found.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ backgroundColor: '#e6e6e6ff', textAlign: 'center' }}>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb', width: '10%' }}>ID</th>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb', width: '40%' }}>Name</th>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb', width: '20%' }}>Role</th>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb', width: '20%' }}>Department</th>
            </tr>
          </thead>

          <tbody>
            {filteredEmp.map((employee, index) => {
              // Use databaseId as the unique key (this is the ObjectId string)
              const key = employee.databaseId || index; 

              return (
                <tr key={key} style={{ borderBottom: '1px solid #f3f4f6' }}>
                  <td style={{ padding: '0.75rem', textAlign: 'center' }}>{employee.id || '-'}</td>
                  <td style={{ padding: '0.75rem' }}>
                    <strong>{employee.name || 'Unknown'}</strong>
                  </td>
                  <td style={{ padding: '0.75rem' }}>{employee.role || '-'}</td>
                  <td style={{ padding: '0.75rem' }}>{employee.department || '-'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Employee;