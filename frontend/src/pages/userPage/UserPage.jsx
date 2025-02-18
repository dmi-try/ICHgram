import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import PostProfile from "../../components/postProfile/PostProfile.jsx";
import Button from "../../components/button/Button.jsx";
import styles from "./UserPage.module.css";
import userAvatar from "../../assets/images/profile_user_avatar.png";

function UserPage() {
  const [user, setUser] = useState([]);
  const { id } = useParams();

  const navigate = useNavigate();

  const fetchUser = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/users/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUser(response.data);
      console.log("User fetched: ", response.data);
      if (response.data.isMe) {
        navigate('/profile');
      }
    } catch (error) {
      if (error.response?.status === 401) { navigate("/login"); }
      console.error("Error fetching user: ", error.response?.data || error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleFollow = async () => {
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/users/${id}/follow`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchUser();
    } catch (error) {
      if (error.response?.status === 401) { navigate("/login"); }
      console.error("Error following user:", error.response?.data || error);
    }
  };
  const handleUnfollow = async () => {
    const token = localStorage.getItem("token");

    try {
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/users/${id}/follow`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchUser();
    } catch (error) {
      if (error.response?.status === 401) { navigate("/login"); }
      console.error("Error unfollowing user:", error.response?.data || error);
    }
  };

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
      fetchUser();
    } catch (error) {
      if (error.response?.status === 401) { navigate("/login"); }
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
      fetchUser();
    } catch (error) {
      if (error.response?.status === 401) { navigate("/login"); }
      console.error("Error unliking post: ", error.response?.data || error);
    }
  };


  return (
    <section>
      <div className={styles.profile_info_container}>
        <header className={styles.profile_header}>
          <picture className={styles.profile_avatar}>
            <img src={userAvatar} alt="" />
          </picture>

          <div className={styles.profile_user}>
            <div className={styles.profile_actions}>
              <h3>{user.name}</h3>
              {user?.isFollowing ? (
                <Button
                  className={styles.following_button}
                  onClick={handleUnfollow}
                  text={"Following"}
                ></Button>
              ) : (
                <Button
                  className={styles.following_button}
                  onClick={handleFollow}
                  text={"Follow"}
                ></Button>
              )}
            </div>
            <div className={styles.profile_stats}>
              <p>{user.likesCount} likes</p>
              <p>{user.followersCount} followers</p>
              <p>{user.followingCount} following</p>
            </div>
            <p>{user.fullname}</p>
            <p>{user.bio}</p>
          </div>
        </header>
      </div>
      <ul className={styles.user_posts}>
        {user.posts && user.posts.length > 0 ? ( // Проверяем, есть ли посты
          user.posts.map((post) => (
            <li key={post._id}>
              <PostProfile post={post} onLike={() => handleLike(post._id)} onUnlike={() => handleUnlike(post._id)} />
            </li>
          ))
        ) : (
          <p>No posts to display.</p> // Показываем сообщение, если постов нет
        )}
      </ul>
    </section>
  );
}

export default UserPage;
