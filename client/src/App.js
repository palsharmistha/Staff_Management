import React, { useState, useEffect } from 'react';
import StaffList from './components/StaffList';
import StaffForm from './components/StaffForm';
import EditModal from './components/EditModal';
import Footer from './components/Footer';  // Import the Footer component
import './App.css';

const App = () => {
  const [currentStaff, setCurrentStaff] = useState(null);
  const [staff, setStaff] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/staff');
      const data = await response.json();
      setStaff(data);
    } catch (error) {
      console.error('Error fetching staff:', error);
    }
  };

  const handleEdit = (staff) => {
    setCurrentStaff(staff);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/staff/${id}`, {
        method: 'DELETE'
      });
      fetchStaff();
    } catch (error) {
      console.error('Error deleting staff:', error);
    }
  };

  const closeModal = () => {
    setCurrentStaff(null);
    setIsModalOpen(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Staff Management System</h1>
      </header>
      <main>
        <StaffForm fetchStaff={fetchStaff} />
        <StaffList 
          staff={staff} 
          onEdit={handleEdit} 
          onDelete={handleDelete} 
          fetchStaff={fetchStaff} 
        />
        <EditModal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          currentStaff={currentStaff}
          fetchStaff={fetchStaff}
        />
      </main>
      <footer>
        <Footer />  {/* Include the Footer component */}
      </footer>
    </div>
  );
};

export default App;
