import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function EmployeeForm() {
  const [id, setId] = useState(''); // This is for the form
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('Cardiology'); 
  const [role, setRole] = useState('Nurse'); 
  const [emergencyCall, setEmergencyCall] = useState(false); 
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const doctorRoles = [
    'Doctor', 'GP', 'Surgeon', 'Cardiologist', 
    'Psychiatrist', 'Radiologist', 'Neurologist', 'Anesthesiologist'
  ];
  const isDoctorRole = doctorRoles.includes(role);


  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage(null); 

    // --- THIS IS THE FIX ---
    // The JSON we send MUST match the Java class
    let newEmployee = {
      id: parseInt(id, 10), // This satisfies the "id" rule
      name: name,
      department: department,
      role: role,             // This satisfies the "role" rule
      _class: role            // This satisfies the Java "@JsonTypeInfo" rule
    };
    // --- END OF FIX ---

    if (isDoctorRole) {
      newEmployee.emergencyCall = emergencyCall;
    }

    try {
      const response = await fetch('http://localhost:8080/api/employees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEmployee),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to create employee');
      }

      navigate('/employees'); 

    } catch (error) {
      console.error('Error:', error);
      setMessage(`Failed to create employee: ${error.message}`);
    }
  };

  // --- Styling (no changes) ---
  const formStyle = { margin: '2rem auto', padding: '2rem', maxWidth: '500px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', borderRadius: '8px', backgroundColor: '#fff' };
  const divStyle = { marginBottom: '1rem', display: 'flex', flexDirection: 'column' };
  const labelStyle = { fontWeight: '600', marginBottom: '0.5rem' };
  const inputStyle = { padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem', backgroundColor: '#fff' };
  const buttonStyle = { padding: '0.75rem 1.5rem', border: 'none', borderRadius: '4px', backgroundColor: '#007bff', color: 'white', fontSize: '1rem', cursor: 'pointer' };
  const checkboxDivStyle = { ...divStyle, flexDirection: 'row', alignItems: 'center', marginBottom: '1rem' };
  const checkboxLabelStyle = { ...labelStyle, marginBottom: '0', marginLeft: '0.5rem' };
  const checkboxInputStyle = { width: '1.25rem', height: '1.25rem' };
  
  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h2>Add New Employee</h2>
      
      {message && <p style={{ color: 'red' }}>{message}</p>}

      <div style={divStyle}>
        <label style={labelStyle}>Employee ID:</label>
        <input
          type="text" 
          value={id}
          onChange={(e) => setId(e.target.value)} // This is still the form's 'id'
          required
          style={inputStyle}
        />
      </div>

      <div style={divStyle}>
        <label style={labelStyle}>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={inputStyle}
        />
      </div>

      <div style={divStyle}>
        <label style={labelStyle}>Department:</label>
        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          style={inputStyle}
        >
          <option value="Cardiology">Cardiology</option>
          <option value="Psychology">Psychology</option>
          <option value="Radiology">Radiology</option>
          <option value="Neurology">Neurology</option>
          <option value="Anesthesy">Anesthesy</option>
          <option value="Surgery Unit">Surgery Unit</option>
          <option value="Maintenance">Maintenance</option>
          <option value="Nursing">Nursing</option>
          <option value="General">General</option>
        </select>
      </div>

      <div style={divStyle}>
        <label style={labelStyle}>Role:</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={inputStyle}
        >
          <option value="Nurse">Nurse</option>
          <option value="Maintenance Staff">Maintenance Staff</option>
          <option value="Doctor">Doctor (Generic)</option>
          <option value="GP">GP</option>
          <option value="Cardiologist">Cardiologist</option>
          <option value="Psychiatrist">Psychiatrist</option>
          <option value="Radiologist">Radiologist</option>
          <option value="Neurologist">Neurologist</option>
          <option value="Anesthesiologist">Anesthesiologist</option>
          <option value="Surgeon">Surgeon</option>
        </select>
      </div>

      {isDoctorRole && (
        <div style={checkboxDivStyle}>
          <input
            type="checkbox"
            id="emergencyCall"
            checked={emergencyCall}
            onChange={(e) => setEmergencyCall(e.target.checked)} 
            style={checkboxInputStyle}
          />
          <label htmlFor="emergencyCall" style={checkboxLabelStyle}>
            Available for Emergency Call?
          </label>
        </div>
      )}

      <button type="submit" style={buttonStyle}>Submit</button>
    </form>
  );
}

export default EmployeeForm;