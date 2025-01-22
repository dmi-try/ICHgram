import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./ProfilePage.module.css";
import userAvatar from "../../assets/images/profile_user_avatar.png";
import PostProfile from "../../components/postProfile/PostProfile.jsx";

function ProfilePage() {
  const [profile, setProfile] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/auth/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProfile(response.data);
        console.log(response.data);
      } catch (error) {
        if (error.response?.status === 401) {
          navigate("/login");
        }
        console.error("Error fetching profile:", error.response?.data || error);
      }
    };

    fetchProfile();
  }, []);

  // if (!profile) {
  //   return <p>Loading profile...</p>;
  // }

  return (
    <section>
      <div className={styles.profile_info_container}>
        <header className={styles.profile_header}>
          <picture className={styles.profile_avatar}>
            <img src={userAvatar} alt="" />
          </picture>

          <div className={styles.profile_user}>
            <div className={styles.profile_actions}>
              <h3>{profile.name}</h3>
              <Link to="/profile/edit">Edit Profile</Link>
            </div>
            <div className={styles.profile_stats}>
              <p>00 likes</p>
              <p>00 followers</p>
              <p>00 following</p>
            </div>
            <p>{profile.fullname}</p>
            <p>{profile.bio}</p>
          </div>
        </header>
      </div>
      <ul className={styles.user_posts}>
        {profile.posts && profile.posts.length > 0 ? ( // Проверяем, есть ли посты
          profile.posts.map((post) => (
            <li key={post._id}>
              <PostProfile post={post} />
            </li>
          ))
        ) : (
          <p>No posts to display.</p> // Показываем сообщение, если постов нет
        )}
      </ul>
    </section>
  );
}

export default ProfilePage;
