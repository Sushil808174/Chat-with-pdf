import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'; // Import your custom CSS for styling

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/login/', formData);
      // Assuming your backend returns a token upon successful login
      if (response.data.token) {
        // Save the token to local storage or state for future requests
        // Redirect the user or perform any other action
        console.log('Login successful');
      }
    } catch (error) {
      // Handle error and display error message
      console.error('Login failed', error.response.data.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
