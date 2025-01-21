import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function FeedPage() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchPosts = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/posts/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPosts(response.data);
      } catch (error) {
        if (error.response?.status === 401) {
          navigate("/login");
        }
        console.error("Error fetching posts: ", error.response?.data || error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <section>
      <h1>Feed Page</h1>
      <ul>
        {posts.map((post) => (
          <li key={post._id}>
            <Link to={`/posts/${post._id}`}>{post._id}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default FeedPage;
