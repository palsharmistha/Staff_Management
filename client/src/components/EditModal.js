import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './EditModal.css';

Modal.setAppElement('#root');

const EditModal = ({ isOpen, onRequestClose, currentStaff, fetchStaff }) => {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [department, setDepartment] = useState('');

  useEffect(() => {
    if (currentStaff) {
      setName(currentStaff.name);
      setPosition(currentStaff.position);
      setDepartment(currentStaff.department);
    }
  }, [currentStaff]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const staffData = { name, position, department };

    try {
      await fetch(`http://localhost:5000/api/staff/${currentStaff._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(staffData),
      });
      fetchStaff();
      onRequestClose();
    } catch (error) {
      console.error('Error updating staff:', error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Edit Staff"
      className="EditModal"
      overlayClassName="Overlay"
    >
      <h2>Edit Staff</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Name" 
          required 
        />
        <input 
          type="text" 
          value={position} 
          onChange={(e) => setPosition(e.target.value)} 
          placeholder="Position" 
          required 
        />
        <input 
          type="text" 
          value={department} 
          onChange={(e) => setDepartment(e.target.value)} 
          placeholder="Department" 
          required 
        />
        <button type="submit">Update Staff</button>
        <button type="button" onClick={onRequestClose}>Cancel</button>
      </form>
    </Modal>
  );
};

export default EditModal;
