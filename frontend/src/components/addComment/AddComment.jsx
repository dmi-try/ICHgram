import styles from "./AddComment.module.css";
import smile from "../../assets/icons/post_smile_icon.svg";
import { useState } from "react";

function AddComment({ onClick }) {
  const [newComment, setNewComment] = useState("");

  return (
    <div className={styles.add_comment_container}>
      <picture>
        <img src={smile} alt="" />
      </picture>
      <textarea
        placeholder="Add comment"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />
      <button
        className={styles.add_comment_button}
        onClick={() => {
          onClick(newComment);
          setNewComment("");
        }}
      >
        Send
      </button>
    </div>
  );
}

export default AddComment;
