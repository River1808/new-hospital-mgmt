import React, { useState, useEffect } from 'react';

// Helper function to format the date
const formatDate = (dateValue) => {
  if (!dateValue) return 'N/A';
  try {
    const date = new Date(dateValue);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  } catch (error) {
    return 'Invalid Date';
  }
};

function AllLeaveRequests() {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to fetch all requests
  const fetchRequests = async () => {
    setError(null);
    try {
      // Note: Ensure your backend allows CORS if running on different ports
      const response = await fetch('http://localhost:8080/api/leaverequests');
      if (!response.ok) {
        throw new Error('Failed to fetch leave requests.');
      }
      const data = await response.json();
      setRequests(data);
    } catch (error) {
      console.error('Error fetching requests:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when the component loads
  useEffect(() => {
    fetchRequests();
  }, []); 

  const handleStatusChange = async (requestId, newStatus) => {
    setError(null);
    
    let endpointSuffix = "";
    
    if (newStatus === "Approved") {
        endpointSuffix = "approve";
    } else if (newStatus === "Rejected") {
        endpointSuffix = "reject";
    } else if (newStatus === "Pending") {
        endpointSuffix = "pend";
    } else {
        console.error("Unknown status:", newStatus);
        return;
    }
    
    try {
      const response = await fetch(`http://localhost:8080/api/leaverequests/${requestId}/${endpointSuffix}`, {
        method: 'PUT',
      });

      if (!response.ok) {
        throw new Error(`Failed to update status to ${newStatus}.`);
      }

      fetchRequests();

    } catch (error) {
      console.error('Error updating status:', error);
      setError(error.message);
    }
  };

  // --- STYLES ---

  // 1. New Page Wrapper: Holds the background image and centers the content
  const pageWrapperStyle = {
    minHeight: '100vh',
    width: '100%',
    // Assuming background-2.png is in your public folder
    backgroundImage: `url('/background2.jpg')`, 
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed', // Keeps background still while scrolling
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingTop: '3rem',
    paddingBottom: '3rem'
  };

  // 2. Container Style: Modified to be a "card" sitting on top of the background
  const containerStyle = { 
    fontFamily: 'Arial, sans-serif', 
    width: '95%',
    maxWidth: '1000px', 
    // Added slight transparency (0.95) so the background fits in better
    backgroundColor: 'rgba(249, 249, 249, 0.95)', 
    borderRadius: '12px', 
    boxShadow: '0 8px 32px rgba(0,0,0,0.15)', // Softer, deeper shadow
    padding: '2rem',
    backdropFilter: 'blur(5px)' // Adds a blur effect behind the container (modern glassmorphism)
  };

  const tableStyle = { width: '100%', borderCollapse: 'collapse', marginTop: '1.5rem' };
  const thStyle = { backgroundColor: '#007bff', color: 'white', padding: '0.75rem', border: '1px solid #ddd', textAlign: 'left' };
  const tdStyle = { padding: '0.75rem', border: '1px solid #ddd', backgroundColor: 'rgba(255, 255, 255, 0.8)' };
  
  const getSelectStyle = (status) => ({
    padding: '0.5rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '0.9rem',
    fontWeight: 'bold',
    color: status === 'Approved' ? '#155724' : (status === 'Rejected' ? '#721c24' : '#856404'),
    backgroundColor: status === 'Approved' ? '#d4edda' : (status === 'Rejected' ? '#f8d7da' : '#fff3cd'),
    cursor: 'pointer'
  });

  if (loading) {
    return (
      <div style={pageWrapperStyle}>
        <div style={containerStyle}>
           <h2 style={{textAlign: 'center', color: '#555'}}>Loading Leave Requests...</h2>
        </div>
      </div>
    );
  }
  
  return (
    <div style={pageWrapperStyle}>
      <div style={containerStyle}>
        <h2 style={{ borderBottom: '2px solid #eee', paddingBottom: '1rem', marginBottom: '1rem' }}>
          All Leave Requests
        </h2>
        
        {error && (
          <div style={{ padding: '10px', backgroundColor: '#ffebee', color: '#c62828', borderRadius: '4px', marginBottom: '1rem' }}>
            Error: {error}
          </div>
        )}
        
        {requests.length === 0 ? (
          <p>No leave requests found.</p>
        ) : (
          <div style={{ overflowX: 'auto' }}> {/* Handle horizontal scroll on small screens */}
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>Employee ID</th>
                  <th style={thStyle}>Start Date</th>
                  <th style={thStyle}>End Date</th>
                  <th style={thStyle}>Reason</th>
                  <th style={thStyle}>Status</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((request) => (
                  <tr key={request.id}>
                    <td style={tdStyle}>{request.employeeId}</td>
                    <td style={tdStyle}>{formatDate(request.startDate)}</td>
                    <td style={tdStyle}>{formatDate(request.endDate)}</td>
                    <td style={tdStyle}>{request.reason}</td>
                    <td style={tdStyle}>
                      <select 
                        style={getSelectStyle(request.status)}
                        value={request.status || 'Pending'}
                        onChange={(e) => handleStatusChange(request.id, e.target.value)}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                      </select>
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

export default AllLeaveRequests;