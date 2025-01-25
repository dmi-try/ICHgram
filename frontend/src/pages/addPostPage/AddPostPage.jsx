import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./AddPostPage.module.css";
import UserComponent from "../../components/userComponent/UserComponent.jsx";
import FileInput from "../../components/fileInput/FileInput.jsx";

function AddPostPage() {
  const [text, setText] = useState("");
  const [photo, setPhoto] = useState(null);
  const [profile, setProfile] = useState([]);

  const navigate = useNavigate();

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

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleFileChange = (file) => {
    setPhoto(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("photo", photo);
    formData.append("text", text);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/posts`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      navigate("/posts/" + response.data.post._id);
    } catch (error) {
      if (error.response?.status === 401) {
        navigate("/login");
      }
      console.error("Error adding post:", error.response?.data || error);
    }
  };

  return (
    <section>
      <form onSubmit={handleSubmit} className={styles.form_add_post}>
        <div className={styles.form_header}>
          <UserComponent user={profile} />
          <h3 className={styles.form_heading}>Create new post</h3>
          <button className={styles.form_share_btn} type="submit">
            Share
          </button>
        </div>
        <FileInput
          onFileChange={handleFileChange}
          className={styles.form_file_input}
        />
        <div className={styles.form_description_wrapper}>
          <label>Description:</label>
          <textarea
            className={styles.form_description}
            value={text}
            onChange={handleChange}
          />
        </div>
      </form>
    </section>
  );
}

export default AddPostPage;
