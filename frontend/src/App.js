import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import SignupPage from "./pages/signupPage/SignupPage.jsx";
import LoginPage from "./pages/loginPage/LoginPage.jsx";
import ProfilePage from "./pages/profilePage/ProfilePage.jsx";
import EditProfile from "./pages/editProfilePage/EditProfilePage.jsx";

function App() {
  const [response, setResponse] = useState("");

  useEffect(() => {
    const url = process.env.REACT_APP_BACKEND_URL;
    axios
      .get(`${url}/`)
      .then((res) => {
        setResponse(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data from server:", error);
      });
  }, []);

  return (
    <>
      <h2>Connection test</h2>
      <p>{response}</p>

      <Router>
        <nav>
          <Link to="/register">Register</Link> | <Link to="/login">Login</Link>
        </nav>
        <Routes>
          <Route path="/register" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/edit-profile" element={<EditProfile />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
