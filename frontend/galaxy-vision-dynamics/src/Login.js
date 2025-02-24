import React, { useState } from "react";
import axios from "axios";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let valid = true;
    let errors = {};
    if (!email.trim()) {
      errors.email = "Email is required";
      valid = false;
    } else if (!email.includes("@")) {
      errors.email = "Email must contain '@'";
      valid = false;
    } else if (email.length < 6) {
      errors.email = "Email must be at least 6 characters";
      valid = false;
    }
    if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
      valid = false;
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.password = "Password must contain at least one special character";
      valid = false;
    }
    setErrors(errors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post("http://localhost:8080/galaxyvision/users/login", {
          email,
          password,
        });

        const data = response.data; // Axios automatically parses JSON
        console.log("Login successful:", data);

        // Store token and redirect
        localStorage.setItem("token", data.token);
        window.location.href = "/dashboard";
      } catch (error) {
        // Handle errors
        if (error.response) {
          alert(error.response.data.message || "Login failed");
        } else if (error.request) {
          alert("No response received from the server. Please check your connection.");
        } else {
          alert("An error occurred. Please try again.");
        }
        console.error("Error during login:", error);
      }
    }
  };

  return (
    <div className="login-container">
      <div className="stars"></div>
      <div className="twinkling"></div>
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>
        <button type="submit" className="submit-btn">
          Login
        </button>
        <p className="forgot-password">
          <a href="/ForgotPassword">Forgot Password?</a>
        </p>
      </form>
    </div>
  );
}

export default Login;