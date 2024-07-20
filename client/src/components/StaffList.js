import React, { useState } from 'react';
import './StaffList.css';

const StaffList = ({ staff, onEdit, onDelete, fetchStaff }) => {
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editPosition, setEditPosition] = useState('');
  const [editDepartment, setEditDepartment] = useState('');

  const startEdit = (member) => {
    setEditingId(member._id);
    setEditName(member.name);
    setEditPosition(member.position);
    setEditDepartment(member.department);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName('');
    setEditPosition('');
    setEditDepartment('');
  };

  const saveEdit = async (id) => {
    const updatedStaff = { name: editName, position: editPosition, department: editDepartment };
    try {
      await fetch(`http://localhost:5000/api/staff/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedStaff),
      });
      fetchStaff();
      cancelEdit();
    } catch (error) {
      console.error('Error updating staff:', error);
    }
  };

  return (
    <div className="staff-list-container">
      <div className="staff-list-table-wrapper">
        <table className="staff-list">
          <thead>
            <tr>
              <th>Name</th>
              <th>Position</th>
              <th>Department</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {staff.map((member) => (
              <tr key={member._id}>
                {editingId === member._id ? (
                  <>
                    <td>
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={editPosition}
                        onChange={(e) => setEditPosition(e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={editDepartment}
                        onChange={(e) => setEditDepartment(e.target.value)}
                      />
                    </td>
                    <td className="action-buttons">
                      <button onClick={() => saveEdit(member._id)} className="edit-button">Save</button>
                      <button onClick={cancelEdit} className="delete-button">Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{member.name}</td>
                    <td>{member.position}</td>
                    <td>{member.department}</td>
                    <td className="action-buttons">
                      <button onClick={() => startEdit(member)} className="edit-button">Edit</button>
                      <button onClick={() => onDelete(member._id)} className="delete-button">Delete</button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StaffList;
