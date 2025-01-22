import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button/Button.jsx";
import Input from "../../components/input/Input.jsx";
import styles from "./EditProfilePage.module.css";

const EditProfile = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    fullname: "",
    bio: "",
  });

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
        setFormData(response.data); // Установим начальные значения для формы
      } catch (error) {
        console.error("Error fetching profile:", error.response?.data || error);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await axios.patch(
        `${process.env.REACT_APP_BACKEND_URL}/auth/profile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/profile"); // Перенаправляем обратно на страницу профиля
    } catch (error) {
      console.error("Error updating profile:", error.response?.data || error);
    }
  };
  const handleDelete = async (e) => {
    const token = localStorage.getItem("token");

    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/auth/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate("/");
    } catch (error) {
      console.error("Error deleting profile:", error.response?.data || error);
    }
  };

  return (
    <section className={styles.edit_profile_page}>
      <form onSubmit={handleSubmit} className={styles.edit_profile_form}>
        <div className={styles.form_header}>
          <h1>Edit profile</h1>
          <button
            type="button"
            onClick={handleDelete}
            className={styles.delete_button}
          >
            Delete profile
          </button>
        </div>

        {Object.entries(
          Object.fromEntries(
            Object.entries(formData).filter(
              ([key]) => key !== "_id" && key !== "__v"
            )
          )
        ).map(([key, value]) => (
          <div key={key} className={styles.input_wrapper}>
            <label htmlFor={key} className={styles.input_label}>
              {key.charAt(0).toUpperCase() + key.slice(1)}:
            </label>
            <Input
              type={key === "email" ? "email" : "text"}
              name={key}
              value={value}
              onChange={handleChange}
            />
          </div>
        ))}
        {/* <button type="submit">Save Changes</button> */}
        <Button type={"submit"} text={"Save"} />
      </form>
    </section>
  );
};

export default EditProfile;
