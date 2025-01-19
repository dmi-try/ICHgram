import styles from "./Input.module.css";

function Input({
  type,
  placeholder,
  width = "100%",
  minHeight = "38px",
  value,
  onChange,
  name,
  ...rest
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      name={name}
      className={styles.form_input}
    />
  );
}

export default Input;
