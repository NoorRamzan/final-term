import React from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <nav className="bg-blue-600 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-white text-lg">Dashboard</h1>
        <button 
          onClick={handleLogout}
          className="text-white bg-red-500 px-4 py-2 rounded-md hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
