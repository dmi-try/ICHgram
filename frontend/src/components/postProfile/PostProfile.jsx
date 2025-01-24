import { Link } from "react-router-dom";
import styles from "./PostProfile.module.css";
import LikeCounter from "../likeCounter/LikeCounter.jsx";
import CommentCounter from "../commentCounter/CommentCounter.jsx";

function PostProfile({ post, onLike, onUnlike }) {
  const { _id, photo, likeCount, commentCount, isLiked } = post;

  const handleCommentClick = () => {
    // Переход на страницу поста при клике на комментарии
    window.location.href = `/posts/${_id}`;
  };

  return (
    <article className={styles.post_container}>
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

export default PostProfile;
