import React, { FC } from "react";
import { Link } from "react-router-dom";
import styles from "./NavHeader.module.scss";
import { navButtons } from "../../../model/headerButton";

const NavHeader: FC = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        {navButtons.map((button, index) => (
          <button key={index} className={styles.navButton}>
            <Link to={button.path}>{button.label}</Link>
          </button>
        ))}
      </nav>
    </header>
  );
};

export default NavHeader;
