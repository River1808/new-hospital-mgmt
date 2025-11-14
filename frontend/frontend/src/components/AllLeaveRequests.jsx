import React, { useState, useEffect } from 'react';

// Helper function to format the date
const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const parts = dateString.split('-');
  if (parts.length === 3) {
    const [year, month, day] = parts;
    return `${day}-${month}-${year}`;
  }
  return dateString;
};

function AllLeaveRequests() {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to fetch all requests
  const fetchRequests = async () => {
    try {
      // This URL is correct
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
  }, []); // Run only once on page load

  // REMOVED: The handleUpdateStatus function is GONE.

  // Styling
  const containerStyle = { fontFamily: 'Arial, sans-serif', margin: '2rem auto', padding: '2rem', maxWidth: '1000px', backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' };
  const tableStyle = { width: '100%', borderCollapse: 'collapse', marginTop: '1.5rem' };
  const thStyle = { backgroundColor: '#007bff', color: 'white', padding: '0.75rem', border: '1px solid #ddd', textAlign: 'left' };
  const tdStyle = { padding: '0.75rem', border: '1px solid #ddd', backgroundColor: '#fff' };
  // REMOVED: The button styles

  if (loading) {
    return <div style={containerStyle}><h2>Loading Leave Requests...</h2></div>;
  }
  if (error) {
    return <div style={containerStyle}><h2>Error: {error}</h2></div>;
  }

  return (
    <div style={containerStyle}>
      <h2>All Leave Requests</h2>
      
      {requests.length === 0 ? (
        <p>No leave requests found.</p>
      ) : (
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Employee ID</th>
              <th style={thStyle}>Start Date</th>
              <th style={thStyle}>End Date</th>
              <th style={thStyle}>Reason</th>
              <th style={thStyle}>Status</th>
              {/* REMOVED: The "Actions" header */}
            </tr>
          </thead>
          <tbody>
            {requests.map((request, index) => (
              // The key is now _id (from MongoTemplate)
              <tr key={request._id || index}> 
                <td style={tdStyle}>{request.employeeId}</td>
                <td style={tdStyle}>{formatDate(request.startDate)}</td>
                <td style={tdStyle}>{formatDate(request.endDate)}</td>
                <td style={tdStyle}>{request.reason}</td>
                <td style={tdStyle}>
                  <span style={{ fontWeight: 'bold', color: request.status === 'Approved' ? 'green' : (request.status === 'Rejected' ? 'red' : 'orange') }}>
                    {request.status}
                  </span>
                </td>
                {/* REMOVED: The table cell with the buttons */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AllLeaveRequests;