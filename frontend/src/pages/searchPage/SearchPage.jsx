import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/input/Input";
import styles from "./SearchPage.module.css";
import UserComponent from "../../components/userComponent/UserComponent.jsx";

function SearchPage() {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();

  const fetchUsers = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/users/?name=${filter}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUsers(response.data);
      console.log(response.data);
    } catch (error) {
      if (error.response?.status === 401) {
        navigate("/login");
      }
      console.error("Error fetching users: ", error.response?.data || error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [filter]);

  const handleChange = (e) => {
    setFilter(e.target.value);
  };

  const handleFollow = async (userId) => {
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/users/${userId}/follow`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchUsers();
    } catch (error) {
      console.error("Error following user:", error.response?.data || error);
    }
  };
  const handleUnfollow = async (userId) => {
    const token = localStorage.getItem("token");

    try {
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/users/${userId}/follow`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchUsers();
    } catch (error) {
      console.error("Error unfollowing user:", error.response?.data || error);
    }
  };

  return (
    <section>
      <div className={styles.search_container}>
        <h2>Search</h2>
        <label className={styles.search_label}>
          <Input
            className={styles.search_input}
            placeholder={"Search"}
            onChange={handleChange}
          />
        </label>
        <ul>
          {users.map((user) => (
            <UserComponent
              user={user}
              key={user._id}
              onFollow={() => {
                handleFollow(user._id);
              }}
              onUnfollow={() => {
                handleUnfollow(user._id);
              }}
            />
            // <li key={user._id}>
            //   <Link to={`/users/${user._id}`}>{user.name}</Link>
            // </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default SearchPage;
