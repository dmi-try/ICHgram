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

    const formData = new FormData();
    formData.append("photo", e.target.photo.files[0]);
    formData.append("text", text);
    
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/posts`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      navigate("/posts/" + response.data.post._id);
    } catch (error) {
      if (error.response?.status === 401) { navigate("/login"); }
      console.error("Error adding post:", error.response?.data || error);
    }
  };
  return (
    <section>
      <h1>Add post</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" name="photo" />
        <div>
          <label>Text:</label>
          <textarea value={text} onChange={handleChange} />
        </div>
        <button type="submit">Add Post</button>
      </form>
    </section>
  );
}

export default AddPostPage;
