import React, { useState } from "react";
import axios from "axios"; // Import Axios
import "./ForgetPassword.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email) {
      setError("Email is required.");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
    } else {
      setError("");
      try {
        await axios.post("http://localhost:8080/galaxyvision/users/forgot-password", { email });
        alert("Password reset email sent successfully.");
      } catch (error) {
        setError(error.response?.data || "An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="forgot-password-container">
      <form className="forgot-password-form" onSubmit={handleSubmit}>
        <h2>Forgot Password</h2>
        <p>Enter your email to reset your password.</p>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {error && <p className="error-message">{error}</p>}
        </div>
        <button type="submit" className="reset-btn">
          Reset Password
        </button>
        <p className="back-to-login">
          Remembered? <a href="/login">Back to Login</a>
        </p>
      </form>
    </div>
  );
}

export default ForgotPassword;