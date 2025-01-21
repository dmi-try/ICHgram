import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import FeedPost from "../../components/feedPost/FeedPost";
import styles from "./ExplorePage.module.css";

function ExplorePage() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  const fetchPosts = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/posts/?explore=true`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPosts(response.data);
      console.log(response.data);
    } catch (error) {
      if (error.response?.status === 401) {
        navigate("/login");
      }
      console.error("Error fetching posts: ", error.response?.data || error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleLike = async (postId) => {
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/posts/${postId}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchPosts();
    } catch (error) {
      console.error("Error liking post: ", error.response?.data || error);
    }
  };

  const handleUnlike = async (postId) => {
    const token = localStorage.getItem("token");

    try {
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/posts/${postId}/like`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchPosts();
    } catch (error) {
      console.error("Error unliking post: ", error.response?.data || error);
    }
  };

  return (
    <section>
      <ul className={styles.explore_posts_container}>
        {posts.map((post) => (
          <li key={post._id}>
            {/* <Link to={`/posts/${post._id}`}>
              {post._id}
            </Link> */}
            <FeedPost post={post} onLike={handleLike} onUnlike={handleUnlike} />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default ExplorePage;
