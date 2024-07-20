import React, { useState } from 'react';
import './StaffForm.css';

const StaffForm = ({ fetchStaff }) => {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [department, setDepartment] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newStaff = { name, position, department };
    try {
      await fetch('http://localhost:5000/api/staff', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStaff),
      });
      fetchStaff();
      setName('');
      setPosition('');
      setDepartment('');
    } catch (error) {
      console.error('Error adding staff:', error);
    }
  };

  return (
    <form className="staff-form" onSubmit={handleSubmit}>
      <h2>Add New Staff Member</h2>
      <div className="form-group">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          placeholder="Position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          placeholder="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />
      </div>
      <button type="submit">Add Staff</button>
    </form>
  );
};

export default StaffForm;
