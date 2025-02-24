import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Registration.css";
import saturnImage from "./Images/saturn.jpg";

function Registration() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState(""); 
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name) {
      newErrors.name = "Name is required";
    } else if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
      newErrors.name = "Name must contain only alphabetic characters";
    }

    // Email validation
    if (!formData.email.includes("@")) {
      newErrors.email = "Email must contain '@'";
    }

    
    const passwordRegex = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
    if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        "Password must be at least 6 characters long and contain at least one special character";
    }

    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        // Prepare the data to send to the backend
        const userData = {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role,
        };

        console.log("Sending request to backend:", userData);
        
        const response = await axios.post("http://localhost:8080/galaxyvision/users/register", userData);
  
        
        if (response.status === 201) {
          console.log("Registration successful:", response.data);
          setApiError(""); 
          navigate("/login"); 
        }
      } catch (error) {
       
        if (error.response) {
          setApiError(error.response.data); 
        } else {
          setApiError("An unexpected error occurred. Please try again.");
        }
        console.error("Registration failed:", error);
      }
    }
  };
  return (
    <div className="registration-container">
      <div className="planet-image">
        <img src={saturnImage} alt="Planet" />
      </div>
      <div className="registration-form">
        <h2>Register at Galaxy Resort</h2>
        {apiError && <p className="error">{apiError}</p>} { }
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your name"
            />
            {errors.name && <p className="error">{errors.name}</p>}{" "}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
            {errors.email && <p className="error">{errors.email}</p>}{" "}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
            />
            {errors.password && <p className="error">{errors.password}</p>}{" "}
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Confirm your password"
            />
            {errors.confirmPassword && (
              <p className="error">{errors.confirmPassword}</p>
            )}{" "}
          </div>
          <div className="form-group">
            <label htmlFor="role">Role:</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="USER">Public User</option>
              <option value="ADMIN">Admin</option>
            </select>
            {errors.role && <p className="error">{errors.role}</p>}{" "}
          </div>
          <button type="submit" className="submit-btn">
            Register
          </button>
        </form>
        <p>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default Registration;