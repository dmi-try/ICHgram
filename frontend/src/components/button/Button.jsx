import styles from "./Button.module.css";

function Button({ type, width = "100%", onClick, text, ...rest }) {
  return (
    <button type={type} onClick={onClick} className={styles.button_main}>
      {text}
    </button>
  );
}

export default Button;
