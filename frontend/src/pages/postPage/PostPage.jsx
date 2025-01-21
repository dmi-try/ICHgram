import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import styles from "./PostPage.module.css";
import postImg from "../../assets/images/post_img.jpg";
import LikeCounter from "../../components/likeCounter/LikeCounter.jsx";
import CommentCounter from "../../components/commentCounter/CommentCounter.jsx";
import UserComponent from "../../components/userComponent/UserComponent.jsx";

function PostPage() {
  const [post, setPost] = useState([]);
  const [newComment, setNewComment] = useState("");
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
      setPost(response.data);
    } catch (error) {
      console.error("Error fetching post: ", error.response?.data || error);
    }
  };
  useEffect(() => {
    fetchPost();
  }, []);
  const handleNewComment = async () => {
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/posts/${id}/comments`,
        { text: newComment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNewComment("");
      fetchPost();
    } catch (error) {
      console.error("Error adding comment:", error.response?.data || error);
    }
  };
  const handleDeletePost = async () => {
    const token = localStorage.getItem("token");

    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate("/");
    } catch (error) {
      console.error("Error deleting post:", error.response?.data || error);
    }
  };
  const handleLike = async () => {
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/posts/${id}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchPost();
    } catch (error) {
      console.error("Error adding like:", error.response?.data || error);
    }
  };
  const handleUnlike = async () => {
    const token = localStorage.getItem("token");

    try {
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/posts/${id}/like`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchPost();
    } catch (error) {
      console.error("Error removing like:", error.response?.data || error);
    }
  };

  const handleFollow = async () => {
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/users/${post.user?._id}/follow`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchPost();
    } catch (error) {
      console.error("Error following user:", error.response?.data || error);
    }
  };
  const handleUnfollow = async () => {
    const token = localStorage.getItem("token");

    try {
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/users/${post.user?._id}/follow`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchPost();
    } catch (error) {
      console.error("Error unfollowing user:", error.response?.data || error);
    }
  };

  return (
    <section className={styles.post_container}>
      <picture>
        <img src={postImg} alt="" />
        {/* <div>Photo: {post.photo}</div> */}
      </picture>
      <div className={styles.post_contents}>
        <UserComponent
          user={post.user}
          onFollow={handleFollow}
          onUnfollow={handleUnfollow}
        />
        {/* <div>ID: {post._id}</div> */}
        {/* <div>User: {post.user?.name}</div> */}
        <div>Text: {post.text}</div>
        <LikeCounter
          likes={post.likeCount}
          isLiked={post.isLiked}
          onLike={handleLike}
          onUnlike={handleUnlike}
        />
        <div>
          <Link to={`/posts/${post._id}/edit`}>Edit</Link>{" "}
          <button onClick={handleDeletePost}>Delete post</button>
        </div>
        {/* <p>
        <button onClick={handleLike}>Like!</button>
        <button onClick={handleUnlike}>Unlike!</button>
      </p> */}
        <div>
          Comments:{" "}
          {post.comments?.map((comment) => (
            <p key={comment._id}>
              {comment.user?.name}: {comment.text}
            </p>
          ))}
        </div>

        <textarea
          placeholder="Add comment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button onClick={handleNewComment}>Add comment</button>
      </div>
    </section>
  );
}

export default PostPage;
