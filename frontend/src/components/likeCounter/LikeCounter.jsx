import styles from "./LikeCounter.module.css";
import likeIcon from "../../assets/icons/post_like_icon.svg";
import likedIcon from "../../assets/icons/post_like_red_icon.svg";

function LikeCounter({ likes, isLiked, onLike, onUnlike }) {
  const handleLikeClick = () => {
    if (isLiked) {
      onUnlike();
    } else {
      onLike();
    }
  };
  return (
    <div className={styles.post_likes_container} onClick={handleLikeClick}>
      <picture>
        <img src={isLiked ? likedIcon : likeIcon} alt="Likes" />
      </picture>
      <p className={styles.post_likes_count}>{`${likes} likes`}</p>
    </div>
  );
}

export default LikeCounter;
