import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddPostPage() {
  const [text, setText] = useState("");

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/posts`,
        { text: text, photo: "broken" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/");
    } catch (error) {
      console.error("Error adding post:", error.response?.data || error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Text:</label>
        <textarea value={text} onChange={handleChange} />
      </div>
      <button type="submit">Add Post</button>
    </form>
  );
}

export default AddPostPage;
