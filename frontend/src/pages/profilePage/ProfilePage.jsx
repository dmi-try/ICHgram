import React, { useEffect, useState } from "react";
import axios from "axios";

function ProfilePage() {
  const [profile, setProfile] = useState(null);

  // const getProfile = async () => {
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     console.error("Token is not found");
  //     return;
  //   }

  //   try {
  //     const response = await axios.get("http://localhost:3303/users/profile", {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     console.log("User profile: ", response.data);
  //     setProfile(response.data);
  //     //return response.data;
  //   } catch (error) {
  //     console.error("Error fetching profile: ", error.response?.data || error);
  //   }
  // };

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await axios.get(
          "http://localhost:3303/users/profile",
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
    <div>
      <h1>Welcome, {profile.name}</h1>
      <p>Email: {profile.email}</p>
      <p>Full Name: {profile.fullname}</p>
    </div>
  );
}

export default ProfilePage;
