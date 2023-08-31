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
    console.log("Sending request:", formData); // Print the request data before sending
    try {
      const response = await axios.post("http://localhost:8000/login/", formData);
      console.log("Response:", response.data); // Print the response data received from the server
      if ('token' in response.data) {
        localStorage.setItem('token',JSON.stringify(response.data.token))
        console.log("Login successful");
      }
    } catch (error) {
      console.error("Login failed:", error.response.data);
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
              type="username"
              placeholder="Enter your email"
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
