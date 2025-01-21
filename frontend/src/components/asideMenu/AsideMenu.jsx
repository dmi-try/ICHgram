import { useLocation } from "react-router-dom";
import styles from "./AsideMenu.module.css";
import icons from "./icons.js";
import MenuItem from "../menuItem/MenuItem.jsx";
import logo from "../../assets/icons/menu_logo_small.svg";

const menuOptions = [
  { id: "explore", text: "Explore", link: "/explore" },
  { id: "home", text: "Home", link: "/" },
  { id: "messages", text: "Messages", link: "/messages" },
  { id: "notifications", text: "Notifications", link: "/notifications" },
  { id: "search", text: "Search", link: "/search" },
  { id: "create", text: "Create", link: "/add" },
  { id: "profile", text: "Profile", link: "/profile" },
];

function AsideMenu() {
  const location = useLocation();

  return (
    <aside className={styles.aside_menu_container}>
      <picture className={styles.aside_logo_container}>
        <img src={logo} alt="" />
      </picture>
      <ul className={styles.menu}>
        {menuOptions.map(({ id, text, link }) => (
          <MenuItem
            key={id}
            iconDefault={icons[id].default}
            iconActive={icons[id].active}
            text={text}
            link={link}
            isActive={location.pathname === link}
          />
        ))}
      </ul>
    </aside>
  );
}

export default AsideMenu;
