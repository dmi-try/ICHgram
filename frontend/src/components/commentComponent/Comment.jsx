import styles from "./Comment.module.css";
import { Link } from "react-router-dom";
import commentImg from "../../assets/images/comment_profile_small.jpg";

function Comment({ user, text }) {
  return (
    <article className={styles.comment_container}>
      <picture>
        <img src={commentImg} alt="" />
      </picture>
      <div className={styles.user_info_text}>
        {user?.isMe ? (
          <Link to={`/profile`} className={styles.username_link}>
            {user.name}
          </Link>
        ) : (
          <Link to={`/users/${user?._id}`} className={styles.username_link}>
            {user?.name}
          </Link>
        )}
      </div>
      <p className={styles.comment_text}>{text}</p>
    </article>
  );
}

export default Comment;
