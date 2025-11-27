import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// --- 1. HELPER FUNCTION ---
const formatDate = (dateValue) => {
  if (!dateValue) return 'N/A';

  try {
    // Create a new Date object from the database string
    const date = new Date(dateValue);
    
    // Get the parts
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
    const year = date.getFullYear();
    
    // Return the new format
    return `${day}-${month}-${year}`;

  } catch (error) {
    console.error("Could not format date:", dateValue);
    return 'Invalid Date';
  }
};
// --- END OF HELPER FUNCTION ---


function AllShifts() {
  const [shifts, setShifts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchShifts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:8080/api/shifts');
      if (!response.ok) {
        throw new Error('Failed to fetch shifts.');
      }
      const data = await response.json();
      setShifts(data);
    } catch (error) {
      console.error('Error fetching shifts:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShifts();
  }, []); 

  const handleDelete = async (shiftId) => {
    setError(null); 
    
    if (!shiftId) {
        setError("Cannot delete: Invalid shift ID.");
        return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/shifts/${shiftId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete shift.');
      }
      
      fetchShifts();

    } catch (error) {
      console.error('Error deleting shift:', error);
      setError(error.message);
    }
  };
  
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
    paddingTop: '2rem',
    paddingBottom: '2rem'
  };

  const containerStyle = { 
    width: '100%',
    maxWidth: '1000px', 
    backgroundColor: 'white',
    borderRadius: '12px', 
    boxShadow: '0 8px 32px rgba(0,0,0,0.15)', 
    padding: '2rem',
    backdropFilter: 'blur(5px)'
  };

  const tableStyle = { width: '100%', borderCollapse: 'collapse', marginTop: '1.5rem' };
  const thStyle = { color: '#325833', padding: '0.75rem', textAlign: 'center', borderBottom: '1px solid #ddd' };
  const tdStyle = { padding: '0.75rem', borderBottom: '1px solid #f3f4f6', textAlign: 'center' };
  
  const buttonStyle = { padding: '0.5rem 1rem', border: 'none', borderRadius: '4px', backgroundColor: '#28a745', color: 'white', fontSize: '1rem', cursor: 'pointer', textDecoration: 'none' };
  const headerStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', marginTop: '1rem' };
  const deleteButtonStyle = { padding: '0.3rem 0.6rem', border: 'none', borderRadius: '4px', backgroundColor: '#dc3545', color: 'white', fontSize: '0.9rem', cursor: 'pointer' };
  
  if (loading) {
    return (
      <div style={pageWrapperStyle}>
        <div style={containerStyle}>
          <h2 style={{textAlign: 'center', color: '#555'}}>Loading All Shifts...</h2>
        </div>
      </div>
    );
  }
  
  return (
    <div style={pageWrapperStyle}>
      <div style={containerStyle}>
        <div style={headerStyle}>
          <h2 style={{margin: 0, color: '#244227'}}>SHIFTS</h2>
          <Link to="/shifts/new" style={buttonStyle}>
            Add New Shift
          </Link>
        </div>
        
        {error && (
          <div style={{ padding: '10px', backgroundColor: '#ffebee', color: '#c62828', borderRadius: '4px', marginBottom: '1rem' }}>
            Error: {error}
          </div>
        )}

        {shifts.length === 0 ? (
          <p>No shifts found in the database.</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>EMPLOYEE ID</th>
                  <th style={thStyle}>ROLE</th>
                  <th style={thStyle}>DATE</th>
                  <th style={thStyle}>START TIME</th>
                  <th style={thStyle}>END TIME</th>
                  <th style={thStyle}>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {shifts.map((shift) => (
                  <tr key={shift.id}>
                    <td style={tdStyle}>{shift.employeeId}</td>
                    <td style={tdStyle}>{shift.role}</td>
                    <td style={tdStyle}>{formatDate(shift.date)}</td>
                    <td style={tdStyle}>{shift.startTime}</td>
                    <td style={tdStyle}>{shift.endTime}</td>
                    
                    <td style={tdStyle}>
                      <button 
                        style={deleteButtonStyle} 
                        onClick={() => handleDelete(shift.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default AllShifts;