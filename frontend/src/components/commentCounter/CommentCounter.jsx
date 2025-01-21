import styles from "./CommentCounter.module.css";
import commentIcon from "../../assets/icons/post_comment_icon.svg";

function CommentCounter({ comments, onClick }) {
  return (
    <div className={styles.post_comments_container} onClick={onClick}>
      <picture>
        <img src={commentIcon} alt="" />
      </picture>
      <p className={styles.post_comments_count}>{`${comments} comments`}</p>
    </div>
  );
}

export default CommentCounter;
