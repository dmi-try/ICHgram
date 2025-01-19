import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import axios from "axios";

import SignupPage from "./pages/signupPage/SignupPage.jsx";
import LoginPage from "./pages/loginPage/LoginPage.jsx";
import ProfilePage from "./pages/profilePage/ProfilePage.jsx";
import EditProfile from "./pages/editProfilePage/EditProfilePage.jsx";
import UsersPage from "./pages/usersPage/UsersPage.jsx";
import UserPage from "./pages/userPage/UserPage.jsx";
import AddPostPage from "./pages/addPostPage/AddPostPage.jsx";
import FeedPage from "./pages/feedPage/FeedPage.jsx";
import PostPage from "./pages/postPage/PostPage.jsx";

import "./App.css";

function App() {
  return (
    <main className="page_container">
      <Router>
        <nav>
          <ul>
            <li>
              <Link to="/">Feed</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
            <li>
              <Link to="/posts/add">Add Post</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<FeedPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<SignupPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile/edit" element={<EditProfile />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/users/:id" element={<UserPage />} />
          <Route path="/posts/add" element={<AddPostPage />} />
          <Route path="/posts/:id" element={<PostPage />} />
          <Route path="*" element={<h1>Page not found</h1>} />
        </Routes>
      </Router>
    </main>
  );
}

export default App;
