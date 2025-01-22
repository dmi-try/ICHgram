import styles from "./PostContent.module.css";
import { Link } from "react-router-dom";
import userPlaceholder from "../../assets/icons/post_author_icon.svg";

function PostContent({ text, user }) {
  return (
    <div className={styles.text_container}>
      <picture>
        <img src={userPlaceholder} alt="" />
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

      <p className={styles.text}>{text}</p>
    </div>
  );
}
export default PostContent;
