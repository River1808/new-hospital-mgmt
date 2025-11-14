import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// This is our helper function from before
const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const parts = dateString.split('-');
  if (parts.length === 3) {
    const [year, month, day] = parts;
    return `${day}-${month}-${year}`;
  }
  return dateString;
};


function AllShifts() {
  const [shifts, setShifts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // This function fetches the data
  const fetchShifts = async () => {
    setLoading(true);
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

  // Fetch data when the component loads
  useEffect(() => {
    fetchShifts();
  }, []); 

  // The delete function
  const handleDelete = async (shiftId) => {
    setError(null); 
    try {
      const response = await fetch(`http://localhost:8080/api/shifts/${shiftId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete shift.');
      }

      // Refresh the list after deleting
      fetchShifts();

    } catch (error) {
      console.error('Error deleting shift:', error);
      setError(error.message);
    }
  };
  
  // Styling (no changes)
  const containerStyle = { fontFamily: 'Arial, sans-serif', margin: '2rem auto', padding: '2rem', maxWidth: '900px', backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' };
  const tableStyle = { width: '100%', borderCollapse: 'collapse', marginTop: '1.5rem' };
  const thStyle = { backgroundColor: '#007bff', color: 'white', padding: '0.75rem', border: '1px solid #ddd', textAlign: 'left' };
  const tdStyle = { padding: '0.75rem', border: '1px solid #ddd', backgroundColor: '#fff' };
  const buttonStyle = { padding: '0.5rem 1rem', border: 'none', borderRadius: '4px', backgroundColor: '#28a745', color: 'white', fontSize: '1rem', cursor: 'pointer', textDecoration: 'none' };
  const headerStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center' };
  const deleteButtonStyle = { padding: '0.3rem 0.6rem', border: 'none', borderRadius: '4px', backgroundColor: '#dc3545', color: 'white', fontSize: '0.9rem', cursor: 'pointer' };
  
  if (loading) {
    return <div style={containerStyle}><h2>Loading All Shifts...</h2></div>;
  }
  
  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h2>All Shifts</h2>
        <Link to="/shifts/new" style={buttonStyle}>
          Add New Shift
        </Link>
      </div>
      
      {/* This will show the red error message if a delete fails */}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {shifts.length === 0 ? (
        <p>No shifts found in the database.</p>
      ) : (
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Employee ID</th>
              <th style={thStyle}>Role</th>
              <th style={thStyle}>Date (DD-MM-YYYY)</th>
              <th style={thStyle}>Start Time</th>
              <th style={thStyle}>End Time</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {shifts.map((shift, index) => (
              // --- THIS IS THE FIX ---
              // The key must be _id (from MongoTemplate) or index
              <tr key={shift._id || index}>
                <td style={tdStyle}>{shift.employeeId}</td>
                <td style={tdStyle}>{shift.role}</td>
                <td style={tdStyle}>{formatDate(shift.date)}</td>
                <td style={tdStyle}>{shift.startTime}</td>
                <td style={tdStyle}>{shift.endTime}</td>
                
                <td style={tdStyle}>
                  <button 
                    style={deleteButtonStyle} 
                    // We must pass shift._id to the delete function
                    onClick={() => handleDelete(shift._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AllShifts;