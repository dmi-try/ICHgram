import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function UserPage() {
  const [user, setUser] = useState([]);
  const { id } = useParams();
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
    } catch (error) {
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
    } catch (error) {
      console.error("Error unfollowing user:", error.response?.data || error);
    }
  };
  useEffect(() => {
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
      } catch (error) {
        console.error("Error fetching user: ", error.response?.data || error);
      }
    };

    fetchUser();
  }, []);

  return (
    <section>
      <h1>User Page</h1>
      <ul>
        <li>ID: {user._id}</li>
        <li>Name: {user.name}</li>
        <li>Email: {user.email}</li>
        <li>Full Name: {user.fullname}</li>
        <li>Bio: {user.bio}</li>
        <li>
          <button onClick={handleFollow}>Follow</button>{" "}
          <button onClick={handleUnfollow}>Unfollow</button>
        </li>
      </ul>
    </section>
  );
}

export default UserPage;
