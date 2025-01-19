import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function UsersPage() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users: ", error.response?.data || error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Users Page</h1>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            <Link to={`/users/${user._id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UsersPage;
