import React, { useState } from "react";
import axios from "axios";
import "./Register.css"; // Import your custom CSS for styling

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    // phone: "",
    // address: "",
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/register/",
        formData
      );
      // Assuming your backend returns a success message upon successful registration
      if (response.data.message === "User registered successfully") {
        // Display a success message to the user
        console.log("Registration successful");
      }
    } catch (error) {
      // Handle error and display error message
      console.error("Registration failed", error.response.data.message);
    }
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
          </div>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>
          {/* <div className="input-group">
            <label>Mobile no.</label>
            <input
              type="text"
              placeholder="Enter your mobile no."
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
          </div>
          <div className="input-group">
            <label>Address</label>
            <input
              type="text"
              placeholder="Enter your address."
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
            />
          </div> */}
          <button type="submit" className="register-button">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
