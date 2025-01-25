import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./EditPostPage.module.css";
import UserComponent from "../../components/userComponent/UserComponent";

function EditPostPage() {
  const [post, setPost] = useState([]);
  const [text, setText] = useState("");
  const [profile, setProfile] = useState([]);

  const { id } = useParams();
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

  const fetchPost = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/posts/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Post fetched: ", response.data);
      setText(response.data.text);
      setPost(response.data);
    } catch (error) {
      if (error.response?.status === 401) {
        navigate("/login");
      }
      console.error("Error fetching post: ", error.response?.data || error);
    }
  };
  useEffect(() => {
    fetchPost();
  }, []);

  const savePostHandler = async () => {
    const token = localStorage.getItem("token");

    try {
      await axios.patch(
        `${process.env.REACT_APP_BACKEND_URL}/posts/${id}`,
        { text: text },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/posts/" + post._id);
    } catch (error) {
      if (error.response?.status === 401) {
        navigate("/login");
      }
      console.error("Error saving post:", error.response?.data || error);
    }
  };

  return (
    <section>
      <div className={styles.editor_container}>
        <div className={styles.editor_header}>
          <UserComponent user={profile} />
          <h3 className={styles.edit_heading}>Edit post</h3>
          <button
            className={styles.edit_save_btn}
            onClick={savePostHandler}
            type="submit"
          >
            Save
          </button>
        </div>
        <picture className={styles.edit_photo_wrapper}>
          <img src={post.photo} className={styles.edit_photo} alt="" />
        </picture>
        <div className={styles.edit_description_wrapper}>
          <label>Description:</label>
          <textarea
            className={styles.edit_description}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
      </div>
    </section>

    // <section>
    //   <h1>Edit Post</h1>
    //   <img src={post.photo}/>
    //   <textarea onChange={(e) => setText(e.target.value)} value={text} />
    //   <button onClick={savePostHandler}>Save</button>
    // </section>
  );
}

export default EditPostPage;
