import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function SearchPage() {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  useEffect(() => {
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
      } catch (error) {
        console.error("Error fetching users: ", error.response?.data || error);
      }
    };

    fetchUsers();
  }, [filter]);

  const handleChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <section>
      <h1>Search Page</h1>
      <p>User name: <input onChange={handleChange} /></p>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            <Link to={`/users/${user._id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default SearchPage;
