import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

function Footer() {
  const links = [
    { id: "explore", text: "Explore", link: "/explore" },
    { id: "home", text: "Home", link: "/" },
    { id: "messages", text: "Messages", link: "/messages" },
    { id: "notifications", text: "Notifications", link: "/notifications" },
    { id: "search", text: "Search", link: "/search" },
    { id: "create", text: "Create", link: "/add" },
    { id: "profile", text: "Profile", link: "/profile" },
  ];
  return (
    <footer className={styles.page_footer}>
      <ul className={styles.footer_links_container}>
        {links.map((elem) => {
          return (
            <li key={elem.id} className={styles.footer_link}>
              <Link to={elem.link}>{elem.text}</Link>
            </li>
          );
        })}
      </ul>
      <p>© 2024 ICHgram</p>
    </footer>
  );
}

export default Footer;
