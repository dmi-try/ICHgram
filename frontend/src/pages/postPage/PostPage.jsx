import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import styles from "./PostPage.module.css";
import postImg from "../../assets/images/post_img.jpg";
import LikeCounter from "../../components/likeCounter/LikeCounter.jsx";
import CommentCounter from "../../components/commentCounter/CommentCounter.jsx";
import UserComponent from "../../components/userComponent/UserComponent.jsx";
import PostContent from "../../components/postContents/PostContent.jsx";
import Comment from "../../components/commentComponent/Comment.jsx";
import AddComment from "../../components/addComment/AddComment.jsx";

function PostPage() {
  const [post, setPost] = useState([]);
  // const [newComment, setNewComment] = useState("");
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
  const handleNewComment = async (newComment) => {
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
        <PostContent text={post.text} user={post.user} />
        <div className={styles.post_actions}>
          <LikeCounter
            likes={post.likeCount}
            isLiked={post.isLiked}
            onLike={handleLike}
            onUnlike={handleUnlike}
          />
          {post.user?.isMe ? (
            <div className={styles.post_editing}>
              <Link to={`/posts/${post._id}/edit`}>Edit</Link>{" "}
              <button onClick={handleDeletePost}>Delete post</button>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div>
          {post.comments?.map((comment) => (
            <Comment
              key={comment._id}
              user={comment.user}
              text={comment.text}
            ></Comment>
          ))}
          <AddComment onClick={handleNewComment} />
        </div>
      </div>
    </section>
  );
}

export default PostPage;
