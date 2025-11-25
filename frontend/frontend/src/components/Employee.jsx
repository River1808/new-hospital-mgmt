import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Employee() {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // --- FETCH EMPLOYEES (WITH DEBUGGING) ---
  const fetchEmployees = () => {
    console.log("--- FRONTEND DEBUG: Attempting to fetch employees... ---");
    
    fetch('http://localhost:8080/api/employees')
      .then(async response => {
        console.log("--- FRONTEND DEBUG: Response Received ---");
        console.log("Status Code:", response.status);
        console.log("Status Text:", response.statusText);

        if (!response.ok) {
          // Try to read the error text from the Java server
          const errorText = await response.text();
          console.error("Server Error Message:", errorText);
          throw new Error(`Server responded with ${response.status}: ${errorText}`);
        }
        return response.json();
      })
      .then(data => {
        console.log("--- FRONTEND DEBUG: JSON Data Parsed Successfully ---");
        console.log("Data received:", data);
        setEmployees(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("--- FRONTEND DEBUG: Fetch Failed Completely ---");
        console.error("Error Details:", err);
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
    if(!window.confirm(`Are you sure you want to delete Employee #${id}?`)) return;

    console.log(`--- FRONTEND DEBUG: Deleting ID ${id} ---`);

    try {
      const response = await fetch(`http://localhost:8080/api/employees/${id}`, {
        method: 'DELETE',
      });
      
      console.log("Delete response status:", response.status);

      if (response.ok) {
        console.log("Delete successful, refreshing list...");
        fetchEmployees();
      } else {
        const errText = await response.text();
        console.error("Delete failed:", errText);
        alert(`Failed to delete. Server said: ${errText}`);
      }
    } catch (error) {
      console.error("Delete network error:", error);
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
  const containerStyle = { padding: '2rem', margin: '2rem', backgroundColor: 'white', borderRadius: '10px' };

  const modalOverlayStyle = {
    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
  };

  const modalContentStyle = {
    backgroundColor: 'white', padding: '2rem', borderRadius: '12px',
    maxWidth: '500px', width: '90%', boxShadow: '0 10px 25px rgba(0,0,0,0.2)', position: 'relative'
  };

  if (loading) return <div style={containerStyle}>Loading employees... (Check Console F12 for Debug Logs)</div>;
  if (error) return <div style={containerStyle}><h3 style={{color:'red'}}>Connection Error</h3><p>{error}</p><p>Please check the Console (F12) and your Java Terminal.</p></div>;

  return (
    <div style={containerStyle}>
      <h2>EMPLOYEE LIST</h2>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem'}}>
        <input 
            type="text" placeholder='Search Employee' value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', width: '30%', outline: 'none'}}
        />
        <Link to="/employees/new">
          <button style={{padding: '0.5rem 1rem', borderRadius: '4px', border: 'none', backgroundColor: '#06ad14ff', color: '#fff', cursor: 'pointer', marginRight: '0.5rem'}}>Add Employee</button>
        </Link>
      </div>

      {employees.length === 0 ? (
        <p>No employees found.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ backgroundColor: '#e6e6e6ff', textAlign: 'center' }}>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb', width: '10%' }}>ID</th>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb', width: '30%' }}>Name</th>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb', width: '20%' }}>Role</th>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb', width: '20%' }}>Department</th>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb', width: '10%' }}>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredEmp.map((employee) => {
              // Use 'id' as the key since we're using integer IDs now
              const key = employee.id; 
              return (
                <tr 
                  key={key} 
                  style={{ borderBottom: '1px solid #f3f4f6', cursor: 'pointer' }}
                  onClick={() => handleRowClick(employee)}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f9f9f9'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}
                >
                  <td style={{ padding: '0.75rem', textAlign: 'center' }}>{employee.id || '-'}</td>
                  <td style={{ padding: '0.75rem', color: '#007bff', fontWeight: 'bold' }}>{employee.name || 'Unknown'}</td>
                  <td style={{ padding: '0.75rem' }}>{employee.role || '-'}</td>
                  <td style={{ padding: '0.75rem' }}>{employee.department || '-'}</td>
                  <td style={{ padding: '0.75rem', textAlign: 'center' }}>
                    <button onClick={(e) => handleDelete(e, employee.id)} style={{backgroundColor: '#dc3545', color:'white', border:'none', borderRadius:'4px', padding:'5px 10px', cursor:'pointer'}}>Delete</button>
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
            <h3 style={{marginTop:0, borderBottom:'1px solid #eee', paddingBottom:'10px', color: '#007bff'}}>
              {selectedEmployee.name}
            </h3>
            <div style={{marginBottom:'15px', color:'#555'}}>
              <strong>Role:</strong> {selectedEmployee.role}
            </div>

            {/* --- DISPLAYING THE FINAL METHOD CALCULATION --- */}
            <div style={{marginBottom:'15px', backgroundColor:'#e3f2fd', padding:'10px', borderRadius:'6px', borderLeft:'4px solid #007bff'}}>
              <strong style={{color:'#007bff'}}>Official Email:</strong><br/>
              <span style={{fontFamily:'monospace', fontSize:'1.1em'}}>
                {selectedEmployee.companyEmail || "Loading..."}
              </span>
            </div>

            <div style={{backgroundColor: '#f8f9fa', padding: '1rem', borderRadius: '8px', marginBottom: '1rem', borderLeft: '4px solid #28a745'}}>
               <h4 style={{margin:'0 0 5px 0', color: '#28a745'}}>Details</h4>
               <p style={{margin:0}}>
                 {selectedEmployee.details ? selectedEmployee.details : <em style={{color:'#999'}}>Data unavailable</em>}
               </p>
            </div>

            <div style={{backgroundColor: '#fff3cd', padding: '1rem', borderRadius: '8px', marginBottom: '1rem', borderLeft: '4px solid #ffc107'}}>
               <h4 style={{margin:'0 0 5px 0', color: '#856404'}}>Working Schedule</h4>
               <p style={{margin:0}}>
                 {selectedEmployee.workingDays ? selectedEmployee.workingDays : <em style={{color:'#999'}}>Data unavailable</em>}
               </p>
            </div>

            <div style={{textAlign: 'right'}}>
              <button onClick={closeModal} style={{padding:'8px 16px', background:'#6c757d', color:'white', border:'none', borderRadius:'4px', cursor:'pointer'}}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Employee;