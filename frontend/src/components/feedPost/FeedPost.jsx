import { Link, useNavigate } from "react-router-dom";
import styles from "./FeedPost.module.css";
import LikeCounter from "../likeCounter/LikeCounter.jsx";
import CommentCounter from "../commentCounter/CommentCounter.jsx";
import UserComponent from "../userComponent/UserComponent.jsx";
import axios from "axios";

function FeedPost({ post, onLike, onUnlike, refreshData }) {
  const { _id, photo, likeCount, commentCount, isLiked } = post;
  const navigate = useNavigate();
  const handleCommentClick = () => {
    // Переход на страницу поста при клике на комментарии
    navigate(`/posts/${_id}`);
  };

  const handleFollow = async () => {
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/users/${post.user._id}/follow`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      refreshData();
    } catch (error) {
      console.error("Error following user:", error.response?.data || error);
    }
  };
  const handleUnfollow = async () => {
    const token = localStorage.getItem("token");

    try {
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/users/${post.user._id}/follow`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      refreshData();
    } catch (error) {
      console.error("Error unfollowing user:", error.response?.data || error);
    }
  };

  return (
    <article className={styles.post_container}>
      <UserComponent
        user={post.user}
        onFollow={handleFollow}
        onUnfollow={handleUnfollow}
      />
      <Link to={`/posts/${_id}`} className={styles.post_link}>
        <picture className={styles.post_img}>
          <img src={photo} alt={`Post ${_id}`} />
        </picture>
      </Link>
      <div className={styles.post_likes_comments}>
        <LikeCounter
          likes={likeCount}
          isLiked={isLiked}
          onLike={() => onLike(_id)}
          onUnlike={() => onUnlike(_id)}
        />
        <CommentCounter comments={commentCount} onClick={handleCommentClick} />
      </div>
    </article>
  );
}

export default FeedPost;
