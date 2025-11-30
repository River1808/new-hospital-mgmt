import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Employee() {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // --- FETCH EMPLOYEES ---
  const fetchEmployees = () => {
    fetch('http://localhost:8080/api/employees')
      .then(response => {
        if (!response.ok) throw new Error('Failed to fetch.');
        return response.json();
      })
      .then(data => {
        setEmployees(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // --- DELETE HANDLER ---
  const handleDelete = async (e, id) => {
    e.stopPropagation();
    if (!window.confirm(`Are you sure you want to delete Employee #${id}?`)) return;

    try {
      const response = await fetch(`http://localhost:8080/api/employees/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchEmployees();
      } else {
        alert("Failed to delete. Check console.");
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const filteredEmp = employees.filter((emp) => {
    const term = searchTerm.toLowerCase();
    return (
      (emp.name || '').toLowerCase().includes(term) ||
      (emp.role || '').toLowerCase().includes(term) ||
      (emp.department || '').toLowerCase().includes(term)
    );
  });

  const handleRowClick = (employee) => {
    setSelectedEmployee(employee);
  };

  const closeModal = () => {
    setSelectedEmployee(null);
  };

  // --- STYLES ---
  const pageWrapperStyle = {
    minHeight: '100vh',
    width: '100%',
    backgroundImage: `url('/background1.jpg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
  };

  const containerStyle = { padding: '2rem', margin: '2rem', backgroundColor: 'white', borderRadius: '10px', width: '100%' };

  const modalOverlayStyle = {
    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
  };

  const modalContentStyle = {
    backgroundColor: 'white', padding: '2rem', borderRadius: '12px',
    maxWidth: '500px', width: '90%', boxShadow: '0 10px 25px rgba(0,0,0,0.2)', position: 'relative'
  };

  if (loading) return <div style={containerStyle}>Loading employees...</div>;
  if (error) return <div style={containerStyle}>Error: {error}</div>;

  return (
    <div style={pageWrapperStyle}>
      <div style={containerStyle}>
        <h2 style={{ color: '#1D351F' }}>EMPLOYEE LIST</h2>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <input
            type="text" placeholder='Search Employee' value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', width: '30%', outline: 'none' }}
          />
          <Link to="/employees/new">
            <button style={{ padding: '0.5rem 1rem', borderRadius: '4px', border: 'none', backgroundColor: '#06ad14ff', color: '#fff', cursor: 'pointer', marginRight: '0.5rem' }}>Add Employee</button>
          </Link>
        </div>

        {employees.length === 0 ? (
          <p>No employees found.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ textAlign: 'center' }}>
                <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb', width: '10%', color: '#325833' }}>ID</th>
                <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb', width: '30%', color: '#325833' }}>NAME</th>
                <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb', width: '20%', color: '#325833' }}>ROLE</th>
                <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb', width: '20%', color: '#325833' }}>DEPARTMENT</th>
                <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb', width: '10%', color: '#325833' }}>ACTIONS</th>
              </tr>
            </thead>

            <tbody>
              {filteredEmp.map((employee, index) => {
                const key = employee.databaseId || index;
                return (
                  <tr
                    key={key}
                    style={{ borderBottom: '1px solid #f3f4f6', cursor: 'pointer' }}
                    onClick={() => handleRowClick(employee)}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f9f9f9'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}
                  >
                    <td style={{ padding: '0.75rem', textAlign: 'center' }}>{employee.id || '-'}</td>
                    <td style={{ padding: '0.75rem', color: '#8B181D', fontWeight: 'bold' }}>{employee.name || 'Unknown'}</td>
                    <td style={{ padding: '0.75rem' }}>{employee.role || '-'}</td>
                    <td style={{ padding: '0.75rem' }}>{employee.department || '-'}</td>
                    <td style={{ padding: '0.75rem', textAlign: 'center' }}>
                      <button onClick={(e) => handleDelete(e, employee.id)} style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', padding: '5px 10px', cursor: 'pointer' }}>Delete</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}

        {selectedEmployee && (
          <div style={modalOverlayStyle} onClick={closeModal}>
            <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
              <h2 style={{ marginTop: '0', marginBottom: '0.5rem', borderBottom: '1px solid #eee', paddingBottom: '10px', color: '#8B181D' }}>
                {selectedEmployee.name}
              </h2>
              <div style={{ marginBottom: '15px', color: '#325833' }}>
                {selectedEmployee.role}
              </div>

              {/* --- DISPLAYING THE FINAL METHOD CALCULATION --- */}
              <div style={{ marginBottom: '15px', backgroundColor: '#e3f2fd', padding: '10px', borderRadius: '6px', borderLeft: '4px solid #007bff' }}>
                <strong style={{ color: '#007bff' }}>Official Email</strong><br />
                <span style={{ fontFamily: 'monospace', fontSize: '1.1em' }}>
                  {selectedEmployee.companyEmail || "Loading..."}
                </span>
              </div>

              <div style={{ backgroundColor: '#f8f9fa', padding: '1rem', borderRadius: '8px', marginBottom: '1rem', borderLeft: '4px solid #28a745' }}>
                <h4 style={{ margin: '0 0 5px 0', color: '#28a745' }}>Details</h4>
                <p style={{ margin: 0 }}>
                  {selectedEmployee.details ? selectedEmployee.details : <em style={{ color: '#999' }}>Data unavailable (Please re-add this employee)</em>}
                </p>
              </div>

              <div style={{ backgroundColor: '#fff3cd', padding: '1rem', borderRadius: '8px', marginBottom: '1rem', borderLeft: '4px solid #ffc107' }}>
                <h4 style={{ margin: '0 0 5px 0', color: '#856404' }}>Working Schedule</h4>
                <p style={{ margin: 0 }}>
                  {selectedEmployee.workingDays ? selectedEmployee.workingDays : <em style={{ color: '#999' }}>Data unavailable (Please re-add this employee)</em>}
                </p>
              </div>

              <div style={{ textAlign: 'right' }}>
                <button onClick={closeModal} style={{ padding: '8px 16px', background: '#325833', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Close</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Employee;