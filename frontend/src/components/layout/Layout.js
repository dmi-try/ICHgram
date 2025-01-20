import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import AsideMenu from "../asideMenu/AsideMenu.jsx";
import Footer from "../footer/Footer.jsx";
import styles from "./Layout.module.css";

function Layout() {
  const location = useLocation();

  // routes excluded
  const excludePaths = ["/login", "/register"];
  const showMenuAndFooter = !excludePaths.includes(location.pathname);

  return (
    <div className={styles.layoutContainer}>
      <main className={styles.contentWrapper}>
        {showMenuAndFooter && <AsideMenu />}

        <Outlet />
      </main>

      {showMenuAndFooter && (
        <footer className={styles.footer}>
          <Footer />
        </footer>
      )}
    </div>
  );
}

export default Layout;
