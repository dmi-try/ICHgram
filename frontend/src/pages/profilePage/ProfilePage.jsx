import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./ProfilePage.module.css";

function ProfilePage() {
  const [profile, setProfile] = useState(null);

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
      } catch (error) {
        console.error("Error fetching profile:", error.response?.data || error);
      }
    };

    fetchProfile();
  }, []);

  if (!profile) {
    return <p>Loading profile...</p>;
  }

  return (
    <section>
      <div className={styles.profile_info_container}>
        <h1>Welcome, {profile.name}</h1>
        <p>Email: {profile.email}</p>
        <p>Full Name: {profile.fullname}</p>
        <p>Bio: {profile.bio}</p>
        <Link to="/profile/edit">Edit Profile</Link>
      </div>
    </section>
  );
}

export default ProfilePage;
