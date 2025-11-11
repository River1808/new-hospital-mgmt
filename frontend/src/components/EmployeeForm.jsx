import React, { useState } from 'react';
// We'll use useNavigate to go back to the employee list after submitting
import { useNavigate }  from 'react-router-dom';

function EmployeeForm() {
  // We need state for every field in the form
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [role, setRole] = useState('Doctor'); // Default role
  
  const [message, setMessage] = useState(null);
  const navigate = useNavigate(); // Hook to redirect user

  const handleSubmit = async (event) => {
    event.preventDefault(); // Stop the form from refreshing the page

    // WARNING: You must provide an ID.
    // In a real app, the backend would generate this.
    // Since you are setting it, make sure it's a unique number!
    const newEmployee = {
      id: parseInt(id), // Convert the ID from string to number
      name: name,
      department: department,
      role: role,
      // You will need to add any other fields your constructor requires,
      // for example, 'specialtyArea' if the role is 'Doctor'
    };
    
    // Add logic here to create the correct object based on role
    // For now, we'll send a basic object.
    // This part will need to match the Java Controller you build.

    try {
      const response = await fetch('http://localhost:8080/api/employees', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEmployee), // Send the data as JSON
      });

      if (!response.ok) {
         // Show an error if the ID is already taken
        const errorText = await response.text();
        throw new Error(`Failed to create employee: ${errorText}`);
      }

      const data = await response.json();
      console.log('Success:', data);
      
      // Clear the form
      setId('');
      setName('');
      setDepartment('');
      setRole('Doctor');

      // Show a success message
      setMessage('Employee created successfully! Redirecting...');

      // Wait 2 seconds and then go back to the employee list
      setTimeout(() => {
        navigate('/employees');
      }, 2000);

    } catch (error) {
      console.error('Error:', error);
      setMessage(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '2rem', maxWidth: '400px', margin: 'auto' }}>
      <h2>Add New Employee</h2>
      <div style={{ marginBottom: '1rem' }}>
        <label>Employee ID (MUST be unique): </label>
        <input
          type="number"
          value={id}
          onChange={(e) => setId(e.targe.value)}
          required
        />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label>Name: </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div style={{ marginBottom: '1R' }}>
        <label>Department: </label>
        <input
          type="text"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          required
        />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label>Role: </label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="Doctor">Doctor</option>
          <option value="Nurse">Nurse</option>
          <option value="MaintenanceStaff">Maintenance</option>
          {/* Add other roles from your Java classes */}
        </select>
      </div>
      <button type="submit">Submit</button>

      {/* Show success or error messages here */}
      {message && <p>{message}</p>}
    </form>
  );
}

export default EmployeeForm;