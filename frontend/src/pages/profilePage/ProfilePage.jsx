import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AsideMenu from "../../components/asideMenu/AsideMenu.jsx";
import Footer from "../../components/footer/Footer.jsx";
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
    <section className={styles.profile_page_container}>
      <div className={styles.content_container}>
        <AsideMenu />
        <div className={styles.profile_info_container}>
          <h1>Welcome, {profile.name}</h1>
          <p>Email: {profile.email}</p>
          <p>Full Name: {profile.fullname}</p>
          <p>Bio: {profile.bio}</p>
          <Link to="/edit-profile">Edit Profile</Link>
        </div>
      </div>
      <Footer />
    </section>
  );
}

export default ProfilePage;
