import React, { useState } from 'react';
import axios from 'axios'; // Make sure axios is installed
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // For displaying errors
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const navigate = useNavigate(); // Hook to navigate after login

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send POST request to backend for login
      const response = await axios.post('http://localhost:3001/user/login', { email, password });

      // Store the JWT token in localStorage
      localStorage.setItem('jwtToken', response.data.token);

      setIsLoggedIn(true); // Update login status
      setError(''); // Clear any previous errors

      console.log('Login successful:', response.data); // Debugging log

      // Navigate to the dashboard
      navigate('/CreateNote');
    } catch (err) {
      // Handle backend errors
      if (err.response) {
        setError('Login failed: ' + (err.response.data.message || 'Unknown error'));
      } else if (err.request) {
        setError('Login failed: No response from server');
      } else {
        setError('Login failed: ' + err.message);
      }

      console.error('Login error:', err); // Log error details
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800">Login to Your Account</h2>

        {error && <p className="text-red-500 text-sm">{error}</p>} {/* Show error message */}
        {isLoggedIn && <p className="text-green-500 text-sm">Logged in successfully!</p>} {/* Success message */}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-1 text-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-1 text-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-center text-gray-600">
          Don't have an account?{' '}
          <a href="/register" className="text-blue-500 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
