import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EditPostPage() {
  const [post, setPost] = useState([]);
  const [text, setText] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const fetchPost = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/posts/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Post fetched: ", response.data);
      setText(response.data.text);
      setPost(response.data);
    } catch (error) {
      if (error.response?.status === 401) { navigate("/login"); }
      console.error("Error fetching post: ", error.response?.data || error);
    }
  };
  useEffect(() => {
    fetchPost();
  }, []);
  const savePostHandler = async () => {
    const token = localStorage.getItem("token");

    try {
      await axios.patch(
        `${process.env.REACT_APP_BACKEND_URL}/posts/${id}`,
        { text: text },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/posts/" + post._id);
    } catch (error) {
      if (error.response?.status === 401) { navigate("/login"); }
      console.error("Error saving post:", error.response?.data || error);
    }
  };

  return (
    <section>
      <h1>Edit Post</h1>
      <img src={post.photo}/>
      <textarea onChange={(e) => setText(e.target.value)} value={text} />
      <button onClick={savePostHandler}>Save</button>
    </section>
  );
}

export default EditPostPage;
