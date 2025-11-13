import React from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const buttonStyle = {
    display: 'inline-block',
    padding: '12px 24px',
    margin: '10px',
    fontSize: '16px',
    fontWeight: '600',
    color: 'white',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '5px',
    textDecoration: 'none',
    cursor: 'pointer',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  };
  
  const buttonStyleSecondary = {
    ...buttonStyle,
    backgroundColor: '#6c757d'
  };

  const buttonStyleTertiary = {
    ...buttonStyle,
    backgroundColor: '#28a745'
  };

  const buttonStyleWarning = { // <-- 1. NEW STYLE
    ...buttonStyle,
    backgroundColor: '#ffc107'
  };

  return (
    <div style={{ textAlign: "center", marginTop: "3rem" }}>
      <h1>Hospital Schedule Management</h1>
      <p>Choose an option:</p>
      
      <Link to="/employees">
        <button style={buttonStyle}>Manage Employees</button>
      </Link>
      
      <Link to="/shifts">
        <button style={buttonStyleTertiary}>Manage Shifts</button>
      </Link>
      
      <Link to="/leaverequests">
        <button style={buttonStyleWarning}>Manage Leave Requests</button>
      </Link>
    </div>
  );
}