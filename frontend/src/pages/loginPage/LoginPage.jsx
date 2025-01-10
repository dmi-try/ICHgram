import styles from "./LoginPage.module.css";
import React, { useState } from "react";
import axios from "axios";

function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [token, setToken] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3303/auth/login",
        formData
      );
      setToken(response.data.token);
      setMessage("Login successful!");
    } catch (error) {
      setMessage(
        error.response?.data?.message || "An error occurred during login"
      );
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
      {token && (
        <div>
          <p>Token:</p>
          <textarea value={token} readOnly rows="4" cols="50" />
        </div>
      )}
    </div>
  );
}

export default LoginPage;
