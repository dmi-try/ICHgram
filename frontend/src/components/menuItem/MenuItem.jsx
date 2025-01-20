import { Link } from "react-router-dom";
import styles from "./MenuItem.module.css";

function MenuItem({ iconDefault, iconActive, text, link, isActive }) {
  return (
    <li className={styles.menu_item}>
      <picture className={styles.menu_item_icon}>
        <img src={isActive ? iconActive : iconDefault} alt={`${text} icon`} />
      </picture>
      <Link
        to={link}
        className={`${styles.menu_link} ${isActive ? styles.active : ""} `}
      >
        {text}
      </Link>
    </li>
  );
}

export default MenuItem;
