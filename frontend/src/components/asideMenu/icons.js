import exploreIcon from "../../assets/icons/menu_explore_icon.svg";
import exploreIconCurrent from "../../assets/icons/menu_explore_current_icon.svg";

import homeIcon from "../../assets/icons/menu_home_icon.svg";
import homeIconCurrent from "../../assets/icons/menu_home_current_icon.svg";

import messagesIcon from "../../assets/icons/menu_messages_icon.svg";
import messagesIconCurrent from "../../assets/icons/menu_messages_current_icon.svg";

import notificationsIcon from "../../assets/icons/menu_notifications_icon.svg";
import notificationsIconCurrent from "../../assets/icons/menu_notifications_current_icon.svg";

import searchIcon from "../../assets/icons/menu_search_icon.svg";
import searchIconCurrent from "../../assets/icons/menu_search_current_icon.svg";

import createIcon from "../../assets/icons/menu_create_icon.svg";

import profileIcon from "../../assets/icons/menu_profile_icon.png";

const icons = {
  explore: { default: exploreIcon, active: exploreIconCurrent },
  home: { default: homeIcon, active: homeIconCurrent },
  messages: { default: messagesIcon, active: messagesIconCurrent },
  notifications: {
    default: notificationsIcon,
    active: notificationsIconCurrent,
  },
  search: { default: searchIcon, active: searchIconCurrent },
  create: { default: createIcon, active: createIcon },
  profile: { default: profileIcon, active: profileIcon },
};

export default icons;
