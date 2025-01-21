import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import axios from "axios";

import SignupPage from "./pages/signupPage/SignupPage.jsx";
import LoginPage from "./pages/loginPage/LoginPage.jsx";
import ProfilePage from "./pages/profilePage/ProfilePage.jsx";
import EditProfile from "./pages/editProfilePage/EditProfilePage.jsx";
import SearchPage from "./pages/searchPage/SearchPage.jsx";
import UserPage from "./pages/userPage/UserPage.jsx";
import AddPostPage from "./pages/addPostPage/AddPostPage.jsx";
import FeedPage from "./pages/feedPage/FeedPage.jsx";
import PostPage from "./pages/postPage/PostPage.jsx";
import ExplorePage from "./pages/explorePage/ExplorePage.jsx";
import NotFoundPage from "./pages/notFoundPage/NotFoundPage.jsx";
import EditPostPage from "./pages/editPostPage/EditPostPage.jsx";

import Layout from "./components/layout/Layout.js";

import "./App.css";

function App() {
  return (
    // <main className="page_container">
    <Router>
      {/* <nav>
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
        </nav> */}

      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignupPage />} />

        <Route element={<Layout />}>
          <Route path="/" element={<FeedPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile/edit" element={<EditProfile />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/users/:id" element={<UserPage />} />
          <Route path="/add" element={<AddPostPage />} />
          <Route path="/posts/:id" element={<PostPage />} />
          <Route path="/posts/:id/edit" element={<EditPostPage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
    // </main>
  );
}

export default App;
