import React, { useState } from "react";
import styles from "./FileInput.module.css";
import uploadIcon from "../../assets/icons/post_upload_icon.svg"; // Иконка загрузки

function FileInput({ onFileChange }) {
  const [fileName, setFileName] = useState("No file selected");

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      onFileChange && onFileChange(file); // Передаем файл в родительский компонент, если нужно
    }
  };

  return (
    <div className={styles.file_input_wrapper}>
      <label htmlFor="file-upload" className={styles.custom_file_upload}>
        <img src={uploadIcon} alt="Upload" className={styles.upload_icon} />
      </label>
      <input
        id="file-upload"
        type="file"
        onChange={handleChange}
        className={styles.file_input}
      />
      <p className={styles.file_name}>{fileName}</p>
    </div>
  );
}

export default FileInput;
