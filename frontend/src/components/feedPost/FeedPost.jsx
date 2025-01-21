import { Link } from "react-router-dom";
import styles from "./FeedPost.module.css";
import postImg from "../../assets/images/post_img_placeholder_big.jpg";
import LikeCounter from "../likeCounter/LikeCounter.jsx";
import CommentCounter from "../commentCounter/CommentCounter.jsx";

function FeedPost({ post, onLike, onUnlike }) {
  const { _id, photo, likeCount, commentCount, isLiked } = post;

  const handleCommentClick = () => {
    // Переход на страницу поста при клике на комментарии
    window.location.href = `/posts/${_id}`;
  };

  return (
    <article className={styles.post_container}>
      <Link to={`/posts/${_id}`} className={styles.post_link}>
        <picture className={styles.post_img}>
          <img src={postImg} alt={`Post ${_id}`} />
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
