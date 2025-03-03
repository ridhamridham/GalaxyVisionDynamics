import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "./UpdatePassword.css";

function UpdatePassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!newPassword || !confirmPassword) {
      setError("Both fields are required.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!validatePassword(newPassword)) {
      setError("Password must be at least 6 characters long and include one special character.");
      return;
    }
    try {
      await axios.post("http://localhost:8080/galaxyvision/users/reset-password", { token, newPassword });
      alert("Password reset successful.");
      navigate("/login");
    } catch (error) {
      setError(error.response?.data || "An error occurred. Please try again.");
    }
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;
    return regex.test(password);
  };

  return (
    <div className="update-password-container">
      <form className="update-password-form" onSubmit={handleSubmit}>
        <h2>Reset Password</h2>
        <p>Create a new password.</p>
        <div className="form-group">
          <label htmlFor="newPassword">New Password</label>
          <input
            type="password"
            id="newPassword"
            placeholder="Enter your new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm your new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="reset-btn">
          Reset Password
        </button>
      </form>
    </div>
  );
}

export default UpdatePassword;