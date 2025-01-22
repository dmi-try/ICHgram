import styles from "./UserComponent.module.css";
import userPlaceholder from "../../assets/icons/post_author_icon.svg";
import { Link } from "react-router-dom";

function UserComponent({ user, onFollow, onUnfollow }) {
  return (
    <div className={styles.user_info_container}>
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
      {!user?.isMe && (
        <div>
          {user?.isFollowing ? (
            <button className={styles.following_button} onClick={onUnfollow}>
              Following
            </button>
          ) : (
            <button className={styles.following_button} onClick={onFollow}>
              Follow
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default UserComponent;
