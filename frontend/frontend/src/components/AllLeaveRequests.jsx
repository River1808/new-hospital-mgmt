import React, { useState, useEffect } from 'react';

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

  const fetchRequests = async () => {
    try {
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

  // Function to handle approving or rejecting a request
  const handleUpdateStatus = async (requestId, newStatus) => {
    setError(null);
    try {
      const response = await fetch(`http://localhost:8080/api/leaverequests/${requestId}/${newStatus}`, {
        method: 'PUT',
      });

      if (!response.ok) {
        throw new Error(`Failed to ${newStatus} request.`);
      }

      fetchRequests();

    } catch (error) {
      console.error('Error updating status:', error);
      setError(error.message);
    }
  };

  const containerStyle = { fontFamily: 'Arial, sans-serif', margin: '2rem auto', padding: '2rem', maxWidth: '1000px', backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' };
  const tableStyle = { width: '100%', borderCollapse: 'collapse', marginTop: '1.5rem' };
  const thStyle = { backgroundColor: '#007bff', color: 'white', padding: '0.75rem', border: '1px solid #ddd', textAlign: 'left' };
  const tdStyle = { padding: '0.75rem', border: '1px solid #ddd', backgroundColor: '#fff' };
  const buttonStyle = { padding: '0.3rem 0.6rem', border: 'none', borderRadius: '4px', color: 'white', fontSize: '0.9rem', cursor: 'pointer', marginRight: '5px' };
  const approveBtnStyle = { ...buttonStyle, backgroundColor: '#28a745' }; 
  const rejectBtnStyle = { ...buttonStyle, backgroundColor: '#dc3545' }; 

  if (loading) {
    return <div style={containerStyle}><h2>Loading Leave Requests...</h2></div>;
  }
  if (error) {
    return <div style={containerStyle}><h2>Error: {error}</h2></div>;
  }

  return (
    <div style={containerStyle}>
      <h2>All Leave Requests</h2>
      {/* We could add a "Request Leave" button here later */}
      
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
              <th style={thStyle}>Actions</th>
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
                  <span style={{ fontWeight: 'bold', color: request.status === 'Approved' ? 'green' : (request.status === 'Rejected' ? 'red' : 'orange') }}>
                    {request.status}
                  </span>
                </td>
                <td style={tdStyle}>
                  {/* Show buttons only if status is "Pending" */}
                  {request.status === 'Pending' && (
                    <>
                      <button 
                        style={approveBtnStyle}
                        onClick={() => handleUpdateStatus(request.id, 'approve')}
                      >
                        Approve
                      </button>
                      <button 
                        style={rejectBtnStyle}
                        onClick={() => handleUpdateStatus(request.id, 'reject')}
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AllLeaveRequests;