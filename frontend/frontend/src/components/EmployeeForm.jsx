import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function EmployeeForm() {
  const [id, setId] = useState(''); 
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

    let newEmployee = {
      id: parseInt(id, 10),
      name: name,
      department: department,
      role: role,           
      _class: role            
    };

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

  // --- Styling ---
  const backgroundImageUrl = '/background1.jpg';

  const formStyle = { 
    margin: 'auto', 
    padding: '2rem', 
    maxWidth: '500px', 
    boxShadow: '0 8px 32px rgba(0,0,0,0.1)', 
    borderRadius: '12px', 
    backgroundColor: 'white',
    width: '100%',
    backdropFilter: 'blur(4px)'
  };

  const divStyle = { marginBottom: '1rem', display: 'flex', flexDirection: 'column' };
  const labelStyle = { fontWeight: '600', marginBottom: '0.5rem', color: '#325833' };
  const inputStyle = { padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem', backgroundColor: '#fff', outline: 'none' };
  const buttonStyle = { padding: '0.75rem 1.5rem', border: 'none', borderRadius: '4px', backgroundColor: '#325833', color: 'white', fontSize: '1rem', cursor: 'pointer', fontWeight: 'bold' };
  const checkboxDivStyle = { ...divStyle, flexDirection: 'row', alignItems: 'center', marginBottom: '1rem' };
  const checkboxLabelStyle = { ...labelStyle, marginBottom: '0', marginLeft: '0.5rem' };
  const checkboxInputStyle = { width: '1.25rem', height: '1.25rem' };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      width: '100%',
      backgroundImage: `url(${backgroundImageUrl})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed'
    }}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#1d351f' }}>Add New Employee</h2>

        {message && (
          <div style={{ padding: '10px', backgroundColor: '#ffebee', color: '#c62828', borderRadius: '4px', marginBottom: '1rem' }}>
            {message}
          </div>
        )}

        <div style={divStyle}>
          <label style={labelStyle}>Employee ID</label>
          <input
            type="number"
            value={id}
            onChange={(e) => setId(e.target.value)} 
            required
            style={inputStyle}
            placeholder="e.g. 101"
          />
        </div>

        <div style={divStyle}>
          <label style={labelStyle}>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={inputStyle}
            placeholder="Full Name"
          />
        </div>

        <div style={divStyle}>
          <label style={labelStyle}>Department</label>
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
          <label style={labelStyle}>Role</label>
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

        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <button type="submit" style={buttonStyle}>Create Employee</button>
        </div>

      </form>
    </div>
  );
}

export default EmployeeForm;